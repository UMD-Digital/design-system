/**
 * Fetch Handler Utilities
 *
 * Creates handlers for fetching feed data using a fetch strategy.
 * Handles both initial fetch and lazy-loaded fetches.
 *
 * @module factory/helpers/fetchHandler
 */

import * as Styles from '@universityofmaryland/web-styles-library';
import { LoadingState, Announcer } from '../../states';
import { FetchStrategy, FeedHelpers } from '../core/types';

/**
 * Configuration for creating fetch handlers
 */
interface FetchHandlerConfig<TData, TVariables> {
  /** Strategy for fetching data */
  fetchStrategy: FetchStrategy<TData, TVariables>;
  /** Feed helper functions */
  helpers: FeedHelpers;
  /** Base props for composing API variables */
  baseProps: any;
  /** Display handlers */
  displayHandlers: {
    displayResultStart: (props: any) => Promise<void>;
    displayResults: (props: { feedData: TData[] }) => Promise<void>;
    displayNoResults: (props: any) => void;
  };
  /** Layout element */
  layoutElement: any;
  /** Whether theme is dark */
  isThemeDark?: boolean;
  /** Whether to enable category fallback (show all results when no category results found) */
  enableCategoryFallback?: boolean;
}

/**
 * Create fetch handlers for a feed
 *
 * Returns handlers for:
 * - Initial data fetch (with count)
 * - Lazy load fetch (pagination)
 *
 * @param config - Configuration for the fetch handlers
 * @returns Fetch handler functions
 *
 * @example
 * ```typescript
 * const fetchHandlers = createFetchHandlers({
 *   fetchStrategy: eventsFetchStrategy,
 *   helpers: feedHelpers,
 *   baseProps: { token, categories },
 *   displayHandlers,
 *   layoutElement,
 *   isThemeDark: false,
 * });
 *
 * // Start initial fetch
 * await fetchHandlers.start();
 *
 * // Fetch more results
 * await fetchHandlers.loadMore();
 * ```
 */
export function createFetchHandlers<TData, TVariables>(
  config: FetchHandlerConfig<TData, TVariables>,
) {
  const {
    fetchStrategy,
    helpers,
    baseProps,
    displayHandlers,
    layoutElement,
    isThemeDark,
    enableCategoryFallback = false,
  } = config;

  /**
   * Handle lazy loading more results
   */
  const loadMore = async (): Promise<void> => {
    const container = helpers.getContainer();
    const currentCount = helpers.getOffset();
    const totalEntries = helpers.getTotalEntries();

    // Remove existing pagination
    const existingPagination = container.querySelector(
      `.${Styles.layout.alignment.block.center.className}`,
    );
    existingPagination?.remove();

    // Show loading state
    const loading = new LoadingState({ isThemeDark });
    loading.show(container);

    // Compose API variables
    const variables = fetchStrategy.composeApiVariables({
      ...baseProps,
      getOffset: helpers.getOffset,
    });

    // Fetch entries
    const feedData = await fetchStrategy.fetchEntries(variables);

    if (feedData) {
      loading.hide();
      await displayHandlers.displayResults({ feedData });

      // Update announcer with new count
      const message = `Showing ${
        currentCount + feedData.length
      } of ${totalEntries} articles`;

      const existingAnnouncer = container.querySelector(
        '[role="status"]',
      ) as HTMLElement;
      if (existingAnnouncer) {
        existingAnnouncer.textContent = message;
      } else {
        const announcer = new Announcer({ message });
        container.appendChild(announcer.getElement());
      }
    } else {
      loading.hide();
      displayHandlers.displayNoResults({
        message: 'An error occurred while loading more results.',
      });
    }
  };

  /**
   * Handle initial fetch (with count)
   */
  const start = async (): Promise<void> => {
    const variables = fetchStrategy.composeApiVariables({
      ...baseProps,
      getOffset: helpers.getOffset,
    });

    const count = await fetchStrategy.fetchCount(variables);

    if (count === 0) {
      // Only attempt category fallback if explicitly enabled (for events feeds)
      if (enableCategoryFallback && baseProps.categories && baseProps.categories.length > 0) {
        const fallbackVariables = fetchStrategy.composeApiVariables({
          ...baseProps,
          categories: undefined,
          getOffset: helpers.getOffset,
        });

        const fallbackCount = await fetchStrategy.fetchCount(fallbackVariables);

        if (fallbackCount && fallbackCount > 0) {
          helpers.setTotalEntries(fallbackCount);

          const fallbackData = await fetchStrategy.fetchEntries(
            fallbackVariables,
          );

          if (fallbackData && fallbackData.length > 0) {
            // Fetch category names from API
            let categoryNames = await fetchStrategy.fetchCategoryNames?.(
              baseProps.categories,
              baseProps.token,
            );

            // If fetch fails, format IDs as fallback
            if (!categoryNames || categoryNames.length === 0) {
              categoryNames = baseProps.categories.map((id: string) =>
                id
                  .split('-')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' '),
              );
            }

            await displayHandlers.displayResultStart({
              feedData: fallbackData,
              layoutElement,
              isFallback: true,
              categoryNames,
            });
            return;
          }
        }
      }

      displayHandlers.displayNoResults({});
      return;
    }

    if (count === null) {
      displayHandlers.displayNoResults({
        message: 'An error occurred while fetching the data.',
      });
      return;
    }

    if (count) {
      helpers.setTotalEntries(count);
    }

    // Fetch entries
    const feedData = await fetchStrategy.fetchEntries(variables);

    if (feedData && feedData.length > 0) {
      await displayHandlers.displayResultStart({
        feedData,
        layoutElement,
      });
    } else {
      displayHandlers.displayNoResults({
        message: 'An error occurred while fetching the data.',
      });
    }
  };

  return {
    start,
    loadMore,
  };
}

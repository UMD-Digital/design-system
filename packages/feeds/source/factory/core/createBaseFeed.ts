/**
 * Base Feed Factory
 *
 * Creates a complete feed with initialization, data fetching, and display logic.
 * Uses strategy pattern to allow customization of fetch, display, and layout.
 *
 * @module factory/core/createBaseFeed
 */

import { LoadingState } from '../../states';
import {
  createFeedHelpers,
  createDisplayHandlers,
  createFetchHandlers,
} from '../helpers';
import { BaseFeedConfig, FeedFactoryResult, CardMappingOptions } from './types';

/**
 * Create a base feed using the factory pattern
 *
 * This factory eliminates ~70% of boilerplate code by handling:
 * - Feed initialization (container, loading, state)
 * - Strategy composition (fetch, display, layout)
 * - Lifecycle management (start, load more, no results)
 * - Shadow DOM support
 * - Event system
 *
 * @template TData - The type of entry data from the API
 * @template TVariables - The type of API variables
 *
 * @param config - Configuration for the feed
 * @returns ElementModel with feed element and styles
 *
 * @example
 * ```typescript
 * // Simple grid feed
 * const eventsFeed = createBaseFeed({
 *   token: 'my-token',
 *   isThemeDark: false,
 *   numberOfColumnsToShow: 3,
 *   numberOfRowsToStart: 2,
 *   isLazyLoad: true,
 *   fetchStrategy: eventsFetchStrategy,
 *   displayStrategy: eventsDisplayStrategy,
 *   layoutStrategy: gridGapLayout,
 *   imageConfig: (entry) => ({
 *     imageUrl: entry.image[0].url,
 *     altText: entry.image[0].altText,
 *     linkUrl: entry.url,
 *   }),
 * });
 *
 * // Use the feed
 * document.body.appendChild(eventsFeed.element);
 * ```
 */
export function createBaseFeed<TData, TVariables = any>(
  config: BaseFeedConfig<TData, TVariables>,
): FeedFactoryResult {
  const {
    token,
    isThemeDark = false,
    isTransparent = false,
    isOverlay = false,
    isAligned = false,
    isMediaTrained = null,
    cardType,
    numberOfColumnsToShow = 1,
    numberOfRowsToStart,
    isLazyLoad = false,
    enableCategoryFallback = false,
    categories,
    ids,
    entriesToRemove,
    fetchStrategy,
    displayStrategy,
    layoutStrategy,
    noResultsConfig,
    imageConfig,
  } = config;

  const container = document.createElement('div');
  const loading = new LoadingState({ isThemeDark });
  let styles = loading.styles;

  // Create helpers for state management
  const helpers = createFeedHelpers({
    container,
    initialStyles: styles,
  });

  // Override setStyles to also update the local styles variable
  const originalSetStyles = helpers.setStyles;
  helpers.setStyles = (additionalStyles: string) => {
    styles += additionalStyles;
    originalSetStyles(additionalStyles);
  };

  // Shadow root support
  let shadowRoot: ShadowRoot | null = null;
  const shadowRootCallback = (shadow: ShadowRoot) => {
    shadowRoot = shadow;

    helpers.setShadowRoot(shadow);
  };

  const cardMappingOptions: CardMappingOptions = {
    isThemeDark,
    isTransparent,
    isOverlay,
    isAligned,
    imageConfig,
    ...(cardType && { cardType }),
  };

  const layoutElement = layoutStrategy.create({
    columns: numberOfColumnsToShow as 2 | 3 | 4,
    isThemeDark,
  });
  helpers.setStyles(layoutElement.styles);

  const baseProps = {
    token,
    categories,
    ids,
    entriesToRemove,
    numberOfColumnsToShow,
    numberOfRowsToStart,
    isLazyLoad,
    isMediaTrained,
    getOffset: helpers.getOffset,
  };

  // Create a mutable reference for lazy load callback
  // This allows us to set it after fetchHandlers are created
  const lazyLoadCallbackRef = {
    current: undefined as (() => Promise<void>) | undefined,
  };

  // Create display handlers with callback reference
  const displayHandlers = createDisplayHandlers({
    displayStrategy,
    layoutStrategy,
    helpers,
    cardMappingOptions,
    isLazyLoad,
    numberOfColumnsToShow,
    numberOfRowsToStart,
    noResultsConfig: {
      ...noResultsConfig,
      isThemeDark, // Ensure theme is passed to EmptyState
    },
    // Pass a function that calls the current callback
    lazyLoadCallback: isLazyLoad
      ? async () => {
          if (lazyLoadCallbackRef.current) {
            await lazyLoadCallbackRef.current();
          }
        }
      : undefined,
  });

  // Create fetch handlers
  const fetchHandlers = createFetchHandlers({
    fetchStrategy,
    helpers,
    baseProps,
    displayHandlers,
    layoutElement,
    isThemeDark,
    enableCategoryFallback,
  });

  // Set the lazy load callback reference now that fetch handlers exist
  lazyLoadCallbackRef.current = fetchHandlers.loadMore;

  // Append loading indicator to container
  container.appendChild(loading.element);

  // Start fetching data
  fetchHandlers.start();

  // Return feed with getter for styles to ensure dynamic access
  return {
    element: container,
    get styles() {
      return styles;
    },
    events: {
      callback: shadowRootCallback,
    },
  };
}

/**
 * Display Handler Utilities
 *
 * Creates handlers for displaying feed results using a display strategy.
 * Handles both initial display and lazy-loaded results.
 *
 * @module factory/helpers/displayHandler
 */

import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as Styles from '@universityofmaryland/web-styles-library';
import * as typography from '@universityofmaryland/web-styles-library/typography';
import { theme } from '@universityofmaryland/web-utilities-library/theme';
import { PaginationState, EmptyState, Announcer } from '../../states';
import { events } from '../../helpers';
import {
  DisplayStrategy,
  FeedHelpers,
  LayoutStrategy,
  CardMappingOptions,
  DisplayResultsProps,
  NoResultsConfig,
} from '../core/types';
import { ElementModel } from '../../_types';

/**
 * Configuration for creating display handlers
 */
interface DisplayHandlerConfig<TData> {
  /** Strategy for displaying entries */
  displayStrategy: DisplayStrategy<TData>;
  /** Strategy for creating layout */
  layoutStrategy: LayoutStrategy;
  /** Feed helper functions */
  helpers: FeedHelpers;
  /** Options for card mapping */
  cardMappingOptions: CardMappingOptions;
  /** Whether lazy loading is enabled */
  isLazyLoad?: boolean;
  /** Number of columns to show */
  numberOfColumnsToShow?: number;
  /** Number of rows to start with */
  numberOfRowsToStart: number;
  /** Configuration for no results state */
  noResultsConfig?: NoResultsConfig;
  /** Callback for lazy load */
  lazyLoadCallback?: () => Promise<void>;
}

/**
 * Set shadow root styles with CSS optimization
 */
export async function setShadowStyles({
  shadowRoot,
  styles,
}: {
  shadowRoot: ShadowRoot;
  styles: string;
}): Promise<void> {
  const styleElement = document.createElement('style');
  const optimizedCss = await Styles.utilities.transform.css.removeDuplicates(
    styles,
  );
  styleElement.textContent = optimizedCss;
  shadowRoot.appendChild(styleElement);
}

/**
 * Create fallback message for category-filtered feeds with no results
 */
function createFallbackMessage(
  categoryNames: string[],
  isThemeDark: boolean = false,
): ElementModel {
  const formattedNames = categoryNames.join(', ');
  const message = `No events found for "${formattedNames}" <span> Other upcoming events:</span>`;

  const messageElement = new ElementBuilder(document.createElement('p'))
    .styled(
      typography.sans.compose('extralarge', {
        theme: theme.fontColor(isThemeDark),
      }),
    )
    .withStyles({
      textAlign: 'center',
      margin: '0 auto',

      ['& span']: {
        display: 'block',
      },
    })
    .withHTML(message);

  const container = new ElementBuilder(document.createElement('div'))
    .withClassName('feed-events-fallback-message')
    .withChild(messageElement)
    .withStyles({
      element: {
        marginBottom: Styles.token.spacing.lg,
        padding: `${Styles.token.spacing.md} ${Styles.token.spacing.lg}`,
      },
    })
    .build();

  return container;
}

/**
 * Create display handlers for a feed
 *
 * Returns handlers for:
 * - Displaying initial results
 * - Displaying lazy-loaded results
 * - Displaying no results state
 *
 * @param config - Configuration for the display handlers
 * @returns Display handler functions
 *
 * @example
 * ```typescript
 * const handlers = createDisplayHandlers({
 *   displayStrategy: eventsDisplayStrategy,
 *   layoutStrategy: gridGapLayout,
 *   helpers: feedHelpers,
 *   cardMappingOptions: { isThemeDark: false },
 *   isLazyLoad: true,
 *   numberOfColumnsToShow: 3,
 *   numberOfRowsToStart: 2,
 * });
 *
 * // Use handlers
 * handlers.displayResultStart({ feedData, layoutElement });
 * await handlers.displayResults({ feedData });
 * ```
 */
export function createDisplayHandlers<TData>(
  config: DisplayHandlerConfig<TData>,
) {
  const {
    displayStrategy,
    layoutStrategy,
    helpers,
    cardMappingOptions,
    isLazyLoad,
    numberOfColumnsToShow = 1,
    numberOfRowsToStart,
    noResultsConfig = {},
    lazyLoadCallback,
  } = config;

  /**
   * Handle displaying no results
   */
  const displayNoResults = (props: any) => {
    const container = helpers.getContainer();
    const shadowRoot = helpers.getShadowRoot();
    const { message, linkUrl, linkText, isThemeDark } = {
      ...noResultsConfig,
      ...props,
    };

    const emptyState = new EmptyState({
      message,
      linkUrl,
      linkText,
      isThemeDark,
    });

    const announcer = new Announcer({ message: message || 'No results found' });

    container.innerHTML = '';
    emptyState.render(container);
    container.appendChild(announcer.getElement());
    helpers.setStyles(emptyState.styles);

    events.dispatch(container, events.eventNames.FEED_ERROR, {
      error: 'No results found',
      message,
      isThemeDark,
    });

    setTimeout(() => {
      const styles = helpers.getStyles();
      if (shadowRoot) {
        setShadowStyles({ shadowRoot, styles });
      }
    }, 100);
  };

  /**
   * Handle displaying lazy-loaded results
   */
  const displayResults = async (
    props: DisplayResultsProps<TData>,
  ): Promise<void> => {
    const { feedData } = props;
    const container = helpers.getContainer();
    const grid = container.querySelector(
      `#${layoutStrategy.getId()}`,
    ) as HTMLDivElement;

    // Remove existing loading and pagination states
    const existingLoader = container.querySelector('.umd-loader-container');
    existingLoader?.remove();

    const existingPagination = container.querySelector(
      `.${Styles.layout.alignment.block.center.className}`,
    );
    existingPagination?.remove();

    helpers.setOffset(feedData.length);

    // Map entries to cards using display strategy
    const entries = feedData.map((entry) =>
      displayStrategy.mapEntryToCard(entry, cardMappingOptions),
    );

    // Append entries to grid
    entries.forEach((entry) => {
      grid.appendChild(entry.element);
      helpers.setStyles(entry.styles);
    });

    // Add pagination if lazy load is enabled
    if (isLazyLoad && lazyLoadCallback) {
      const pagination = new PaginationState({
        totalEntries: helpers.getTotalEntries(),
        offset: helpers.getOffset(),
        isLazyLoad: true,
        callback: lazyLoadCallback,
      });

      const paginationElement = pagination.render(container);
      if (paginationElement) {
        helpers.setStyles(paginationElement.styles);
      }
    }

    // Update shadow root styles if needed
    const shadowRoot = helpers.getShadowRoot();
    if (shadowRoot) {
      await setShadowStyles({
        shadowRoot,
        styles: helpers.getStyles(),
      });
    }
  };

  /**
   * Handle displaying initial results
   */
  const displayResultStart = async (props: {
    feedData: TData[];
    layoutElement: ElementModel;
    isFallback?: boolean;
    categoryNames?: string[];
  }): Promise<void> => {
    const { feedData, layoutElement, isFallback, categoryNames } = props;
    const container = helpers.getContainer();
    const totalEntries = helpers.getTotalEntries();
    const showAmount = numberOfColumnsToShow * numberOfRowsToStart;
    const message = isLazyLoad
      ? `Showing ${showAmount} of ${totalEntries} articles`
      : `Showing ${showAmount} articles`;

    // If this is a fallback, add a message about the category FIRST
    if (isFallback && categoryNames && categoryNames.length > 0) {
      const fallbackMessage = createFallbackMessage(
        categoryNames,
        cardMappingOptions.isThemeDark || false,
      );
      container.appendChild(fallbackMessage.element);
      helpers.setStyles(fallbackMessage.styles);

      // Inject fallback message styles into shadow DOM immediately
      const shadowRoot = helpers.getShadowRoot();
      if (shadowRoot) {
        await setShadowStyles({
          shadowRoot,
          styles: helpers.getStyles(),
        });
      }
    }

    // Set layout ID and append to container
    layoutElement.element.setAttribute('id', layoutStrategy.getId());
    container.appendChild(layoutElement.element);
    helpers.setStyles(layoutElement.styles);

    // Dispatch feed loaded event
    events.dispatch(container, events.eventNames.FEED_LOADED, {
      items: feedData,
      count: feedData.length,
      total: totalEntries || feedData.length,
      isFallback,
      categoryNames,
    });

    // Display the results
    await displayResults({ feedData });

    // Add announcer
    const announcer = new Announcer({ message });
    container.appendChild(announcer.getElement());
  };

  return {
    displayNoResults,
    displayResults,
    displayResultStart,
  };
}

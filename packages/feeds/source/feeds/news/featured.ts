/**
 * News Featured Feed (Refactored with Element Builder)
 *
 * Displays news articles with a featured layout:
 * - First article: Large overlay card with sticky positioning
 * - Next 2 articles: Block cards in grid layout
 * - Additional articles: Lazy-loaded block cards
 *
 * Uses Element Builder pattern for clean, declarative construction.
 *
 * @module feeds/news/featured
 */

import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { card } from '@universityofmaryland/web-elements-library/composite';
import {
  gridGap,
  gridOffset,
} from '@universityofmaryland/web-elements-library/layout';
import {
  LoadingState,
  PaginationState,
  EmptyState,
  Announcer,
} from '../../states';
import { newsFetchStrategy } from '../../strategies/fetch/news';
import { newsDisplayStrategy } from '../../strategies/display/news';
import {
  events as eventUtilities,
  styles as styleUtilities,
} from '../../helpers';
import { type FeaturedProps } from './_types';
import { type ElementModel } from '../../_types';
import { type NewsEntry } from 'types/data';

// ============================================================================
// CONSTANTS
// ============================================================================

/** Featured layout displays 3 items initially: 1 overlay + 2 block cards */
const INITIAL_ITEMS = 3;

/** Lazy loading adds 2 items at a time to fill a row in the 2-column grid */
const LOAD_MORE_ITEMS = 2;

// ============================================================================
// PURE HELPER FUNCTIONS
// ============================================================================

/**
 * Create base props for fetch strategy
 *
 * @param props - Feed props
 * @param offset - Current offset
 * @returns Base props object for strategy's composeApiVariables
 */
const createFetchProps = (
  props: Pick<FeaturedProps, 'token' | 'categories' | 'isUnion'>,
  offset: number,
) => ({
  token: props.token,
  categories: props.categories,
  isUnion: props.isUnion,
  numberOfRowsToStart: offset === 0 ? INITIAL_ITEMS : LOAD_MORE_ITEMS,
  numberOfColumnsToShow: 1,
  getOffset: () => offset,
});

/**
 * Create image configuration for news entry
 *
 * @param entry - News entry
 * @returns Image config object
 */
const createImageConfig = (entry: NewsEntry) => ({
  imageUrl: entry.image[0]?.url,
  altText: entry.image[0]?.altText || 'News Article Image',
  linkUrl: entry.url,
  linkLabel: 'Maryland Today Article with image',
});

/**
 * Create announcer message
 *
 * @param offset - Current offset
 * @param total - Total entries
 * @param isLazyLoad - Lazy load enabled
 * @returns Announcer message
 */
const createAnnouncerMessage = (
  offset: number,
  total: number,
  isLazyLoad: boolean,
): string => {
  return isLazyLoad
    ? `Showing ${offset} of ${total} articles`
    : `Showing ${offset} articles`;
};

// ============================================================================
// STATE MANAGER CLASS
// ============================================================================

/**
 * Manages featured feed state and shadow DOM synchronization
 *
 * Encapsulates all mutable state including pagination, offset,
 * and shadow DOM management.
 */
class FeaturedFeedState {
  private stylesArray: string[] = [];
  private shadowRoot: ShadowRoot | null = null;
  private totalEntries: number = 0;
  private offset: number = 0;
  private hasRenderedOffset: boolean = false;
  private pagination: PaginationState | null = null;

  /**
   * Initialize state with initial styles
   *
   * @param initialStyles - Initial CSS styles
   */
  constructor(initialStyles: string) {
    this.stylesArray.push(initialStyles);
  }

  /**
   * Add styles to the accumulated styles
   *
   * @param styles - CSS styles to add
   */
  addStyles(styles: string): void {
    this.stylesArray.push(styles);
  }

  /**
   * Set shadow root reference for style updates
   *
   * @param shadow - Shadow root element
   */
  setShadowRoot(shadow: ShadowRoot): void {
    this.shadowRoot = shadow;
  }

  /**
   * Update shadow DOM styles
   *
   * @returns Promise that resolves when styles are updated
   */
  async updateShadowStyles(): Promise<void> {
    if (!this.shadowRoot) return;
    await styleUtilities.setShadowStyles({
      shadowRoot: this.shadowRoot,
      styles: this.getStyles(),
    });
  }

  /**
   * Get accumulated styles as single string
   *
   * @returns Combined CSS styles
   */
  getStyles(): string {
    return this.stylesArray.join('\n');
  }

  /**
   * Get shadow root callback for events
   *
   * @returns Callback function for shadow root
   */
  getShadowCallback(): (shadow: ShadowRoot) => void {
    return (shadow) => this.setShadowRoot(shadow);
  }

  /**
   * Get current offset
   *
   * @returns Current offset
   */
  getOffset(): number {
    return this.offset;
  }

  /**
   * Set offset to specific value
   *
   * @param value - New offset value
   */
  setOffset(value: number): void {
    this.offset = value;
  }

  /**
   * Increment offset by count
   *
   * @param count - Number to increment by
   */
  incrementOffset(count: number): void {
    this.offset += count;
  }

  /**
   * Get total entries
   *
   * @returns Total entries
   */
  getTotalEntries(): number {
    return this.totalEntries;
  }

  /**
   * Set total entries
   *
   * @param total - Total entries
   */
  setTotalEntries(total: number): void {
    this.totalEntries = total;
  }

  /**
   * Check if offset layout has been rendered
   *
   * @returns True if offset layout rendered
   */
  hasOffset(): boolean {
    return this.hasRenderedOffset;
  }

  /**
   * Mark offset layout as rendered
   */
  markOffsetRendered(): void {
    this.hasRenderedOffset = true;
  }

  /**
   * Get pagination state
   *
   * @returns Pagination state or null
   */
  getPagination(): PaginationState | null {
    return this.pagination;
  }

  /**
   * Set pagination state
   *
   * @param pagination - Pagination state
   */
  setPagination(pagination: PaginationState | null): void {
    this.pagination = pagination;
  }
}

// ============================================================================
// RENDERING FUNCTIONS
// ============================================================================

/**
 * Create overlay card for featured entry
 *
 * @param entry - News entry
 * @param state - State manager
 * @param isThemeDark - Dark theme flag
 * @returns Overlay card element model
 */
const createOverlayCard = (
  entry: NewsEntry,
  state: FeaturedFeedState,
  isThemeDark: boolean,
): ElementModel => {
  const overlayCard = newsDisplayStrategy.mapEntryToCard(entry, {
    isOverlay: true,
    isThemeDark,
    imageConfig: () => createImageConfig(entry),
  });

  // Add custom overlay styles
  state.addStyles(`
    ${overlayCard.styles}

    .${card.overlay.imageClassRef} {
      height: inherit;
    }

    .${card.overlay.imageClassRef} .umd-asset-image-wrapper-scaled {
      position: absolute;
    }
  `);

  return overlayCard;
};

/**
 * Create block cards for entries
 *
 * @param entries - News entries
 * @param state - State manager
 * @param options - Card options
 * @returns Array of block card element models
 */
const createBlockCards = (
  entries: NewsEntry[],
  state: FeaturedFeedState,
  options: { isThemeDark: boolean; isTransparent: boolean },
): ElementModel[] => {
  return entries.map((entry) => {
    const blockCard = newsDisplayStrategy.mapEntryToCard(entry, {
      isThemeDark: options.isThemeDark,
      isTransparent: options.isTransparent,
      isAligned: true,
      imageConfig: () => createImageConfig(entry),
    });

    state.addStyles(blockCard.styles);
    return blockCard;
  });
};

/**
 * Render featured layout (initial load only)
 *
 * @param container - Container element
 * @param entries - News entries
 * @param state - State manager
 * @param props - Feed props
 * @param loadMore - Load more callback
 * @returns Promise that resolves when rendering is complete
 */
const renderFeaturedLayout = async (
  container: HTMLElement,
  entries: NewsEntry[],
  state: FeaturedFeedState,
  props: FeaturedProps,
  loadMore: () => Promise<void>,
): Promise<void> => {
  const {
    isThemeDark = false,
    isTransparent = false,
    isLayoutReversed = false,
    overwriteStickyPosition,
    isLazyLoad = false,
  } = props;

  // Fall back to standard grid if not enough entries or already rendered
  if (entries.length < 2 || state.hasOffset()) {
    return renderStandardGrid(container, entries, state, {
      isThemeDark,
      isTransparent,
    });
  }

  state.markOffsetRendered();

  // Create offset layout
  const offsetLayout = gridOffset({
    columns: 2,
    isLayoutReversed,
    stickyTopPosition: overwriteStickyPosition,
  });

  // Create grid for remaining items
  const gridLayout = gridGap({ columns: 2 });
  gridLayout.element.setAttribute('id', 'umd-featured-news-grid-container');

  // First item: overlay card
  const overlayCard = createOverlayCard(entries[0], state, isThemeDark);

  // Next 2 items: block cards
  const blockCards = createBlockCards(entries.slice(1, 3), state, {
    isThemeDark,
    isTransparent,
  });

  // Append block cards to grid
  blockCards.forEach((card) => {
    gridLayout.element.appendChild(card.element);
  });

  // Assemble offset layout
  offsetLayout.element.appendChild(overlayCard.element);
  offsetLayout.element.appendChild(gridLayout.element);
  container.appendChild(offsetLayout.element);

  state.addStyles(offsetLayout.styles);
  state.addStyles(gridLayout.styles);
  state.setOffset(3); // We've shown 3 items

  // Add pagination if needed
  if (isLazyLoad && state.getTotalEntries() > state.getOffset()) {
    const pagination = new PaginationState({
      totalEntries: state.getTotalEntries(),
      offset: state.getOffset(),
      isLazyLoad: true,
      callback: loadMore,
    });

    const paginationElement = pagination.render(container);
    if (paginationElement) state.addStyles(paginationElement.styles);
    state.setPagination(pagination);
  }

  // Announcer
  const message = createAnnouncerMessage(
    INITIAL_ITEMS,
    state.getTotalEntries(),
    isLazyLoad,
  );
  const announcer = new Announcer({ message });
  container.appendChild(announcer.getElement());

  await state.updateShadowStyles();
};

/**
 * Render standard grid (for lazy-loaded items or fallback)
 *
 * @param container - Container element
 * @param entries - News entries
 * @param state - State manager
 * @param options - Rendering options
 * @returns Promise that resolves when rendering is complete
 */
const renderStandardGrid = async (
  container: HTMLElement,
  entries: NewsEntry[],
  state: FeaturedFeedState,
  options: { isThemeDark: boolean; isTransparent: boolean },
): Promise<void> => {
  let gridContainer = container.querySelector(
    '#umd-featured-news-grid-container',
  ) as HTMLElement;

  // Create grid if it doesn't exist
  if (!gridContainer) {
    const gridLayout = gridGap({ columns: 2 });
    gridLayout.element.setAttribute('id', 'umd-featured-news-grid-container');
    container.appendChild(gridLayout.element);
    state.addStyles(gridLayout.styles);
    gridContainer = gridLayout.element;
  }

  // Create and append block cards
  const blockCards = createBlockCards(entries, state, options);
  blockCards.forEach((card) => {
    gridContainer.appendChild(card.element);
  });

  state.incrementOffset(entries.length);

  await state.updateShadowStyles();
};

/**
 * Render error state
 *
 * @param container - Container element
 * @param message - Error message
 * @param state - State manager
 * @param isThemeDark - Dark theme flag
 * @returns Promise that resolves when rendering is complete
 */
const renderError = async (
  container: HTMLElement,
  message: string,
  state: FeaturedFeedState,
  isThemeDark: boolean,
): Promise<void> => {
  const emptyState = new EmptyState({ message, isThemeDark });
  emptyState.render(container);
  state.addStyles(emptyState.styles);
  await state.updateShadowStyles();
};

// ============================================================================
// MAIN EXPORT
// ============================================================================

/**
 * Create a featured news feed
 *
 * Displays news with featured layout: overlay card + grid.
 * Uses Element Builder pattern for clean construction.
 *
 * @param props - Feed configuration
 * @returns ElementModel with feed element, styles, and events
 *
 * @example
 * ```typescript
 * const feed = newsFeatured({
 *   token: 'my-token',
 *   isLazyLoad: true,
 * });
 * ```
 *
 * @example
 * ```typescript
 * // With custom sticky position
 * const feed = newsFeatured({
 *   token: 'my-token',
 *   overwriteStickyPosition: 100,
 *   isLayoutReversed: true,
 * });
 * ```
 */
export default (props: FeaturedProps): ElementModel => {
  const {
    token,
    categories,
    isUnion,
    isThemeDark = false,
    isLazyLoad = false,
    isTransparent = false,
  } = props;

  // Create container using ElementBuilder
  const containerBuilder = new ElementBuilder('div').withClassName(
    'featured-news-feed',
  );

  // Get element for manipulation (non-destructive)
  const container = containerBuilder.getElement();

  // Initialize state management
  const loading = new LoadingState({ isThemeDark });
  const state = new FeaturedFeedState(loading.styles);

  /**
   * Load more articles (for lazy loading)
   */
  const loadMore = async (): Promise<void> => {
    // Remove pagination button
    const pagination = state.getPagination();
    if (pagination) {
      pagination.remove();
    }

    // Show loading indicator
    loading.show(container);

    // Load more items
    const fetchProps = createFetchProps(
      { token, categories, isUnion },
      state.getOffset(),
    );
    const variables = newsFetchStrategy.composeApiVariables(fetchProps);

    const entries = await newsFetchStrategy.fetchEntries(variables);

    // Hide loading indicator
    loading.hide();

    if (!entries || entries.length === 0) return;

    await renderStandardGrid(container, entries, state, {
      isThemeDark,
      isTransparent,
    });

    // Update pagination state
    if (pagination) {
      pagination.updateState(state.getOffset(), state.getTotalEntries());
      if (pagination.styles) state.addStyles(pagination.styles);
      await state.updateShadowStyles();
    }

    // Update announcer
    const existingAnnouncer = container.querySelector(
      '[role="status"]',
    ) as HTMLElement;
    if (existingAnnouncer) {
      existingAnnouncer.textContent = createAnnouncerMessage(
        state.getOffset(),
        state.getTotalEntries(),
        isLazyLoad,
      );
    }

    // Dispatch update event
    eventUtilities.dispatch(
      container,
      eventUtilities.eventNames.FEED_LOADED_MORE,
      {
        items: entries,
        count: entries.length,
        total: state.getTotalEntries(),
      },
    );
  };

  /**
   * Initialize feed
   */
  const initialize = async (): Promise<void> => {
    loading.show(container);

    // Fetch initial items
    const fetchProps = createFetchProps({ token, categories, isUnion }, 0);
    const variables = newsFetchStrategy.composeApiVariables(fetchProps);

    const [count, entries] = await Promise.all([
      newsFetchStrategy.fetchCount(variables),
      newsFetchStrategy.fetchEntries(variables),
    ]);

    loading.hide();

    // Handle no results
    if (!entries || entries.length === 0) {
      await renderError(
        container,
        'No news articles found',
        state,
        isThemeDark,
      );
      return;
    }

    state.setTotalEntries(count || entries.length);

    // Dispatch loaded event
    eventUtilities.dispatch(container, eventUtilities.eventNames.FEED_LOADED, {
      items: entries,
      count: entries.length,
      total: state.getTotalEntries(),
    });

    // Render featured layout
    await renderFeaturedLayout(container, entries, state, props, loadMore);
  };

  // Start initialization
  initialize();

  // Build and return element model
  const model = containerBuilder.build();

  // Custom event: allow external control of sticky position
  const setPosition = (position: number) => {
    const overlayElement = container.querySelector(
      `.${card.overlay.imageClassRef}`,
    ) as HTMLElement;
    if (overlayElement) overlayElement.style.top = `${position}px`;
  };

  return {
    element: model.element,
    get styles() {
      return state.getStyles();
    },
    events: {
      callback: state.getShadowCallback(),
      setPosition, // Custom event for sticky position control
    },
  };
};

/**
 * News Featured Feed (Migrated - Specialized Implementation)
 *
 * Displays news articles with a featured layout:
 * - First article: Large overlay card with sticky positioning
 * - Next 2 articles: Block cards in grid layout
 * - Additional articles: Lazy-loaded block cards
 *
 * Uses specialized implementation with strategies and utilities.
 *
 * @module composite/news/featured-new
 */

import { card } from '@universityofmaryland/web-elements-library/composite';
import {
  gridGap,
  gridOffset,
} from '@universityofmaryland/web-elements-library/layout';
import { createImageOrLinkedImage } from '@universityofmaryland/web-utilities-library/elements';
import * as Styles from '@universityofmaryland/web-styles-library';
import { LoadingState, PaginationState, EmptyState, Announcer } from '../../states';
import { newsFetchStrategy } from '../../strategies/fetch/news';
import { newsDisplayStrategy } from '../../strategies/display/news';
import { events as eventUtilities, styles as styleUtilities } from '../../helpers';
import { type FeaturedProps } from './_types';
import { type ElementModel } from '../../_types';
import { NewsEntryType } from '../../strategies/display/news';

export default (props: FeaturedProps): ElementModel => {
  const {
    token,
    isThemeDark = false,
    isLazyLoad = false,
    isLayoutReversed = false,
    isTransparent = false,
    overwriteStickyPosition,
    numberOfRowsToStart = 3,
    categories,
    isUnion = false,
  } = props;

  // State management
  const container = document.createElement('div');
  const loading = new LoadingState({ isThemeDark });
  let styles = loading.styles;
  let shadowRoot: ShadowRoot | null = null;
  let totalEntries = 0;
  let offset = 0;
  let hasRenderedOffset = false; // Track if offset layout was created

  // Helper to add styles
  const setStyles = (additionalStyles: string) => {
    styles += additionalStyles;
  };

  // Shadow root callback
  const callback = (shadow: ShadowRoot) => {
    shadowRoot = shadow;
  };

  // Custom event: allow external control of sticky position
  const setPosition = (position: number) => {
    const overlayElement = container.querySelector(
      `.${card.overlay.imageClassRef}`,
    ) as HTMLElement;
    if (overlayElement) overlayElement.style.top = `${position}px`;
  };

  // Update shadow root styles
  const updateShadowStyles = async () => {
    if (!shadowRoot) return;
    await styleUtilities.setShadowStyles({ shadowRoot, styles });
  };

  // Render the featured layout (first load only)
  const renderFeaturedLayout = async (entries: NewsEntryType[]) => {
    if (entries.length < 2 || hasRenderedOffset) {
      // Fall back to simple grid if not enough entries or already rendered
      return renderStandardGrid(entries);
    }

    hasRenderedOffset = true;

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
    const firstEntry = entries[0];
    const overlayCard = newsDisplayStrategy.mapEntryToCard(firstEntry, {
      isOverlay: true,
      imageConfig: () => ({
        imageUrl: firstEntry.image[0]?.url,
        altText: firstEntry.image[0]?.altText || 'News Article Image',
        linkUrl: firstEntry.url,
        linkLabel: 'Maryland Today Article with image',
      }),
    });

    setStyles(overlayCard.styles);

    // Next 2 items: block cards
    const remainingEntries = entries.slice(1, 3);
    remainingEntries.forEach((entry) => {
      const blockCard = newsDisplayStrategy.mapEntryToCard(entry, {
        isThemeDark,
        isTransparent,
        isAligned: true,
        imageConfig: () => ({
          imageUrl: entry.image[0]?.url,
          altText: entry.image[0]?.altText || 'News Article Image',
          linkUrl: entry.url,
          linkLabel: 'Maryland Today Article with image',
        }),
      });
      gridLayout.element.appendChild(blockCard.element);
      setStyles(blockCard.styles);
    });

    // Assemble offset layout
    offsetLayout.element.appendChild(overlayCard.element);
    offsetLayout.element.appendChild(gridLayout.element);
    container.appendChild(offsetLayout.element);

    setStyles(offsetLayout.styles);
    setStyles(gridLayout.styles);

    offset = 3; // We've shown 3 items

    // Add pagination if needed
    if (isLazyLoad && totalEntries > offset) {
      const pagination = new PaginationState({
        totalEntries,
        offset,
        isLazyLoad: true,
        callback: loadMore,
      });
      const paginationElement = pagination.render(container);
      if (paginationElement) setStyles(paginationElement.styles);
    }

    // Announcer
    const message = isLazyLoad
      ? `Showing ${offset} of ${totalEntries} articles`
      : `Showing ${offset} articles`;
    const announcer = new Announcer({ message });
    container.appendChild(announcer.getElement());

    await updateShadowStyles();
  };

  // Render standard grid (for lazy-loaded items or fallback)
  const renderStandardGrid = async (entries: NewsEntryType[]) => {
    let gridContainer = container.querySelector(
      '#umd-featured-news-grid-container',
    ) as HTMLElement;

    // Create grid if it doesn't exist
    if (!gridContainer) {
      const gridLayout = gridGap({ columns: 2 });
      gridLayout.element.setAttribute('id', 'umd-featured-news-grid-container');
      container.appendChild(gridLayout.element);
      setStyles(gridLayout.styles);
      gridContainer = gridLayout.element;
    }

    // Add entries to grid
    entries.forEach((entry) => {
      const blockCard = newsDisplayStrategy.mapEntryToCard(entry, {
        isThemeDark,
        isTransparent,
        isAligned: true,
        imageConfig: () => ({
          imageUrl: entry.image[0]?.url,
          altText: entry.image[0]?.altText || 'News Article Image',
          linkUrl: entry.url,
          linkLabel: 'Maryland Today Article with image',
        }),
      });
      gridContainer.appendChild(blockCard.element);
      setStyles(blockCard.styles);
    });

    offset += entries.length;

    await updateShadowStyles();
  };

  // Load more (for lazy loading)
  const loadMore = async () => {
    const variables = newsFetchStrategy.composeApiVariables({
      token,
      categories,
      isUnion,
      numberOfRowsToStart: 2, // Load 2 more at a time
      getOffset: () => offset,
    });

    const entries = await newsFetchStrategy.fetchEntries(variables);

    if (!entries || entries.length === 0) return;

    await renderStandardGrid(entries);

    // Update pagination
    if (isLazyLoad && totalEntries > offset) {
      const pagination = new PaginationState({
        totalEntries,
        offset,
        isLazyLoad: true,
        callback: loadMore,
      });
      const paginationElement = pagination.render(container);
      if (paginationElement) setStyles(paginationElement.styles);
    }

    // Dispatch update event
    eventUtilities.dispatch(
      container,
      eventUtilities.eventNames.FEED_LOADED_MORE,
      {
        items: entries,
        count: entries.length,
        total: totalEntries,
      },
    );
  };

  // Initialize feed
  const initialize = async () => {
    container.appendChild(loading.element);

    const variables = newsFetchStrategy.composeApiVariables({
      token,
      categories,
      isUnion,
      numberOfRowsToStart,
      getOffset: () => 0,
    });

    const [count, entries] = await Promise.all([
      newsFetchStrategy.fetchCount(variables),
      newsFetchStrategy.fetchEntries(variables),
    ]);

    loading.hide();

    if (!entries || entries.length === 0) {
      const emptyState = new EmptyState({
        message: 'No news articles found',
        isThemeDark,
      });
      emptyState.render(container);
      setStyles(emptyState.styles);
      await updateShadowStyles();
      return;
    }

    totalEntries = count || entries.length;

    // Dispatch loaded event
    eventUtilities.dispatch(container, eventUtilities.eventNames.FEED_LOADED, {
      items: entries,
      count: entries.length,
      total: totalEntries,
    });

    // Render featured layout
    await renderFeaturedLayout(entries);
  };

  initialize();

  return {
    element: container,
    get styles() {
      return styles;
    },
    events: {
      callback,
      setPosition, // Custom event for sticky position control
    },
  };
};

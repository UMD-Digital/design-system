/**
 * Events Grouped Feed (Refactored with Element Builder)
 *
 * Grouped layout for event entries organized by date with dynamic headers.
 * Uses Element Builder pattern with custom grouping logic for date-based organization.
 *
 * @module feeds/events/grouped
 */

import * as Styles from '@universityofmaryland/web-styles-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { card } from '@universityofmaryland/web-elements-library/composite';
import { events as eventElements } from '@universityofmaryland/web-elements-library/atomic';
import {
  createTextWithLink,
  createTextContainer,
  createImageOrLinkedImage,
} from '@universityofmaryland/web-utilities-library/elements';
import { isExternalUrl } from '@universityofmaryland/web-utilities-library/network';
import { LoadingState, PaginationState, EmptyState, Announcer } from 'states';
import { eventsFetchStrategyRange } from 'strategies';
import { type EventEntry } from 'types/data';
import {
  grouping,
  events as eventUtilities,
  styles as styleUtilities,
} from '../../helpers';
import { type ListProps } from './_types';
import { type ElementModel } from '../../_types';

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
  props: Pick<ListProps, 'token' | 'categories' | 'numberOfRowsToStart'>,
  offset: number,
) => ({
  token: props.token,
  categories: props.categories,
  numberOfColumnsToShow: 1,
  numberOfRowsToStart: props.numberOfRowsToStart,
  getOffset: () => offset,
});

/**
 * Create image configuration for event entry
 *
 * @param entry - Event entry
 * @returns Image config object
 */
const createImageConfig = (entry: EventEntry) => {
  const imageUrl = entry.image?.[0]?.url;
  const altText = entry.image?.[0]?.altText;

  if (!imageUrl || !altText) {
    return null;
  }

  return {
    imageUrl: imageUrl,
    altText: altText,
    linkUrl: entry.url,
    linkLabel: 'University of Maryland Event',
  };
};

/**
 * Create announcer message
 *
 * @param count - Number of events shown
 * @param total - Total events
 * @param isLazyLoad - Lazy load enabled
 * @returns Announcer message
 */
const createAnnouncerMessage = (
  count: number,
  total: number,
  isLazyLoad: boolean,
): string => {
  return isLazyLoad
    ? `Showing ${count} of ${total} events`
    : `Showing ${count} events`;
};

// ============================================================================
// STATE MANAGER CLASS
// ============================================================================

/**
 * Manages grouped feed state and shadow DOM synchronization
 *
 * Encapsulates all mutable state including offset, total,
 * last date headline tracking, and shadow DOM management.
 */
class GroupedFeedState {
  private stylesArray: string[] = [];
  private shadowRoot: ShadowRoot | null = null;
  private totalEntries: number = 0;
  private offset: number = 0;
  private lastDateHeadline: string | null = null;

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
   * Get last date headline
   *
   * @returns Last date headline or null
   */
  getLastDateHeadline(): string | null {
    return this.lastDateHeadline;
  }

  /**
   * Set last date headline
   *
   * @param headline - Date headline
   */
  setLastDateHeadline(headline: string): void {
    this.lastDateHeadline = headline;
  }
}

// ============================================================================
// RENDERING FUNCTIONS
// ============================================================================

/**
 * Create date header element
 *
 * @param date - Date string
 * @param state - State manager
 * @returns Date header element model
 */
const createDateHeader = (
  date: string,
  state: GroupedFeedState,
): ElementModel => {
  const dateHeadline = document.createElement('p');
  dateHeadline.textContent = date;

  const headerElement = new ElementBuilder(dateHeadline)
    .styled(Styles.element.text.decoration.ribbon)
    .withStyles({
      element: {
        margin: `${Styles.token.spacing.lg} 0`,
      },
    })
    .build();

  state.addStyles(headerElement.styles);
  return headerElement;
};

/**
 * Create event card for grouped display
 *
 * @param entry - Event entry
 * @param isThemeDark - Dark theme flag
 * @returns Event card element model
 */
const createEventCard = (
  entry: EventEntry,
  isThemeDark: boolean,
): ElementModel => {
  const openInNewTab = isExternalUrl(entry.url);
  const imageData = createImageConfig(entry);
  const image =
    imageData && imageData.imageUrl && imageData.altText
      ? createImageOrLinkedImage({ ...imageData, openInNewTab })
      : null;

  return card.list({
    headline: createTextWithLink({ text: entry.title, url: entry.url, openInNewTab }),
    text: createTextContainer({ text: entry.summary, allowHTML: true }),
    dateSign: eventElements.sign({
      startMonth: entry.startMonth,
      startDay: entry.startDay,
      endMonth: entry.endMonth,
      endDay: entry.endDay,
      isThemeDark,
      isLargeSize: true,
    }),
    eventMeta: eventElements.meta({
      ...entry,
      isThemeDark,
    } as any),
    image: image,
    isAligned: false,
    isThemeDark,
  });
};

/**
 * Create group container with entries
 *
 * @param events - Event entries for this group
 * @param state - State manager
 * @param isThemeDark - Dark theme flag
 * @returns Group container element model
 */
const createGroupContainer = (
  events: EventEntry[],
  state: GroupedFeedState,
  isThemeDark: boolean,
): ElementModel => {
  const entriesBuilder = new ElementBuilder('div')
    .withClassName('umd-feed-events-grouped-entries')
    .withStyles({
      element: {
        [`&:not(:last-of-type)`]: {
          paddingBottom: Styles.token.spacing.md,
          borderBottom: `1px solid ${
            isThemeDark
              ? Styles.token.color.gray.dark
              : Styles.token.color.gray.light
          }`,
        },
        [`& + .umd-feed-events-grouped-entries`]: {
          paddingTop: Styles.token.spacing.md,
          marginTop: Styles.token.spacing.md,
          borderTop: `none`,
        },
        [`& > *:not(:last-child)`]: {
          paddingBottom: Styles.token.spacing.md,
          marginBottom: Styles.token.spacing.md,
          borderBottom: `1px solid ${
            isThemeDark
              ? Styles.token.color.gray.dark
              : Styles.token.color.gray.light
          }`,
        },
      },
    });

  // Create cards for each event
  events.forEach((entry) => {
    const eventCard = createEventCard(entry, isThemeDark);
    entriesBuilder.withChild(eventCard);
    state.addStyles(eventCard.styles);
  });

  const groupElement = entriesBuilder.build();
  state.addStyles(groupElement.styles);

  return groupElement;
};

/**
 * Render grouped events
 *
 * @param container - Container element
 * @param events - Event entries
 * @param state - State manager
 * @param isThemeDark - Dark theme flag
 * @param isLazyLoad - Lazy load enabled
 * @param loadMore - Load more callback
 * @returns Promise that resolves when rendering is complete
 */
const renderGroupedEvents = async (
  container: HTMLElement,
  events: EventEntry[],
  state: GroupedFeedState,
  isThemeDark: boolean,
  isLazyLoad: boolean,
  loadMore: () => Promise<void>,
): Promise<void> => {
  const grid = container.querySelector(
    '#umd-feed-events-grouped-container',
  ) as HTMLElement;
  if (!grid) return;

  // Remove existing states
  container.querySelector('.umd-loader-container')?.remove();
  container
    .querySelector(`.${Styles.layout.alignment.block.center.className}`)
    ?.remove();

  // Group events by date
  const groupedEvents = grouping.groupEventsByDate(events);
  let actualEventCount = 0;

  groupedEvents.forEach((group) => {
    // Add date header if it's a new date
    if (group.date !== state.getLastDateHeadline()) {
      const headerElement = createDateHeader(group.date, state);
      grid.appendChild(headerElement.element);
      state.setLastDateHeadline(group.date);
    }

    // Create group container with entries
    const groupElement = createGroupContainer(group.events, state, isThemeDark);
    grid.appendChild(groupElement.element);

    actualEventCount += group.events.length;
  });

  // Update offset with actual event count
  state.incrementOffset(actualEventCount);

  // Add pagination if lazy load enabled
  if (isLazyLoad && state.getTotalEntries() > state.getOffset()) {
    const pagination = new PaginationState({
      totalEntries: state.getTotalEntries(),
      offset: state.getOffset(),
      isLazyLoad: true,
      callback: loadMore,
    });

    const paginationElement = pagination.render(container);
    if (paginationElement) {
      state.addStyles(paginationElement.styles);
    }
  }

  // Update shadow root styles
  await state.updateShadowStyles();
};

/**
 * Render error state
 *
 * @param container - Container element
 * @param state - State manager
 * @param isThemeDark - Dark theme flag
 * @returns Promise that resolves when rendering is complete
 */
const renderError = async (
  container: HTMLElement,
  state: GroupedFeedState,
  isThemeDark: boolean,
): Promise<void> => {
  const emptyState = new EmptyState({
    message: 'No events found',
    isThemeDark,
  });
  emptyState.render(container);
  state.addStyles(emptyState.styles);

  const announcer = new Announcer({ message: 'No events found' });
  container.appendChild(announcer.getElement());

  eventUtilities.dispatch(container, eventUtilities.eventNames.FEED_ERROR, {
    error: 'No results found',
  });

  await state.updateShadowStyles();
};

// ============================================================================
// MAIN EXPORT
// ============================================================================

/**
 * Create a grouped events feed
 *
 * Groups events by date with dynamic date headers (Today, day names, formatted dates).
 * Events are sorted by priority within each group (multi-day events starting today first).
 * Uses Element Builder pattern for clean construction.
 *
 * @param props - Feed configuration
 * @returns ElementModel with feed element and styles
 *
 * @example
 * ```typescript
 * const feed = eventsGrouped({
 *   token: 'my-token',
 *   numberOfRowsToStart: 10,
 *   isLazyLoad: true,
 * });
 * ```
 *
 * @example
 * ```typescript
 * // With dark theme
 * const feed = eventsGrouped({
 *   token: 'my-token',
 *   numberOfRowsToStart: 20,
 *   isThemeDark: true,
 * });
 * ```
 */
export const eventsGrouped = (props: ListProps): ElementModel => {
  const {
    token,
    isThemeDark = false,
    isLazyLoad = false,
    numberOfRowsToStart,
    categories,
  } = props;

  // Create container using ElementBuilder
  const containerBuilder = new ElementBuilder('div').withClassName(
    'events-grouped-feed',
  );

  // Get element for manipulation (non-destructive)
  const container = containerBuilder.getElement();

  // Initialize state management
  const loading = new LoadingState({ isThemeDark });
  const state = new GroupedFeedState(loading.styles);

  // Create layout
  const layoutElement = new ElementBuilder('div')
    .withClassName('umd-feed-events-grouped')
    .build();
  state.addStyles(layoutElement.styles);

  /**
   * Load more events (for lazy loading)
   */
  const loadMore = async (): Promise<void> => {
    const fetchProps = createFetchProps(
      { token, categories, numberOfRowsToStart },
      state.getOffset(),
    );
    const variables = eventsFetchStrategyRange.composeApiVariables(fetchProps);

    const entries = await eventsFetchStrategyRange.fetchEntries(variables);
    if (entries && entries.length > 0) {
      await renderGroupedEvents(
        container,
        entries,
        state,
        isThemeDark,
        isLazyLoad,
        loadMore,
      );
    }
  };

  /**
   * Initialize feed
   */
  const initialize = async (): Promise<void> => {
    loading.show(container);

    const fetchProps = createFetchProps(
      { token, categories, numberOfRowsToStart },
      0,
    );
    const variables = eventsFetchStrategyRange.composeApiVariables(fetchProps);

    // Fetch count and entries
    const [count, entries] = await Promise.all([
      eventsFetchStrategyRange.fetchCount(variables),
      eventsFetchStrategyRange.fetchEntries(variables),
    ]);

    // Remove loading
    loading.hide();

    // Handle no results
    if (!entries || entries.length === 0) {
      await renderError(container, state, isThemeDark);
      return;
    }

    // Set total and append layout
    state.setTotalEntries(count || entries.length);
    layoutElement.element.setAttribute(
      'id',
      'umd-feed-events-grouped-container',
    );
    container.appendChild(layoutElement.element);

    // Dispatch loaded event
    eventUtilities.dispatch(container, eventUtilities.eventNames.FEED_LOADED, {
      items: entries,
      count: entries.length,
      total: state.getTotalEntries(),
    });

    // Render grouped events
    await renderGroupedEvents(
      container,
      entries,
      state,
      isThemeDark,
      isLazyLoad,
      loadMore,
    );

    // Add announcer
    const message = createAnnouncerMessage(
      entries.length,
      state.getTotalEntries(),
      isLazyLoad,
    );
    const announcer = new Announcer({ message });
    container.appendChild(announcer.getElement());
  };

  // Start initialization
  initialize();

  // Build and return element model
  const model = containerBuilder.build();

  return {
    element: model.element,
    get styles() {
      return state.getStyles();
    },
    events: {
      callback: state.getShadowCallback(),
    },
  };
};

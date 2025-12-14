/**
 * Events Grouped Feed (Specialized Implementation)
 *
 * Grouped layout for event entries organized by date with dynamic headers.
 * This implementation uses strategies and utilities but requires custom grouping logic
 * that doesn't fit the standard factory pattern.
 *
 * @module composite/events/grouped-new
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
import { LoadingState, PaginationState, EmptyState, Announcer } from 'states';
import { eventsFetchStrategyRange } from 'strategies';
import { EventEntry } from 'types/data';
import {
  grouping,
  events as eventUtilities,
  styles as styleUtilities,
} from '../../helpers';
import { type ListProps } from './_types';
import { type ElementModel } from '../../_types';

/**
 * Create a grouped events feed
 *
 * Groups events by date with dynamic date headers (Today, day names, formatted dates).
 * Events are sorted by priority within each group (multi-day events starting today first).
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
 *
 * document.body.appendChild(feed.element);
 * ```
 */
export default (props: ListProps): ElementModel => {
  const {
    token,
    isThemeDark = false,
    isLazyLoad = false,
    numberOfRowsToStart,
    categories,
  } = props;

  // State management
  const container = document.createElement('div');
  const loading = new LoadingState({ isThemeDark });
  let styles = loading.styles;
  let shadowRoot: ShadowRoot | null = null;
  let totalEntries = 0;
  let offset = 0;
  let lastDateHeadline: string | null = null;

  // Helper functions
  const setStyles = (additionalStyles: string) => {
    styles += additionalStyles;
  };

  // Shadow root callback
  const shadowRootCallback = (shadow: ShadowRoot) => {
    shadowRoot = shadow;
  };

  // Create layout
  const layoutElement = new ElementBuilder()
    .withClassName('umd-feed-events-grouped')
    .build();
  setStyles(layoutElement.styles);

  // Render grouped events
  const renderGroupedEvents = async (events: EventEntry[]) => {
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
      if (group.date !== lastDateHeadline) {
        const dateHeadline = document.createElement('p');
        dateHeadline.textContent = group.date;

        const headerElement = new ElementBuilder(dateHeadline)
          .styled(Styles.element.text.decoration.ribbon)
          .withStyles({
            element: {
              margin: `${Styles.token.spacing.lg} 0`,
            },
          })
          .build();

        grid.appendChild(headerElement.element);
        setStyles(headerElement.styles);
        lastDateHeadline = group.date;
      }

      // Create entries for this group
      const dateEntries = group.events.map((entry) =>
        card.list({
          headline: createTextWithLink({ text: entry.title, url: entry.url }),
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
          image: createImageOrLinkedImage({
            imageUrl: entry.image[0].url,
            altText: entry.image[0].altText || 'Event Image',
            linkUrl: entry.url,
            linkLabel: 'University of Maryland Event',
          }),
          isAligned: false,
          isThemeDark,
        }),
      );

      actualEventCount += group.events.length;

      // Create container for this group's entries
      const entriesBuilder = new ElementBuilder()
        .withClassName('umd-feed-events-grouped-entries')
        .withStyles({
          element: {
            [` > *:not(:last-child)`]: {
              paddingBottom: Styles.token.spacing.md,
              marginBottom: Styles.token.spacing.md,
              borderBottom: `1px solid ${
                isThemeDark
                  ? Styles.token.color.gray.dark
                  : Styles.token.color.gray.light
              }`,
            },
            [`+ .umd-feed-events-grouped-entries`]: {
              paddingTop: Styles.token.spacing.md,
              marginTop: Styles.token.spacing.md,
              borderTop: `1px solid ${
                isThemeDark
                  ? Styles.token.color.gray.dark
                  : Styles.token.color.gray.light
              }`,
            },
          },
        });

      dateEntries.forEach((entry) => {
        entriesBuilder.withChild(entry);
        setStyles(entry.styles);
      });

      const groupElement = entriesBuilder.build();
      grid.appendChild(groupElement.element);
      setStyles(groupElement.styles);
    });

    // Update offset with actual event count
    offset += actualEventCount;

    // Add pagination if lazy load enabled
    if (isLazyLoad && totalEntries > offset) {
      const pagination = new PaginationState({
        totalEntries,
        offset,
        isLazyLoad: true,
        callback: loadMore,
      });

      const paginationElement = pagination.render(container);
      if (paginationElement) {
        setStyles(paginationElement.styles);
      }
    }

    // Update shadow root styles
    if (shadowRoot) {
      await styleUtilities.setShadowStyles({ shadowRoot, styles });
    }
  };

  // Load more function for lazy loading
  const loadMore = async () => {
    const variables = eventsFetchStrategyRange.composeApiVariables({
      token,
      categories,
      numberOfColumnsToShow: 1,
      numberOfRowsToStart,
      getOffset: () => offset,
    });

    const entries = await eventsFetchStrategyRange.fetchEntries(variables);
    if (entries && entries.length > 0) {
      await renderGroupedEvents(entries);
    }
  };

  // Initial fetch and display
  const initialize = async () => {
    container.appendChild(loading.element);

    const variables = eventsFetchStrategyRange.composeApiVariables({
      token,
      categories,
      numberOfColumnsToShow: 1,
      numberOfRowsToStart,
      getOffset: () => 0,
    });

    // Fetch count and entries
    const [count, entries] = await Promise.all([
      eventsFetchStrategyRange.fetchCount(variables),
      eventsFetchStrategyRange.fetchEntries(variables),
    ]);

    // Remove loading
    loading.hide();

    // Handle no results
    if (!entries || entries.length === 0) {
      const emptyState = new EmptyState({
        message: 'No events found',
        isThemeDark,
      });
      emptyState.render(container);
      setStyles(emptyState.styles);

      const announcer = new Announcer({ message: 'No events found' });
      container.appendChild(announcer.getElement());

      eventUtilities.dispatch(container, eventUtilities.eventNames.FEED_ERROR, {
        error: 'No results found',
      });

      return;
    }

    // Set total and append layout
    totalEntries = count || entries.length;
    layoutElement.element.setAttribute(
      'id',
      'umd-feed-events-grouped-container',
    );
    container.appendChild(layoutElement.element);

    // Dispatch loaded event
    eventUtilities.dispatch(container, eventUtilities.eventNames.FEED_LOADED, {
      items: entries,
      count: entries.length,
      total: totalEntries,
    });

    // Render grouped events
    await renderGroupedEvents(entries);

    // Add announcer
    const showAmount = entries.length;
    const message = isLazyLoad
      ? `Showing ${showAmount} of ${totalEntries} events`
      : `Showing ${showAmount} events`;
    const announcer = new Announcer({ message });
    container.appendChild(announcer.getElement());
  };

  // Start initialization
  initialize();

  return {
    element: container,
    get styles() {
      return styles;
    },
    events: {
      callback: shadowRootCallback,
    },
  };
};

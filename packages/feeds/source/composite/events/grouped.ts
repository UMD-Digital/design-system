import * as Styles from '@universityofmaryland/web-styles-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { Atomic, Composite } from '@universityofmaryland/web-elements-library';
import * as feedElements from 'elements';
import * as feedMacros from 'macros';
import * as feedFetch from './common/fetch';
import * as feedDisplay from './common/display';
import * as dataComposed from './common/data';
import { EVENTS_RANGE_QUERY, EVENTS_COUNT_RANGE_QUERY } from './common/queries';
import { type ListProps, type FeedDisplay, type EventType } from './_types';
import { type ElementModel } from '../../_types';

interface GroupedEvent {
  date: string;
  events: EventType[];
}

const getDateBanner = (dateStamp: string): string => {
  // Parse the date string more reliably
  // Handle both "YYYY-MM-DD" and ISO format strings
  const dateParts = dateStamp.split('T')[0].split('-');
  const year = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1; // Month is 0-indexed
  const day = parseInt(dateParts[2], 10);

  // Create dates using local timezone to avoid timezone shifts
  const eventDate = new Date(year, month, day);
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const weekFromNow = new Date();
  weekFromNow.setDate(currentDate.getDate() + 7);
  weekFromNow.setHours(0, 0, 0, 0);

  // Check if it's today
  if (
    eventDate.getFullYear() === currentDate.getFullYear() &&
    eventDate.getMonth() === currentDate.getMonth() &&
    eventDate.getDate() === currentDate.getDate()
  ) {
    return 'Today';
  }

  // Check if it's within the next 7 days
  if (
    eventDate.getTime() > currentDate.getTime() &&
    eventDate.getTime() <= weekFromNow.getTime()
  ) {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    return days[eventDate.getDay()];
  }

  // Otherwise return day of week, month and day
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return `${days[eventDate.getDay()]}, ${
    months[eventDate.getMonth()]
  } ${eventDate.getDate()}`;
};

const MONTH_MAP: Record<string, string> = {
  Jan: '01',
  Feb: '02',
  Mar: '03',
  Apr: '04',
  May: '05',
  Jun: '06',
  Jul: '07',
  Aug: '08',
  Sep: '09',
  Oct: '10',
  Nov: '11',
  Dec: '12',
};

const parseLocalDate = (dateString: string): Date => {
  const parts = dateString.split('-');
  const date = new Date(
    parseInt(parts[0], 10),
    parseInt(parts[1], 10) - 1,
    parseInt(parts[2], 10),
  );
  date.setHours(0, 0, 0, 0);
  return date;
};

const getEventStartDate = (event: EventType): Date => {
  return parseLocalDate(event.startStamp.split('T')[0]);
};

const isMultiDayEvent = (event: EventType): boolean => {
  const startParts = event.startStamp.split('T')[0].split('-');
  const startMonth = startParts[1];
  const startDay = startParts[2];
  const endMonth = MONTH_MAP[event.endMonth];
  const endDay = event.endDay.padStart(2, '0');

  return !(startMonth === endMonth && startDay === endDay);
};

const eventStartsOnDate = (event: EventType, targetDate: Date): boolean => {
  const eventStartDate = getEventStartDate(event);
  return eventStartDate.getTime() === targetDate.getTime();
};

const getEventPriority = (event: EventType, groupDate: Date): number => {
  const isMulti = isMultiDayEvent(event);
  const startsOnDate = eventStartsOnDate(event, groupDate);

  if (isMulti && startsOnDate) return 1;
  if (!isMulti) return 2;
  return 3;
};

const sortEventsByPriority = (
  events: EventType[],
  groupDate: Date,
): EventType[] => {
  return [...events].sort((a, b) => {
    const aPriority = getEventPriority(a, groupDate);
    const bPriority = getEventPriority(b, groupDate);
    return aPriority - bPriority;
  });
};

const groupEventsByDate = (events: EventType[]): GroupedEvent[] => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const grouped = events.reduce((acc, event) => {
    const eventDate = getEventStartDate(event);
    const dateKey =
      eventDate < currentDate
        ? currentDate.toISOString().split('T')[0]
        : event.startStamp;

    if (!acc[dateKey]) {
      acc[dateKey] = {
        date: getDateBanner(dateKey),
        events: [],
      };
    }
    acc[dateKey].events.push(event);
    return acc;
  }, {} as Record<string, GroupedEvent>);

  Object.keys(grouped).forEach((dateKey) => {
    const groupDate = parseLocalDate(dateKey);
    grouped[dateKey].events = sortEventsByPriority(
      grouped[dateKey].events,
      groupDate,
    );
  });

  return Object.values(grouped).sort((a, b) => {
    const dateA = new Date(
      Object.keys(grouped).find((key) => grouped[key] === a) || '',
    );
    const dateB = new Date(
      Object.keys(grouped).find((key) => grouped[key] === b) || '',
    );
    return dateA.getTime() - dateB.getTime();
  });
};

export default (props: ListProps): ElementModel =>
  (() => {
    const { isThemeDark } = props;
    const loader = feedMacros.loader.create({ isThemeDark });
    const container = document.createElement('div');
    const setTotalEntries = (count: number) => (totalEntries = count);
    const setOffset = (count: number) => (offset = offset + count);
    const setStyles = (additonalStyles: string) => (styles += additonalStyles);
    const getContainer = () => container;
    const getTotalEntries = () => totalEntries;
    const getOffset = () => offset;
    const getStyles = () => styles;
    const getShadowRoot = () => shadowRoot;
    let totalEntries = 0;
    let offset = 0;
    let styles = `
      ${loader.styles}
    `;
    let shadowRoot: ShadowRoot | null = null;
    let lastDateHeadline: string | null = null;

    const helperFunctions = {
      setTotalEntries,
      setOffset,
      setStyles,
      getContainer,
      getOffset,
      getTotalEntries,
      getStyles,
      getShadowRoot,
    };

    const callback = (shadow: ShadowRoot) => {
      shadowRoot = shadow;
    };

    const groupLayout = (): ElementModel => {
      return new ElementBuilder()
        .withClassName('umd-feed-events-grouped')
        .build();
    };

    const displayResults = async ({ feedData }: FeedDisplay) => {
      const groupedEvents = groupEventsByDate(feedData);
      const entries: ElementModel[] = [];
      let actualEventCount = 0;

      groupedEvents.forEach((group) => {
        if (group.date !== lastDateHeadline) {
          const dateHeadline = document.createElement('p');
          dateHeadline.textContent = group.date;

          entries.push(
            new ElementBuilder(dateHeadline)
              .styled(Styles.element.text.decoration.ribbon)
              .withStyles({
                element: {
                  margin: `${Styles.token.spacing.lg} 0`,
                },
              })
              .build(),
          );

          lastDateHeadline = group.date;
        }

        const dateEntries = group.events.map((entry) =>
          Composite.card.list({
            ...dataComposed.display({ entry, isThemeDark }),
            dateSign: Atomic.events.sign({
              ...entry,
              isThemeDark,
              isLargeSize: true,
            }),
            image: feedElements.asset.standard({
              images: entry.image,
              url: entry.url,
            }),
            isAligned: false,
          }),
        );

        actualEventCount += group.events.length;

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

        dateEntries.forEach((entry) => entriesBuilder.withChild(entry));

        entries.push(entriesBuilder.build());
      });

      // Override the offset with actual event count to fix lazy load
      const originalSetOffset = helperFunctions.setOffset;
      helperFunctions.setOffset = () => originalSetOffset(actualEventCount);

      await feedDisplay.resultLoad({
        ...props,
        ...helperFunctions,
        displayResults,
        entries,
        query: EVENTS_RANGE_QUERY,
      });

      // Restore original setOffset
      helperFunctions.setOffset = originalSetOffset;

      if (shadowRoot) {
        feedDisplay.setShadowStyles({
          shadowRoot,
          styles,
        });
      }
    };

    container.appendChild(loader.element);

    feedFetch.start({
      ...props,
      ...helperFunctions,
      displayResults,
      displayResultStart: feedDisplay.resultStart,
      displayNoResults: feedDisplay.noResults,
      layoutElement: groupLayout(),
      query: EVENTS_RANGE_QUERY,
      countQuery: EVENTS_COUNT_RANGE_QUERY,
    });

    return {
      element: container,
      styles,
      events: {
        callback,
      },
    };
  })();

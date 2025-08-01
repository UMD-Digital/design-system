import * as Styles from '@universityofmaryland/web-styles-library';
import {
  Atomic,
  Composite,
  Model,
} from '@universityofmaryland/web-elements-library';
import * as feedElements from 'elements';
import * as feedMacros from 'macros';
import * as feedFetch from './common/fetch';
import * as feedDisplay from './common/display';
import * as dataComposed from './common/data';
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

const groupEventsByDate = (events: EventType[]): GroupedEvent[] => {
  const grouped = events.reduce((acc, event) => {
    const dateKey = event.startStamp;
    if (!acc[dateKey]) {
      acc[dateKey] = {
        date: getDateBanner(event.startStamp),
        events: [],
      };
    }
    acc[dateKey].events.push(event);
    return acc;
  }, {} as Record<string, GroupedEvent>);

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

    const groupLayout = (): { element: HTMLElement; styles: string } => {
      return Model.ElementModel.createDiv({
        className: 'umd-feed-events-grouped',
        elementStyles: {
          element: {},
        },
      });
    };

    const displayResults = async ({ feedData }: FeedDisplay) => {
      const groupedEvents = groupEventsByDate(feedData);
      const entries: { element: HTMLElement; styles: string }[] = [];
      let actualEventCount = 0;

      groupedEvents.forEach((group) => {
        const dateHeadline = document.createElement('p');
        dateHeadline.textContent = group.date;

        entries.push(
          Model.ElementModel.text.ribbon({
            element: dateHeadline,
            elementStyles: {
              element: {
                margin: `${Styles.token.spacing.lg} 0`,
              },
            },
          }),
        );

        const dateEntries = group.events.map((entry) =>
          Composite.card.list({
            ...dataComposed.display({ entry, isThemeDark }),
            dateSign: Atomic.events.sign({
              ...entry,
              isThemeDark,
              isLargeSize: false,
            }),
            image: feedElements.asset.standard({
              images: entry.image,
              url: entry.url,
            }),
            isAligned: false,
          }),
        );

        actualEventCount += group.events.length;

        entries.push(
          Model.ElementModel.createDiv({
            className: 'umd-feed-events-grouped-entries',
            children: [...dateEntries],
            elementStyles: {
              element: {
                [` > *:not(:last-child)`]: {
                  paddingBottom: Styles.token.spacing.lg,
                  marginBottom: Styles.token.spacing.lg,
                },
              },
            },
          }),
        );
      });

      // Override the offset with actual event count to fix lazy load
      const originalSetOffset = helperFunctions.setOffset;
      helperFunctions.setOffset = () => originalSetOffset(actualEventCount);

      await feedDisplay.resultLoad({
        ...props,
        ...helperFunctions,
        displayResults,
        entries,
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
    });

    return {
      element: container,
      styles,
      events: {
        callback,
      },
    };
  })();

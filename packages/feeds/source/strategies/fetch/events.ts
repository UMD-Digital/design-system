/**
 * Events Fetch Strategy
 *
 * Strategy for fetching event data from the UMD Calendar GraphQL API.
 *
 * @module strategies/fetch/events
 */

import { createGraphQLFetchStrategy } from './graphql';
import { EventEntry } from 'types/data';

/**
 * GraphQL queries for events
 */
const buildEventsCountQuery = (
  dateFilter: 'startsAfterOrAt' | 'rangeStart' = 'startsAfterOrAt',
) => `
query getEventsCount($startDate: String!, $related: [QueryArgument]) {
  count: solspace_calendar {
    events(relatedTo: $related, loadOccurrences: true, ${dateFilter}: $startDate) {
      ... on communications_Event {
        id
      }
      ... on submission_Event {
        id
      }
    }
  }
}
`;

const buildEventsQuery = (
  dateFilter: 'startsAfterOrAt' | 'rangeStart' = 'startsAfterOrAt',
) => `
query getEvents($startDate: String!, $related: [QueryArgument], $limit: Int, $offset: Int) {
  entries: solspace_calendar {
    events(
      relatedTo: $related
      loadOccurrences: true
      ${dateFilter}: $startDate
      limit: $limit
      offset: $offset
    ) {
      ... on communications_Event {
        id
        title
        url
        startDayOfWeek: startDate @formatDateTime(format: "D")
        startMonth: startDate @formatDateTime(format: "M")
        startDay: startDate @formatDateTime(format: "d")
        startStamp: startDate @formatDateTime(format: "Y-m-d")
        startTime: startDate @formatDateTime(format: "g:ia")
        endDayOfWeek: endDate @formatDateTime(format: "D")
        endMonth: endDate @formatDateTime(format: "M")
        endDay: endDate @formatDateTime(format: "d")
        endTime: endDate @formatDateTime(format: "g:ia")
        allDay
        summary: commonRichTextTwo
        image: commonAssetHeroImageSingle {
          url
          altText: commonPlainTextTwo
        }
        location: categoriesCampusBuildingSingle {
          title
        }
      }
      ... on submission_Event {
        id
        title
        url
        startDayOfWeek: startDate @formatDateTime(format: "D")
        startMonth: startDate @formatDateTime(format: "M")
        startDay: startDate @formatDateTime(format: "d")
        startStamp: startDate @formatDateTime(format: "Y-m-d")
        startTime: startDate @formatDateTime(format: "g:ia")
        endDayOfWeek: endDate @formatDateTime(format: "D")
        endMonth: endDate @formatDateTime(format: "M")
        endDay: endDate @formatDateTime(format: "d")
        endTime: endDate @formatDateTime(format: "g:ia")
        allDay
        summary: commonRichTextTwo
        image: commonAssetHeroImageSingle {
          url
          altText: commonPlainTextTwo
        }
        location: categoriesCampusBuildingSingle {
          title
        }
      }
    }
  }
}
`;

export const EVENTS_COUNT_QUERY = buildEventsCountQuery();
export const EVENTS_QUERY = buildEventsQuery();

/**
 * Slider-specific query with minimal fields
 * Used by events slider for carousel displays
 */
export const EVENTS_SLIDER_QUERY = `
  query getEvents($startDate: String!, $related: [QueryArgument]) {
    entries: solspace_calendar {
      events(
        relatedTo: $related
        loadOccurrences: true
        startsAfterOrAt: $startDate
        limit: 12
      ) {
        ... on submission_Event {
          title
          url
          startMonth: startDate @formatDateTime(format: "M")
          startDay: startDate @formatDateTime(format: "d")
          endMonth: endDate @formatDateTime(format: "M")
          endDay: endDate @formatDateTime(format: "d")
        }
      }
    }
  }
`;

/**
 * Events fetch strategy
 *
 * Fetches event data from the UMD Calendar GraphQL API.
 * Handles date filtering, category filtering, and pagination.
 *
 * @example
 * ```typescript
 * const feed = createBaseFeed({
 *   token: 'my-token',
 *   fetchStrategy: eventsFetchStrategy,
 *   // ...
 * });
 * ```
 */
export const eventsFetchStrategy = createGraphQLFetchStrategy<EventEntry>({
  endpoint: 'https://calendar.umd.edu/graphql',

  queries: {
    entries: EVENTS_QUERY,
    count: EVENTS_COUNT_QUERY,
  },

  transformResponse: (data) => {
    if (!data || !data.data || !data.data.entries) {
      return null;
    }
    return data.data.entries.events || null;
  },

  transformCount: (data) => {
    if (!data || !data.data || !data.data.count) {
      return 0;
    }
    return data.data.count.events?.length || 0;
  },

  composeVariables: (baseVariables) => {
    return {
      ...baseVariables,
      startDate: new Date().toDateString(),
    };
  },
});

/**
 * Events fetch strategy for range queries
 *
 * Uses rangeStart filter instead of startsAfterOrAt.
 * Used for grouped event displays.
 */
export const eventsFetchStrategyRange = createGraphQLFetchStrategy<EventEntry>({
  endpoint: 'https://calendar.umd.edu/graphql',

  queries: {
    entries: buildEventsQuery('rangeStart'),
    count: buildEventsCountQuery('rangeStart'),
  },

  transformResponse: (data) => {
    if (!data || !data.data || !data.data.entries) {
      return null;
    }
    return data.data.entries.events || null;
  },

  transformCount: (data) => {
    if (!data || !data.data || !data.data.count) {
      return 0;
    }
    return data.data.count.events?.length || 0;
  },

  composeVariables: (baseVariables) => {
    return {
      ...baseVariables,
      startDate: new Date().toDateString(),
    };
  },
});

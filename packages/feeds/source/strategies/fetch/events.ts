/**
 * Events Fetch Strategy
 *
 * Strategy for fetching event data from the UMD Calendar GraphQL API.
 *
 * @module strategies/fetch/events
 */

import { createGraphQLFetchStrategy } from './graphql';
import { EventEntry } from 'types/data';
import { fetchGraphQL } from '@universityofmaryland/web-utilities-library/network';

/**
 * Calendar types available in the UMD Calendar system
 */
const CALENDARS = ['communications', 'submission'] as const;

/**
 * Generate GraphQL fragments for all calendar types
 * Creates type-specific fragments to avoid interface limitations
 */
function generateFragments() {
  return CALENDARS.map(
    (cal) => `
    fragment EventBasicFields_${cal} on ${cal}_Event {
      id
      title
      url
    }

    fragment EventDateFields_${cal} on ${cal}_Event {
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
    }

    fragment EventContentFields_${cal} on ${cal}_Event {
      summary: commonRichTextTwo
      image: commonAssetHeroImageSingle {
        url
        altText: commonPlainTextTwo
      }
      location: categoriesCampusBuildingSingle {
        title
      }
    }

    fragment EventCategoryFields_${cal} on ${cal}_Event {
      categories: categoriesEventAudienceMultiple {
        id
        title
      }
    }
  `,
  ).join('\n');
}

/**
 * Generate inline fragment spreads for all calendar types
 * Used in the main query to apply fragments to each calendar type
 */
function generateInlineSpreads() {
  return CALENDARS.map(
    (cal) => `
        ... on ${cal}_Event {
          ...EventBasicFields_${cal}
          ...EventDateFields_${cal}
          ...EventContentFields_${cal}
          ...EventCategoryFields_${cal}
        }
  `,
  ).join('\n');
}

/**
 * Generate inline fragment spreads for slider queries
 * Minimal fields for carousel displays
 */
function generateSliderSpreads() {
  return CALENDARS.map(
    (cal) => `
        ... on ${cal}_Event {
          ...EventSliderFields_${cal}
        }
  `,
  ).join('\n');
}

/**
 * Generate slider-specific fragments
 */
function generateSliderFragments() {
  return CALENDARS.map(
    (cal) => `
    fragment EventSliderFields_${cal} on ${cal}_Event {
      title
      url
      startMonth: startDate @formatDateTime(format: "M")
      startDay: startDate @formatDateTime(format: "d")
      endMonth: endDate @formatDateTime(format: "M")
      endDay: endDate @formatDateTime(format: "d")
    }
  `,
  ).join('\n');
}

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
       ${generateInlineSpreads()}
      }
    }
  }
  ${generateFragments()}
`;

export const EVENTS_COUNT_QUERY = buildEventsCountQuery();
export const EVENTS_QUERY = buildEventsQuery();

/**
 * Query for fetching category names by IDs
 * Queries the categories table directly
 */
export const CATEGORY_NAMES_QUERY = `
  query getCategoryNames($ids: [QueryArgument]!) {
    categories(id: $ids) {
      id
      title
    }
  }
`;

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
       ${generateSliderSpreads()}
      }
    }
  }
  ${generateSliderFragments()}
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
const baseFetchStrategy = createGraphQLFetchStrategy<EventEntry>({
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
    const { categories, ...rest } = baseVariables;

    return {
      ...rest,
      related: categories,
      startDate: new Date().toDateString(),
    };
  },
});

/**
 * Fetch category names by their IDs
 */
async function fetchCategoryNames(
  categoryIds: string[],
  token?: string,
): Promise<string[] | null> {
  try {
    const response = await fetchGraphQL({
      url: 'https://calendar.umd.edu/graphql',
      query: CATEGORY_NAMES_QUERY,
      token: token || '',
      variables: { ids: categoryIds },
    });

    if (!response || !response.data || !response.data.categories) {
      return null;
    }

    return response.data.categories.map((category: any) => category.title);
  } catch (error) {
    console.error('Fetch category names error:', error);
    return null;
  }
}

export const eventsFetchStrategy = {
  ...baseFetchStrategy,
  fetchCategoryNames,
};

/**
 * Events fetch strategy for range queries
 *
 * Uses rangeStart filter instead of startsAfterOrAt.
 * Used for grouped event displays.
 */
const baseFetchStrategyRange = createGraphQLFetchStrategy<EventEntry>({
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
    const { categories, ...rest } = baseVariables;

    return {
      ...rest,
      related: categories,
      startDate: new Date().toDateString(),
    };
  },
});

export const eventsFetchStrategyRange = {
  ...baseFetchStrategyRange,
  fetchCategoryNames,
};

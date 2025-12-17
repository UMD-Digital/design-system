/**
 * GraphQL Fetch Strategy Factory
 *
 * Generic factory for creating GraphQL-based fetch strategies.
 * Handles common GraphQL patterns: queries, variables, transformations.
 *
 * @module strategies/fetch/graphql
 */

import {
  fetchGraphQL,
  GraphQLVariables,
} from '@universityofmaryland/web-utilities-library/network';
import { FetchStrategy } from '../../factory/core/types';

/**
 * Configuration for creating a GraphQL fetch strategy
 */
export interface GraphQLFetchConfig<TData, TResponse = any> {
  /** GraphQL endpoint URL */
  endpoint: string;

  /** GraphQL queries */
  queries: {
    /** Query for fetching entries */
    entries: string;
    /** Optional separate query for count (if not in entries query) */
    count?: string;
  };

  /** Transform GraphQL response to entries array */
  transformResponse: (data: TResponse) => TData[] | null;

  /** Transform GraphQL response to count */
  transformCount: (data: TResponse) => number;

  /** Optional: Compose additional variables */
  composeVariables?: (baseVariables: any) => any;
}

/**
 * Create a GraphQL fetch strategy
 *
 * This factory handles the common patterns for GraphQL APIs:
 * - Fetching with variables
 * - Response transformation
 * - Count vs entries queries
 * - Error handling
 *
 * @template TData - The type of entry data
 * @template TResponse - The type of raw GraphQL response
 * @template TVariables - The type of GraphQL variables
 *
 * @param config - Configuration for the strategy
 * @returns Fetch strategy for use with createBaseFeed
 *
 * @example
 * ```typescript
 * const eventsFetchStrategy = createGraphQLFetchStrategy({
 *   endpoint: 'https://calendar.umd.edu/graphql',
 *   queries: {
 *     entries: EVENTS_QUERY,
 *     count: EVENTS_COUNT_QUERY,
 *   },
 *   transformResponse: (data) => data?.data?.entries?.events || null,
 *   transformCount: (data) => data?.data?.count?.events?.length || 0,
 * });
 * ```
 */
export function createGraphQLFetchStrategy<
  TData,
  TResponse = any,
  TVariables = any,
>(
  config: GraphQLFetchConfig<TData, TResponse>,
): FetchStrategy<TData, TVariables> {
  const {
    endpoint,
    queries,
    transformResponse,
    transformCount,
    composeVariables,
  } = config;

  return {
    /**
     * Fetch the total count of entries
     */
    fetchCount: async (variables: TVariables): Promise<number | null> => {
      try {
        // Use count query if provided, otherwise use entries query
        const query = queries.count || queries.entries;
        const response = await fetchGraphQL({
          url: endpoint,
          query,
          token: (variables as any).token,
          variables: variables as GraphQLVariables,
        });

        // Check for errors
        if (!response || !response.data || response.message) {
          if (response?.message) {
            console.error(`GraphQL Error: ${response.message}`);
          }
          return null;
        }

        return transformCount(response);
      } catch (error) {
        console.error('Fetch count error:', error);
        return null;
      }
    },

    /**
     * Fetch the actual entries
     */
    fetchEntries: async (variables: TVariables): Promise<TData[] | null> => {
      try {
        const response = await fetchGraphQL({
          url: endpoint,
          query: queries.entries,
          token: (variables as any).token,
          variables: variables as GraphQLVariables,
        });

        // Check for errors
        if (!response || !response.data || response.message) {
          if (response?.message) {
            console.error(`GraphQL Error: ${response.message}`);
          }
          return null;
        }

        return transformResponse(response);
      } catch (error) {
        console.error('Fetch entries error:', error);
        return null;
      }
    },

    /**
     * Compose API variables from feed props
     */
    composeApiVariables: (props: any): TVariables => {
      const {
        token,
        categories,
        numberOfColumnsToShow = 1,
        numberOfRowsToStart,
        getOffset,
        entriesToRemove,
        id,
      } = props;

      // Base variables - pass all props through
      const baseVariables: any = {
        token,
        limit: numberOfColumnsToShow * numberOfRowsToStart,
        offset: getOffset ? getOffset() : 0,
      };

      // Pass categories through (let composeVariables decide how to map it)
      if (categories) {
        baseVariables.categories = categories;
      }

      // Pass entriesToRemove through
      if (entriesToRemove) {
        baseVariables.entriesToRemove = entriesToRemove;
      }

      // Pass id through
      if (id) {
        baseVariables.id = id;
      }

      // Allow custom variable composition
      if (composeVariables) {
        return composeVariables(baseVariables);
      }

      // Default mapping (for strategies without custom composeVariables)
      const defaultVariables: any = { ...baseVariables };

      // Default: map categories to 'related' if not customized
      if (categories) {
        defaultVariables.related = categories;
        delete defaultVariables.categories;
      }

      return defaultVariables as TVariables;
    },
  };
}

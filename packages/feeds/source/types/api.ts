/**
 * API Types
 *
 * Types for API requests, responses, and data transformation.
 * These types define the shape of data coming from and going to external APIs.
 *
 * @module types/api
 */

/**
 * GraphQL API response wrapper
 *
 * Standard structure for GraphQL API responses from CraftCMS.
 *
 * @template T - The type of data returned in the entries array
 */
export interface GraphQLResponse<T = any> {
  /** Response data object */
  data?: {
    /** Array of entries returned by the query */
    entries?: T[];
    /** Total count of entries matching the query */
    entryCount?: number;
    /** Additional query results */
    [key: string]: any;
  };
  /** GraphQL errors if any occurred */
  errors?: GraphQLError[];
  /** Error message if request failed */
  message?: string;
}

/**
 * GraphQL error structure
 *
 * Represents an error returned by a GraphQL API.
 */
export interface GraphQLError {
  /** Error message */
  message: string;
  /** Path to the field that caused the error */
  path?: string[];
  /** Additional error metadata */
  extensions?: Record<string, any>;
}

/**
 * Common API variables
 *
 * Base variables sent with all API requests.
 */
export interface BaseApiVariables {
  /** API authentication token */
  token: string;
  /** Maximum number of entries to return */
  limit?: number;
  /** Number of entries to skip (for pagination) */
  offset?: number;
}

/**
 * Variables for category filtering
 *
 * Extends base variables with category filtering options.
 */
export interface CategoryApiVariables extends BaseApiVariables {
  /** Related categories (OR logic - match any) */
  related?: string[];
  /** Related to all categories (AND logic - match all) */
  relatedToAll?: string[];
  /** Related to (generic - CraftCMS relatedTo) */
  relatedTo?: string[];
  /** Specific entry IDs to include */
  ids?: string[];
}

/**
 * Variables for entry exclusion
 *
 * Extends base variables with entry exclusion options.
 */
export interface ExclusionApiVariables extends BaseApiVariables {
  /** Entries to exclude (NOT logic) */
  not?: (string | number)[];
  /** Specific entry IDs to exclude */
  id?: string[];
}

/**
 * Complete feed API variables
 *
 * Combines all common API variable types for feed requests.
 * This is the most common variable type used across feeds.
 */
export interface FeedApiVariables
  extends CategoryApiVariables,
    ExclusionApiVariables {
  /** Date filters for time-based queries */
  startDate?: string;
  rangeStart?: string;
  /** Additional feed-specific variables */
  [key: string]: any;
}

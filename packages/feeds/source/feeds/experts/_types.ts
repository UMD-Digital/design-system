/**
 * Experts Feed Types
 *
 * Type definitions for expert feeds using the factory pattern.
 *
 * @module feeds/experts/types
 */

/**
 * Base props for all expert feed variants
 */
export interface BaseProps {
  /** API authentication token */
  token: string;
  /** Number of rows to display initially */
  numberOfRowsToStart: number;
  /** Category IDs to filter by (areas of expertise, campus units, etc.) */
  categories?: string[];
  /** Use dark theme styling */
  isThemeDark?: boolean;
  /** Enable lazy loading with "Load more" button */
  isLazyLoad: boolean;
  /** IDs of entries to exclude from results */
  entriesToRemove?: string[];
}

/**
 * Props for list layout expert feeds
 */
export interface ListProps extends BaseProps {
  /** Number of rows to display initially */
  numberOfColumns: number;
}

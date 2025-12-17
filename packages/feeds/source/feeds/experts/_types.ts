/**
 * Experts Feed Types
 *
 * Type definitions for expert feeds using the factory pattern.
 *
 * @module feeds/experts/types
 */

/**
 * Base props for all expert feed variants
 *
 * Common properties shared across all expert feed layouts.
 */
export interface BaseProps {
  /** API authentication token */
  token: string;
  /** Number of rows to display initially */
  numberOfRowsToStart: number;
  /** Category IDs to filter by (areas of expertise, campus units, etc.) */
  categories?: string[];
  /** Enable dark theme */
  isThemeDark?: boolean;
  /** Enable lazy loading with "Load more" button */
  isLazyLoad: boolean;
  /** IDs of entries to exclude from results */
  entriesToRemove?: string[];
  /** Optional callback to receive generated CSS styles */
  styleCallback?: (cssString: string) => void;
}

/**
 * Props for grid layout expert feeds
 *
 * Grid layout displays experts in a multi-column responsive grid.
 */
export interface GridProps extends BaseProps {
  /** Number of columns to display (2-4) */
  numberOfColumnsToShow?: number;
  /** Use transparent card backgrounds */
  isTransparent?: boolean;
  /** Use overlay card style (requires headshot image) */
  isOverlay?: boolean;
  /** Card type for display */
  cardType?: 'block' | 'list' | 'tabular';
}

/**
 * Props for list layout expert feeds
 *
 * List layout displays experts in a single-column vertical list.
 */
export interface ListProps extends BaseProps {
  /** Card type for display (typically 'list' or 'tabular') */
  cardType?: 'list' | 'tabular';
}

/**
 * Props for single expert bio display
 *
 * Bio layout displays a single expert's profile using the small layout with summary field.
 */
export interface BioProps extends Omit<BaseProps, 'numberOfRowsToStart' | 'isLazyLoad' | 'categories' | 'entriesToRemove'> {
  /** Expert ID to fetch and display */
  expertId: string;
}

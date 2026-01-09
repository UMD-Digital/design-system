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
  /** Specific expert IDs to fetch and display */
  ids?: string[];
  /** Filter experts who are media trained */
  isMediaTrained?: boolean;
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
export interface BioProps
  extends Omit<
    BaseProps,
    | 'numberOfRowsToStart'
    | 'isLazyLoad'
    | 'categories'
    | 'entriesToRemove'
    | 'ids'
    | 'isMediaTrained'
  > {
  /** Expert ID to fetch and display */
  expertId?: string;
}

/**
 * Props for expert "In The News" feed
 *
 * Displays an expert with their related news coverage in a two-column layout.
 * Left column shows the expert's overlay card, right column shows news articles.
 */
export interface InTheNewsProps
  extends Omit<
    BaseProps,
    | 'categories'
    | 'entriesToRemove'
    | 'ids'
    | 'isMediaTrained'
    | 'numberOfRowsToStart'
    | 'isLazyLoad'
  > {
  /** Expert ID to fetch and display (required) */
  expertId: string;
  /** Number of news rows to start (2-10, default 5) */
  numberOfRowsToStart?: number;
  /** Enable lazy loading for news articles (default false) */
  isLazyLoad?: boolean;
}

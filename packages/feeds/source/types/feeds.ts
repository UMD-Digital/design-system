/**
 * Feed Configuration Types
 *
 * User-facing props for configuring feeds.
 * These types define the public API that consumers use to configure feed components.
 *
 * @module types/feeds
 */

/**
 * Base props all feeds accept
 *
 * Common configuration options shared across all feed types.
 */
export interface BaseFeedProps {
  /** API authentication token */
  token: string;
  /** Number of rows to display initially */
  numberOfRowsToStart: number;
  /** Category IDs to filter by */
  categories?: string[];
  /** Use dark theme styling */
  isThemeDark?: boolean;
  /** Enable lazy loading with "Load more" button */
  isLazyLoad: boolean;
  /** IDs of entries to exclude from results */
  entriesToRemove?: string[];
  /** Optional callback for style injection */
  styleCallback?: (cssString: string) => void;
}

/**
 * Props for grid/block layouts
 *
 * Configuration for feeds displayed in a grid layout.
 */
export interface GridFeedProps extends BaseFeedProps {
  /** Number of columns in grid (2-4) */
  numberOfColumnsToShow?: 2 | 3 | 4;
  /** Use transparent card backgrounds */
  isTransparent?: boolean;
}

/**
 * Props for list layouts
 *
 * Configuration for feeds displayed in a vertical list.
 */
export interface ListFeedProps extends BaseFeedProps {
  /** Additional list-specific props can be added here */
}

/**
 * Props for slider/carousel layouts
 *
 * Configuration for feeds displayed in a slider/carousel.
 */
export interface SliderFeedProps {
  /** API authentication token */
  token: string;
  /** Category ID or slug to filter by */
  categories?: string | null;
  /** Use dark theme styling */
  isThemeDark?: boolean;
}

/**
 * Props for news feeds with union category filtering
 *
 * Extends base feed props with news-specific options.
 */
export interface NewsFeedProps extends BaseFeedProps {
  /** Use OR logic for category filtering instead of AND */
  isUnion: boolean;
}

/**
 * Props for featured layouts
 *
 * Configuration for featured news layout with sticky overlay card.
 *
 * Note: numberOfRowsToStart is ignored - featured layout always shows:
 * - 1 overlay card (left column)
 * - 2 block cards in 2-column grid (right column)
 * - Total: 3 cards initially, then 2 cards per lazy-load
 */
export interface FeaturedFeedProps extends NewsFeedProps {
  /** Use transparent card backgrounds */
  isTransparent?: boolean;
  /** Reverse the layout (grid on left, overlay on right) */
  isLayoutReversed?: boolean;
  /** Override the sticky position (in pixels) */
  overwriteStickyPosition?: number;
}

/**
 * Props for event feeds with time display
 *
 * Extends base feed props with event-specific options.
 */
export interface EventFeedProps extends BaseFeedProps {
  /** Show event time in cards */
  isShowTime?: boolean;
}

/**
 * Props for event grid feeds
 *
 * Combines grid layout with event-specific options.
 */
export interface EventGridFeedProps extends GridFeedProps {
  /** Show event time in cards */
  isShowTime?: boolean;
}

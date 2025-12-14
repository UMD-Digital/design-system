/**
 * Feed Factory Type System
 *
 * This module defines the core types for the feed factory pattern.
 * The factory pattern allows for composable, reusable feed implementations
 * by separating concerns into strategies.
 *
 * @module factory/core/types
 */

import { ElementModel } from '../../_types';

/**
 * Common helper functions provided to all feeds
 * These manage the feed's internal state
 */
export interface FeedHelpers {
  /** Set the total number of entries available */
  setTotalEntries: (count: number) => void;
  /** Set the current offset (for pagination) */
  setOffset: (count: number) => void;
  /** Add styles to the feed */
  setStyles: (styles: string) => void;
  /** Set the shadow root reference */
  setShadowRoot: (shadowRoot: ShadowRoot) => void;
  /** Get the feed container element */
  getContainer: () => HTMLElement;
  /** Get the current offset */
  getOffset: () => number;
  /** Get the total number of entries */
  getTotalEntries: () => number;
  /** Get all accumulated styles */
  getStyles: () => string;
  /** Get the shadow root if available */
  getShadowRoot: () => ShadowRoot | null;
}

/**
 * Strategy for fetching feed data from an API
 *
 * @template TData - The type of data returned by the API
 * @template TVariables - The type of variables sent to the API
 */
export interface FetchStrategy<TData, TVariables = any> {
  /**
   * Fetch the total count of entries
   * Used for pagination and "showing X of Y" messages
   */
  fetchCount: (variables: TVariables) => Promise<number | null>;

  /**
   * Fetch the actual entries
   */
  fetchEntries: (variables: TVariables) => Promise<TData[] | null>;

  /**
   * Compose API variables from feed props
   * Handles offset, limit, categories, etc.
   */
  composeApiVariables: (props: any) => TVariables;
}

/**
 * Options for mapping an entry to a card element
 */
export interface CardMappingOptions {
  /** Whether to use dark theme */
  isThemeDark?: boolean;
  /** Whether to use transparent background */
  isTransparent?: boolean;
  /** Whether this is a featured item */
  isFeatured?: boolean;
  /** Whether to use overlay style */
  isOverlay?: boolean;
  /** Whether to align items */
  isAligned?: boolean;
  /** Card type (block, list, overlay) */
  cardType?: 'block' | 'list' | 'overlay';
  /** Configuration for images */
  imageConfig?: (entry: any) => ImageConfig;
  /** Additional custom options */
  [key: string]: any;
}

/**
 * Configuration for creating images in cards
 */
export interface ImageConfig {
  imageUrl: string;
  altText: string;
  linkUrl?: string;
  linkLabel?: string;
}

/**
 * Strategy for displaying feed entries
 *
 * @template TData - The type of entry data
 */
export interface DisplayStrategy<TData> {
  /**
   * Map a single entry to a card element
   */
  mapEntryToCard: (entry: TData, options: CardMappingOptions) => ElementModel;

  /**
   * Default layout type for this display strategy
   * Can be overridden by layoutStrategy
   */
  layoutType: 'grid' | 'list' | 'stacked' | 'custom';
}

/**
 * Options for creating a layout
 */
export interface LayoutOptions {
  /** Number of columns for grid layouts */
  columns?: 2 | 3 | 4;
  /** Whether to use dark theme */
  isThemeDark?: boolean;
  /** Gap size for grid gap layouts */
  gap?: string;
  /** Whether to show dividers (for stacked layouts) */
  showDividers?: boolean;
  /** Custom layout properties */
  [key: string]: any;
}

/**
 * Strategy for creating the feed layout container
 */
export interface LayoutStrategy {
  /**
   * Create the layout container element
   */
  create: (options: LayoutOptions) => ElementModel;

  /**
   * Get the ID to assign to the layout container
   * Used for targeting in display logic
   */
  getId: () => string;
}

/**
 * Props for the no results state
 */
export interface NoResultsConfig {
  message?: string;
  linkUrl?: string;
  linkText?: string;
  isThemeDark?: boolean;
}

/**
 * Configuration for the base feed factory
 *
 * @template TData - The type of entry data from the API
 * @template TVariables - The type of API variables
 */
export interface BaseFeedConfig<TData, TVariables = any> {
  // Authentication
  /** API token for authentication */
  token: string | null;

  // Display options
  /** Whether to use dark theme */
  isThemeDark?: boolean;
  /** Whether to use transparent backgrounds */
  isTransparent?: boolean;
  /** Whether to use overlay style for cards */
  isOverlay?: boolean;
  /** Whether to align card content */
  isAligned?: boolean;
  /** Card type for display strategy */
  cardType?: 'block' | 'list' | 'overlay';
  /** Number of columns to show (for grid layouts) */
  numberOfColumnsToShow?: number;
  /** Number of rows to show initially */
  numberOfRowsToStart: number;

  // Features
  /** Whether to enable lazy loading */
  isLazyLoad?: boolean;

  // Categories/Filtering
  /** Categories to filter by */
  categories?: string[];
  /** Whether to exclude certain entries */
  entriesToRemove?: Array<string | number>;

  // Strategies (injected behavior)
  /** How to fetch data */
  fetchStrategy: FetchStrategy<TData, TVariables>;
  /** How to display entries */
  displayStrategy: DisplayStrategy<TData>;
  /** How to layout the feed */
  layoutStrategy: LayoutStrategy;

  // Optional overrides
  /** Custom no results configuration */
  noResultsConfig?: NoResultsConfig;
  /** Custom image configuration function */
  imageConfig?: (entry: TData) => ImageConfig;

  // Internal helpers (passed from common functions)
  getOffset?: () => number;
}

/**
 * Props passed to display result handlers
 */
export interface DisplayResultsProps<TData> {
  feedData: TData[];
}

/**
 * Internal feed lifecycle handlers
 * Created by the factory for managing feed behavior
 */
export interface FeedLifecycle<TData> {
  /** Handle displaying initial results */
  displayResultStart: (props: any) => void;
  /** Handle displaying loaded results (pagination) */
  displayResults: (props: DisplayResultsProps<TData>) => Promise<void>;
  /** Handle no results state */
  displayNoResults: (props: any) => void;
}

/**
 * Events exposed by the feed
 */
export interface FeedEvents {
  /** Callback when shadow root is available */
  callback?: (shadowRoot: ShadowRoot) => void;
  /** Additional custom event handlers */
  [key: string]: any;
}

/**
 * Return type from createBaseFeed factory
 */
export interface FeedFactoryResult extends ElementModel {
  /** Event handlers for the feed */
  events?: FeedEvents;
}

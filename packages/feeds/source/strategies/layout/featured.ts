/**
 * Featured Layout Strategy
 *
 * Complex layout strategy for featured news displays.
 * Combines multiple layout types based on content.
 *
 * @module strategies/layout/featured
 */

import {
  gridGap,
  gridOffset,
} from '@universityofmaryland/web-elements-library/layout';
import { LayoutStrategy, LayoutOptions } from '../../factory/core/types';

/**
 * Configuration for featured layout
 */
export interface FeaturedLayoutConfig {
  /** Whether to reverse the layout */
  isLayoutReversed?: boolean;
  /** Override for sticky top position */
  stickyTopPosition?: number;
  /** Minimum number of entries for offset layout */
  minEntriesForOffset?: number;
}

/**
 * Create a featured layout strategy
 *
 * This creates a dynamic layout that adapts based on the number of entries:
 * - With 2+ entries: Uses grid offset layout with featured item
 * - With 1 entry: Uses standard grid gap layout
 *
 * @param config - Configuration for the featured layout
 * @returns Layout strategy for use with createBaseFeed
 *
 * @example
 * ```typescript
 * const feed = createBaseFeed({
 *   layoutStrategy: createFeaturedLayoutStrategy({
 *     isLayoutReversed: true,
 *     stickyTopPosition: 100,
 *   }),
 *   // ...
 * });
 * ```
 */
export function createFeaturedLayoutStrategy(
  config: FeaturedLayoutConfig = {}
): LayoutStrategy {
  const {
    isLayoutReversed = false,
    stickyTopPosition,
    minEntriesForOffset = 2,
  } = config;

  return {
    create: (options: LayoutOptions) => {
      // For now, create the base grid gap layout
      // The actual offset layout will be created dynamically
      // when we know the number of entries
      return gridGap({ columns: 2 });
    },

    getId: () => 'umd-featured-layout-container',

    // Custom method for creating offset layout
    // (Not part of standard LayoutStrategy, but used internally)
    createOffsetLayout: (options: LayoutOptions) => {
      return gridOffset({
        columns: 2,
        isLayoutReversed,
        stickyTopPosition,
      });
    },
  } as LayoutStrategy & { createOffsetLayout: (options: LayoutOptions) => any };
}

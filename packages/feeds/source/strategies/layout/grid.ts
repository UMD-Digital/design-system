/**
 * Grid Layout Strategies
 *
 * Layout strategies for grid-based feed displays.
 *
 * @module strategies/layout/grid
 */

import {
  grid,
  gridGap,
  gridOffset,
  stacked,
} from '@universityofmaryland/web-elements-library/layout';
import { LayoutStrategy, LayoutOptions } from '../../factory/core/types';

/**
 * Standard grid layout strategy
 *
 * Creates a responsive grid layout with specified columns.
 * Uses standard grid spacing.
 */
export const gridLayout: LayoutStrategy = {
  create: (options: LayoutOptions) => {
    const { columns = 3 } = options;
    return grid({ columns: columns as 2 | 3 | 4 });
  },
  getId: () => 'umd-grid-layout-container',
};

/**
 * Grid gap layout strategy
 *
 * Creates a responsive grid layout with visual gaps between items.
 * Provides more pronounced spacing than standard grid.
 */
export const gridGapLayout: LayoutStrategy = {
  create: (options: LayoutOptions) => {
    const { columns = 3 } = options;
    return gridGap({ columns: columns as 2 | 3 | 4 });
  },
  getId: () => 'umd-grid-gap-layout-container',
};

/**
 * Stacked layout strategy
 *
 * Creates a vertical stack layout with optional dividers.
 * Good for list-style displays.
 */
export const stackedLayout: LayoutStrategy = {
  create: (options: LayoutOptions) => {
    const { isThemeDark, showDividers = true } = options;
    return stacked({ isThemeDark, showDividers });
  },
  getId: () => 'umd-stacked-layout-container',
};

/**
 * Grid offset layout strategy
 *
 * Creates a grid with sticky offset positioning for the first item.
 * Used for featured layouts where the first item is prominently displayed.
 */
export const gridOffsetLayout: LayoutStrategy = {
  create: (options: LayoutOptions) => {
    const {
      columns = 2,
      isLayoutReversed = false,
      stickyTopPosition,
    } = options;

    return gridOffset({
      columns: columns as 2 | 3 | 4,
      isLayoutReversed,
      stickyTopPosition,
    });
  },
  getId: () => 'umd-grid-offset-layout-container',
};

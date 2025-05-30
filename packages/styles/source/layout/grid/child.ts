/**
 * @module layout/grid/child
 * Provides styles for grid child elements.
 */

import { media } from '../../token';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';

// Consistent naming
const classNamePrefix = 'umd-layout-grid-child';

/**
 * Double-sized grid child element.
 * @returns {JssObject} Grid child that spans two columns on large screens.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.child.sizeDouble
 * ```
 * @example
 * ```css
 * class="umd-layout-grid-child-size-double"
 * ```
 * @example
 * ```text
 * Use 'umd-layout-grid-child-size-double' instead of 'umd-grid-column-double'.
 * ```
 * @since 1.1.0
 */
export const sizeDouble: JssObject = create.jss.objectWithClassName({
  [`@media (${media.queries.large.min})`]: {
    gridColumn: 'span 2',
  },

  className: [
    `${classNamePrefix}-size-double`,
    /** @deprecated Use 'umd-layout-grid-child-size-double' instead */
    'umd-grid-column-double',
  ],
});

/**
 * Grid child that starts at the second column.
 * @returns {JssObject} Grid child that starts at the second column on high-definition screens.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.child.startSecond
 * ```
 * @example
 * ```css
 * class="umd-layout-grid-child-start-second"
 * ```
 * @since 1.1.0
 */
export const startSecond: JssObject = create.jss.objectWithClassName({
  [`@media (${media.queries.highDef.min})`]: {
    gridColumnStart: '2',
  },

  className: `${classNamePrefix}-start-second`,
});

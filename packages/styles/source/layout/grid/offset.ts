/**
 * @module layout/grid/offset
 * Provides grid layouts with vertical offset between columns.
 */

import { media, spacing } from '@universityofmaryland/web-token-library';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';
import { threeLarge } from './gap';

// Consistent naming
const classNamePrefix = 'umd-layout-grid-offset';

/**
 * Three-column grid with vertical offsets.
 * @returns {JssObject} Three-column grid with staggered vertical placement.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.offset.threeColumn
 * ```
 * @example
 * ```css
 * class="umd-layout-grid-offset-three"
 * ```
 * @example
 * ```text
 * Use 'umd-layout-grid-offset-three' instead of 'umd-grid-gap-three-offset'.
 * ```
 * @since 1.1.0
 */
export const threeColumn: JssObject = create.jss.objectWithClassName({
  ...threeLarge,

  className: [
    `${classNamePrefix}-three`,
    /** @deprecated Use 'umd-layout-grid-offset-three' instead */
    'umd-grid-gap-three-offset',
  ],

  '& > *': {
    alignSelf: 'start',
    display: 'grid',

    [`@media (${media.queries.desktop.min})`]: {
      minHeight: '400px',
    },
  },

  '& > *:first-child': {
    [`@media (${media.queries.desktop.min})`]: {
      marginTop: `${spacing['2xl']}`,
    },
  },

  '& > *:nth-child(2)': {
    [`@media (${media.queries.desktop.min})`]: {
      marginTop: `${spacing['8xl']}`,
    },
  },

  '& umd-element-stat': {
    [`@media (${media.queries.desktop.min})`]: {
      height: `100%`,
    },
  },
});

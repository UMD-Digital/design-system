/**
 * @module layout/grid/offset
 * Provides grid layouts with vertical offset between columns.
 */

import { media, spacing } from '../../token';
import { create } from '../../utilities';
import { JssObject } from '../../utilities/transform';
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
 * @since 1.8.0
 */
export const threeColumn: JssObject = create.jssObject({
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

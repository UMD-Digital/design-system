/**
 * @module layout/grid/border
 * Provides grid layouts with border styling.
 */

import { color, media } from '../../token';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';
import { base } from './base';

// Consistent naming
const classNamePrefix = 'umd-layout-grid-border';

const boarderBase = {
  border: `1px solid ${color.gray.light}`,
  borderBottom: `none`,

  [`@media (${media.queries.medium.max})`]: {
    gridGap: 0,
  },
};

/**
 * Two-column grid with light borders.
 * @returns {JssObject} Two-column grid with light borders between cells.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.border.columnsTwo
 * ```
 * @example
 * ```css
 * class="umd-layout-grid-border-two"
 * ```
 * @example
 * ```text
 * Use 'umd-layout-grid-border-two' instead of 'umd-grid-border'.
 * ```
 * @since 1.1.0
 */
export const columnsTwo: JssObject = create.jss.objectWithClassName({
  ...base.two,
  ...boarderBase,

  className: [
    `${classNamePrefix}-two`,
    /** @deprecated Use 'umd-layout-grid-border-two' instead */
    'umd-grid-border',
  ],

  '& > *': {
    borderBottom: `1px solid ${color.gray.light}`,
    borderRight: `1px solid ${color.gray.light}`,
  },

  '&:not(:has(> :last-child:nth-child(2)))': {
    borderTop: `none`,
    borderRight: `none`,

    '& > *:first-child': {
      borderTop: `1px solid ${color.gray.light}`,
    },

    '& > *:nth-child(2)': {
      borderTop: `1px solid ${color.gray.light}`,
    },
  },
});

/**
 * Three-column grid with light borders.
 * @returns {JssObject} Three-column grid with light borders between cells.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.border.columnsThree
 * ```
 * @example
 * ```css
 * class="umd-layout-grid-border-three"
 * ```
 * @example
 * ```text
 * Use 'umd-layout-grid-border-three' instead of 'umd-grid-three-border'.
 * ```
 * @since 1.1.0
 */
export const columnsThree: JssObject = create.jss.objectWithClassName({
  ...base.three,
  ...boarderBase,

  className: [
    `${classNamePrefix}-three`,
    /** @deprecated Use 'umd-layout-grid-border-three' instead */
    'umd-grid-three-border',
  ],

  '& > *': {
    borderBottom: `1px solid ${color.gray.light}`,
    borderRight: `1px solid ${color.gray.light}`,
  },

  '&:not(:has(> :last-child:nth-child(3)))': {
    borderTop: `none`,
    borderRight: `none`,

    '& > *:first-child': {
      borderTop: `1px solid ${color.gray.light}`,
    },

    '& > *:nth-child(2)': {
      borderTop: `1px solid ${color.gray.light}`,
    },

    '& > *:nth-child(3)': {
      borderTop: `1px solid ${color.gray.light}`,
    },
  },
});

/**
 * Four-column grid with light borders.
 * @returns {JssObject} Four-column grid with light borders between cells.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.border.columnsFour
 * ```
 * @example
 * ```css
 * class="umd-layout-grid-border-four"
 * ```
 * @example
 * ```text
 * Use 'umd-layout-grid-border-four' instead of 'umd-grid-four-border'.
 * ```
 * @since 1.1.0
 */
export const columnsFour: JssObject = create.jss.objectWithClassName({
  ...base.four,
  ...boarderBase,

  className: [
    `${classNamePrefix}-four`,
    /** @deprecated Use 'umd-layout-grid-border-four' instead */
    'umd-grid-four-border',
  ],

  '& > *': {
    borderBottom: `1px solid ${color.gray.light}`,
    borderRight: `1px solid ${color.gray.light}`,
  },

  '&:not(:has(> :last-child:nth-child(4)))': {
    borderTop: `none`,
    borderRight: `none`,

    '& > *:first-child': {
      borderTop: `1px solid ${color.gray.light}`,
    },

    '& > *:nth-child(2)': {
      borderTop: `1px solid ${color.gray.light}`,
    },

    '& > *:nth-child(3)': {
      borderTop: `1px solid ${color.gray.light}`,
    },

    '& > *:nth-child(4)': {
      borderTop: `1px solid ${color.gray.light}`,
    },
  },
});

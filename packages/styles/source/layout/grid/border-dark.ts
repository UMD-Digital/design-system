/**
 * @module layout/grid/border-dark
 * Provides grid layouts with dark border styling.
 */

import { color, media } from '../../token';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';
import { base } from './base';

// Consistent naming
const classNamePrefix = 'umd-layout-grid-border-dark';

const boarderBaseDark = {
  border: `1px solid ${color.gray.dark}`,
  borderBottom: `none`,

  [`@media (${media.queries.medium.max})`]: {
    gridGap: 0,
  },
};

/**
 * Two-column grid with dark borders.
 * @returns {JssObject} Two-column grid with dark borders between cells.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.borderDark.columnsTwo
 * ```
 * @example
 * ```css
 * class="umd-layout-grid-border-dark-two"
 * ```
 * @example
 * ```text
 * Use 'umd-layout-grid-border-dark-two' instead of 'umd-grid-border-dark'.
 * ```
 * @since 1.1.0
 */
export const columnsTwo: JssObject = create.jss.objectWithClassName({
  ...base.two,
  ...boarderBaseDark,

  className: [
    `${classNamePrefix}-two`,
    /** @deprecated Use 'umd-layout-grid-border-dark-two' instead */
    'umd-grid-border-dark',
  ],

  '& > *': {
    borderBottom: `1px solid ${color.gray.dark}`,
    borderRight: `1px solid ${color.gray.dark}`,
  },

  '&:not(:has(> :last-child:nth-child(2)))': {
    borderTop: `none`,
    borderRight: `none`,

    '& > *:first-child': {
      borderTop: `1px solid ${color.gray.dark}`,
    },

    '& > *:nth-child(2)': {
      borderTop: `1px solid ${color.gray.dark}`,
    },
  },
});

/**
 * Three-column grid with dark borders.
 * @returns {JssObject} Three-column grid with dark borders between cells.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.borderDark.columnsThreeDark
 * ```
 * @example
 * ```css
 * class="umd-layout-grid-border-dark-three"
 * ```
 * @example
 * ```text
 * Use 'umd-layout-grid-border-dark-three' instead of 'umd-grid-three-border-dark'.
 * ```
 * @since 1.1.0
 */
export const columnsThreeDark: JssObject = create.jss.objectWithClassName({
  ...base.three,
  ...boarderBaseDark,

  className: [
    `${classNamePrefix}-three`,
    /** @deprecated Use 'umd-layout-grid-border-dark-three' instead */
    'umd-grid-three-border-dark',
  ],

  '& > *': {
    borderBottom: `1px solid ${color.gray.dark}`,
    borderRight: `1px solid ${color.gray.dark}`,
  },

  '&:not(:has(> :last-child:nth-child(3)))': {
    borderTop: `none`,
    borderRight: `none`,

    '& > *:first-child': {
      borderTop: `1px solid ${color.gray.dark}`,
    },

    '& > *:nth-child(2)': {
      borderTop: `1px solid ${color.gray.dark}`,
    },

    '& > *:nth-child(3)': {
      borderTop: `1px solid ${color.gray.dark}`,
    },
  },
});

/**
 * Four-column grid with dark borders.
 * @returns {JssObject} Four-column grid with dark borders between cells.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.borderDark.columnsFourDark
 * ```
 * @example
 * ```css
 * class="umd-layout-grid-border-dark-four"
 * ```
 * @example
 * ```text
 * Use 'umd-layout-grid-border-dark-four' instead of 'umd-grid-four-border-dark'.
 * ```
 * @since 1.1.0
 */
export const columnsFourDark: JssObject = create.jss.objectWithClassName({
  ...base.four,
  ...boarderBaseDark,

  className: [
    `${classNamePrefix}-four`,
    /** @deprecated Use 'umd-layout-grid-border-dark-four' instead */
    'umd-grid-four-border-dark',
  ],

  '& > *': {
    borderBottom: `1px solid ${color.gray.dark}`,
    borderRight: `1px solid ${color.gray.dark}`,
  },

  '&:not(:has(> :last-child:nth-child(4)))': {
    borderTop: `none`,
    borderRight: `none`,

    '& > *:first-child': {
      borderTop: `1px solid ${color.gray.dark}`,
    },

    '& > *:nth-child(2)': {
      borderTop: `1px solid ${color.gray.dark}`,
    },

    '& > *:nth-child(3)': {
      borderTop: `1px solid ${color.gray.dark}`,
    },

    '& > *:nth-child(4)': {
      borderTop: `1px solid ${color.gray.dark}`,
    },
  },
});

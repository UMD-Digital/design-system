/**
 * @module layout/grid/base
 * Provides base grid layout styles and column configurations.
 */

import { media, spacing } from '../../token';
import { create } from '../../utilities';
import { JssObject } from '../../utilities/transform';

// Consistent naming
const classNamePrefix = 'umd-layout-grid-columns';

const baseSmallScreen = {
  display: 'grid',

  [`@media (${media.queries.medium.max})`]: {
    gridGap: spacing.lg,
  },
};

/**
 * Base grid configurations for different column layouts.
 * @returns {object} Base grid configurations for two, three, and four column layouts.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * const customGrid = { ...Styles.layout.grid.base.two, customProp: 'value' }
 * ```
 * @since 1.8.0
 */
export const base = {
  two: {
    ...baseSmallScreen,

    [`@media (${media.queries.large.min})`]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },
  three: {
    ...baseSmallScreen,

    [`@media (${media.queries.desktop.min})`]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
  four: {
    ...baseSmallScreen,

    [`@media (${media.queries.large.min})`]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },

    [`@media (${media.queries.desktop.min})`]: {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
  },
};

/**
 * Two-column grid layout.
 * @returns {JssObject} Two-column responsive grid layout.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.columnsTwo
 * ```
 * @since 1.8.0
 */
export const columnsTwo: JssObject = create.jssObject({
  ...base.two,

  className: [
    `${classNamePrefix}-two`,
    /** @deprecated Use 'umd-layout-grid-columns-two' instead */
    'umd-grid',
  ],
});

/**
 * Three-column grid layout.
 * @returns {JssObject} Three-column responsive grid layout.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.columnsThree
 * ```
 * @since 1.8.0
 */
export const columnsThree: JssObject = create.jssObject({
  ...base.three,

  className: [
    `${classNamePrefix}-three`,
    /** @deprecated Use 'umd-layout-grid-columns-three' instead */
    'umd-grid-three',
  ],
});

/**
 * Four-column grid layout.
 * @returns {JssObject} Four-column responsive grid layout.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.columnsFour
 * ```
 * @since 1.8.0
 */
export const columnsFour: JssObject = create.jssObject({
  ...base.four,

  className: [
    `${classNamePrefix}-four`,
    /** @deprecated Use 'umd-layout-grid-columns-four' instead */
    'umd-grid-four',
  ],
});

/**
 * Stacked vertical layout.
 * @returns {JssObject} Stacked vertical flex column layout.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.stacked
 * ```
 * @since 1.8.0
 */
export const stacked: JssObject = create.jssObject({
  display: 'flex',
  flexDirection: 'column',

  className: `${classNamePrefix}-stacked`,
});

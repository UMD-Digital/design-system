/**
 * @module layout/grid/base
 * Provides base grid layout styles and column configurations.
 */

import { media, spacing } from '../../token';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';

// Consistent naming
const classNamePrefix = 'umd-layout-grid-columns';

/**
 * Options for column grid style variants
 * @since 1.7.0
 */
export interface ColumnGridOptions {
  columns: 2 | 3 | 4;
}

/**
 * Base small screen grid styles
 * @type {object}
 * @private
 */
const baseSmallScreen = {
  display: 'grid',

  [`@media (${media.queries.medium.max})`]: {
    gridGap: spacing.lg,
  },
};

/**
 * Composable column grid style selector
 *
 * Creates responsive grid layouts with configurable column counts.
 * Column grids automatically adjust for different screen sizes.
 *
 * @param options - Configuration object for style variants
 * @returns JSS object with composed styles and appropriate className
 *
 * @example
 * ```typescript
 * // Two-column grid
 * const styles = composeColumns({ columns: 2 });
 *
 * // Three-column grid
 * const styles = composeColumns({ columns: 3 });
 *
 * // Four-column grid
 * const styles = composeColumns({ columns: 4 });
 * ```
 *
 * @since 1.7.0
 */
export function composeColumns(options: ColumnGridOptions): JssObject {
  const { columns } = options;

  let composed: Record<string, any> = {
    ...baseSmallScreen,
  };

  let className: string = `${classNamePrefix}`;
  let deprecatedAliases: string[] = [];

  if (columns === 2) {
    composed = {
      ...composed,
      [`@media (${media.queries.large.min})`]: {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
    };
    className = `${classNamePrefix}-two`;
    deprecatedAliases.push('umd-grid');
  } else if (columns === 3) {
    composed = {
      ...composed,
      [`@media (${media.queries.tablet.min})`]: {
        gridTemplateColumns: 'repeat(3, 1fr)',
      },
    };
    className = `${classNamePrefix}-three`;
    deprecatedAliases.push('umd-grid-three');
  } else if (columns === 4) {
    composed = {
      ...composed,
      [`@media (${media.queries.large.min})`]: {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
      [`@media (${media.queries.desktop.min})`]: {
        gridTemplateColumns: 'repeat(4, 1fr)',
      },
    };
    className = `${classNamePrefix}-four`;
    deprecatedAliases.push('umd-grid-four');
  }

  return create.jss.objectWithClassName({
    ...composed,
    className: deprecatedAliases.length > 0 ? [className, ...deprecatedAliases] : className,
  });
}

/**
 * Base grid configurations for different column layouts.
 * @returns {object} Base grid configurations for two, three, and four column layouts.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * const customGrid = { ...Styles.layout.grid.base.two, customProp: 'value' }
 * ```
 * @note This is a style object that doesn't generate CSS classes directly, but provides base grid styles that can be applied programmatically.
 * @since 1.1.0
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

    [`@media (${media.queries.tablet.min})`]: {
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
 * @example
 * ```css
 * class="umd-layout-grid-columns-two"
 * ```
 * @example
 * ```text
 * Use 'umd-layout-grid-columns-two' instead of 'umd-grid'.
 * ```
 * @since 1.1.0
 */
export const columnsTwo: JssObject = composeColumns({ columns: 2 });

/**
 * Three-column grid layout.
 * @returns {JssObject} Three-column responsive grid layout.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.columnsThree
 * ```
 * @example
 * ```css
 * class="umd-layout-grid-columns-three"
 * ```
 * @example
 * ```text
 * Use 'umd-layout-grid-columns-three' instead of 'umd-grid-three'.
 * ```
 * @since 1.1.0
 */
export const columnsThree: JssObject = composeColumns({ columns: 3 });

/**
 * Four-column grid layout.
 * @returns {JssObject} Four-column responsive grid layout.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.columnsFour
 * ```
 * @example
 * ```css
 * class="umd-layout-grid-columns-four"
 * ```
 * @example
 * ```text
 * Use 'umd-layout-grid-columns-four' instead of 'umd-grid-four'.
 * ```
 * @since 1.1.0
 */
export const columnsFour: JssObject = composeColumns({ columns: 4 });

/**
 * Stacked vertical layout.
 * @returns {JssObject} Stacked vertical flex column layout.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.stacked
 * ```
 * @example
 * ```css
 * class="umd-layout-grid-columns-stacked"
 * ```
 * @since 1.1.0
 */
export const stacked: JssObject = create.jss.objectWithClassName({
  className: `${classNamePrefix}-stacked`,
  display: 'flex',
  flexDirection: 'column',

  [`> *:not(:last-child)`]: {
    marginBottom: spacing.sm,
  },
});

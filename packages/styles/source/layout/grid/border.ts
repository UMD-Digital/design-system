/**
 * @module layout/grid/border
 * Provides grid layouts with border styling.
 */

import { color, media } from '@universityofmaryland/web-token-library';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';
import { base } from './base';

// Consistent naming
const classNamePrefix = 'umd-layout-grid-border';

/**
 * Options for bordered grid style variants
 * @since 1.7.0
 */
export interface BorderedGridOptions {
  columns: 2 | 3 | 4;
  theme?: 'light' | 'dark';
}

/**
 * Composable bordered grid style selector
 *
 * Creates bordered grid layouts with configurable column count and theme.
 * Bordered grids display borders between cells with responsive behavior.
 *
 * @param options - Configuration object for style variants
 * @returns JSS object with composed styles and appropriate className
 *
 * @example
 * ```typescript
 * // Two-column light border (default)
 * const styles = composeBordered({ columns: 2 });
 *
 * // Three-column dark border
 * const styles = composeBordered({ columns: 3, theme: 'dark' });
 *
 * // Four-column light border
 * const styles = composeBordered({ columns: 4, theme: 'light' });
 * ```
 *
 * @since 1.7.0
 */
export function composeBordered(options: BorderedGridOptions): JssObject {
  const { columns, theme = 'light' } = options;

  // Get base grid configuration
  let baseGrid: Record<string, any>;
  if (columns === 2) {
    baseGrid = base.two;
  } else if (columns === 3) {
    baseGrid = base.three;
  } else {
    baseGrid = base.four;
  }

  // Determine border color
  const borderColor = theme === 'dark' ? color.gray.dark : color.gray.light;

  // Build border base styles
  const borderBase = {
    border: `1px solid ${borderColor}`,
    borderBottom: `none`,

    [`@media (${media.queries.medium.max})`]: {
      gridGap: 0,
    },
  };

  // Build child border rules
  const childBorders = {
    '& > *': {
      borderBottom: `1px solid ${borderColor}`,
      borderRight: `1px solid ${borderColor}`,
    },
  };

  // Build complex nth-child rules based on column count
  let nthChildRules: Record<string, any> = {
    borderTop: `none`,
    borderRight: `none`,
  };

  for (let i = 1; i <= columns; i++) {
    const selector = i === 1 ? '& > *:first-child' : `& > *:nth-child(${i})`;
    nthChildRules[selector] = {
      borderTop: `1px solid ${borderColor}`,
    };
  }

  // Determine className and deprecated aliases
  const isDark = theme === 'dark';
  let className: string;
  let deprecatedAliases: string[] = [];

  if (columns === 2) {
    className = isDark ? `${classNamePrefix}-dark-two` : `${classNamePrefix}-two`;
    deprecatedAliases.push(isDark ? 'umd-grid-border-dark' : 'umd-grid-border');
  } else if (columns === 3) {
    className = isDark ? `${classNamePrefix}-dark-three` : `${classNamePrefix}-three`;
    deprecatedAliases.push(isDark ? 'umd-grid-three-border-dark' : 'umd-grid-three-border');
  } else {
    className = isDark ? `${classNamePrefix}-dark-four` : `${classNamePrefix}-four`;
    deprecatedAliases.push(isDark ? 'umd-grid-four-border-dark' : 'umd-grid-four-border');
  }

  return create.jss.objectWithClassName({
    ...baseGrid,
    ...borderBase,
    ...childBorders,

    [`&:not(:has(> :last-child:nth-child(${columns})))`]: nthChildRules,

    className: deprecatedAliases.length > 0 ? [className, ...deprecatedAliases] : className,
  });
}

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
export const columnsTwo: JssObject = composeBordered({ columns: 2, theme: 'light' });

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
export const columnsThree: JssObject = composeBordered({ columns: 3, theme: 'light' });

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
export const columnsFour: JssObject = composeBordered({ columns: 4, theme: 'light' });

/**
 * Two-column grid with dark borders.
 * @returns {JssObject} Two-column grid with dark borders between cells.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.border.columnsTwoDark
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
export const columnsTwoDark: JssObject = composeBordered({ columns: 2, theme: 'dark' });

/**
 * Three-column grid with dark borders.
 * @returns {JssObject} Three-column grid with dark borders between cells.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.border.columnsThreeDark
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
export const columnsThreeDark: JssObject = composeBordered({ columns: 3, theme: 'dark' });

/**
 * Four-column grid with dark borders.
 * @returns {JssObject} Four-column grid with dark borders between cells.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.border.columnsFourDark
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
export const columnsFourDark: JssObject = composeBordered({ columns: 4, theme: 'dark' });

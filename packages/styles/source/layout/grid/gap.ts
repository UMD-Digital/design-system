/**
 * @module layout/grid/gap
 * Provides grid layouts with different gap sizes and configurations.
 */

import { media, spacing } from '@universityofmaryland/web-token-library';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';
import { base } from './base';
import { startSecond } from './child';

// Consistent naming
const classNamePrefix = 'umd-layout-grid-gap';

/**
 * Options for gap grid style variants
 * @since 1.7.0
 */
export interface GapGridOptions {
  columns: 2 | 3 | 4 | 'stacked';
  size?: 'normal' | 'large';
  centered?: boolean;
}

/**
 * Base styles for centered four-column grids
 * @type {object}
 * @private
 */
const fourColumnCenteredChild = {
  '& > *:first-child': {
    ...startSecond,
  },
};

/**
 * Paragraph margin overwrite for gap grids
 * @type {object}
 * @private
 */
const paragraphOverwrite = {
  '& > p:not(:last-child)': {
    marginBottom: 0,
  },
};

/**
 * Composable gap grid style selector
 *
 * Creates grid layouts with configurable column count, gap sizes, and centering.
 * Gap grids provide responsive spacing between grid items.
 *
 * @param options - Configuration object for style variants
 * @returns JSS object with composed styles and appropriate className
 *
 * @example
 * ```typescript
 * // Two-column with normal gaps
 * const styles = composeGap({ columns: 2 });
 *
 * // Three-column with large gaps
 * const styles = composeGap({ columns: 3, size: 'large' });
 *
 * // Four-column centered with large gaps
 * const styles = composeGap({ columns: 4, size: 'large', centered: true });
 *
 * // Stacked single column with gaps
 * const styles = composeGap({ columns: 'stacked' });
 * ```
 *
 * @since 1.7.0
 */
export function composeGap(options: GapGridOptions): JssObject {
  const { columns, size = 'normal', centered = false } = options;

  let composed: Record<string, any> = {};
  let className: string = `${classNamePrefix}`;
  let deprecatedAliases: string[] = [];

  // Handle stacked layout separately
  if (columns === 'stacked') {
    return create.jss.objectWithClassName({
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridGap: `${spacing.md}`,

      [`@media (${media.queries.desktop.min})`]: {
        gridGap: `${spacing.xl}`,
      },

      className: [
        `${classNamePrefix}-stacked`,
        /** @deprecated Use 'umd-layout-grid-gap-stacked' instead */
        'umd-grid-gap-stacked',
      ],
    });
  }

  // Get base grid configuration
  let baseGrid: Record<string, any>;
  if (columns === 2) {
    baseGrid = base.two;
  } else if (columns === 3) {
    baseGrid = base.three;
  } else {
    baseGrid = base.four;
  }

  // Start with base grid
  composed = { ...baseGrid };

  // Build column-specific styles
  if (columns === 2) {
    composed = {
      ...composed,
      [`@media (${media.queries.large.min})`]: {
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridGap: spacing.lg,
        ...paragraphOverwrite,
      },
    };

    if (size === 'normal') {
      composed = {
        ...composed,
        [`@media (${media.queries.desktop.min})`]: {
          gridGap: spacing.xl,
        },
      };
    }

    className = `${classNamePrefix}-two`;
    deprecatedAliases.push('umd-grid-gap');
  } else if (columns === 3) {
    composed = {
      ...composed,
      [`@media (${media.queries.large.min})`]: {
        gridGap: spacing.lg,
        ...paragraphOverwrite,
      },
    };

    if (size === 'large') {
      composed = {
        ...composed,
        [`@media (${media.queries.desktop.min})`]: {
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridGap: spacing.xl,
          ...paragraphOverwrite,
        },
      };
      className = `${classNamePrefix}-three-large`;
      deprecatedAliases.push('umd-grid-gap-three-large');
    } else {
      className = `${classNamePrefix}-three`;
      deprecatedAliases.push('umd-grid-gap-three');
    }
  } else if (columns === 4) {
    composed = {
      ...composed,
      [`@media (${media.queries.large.min})`]: {
        gridGap: spacing.lg,
        gridTemplateColumns: 'repeat(2, 1fr)',
        ...paragraphOverwrite,
      },
    };

    if (size === 'large') {
      composed = {
        ...composed,
        [`@media (${media.queries.highDef.min})`]: {
          gridGap: spacing.xl,
          ...paragraphOverwrite,
        },
      };

      if (centered) {
        composed = {
          ...composed,
          ...fourColumnCenteredChild,
        };
        className = `${classNamePrefix}-four-large-centered`;
        deprecatedAliases.push('umd-grid-gap-four-center');
      } else {
        className = `${classNamePrefix}-four-large`;
        deprecatedAliases.push('umd-grid-gap-four-large');
      }
    } else {
      // normal size
      if (centered) {
        composed = {
          ...composed,
          ...fourColumnCenteredChild,
        };
        className = `${classNamePrefix}-four-centered`;
        deprecatedAliases.push('umd-grid-gap-four-center');
      } else {
        className = `${classNamePrefix}-four`;
        deprecatedAliases.push('umd-grid-gap-four');
      }
    }
  }

  return create.jss.objectWithClassName({
    ...composed,
    className: deprecatedAliases.length > 0 ? [className, ...deprecatedAliases] : className,
  });
}

/**
 * Two-column grid layout with responsive gaps.
 * @returns {JssObject} Two-column grid with defined gaps.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.gap.two
 * ```
 * @example
 * ```css
 * class="umd-layout-grid-gap-two"
 * ```
 * @example
 * ```text
 * Use 'umd-layout-grid-gap-two' instead of 'umd-grid-gap'.
 * ```
 * @since 1.1.0
 */
export const two: JssObject = composeGap({ columns: 2 });

/**
 * Three-column grid layout with responsive gaps.
 * @returns {JssObject} Three-column grid with defined gaps.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.gap.three
 * ```
 * @example
 * ```css
 * class="umd-layout-grid-gap-three"
 * ```
 * @example
 * ```text
 * Use 'umd-layout-grid-gap-three' instead of 'umd-grid-gap-three'.
 * ```
 * @since 1.1.0
 */
export const three: JssObject = composeGap({ columns: 3 });

/**
 * Three-column grid layout with larger gaps.
 * @returns {JssObject} Three-column grid with larger gaps for desktop screens.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.gap.threeLarge
 * ```
 * @example
 * ```css
 * class="umd-layout-grid-gap-three-large"
 * ```
 * @example
 * ```text
 * Use 'umd-layout-grid-gap-three-large' instead of 'umd-grid-gap-three-large'.
 * ```
 * @since 1.1.0
 */
export const threeLarge: JssObject = composeGap({ columns: 3, size: 'large' });

/**
 * Four-column grid layout with responsive gaps.
 * @returns {JssObject} Four-column grid with defined gaps.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.gap.four
 * ```
 * @example
 * ```css
 * class="umd-layout-grid-gap-four"
 * ```
 * @example
 * ```text
 * Use 'umd-layout-grid-gap-four' instead of 'umd-grid-gap-four'.
 * ```
 * @since 1.1.0
 */
export const four: JssObject = composeGap({ columns: 4 });

/**
 * Four-column centered grid layout with responsive gaps.
 * @returns {JssObject} Four-column centered grid with defined gaps.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.gap.fourCentered
 * ```
 * @example
 * ```css
 * class="umd-layout-grid-gap-four-centered"
 * ```
 * @example
 * ```text
 * Use 'umd-layout-grid-gap-four-centered' instead of 'umd-grid-gap-four-center'.
 * ```
 * @since 1.1.0
 */
export const fourCentered: JssObject = composeGap({ columns: 4, centered: true });

/**
 * Four-column grid layout with larger gaps.
 * @returns {JssObject} Four-column grid with larger gaps for high-definition screens.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.gap.fourLarge
 * ```
 * @example
 * ```css
 * class="umd-layout-grid-gap-four-large"
 * ```
 * @example
 * ```text
 * Use 'umd-layout-grid-gap-four-large' instead of 'umd-grid-gap-four-large'.
 * ```
 * @since 1.1.0
 */
export const fourLarge: JssObject = composeGap({ columns: 4, size: 'large' });

/**
 * Four-column centered grid layout with larger gaps.
 * @returns {JssObject} Four-column centered grid with larger gaps for high-definition screens.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.gap.fourLargeCentered
 * ```
 * @example
 * ```css
 * class="umd-layout-grid-gap-four-large-centered"
 * ```
 * @example
 * ```text
 * Use 'umd-layout-grid-gap-four-large-centered' instead of 'umd-grid-gap-four-center'.
 * ```
 * @since 1.1.0
 */
export const fourLargeCentered: JssObject = composeGap({
  columns: 4,
  size: 'large',
  centered: true,
});

/**
 * Stacked vertical grid layout with responsive gaps.
 * @returns {JssObject} Stacked single-column grid with responsive gaps.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.grid.gap.stacked
 * ```
 * @example
 * ```css
 * class="umd-layout-grid-gap-stacked"
 * ```
 * @example
 * ```text
 * Use 'umd-layout-grid-gap-stacked' instead of 'umd-grid-gap-stacked'.
 * ```
 * @since 1.1.0
 */
export const stacked: JssObject = composeGap({ columns: 'stacked' });

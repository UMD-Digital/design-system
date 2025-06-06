/**
 * @module layout/alignment/block
 * Provides block-level alignment utilities.
 */

import { spacing } from '../../token';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';

// Consistent naming
const classNamePrefix = 'umd-layout-alignment-block';

/**
 * Center block alignment.
 * @returns {JssObject} Center-aligned flex container.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.alignment.block.center
 * ```
 * @example
 * ```css
 * class="umd-layout-alignment-block-center"
 * ```
 * @example
 * ```text
 * Use 'umd-layout-alignment-block-center' instead of 'umd-layout-element-alignment-center'.
 * ```
 * @since 1.1.0
 */
export const center: JssObject = create.jss.objectWithClassName({
  display: 'flex',
  justifyContent: 'center',

  className: [
    `${classNamePrefix}-center`,
    /** @deprecated Use 'umd-layout-alignment-block-center' instead */
    'umd-layout-element-alignment-center',
  ],
});

/**
 * Stacked block alignment with consistent spacing.
 * @returns {JssObject} Stacked flex column with spacing between children.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.layout.alignment.block.stacked
 * ```
 * @example
 * ```css
 * class="umd-layout-alignment-block-stacked"
 * ```
 * @example
 * ```text
 * Use 'umd-layout-alignment-block-stacked' instead of 'umd-media-with-caption'.
 * ```
 * @since 1.1.0
 */
export const stacked: JssObject = create.jss.objectWithClassName({
  display: 'flex',
  flexDirection: 'column',

  '& > *': {
    marginTop: spacing.sm,

    '&:first-child': {
      marginTop: '0',
    },
  },

  className: [
    `${classNamePrefix}-stacked`,
    /** @deprecated Use 'umd-layout-alignment-block-stacked' instead */
    'umd-media-with-caption',
  ],
});

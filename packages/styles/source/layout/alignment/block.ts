/**
 * @module layout/alignment/block
 * Provides block-level alignment utilities.
 */

import { spacing } from '../../token';
import { create } from '../../utilities';
import { JssObject } from '../../utilities/transform';

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
 * @since 1.8.0
 */
export const center: JssObject = create.jssObject({
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
 * @since 1.8.0
 */
export const stacked: JssObject = create.jssObject({
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

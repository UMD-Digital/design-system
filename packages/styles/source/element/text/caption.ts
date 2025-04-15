/**
 * @module element/text/caption
 * Provides styles for caption and supporting text elements.
 */

import { color, spacing } from '../../token';
import { sans } from '../../typography';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';

// Consistent naming
const classNamePrefix = 'umd-text-caption';

/**
 * Smaller caption text style.
 * @returns {JssObject} Small caption text with subtle gray color.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.text.caption.smaller
 * ```
 * @example
 * ```css
 * class="umd-text-caption-smaller"
 * Use 'umd-text-caption-smaller' instead of 'umd-caption'.
 * ```
 * @since 1.8.0
 */
export const smaller: JssObject = create.jssObject({
  ...sans.smaller,
  color: color.gray.mediumAA,
  paddingTop: spacing.xs,

  className: [
    `${classNamePrefix}-smaller`,
    /** @deprecated Use 'umd-text-caption-smaller' instead */
    `umd-caption`,
  ],
});

/**
 * Smaller caption text with italic styling.
 * @returns {JssObject} Small italic caption text with darker gray color.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.text.caption.smallerItalic
 * ```
 * @example
 * ```css
 * class="umd-text-caption-smaller-italic"
 * Use 'umd-text-caption-smaller-italic' instead of 'umd-forms-instructions'.
 * ```
 * @since 1.8.0
 */
export const smallerItalic: JssObject = create.jssObject({
  ...smaller,
  color: color.gray.darker,
  fontStyle: 'italic',

  className: [
    `${classNamePrefix}-smaller-italic`,
    /** @deprecated Use 'umd-text-caption-smaller-italic' instead */
    `umd-forms-instructions`,
  ],
});

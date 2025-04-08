/**
 * @module element/text/code
 * Provides styles for code and preformatted text elements.
 */

import { color, font, spacing } from '../../token';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';

// Consistent naming
const classNamePrefix = 'umd-text-code';

/**
 * Code block styles.
 * @returns {JssObject} Styles for code and pre elements.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.text.code.code
 * ```
 * @since 1.8.0
 */
export const code: JssObject = create.jssObject({
  className: [
    `${classNamePrefix}`,
    /** @deprecated Use 'umd-text-code' instead */
    `umd-rich-text-coding`,
  ],

  '& code, & pre': {
    border: `1px solid ${color.gray.lightest}`,
    backgroundColor: color.gray.lightest,
    borderRadius: '3px',
    color: 'currentColor',
    FontFamily: font.family.mono,
  },

  '& code': {
    display: 'inline-block',
    padding: `0 ${spacing.min}`,
  },

  '& pre': {
    padding: spacing.min,
  },
});

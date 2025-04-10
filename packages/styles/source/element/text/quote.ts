/**
 * @module element/text/quote
 * Provides styles for blockquotes and quote elements.
 */

import { color, spacing } from '../../token';
import { sans } from '../../typography';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';

// Consistent naming
const classNamePrefix = 'umd-text-quote';

/**
 * Inline blockquote style with red border.
 * @returns {JssObject} Styles for inline blockquote with red left border.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.text.quote.quote
 * ```
 * @since 1.8.0
 */
export const quote: JssObject = create.jssObject({
  className: [
    `${classNamePrefix}`,
    /** @deprecated Use 'umd-text-quote' instead */
    `umd-rich-text-inline-quote`,
  ],

  '& blockquote': {
    ...sans.larger,
    ...{
      display: 'inline-block',
      borderLeft: `2px solid ${color.red}`,
      position: 'relative',
      paddingLeft: spacing.md,
    },
  },
});

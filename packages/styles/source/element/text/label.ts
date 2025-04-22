/**
 * @module element/text/label
 * Provides styles for label elements used with form fields.
 */

import { color, spacing } from '../../token';
import { sans } from '../../typography';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';

// Consistent naming
const classNamePrefix = 'umd-text-label';

/**
 * Base label styles.
 * @type {object}
 * @private
 */
export const label = {
  ...sans.large,
  display: 'inline-block',
  position: 'relative',
  marginTop: spacing.sm,

  '&:has(+ input[required]):after': {
    content: "' *'",
    color: color.redDark,
  },

  '&[for]': {
    cursor: 'pointer',
  },
};

/**
 * Large form label style.
 * @returns {JssObject} Styles for large form field labels.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.text.label.large
 * ```
 * @example
 * ```css
 * class="umd-text-label-large"
 * ```
 * @since 1.1.0
 */
export const large: JssObject = create.jssObject({
  className: `${classNamePrefix}-large`,
  ...label,
});

/**
 * @module element/field/_state
 * Provides validation state styles for form field elements.
 * @private
 */

import { color, spacing } from '../../token';
import { elements } from '../../typography';

/**
 * Styles for invalid form field state.
 * @type {object}
 * @private
 */
export const invalid = {
  border: `1px solid ${color.redDark}`,

  '&[aria-errormessage] + [id]': {
    ...elements.eyebrow,

    color: color.redDark,
    display: 'block',
    margin: 0,
    marginTop: spacing.xs,
  },
};

/**
 * Styles for valid form field state.
 * @type {object}
 * @private
 */
export const valid = {
  border: `1px solid ${color.green}`,

  '& + [id]': {
    display: 'none',
  },
};

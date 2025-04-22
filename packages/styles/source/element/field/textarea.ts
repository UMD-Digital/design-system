/**
 * @module element/field/textarea
 * Provides styles for textarea input elements.
 */

import { baseInput } from './_base';
import { valid, invalid } from './_state';

/**
 * Textarea input styles with validation states.
 * @type {object}
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.field.textarea.textarea
 * ```
 * @note This is a style object that doesn't generate a CSS class directly, but provides styles that can be applied to textarea elements programmatically.
 * @since 1.1.0
 */
export const textarea = {
  ...baseInput,

  "&[aria-invalid='true']": {
    ...invalid,
  },

  "&[aria-invalid='false']": {
    ...valid,
  },
};

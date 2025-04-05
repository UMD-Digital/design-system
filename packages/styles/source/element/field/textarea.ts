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
 * @since 1.8.0
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

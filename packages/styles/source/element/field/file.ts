/**
 * @module element/field/file
 * Provides styles for file upload input fields.
 */

import { color, spacing } from '../../token';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';
import { valid, invalid } from './_state';

// Consistent naming
const classNamePrefix = 'umd-field-file';

/**
 * Base styles for file input elements.
 * @private
 */
const file = {
  appearance: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  position: 'relative',
  zIndex: 9,

  "&[aria-invalid='true']": {
    ...invalid,
  },

  "&[aria-invalid='false']": {
    ...valid,
  },

  [`&::file-selector-button, &::-webkit-file-upload-button`]: {
    cursor: 'pointer',
    marginRight: spacing.sm,
  },
};

/**
 * File input wrapper style.
 * @returns {JssObject} Wrapper styles for file input elements with validation states.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.field.file.fileWrapper
 * ```
 * @example
 * ```css
 * class="umd-field-file-wrapper"
 * Use 'umd-field-file-wrapper' instead of 'umd-forms-file-wrapper'.
 * ```
 * @since 1.8.0
 */
export const fileWrapper: JssObject = create.jssObject({
  backgroundColor: color.white,
  overflow: 'hidden',
  position: 'relative',

  className: [
    `${classNamePrefix}-wrapper`,
    /** @deprecated Use 'umd-field-file-wrapper' instead */
    'umd-forms-file-wrapper',
  ],

  "& input[type='file']": {
    ...file,
  },
});

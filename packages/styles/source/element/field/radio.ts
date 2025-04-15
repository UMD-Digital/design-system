/**
 * @module element/field/radio
 * Provides styles for radio button input elements.
 */

import { color, spacing } from '../../token';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';
import { baseInputChoice, baseInputChoiceWrapper } from './_base';

// Consistent naming
const classNamePrefix = 'umd-field-radio';

/**
 * Base radio button input styles.
 * @type {object}
 * @private
 */
export const radio = {
  ...baseInputChoice,
  borderRadius: '50%',
  border: `1px solid ${color.gray.light}`,

  '&::after': {
    content: "''",
    backgroundSize: 'contain',
    backgroundColor: color.red,
    backgroundPosition: 'center',
    border: `1px solid ${color.gray.light}`,
    borderRadius: '50%',
    display: 'block',
    height: spacing.xs,
    opacity: 0,
    position: 'absolute',
    left: '5px',
    top: '5px',
    transition: 'opacity 0.5s ease-in-out',
    visibility: 'hidden',
    width: spacing.xs,
  },
};

/**
 * Radio button input wrapper.
 * @returns {JssObject} Styles for radio button input with its label.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.field.radio.radioWrapper
 * ```
 * @example
 * ```css
 * class="umd-field-radio-wrapper"
 * ```
 * @deprecated Use 'umd-field-radio-wrapper' instead of 'umd-forms-choices-wrapper'.
 * @since 1.8.0
 */
export const radioWrapper: JssObject = create.jssObject({
  ...baseInputChoiceWrapper,

  className: [
    `${classNamePrefix}-wrapper`,
    /** @deprecated Use 'umd-field-radio-wrapper' instead */
    'umd-forms-choices-wrapper',
  ],

  "& input[type='radio']": {
    ...radio,
  },
});

/**
 * @module element/field/checkbox
 * Provides styles for checkbox input elements.
 */

import { color, spacing } from '@universityofmaryland/web-token-library';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';
import { baseInputChoice, baseInputChoiceWrapper } from './_base';

/**
 * Base64 encoded SVG for the red checkmark icon.
 * @private
 */
const CHECK_RED = `data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2IiB2aWV3Qm94PSIwIDAgOTYgOTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiNlMjE4MzMiIGQ9Ik00MC41NTEyIDYxLjM0MTJMODQgMTEuMDAwMUw4NS42NDQ0IDMxLjg1N0w0Mi44NzkxIDgxLjk1MjJMNDEuOTIgODEuMTMzM0w0MS40MzE4IDgxLjcwNUw5Ljk3MDMxIDU1Ljk5MThMMjkuMTUyNSA1Mi4wNDY0TDQwLjU1MTIgNjEuMzQxMloiIC8+PC9zdmc+`;

// Consistent naming
const classNamePrefix = 'umd-field-checkbox';

/**
 * Base checkbox input styles.
 * @type {object}
 * @private
 */
export const checkbox = {
  ...baseInputChoice,
  border: `1px solid ${color.gray.light}`,

  '&::after': {
    content: "''",
    backgroundImage: `url("${CHECK_RED}")`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    display: 'block',
    height: `calc(${spacing.md} - 4px)`,
    opacity: 0,
    position: 'absolute',
    left: '2px',
    top: '2px',
    transition: 'opacity 0.5s ease-in-out',
    visibility: 'hidden',
    width: `calc(${spacing.md} - 4px)`,
  },
};

/**
 * Checkbox input wrapper.
 * @returns {JssObject} Styles for checkbox input with its label.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.field.checkbox.checkboxWrapper
 * ```
 * @example
 * ```css
 * class="umd-field-checkbox-wrapper"
 * ```
 * @example
 * ```text
 * Use 'umd-field-checkbox-wrapper' instead of 'umd-forms-choices-wrapper'.
 * ```
 * @since 1.1.0
 */
export const checkboxWrapper: JssObject = create.jss.objectWithClassName({
  ...baseInputChoiceWrapper,

  className: [
    `${classNamePrefix}-wrapper`,
    /** @deprecated Use 'umd-field-checkbox-wrapper' instead */
    'umd-forms-choices-wrapper',
  ],

  "& input[type='checkbox']": {
    ...checkbox,
  },
});

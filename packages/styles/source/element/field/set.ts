/**
 * @module element/field/set
 * Provides styles for fieldset containers in forms.
 */

import { color, media, spacing } from '../../token';
import { sans } from '../../typography';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';
import { valid, invalid } from './_state';

// Consistent naming
const classNamePrefix = 'umd-field-set';

/**
 * Fieldset wrapper for organizing form fields.
 * @returns {JssObject} Styles for fieldset container with legend support.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.field.set.wrapper
 * ```
 * @example
 * ```css
 * class="umd-field-set-wrapper"
 * ```
 * @example
 * ```text
 * Use 'umd-field-set-wrapper' instead of 'umd-forms-layout-fieldset-list'.
 * ```
 * @since 1.1.0
 */
export const wrapper: JssObject = create.jss.objectWithClassName({
  className: [
    `${classNamePrefix}-wrapper`,
    /** @deprecated Use 'umd-field-set-wrapper' instead */
    'umd-forms-layout-fieldset-list',
  ],

  '& > *': {
    alignItems: 'flex-start',
    marginTop: spacing.md,

    '&:first-of-type': {
      marginTop: 0,
    },
  },

  '& > legend': {
    ...sans.large,

    marginBottom: spacing.sm,
    position: 'relative',

    [`@media (${media.queries.large.min})`]: {
      gridColumn: 'span 2',
    },
  },

  '&[required] > legend': {
    content: "' *'",
    color: color.redDark,
  },

  "&[aria-invalid='true']": {
    ...invalid,
    border: 0,
  },

  "&[aria-invalid='false']": {
    ...valid,
    border: 0,
  },
});

/**
 * @module element/action/primary
 * Provides primary action button styles with different sizes and color themes.
 */

import { color } from '../../token';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';
import { base, baseLarge, iconBase, iconBaseLarge } from './_base';

// Consistent naming
const classNamePrefix = 'umd-action-primary';

const primaryBase = {
  backgroundColor: color.red,
  border: `1px solid ${color.red}`,
  color: color.white,
  transition:
    'background 0.5s ease-in-out, border 0.5s ease-in-out, color 0.5s ease-in-out',

  [`&:hover, &:focus`]: {
    border: `1px solid ${color.redDark}`,
    backgroundColor: color.redDark,
  },
};

/**
 * Primary button style.
 * @returns {JssObject} The JSS object for the primary button style.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.action.primary.normal
 * ```
 * @example
 * ```css
 * class="umd-action-primary"
 * ```
 * @example
 * ```text
 * Use 'umd-action-primary' instead of 'umd-forms-actions-primary'.
 * ```
 * @since 1.8.0
 */
export const normal: JssObject = create.jssObject({
  ...base,
  ...primaryBase,

  className: [
    `${classNamePrefix}`,
    /** @deprecated Use 'umd-action-primary' instead */
    `umd-forms-actions-primary`,
  ],

  '& svg': {
    ...iconBase,
    fill: color.white,
  },
});

/**
 * Large primary button style.
 * @returns {JssObject} The JSS object for the large primary button style.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.action.primary.large
 * ```
 * @example
 * ```css
 * class="umd-action-primary-large"
 * ```
 *
 * @since 1.8.0
 */
export const large: JssObject = create.jssObject({
  ...baseLarge,
  ...primaryBase,

  className: `${classNamePrefix}-large`,

  '& svg': {
    ...iconBaseLarge,
    fill: color.white,
  },
});

/**
 * White primary button style.
 * @returns {JssObject} The JSS object for the white primary button style.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.action.primary.white
 * ```
 * @example
 * ```css
 * class="umd-action-primary-white"
 * ```
 *
 * @since 1.8.0
 */
export const white: JssObject = create.jssObject({
  ...base,
  backgroundColor: color.gray.lighter,
  color: color.black,
  border: `1px solid ${color.white}`,
  transition:
    'background 0.5s ease-in-out, border 0.5s ease-in-out, color 0.5s ease-in-out',

  [`&:hover, &:focus`]: {
    border: `1px solid ${color.redDark}`,
    backgroundColor: color.redDark,
    color: color.white,

    '& svg': {
      fill: color.white,
    },
  },

  className: `${classNamePrefix}-white`,

  '& svg': {
    ...iconBase,
    fill: color.red,
  },
});

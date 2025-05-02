/**
 * @module element/action/outline
 * Provides outline button styles with various sizes and color schemes.
 */

import { color } from '../../token';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';
import { base, iconBase, baseLarge, iconBaseLarge } from './_base';

// Consistent naming
const classNamePrefix = 'umd-action-outline';

/**
 * Base styles for outline buttons.
 * @private
 */
const outlineBase = {
  backgroundColor: color.white,
  border: `1px solid ${color.gray.darker}`,
  color: color.black,
  transition:
    'background 0.5s ease-in-out, border 0.5s ease-in-out, color 0.5s ease-in-out',

  [`&:hover, &:focus`]: {
    backgroundColor: color.gray.darker,
    color: color.white,

    '& svg': {
      fill: color.white,
    },
  },
};

/**
 * Normal outline button style.
 * @returns {JssObject} Standard outline button styles.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.action.outline.normal
 * ```
 * @example
 * ```css
 * class="umd-action-outline"
 * ```
 * @example
 * ```text
 * Use 'umd-action-outline' instead of 'umd-forms-actions-outline'.
 * ```
 * @since 1.1.0
 */
export const normal: JssObject = create.jss.objectWithClassName({
  ...base,
  ...outlineBase,

  className: [
    `${classNamePrefix}`,
    /** @deprecated Use 'umd-action-outline' instead */
    `umd-forms-actions-outline`,
  ],

  '& svg': {
    ...iconBase,
    fill: color.red,

    '& path': {
      fill: color.red,
    },
  },
});

/**
 * Large outline button style.
 * @returns {JssObject} Large outline button styles.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.action.outline.large
 * ```
 * @example
 * ```css
 * class="umd-action-outline-large"
 * ```
 * @since 1.1.0
 */
export const large: JssObject = create.jss.objectWithClassName({
  ...baseLarge,
  ...outlineBase,

  className: `${classNamePrefix}-large`,

  '& svg': {
    ...iconBaseLarge,
    fill: color.red,

    '& path': {
      fill: color.red,
    },
  },
});

/**
 * White outline button style.
 * @returns {JssObject} White outline button styles optimized for dark backgrounds.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.action.outline.white
 * ```
 * @example
 * ```css
 * class="umd-action-outline-white"
 * ```
 * @since 1.1.0
 */
export const white: JssObject = create.jss.objectWithClassName({
  ...base,
  color: color.white,
  border: `1px solid ${color.white}`,
  transition:
    'background 0.5s ease-in-out, border 0.5s ease-in-out, color 0.5s ease-in-out',

  className: `${classNamePrefix}-white`,

  [`&:hover, &:focus`]: {
    border: `1px solid ${color.white}`,
    backgroundColor: color.white,
    color: color.black,

    '& svg': {
      fill: color.black,
    },
  },

  '& svg': {
    ...iconBase,
    fill: color.white,
  },
});

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
 * Options for outline action style variants
 * @since 1.7.0
 */
export interface OutlineOptions {
  size?: 'normal' | 'large';
  color?: 'default' | 'white';
}

/**
 * Base styles for outline buttons.
 * @type {object}
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
 * Composable outline action button style selector
 *
 * Creates outline button styles with configurable size and color options.
 * Outline buttons have a border but transparent or light background.
 *
 * @param options - Configuration object for style variants
 * @returns JSS object with composed styles and appropriate className
 *
 * @example
 * ```typescript
 * // Normal size, default color
 * const styles = composeOutline();
 *
 * // Large size
 * const styles = composeOutline({ size: 'large' });
 *
 * // White color variant for dark backgrounds
 * const styles = composeOutline({ color: 'white' });
 *
 * // Large with white color
 * const styles = composeOutline({ size: 'large', color: 'white' });
 * ```
 *
 * @since 1.7.0
 */
export function composeOutline(options?: OutlineOptions): JssObject {
  const { size = 'normal', color: buttonColor = 'default' } = options || {};

  let composed: Record<string, any> = {};

  // Apply size base
  if (size === 'normal') {
    composed = {
      ...base,
    };
  } else if (size === 'large') {
    composed = {
      ...baseLarge,
    };
  }

  // Apply color styles
  if (buttonColor === 'default') {
    composed = {
      ...composed,
      ...outlineBase,

      '& svg': size === 'large'
        ? {
            ...iconBaseLarge,
            fill: color.red,
            '& path': { fill: color.red },
          }
        : {
            ...iconBase,
            fill: color.red,
            '& path': { fill: color.red },
          },
    };
  } else if (buttonColor === 'white') {
    composed = {
      ...composed,
      color: color.white,
      border: `1px solid ${color.white}`,
      transition:
        'background 0.5s ease-in-out, border 0.5s ease-in-out, color 0.5s ease-in-out',

      [`&:hover, &:focus`]: {
        border: `1px solid ${color.white}`,
        backgroundColor: color.white,
        color: color.black,

        '& svg': {
          fill: color.black,
        },
      },

      '& svg': size === 'large'
        ? { ...iconBaseLarge, fill: color.white }
        : { ...iconBase, fill: color.white },
    };
  }

  // Generate appropriate className
  let className = `${classNamePrefix}`;
  const deprecatedAliases: string[] = [];

  if (size === 'large' && buttonColor === 'default') {
    className = `${classNamePrefix}-large`;
  } else if (size === 'normal' && buttonColor === 'white') {
    className = `${classNamePrefix}-white`;
  } else if (size === 'large' && buttonColor === 'white') {
    className = `${classNamePrefix}-large-white`;
  } else if (size === 'normal' && buttonColor === 'default') {
    deprecatedAliases.push('umd-forms-actions-outline');
  }

  return create.jss.objectWithClassName({
    ...composed,
    className: deprecatedAliases.length > 0 ? [className, ...deprecatedAliases] : className,
  });
}

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
export const normal: JssObject = composeOutline();

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
export const large: JssObject = composeOutline({ size: 'large' });

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
export const white: JssObject = composeOutline({ color: 'white' });

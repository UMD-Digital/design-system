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

/**
 * Options for primary action style variants
 * @since 1.7.0
 */
export interface PrimaryOptions {
  size?: 'normal' | 'large';
  color?: 'default' | 'white';
}

/**
 * Base primary button styles.
 * @type {object}
 * @private
 */
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
 * Composable primary action button style selector
 *
 * Creates primary button styles with configurable size and color options.
 * Primary buttons are used for the main call-to-action on a page.
 *
 * @param options - Configuration object for style variants
 * @returns JSS object with composed styles and appropriate className
 *
 * @example
 * ```typescript
 * // Normal size, default red color
 * const styles = composePrimary();
 *
 * // Large size
 * const styles = composePrimary({ size: 'large' });
 *
 * // White color variant
 * const styles = composePrimary({ color: 'white' });
 *
 * // Large with white color
 * const styles = composePrimary({ size: 'large', color: 'white' });
 * ```
 *
 * @since 1.7.0
 */
export function composePrimary(options?: PrimaryOptions): JssObject {
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
      ...primaryBase,
      '& svg':
        size === 'large'
          ? { ...iconBaseLarge, fill: color.white }
          : { ...iconBase, fill: color.white },
    };
  } else if (buttonColor === 'white') {
    composed = {
      ...composed,
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

      '& svg':
        size === 'large'
          ? { ...iconBaseLarge, fill: color.red }
          : { ...iconBase, fill: color.red },
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
    deprecatedAliases.push('umd-forms-actions-primary');
  }

  return create.jss.objectWithClassName({
    ...composed,
    className:
      deprecatedAliases.length > 0
        ? [className, ...deprecatedAliases]
        : className,
  });
}

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
 * @since 1.1.0
 */
export const normal: JssObject = composePrimary();

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
 * @since 1.1.0
 */
export const large: JssObject = composePrimary({ size: 'large' });

/**
 * @module element/action/icon
 * Provides icon-based action button styles.
 */

import { color } from '../../token';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';

// Consistent naming
const classNamePrefix = 'umd-element-action-icon';

/**
 * Options for icon button style variants
 * @since 1.7.0
 */
export interface IconButtonOptions {
  theme?: 'light' | 'dark';
}

/**
 * Base SVG icon styles.
 * @type {object}
 * @private
 */
const svgIcon = {
  width: '14px',
  height: '14px',
  fill: `${color.black}`,
};

/**
 * Base small icon button styles.
 * @type {object}
 * @private
 */
const baseIconSmall = {
  width: '28px',
  height: '28px',
  display: 'flex',
  color: `${color.black}`,
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background-color 0.3s',

  '&:hover, &:focus': {
    backgroundColor: `${color.gray.dark}`,

    '& svg, & path': {
      fill: `${color.gray.light}`,
    },
  },
};

/**
 * Composable icon button style selector
 *
 * Creates icon button styles with configurable theme options.
 * Icon buttons are small, compact buttons that contain only an icon.
 *
 * @param options - Configuration object for style variants
 * @returns JSS object with composed styles and appropriate className
 *
 * @example
 * ```typescript
 * // Light theme (default)
 * const styles = composeIcon();
 *
 * // Dark theme
 * const styles = composeIcon({ theme: 'dark' });
 * ```
 *
 * @since 1.7.0
 */
export function composeIcon(options?: IconButtonOptions): JssObject {
  const { theme = 'light' } = options || {};

  let composed: Record<string, any> = {
    ...baseIconSmall,
  };

  if (theme === 'light') {
    composed = {
      ...composed,
      backgroundColor: `${color.gray.lightest}`,

      '& svg, & path': {
        ...svgIcon,
      },
    };
  } else if (theme === 'dark') {
    composed = {
      ...composed,
      backgroundColor: `${color.gray.darker}`,
      color: `${color.white}`,

      '&:hover, &:focus': {
        backgroundColor: `${color.gray.light}`,

        '& svg, & path': {
          fill: `${color.gray.darker}`,
        },
      },

      '& svg, & path': {
        ...svgIcon,
        fill: `${color.white}`,
      },
    };
  }

  // Generate className (both themes use same className for now)
  const className = `${classNamePrefix}-button`;

  return create.jss.objectWithClassName({
    ...composed,
    className,
  });
}

/**
 * Small icon button style with light background.
 * @returns {JssObject} Small icon button styles with light theme.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.action.icon.small
 * ```
 * @example
 * ```css
 * class="umd-element-action-icon-button"
 * ```
 * @since 1.1.0
 */
export const small: JssObject = composeIcon();

/**
 * Small icon button style with dark background.
 * @returns {JssObject} Small icon button styles with dark theme.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.action.icon.smallDark
 * ```
 * @example
 * ```css
 * class="umd-element-action-icon-button"
 * ```
 * @since 1.1.0
 */
export const smallDark: JssObject = composeIcon({ theme: 'dark' });

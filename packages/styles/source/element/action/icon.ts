/**
 * @module element/action/icon
 * Provides icon-based action button styles.
 */

import { color, spacing } from '../../token';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';

// Consistent naming
const classNamePrefix = 'umd-element-action-icon';

/**
 * Base SVG icon styles.
 * @private
 */
const svgIcon = {
  width: '14px',
  height: '14px',
  fill: `${color.black}`,
};

/**
 * Base small icon button styles.
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
export const small: JssObject = create.jssObject({
  className: `${classNamePrefix}-button`,
  ...baseIconSmall,
  backgroundColor: `${color.gray.lightest}`,

  '& svg, & path': {
    ...svgIcon,
  },
});

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
export const smallDark: JssObject = create.jssObject({
  className: `${classNamePrefix}-button`,
  ...baseIconSmall,
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
});

/**
 * @module element/text/link
 * Provides styles for text links.
 */

import { color } from '../../token';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';

// Consistent naming
const classNamePrefix = 'umd-text-link';

const base = {
  position: 'relative',
  backgroundPosition: 'left calc(100% - 1px)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100% 1px',
  transition:
    'color 0.5s, background-size 0.5s, background-image 0.5s, background-position 0.5s',
};

const focusBase = {
  backgroundPosition: 'left calc(100%)',
  textDecoration: 'none !important',
  backgroundSize: '100% 1px',
};

/**
 * Red link style.
 * @returns {JssObject} Link style with red hover/focus state.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.text.link.red
 * ```
 * @example
 * ```css
 * class="umd-text-link-red"
 * ```
 * @since 1.1.0
 */
export const red: JssObject = create.jss.objectWithClassName({
  ...base,
  color: color.black,
  backgroundImage: 'linear-gradient(#000000, #000000)',

  '&:hover, &:focus': {
    ...focusBase,
    backgroundImage: `linear-gradient(${color.red}, ${color.red})`,
    color: `${color.black} !important`,
  },

  className: `${classNamePrefix}-red`,
});

/**
 * White link style.
 * @returns {JssObject} Link style with white color and gold hover/focus state.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.element.text.link.white
 * ```
 * @example
 * ```css
 * class="umd-text-link-white"
 * ```
 * @since 1.1.0
 */
export const white: JssObject = create.jss.objectWithClassName({
  ...base,
  color: color.white,
  backgroundImage: 'linear-gradient(#ffffff, #ffffff)',

  '&:hover, &:focus': {
    ...focusBase,
    backgroundImage: `linear-gradient(${color.gold}, ${color.gold})`,
    color: `${color.white} !important`,
  },

  className: `${classNamePrefix}-white`,
});

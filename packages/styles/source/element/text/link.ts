/**
 * @module element/text/link
 * Provides styles for text links with various color themes.
 */

import { color } from '@universityofmaryland/web-token-library';
import { create } from '../../utilities';
import type { JssObject } from '../../_types';

// Consistent naming
const classNamePrefix = 'umd-text-link';

/**
 * Options for link style variants
 * @since 1.7.0
 */
export interface LinkOptions {
  color?: 'red' | 'white';
}

/**
 * Base link styles.
 * @type {object}
 * @private
 */
const linkBase = {
  position: 'relative',
  backgroundPosition: 'left calc(100% - 1px)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100% 1px',
  transition:
    'color 0.5s, background-size 0.5s, background-image 0.5s, background-position 0.5s',
};

/**
 * Base focus/hover styles.
 * @type {object}
 * @private
 */
const focusBase = {
  backgroundPosition: 'left calc(100%)',
  textDecoration: 'none !important',
  backgroundSize: '100% 1px',
};

/**
 * Composable link style selector
 *
 * Creates link styles with configurable color options for different backgrounds.
 * This function enables dynamic style composition for various link color needs.
 *
 * @param options - Configuration object for style variants
 * @returns JSS object with composed styles and appropriate className
 *
 * @example
 * ```typescript
 * // Red link (default)
 * const styles = composeLink();
 *
 * // White link for dark backgrounds
 * const styles = composeLink({ color: 'white' });
 * ```
 *
 * @since 1.7.0
 */
export function composeLink(options?: LinkOptions): JssObject {
  const { color: linkColor = 'red' } = options || {};

  let composed: Record<string, any> = {
    ...linkBase,
  };

  if (linkColor === 'red') {
    composed = {
      ...composed,
      color: color.black,
      backgroundImage: 'linear-gradient(#000000, #000000)',

      '&:hover, &:focus': {
        ...focusBase,
        backgroundImage: `linear-gradient(${color.red}, ${color.red})`,
        color: `${color.black} !important`,
      },
    };
  } else if (linkColor === 'white') {
    composed = {
      ...composed,
      color: color.white,
      backgroundImage: 'linear-gradient(#ffffff, #ffffff)',

      '&:hover, &:focus': {
        ...focusBase,
        backgroundImage: `linear-gradient(${color.gold}, ${color.gold})`,
        color: `${color.white} !important`,
      },
    };
  }

  // Generate appropriate className
  const className = `${classNamePrefix}-${linkColor}`;

  return create.jss.objectWithClassName({
    ...composed,
    className,
  });
}

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
export const red: JssObject = composeLink({ color: 'red' });

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
export const white: JssObject = composeLink({ color: 'white' });

/**
 * @module animation/loader
 * Provides styles for animation loaders.
 */

import { color, spacing } from '../token';
import { create } from '../utilities';
import type { JssObject } from '../_types';

// Consistent naming
const classNamePrefix = 'umd-animation-loader';

/**
 * Keyframe animation for box shadow.
 * @returns {JssObject} Box shadow keyframe animation.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.animation.loader.keyFrameBoxShadow
 * ```
 * @example
 * ```css
 * class="umd-animation-loader-keyframes"
 * ```
 * @since 1.8.0
 */
export const keyFrameBoxShadow: JssObject = create.jssObject({
  className: `${classNamePrefix}-keyframes`,
  '@keyframes loader-animation': {
    '0%, 100%': {
      boxShadow: `0 ${spacing.min} 0 -3px ${color.gray.dark}`,
    },
    '50%': {
      boxShadow: `0 ${spacing.min} 0 0 ${color.gray.dark}`,
    },
  },
});

const dotsAniamtion = {
  animation: 'loader-animation 1.5s infinite ease-in-out',
  display: 'block',
  borderRadius: '50%',
  width: spacing.min,
  height: spacing.min,
};

/**
 * Animated loading dots.
 * @returns {JssObject} Dots loader animation.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.animation.loader.dots
 * ```
 * @example
 * ```css
 * class="umd-animation-loader-dots"
 * Use 'umd-animation-loader-dots' instead of 'umd-loader'.
 * ```
 * @since 1.8.0
 */
export const dots: JssObject = create.jssObject({
  className: [
    `${classNamePrefix}-dots`,
    /** @deprecated Use 'umd-animation-loader-dots' instead */
    'umd-loader',
  ],

  color: color.black,
  position: 'relative',
  transform: `translate(${spacing.sm}, -4px)`,
  ...dotsAniamtion,

  '&:before, &:after': {
    content: '""',
    position: 'absolute',
    top: '0',
    ...dotsAniamtion,
  },

  '&:before': {
    animationDelay: '-0.25s',
    left: `-${spacing.sm}`,
  },

  '&:after': {
    animationDelay: '0.25s',
    left: spacing.sm,
  },
});

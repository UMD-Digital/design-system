import { create } from '../utilities';
import { JssObject } from '../utilities/transform';

// Consistent naming
const classNamePrefix = 'umd-animation-transition';

const keyFrameFadeInStart = {
  opacity: 0,
};

const keyFrameFadeInEnd = {
  opacity: '1',
};

const keyFrameSlideUpStart = {
  transform: 'translateY(50px)',
};

const keyFrameSlideUpEnd = {
  transform: 'translateY(0)',
};

const keyFrameSlideRightStart = {
  transform: 'translateX(-15vw)',
};

const keyFrameSlideRightEnd = {
  transform: 'translateX(0)',
};

const keyFrameFadeInFromBottom = create.jssObject({
  className: `${classNamePrefix}-keyframe-slide-in-from-left`,
  '@keyframes fade-in-from-bottom': {
    from: {
      ...keyFrameFadeInStart,
      ...keyFrameSlideUpStart,
    },
    to: {
      ...keyFrameFadeInEnd,
      ...keyFrameSlideUpEnd,
    },
  },
});

const keyFrameSlideInFromLeft = create.jssObject({
  className: `${classNamePrefix}-keyframe-slide-in-from-left`,

  '@keyframes slide-in-from-left': {
    from: {
      ...keyFrameSlideRightStart,
    },
    to: {
      ...keyFrameSlideRightEnd,
    },
  },
});

/**
 * Slide right animation effect.
 * @returns {JssObject} The JSS object for the slide right animation effect.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.animation.transition.slideRight
 * ```
 *
 * @since 1.8.0
 */
export const slideRight: JssObject = create.jssObject({
  ...keyFrameSlideInFromLeft,
  className: `${classNamePrefix}-slide-right`,

  [`@media (prefers-reduced-motion: no-preference)`]: {
    [`@supports (animation-timeline: view())`]: {
      animation: 'slide-in-from-left forwards',
      animationTimeline: 'view()',
      animationRangeStart: '0',
      animationRangeEnd: '100vh',
      transform: 'translateX(-15vw)',
    },
  },
});

/**
 * Fade in from bottom animation effect.
 * @returns {JssObject} The JSS object for the fade in from bottom animation effect.
 * @example
 * ```typescript
 * import * as Styles from '@universityofmaryland/web-styles-library';
 * Styles.animation.transition.fadeInFromBottom
 * ```
 *
 * @since 1.8.0
 */
export const fadeInFromBottom: JssObject = create.jssObject({
  ...keyFrameFadeInFromBottom,

  className: [
    `${classNamePrefix}-fade-bottom`,
    /** @deprecated Use 'umd-animation-transition-fade-bottom' instead */
    'umd-grid-fade-in',
  ],

  [`@media (prefers-reduced-motion: no-preference)`]: {
    animation: 'fade-in-from-bottom 1s forwards',
    opacity: '0',
    transform: 'translateY(50px)',
  },
});

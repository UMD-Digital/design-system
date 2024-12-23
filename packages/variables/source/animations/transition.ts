import { create } from '../utilities';

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

// umd-animation-transition-slide-right
export const slideRight = create.jssObject({
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

// umd-animation-transition-fade-bottom
export const fadeInFromBottom = create.jssObject({
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

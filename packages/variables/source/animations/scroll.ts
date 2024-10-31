const KeyFrameFadeInStart = {
  opacity: 0,
};

const KeyFrameFadeInEnd = {
  opacity: '1',
};

const KeyFrameSlideUpStart = {
  transform: 'translateY(50px)',
};

const KeyFrameSlideUpEnd = {
  transform: 'translateY(0)',
};

const KeyFrameSlideRightStart = {
  transform: 'translateX(-15vw)',
};

const KeyFrameSlideRightEnd = {
  transform: 'translateX(0)',
};

const KeyFrameFadeInFromBottom = {
  '@keyframes fade-in-from-bottom': {
    from: {
      ...KeyFrameFadeInStart,
      ...KeyFrameSlideUpStart,
    },
    to: {
      ...KeyFrameFadeInEnd,
      ...KeyFrameSlideUpEnd,
    },
  },
};

const KeyFrameSlideInFromLeft = {
  '@keyframes slide-in-from-left': {
    from: {
      ...KeyFrameSlideRightStart,
    },
    to: {
      ...KeyFrameSlideRightEnd,
    },
  },
};

const FadeInFromBottom = {
  ...KeyFrameFadeInFromBottom,

  [`@media (prefers-reduced-motion: no-preference)`]: {
    animation: 'fade-in-from-bottom 1s forwards',
    opacity: '0',
    transform: 'translateY(50px)',
  },
};

const SlideInFromLeft = {
  ...KeyFrameSlideInFromLeft,

  [`@media (prefers-reduced-motion: no-preference)`]: {
    [`@supports (animation-timeline: view())`]: {
      animation: 'slide-in-from-left forwards',
      animationTimeline: 'view()',
      animationRangeStart: '0',
      animationRangeEnd: '100vh',
      transform: 'translateX(-15vw)',
    },
  },
};

export default {
  KeyFrameFadeInStart,
  KeyFrameFadeInEnd,
  KeyFrameSlideUpStart,
  KeyFrameSlideUpEnd,
  FadeInFromBottom,
  SlideInFromLeft,
};

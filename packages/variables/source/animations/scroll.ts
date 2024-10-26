const KeyFrameFadeInStart = {
  opacity: 0,
};

const KeyFrameFadeInEnd = {
  opacity: '1',
};

const KeyFrameSlideUpStart = {
  transform: 'translateY(15vh)',
};

const KeyFrameSlideUpEnd = {
  transform: 'translateY(0)',
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

const FadeInFromBottom = {
  ...KeyFrameFadeInFromBottom,

  [`@media (prefers-reduced-motion: no-preference)`]: {
    [`@supports (animation-timeline: view())`]: {
      animation: 'fade-in-from-bottom forwards',
      animationTimeline: 'view()',
      animationRangeStart: '0',
      animationRangeEnd: '30vh',
      opacity: '0',
      transform: 'translateY(15vh)',
    },
  },
};

export default {
  FadeInFromBottom,
};

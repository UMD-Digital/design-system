import { Tokens, Animations } from '@universityofmaryland/variables';

const { Colors } = Tokens;

const baseSpan = {
  display: 'inline',
  position: 'relative',
  backgroundPosition: 'left bottom',
  backgroundRepeat: 'no-repeat',
  transition: 'background 0.5s',
};

const baseLink = {
  position: 'relative',
  textDecoration: 'none',
};

const SlideInUnderlineLink = {
  '.umd-slidein-underline-red': {
    ...Animations.line.slideUnder.red,
  },

  '.umd-slidein-underline-black': {
    ...Animations.line.slideUnder.black,
  },

  '.umd-slidein-underline-white': {
    ...Animations.line.slideUnder.white,
  },

  '.umd-slidein-underline-gold': {
    ...Animations.line.slideUnder.gold,
  },
};

const FadeInUnderlineLink = {
  '.umd-fadein-underline-red': {
    ...Animations.line.fadeUnder.base,

    '& > *:not(svg):not(.sr-only)': {
      ...baseSpan,

      backgroundSize: '100% 0',
      backgroundImage: `linear-gradient(${Colors.red}, ${Colors.red})`,
    },
  },

  '.umd-fadein-underline-gray': {
    ...Animations.line.fadeUnder.base,

    '& > *:not(svg):not(.sr-only)': {
      ...baseSpan,

      backgroundSize: '100% 0',
      backgroundImage: `linear-gradient(${Colors.gray.mediumAA}, ${Colors.gray.mediumAA})`,
    },
  },

  '.umd-fadein-underline-gold': {
    ...Animations.line.fadeUnder.base,

    '& > *:not(svg):not(.sr-only)': {
      ...baseSpan,

      backgroundSize: '100% 0',
      backgroundImage: `linear-gradient(${Colors.gold}, ${Colors.gold})`,
    },
  },

  '.umd-fadein-underline-black': {
    ...Animations.line.fadeUnder.base,

    '& > *:not(svg):not(.sr-only)': {
      ...baseSpan,

      backgroundSize: '100% 0',
      backgroundImage: `linear-gradient(${Colors.black}, ${Colors.black})`,
    },
  },

  '.umd-fadein-underline-white': {
    ...Animations.line.fadeUnder.base,

    '& > *:not(svg):not(.sr-only)': {
      ...baseSpan,

      backgroundSize: '100% 0',
      backgroundImage: `linear-gradient(${Colors.white}, ${Colors.white})`,
    },
  },
};

const SpecialAnimationsLink = {
  '.umd-slidein-underline-gray-red': {
    ...baseLink,
    ...Animations.line.slideUnder.gray,
  },

  '.umd-slidein-underline-graydark-red': {
    ...baseLink,
    ...Animations.line.slideUnder.grayDark,
  },

  '.umd-fadein-simple-dark': {
    ...baseLink,
    ...Animations.line.fadeUnder.dark,
  },

  '.umd-fadein-simple-light': {
    ...baseLink,
    ...Animations.line.fadeUnder.light,
  },
};

export default {
  ...SpecialAnimationsLink,
  ...FadeInUnderlineLink,
  ...SlideInUnderlineLink,
};

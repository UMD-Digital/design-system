import { Tokens, Animations } from '@universityofmaryland/variables';

const { Colors } = Tokens;
const { Link } = Animations;

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
    ...Link.LineSlideUnder.red,
  },

  '.umd-slidein-underline-black': {
    ...Link.LineSlideUnder.black,
  },

  '.umd-slidein-underline-white': {
    ...Link.LineSlideUnder.white,
  },

  '.umd-slidein-underline-gold': {
    ...Link.LineSlideUnder.gold,
  },
};

const FadeInUnderlineLink = {
  '.umd-fadein-underline-red': {
    ...Link.LineFadeUnder.base,

    '& > *:not(svg):not(.sr-only)': {
      ...baseSpan,

      backgroundSize: '100% 0',
      backgroundImage: `linear-gradient(${Colors.red}, ${Colors.red})`,
    },
  },

  '.umd-fadein-underline-gray': {
    ...Link.LineFadeUnder.base,

    '& > *:not(svg):not(.sr-only)': {
      ...baseSpan,

      backgroundSize: '100% 0',
      backgroundImage: `linear-gradient(${Colors.gray.mediumAA}, ${Colors.gray.mediumAA})`,
    },
  },

  '.umd-fadein-underline-gold': {
    ...Link.LineFadeUnder.base,

    '& > *:not(svg):not(.sr-only)': {
      ...baseSpan,

      backgroundSize: '100% 0',
      backgroundImage: `linear-gradient(${Colors.gold}, ${Colors.gold})`,
    },
  },

  '.umd-fadein-underline-black': {
    ...Link.LineFadeUnder.base,

    '& > *:not(svg):not(.sr-only)': {
      ...baseSpan,

      backgroundSize: '100% 0',
      backgroundImage: `linear-gradient(${Colors.black}, ${Colors.black})`,
    },
  },

  '.umd-fadein-underline-white': {
    ...Link.LineFadeUnder.base,

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
    ...Link.LineSlideUnder.gray,
  },

  '.umd-slidein-underline-graydark-red': {
    ...baseLink,
    ...Link.LineSlideUnder.grayDark,
  },

  '.umd-fadein-simple-dark': {
    ...baseLink,
    ...Link.LineFadeUnder.dark,
  },

  '.umd-fadein-simple-light': {
    ...baseLink,
    ...Link.LineFadeUnder.light,
  },
};

export default {
  ...SpecialAnimationsLink,
  ...FadeInUnderlineLink,
  ...SlideInUnderlineLink,
};

import { Tokens, Animations } from '@universityofmaryland/variables';

const { Colors } = Tokens;
const { LinkLineFade, LinkLineSlide } = Animations;

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

export const SlideInUnderlineLink = {
  '.umd-slidein-underline-red': {
    ...LinkLineSlide['.slidein-underline-red'],
  },

  '.umd-slidein-underline-black': {
    ...LinkLineSlide['.slidein-underline-black'],
  },

  '.umd-slidein-underline-white': {
    ...LinkLineSlide['.slidein-underline-white'],
  },

  '.umd-slidein-underline-gold': {
    ...LinkLineSlide['.slidein-underline'],

    '& > *:not(svg):not(.sr-only)': {
      ...baseSpan,

      backgroundSize: '0 2px',
      backgroundImage: `linear-gradient(${Colors.gold}, ${Colors.gold})`,
    },
  },
};

export const FadeInUnderlineLink = {
  '.umd-fadein-underline-red': {
    ...LinkLineFade['.fadein-underline'],

    '& > *:not(svg):not(.sr-only)': {
      ...baseSpan,

      backgroundSize: '100% 0',
      backgroundImage: `linear-gradient(${Colors.red}, ${Colors.red})`,
    },
  },

  '.umd-fadein-underline-gray': {
    ...LinkLineFade['.fadein-underline'],

    '& > *:not(svg):not(.sr-only)': {
      ...baseSpan,

      backgroundSize: '100% 0',
      backgroundImage: `linear-gradient(${Colors.gray.mediumAA}, ${Colors.gray.mediumAA})`,
    },
  },

  '.umd-fadein-underline-gold': {
    ...LinkLineFade['.fadein-underline'],

    '& > *:not(svg):not(.sr-only)': {
      ...baseSpan,

      backgroundSize: '100% 0',
      backgroundImage: `linear-gradient(${Colors.gold}, ${Colors.gold})`,
    },
  },

  '.umd-fadein-underline-black': {
    ...LinkLineFade['.fadein-underline'],

    '& > *:not(svg):not(.sr-only)': {
      ...baseSpan,

      backgroundSize: '100% 0',
      backgroundImage: `linear-gradient(${Colors.black}, ${Colors.black})`,
    },
  },

  '.umd-fadein-underline-white': {
    ...LinkLineFade['.fadein-underline'],

    '& > *:not(svg):not(.sr-only)': {
      ...baseSpan,

      backgroundSize: '100% 0',
      backgroundImage: `linear-gradient(${Colors.white}, ${Colors.white})`,
    },
  },
};

export const SpecialAnimationsLink = {
  '.umd-slidein-underline-gray-red': {
    ...baseLink,
    ...LinkLineSlide['.slidein-gray-red'],
  },

  '.umd-fadein-simple-dark': {
    ...baseLink,
    ...LinkLineFade['.fadein-simple-dark'],
  },

  '.umd-fadein-simple-light': {
    ...baseLink,
    ...LinkLineFade['.fadein-simple-light'],
  },
};

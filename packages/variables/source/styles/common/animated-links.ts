import { colors } from '../../tokens/colors';

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

const baseAnimation = {
  '.umd-slidein-underline': {
    ...baseLink,

    [`&:hover > *:not(svg):not(.sr-only),
      &:focus > *:not(svg):not(.sr-only)`]: {
      backgroundSize: '100% 2px',
    },
  },

  '.umd-fadein-underline': {
    ...baseLink,

    [`&:hover > *:not(svg):not(.sr-only),
      &:focus > *:not(svg):not(.sr-only)`]: {
      backgroundSize: '100% 2px',
    },
  },
};

const slideInUnderline = {
  '.umd-slidein-underline-red': {
    ...baseAnimation['.umd-slidein-underline'],

    '& > *:not(svg):not(.sr-only)': {
      ...baseSpan,

      backgroundSize: '0 2px',
      backgroundImage: `linear-gradient(${colors.red}, ${colors.red})`,
    },
  },

  '.umd-slidein-underline-gold': {
    ...baseAnimation['.umd-slidein-underline'],

    '& > *:not(svg):not(.sr-only)': {
      ...baseSpan,

      backgroundSize: '0 2px',
      backgroundImage: `linear-gradient(${colors.gold}, ${colors.gold})`,
    },
  },

  '.umd-slidein-underline-black': {
    ...baseAnimation['.umd-slidein-underline'],

    '& > *:not(svg):not(.sr-only)': {
      ...baseSpan,

      backgroundSize: '0 2px',
      backgroundImage: `linear-gradient(${colors.black}, ${colors.black})`,
    },
  },

  '.umd-slidein-underline-white': {
    ...baseAnimation['.umd-slidein-underline'],

    '& > *:not(svg):not(.sr-only)': {
      ...baseSpan,

      backgroundSize: '0 2px',
      backgroundImage: `linear-gradient(${colors.white}, ${colors.white})`,
    },
  },
};

const fadeInUnderline = {
  '.umd-fadein-underline-red': {
    ...baseAnimation['.umd-fadein-underline'],

    '& > *:not(svg):not(.sr-only)': {
      ...baseSpan,

      backgroundSize: '100% 0',
      backgroundImage: `linear-gradient(${colors.red}, ${colors.red})`,
    },
  },

  '.umd-fadein-underline-gray': {
    ...baseAnimation['.umd-fadein-underline'],

    '& > *:not(svg):not(.sr-only)': {
      ...baseSpan,

      backgroundSize: '100% 0',
      backgroundImage: `linear-gradient(${colors.gray.mediumAA}, ${colors.gray.mediumAA})`,
    },
  },

  '.umd-fadein-underline-gold': {
    ...baseAnimation['.umd-fadein-underline'],

    '& > *:not(svg):not(.sr-only)': {
      ...baseSpan,

      backgroundSize: '100% 0',
      backgroundImage: `linear-gradient(${colors.gold}, ${colors.gold})`,
    },
  },

  '.umd-fadein-underline-black': {
    ...baseAnimation['.umd-fadein-underline'],

    '& > *:not(svg):not(.sr-only)': {
      ...baseSpan,

      backgroundSize: '100% 0',
      backgroundImage: `linear-gradient(${colors.black}, ${colors.black})`,
    },
  },

  '.umd-fadein-underline-white': {
    ...baseAnimation['.umd-fadein-underline'],

    '& > *:not(svg):not(.sr-only)': {
      ...baseSpan,

      backgroundSize: '100% 0',
      backgroundImage: `linear-gradient(${colors.white}, ${colors.white})`,
    },
  },
};

const specialAnimations = {
  '.umd-slidein-underline-gray-red': {
    ...baseLink,

    '& > *:not(svg):not(.sr-only)': {
      ...baseSpan,

      backgroundImage: `linear-gradient(to left, ${colors.gray.light} 50%, ${colors.red} 50% 100%)`,
      backgroundPosition: 'right bottom',
      backgroundSize: '200% 2px',
    },

    [`&:hover > *:not(svg):not(.sr-only),
      &:focus > *:not(svg):not(.sr-only)`]: {
      backgroundPosition: 'left bottom',
      backgroundSize: '200% 2px',
    },
  },

  '.umd-fadein-simple-dark': {
    ...baseLink,

    backgroundImage: `linear-gradient(${colors.white}, ${colors.white})`,
    backgroundPosition: 'left calc(100% - 1px)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 1px',
    color: colors.white,
    transition: 'color 0.5s, background-image 0.5s, background-position 0.5s',

    [`&:hover,
    &:focus`]: {
      backgroundImage: `linear-gradient(${colors.gold}, ${colors.gold})`,
      backgroundPosition: 'left calc(100%)',
      color: colors.white,
      textDecoration: 'none',
    },
  },

  '.umd-fadein-simple-light': {
    ...baseLink,

    backgroundImage: `linear-gradient(currentColor, currentColor)`,
    backgroundPosition: 'left calc(100% - 1px)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 1px',
    color: 'currentColor',
    transition: 'color 0.5s, background-image 0.5s, background-position 0.5s',

    [`&:hover,
    &:focus`]: {
      backgroundImage: `linear-gradient(${colors.red}, ${colors.red})`,
      backgroundPosition: 'left calc(100%)',
      color: colors.red,
      textDecoration: 'none',
    },
  },
};

const animatedLinks = Object.assign(
  slideInUnderline,
  fadeInUnderline,
  specialAnimations,
  baseAnimation,
);

export { animatedLinks };

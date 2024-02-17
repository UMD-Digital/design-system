import { colors } from '../tokens/colors';

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

const baseSlideIn = {
  ...baseLink,

  [`&:hover > *:not(svg):not(.sr-only),
    &:focus > *:not(svg):not(.sr-only)`]: {
    backgroundSize: '100% 2px',
  },
};

export const LinkLineFade = {
  '.fadein-underline': {
    ...baseLink,

    [`&:hover > *:not(svg):not(.sr-only),
      &:focus > *:not(svg):not(.sr-only)`]: {
      backgroundSize: '100% 2px',
    },
  },

  '.fadein-simple-dark': {
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

  '.fadein-simple-light': {
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

export const LinkLineSlide = {
  '.slidein-underline': {
    ...baseSlideIn,
  },

  '.slidein-underline-red': {
    ...baseSlideIn,

    '& > *:not(svg):not(.sr-only)': {
      ...baseSpan,

      backgroundSize: '0 2px',
      backgroundImage: `linear-gradient(${colors.red}, ${colors.red})`,
    },
  },

  '.slidein-underline-black': {
    ...baseSlideIn,

    '& > *:not(svg):not(.sr-only)': {
      ...baseSpan,

      backgroundSize: '0 2px',
      backgroundImage: `linear-gradient(${colors.black}, ${colors.black})`,
    },
  },

  '.slidein-underline-white': {
    ...baseSlideIn,

    '& > *:not(svg):not(.sr-only)': {
      ...baseSpan,

      backgroundSize: '0 2px',
      backgroundImage: `linear-gradient(${colors.white}, ${colors.white})`,
    },
  },

  '.slidein-gray-red': {
    ...baseSlideIn,

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
};

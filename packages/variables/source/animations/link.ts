import { Colors } from '../tokens/colors';

const BaseSpan = {
  display: 'inline',
  position: 'relative',
  backgroundPosition: 'left bottom',
  backgroundRepeat: 'no-repeat',
  transition: 'background 0.5s',
};

const BaseLink = {
  position: 'relative',
  textDecoration: 'none',
};

const baseSlideIn = {
  ...BaseLink,

  [`&:hover > *:not(svg):not(.sr-only),
    &:focus > *:not(svg):not(.sr-only)`]: {
    backgroundSize: '100% 2px',
  },
};

export const LineFadeUnder = {
  base: {
    ...BaseLink,

    [`&:hover > *:not(svg):not(.sr-only),
      &:focus > *:not(svg):not(.sr-only)`]: {
      backgroundSize: '100% 2px',
    },
  },

  dark: {
    ...BaseLink,

    backgroundImage: `linear-gradient(${Colors.white}, ${Colors.white})`,
    backgroundPosition: 'left calc(100% - 1px)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 1px',
    color: Colors.white,
    transition: 'color 0.5s, background-image 0.5s, background-position 0.5s',

    [`&:hover,
    &:focus`]: {
      backgroundImage: `linear-gradient(${Colors.gold}, ${Colors.gold})`,
      backgroundPosition: 'left calc(100%)',
      color: Colors.white,
      textDecoration: 'none',
    },
  },

  light: {
    ...BaseLink,

    backgroundImage: `linear-gradient(currentColor, currentColor)`,
    backgroundPosition: 'left calc(100% - 1px)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 1px',
    color: 'currentColor',
    transition: 'color 0.5s, background-image 0.5s, background-position 0.5s',

    [`&:hover,
    &:focus`]: {
      backgroundImage: `linear-gradient(${Colors.red}, ${Colors.red})`,
      backgroundPosition: 'left calc(100%)',
      color: Colors.red,
      textDecoration: 'none',
    },
  },

  yellow: {
    ...BaseLink,

    backgroundImage: `linear-gradient(currentColor, currentColor)`,
    backgroundPosition: 'left calc(100% - 1px)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 1px',
    color: 'currentColor',
    transition: 'color 0.5s, background-image 0.5s, background-position 0.5s',

    [`&:hover,
    &:focus`]: {
      backgroundImage: `linear-gradient(${Colors.red}, ${Colors.red})`,
      backgroundPosition: 'left calc(100%)',
      color: Colors.black,
      textDecoration: 'none',
    },
  },
};

export const LineSlideUnder = {
  black: {
    ...baseSlideIn,

    '& > *:not(svg):not(.sr-only)': {
      ...BaseSpan,

      backgroundSize: '0 2px',
      backgroundImage: `linear-gradient(${Colors.black}, ${Colors.black})`,
    },
  },
  grayDark: {
    ...baseSlideIn,

    '& > *:not(svg):not(.sr-only)': {
      ...BaseSpan,

      backgroundImage: `linear-gradient(to left, ${Colors.gray.dark} 50%, ${Colors.red} 50% 100%)`,
      backgroundPosition: 'right bottom',
      backgroundSize: '200% 2px',
    },

    [`&:hover > *:not(svg):not(.sr-only),
      &:focus > *:not(svg):not(.sr-only)`]: {
      backgroundPosition: 'left bottom',
      backgroundSize: '200% 2px',
    },
  },
  gray: {
    ...baseSlideIn,

    '& > *:not(svg):not(.sr-only)': {
      ...BaseSpan,

      backgroundImage: `linear-gradient(to left, ${Colors.gray.light} 50%, ${Colors.red} 50% 100%)`,
      backgroundPosition: 'right bottom',
      backgroundSize: '200% 2px',
    },

    [`&:hover > *:not(svg):not(.sr-only),
      &:focus > *:not(svg):not(.sr-only)`]: {
      backgroundPosition: 'left bottom',
      backgroundSize: '200% 2px',
    },
  },

  gold: {
    ...baseSlideIn,

    '& > *:not(svg):not(.sr-only)': {
      ...BaseSpan,

      backgroundSize: '0 2px',
      backgroundImage: `linear-gradient(${Colors.gold}, ${Colors.gold})`,
    },
  },

  red: {
    ...baseSlideIn,

    '& > *:not(svg):not(.sr-only)': {
      ...BaseSpan,

      backgroundSize: '0 2px',
      backgroundImage: `linear-gradient(${Colors.red}, ${Colors.red})`,
    },
  },

  white: {
    ...baseSlideIn,

    '& > *:not(svg):not(.sr-only)': {
      ...BaseSpan,

      backgroundSize: '0 2px',
      backgroundImage: `linear-gradient(${Colors.white}, ${Colors.white})`,
    },
  },
};

export default {
  LineSlideUnder,
  LineFadeUnder,
};

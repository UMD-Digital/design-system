import { colors } from '../tokens';
import { create } from '../utilities';

const baseStyles = {
  span: {
    display: 'inline',
    position: 'relative',
    backgroundPosition: 'left bottom',
    backgroundRepeat: 'no-repeat',
    transition: 'background 0.5s',
  },
  link: {
    position: 'relative',
    textDecoration: 'none',
  },
};

const createSolidGradient = (color: string) =>
  `linear-gradient(${color}, ${color})`;

const createTwoColorGradient = (color1: string, color2: string) =>
  `linear-gradient(to left, ${color1} 50%, ${color2} 50% 100%)`;

const getSlideUnderStyle = (color: string) => ({
  ...baseStyles.span,
  backgroundSize: '0 2px',
  backgroundImage: createSolidGradient(color),
});

const getSlideUnderTwoColorStyle = (baseColor: string, hoverColor: string) => ({
  ...baseStyles.span,
  backgroundImage: createTwoColorGradient(baseColor, hoverColor),
  backgroundPosition: 'right bottom',
  backgroundSize: '200% 2px',
});

const getFadeUnderStyle = (color: string) => ({
  ...baseStyles.span,
  backgroundSize: '100% 0',
  backgroundImage: createSolidGradient(color),
});

const slideUnder = {
  base: {
    ...baseStyles.link,

    [`&:hover > *:not(svg):not(.sr-only),
      &:focus > *:not(svg):not(.sr-only)`]: {
      backgroundSize: '100% 2px',
    },
  },
  black: {
    ...baseStyles.link,

    [`&:hover > *:not(svg):not(.sr-only),
      &:focus > *:not(svg):not(.sr-only)`]: {
      backgroundSize: '100% 2px',
    },

    '& > *:not(svg):not(.sr-only)': getSlideUnderStyle(colors.black),
  },
  grayDarkRed: {
    ...baseStyles.link,

    [`&:hover > *:not(svg):not(.sr-only),
      &:focus > *:not(svg):not(.sr-only)`]: {
      backgroundPosition: 'left bottom',
      backgroundSize: '200% 2px',
    },

    '& > *:not(svg):not(.sr-only)': getSlideUnderTwoColorStyle(
      colors.gray.dark,
      colors.red,
    ),
  },
  grayRed: {
    ...baseStyles.link,

    [`&:hover > *:not(svg):not(.sr-only),
      &:focus > *:not(svg):not(.sr-only)`]: {
      backgroundPosition: 'left bottom',
      backgroundSize: '200% 2px',
    },

    '& > *:not(svg):not(.sr-only)': getSlideUnderTwoColorStyle(
      colors.gray.light,
      colors.red,
    ),
  },
  gold: {
    ...baseStyles.link,

    [`&:hover > *:not(svg):not(.sr-only),
      &:focus > *:not(svg):not(.sr-only)`]: {
      backgroundSize: '100% 2px',
    },

    '& > *:not(svg):not(.sr-only)': getSlideUnderStyle(colors.gold),
  },
  red: {
    ...baseStyles.link,

    [`&:hover > *:not(svg):not(.sr-only),
      &:focus > *:not(svg):not(.sr-only)`]: {
      backgroundSize: '100% 2px',
    },

    '& > *:not(svg):not(.sr-only)': getSlideUnderStyle(colors.red),
  },
  white: {
    ...baseStyles.link,

    [`&:hover > *:not(svg):not(.sr-only),
      &:focus > *:not(svg):not(.sr-only)`]: {
      backgroundSize: '100% 2px',
    },

    '& > *:not(svg):not(.sr-only)': getSlideUnderStyle(colors.white),
  },
};

export const fadeUnder = {
  base: {
    ...baseStyles.link,

    [`&:hover > *:not(svg):not(.sr-only),
      &:focus > *:not(svg):not(.sr-only)`]: {
      backgroundSize: '100% 2px',
    },
  },
  dark: {
    ...baseStyles.link,
    backgroundImage: createSolidGradient(colors.white),
    backgroundPosition: 'left calc(100% - 1px)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 1px',
    color: colors.white,
    transition: 'color 0.5s, background-image 0.5s, background-position 0.5s',

    [`&:hover, &:focus`]: {
      backgroundImage: createSolidGradient(colors.gold),
      backgroundPosition: 'left calc(100%)',
      color: colors.white,
      textDecoration: 'none',
    },
  },
  light: {
    ...baseStyles.link,
    backgroundImage: createSolidGradient('currentColor'),
    backgroundPosition: 'left calc(100% - 1px)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 1px',
    color: 'currentColor',
    transition: 'color 0.5s, background-image 0.5s, background-position 0.5s',

    [`&:hover, &:focus`]: {
      backgroundImage: createSolidGradient(colors.red),
      backgroundPosition: 'left calc(100%)',
      color: colors.red,
      textDecoration: 'none',
    },
  },
  yellow: {
    ...baseStyles.link,
    backgroundImage: createSolidGradient('currentColor'),
    backgroundPosition: 'left calc(100% - 1px)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 1px',
    color: 'currentColor',
    transition: 'color 0.5s, background-image 0.5s, background-position 0.5s',

    [`&:hover, &:focus`]: {
      backgroundImage: createSolidGradient(colors.red),
      backgroundPosition: 'left calc(100%)',
      color: colors.black,
      textDecoration: 'none',
    },
  },
};

// Consistent naming
const classNamePrefix = 'umd-animation-line';

export const slideUnderRed = create.jssObject({
  className: [
    `${classNamePrefix}-slide-red`,
    /** @deprecated Use 'umd-animation-line-slide-red' instead */
    'umd-slidein-underline-red',
  ],
  ...slideUnder.red,
});

export const slideUnderBlack = create.jssObject({
  className: [
    `${classNamePrefix}-slide-black`,
    /** @deprecated Use 'umd-animation-line-slide-black' instead */
    'umd-slidein-underline-black',
  ],
  ...slideUnder.black,
});

export const slideUnderWhite = create.jssObject({
  className: [
    `${classNamePrefix}-slide-white`,
    /** @deprecated Use 'umd-animation-line-slide-white' instead */
    'umd-slidein-underline-white',
  ],
  ...slideUnder.white,
});

export const slideUnderGold = create.jssObject({
  className: [
    `${classNamePrefix}-slide-gold`,
    /** @deprecated Use 'umd-animation-line-slide-gold' instead */
    'umd-slidein-underline-gold',
  ],
  ...slideUnder.gold,
});

export const slideUnderGrayRed = create.jssObject({
  className: [
    `${classNamePrefix}-slide-gray-red`,
    /** @deprecated Use 'umd-animation-line-slide-gray-red' instead */
    'umd-slidein-underline-gray-red',
  ],
  ...slideUnder.grayRed,
});

export const slideUnderGrayDarkRed = create.jssObject({
  className: [
    `${classNamePrefix}-slide-graydark-red`,
    /** @deprecated Use 'umd-animation-line-slide-graydark-red' instead */
    'umd-slidein-underline-graydark-red',
  ],
  ...slideUnder.grayDarkRed,
});

export const fadeUnderRed = create.jssObject({
  className: [
    `${classNamePrefix}-fade-red`,
    /** @deprecated Use 'umd-animation-line-fade-red' instead */
    'umd-fadein-underline-red',
  ],
  ...{
    ...fadeUnder.base,
    '& > *:not(svg):not(.sr-only)': getFadeUnderStyle(colors.red),
  },
});

export const fadeUnderGray = create.jssObject({
  className: [
    `${classNamePrefix}-fade-gray`,
    /** @deprecated Use 'umd-animation-line-fade-gray' instead */
    'umd-fadein-underline-gray',
  ],
  ...{
    ...fadeUnder.base,
    '& > *:not(svg):not(.sr-only)': getFadeUnderStyle(colors.gray.mediumAA),
  },
});

export const fadeUnderGold = create.jssObject({
  className: [
    `${classNamePrefix}-fade-gold`,
    /** @deprecated Use 'umd-animation-line-fade-gold' instead */
    'umd-fadein-underline-gold',
  ],
  ...{
    ...fadeUnder.base,
    '& > *:not(svg):not(.sr-only)': getFadeUnderStyle(colors.gold),
  },
});

export const fadeUnderBlack = create.jssObject({
  className: [
    `${classNamePrefix}-fade-black`,
    /** @deprecated Use 'umd-animation-line-fade-black' instead */
    'umd-fadein-underline-black',
  ],
  ...{
    ...fadeUnder.base,
    '& > *:not(svg):not(.sr-only)': getFadeUnderStyle(colors.black),
  },
});

export const fadeUnderWhite = create.jssObject({
  className: [
    `${classNamePrefix}-fade-white`,
    /** @deprecated Use 'umd-animation-line-fade-white' instead */
    'umd-fadein-underline-white',
  ],
  ...{
    ...fadeUnder.base,
    '& > *:not(svg):not(.sr-only)': getFadeUnderStyle(colors.white),
  },
});

export const fadeInSimpleDark = create.jssObject({
  className: 'umd-fadein-simple-dark',
  ...fadeUnder.dark,
});

export const fadeInSimpleLight = create.jssObject({
  className: 'umd-fadein-simple-light',
  ...fadeUnder.light,
});

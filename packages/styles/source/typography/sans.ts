import { font, media } from '../token';
import { create } from '../utilities';

const breakpointLarge = media.queries.large.min;
const breakpointDesktop = media.queries.desktop.min;

const scalingContainerMedium = 500;

const sizeExtraLarge = {
  fontSize: font.size['4xl'],
  lineHeight: `1.125em`,
};

const sizeLarger = {
  fontSize: font.size['3xl'],
  lineHeight: `1.25em`,
};

const sizeLarge = {
  fontSize: font.size['lg'],
  lineHeight: `1.25em`,
};

const sizeSmall = {
  fontSize: font.size['base'],
  lineHeight: `1.375em`,
};

const sizeSmaller = {
  fontSize: font.size['sm'],
  lineHeight: `1.28em`,
};

const sizeMin = {
  fontSize: font.size['min'],
  lineHeight: `1.16em`,
};

export const maxium = {
  fontFamily: font.family['sans'],
  fontWeight: font.weight['bold'],
  ...sizeExtraLarge,
};

export const largest = {
  fontFamily: font.family['sans'],
  fontWeight: font.weight['bold'],
  ...sizeLarger,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${font.size['3xl']} + 2vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    fontSize: font.size['5xl'],
    lineHeight: `1.04em`,
  },
};

export const extraLarge = {
  fontFamily: font.family['sans'],
  ...sizeLarge,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${font.size['lg']} + 1.16vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    ...sizeExtraLarge,
  },
};

export const larger = {
  fontFamily: font.family['sans'],
  ...sizeLarge,
  lineHeight: `1.40em`,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${font.size['lg']} + 0.5vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    ...sizeLarger,
  },
};

export const scalingLarger = {
  fontFamily: font.family['sans'],
  fontSize: font.size['lg'],
  lineHeight: `1.25em`,

  [`@container (min-width: 200px)`]: {
    fontSize: `calc(${font.size['lg']} + 0.5vw)`,
    lineHeight: `1.40em`,
  },

  [`@container (min-width: ${scalingContainerMedium}px)`]: {
    fontSize: `calc(${font.size['lg']} + 1.16vw)`,
    lineHeight: `1.40em`,
  },
};

export const large = {
  fontFamily: font.family['sans'],
  fontWeight: font.weight['bold'],
  ...sizeLarge,
};

export const medium = {
  fontFamily: font.family['sans'],
  ...sizeSmall,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${font.size['base']} + 0.16vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    fontSize: font.size['lg'],
    lineHeight: `1.55em`,
  },
};

export const small = {
  fontFamily: font.family['sans'],
  ...sizeSmall,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${font.size['sm']} + 0.16vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    ...sizeSmall,
  },
};

export const smaller = {
  fontFamily: font.family['sans'],
  ...sizeSmaller,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${font.size['min']} + 0.16vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    ...sizeSmaller,
  },
};

export const min = {
  fontFamily: font.family['sans'],
  ...sizeMin,
};

export const scalingMin = {
  ...min,
  [`@container (min-width: ${scalingContainerMedium}px)`]: {
    ...small,
  },
};

export const fonts = {
  maximum: create.jssObject({
    className: 'umd-sans-maximum',
    ...maxium,
  }),

  largest: create.jssObject({
    className: 'umd-sans-largest',
    ...largest,
  }),

  extraLarge: create.jssObject({
    className: 'umd-sans-extralarge',
    ...extraLarge,
  }),

  larger: create.jssObject({
    className: 'umd-sans-larger',
    ...larger,
  }),

  large: create.jssObject({
    className: 'umd-sans-large',
    ...large,
  }),

  medium: create.jssObject({
    className: 'umd-sans-medium',
    ...medium,
  }),

  small: create.jssObject({
    className: 'umd-sans-small',
    ...small,
  }),

  smaller: create.jssObject({
    className: 'umd-sans-smaller',
    ...smaller,
  }),

  min: create.jssObject({
    className: 'umd-sans-min',
    ...min,
  }),
};

export const scalingFonts = {
  larger: create.jssObject({
    ...scalingLarger,
    className: 'umd-sans-scaling-larger',
  }),
  min: create.jssObject({
    ...scalingMin,
    className: 'umd-sans-scaling-min',
  }),
};

export const transformations = {
  largestUppercase: create.jssObject({
    className: 'umd-sans-largest-uppercase',
    ...largest,

    fontWeight: font.weight['extraBold'],
    textTransform: 'uppercase',
  }),

  extraLargeUppercase: create.jssObject({
    className: 'umd-sans-extralarge-uppercase',
    ...extraLarge,

    fontWeight: font.weight['extraBold'],
    textTransform: 'uppercase',
  }),

  extraLargeBold: create.jssObject({
    className: 'umd-sans-extralarge-bold',
    ...extraLarge,

    fontWeight: font.weight['bold'],
  }),

  largerBold: create.jssObject({
    className: 'umd-sans-larger-bold',
    ...larger,

    fontWeight: font.weight['bold'],
  }),
};

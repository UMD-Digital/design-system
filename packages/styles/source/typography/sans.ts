import { Font, Media } from '../tokens';
import { create } from '../utilities';

const breakpointLarge = Media.queries.large.min;
const breakpointDesktop = Media.queries.desktop.min;

const sizeExtraLarge = {
  fontSize: Font.size['4xl'],
  lineHeight: `1.125em`,
};

const sizeLarger = {
  fontSize: Font.size['3xl'],
  lineHeight: `1.25em`,
};

const sizeLarge = {
  fontSize: Font.size['lg'],
  lineHeight: `1.25em`,
};

const sizeSmall = {
  fontSize: Font.size['base'],
  lineHeight: `1.375em`,
};

const sizeSmaller = {
  fontSize: Font.size['sm'],
  lineHeight: `1.28em`,
};

const sizeMin = {
  fontSize: Font.size['min'],
  lineHeight: `1.16em`,
};

export const maxium = {
  fontFamily: Font.family['sans'],
  fontWeight: Font.weight['bold'],
  ...sizeExtraLarge,
};

export const largest = {
  fontFamily: Font.family['sans'],
  fontWeight: Font.weight['bold'],
  ...sizeLarger,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${Font.size['3xl']} + 2vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    fontSize: Font.size['5xl'],
    lineHeight: `1.04em`,
  },
};

export const extraLarge = {
  fontFamily: Font.family['sans'],
  ...sizeLarge,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${Font.size['lg']} + 1.16vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    ...sizeExtraLarge,
  },
};

export const larger = {
  fontFamily: Font.family['sans'],
  ...sizeLarge,
  lineHeight: `1.40em`,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${Font.size['lg']} + 0.5vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    ...sizeLarger,
  },
};

export const large = {
  fontFamily: Font.family['sans'],
  fontWeight: Font.weight['bold'],
  ...sizeLarge,
};

export const medium = {
  fontFamily: Font.family['sans'],
  ...sizeSmall,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${Font.size['base']} + 0.16vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    fontSize: Font.size['lg'],
    lineHeight: `1.55em`,
  },
};

export const small = {
  fontFamily: Font.family['sans'],
  ...sizeSmall,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${Font.size['sm']} + 0.16vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    ...sizeSmall,
  },
};

export const smaller = {
  fontFamily: Font.family['sans'],
  ...sizeSmaller,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${Font.size['min']} + 0.16vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    ...sizeSmaller,
  },
};

export const min = {
  fontFamily: Font.family['sans'],
  ...sizeMin,
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

export const transformations = {
  largestUppercase: create.jssObject({
    className: 'umd-sans-largest-uppercase',
    ...largest,

    fontWeight: Font.weight['extraBold'],
    textTransform: 'uppercase',
  }),

  extraLargeUppercase: create.jssObject({
    className: 'umd-sans-extralarge-uppercase',
    ...extraLarge,

    fontWeight: Font.weight['extraBold'],
    textTransform: 'uppercase',
  }),

  extraLargeBold: create.jssObject({
    className: 'umd-sans-extralarge-bold',
    ...extraLarge,

    fontWeight: Font.weight['bold'],
  }),

  largerBold: create.jssObject({
    className: 'umd-sans-larger-bold',
    ...larger,

    fontWeight: Font.weight['bold'],
  }),
};

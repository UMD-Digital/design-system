import { Font, Media } from '../tokens';

const breakpointLarge = Media.queries.large.min;
const breakpointDesktop = Media.queries.desktop.min;

const SizeExtraLarge = {
  fontSize: Font.size['4xl'],
  lineHeight: `1.125em`,
};

const SizeLarger = {
  fontSize: Font.size['3xl'],
  lineHeight: `1.25em`,
};

const SizeLarge = {
  fontSize: Font.size['lg'],
  lineHeight: `1.25em`,
};

const SizeSmall = {
  fontSize: Font.size['base'],
  lineHeight: `1.375em`,
};

const SizeSmaller = {
  fontSize: Font.size['sm'],
  lineHeight: `1.28em`,
};

const SizeMin = {
  fontSize: Font.size['min'],
  lineHeight: `1.16em`,
};

export const SansMaxium = {
  fontFamily: Font.family['sans'],
  fontWeight: Font.weight['bold'],
  ...SizeExtraLarge,
};

export const SansLargest = {
  fontFamily: Font.family['sans'],
  fontWeight: Font.weight['bold'],
  ...SizeLarger,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${Font.size['3xl']} + 2vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    fontSize: Font.size['5xl'],
    lineHeight: `1.04em`,
  },
};

export const SansExtraLarge = {
  fontFamily: Font.family['sans'],
  ...SizeLarge,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${Font.size['lg']} + 1.16vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    ...SizeExtraLarge,
  },
};

export const SansLarger = {
  fontFamily: Font.family['sans'],
  ...SizeLarge,
  lineHeight: `1.40em`,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${Font.size['lg']} + 0.5vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    ...SizeLarger,
  },
};

export const SansLarge = {
  fontFamily: Font.family['sans'],
  fontWeight: Font.weight['bold'],
  ...SizeLarge,
};

export const SansMedium = {
  fontFamily: Font.family['sans'],
  ...SizeSmall,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${Font.size['base']} + 0.16vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    fontSize: Font.size['lg'],
    lineHeight: `1.55em`,
  },
};

export const SansSmall = {
  fontFamily: Font.family['sans'],
  ...SizeSmall,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${Font.size['sm']} + 0.16vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    ...SizeSmall,
  },
};

export const SansSmaller = {
  fontFamily: Font.family['sans'],
  ...SizeSmaller,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${Font.size['min']} + 0.16vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    ...SizeSmaller,
  },
};

export const SansMin = {
  fontFamily: Font.family['sans'],
  ...SizeMin,
};

export const SansFonts = {
  maximum: {
    class: 'umd-sans-maximum',
    ...SansMaxium,
  },

  largest: {
    class: 'umd-sans-largest',
    ...SansLargest,
  },

  extraLarge: {
    class: 'umd-sans-extralarge',
    ...SansExtraLarge,
  },

  larger: {
    class: 'umd-sans-larger',
    ...SansLarger,
  },

  large: {
    class: 'umd-sans-large',
    ...SansLarge,
  },

  medium: {
    class: 'umd-sans-medium',
    ...SansMedium,
  },

  small: {
    class: 'umd-sans-small',
    ...SansSmall,
  },

  smaller: {
    class: 'umd-sans-smaller',
    ...SansSmaller,
  },

  min: {
    class: 'umd-sans-min',
    ...SansMin,
  },
};

export const SansTransformationsFonts = {
  largestUppercase: {
    class: 'umd-sans-largest-uppercase',
    ...SansLargest,

    fontWeight: Font.weight['extraBold'],
    textTransform: 'uppercase',
  },

  extraLargeUppercase: {
    class: 'umd-sans-extralarge-uppercase',
    ...SansExtraLarge,

    fontWeight: Font.weight['extraBold'],
    textTransform: 'uppercase',
  },

  extraLargeBold: {
    class: 'umd-sans-extralarge-bold',
    ...SansExtraLarge,

    fontWeight: Font.weight['bold'],
  },

  largerBold: {
    class: 'umd-sans-larger-bold',
    ...SansLarger,

    fontWeight: Font.weight['bold'],
  },
};

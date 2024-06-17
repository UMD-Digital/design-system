import { FontFamily, FontSize, FontWeight } from '../tokens/fonts';
import { Queries } from '../tokens/breakpoints';

const breakpointLarge = Queries.large.min;
const breakpointDesktop = Queries.desktop.min;

const SizeExtraLarge = {
  fontSize: FontSize['4xl'],
  lineHeight: `1.125em`,
};

const SizeLarger = {
  fontSize: FontSize['3xl'],
  lineHeight: `1.25em`,
};

const SizeLarge = {
  fontSize: FontSize['lg'],
  lineHeight: `1.25em`,
};

const SizeSmall = {
  fontSize: FontSize['base'],
  lineHeight: `1.375em`,
};

const SizeSmaller = {
  fontSize: FontSize['sm'],
  lineHeight: `1.28em`,
};

const SizeMin = {
  fontSize: FontSize['min'],
  lineHeight: `1.16em`,
};

export const SansMaxium = {
  fontFamily: FontFamily['sans'],
  fontWeight: FontWeight['bold'],
  ...SizeExtraLarge,
};

export const SansLargest = {
  fontFamily: FontFamily['sans'],
  fontWeight: FontWeight['bold'],
  ...SizeLarger,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${FontSize['3xl']} + 2vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    fontSize: FontSize['5xl'],
    lineHeight: `1.04em`,
  },
};

export const SansExtraLarge = {
  fontFamily: FontFamily['sans'],
  ...SizeLarge,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${FontSize['lg']} + 1.16vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    ...SizeExtraLarge,
  },
};

export const SansLarger = {
  fontFamily: FontFamily['sans'],
  ...SizeLarge,
  lineHeight: `1.40em`,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${FontSize['lg']} + 0.5vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    ...SizeLarger,
  },
};

export const SansLarge = {
  fontFamily: FontFamily['sans'],
  fontWeight: FontWeight['bold'],
  ...SizeLarge,
};

export const SansMedium = {
  fontFamily: FontFamily['sans'],
  ...SizeSmall,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${FontSize['base']} + 0.16vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    fontSize: FontSize['lg'],
    lineHeight: `1.55em`,
  },
};

export const SansSmall = {
  fontFamily: FontFamily['sans'],
  ...SizeSmall,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${FontSize['sm']} + 0.16vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    ...SizeSmall,
  },
};

export const SansSmaller = {
  fontFamily: FontFamily['sans'],
  ...SizeSmaller,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${FontSize['min']} + 0.16vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    ...SizeSmaller,
  },
};

export const SansMin = {
  fontFamily: FontFamily['sans'],
  ...SizeMin,
};

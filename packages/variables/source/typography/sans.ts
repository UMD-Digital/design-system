import { FontFamily, FontSize, FontWeight } from '../tokens/fonts';
import { Queries } from '../tokens/breakpoints';

const breakpointMobile = Queries.medium.max;
const breakpointDesktop = Queries.desktop.max;

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
  lineHeight: `1.11em`,
};

const SizeSmall = {
  fontSize: FontSize['base'],
  lineHeight: `1.25em`,
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
  fontSize: FontSize['8xl'],
  fontWeight: FontWeight['bold'],
  lineHeight: `1.05em`,

  [`@media (${breakpointDesktop})`]: {
    fontSize: `calc(${FontSize['4xl']} + 3.33vw)`,
  },

  [`@media (${breakpointMobile})`]: {
    ...SizeExtraLarge,
  },
};

export const SansLargest = {
  fontFamily: FontFamily['sans'],
  fontSize: FontSize['5xl'],
  fontWeight: FontWeight['bold'],
  lineHeight: `1.04em`,

  [`@media (${breakpointDesktop})`]: {
    fontSize: `calc(${FontSize['3xl']} + 2vw)`,
  },

  [`@media (${breakpointMobile})`]: {
    ...SizeLarger,
  },
};

export const SansExtraLarge = {
  fontFamily: FontFamily['sans'],
  ...SizeExtraLarge,

  [`@media (${breakpointDesktop})`]: {
    fontSize: `calc(${FontSize['lg']} + 1.16vw)`,
  },

  [`@media (${breakpointMobile})`]: {
    ...SizeLarge,
  },
};

export const SansLarger = {
  fontFamily: FontFamily['sans'],
  ...SizeLarger,

  [`@media (${breakpointDesktop})`]: {
    fontSize: `calc(${FontSize['lg']} + 0.5vw)`,
  },

  [`@media (${breakpointMobile})`]: {
    ...SizeLarge,
    lineHeight: `1.40em`,
  },
};

export const SansLarge = {
  fontFamily: FontFamily['sans'],
  fontWeight: FontWeight['bold'],
  ...SizeLarge,
};

export const SansMedium = {
  fontFamily: FontFamily['sans'],
  fontSize: FontSize['lg'],
  lineHeight: `1.55em`,

  [`@media (${breakpointDesktop})`]: {
    fontSize: `calc(${FontSize['base']} + 0.16vw)`,
  },

  [`@media (${breakpointMobile})`]: {
    ...SizeSmall,
  },
};

export const SansSmall = {
  fontFamily: FontFamily['sans'],
  ...SizeSmall,

  [`@media (${breakpointDesktop})`]: {
    fontSize: `calc(${FontSize['sm']} + 0.16vw)`,
  },

  [`@media (${breakpointMobile})`]: {
    ...SizeSmall,
  },
};

export const SansSmaller = {
  fontFamily: FontFamily['sans'],
  ...SizeSmaller,

  [`@media (${breakpointDesktop})`]: {
    fontSize: `calc(${FontSize['min']} + 0.16vw)`,
  },

  [`@media (${breakpointMobile})`]: {
    ...SizeSmaller,
  },
};

export const SansMin = {
  fontFamily: FontFamily['sans'],
  ...SizeMin,
};

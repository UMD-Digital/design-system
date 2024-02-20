import { FontFamily, FontSize, FontWeight } from '../tokens/fonts';
import { Queries } from '../tokens/breakpoints';

const breakpointMobile = Queries.medium.max;
const breakpointDesktop = Queries.desktop.max;

const FontBase = {
  fontFamily: FontFamily['serif'],
};

const SizeLarger = {
  fontSize: FontSize['4xl'],
  lineHeight: `1.18em`,
};
const SizeLarge = {
  fontSize: FontSize['3xl'],
  lineHeight: `1em`,
};
const SizeMedium = {
  fontSize: FontSize['xl'],
  lineHeight: `1.5em`,
};

export const SerifMaxium = {
  ...FontBase,

  fontSize: FontSize['9xl'],
  fontWeight: FontWeight['light'],
  lineHeight: `1.025em`,

  [`@media (${breakpointDesktop})`]: {
    fontSize: `calc(${FontSize['4xl']} + 4vw)`,
  },

  [`@media (${breakpointMobile})`]: {
    ...SizeLarger,
  },
};

export const SerifExtralarge = {
  ...FontBase,

  fontSize: FontSize['6xl'],
  lineHeight: `1.07em`,

  [`@media (${breakpointDesktop})`]: {
    fontSize: `calc(${FontSize['4xl']} + 2vw)`,
  },

  [`@media (${breakpointMobile})`]: {
    ...SizeLarger,
  },
};

export const SerifLarger = {
  ...FontBase,
  ...SizeLarger,

  [`@media (${breakpointDesktop})`]: {
    fontSize: `calc(${FontSize['3xl']} + 0.66vw)`,
  },

  [`@media (${breakpointMobile})`]: {
    ...SizeLarge,
  },
};

export const SerifLarge = {
  ...FontBase,
  ...SizeLarge,

  [`@media (${breakpointDesktop})`]: {
    fontSize: `calc(${FontSize['xl']} + 0.33vw)`,
  },

  [`@media (${breakpointMobile})`]: {
    ...SizeMedium,
  },
};

export const SerifMedium = {
  ...FontBase,
  ...SizeMedium,
};

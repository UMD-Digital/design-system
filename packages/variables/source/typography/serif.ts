import { FontFamily, FontSize, FontWeight } from '../tokens/fonts';
import { Queries } from '../tokens/breakpoints';

const breakpointLarge = Queries.large.min;
const breakpointDesktop = Queries.desktop.min;

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
  ...SizeLarger,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${FontSize['4xl']} + 4vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    fontSize: FontSize['9xl'],
    fontWeight: FontWeight['light'],
    lineHeight: `1.025em`,
  },
};

export const SerifExtralarge = {
  ...FontBase,
  ...SizeLarger,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${FontSize['4xl']} + 2vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    fontSize: FontSize['6xl'],
    lineHeight: `1.07em`,
  },
};

export const SerifLarger = {
  ...FontBase,
  ...SizeLarge,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${FontSize['3xl']} + 0.66vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    ...SizeLarger,
  },
};

export const SerifLarge = {
  ...FontBase,
  ...SizeMedium,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${FontSize['xl']} + 0.33vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    ...SizeLarge,
  },
};

export const SerifMedium = {
  ...FontBase,
  ...SizeMedium,
};

import { FontFamily, FontSize, FontWeight } from '../tokens/fonts';
import { Queries } from '../tokens/breakpoints';

const breakpointMobile = Queries.medium.max;
const breakpointDesktop = Queries.desktop.max;

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
  fontFamily: FontFamily['serif'],
  fontSize: FontSize['9xl'],
  lineHeight: `1.025em`,

  [`@media (${breakpointDesktop})`]: {
    fontSize: `calc(${FontSize['4xl']} + 4vw)`,
  },

  [`@media (${breakpointMobile})`]: {
    ...SizeLarger,
  },
};

export const SerifExtralarge = {
  fontFamily: FontFamily['serif'],
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
  fontFamily: FontFamily['serif'],
  ...SizeLarger,

  [`@media (${breakpointDesktop})`]: {
    fontSize: `calc(${FontSize['3xl']} + 0.66vw)`,
  },

  [`@media (${breakpointMobile})`]: {
    ...SizeLarge,
  },
};

export const SerifLarge = {
  fontFamily: FontFamily['serif'],
  ...SizeLarge,

  [`@media (${breakpointDesktop})`]: {
    fontSize: `calc(${FontSize['xl']} + 0.33vw)`,
  },

  [`@media (${breakpointMobile})`]: {
    ...SizeMedium,
  },
};

export const SerifMedium = {
  fontFamily: FontFamily['serif'],
  fontWeight: FontWeight['medium'],
  ...SizeMedium,
};
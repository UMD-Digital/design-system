import { Font, Media } from '../tokens';

const breakpointLarge = Media.queries.large.min;
const breakpointDesktop = Media.queries.desktop.min;

const FontBase = {
  FontFamily: Font.family['serif'],
};

const SizeLarger = {
  fontSize: Font.size['4xl'],
  lineHeight: `1.18em`,
};
const SizeLarge = {
  fontSize: Font.size['3xl'],
  lineHeight: `1em`,
};
const SizeMedium = {
  fontSize: Font.size['xl'],
  lineHeight: `1.5em`,
};

export const SerifMaxium = {
  ...FontBase,
  ...SizeLarger,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${Font.size['4xl']} + 4vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    fontSize: Font.size['9xl'],
    fontWeight: Font.weight['light'],
    lineHeight: `1.025em`,
  },
};

export const SerifExtralarge = {
  ...FontBase,
  ...SizeLarger,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${Font.size['4xl']} + 2vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    fontSize: Font.size['6xl'],
    lineHeight: `1.07em`,
  },
};

export const SerifLarger = {
  ...FontBase,
  ...SizeLarge,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${Font.size['3xl']} + 0.66vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    ...SizeLarger,
  },
};

export const SerifLarge = {
  ...FontBase,
  ...SizeMedium,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${Font.size['xl']} + 0.33vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    ...SizeLarge,
  },
};

export const SerifMedium = {
  ...FontBase,
  ...SizeMedium,
};

export const SerifFonts = {
  maximum: {
    class: 'umd-serif-maximum',
    ...SerifMaxium,
  },

  extraLarge: {
    class: 'umd-serif-extralarge',
    ...SerifExtralarge,
  },

  larger: {
    class: 'umd-serif-larger',
    ...SerifLarger,
  },

  large: {
    class: 'umd-serif-large',
    ...SerifLarge,
  },

  medium: {
    class: 'umd-serif-medium',
    ...SerifMedium,
  },
};

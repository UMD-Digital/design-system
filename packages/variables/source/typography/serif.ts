import { Font, Media } from '../tokens';

const breakpointLarge = Media.queries.large.min;
const breakpointDesktop = Media.queries.desktop.min;

const base = {
  FontFamily: Font.family['serif'],
};

const sizeLarger = {
  fontSize: Font.size['4xl'],
  lineHeight: `1.18em`,
};
const sizeLarge = {
  fontSize: Font.size['3xl'],
  lineHeight: `1em`,
};
const sizeMedium = {
  fontSize: Font.size['xl'],
  lineHeight: `1.5em`,
};

export const maxium = {
  ...base,
  ...sizeLarger,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${Font.size['4xl']} + 4vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    fontSize: Font.size['9xl'],
    fontWeight: Font.weight['light'],
    lineHeight: `1.025em`,
  },
};

export const extralarge = {
  ...base,
  ...sizeLarger,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${Font.size['4xl']} + 2vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    fontSize: Font.size['6xl'],
    lineHeight: `1.07em`,
  },
};

export const larger = {
  ...base,
  ...sizeLarge,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${Font.size['3xl']} + 0.66vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    ...sizeLarger,
  },
};

export const large = {
  ...base,
  ...sizeMedium,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${Font.size['xl']} + 0.33vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    ...sizeLarge,
  },
};

export const medium = {
  ...base,
  ...sizeMedium,
};

export const fonts = {
  maximum: {
    class: 'umd-serif-maximum',
    ...maxium,
  },

  extraLarge: {
    class: 'umd-serif-extralarge',
    ...extralarge,
  },

  larger: {
    class: 'umd-serif-larger',
    ...larger,
  },

  large: {
    class: 'umd-serif-large',
    ...large,
  },

  medium: {
    class: 'umd-serif-medium',
    ...medium,
  },
};

import { font, media } from '../tokens';
import { create } from '../utilities';

const breakpointLarge = media.queries.large.min;
const breakpointDesktop = media.queries.desktop.min;

const base = {
  fontFamily: font.family['serif'],
};

const sizeLarger = {
  fontSize: font.size['4xl'],
  lineHeight: `1.18em`,
};

const sizeLarge = {
  fontSize: font.size['3xl'],
  lineHeight: `1em`,
};

const sizeMedium = {
  fontSize: font.size['xl'],
  lineHeight: `1.5em`,
};

export const maxium = {
  ...base,
  ...sizeLarger,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${font.size['4xl']} + 4vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    fontSize: font.size['9xl'],
    fontWeight: font.weight['light'],
    lineHeight: `1.025em`,
  },
};

export const extralarge = {
  ...base,
  ...sizeLarger,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${font.size['4xl']} + 2vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    fontSize: font.size['6xl'],
    lineHeight: `1.07em`,
  },
};

export const larger = {
  ...base,
  ...sizeLarge,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${font.size['3xl']} + 0.66vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    ...sizeLarger,
  },
};

export const large = {
  ...base,
  ...sizeMedium,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${font.size['xl']} + 0.33vw)`,
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
  maximum: create.jssObject({
    className: 'umd-serif-maximum',
    ...maxium,
  }),

  extraLarge: create.jssObject({
    className: 'umd-serif-extralarge',
    ...extralarge,
  }),

  larger: create.jssObject({
    className: 'umd-serif-larger',
    ...larger,
  }),

  large: create.jssObject({
    className: 'umd-serif-large',
    ...large,
  }),

  medium: create.jssObject({
    className: 'umd-serif-medium',
    ...medium,
  }),
};

import { Font, Media } from '../tokens';
import { create } from '../utilities';

const breakpointLarge = Media.queries.large.min;
const breakpointDesktop = Media.queries.desktop.min;

const base = {
  fontFamily: Font.family['campaign'],
  fontStyle: 'italic',
  fontWeight: Font.weight['bold'],
};

const sizeExtraSmall = {
  fontSize: Font.size['4xl'],
  letterSpacing: '0.02em',
  lineHeight: `0.94em`,
};

const sizeSmall = {
  fontSize: Font.size['5xl'],
  letterSpacing: '0.02em',
  lineHeight: `0.91em`,
};

export const maxium = {
  ...base,
  ...sizeSmall,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${Font.size['9xl']} + 2vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    fontSize: '120px',
    lineHeight: `0.9em`,
  },
};

export const extralarge = {
  ...base,
  ...sizeSmall,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${Font.size['5xl']} + 4vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    fontSize: Font.size['10xl'],
    lineHeight: `0.91em`,
  },
};

export const large = {
  ...base,
  ...sizeSmall,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${Font.size['5xl']} + 2.66vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    fontSize: Font.size['9xl'],
    lineHeight: `0.91em`,
  },
};

export const medium = {
  ...base,
  ...sizeSmall,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${Font.size['5xl']} + 1.33vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    fontSize: Font.size['7xl'],
    letterSpacing: '0.02em',
    lineHeight: `0.94em`,
  },
};

export const CampaignSmall = {
  ...base,
  ...sizeExtraSmall,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${Font.size['4xl']} + 1.33vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    ...sizeSmall,
  },
};

export const extraSmall = {
  ...base,
  ...sizeExtraSmall,
};

export const fonts = {
  maximum: create.jssObject({
    className: 'umd-campaign-maximum',
    ...maxium,
  }),

  extraLarge: create.jssObject({
    className: 'umd-campaign-extralarge',
    ...extralarge,
  }),

  large: create.jssObject({
    className: 'umd-campaign-large',
    ...large,
  }),

  medium: create.jssObject({
    className: 'umd-campaign-medium',
    ...medium,
  }),

  small: create.jssObject({
    className: 'umd-campaign-small',
    ...CampaignSmall,
  }),

  extraSmall: create.jssObject({
    className: 'umd-campaign-extrasmall',
    ...extraSmall,
  }),
};

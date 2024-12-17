import { Font, Media } from '../tokens';

const breakpointLarge = Media.queries.large.min;
const breakpointDesktop = Media.queries.desktop.min;

const FontBase = {
  fontFamily: Font.family['campaign'],
  fontStyle: 'italic',
  fontWeight: Font.weight['bold'],
};

const SizeExtraSmall = {
  fontSize: Font.size['4xl'],
  letterSpacing: '0.02em',
  lineHeight: `0.94em`,
};

const SizeSmall = {
  fontSize: Font.size['5xl'],
  letterSpacing: '0.02em',
  lineHeight: `0.91em`,
};

export const CampaignMaxium = {
  ...FontBase,
  ...SizeSmall,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${Font.size['9xl']} + 2vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    fontSize: '120px',
    lineHeight: `0.9em`,
  },
};

export const CampaignExtralarge = {
  ...FontBase,
  ...SizeSmall,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${Font.size['5xl']} + 4vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    fontSize: Font.size['10xl'],
    lineHeight: `0.91em`,
  },
};

export const CampaignLarge = {
  ...FontBase,
  ...SizeSmall,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${Font.size['5xl']} + 2.66vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    fontSize: Font.size['9xl'],
    lineHeight: `0.91em`,
  },
};

export const CampaignMedium = {
  ...FontBase,
  ...SizeSmall,

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
  ...FontBase,
  ...SizeExtraSmall,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${Font.size['4xl']} + 1.33vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    ...SizeSmall,
  },
};

export const CampaignExtraSmall = {
  ...FontBase,
  ...SizeExtraSmall,
};

export const CampaignFonts = {
  maximum: {
    class: 'umd-campaign-maximum',
    ...CampaignMaxium,
  },

  extraLarge: {
    class: 'umd-campaign-extralarge',
    ...CampaignExtralarge,
  },

  large: {
    class: 'umd-campaign-large',
    ...CampaignLarge,
  },

  medium: {
    class: 'umd-campaign-medium',
    ...CampaignMedium,
  },

  small: {
    class: 'umd-campaign-small',
    ...CampaignSmall,
  },

  extraSmall: {
    class: 'umd-campaign-extrasmall',
    ...CampaignExtraSmall,
  },
};

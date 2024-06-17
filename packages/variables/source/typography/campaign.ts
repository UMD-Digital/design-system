import { FontFamily, FontSize, FontWeight } from '../tokens/fonts';
import { Queries } from '../tokens/breakpoints';

const breakpointLarge = Queries.large.max;
const breakpointDesktop = Queries.desktop.max;

const FontBase = {
  fontFamily: FontFamily['campaign'],
  fontStyle: 'italic',
  fontWeight: FontWeight['bold'],
};

const SizeExtraSmall = {
  fontSize: FontSize['4xl'],
  letterSpacing: '0.02em',
  lineHeight: `0.94em`,
};

const SizeSmall = {
  fontSize: FontSize['5xl'],
  letterSpacing: '0.02em',
  lineHeight: `0.91em`,
};

export const CampaignMaxium = {
  ...FontBase,
  ...SizeSmall,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${FontSize['9xl']} + 2vw)`,
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
    fontSize: `calc(${FontSize['5xl']} + 4vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    fontSize: FontSize['10xl'],
    lineHeight: `0.91em`,
  },
};

export const CampaignLarge = {
  ...FontBase,
  ...SizeSmall,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${FontSize['5xl']} + 2.66vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    fontSize: FontSize['9xl'],
    lineHeight: `0.91em`,
  },
};

export const CampaignMedium = {
  ...FontBase,
  ...SizeSmall,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${FontSize['5xl']} + 1.33vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    fontSize: FontSize['7xl'],
    letterSpacing: '0.02em',
    lineHeight: `0.94em`,
  },
};

export const CampaignSmall = {
  ...FontBase,
  ...SizeExtraSmall,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${FontSize['4xl']} + 1.33vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    ...SizeSmall,
  },
};

export const CampaignExtraSmall = {
  ...FontBase,
  ...SizeExtraSmall,
};

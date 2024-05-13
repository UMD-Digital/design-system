import { FontFamily, FontSize, FontWeight } from '../tokens/fonts';
import { Queries } from '../tokens/breakpoints';

const breakpointMobile = Queries.medium.max;
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

const SizeLarge = {
  fontSize: FontSize['9xl'],
  lineHeight: `0.91em`,
};

export const CampaignMaxium = {
  ...FontBase,
  fontSize: '120px',
  lineHeight: `0.9em`,

  [`@media (${breakpointDesktop})`]: {
    fontSize: `calc(${FontSize['9xl']} + 5.83vw)`,
  },

  [`@media (${breakpointMobile})`]: {
    ...SizeLarge,
  },
};

export const CampaignExtralarge = {
  ...FontBase,
  fontSize: FontSize['10xl'],
  lineHeight: `0.91em`,

  [`@media (${breakpointDesktop})`]: {
    fontSize: `calc(${FontSize['5xl']} + 4vw)`,
  },

  [`@media (${breakpointMobile})`]: {
    ...SizeSmall,
  },
};

export const CampaignLarge = {
  ...FontBase,
  ...SizeLarge,

  [`@media (${breakpointDesktop})`]: {
    fontSize: `calc(${FontSize['5xl']} + 2.66vw)`,
  },

  [`@media (${breakpointMobile})`]: {
    ...SizeSmall,
  },
};

export const CampaignMedium = {
  ...FontBase,
  fontSize: FontSize['7xl'],
  letterSpacing: '0.02em',
  lineHeight: `0.94em`,

  [`@media (${breakpointDesktop})`]: {
    fontSize: `calc(${FontSize['5xl']} + 1.33vw)`,
  },

  [`@media (${breakpointMobile})`]: {
    ...SizeSmall,
  },
};

export const CampaignSmall = {
  ...FontBase,
  ...SizeSmall,

  [`@media (${breakpointDesktop})`]: {
    fontSize: `calc(${FontSize['4xl']} + 1.33vw)`,
  },

  [`@media (${breakpointMobile})`]: {
    ...SizeExtraSmall,
  },
};

export const CampaignExtraSmall = {
  ...FontBase,
  ...SizeExtraSmall,
};

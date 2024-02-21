import { FontFamily, FontSize, FontWeight } from '../tokens/fonts';
import { Queries } from '../tokens/breakpoints';
import { Colors } from '../tokens/colors';

const breakpointMobile = Queries.medium.max;
const breakpointDesktop = Queries.desktop.max;

export const Eyebrow = {
  fontWeight: 700,
  color: Colors.black,
  fontSize: FontSize.min,
  lineHeight: 1,
  textTransform: `uppercase`,
  letterSpacing: `.05em`,
};

export const LabelMedium = {
  fontFamily: FontFamily['sans'],
  fontSize: FontSize['base'],
  letterSpacing: '0.16em',
  lineHeight: `1.5em`,

  [`@media (${breakpointDesktop})`]: {
    fontSize: `calc(${FontSize['sm']} + 0.16vw)`,
  },

  [`@media (${breakpointMobile})`]: {
    // umd-label-sans-small
    fontSize: FontSize['sm'],
    lineHeight: `1.42em`,
  },
};

export const LabelSmall = {
  fontFamily: FontFamily['sans'],
  fontSize: FontSize['sm'],
  letterSpacing: '0.16em',
  lineHeight: `1.42em`,
};

export const InterativeMedium = {
  fontFamily: FontFamily['sans'],
  fontSize: FontSize['lg'],
  fontWeight: FontWeight['bold'],
  letterSpacing: '-0.01em',
  lineHeight: `1.11em`,

  [`@media (${breakpointDesktop})`]: {
    fontSize: `calc(${FontSize['base']} + 0.16vw)`,
  },

  [`@media (${breakpointMobile})`]: {
    // umd-interactive-sans-small
    fontSize: FontSize['base'],
    lineHeight: `1.125em`,
  },
};

export const InterativeSmall = {
  fontFamily: FontFamily['sans'],
  fontSize: FontSize['base'],
  fontWeight: FontWeight['bold'],
  letterSpacing: '-0.01em',
  lineHeight: `1.125.em`,
};

export const StatisticsLarge = {
  fontFamily: FontFamily['campaign'],
  fontSize: FontSize['max'],
  fontStyle: 'italic',
  fontWeight: FontWeight['extraBold'],
  lineHeight: '0.83em',

  [`@media (${breakpointDesktop})`]: {
    fontSize: `calc(${FontSize['9xl']} + 3.33vw)`,
  },

  // Stat2
  [`@media (${breakpointMobile})`]: {
    fontSize: FontSize['9xl'],
  },
};

export const StatisticsMedium = {
  fontFamily: FontFamily['campaign'],
  fontSize: FontSize['9xl'],
  fontStyle: 'italic',
  fontWeight: FontWeight['extraBold'],
  lineHeight: '1.11em',

  [`@media (${breakpointDesktop})`]: {
    fontSize: `calc(${FontSize['7xl']} + 1.33vw)`,
  },

  // Stats3
  [`@media (${breakpointMobile})`]: {
    fontSize: FontSize['7xl'],
  },
};

export const StatisticsSmall = {
  fontFamily: FontFamily['campaign'],
  fontSize: FontSize['7xl'],
  fontStyle: 'italic',
  fontWeight: FontWeight['extraBold'],
  lineHeight: '0.87em',
};

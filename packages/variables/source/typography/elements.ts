import { Colors, Font, Media } from '../tokens';

const breakpointLarge = Media.queries.large.min;
const breakpointDesktop = Media.queries.desktop.min;

export const Eyebrow = {
  fontWeight: 700,
  color: Colors.black,
  fontSize: Font.size.min,
  lineHeight: 1,
  textTransform: `uppercase`,
  letterSpacing: `.05em`,
};

export const LabelMedium = {
  fontFamily: Font.family['sans'],
  fontSize: Font.size['sm'],
  lineHeight: `1.42em`,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${Font.size['sm']} + 0.16vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    fontSize: Font.size['base'],
    letterSpacing: '0.16em',
    lineHeight: `1.5em`,
  },
};

export const LabelSmall = {
  fontFamily: Font.family['sans'],
  fontSize: Font.size['sm'],
  letterSpacing: '0.16em',
  lineHeight: `1.42em`,
};

export const InterativeMedium = {
  fontFamily: Font.family['sans'],
  fontSize: Font.size['base'],
  lineHeight: `1.125em`,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${Font.size['base']} + 0.16vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    fontSize: Font.size['lg'],
    fontWeight: Font.weight['bold'],
    letterSpacing: '-0.01em',
    lineHeight: `1.11em`,
  },
};

export const InterativeSmall = {
  fontFamily: Font.family['sans'],
  fontSize: Font.size['base'],
  fontWeight: Font.weight['bold'],
  letterSpacing: '-0.01em',
  lineHeight: `1.125.em`,
};

export const StatisticsLarge = {
  fontFamily: Font.family['campaign'],
  fontSize: Font.size['9xl'],
  fontWeight: Font.weight['extraBold'],
  fontStyle: 'italic',
  lineHeight: '1',

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${Font.size['9xl']} + 3.33vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    fontSize: Font.size['max'],
  },
};

export const StatisticsMedium = {
  fontFamily: Font.family['campaign'],
  fontSize: Font.size['7xl'],
  fontStyle: 'italic',
  fontWeight: Font.weight['extraBold'],
  lineHeight: '1',

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${Font.size['7xl']} + 1.33vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    fontSize: Font.size['10xl'],
  },
};

export const StatisticsSmall = {
  fontFamily: Font.family['campaign'],
  fontSize: Font.size['7xl'],
  fontStyle: 'italic',
  fontWeight: Font.weight['extraBold'],
  lineHeight: '0.87em',
};

export const ElementFonts = {
  eyebrow: {
    class: 'umd-eyebrow',
    ...Eyebrow,
  },

  labelMedium: {
    class: 'umd-label-sans-medium',
    ...LabelMedium,
  },

  labelSmall: {
    class: 'umd-label-sans-small',
    ...LabelSmall,
  },

  medium: {
    class: 'umd-interactive-sans-medium',
    ...InterativeMedium,
  },

  small: {
    class: 'umd-interactive-sans-small',
    ...InterativeSmall,
  },
};

export const StatisticFonts = {
  eyebrow: {
    class: 'umd-statistic-sans-large',
    ...StatisticsLarge,
  },

  labelMedium: {
    class: 'umd-statistic-sans-medium',
    ...StatisticsMedium,
  },

  labelSmall: {
    class: 'umd-statistic-sans-small',
    ...StatisticsSmall,
  },
};

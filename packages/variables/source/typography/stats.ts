import { Font, Media } from '../tokens';
import { create } from '../utilities';

const breakpointLarge = Media.queries.large.min;
const breakpointDesktop = Media.queries.desktop.min;

export const large = {
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

export const medium = {
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

export const small = {
  fontFamily: Font.family['campaign'],
  fontSize: Font.size['7xl'],
  fontStyle: 'italic',
  fontWeight: Font.weight['extraBold'],
  lineHeight: '0.87em',
};

export const fonts = {
  statLarge: create.jssObject({
    className: 'umd-statistic-sans-large',
    ...large,
  }),

  statMedium: create.jssObject({
    className: 'umd-statistic-sans-medium',
    ...medium,
  }),

  statSmall: create.jssObject({
    className: 'umd-statistic-sans-small',
    ...small,
  }),
};
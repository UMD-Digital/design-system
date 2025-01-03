import { font, media } from '../token';
import { create } from '../utilities';

const breakpointLarge = media.queries.large.min;
const breakpointDesktop = media.queries.desktop.min;

export const large = {
  fontFamily: font.family['campaign'],
  fontSize: font.size['9xl'],
  fontWeight: font.weight['extraBold'],
  fontStyle: 'italic',
  lineHeight: '1',

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${font.size['9xl']} + 3.33vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    fontSize: font.size['max'],
  },
};

export const medium = {
  fontFamily: font.family['campaign'],
  fontSize: font.size['7xl'],
  fontStyle: 'italic',
  fontWeight: font.weight['extraBold'],
  lineHeight: '1',

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${font.size['7xl']} + 1.33vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    fontSize: font.size['10xl'],
  },
};

export const small = {
  fontFamily: font.family['campaign'],
  fontSize: font.size['7xl'],
  fontStyle: 'italic',
  fontWeight: font.weight['extraBold'],
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

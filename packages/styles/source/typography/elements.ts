import { colors, font, media } from '../tokens';
import { create } from '../utilities';

const breakpointLarge = media.queries.large.min;
const breakpointDesktop = media.queries.desktop.min;

export const eyebrow = {
  fontWeight: 700,
  color: colors.black,
  fontSize: font.size.min,
  lineHeight: 1,
  textTransform: `uppercase`,
  letterSpacing: `.05em`,
};

export const labelMedium = {
  fontFamily: font.family['sans'],
  fontSize: font.size['sm'],
  lineHeight: `1.42em`,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${font.size['sm']} + 0.16vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    fontSize: font.size['base'],
    letterSpacing: '0.16em',
    lineHeight: `1.5em`,
  },
};

export const labelSmall = {
  fontFamily: font.family['sans'],
  fontSize: font.size['sm'],
  letterSpacing: '0.16em',
  lineHeight: `1.42em`,
};

export const interativeMedium = {
  fontFamily: font.family['sans'],
  fontSize: font.size['base'],
  lineHeight: `1.125em`,

  [`@media (${breakpointLarge})`]: {
    fontSize: `calc(${font.size['base']} + 0.16vw)`,
  },

  [`@media (${breakpointDesktop})`]: {
    fontSize: font.size['lg'],
    fontWeight: font.weight['bold'],
    letterSpacing: '-0.01em',
    lineHeight: `1.11em`,
  },
};

export const interativeSmall = {
  fontFamily: font.family['sans'],
  fontSize: font.size['base'],
  fontWeight: font.weight['bold'],
  letterSpacing: '-0.01em',
  lineHeight: `1.125.em`,
};

export const fonts = {
  eyebrow: create.jssObject({
    className: 'umd-eyebrow',
    ...eyebrow,
  }),

  labelMedium: create.jssObject({
    className: 'umd-label-sans-medium',
    ...labelMedium,
  }),

  labelSmall: create.jssObject({
    className: 'umd-label-sans-small',
    ...labelSmall,
  }),

  medium: create.jssObject({
    className: 'umd-interactive-sans-medium',
    ...interativeMedium,
  }),

  small: create.jssObject({
    className: 'umd-interactive-sans-small',
    ...interativeSmall,
  }),
};

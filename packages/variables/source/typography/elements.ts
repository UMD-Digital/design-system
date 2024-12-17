import { Colors, Font, Media } from '../tokens';

const breakpointLarge = Media.queries.large.min;
const breakpointDesktop = Media.queries.desktop.min;

export const eyebrow = {
  fontWeight: 700,
  color: Colors.black,
  fontSize: Font.size.min,
  lineHeight: 1,
  textTransform: `uppercase`,
  letterSpacing: `.05em`,
};

export const labelMedium = {
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

export const labelSmall = {
  fontFamily: Font.family['sans'],
  fontSize: Font.size['sm'],
  letterSpacing: '0.16em',
  lineHeight: `1.42em`,
};

export const interativeMedium = {
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

export const interativeSmall = {
  fontFamily: Font.family['sans'],
  fontSize: Font.size['base'],
  fontWeight: Font.weight['bold'],
  letterSpacing: '-0.01em',
  lineHeight: `1.125.em`,
};

export const fonts = {
  eyebrow: {
    class: 'umd-eyebrow',
    ...eyebrow,
  },

  labelMedium: {
    class: 'umd-label-sans-medium',
    ...labelMedium,
  },

  labelSmall: {
    class: 'umd-label-sans-small',
    ...labelSmall,
  },

  medium: {
    class: 'umd-interactive-sans-medium',
    ...interativeMedium,
  },

  small: {
    class: 'umd-interactive-sans-small',
    ...interativeSmall,
  },
};

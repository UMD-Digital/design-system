import { fontFamily, fontSize, fontWeight } from '../../tokens/fonts';
import { queries } from '../../tokens/breakpoints';

const breakpointMobile = queries.medium.max;
const breakpointDesktop = queries.desktop.max;

const campaign = {
  // Special Maximum
  '.umd-campaign-maximum': {
    fontFamily: fontFamily['campaign'],
    fontSize: '150px',
    fontStyle: 'italic',
    fontWeight: fontWeight['bold'],
    lineHeight: `0.9em`,

    [`@media (${breakpointDesktop})`]: {
      fontSize: `calc(${fontSize['9xl']} + 5.83vw)`,
    },

    [`@media (${breakpointMobile})`]: {
      // umd-campaign-large
      fontSize: fontSize['9xl'],
      lineHeight: `0.91em`,
    },
  },

  // Special Extra Large
  '.umd-campaign-extralarge': {
    fontFamily: fontFamily['campaign'],
    fontSize: fontSize['10xl'],
    fontStyle: 'italic',
    fontWeight: fontWeight['bold'],
    lineHeight: `0.91em`,

    [`@media (${breakpointDesktop})`]: {
      fontSize: `calc(${fontSize['5xl']} + 4vw)`,
    },

    [`@media (${breakpointMobile})`]: {
      // umd-campaign-small
      fontSize: fontSize['5xl'],
      lineHeight: `0.91em`,
    },
  },

  // Special Large
  '.umd-campaign-large': {
    fontFamily: fontFamily['campaign'],
    fontSize: fontSize['9xl'],
    fontStyle: 'italic',
    fontWeight: fontWeight['bold'],
    lineHeight: `0.91em`,

    [`@media (${breakpointDesktop})`]: {
      fontSize: `calc(${fontSize['5xl']} + 2.66vw)`,
    },

    [`@media (${breakpointMobile})`]: {
      // umd-campaign-small
      fontSize: fontSize['5xl'],
      lineHeight: `0.91em`,
    },
  },

  // Special Medium
  '.umd-campaign-medium': {
    fontFamily: fontFamily['campaign'],
    fontSize: fontSize['7xl'],
    fontStyle: 'italic',
    fontWeight: fontWeight['bold'],
    letterSpacing: '0.02em',
    lineHeight: `0.94em`,

    [`@media (${breakpointDesktop})`]: {
      fontSize: `calc(${fontSize['5xl']} + 1.33vw)`,
    },

    [`@media (${breakpointMobile})`]: {
      // umd-campaign-small
      fontSize: fontSize['5xl'],
      lineHeight: `0.91em`,
    },
  },

  // Special Small
  '.umd-campaign-small': {
    fontFamily: fontFamily['campaign'],
    fontSize: fontSize['5xl'],
    fontStyle: 'italic',
    fontWeight: fontWeight['bold'],
    letterSpacing: '0.02em',
    lineHeight: `0.91em`,

    [`@media (${breakpointDesktop})`]: {
      fontSize: `calc(${fontSize['4xl']} + 1.33vw)`,
    },

    [`@media (${breakpointMobile})`]: {
      // umd-campaign-extrasmall
      fontSize: fontSize['4xl'],
      lineHeight: `0.94em`,
    },
  },

  // Special ExtrasSmall
  '.umd-campaign-extrasmall': {
    fontFamily: fontFamily['campaign'],
    fontSize: fontSize['4xl'],
    fontStyle: 'italic',
    fontWeight: fontWeight['bold'],
    letterSpacing: '0.02em',
    lineHeight: `0.94em`,
  },
};

const serif = {
  '.umd-serif-maximum': {
    fontFamily: fontFamily['serif'],
    fontSize: fontSize['9xl'],
    fontWeight: fontWeight['normal'],
    lineHeight: `1.025em`,

    [`@media (${breakpointDesktop})`]: {
      fontSize: `calc(${fontSize['4xl']} + 4vw)`,
    },

    [`@media (${breakpointMobile})`]: {
      // umd-serif-larger
      fontSize: fontSize['4xl'],
      lineHeight: `1.18em`,
    },
  },

  '.umd-serif-extralarge': {
    fontFamily: fontFamily['serif'],
    fontSize: fontSize['6xl'],
    fontWeight: fontWeight['normal'],
    lineHeight: `1.07em`,

    [`@media (${breakpointDesktop})`]: {
      fontSize: `calc(${fontSize['4xl']} + 2vw)`,
    },

    [`@media (${breakpointMobile})`]: {
      // umd-serif-larger
      fontSize: fontSize['4xl'],
      lineHeight: `1.18em`,
    },
  },

  '.umd-serif-larger': {
    fontFamily: fontFamily['serif'],
    fontSize: fontSize['4xl'],
    fontWeight: fontWeight['normal'],
    lineHeight: `1.18em`,

    [`@media (${breakpointDesktop})`]: {
      fontSize: `calc(${fontSize['3xl']} + 0.66vw)`,
    },

    [`@media (${breakpointMobile})`]: {
      // umd-serif-large
      fontSize: fontSize['3xl'],
      lineHeight: `1em`,
    },
  },

  '.umd-serif-large': {
    fontFamily: fontFamily['serif'],
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight['normal'],
    lineHeight: `1em`,

    [`@media (${breakpointDesktop})`]: {
      fontSize: `calc(${fontSize['xl']} + 0.33vw)`,
    },

    [`@media (${breakpointMobile})`]: {
      // umd-serif-medium
      fontSize: fontSize['xl'],
      lineHeight: `1.5em`,
    },
  },

  '.umd-serif-medium': {
    fontFamily: fontFamily['serif'],
    fontSize: fontSize['xl'],
    fontWeight: fontWeight['medium'],
    lineHeight: `1.5em`,
  },
};

const sans = {
  '.umd-sans-maximum': {
    fontFamily: fontFamily['sans'],
    fontSize: fontSize['8xl'],
    fontWeight: fontWeight['bold'],
    lineHeight: `1.05em`,

    [`@media (${breakpointDesktop})`]: {
      fontSize: `calc(${fontSize['4xl']} + 3.33vw)`,
    },

    [`@media (${breakpointMobile})`]: {
      // umd-sans-extralarge
      fontSize: fontSize['4xl'],
      lineHeight: `1.125em`,
    },
  },

  '.umd-sans-largest': {
    fontFamily: fontFamily['sans'],
    fontSize: fontSize['5xl'],
    fontWeight: fontWeight['bold'],
    lineHeight: `1.04em`,

    [`@media (${breakpointDesktop})`]: {
      fontSize: `calc(${fontSize['3xl']} + 2vw)`,
    },

    [`@media (${breakpointMobile})`]: {
      // umd-sans-larger
      fontSize: fontSize['3xl'],
      lineHeight: `1.25em`,
    },
  },

  '.umd-sans-extralarge': {
    fontFamily: fontFamily['sans'],
    fontSize: fontSize['4xl'],
    fontWeight: fontWeight['bold'],
    lineHeight: `1.125em`,

    [`@media (${breakpointDesktop})`]: {
      fontSize: `calc(${fontSize['lg']} + 1.16vw)`,
    },

    [`@media (${breakpointMobile})`]: {
      // umd-sans-large
      fontSize: fontSize['lg'],
      lineHeight: `1.11em`,
    },
  },

  '.umd-sans-larger': {
    fontFamily: fontFamily['sans'],
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight['bold'],
    lineHeight: `1.25em`,

    [`@media (${breakpointDesktop})`]: {
      fontSize: `calc(${fontSize['lg']} + 0.5vw)`,
    },

    [`@media (${breakpointMobile})`]: {
      // umd-sans-large
      fontSize: fontSize['lg'],
      lineHeight: `1.11em`,
    },
  },

  '.umd-sans-large': {
    fontFamily: fontFamily['sans'],
    fontSize: fontSize['lg'],
    fontWeight: fontWeight['bold'],
    lineHeight: `1.11em`,
  },

  '.umd-sans-medium': {
    fontFamily: fontFamily['sans'],
    fontSize: fontSize['lg'],
    fontWeight: fontWeight['normal'],
    lineHeight: `1.55em`,

    [`@media (${breakpointDesktop})`]: {
      fontSize: `calc(${fontSize['base']} + 0.16vw)`,
    },

    [`@media (${breakpointMobile})`]: {
      // umd-sans-small
      fontSize: fontSize['base'],
      lineHeight: `1.25em`,
    },
  },

  '.umd-sans-small': {
    fontFamily: fontFamily['sans'],
    fontSize: fontSize['base'],
    fontWeight: fontWeight['normal'],
    lineHeight: `1.25em`,

    [`@media (${breakpointDesktop})`]: {
      fontSize: `calc(${fontSize['sm']} + 0.16vw)`,
    },

    [`@media (${breakpointMobile})`]: {
      // umd-sans-smaller
      fontSize: fontSize['sm'],
      lineHeight: `1.28em`,
    },
  },

  '.umd-sans-smaller': {
    fontFamily: fontFamily['sans'],
    fontSize: fontSize['sm'],
    fontWeight: fontWeight['normal'],
    lineHeight: `1.28em`,

    [`@media (${breakpointDesktop})`]: {
      fontSize: `calc(${fontSize['min']} + 0.16vw)`,
    },

    [`@media (${breakpointMobile})`]: {
      // umd-sans-min
      fontSize: fontSize['min'],
      lineHeight: `1.16em`,
    },
  },

  '.umd-sans-min': {
    fontFamily: fontFamily['sans'],
    fontSize: fontSize['min'],
    fontWeight: fontWeight['normal'],
    lineHeight: `1.16em`,
  },
};

const transforms = {
  '.umd-sans-largest-uppercase': {
    ...sans['.umd-sans-largest'],

    textTransform: 'uppercase',
  },

  '.umd-sans-extralarge-uppercase': {
    ...sans['.umd-sans-extralarge'],

    textTransform: 'uppercase',
  },

  '.umd-sans-larger-body': {
    ...sans['.umd-sans-larger'],

    fontWeight: fontWeight['normal'],
  },
};

const elements = {
  '.umd-eyebrow': {
    ...sans['.umd-sans-smaller'],

    fontWeight: fontWeight['bold'],
    textTransform: 'uppercase',
    lineHeight: `1.14em`,
  },

  // Label 1
  '.umd-label-sans-medium': {
    fontFamily: fontFamily['sans'],
    fontSize: fontSize['base'],
    fontWeight: fontWeight['normal'],
    letterSpacing: '0.16em',
    lineHeight: `1.5em`,

    [`@media (${breakpointDesktop})`]: {
      fontSize: `calc(${fontSize['sm']} + 0.16vw)`,
    },

    [`@media (${breakpointMobile})`]: {
      // umd-label-sans-small
      fontSize: fontSize['sm'],
      lineHeight: `1.42em`,
    },
  },

  // Label 2
  '.umd-label-sans-small': {
    fontFamily: fontFamily['sans'],
    fontSize: fontSize['sm'],
    fontWeight: fontWeight['normal'],
    letterSpacing: '0.16em',
    lineHeight: `1.42em`,
  },

  // Button 2
  '.umd-interactive-sans-medium': {
    fontFamily: fontFamily['sans'],
    fontSize: fontSize['lg'],
    fontWeight: fontWeight['bold'],
    letterSpacing: '-0.01em',
    lineHeight: `1.11em`,

    [`@media (${breakpointDesktop})`]: {
      fontSize: `calc(${fontSize['base']} + 0.16vw)`,
    },

    [`@media (${breakpointMobile})`]: {
      // umd-interactive-sans-small
      fontSize: fontSize['base'],
      lineHeight: `1.125em`,
    },
  },

  // Button 1
  '.umd-interactive-sans-small': {
    fontFamily: fontFamily['sans'],
    fontSize: fontSize['base'],
    fontWeight: fontWeight['bold'],
    letterSpacing: '-0.01em',
    lineHeight: `1.125.em`,
  },
};

const statistics = {
  // Stat1
  '.umd-statistic-sans-large': {
    fontFamily: fontFamily['campaign'],
    fontSize: fontSize['max'],
    fontStyle: 'italic',
    fontWeight: fontWeight['extraBold'],
    lineHeight: '0.83em',

    [`@media (${breakpointDesktop})`]: {
      fontSize: `calc(${fontSize['9xl']} + 3.33vw)`,
    },

    // Stat2
    [`@media (${breakpointMobile})`]: {
      fontSize: fontSize['9xl'],
    },
  },

  // Stat2
  '.umd-statistic-sans-medium': {
    fontFamily: fontFamily['campaign'],
    fontSize: fontSize['9xl'],
    fontStyle: 'italic',
    fontWeight: fontWeight['extraBold'],
    lineHeight: '1.11em',

    [`@media (${breakpointDesktop})`]: {
      fontSize: `calc(${fontSize['7xl']} + 1.33vw)`,
    },

    // Stats3
    [`@media (${breakpointMobile})`]: {
      fontSize: fontSize['7xl'],
    },
  },

  // Stats3
  '.umd-statistic-sans-small': {
    fontFamily: fontFamily['campaign'],
    fontSize: fontSize['7xl'],
    fontStyle: 'italic',
    fontWeight: fontWeight['extraBold'],
    lineHeight: '0.87em',
  },
};

const typography = Object.assign(campaign, serif, sans, elements, statistics);

export { typography };

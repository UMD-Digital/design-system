import { FontFamily, FontSize, FontWeight } from '../tokens/fonts';
import { Queries } from '../tokens/breakpoints';

const breakpointMobile = Queries.medium.max;
const breakpointDesktop = Queries.desktop.max;

const campaign = {
  // Special Maximum
  '.umd-campaign-maximum': {
    fontFamily: FontFamily['campaign'],
    fontSize: '150px',
    fontStyle: 'italic',
    fontWeight: FontWeight['bold'],
    lineHeight: `0.9em`,

    [`@media (${breakpointDesktop})`]: {
      fontSize: `calc(${FontSize['9xl']} + 5.83vw)`,
    },

    [`@media (${breakpointMobile})`]: {
      // umd-campaign-large
      fontSize: FontSize['9xl'],
      lineHeight: `0.91em`,
    },
  },

  // Special Extra Large
  '.umd-campaign-extralarge': {
    fontFamily: FontFamily['campaign'],
    fontSize: FontSize['10xl'],
    fontStyle: 'italic',
    fontWeight: FontWeight['bold'],
    lineHeight: `0.91em`,

    [`@media (${breakpointDesktop})`]: {
      fontSize: `calc(${FontSize['5xl']} + 4vw)`,
    },

    [`@media (${breakpointMobile})`]: {
      // umd-campaign-small
      fontSize: FontSize['5xl'],
      lineHeight: `0.91em`,
    },
  },

  // Special Large
  '.umd-campaign-large': {
    fontFamily: FontFamily['campaign'],
    fontSize: FontSize['9xl'],
    fontStyle: 'italic',
    fontWeight: FontWeight['bold'],
    lineHeight: `0.91em`,

    [`@media (${breakpointDesktop})`]: {
      fontSize: `calc(${FontSize['5xl']} + 2.66vw)`,
    },

    [`@media (${breakpointMobile})`]: {
      // umd-campaign-small
      fontSize: FontSize['5xl'],
      lineHeight: `0.91em`,
    },
  },

  // Special Medium
  '.umd-campaign-medium': {
    fontFamily: FontFamily['campaign'],
    fontSize: FontSize['7xl'],
    fontStyle: 'italic',
    fontWeight: FontWeight['bold'],
    letterSpacing: '0.02em',
    lineHeight: `0.94em`,

    [`@media (${breakpointDesktop})`]: {
      fontSize: `calc(${FontSize['5xl']} + 1.33vw)`,
    },

    [`@media (${breakpointMobile})`]: {
      // umd-campaign-small
      fontSize: FontSize['5xl'],
      lineHeight: `0.91em`,
    },
  },

  // Special Small
  '.umd-campaign-small': {
    fontFamily: FontFamily['campaign'],
    fontSize: FontSize['5xl'],
    fontStyle: 'italic',
    fontWeight: FontWeight['bold'],
    letterSpacing: '0.02em',
    lineHeight: `0.91em`,

    [`@media (${breakpointDesktop})`]: {
      fontSize: `calc(${FontSize['4xl']} + 1.33vw)`,
    },

    [`@media (${breakpointMobile})`]: {
      // umd-campaign-extrasmall
      fontSize: FontSize['4xl'],
      lineHeight: `0.94em`,
    },
  },

  // Special ExtrasSmall
  '.umd-campaign-extrasmall': {
    fontFamily: FontFamily['campaign'],
    fontSize: FontSize['4xl'],
    fontStyle: 'italic',
    fontWeight: FontWeight['bold'],
    letterSpacing: '0.02em',
    lineHeight: `0.94em`,
  },
};

const serif = {
  '.umd-serif-maximum': {
    fontFamily: FontFamily['serif'],
    fontSize: FontSize['9xl'],
    fontWeight: FontWeight['normal'],
    lineHeight: `1.025em`,

    [`@media (${breakpointDesktop})`]: {
      fontSize: `calc(${FontSize['4xl']} + 4vw)`,
    },

    [`@media (${breakpointMobile})`]: {
      // umd-serif-larger
      fontSize: FontSize['4xl'],
      lineHeight: `1.18em`,
    },
  },

  '.umd-serif-extralarge': {
    fontFamily: FontFamily['serif'],
    fontSize: FontSize['6xl'],
    fontWeight: FontWeight['normal'],
    lineHeight: `1.07em`,

    [`@media (${breakpointDesktop})`]: {
      fontSize: `calc(${FontSize['4xl']} + 2vw)`,
    },

    [`@media (${breakpointMobile})`]: {
      // umd-serif-larger
      fontSize: FontSize['4xl'],
      lineHeight: `1.18em`,
    },
  },

  '.umd-serif-larger': {
    fontFamily: FontFamily['serif'],
    fontSize: FontSize['4xl'],
    fontWeight: FontWeight['normal'],
    lineHeight: `1.18em`,

    [`@media (${breakpointDesktop})`]: {
      fontSize: `calc(${FontSize['3xl']} + 0.66vw)`,
    },

    [`@media (${breakpointMobile})`]: {
      // umd-serif-large
      fontSize: FontSize['3xl'],
      lineHeight: `1em`,
    },
  },

  '.umd-serif-large': {
    fontFamily: FontFamily['serif'],
    fontSize: FontSize['3xl'],
    fontWeight: FontWeight['normal'],
    lineHeight: `1em`,

    [`@media (${breakpointDesktop})`]: {
      fontSize: `calc(${FontSize['xl']} + 0.33vw)`,
    },

    [`@media (${breakpointMobile})`]: {
      // umd-serif-medium
      fontSize: FontSize['xl'],
      lineHeight: `1.5em`,
    },
  },

  '.umd-serif-medium': {
    fontFamily: FontFamily['serif'],
    fontSize: FontSize['xl'],
    fontWeight: FontWeight['medium'],
    lineHeight: `1.5em`,
  },
};

const sans = {
  '.umd-sans-maximum': {
    fontFamily: FontFamily['sans'],
    fontSize: FontSize['8xl'],
    fontWeight: FontWeight['bold'],
    lineHeight: `1.05em`,

    [`@media (${breakpointDesktop})`]: {
      fontSize: `calc(${FontSize['4xl']} + 3.33vw)`,
    },

    [`@media (${breakpointMobile})`]: {
      // umd-sans-extralarge
      fontSize: FontSize['4xl'],
      lineHeight: `1.125em`,
    },
  },

  '.umd-sans-largest': {
    fontFamily: FontFamily['sans'],
    fontSize: FontSize['5xl'],
    fontWeight: FontWeight['bold'],
    lineHeight: `1.04em`,

    [`@media (${breakpointDesktop})`]: {
      fontSize: `calc(${FontSize['3xl']} + 2vw)`,
    },

    [`@media (${breakpointMobile})`]: {
      // umd-sans-larger
      fontSize: FontSize['3xl'],
      lineHeight: `1.25em`,
    },
  },

  '.umd-sans-extralarge': {
    fontFamily: FontFamily['sans'],
    fontSize: FontSize['4xl'],
    fontWeight: FontWeight['bold'],
    lineHeight: `1.125em`,

    [`@media (${breakpointDesktop})`]: {
      fontSize: `calc(${FontSize['lg']} + 1.16vw)`,
    },

    [`@media (${breakpointMobile})`]: {
      // umd-sans-large
      fontSize: FontSize['lg'],
      lineHeight: `1.11em`,
    },
  },

  '.umd-sans-larger': {
    fontFamily: FontFamily['sans'],
    fontSize: FontSize['3xl'],
    fontWeight: FontWeight['bold'],
    lineHeight: `1.25em`,

    [`@media (${breakpointDesktop})`]: {
      fontSize: `calc(${FontSize['lg']} + 0.5vw)`,
    },

    [`@media (${breakpointMobile})`]: {
      // umd-sans-large
      fontSize: FontSize['lg'],
      lineHeight: `1.11em`,
    },
  },

  '.umd-sans-large': {
    fontFamily: FontFamily['sans'],
    fontSize: FontSize['lg'],
    fontWeight: FontWeight['bold'],
    lineHeight: `1.11em`,
  },

  '.umd-sans-medium': {
    fontFamily: FontFamily['sans'],
    fontSize: FontSize['lg'],
    fontWeight: FontWeight['normal'],
    lineHeight: `1.55em`,

    [`@media (${breakpointDesktop})`]: {
      fontSize: `calc(${FontSize['base']} + 0.16vw)`,
    },

    [`@media (${breakpointMobile})`]: {
      // umd-sans-small
      fontSize: FontSize['base'],
      lineHeight: `1.25em`,
    },
  },

  '.umd-sans-small': {
    fontFamily: FontFamily['sans'],
    fontSize: FontSize['base'],
    fontWeight: FontWeight['normal'],
    lineHeight: `1.25em`,

    [`@media (${breakpointDesktop})`]: {
      fontSize: `calc(${FontSize['sm']} + 0.16vw)`,
    },

    [`@media (${breakpointMobile})`]: {
      // umd-sans-smaller
      fontSize: FontSize['sm'],
      lineHeight: `1.28em`,
    },
  },

  '.umd-sans-smaller': {
    fontFamily: FontFamily['sans'],
    fontSize: FontSize['sm'],
    fontWeight: FontWeight['normal'],
    lineHeight: `1.28em`,

    [`@media (${breakpointDesktop})`]: {
      fontSize: `calc(${FontSize['min']} + 0.16vw)`,
    },

    [`@media (${breakpointMobile})`]: {
      // umd-sans-min
      fontSize: FontSize['min'],
      lineHeight: `1.16em`,
    },
  },

  '.umd-sans-min': {
    fontFamily: FontFamily['sans'],
    fontSize: FontSize['min'],
    fontWeight: FontWeight['normal'],
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

    fontWeight: FontWeight['normal'],
  },
};

const elements = {
  '.umd-eyebrow': {
    ...sans['.umd-sans-smaller'],

    fontWeight: FontWeight['bold'],
    textTransform: 'uppercase',
    lineHeight: `1.14em`,
  },

  // Label 1
  '.umd-label-sans-medium': {
    fontFamily: FontFamily['sans'],
    fontSize: FontSize['base'],
    fontWeight: FontWeight['normal'],
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
  },

  // Label 2
  '.umd-label-sans-small': {
    fontFamily: FontFamily['sans'],
    fontSize: FontSize['sm'],
    fontWeight: FontWeight['normal'],
    letterSpacing: '0.16em',
    lineHeight: `1.42em`,
  },

  // Button 2
  '.umd-interactive-sans-medium': {
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
  },

  // Button 1
  '.umd-interactive-sans-small': {
    fontFamily: FontFamily['sans'],
    fontSize: FontSize['base'],
    fontWeight: FontWeight['bold'],
    letterSpacing: '-0.01em',
    lineHeight: `1.125.em`,
  },
};

const statistics = {
  // Stat1
  '.umd-statistic-sans-large': {
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
  },

  // Stat2
  '.umd-statistic-sans-medium': {
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
  },

  // Stats3
  '.umd-statistic-sans-small': {
    fontFamily: FontFamily['campaign'],
    fontSize: FontSize['7xl'],
    fontStyle: 'italic',
    fontWeight: FontWeight['extraBold'],
    lineHeight: '0.87em',
  },
};

export default { ...campaign, ...serif, ...sans, ...elements, ...statistics };

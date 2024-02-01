import { fontFamily, fontSize, fontWeight } from '../../tokens/fonts';
import { breakpoints, queries } from '../../tokens/breakpoints';

const getScaledFont = (ceilFont: string, baseFont: string) => {
  const baseBreak = breakpoints['medium']['max'];
  const ceilBreak = breakpoints['desktop']['max'];
  const baseFontInt = parseInt(baseFont);
  const cielFontInt = parseInt(ceilFont);
  const rise = cielFontInt - baseFontInt;
  const run = parseInt(ceilBreak) - parseInt(baseBreak);
  const slope = rise / run;

  // fontSize = ((currentScreenWidth - MIN_SCREEN_WIDTH) x (MAX_FONT_SIZE - MIN_FONT_SIZE / MAX_SCREEN_WIDTH - MIN_SCREEN_WIDTH)) + MIN_FONT_SIZE
  return `calc(((100vw - ${baseBreak}) * ${slope}) + ${baseFont})`;
};

const serif = {
  '.umd-serif-max': {
    fontFamily: fontFamily['serif'],
    fontSize: fontSize['max'],
    fontWeight: fontWeight['normal'],
    lineHeight: `${82 / parseInt(fontSize['max'])}em`,

    [`@media (${queries.desktop.max})`]: {
      // Scaling
      fontSize: getScaledFont(fontSize['max'], fontSize['4xl']),
    },

    [`@media (${queries.medium.max})`]: {
      // umd-serif-larger
      fontSize: fontSize['4xl'],
      lineHeight: `${38 / parseInt(fontSize['4xl'])}em`,
    },
  },

  '.umd-serif-extralarge': {
    fontFamily: fontFamily['serif'],
    fontSize: fontSize['6xl'],
    fontWeight: fontWeight['normal'],
    lineHeight: `${60 / parseInt(fontSize['6xl'])}em`,

    [`@media (${queries.desktop.max})`]: {
      // Scaling
      fontSize: getScaledFont(fontSize['6xl'], fontSize['4xl']),
    },

    [`@media (${queries.medium.max})`]: {
      // umd-serif-larger
      fontSize: fontSize['4xl'],
      lineHeight: `${38 / parseInt(fontSize['4xl'])}em`,
    },
  },

  '.umd-serif-larger': {
    fontFamily: fontFamily['serif'],
    fontSize: fontSize['4xl'],
    fontWeight: fontWeight['normal'],
    lineHeight: `${38 / parseInt(fontSize['4xl'])}em`,

    [`@media (${queries.desktop.max})`]: {
      // Scaling
      fontSize: getScaledFont(fontSize['4xl'], fontSize['3xl']),
    },

    [`@media (${queries.medium.max})`]: {
      // umd-serif-large
      fontSize: fontSize['3xl'],
      lineHeight: `${30 / parseInt(fontSize['3xl'])}em`,
    },
  },

  '.umd-serif-large': {
    fontFamily: fontFamily['serif'],
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight['normal'],
    lineHeight: `${30 / parseInt(fontSize['3xl'])}em`,

    [`@media (${queries.desktop.max})`]: {
      // Scaling
      fontSize: getScaledFont(fontSize['3xl'], fontSize['xl']),
    },

    [`@media (${queries.medium.max})`]: {
      // umd-serif-medium
      fontSize: fontSize['xl'],
      lineHeight: `${26 / parseInt(fontSize['xl'])}em`,
    },
  },

  '.umd-serif-medium': {
    fontFamily: fontFamily['serif'],
    fontSize: fontSize['xl'],
    fontWeight: fontWeight['medium'],
    lineHeight: `${26 / parseInt(fontSize['xl'])}em`,
  },
};

const sans = {
  '.umd-sans-maximum': {
    fontFamily: fontFamily['sans'],
    fontSize: fontSize['7xl'],
    fontWeight: fontWeight['extraBold'],
    lineHeight: `${76 / parseInt(fontSize['7xl'])}em`,

    [`@media (${queries.desktop.max})`]: {
      // Scaling
      fontSize: getScaledFont(fontSize['7xl'], fontSize['4xl']),
    },

    // [`@media (${queries.tablet.max})`]: {
    //   fontSize: getScaledFont(fontSize['5xl'], fontSize['4xl']),
    // },

    [`@media (${queries.medium.max})`]: {
      // umd-sans-extralarge
      fontSize: fontSize['4xl'],
      lineHeight: `${38 / parseInt(fontSize['4xl'])}em`,
    },
  },

  '.umd-sans-largest': {
    fontFamily: fontFamily['sans'],
    fontSize: fontSize['5xl'],
    fontWeight: fontWeight['extraBold'],
    lineHeight: `${56 / parseInt(fontSize['5xl'])}em`,

    [`@media (${queries.desktop.max})`]: {
      // Scaling
      fontSize: getScaledFont(fontSize['5xl'], fontSize['3xl']),
    },

    // [`@media (${queries.tablet.max})`]: {
    //   fontSize: getScaledFont(fontSize['4xl'], fontSize['3xl']),
    // },

    [`@media (${queries.medium.max})`]: {
      // umd-sans-larger
      fontSize: fontSize['3xl'],
      lineHeight: `${30 / parseInt(fontSize['3xl'])}em`,
    },
  },

  '.umd-sans-extralarge': {
    fontFamily: fontFamily['sans'],
    fontSize: fontSize['4xl'],
    fontWeight: fontWeight['extraBold'],
    lineHeight: `${38 / parseInt(fontSize['4xl'])}em`,

    [`@media (${queries.desktop.max})`]: {
      // Scaling
      fontSize: getScaledFont(fontSize['4xl'], fontSize['lg']),
    },

    [`@media (${queries.medium.max})`]: {
      // umd-sans-large
      fontSize: fontSize['lg'],
      lineHeight: `${24 / parseInt(fontSize['lg'])}em`,
    },
  },

  '.umd-sans-larger': {
    fontFamily: fontFamily['sans'],
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight['extraBold'],
    lineHeight: `${30 / parseInt(fontSize['3xl'])}em`,

    [`@media (${queries.desktop.max})`]: {
      // Scaling
      fontSize: getScaledFont(fontSize['3xl'], fontSize['lg']),
    },

    [`@media (${queries.medium.max})`]: {
      // umd-sans-large
      fontSize: fontSize['lg'],
      lineHeight: `${24 / parseInt(fontSize['lg'])}em`,
    },
  },

  '.umd-sans-large': {
    fontFamily: fontFamily['sans'],
    fontSize: fontSize['lg'],
    fontWeight: fontWeight['extraBold'],
    lineHeight: `${24 / parseInt(fontSize['lg'])}em`,
  },

  '.umd-sans-medium': {
    fontFamily: fontFamily['sans'],
    fontSize: fontSize['lg'],
    fontWeight: fontWeight['medium'],
    lineHeight: `${30 / parseInt(fontSize['lg'])}em`,

    [`@media (${queries.desktop.max})`]: {
      // Scaling
      fontSize: getScaledFont(fontSize['lg'], fontSize['base']),
    },

    [`@media (${queries.medium.max})`]: {
      // umd-sans-small
      fontSize: fontSize['base'],
      lineHeight: `${24 / parseInt(fontSize['base'])}em`,
    },
  },

  '.umd-sans-small': {
    fontFamily: fontFamily['sans'],
    fontSize: fontSize['base'],
    fontWeight: fontWeight['medium'],
    lineHeight: `${24 / parseInt(fontSize['base'])}em`,

    [`@media (${queries.desktop.max})`]: {
      // Scaling
      fontSize: getScaledFont(fontSize['base'], fontSize['sm']),
    },

    [`@media (${queries.medium.max})`]: {
      // umd-sans-smaller
      fontSize: fontSize['sm'],
      lineHeight: `${18 / parseInt(fontSize['sm'])}em`,
    },
  },

  '.umd-sans-smaller': {
    fontFamily: fontFamily['sans'],
    fontSize: fontSize['sm'],
    fontWeight: fontWeight['medium'],
    lineHeight: `${18 / parseInt(fontSize['sm'])}em`,
  },

  '.umd-sans-min': {
    fontFamily: fontFamily['sans'],
    fontSize: fontSize['min'],
    fontWeight: fontWeight['semiBold'],
    lineHeight: `${16 / parseInt(fontSize['min'])}em`,
  },
};

const elements = {
  '.umd-eyebrow': {
    ...sans['.umd-sans-smaller'],
  },

  // Label 1
  '.umd-label-sans-medium': {
    fontFamily: fontFamily['sans'],
    fontSize: fontSize['base'],
    fontWeight: fontWeight['medium'],
    letterSpacing: '0.16em',
    lineHeight: `${24 / parseInt(fontSize['base'])}em`,
  },

  // Label 2
  '.umd-label-sans-small': {
    fontFamily: fontFamily['sans'],
    fontSize: fontSize['sm'],
    fontWeight: fontWeight['medium'],
    letterSpacing: '0.16em',
    lineHeight: `${20 / parseInt(fontSize['sm'])}em`,
  },

  // Button 2
  '.umd-interactive-sans-medium': {
    fontFamily: fontFamily['sans'],
    fontSize: fontSize['base'],
    fontWeight: fontWeight['extraBold'],
    lineHeight: `${20 / parseInt(fontSize['base'])}em`,
  },

  // Button 1
  '.umd-interactive-sans-small': {
    fontFamily: fontFamily['sans'],
    fontSize: fontSize['sm'],
    fontWeight: fontWeight['extraBold'],
    lineHeight: `${18 / parseInt(fontSize['sm'])}em`,
  },
};

const statsSmall = {
  // Stats3
  '.umd-statistic-sans-small': {
    fontFamily: fontFamily['sans'],
    fontSize: fontSize['5xl'],
    fontWeight: fontWeight['extraBold'],
    lineHeight: '1em',
  },
};

const statistics = {
  // Stat1
  '.umd-statistic-sans-large': {
    ...statsSmall['.umd-statistic-sans-small'],

    fontSize: '100px',

    [`@media (${queries.desktop.max})`]: {
      // Scaling
      fontSize: getScaledFont('100px', fontSize['6xl']),
    },

    // Stats3
    [`@media (${queries.medium.max})`]: {
      fontSize: fontSize['6xl'],
    },
  },

  // Stat2
  '.umd-statistic-sans-medium': {
    ...statsSmall['.umd-statistic-sans-small'],

    fontSize: fontSize['max'],

    [`@media (${queries.desktop.max})`]: {
      // Scaling
      fontSize: getScaledFont(fontSize['max'], fontSize['6xl']),
    },

    // Stats3
    [`@media (${queries.medium.max})`]: {
      fontSize: fontSize['6xl'],
    },
  },
};

const typography = Object.assign(serif, sans, elements, statistics);

export { typography };

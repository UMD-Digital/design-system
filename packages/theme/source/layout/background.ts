import { Tokens } from '@universityofmaryland/variables';

const { Spacing, Queries, Colors } = Tokens;

const BackgroundPadding = {
  padding: `${Spacing['2xl']} 0`,

  [`@media (${Queries.tablet.min})`]: {
    padding: `${Spacing['6xl']} 0`,
  },

  [`@media (${Queries.highDef})`]: {
    padding: `${Spacing['8xl']} 0`,
  },
};

const BackgroundQuater = {
  position: 'relative',
  ...BackgroundPadding,

  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    zIndex: -1,
    backgroundColor: `${Colors.gray.lightest}`,

    [`@media (${Queries.tablet.max})`]: {
      display: 'none',
    },

    [`@media (${Queries.desktop.min})`]: {
      width: `calc(75% + 80px)`,
    },
  },
};

const BackgroundBox = {
  padding: `${Spacing.md}`,
  backgroundColor: `${Colors.gray.lightest}`,
  borderLeft: `2px solid ${Colors.red}`,

  [`@media (${Queries.tablet.min})`]: {
    padding: `${Spacing.lg}`,
  },

  [`@media (${Queries.desktop.min})`]: {
    padding: `${Spacing['3xl']}`,
  },
};

const BackgroundBoxDark = {
  backgroundColor: `${Colors.gray.darker}`,
};

export default {
  '.umd-layout-background-color': {
    ...BackgroundPadding,
    backgroundColor: `${Colors.gray.lightest}`,
  },
  '.umd-layout-background-color-dark': {
    ...BackgroundPadding,
    backgroundColor: `${Colors.black}`,
  },
  '.umd-layout-background-quater-color': {
    ...BackgroundQuater,
  },
  '.umd-layout-background-box': {
    ...BackgroundBox,
  },
  '.umd-layout-background-box[theme="dark"]': {
    ...BackgroundBoxDark,
  },
};

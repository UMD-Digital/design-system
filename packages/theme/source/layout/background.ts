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
    backgroundColor: `${Colors.gray.lighter}`,

    [`@media (${Queries.tablet.max})`]: {
      display: 'none',
    },

    [`@media (${Queries.desktop.min})`]: {
      width: `calc(75% + 80px)`,
    },
  },
};

const BackgroundQuaterDark = {
  ...BackgroundQuater,

  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    zIndex: -1,
    backgroundColor: `${Colors.black}`,

    [`@media (${Queries.tablet.max})`]: {
      display: 'none',
    },

    [`@media (${Queries.desktop.min})`]: {
      width: `calc(75% + 80px)`,
    },
  },
};

export default {
  '.umd-layout-background-color': {
    ...BackgroundPadding,
    backgroundColor: `${Colors.gray.lighter}`,
  },
  '.umd-layout-background-color-dark': {
    ...BackgroundPadding,
    backgroundColor: `${Colors.black}`,
  },
  '.umd-layout-background-quater-color': {
    ...BackgroundQuater,
  },
  '.umd-layout-background-quater-color-dark': {
    ...BackgroundQuaterDark,
  },
};

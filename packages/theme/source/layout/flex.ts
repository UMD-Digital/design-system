import { Tokens, Layout } from '@universityofmaryland/variables';

// Deprecated - Do Not Use

const { Queries, Spacing } = Tokens;
const { GridColumnAndRows } = Layout;

const roundToThree = (number: number): number =>
  Math.round(number * 1000) / 1000;

const FlexBase = {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  gap: Spacing.md,

  [`@media (${Queries.large.min})`]: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.lg,
  },
};

const FlexRowBase = {
  ...GridColumnAndRows['.mobile-tablet'],
};

export const FlexColumnsRows = {
  '.umd-layout-flex-row-auto': {
    ...FlexRowBase,
  },

  '.umd-layout-flex-row-center': {
    ...FlexRowBase,

    alignItems: 'center',
    justifyContent: 'center',

    [`@media (${Queries.large.min})`]: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  },
};

export const FlexColumnsCore = {
  '.umd-flex': {
    ...FlexBase,
    ...{
      [`@media (${Queries.desktop.min})`]: {
        gap: Spacing['4xl'],
      },
    },
  },

  '.umd-flex-three': {
    ...FlexBase,
  },

  '.umd-flex-four': {
    ...FlexBase,
  },
};

export const FlexColumnsContent = {
  '.umd-flex > *': {
    width: '100%',

    [`@media (${Queries.large.min})`]: {
      width: `calc(50% - ${roundToThree(parseInt(Spacing.lg) / 2)}px)`,
    },

    [`@media (${Queries.desktop.min})`]: {
      width: `calc(50% - ${roundToThree(parseInt(Spacing['4xl']) / 2)}px)`,
    },
  },

  '.umd-flex-three > *': {
    width: '100%',

    [`@media (${Queries.large.min})`]: {
      width: `calc(50% - ${roundToThree(parseInt(Spacing['lg']) / 2)}px)`,
    },

    [`@media (${Queries.desktop.min})`]: {
      width: `calc(33.333% - ${roundToThree(
        (parseInt(Spacing['lg']) * 2) / 3,
      )}px)`,
    },
  },

  '.umd-flex-four > *': {
    width: '100%',

    [`@media (${Queries.large.min})`]: {
      width: `calc(50% - ${roundToThree(parseInt(Spacing['lg']) / 2)}px)`,
    },

    [`@media (${Queries.desktop.min})`]: {
      width: `calc(25% - ${roundToThree((parseInt(Spacing['lg']) * 3) / 4)}px)`,
    },
  },
};

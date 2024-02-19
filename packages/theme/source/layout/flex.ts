import { Layout, Tokens } from '@universityofmaryland/variables';

const {
  FlexBase,
  FlexRows: Rows,
  FlexChildrenTwo,
  FlexChildrenThree,
  FlexChildrenFour,
} = Layout;
const { Queries, Spacing } = Tokens;

export const FlexColumnsRows = {
  '.umd-layout-flex-row-auto': {
    ...Rows['.auto'],
  },

  '.umd-layout-flex-row-center': {
    ...Rows['.center'],
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
    ...FlexChildrenTwo,
  },

  '.umd-flex-three > *': {
    ...FlexChildrenThree,
  },

  '.umd-flex-four > *': {
    ...FlexChildrenFour,
  },
};

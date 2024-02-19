import { Layout, Tokens } from '@universityofmaryland/variables';

const { FlexBase, FlexRows: Rows, FlexRowsChildrenBase: RowsChildren } = Layout;
const { Queries, Spacing } = Tokens;

export const FlexRows = {
  '.umd-layout-flex-row-auto': {
    ...Rows['.auto'],
  },

  '.umd-layout-flex-row-center': {
    ...Rows['.center'],
  },
};

export const FlexGridCore = {
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

export const FlexGridContent = {
  '.umd-flex > *': {
    ...RowsChildren.Two,
  },

  '.umd-flex-three > *': {
    ...RowsChildren.Three,
  },

  '.umd-flex-four > *': {
    ...RowsChildren.Four,
  },
};

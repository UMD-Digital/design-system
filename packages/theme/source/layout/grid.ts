import { Layout, Tokens } from '@universityofmaryland/variables';

// Deprecated - Do Not Use

const { GridRows, GridRowsWithGap, GridColumnsWithGap } = Layout;
const { Queries, Spacing } = Tokens;

export const GridColumnsStandard = {
  '.umd-grid': {
    ...GridRowsWithGap['.base'],
  },

  '.umd-grid-three': {
    ...GridRowsWithGap['.base-three'],
  },

  '.umd-grid-four': {
    ...GridRowsWithGap['.base-four'],
  },
};

export const GridColumnsGutterless = {
  '.umd-grid-gutterless-two': {
    ...GridRows,

    gridGap: Spacing.min,

    [`@media (${Queries.large.min})`]: {
      gridGap: `0px`,
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },

  '.umd-grid-gutterless-three': {
    ...GridRows,

    gridGap: Spacing.min,

    [`@media (${Queries.large.min})`]: {
      gridGap: `0px`,
      gridTemplateColumns: 'repeat(2, 1fr)',
    },

    [`@media (${Queries.desktop.min})`]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },

  '.umd-grid-gutterless-four': {
    ...GridRows,

    gridGap: Spacing.min,

    [`@media (${Queries.large.min})`]: {
      gridGap: `0px`,
      gridTemplateColumns: 'repeat(2, 1fr)',
    },

    [`@media (${Queries.desktop.min})`]: {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
  },
};

export const GridColumnsFeatured = {
  '.umd-grid-featured-card': {
    ...GridRowsWithGap,

    [`@media (${Queries.medium.min})`]: {
      gridGap: `${Spacing.md}`,
      gridTemplateColumns: 'repeat(2, 1fr)',

      '& > *:first-child': {
        gridColumnStart: '1',
        gridColumnEnd: 'span 2',
      },
    },

    [`@media (${Queries.desktop.min})`]: {
      gridGap: `${Spacing.lg}`,
      gridTemplateColumns: `[start-feature] calc(50% - ${Spacing.md}) [end-feature start-cards] repeat(2, 1fr) [end-cards]`,

      [`& > umd-element-card-overlay:first-child,
        & > umd-element-card:first-child`]: {
        gridColumnStart: '1',
        gridColumnEnd: '1',
      },
    },
  },
};

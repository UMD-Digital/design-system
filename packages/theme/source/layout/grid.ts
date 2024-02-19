import { Layout, Tokens } from '@universityofmaryland/variables';

const { Grid, GridBase } = Layout;
const { Queries, Spacing } = Tokens;

export const GridColumnsStandard = {
  '.umd-grid': {
    ...Grid['.base'],
  },

  '.umd-grid-three': {
    ...Grid['.base-three'],
  },

  '.umd-grid-four': {
    ...Grid['.base-four'],
  },
};

export const GridColumnsGutterless = {
  '.umd-grid-gutterless-two': {
    ...GridBase,

    gridGap: Spacing.min,

    [`@media (${Queries.large.min})`]: {
      gridGap: `0px`,
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },

  '.umd-grid-gutterless-three': {
    ...GridBase,

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
    ...GridBase,

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
    ...GridBase,

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

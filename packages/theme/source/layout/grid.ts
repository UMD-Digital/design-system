import { Layout, Tokens } from '@universityofmaryland/variables';

const { GridColumnsWithGap, GridColumnAndRows } = Layout;
const { Queries, Spacing } = Tokens;

export const GridColumnsStandard = {
  '.umd-grid': {
    ...GridColumnsWithGap['.base'],
  },

  '.umd-grid-three': {
    ...GridColumnsWithGap['.base-three'],
  },

  '.umd-grid-four': {
    ...GridColumnsWithGap['.base-four'],
  },
};

const GridColumnsFeatured = {
  ...GridColumnsWithGap,

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
};

export default {
  ...GridColumnsStandard,

  '.umd-grid-featured-card': {
    ...GridColumnsFeatured,
  },
  '.umd-grid-row-mobile-tablet': {
    ...GridColumnAndRows['.mobile-tablet'],
  },
};

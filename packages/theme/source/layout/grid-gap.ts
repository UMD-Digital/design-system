import { Layout, Tokens } from '@universityofmaryland/variables';

const { GridColumnsWithGap, GridColumnAndRows } = Layout;
const { Queries, Spacing } = Tokens;

export const GridColumnsStandard = {
  '.umd-grid-gap': {
    ...GridColumnsWithGap['.base'],
  },

  '.umd-grid-gap-three': {
    ...GridColumnsWithGap['.base-three'],
  },

  '.umd-grid-gap-four': {
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
    gridGap: `${Spacing.xl}`,
    gridTemplateColumns: `[start-feature] calc(50% - ${Spacing.md}) [end-feature start-cards] repeat(2, 1fr) [end-cards]`,

    [`& > umd-element-card-overlay:first-child,
        & > umd-element-card:first-child`]: {
      gridColumnStart: '1',
      gridColumnEnd: '1',
    },
  },
};

const MasonryGrid = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridGap: `${Spacing.md}`,

  [`@media (${Queries.tablet.min})`]: {
    gridTemplateColumns: '1fr 1fr',
    gridGap: Spacing.lg,
  },

  [`@media (${Queries.desktop.min})`]: {
    gridGap: Spacing.xl,
  },

  '& > *': {
    '& > *': {
      width: '100%',
      height: '100%',
    },
  },

  '& > *:nth-of-type(odd)': {
    [`@media (${Queries.tablet.min})`]: {
      marginTop: `-${Spacing.lg}`,
    },

    [`@media (${Queries.desktop.min})`]: {
      marginTop: `-${Spacing.xl}`,
    },

    '& > *': {
      [`@media (${Queries.tablet.min})`]: {
        height: `calc(100% - ${Spacing.lg})`,
      },

      [`@media (${Queries.desktop.min})`]: {
        height: `calc(100% - ${Spacing.xl})`,
      },
    },
  },

  '& > *:nth-of-type(even)': {
    [`@media (${Queries.tablet.min})`]: {
      marginTop: '0',
    },
  },

  '& > *:first-child': {
    [`@media (${Queries.tablet.min})`]: {
      marginTop: '0',
    },
  },

  '& > *:nth-of-type(2)': {
    [`@media (${Queries.tablet.min})`]: {
      marginTop: `${Spacing.lg}`,
    },

    [`@media (${Queries.desktop.min})`]: {
      marginTop: `${Spacing.xl}`,
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
  '.umd-grid-gap-masonry': {
    ...MasonryGrid,
  },
};

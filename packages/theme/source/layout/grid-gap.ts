import { Layout, Tokens } from '@universityofmaryland/variables';

const { Media, Spacing } = Tokens;

const GridColumnsStacked = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridGap: `${Spacing.md}`,

  [`@media (${Media.queries.desktop.min})`]: {
    gridGap: `${Spacing.xl}`,
  },
};

const GridColumnsFeatured = {
  ...Layout.grid.columnsBaseWithGap,
  ...Layout.grid.columnsThreeWithGap,
  ...Layout.grid.columnsFourWithGap,

  [`@media (${Media.queries.medium.min})`]: {
    gridGap: `${Spacing.md}`,
    gridTemplateColumns: 'repeat(2, 1fr)',

    '& > *:first-child': {
      gridColumnStart: '1',
      gridColumnEnd: 'span 2',
    },
  },

  [`@media (${Media.queries.desktop.min})`]: {
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
  gridGap: Spacing.md,

  [`@media (${Media.queries.tablet.min})`]: {
    gridTemplateColumns: '1fr 1fr',
    gridGap: Spacing.lg,
  },

  [`@media (${Media.queries.desktop.min})`]: {
    gridGap: Spacing.xl,
  },

  '& > *': {
    '& > *': {
      width: '100%',
      height: '100%',
    },
  },

  '& > *:nth-of-type(odd)': {
    [`@media (${Media.queries.tablet.min})`]: {
      marginTop: `-${Spacing.lg}`,
      marginBottom: `${Spacing.lg}`,
    },

    [`@media (${Media.queries.desktop.min})`]: {
      marginTop: `-${Spacing.xl}`,
      marginBottom: `${Spacing.xl}`,
    },
  },

  '& > *:nth-of-type(even)': {
    [`@media (${Media.queries.tablet.min})`]: {
      marginTop: '0',
    },
  },

  '& > *:first-child': {
    [`@media (${Media.queries.tablet.min})`]: {
      marginTop: '0',
    },
  },

  '& > *:nth-of-type(2)': {
    [`@media (${Media.queries.tablet.min})`]: {
      marginTop: `${Spacing.lg}`,
    },

    [`@media (${Media.queries.desktop.min})`]: {
      marginTop: `${Spacing.xl}`,
    },
  },
};

const OffsetGrid = {
  '& > *': {
    alignSelf: 'start',
    display: 'grid',

    [`@media (${Media.queries.desktop.min})`]: {
      minHeight: '400px',
    },
  },

  '& > *:first-child': {
    [`@media (${Media.queries.desktop.min})`]: {
      marginTop: `${Spacing['2xl']}`,
    },
  },

  '& > *:nth-child(2)': {
    [`@media (${Media.queries.desktop.min})`]: {
      marginTop: `${Spacing['8xl']}`,
    },
  },

  '& umd-element-stat': {
    [`@media (${Media.queries.desktop.min})`]: {
      height: `100%`,
    },
  },
};

export default {
  '.umd-grid-gap': {
    ...Layout.grid.columnsBaseWithGap,
  },
  '.umd-grid-gap-three': {
    ...Layout.grid.columnsThreeWithGap,
  },
  '.umd-grid-gap-four': {
    ...Layout.grid.columnsFourWithGap,
  },
  '.umd-grid-gap-four-center': {
    ...Layout.grid.columnsFourWithGap,

    '& > *:first-child': {
      [`@media (${Media.queries.highDef.min})`]: {
        gridColumnStart: '2',
      },
    },
  },
  '.umd-grid-gap-three-large': {
    ...Layout.grid.columnsThreeWithGapLarge,
  },
  '.umd-grid-gap-four-large': {
    ...Layout.grid.columnsFourWithGapLarge,
  },
  '.umd-grid-featured-card': {
    ...GridColumnsFeatured,
  },
  '.umd-grid-row-mobile-tablet': {
    ...Layout.grid.columnAndRowsMobileTablet,
  },
  '.umd-grid-gap-masonry': {
    ...MasonryGrid,
  },
  '.umd-grid-gap-stacked': {
    ...GridColumnsStacked,
  },
  '.umd-grid-gap-three-offset': {
    ...Layout.grid.columnsFourWithGapLarge,
    ...OffsetGrid,
  },
};

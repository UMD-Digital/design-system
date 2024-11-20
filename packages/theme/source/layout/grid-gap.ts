import { Layout, Tokens } from '@universityofmaryland/variables';

const {
  GridColumnsBaseWithGap,
  GridColumnsThreeWithGap,
  GridColumnsFourWithGap,
  GridColumnsThreeWithGapLarge,
  GridColumnsFourWithGapLarge,
  GridColumnAndRowsMobileTablet,
} = Layout;
const { Queries, Spacing } = Tokens;

const GridColumnsStacked = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridGap: `${Spacing.md}`,

  [`@media (${Queries.desktop.min})`]: {
    gridGap: `${Spacing.xl}`,
  },
};

const GridColumnsFeatured = {
  ...GridColumnsBaseWithGap,
  ...GridColumnsThreeWithGap,
  ...GridColumnsFourWithGap,

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
  gridGap: Spacing.md,

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
      marginBottom: `${Spacing.lg}`,
    },

    [`@media (${Queries.desktop.min})`]: {
      marginTop: `-${Spacing.xl}`,
      marginBottom: `${Spacing.xl}`,
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

const OffsetGrid = {
  '& > *': {
    alignSelf: 'start',
    display: 'grid',

    [`@media (${Queries.desktop.min})`]: {
      minHeight: '400px',
    },
  },

  '& > *:first-child': {
    [`@media (${Queries.desktop.min})`]: {
      marginTop: `${Spacing['2xl']}`,
    },
  },

  '& > *:nth-child(2)': {
    [`@media (${Queries.desktop.min})`]: {
      marginTop: `${Spacing['8xl']}`,
    },
  },

  '& umd-element-stat': {
    [`@media (${Queries.desktop.min})`]: {
      height: `100%`,
    },
  },
};

export default {
  '.umd-grid-gap': {
    ...GridColumnsBaseWithGap,
  },
  '.umd-grid-gap-three': {
    ...GridColumnsThreeWithGap,
  },
  '.umd-grid-gap-four': {
    ...GridColumnsFourWithGap,
  },
  '.umd-grid-gap-four-center': {
    ...GridColumnsFourWithGap,

    '& > *:first-child': {
      [`@media (${Queries.highDef.min})`]: {
        gridColumnStart: '2',
      },
    },
  },
  '.umd-grid-gap-three-large': {
    ...GridColumnsThreeWithGapLarge,
  },
  '.umd-grid-gap-four-large': {
    ...GridColumnsFourWithGapLarge,
  },
  '.umd-grid-featured-card': {
    ...GridColumnsFeatured,
  },
  '.umd-grid-row-mobile-tablet': {
    ...GridColumnAndRowsMobileTablet,
  },
  '.umd-grid-gap-masonry': {
    ...MasonryGrid,
  },
  '.umd-grid-gap-stacked': {
    ...GridColumnsStacked,
  },
  '.umd-grid-gap-three-offset': {
    ...GridColumnsThreeWithGapLarge,
    ...OffsetGrid,
  },
};

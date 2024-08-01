import { Queries } from '../tokens/breakpoints';
import { Spacing } from '../tokens/spacing';

const GridColumnsTwo = {
  display: 'grid',
  gridTemplateColumns: '1fr',

  [`@media (${Queries.large.min})`]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
};

const GridColumnsThree = {
  display: 'grid',
  gridTemplateColumns: '1fr',

  [`@media (${Queries.desktop.min})`]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
};

const GridColumnsFour = {
  display: 'grid',
  gridTemplateColumns: '1fr',

  [`@media (${Queries.large.min})`]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  [`@media (${Queries.highDef.min})`]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
};

const GridColumnsBaseWithGap = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridGap: Spacing.lg,

  [`@media (${Queries.large.min})`]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  [`@media (${Queries.desktop.min})`]: {
    gridGap: Spacing.xl,
  },
};

const GridColumnsThreeWithGap = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridGap: Spacing.lg,

  [`@media (${Queries.desktop.min})`]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
};

const GridColumnsFourWithGap = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridGap: Spacing.lg,

  [`@media (${Queries.large.min})`]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  [`@media (${Queries.highDef.min})`]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
};

const GridColumnsThreeWithGapLarge = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridGap: Spacing.lg,

  [`@media (${Queries.desktop.min})`]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: Spacing.xl,
  },
};

const GridColumnsFourWithGapLarge = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridGap: Spacing.lg,

  [`@media (${Queries.large.min})`]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  [`@media (${Queries.highDef.min})`]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: Spacing.xl,
  },
};

const GridRowsWithGapBase = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridGap: Spacing.lg,
};

const GridColumnAndRows = {
  alignItems: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
  gap: Spacing.sm,
  justifyContent: 'flex-start',
};

const GridColumnAndRowsMobileTablet = {
  ...GridColumnAndRows,

  [`@media (${Queries.large.min})`]: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
};

export default {
  GridColumnsTwo,
  GridColumnsThree,
  GridColumnsFour,
  GridRowsWithGapBase,
  GridColumnsBaseWithGap,
  GridColumnsThreeWithGap,
  GridColumnsFourWithGap,
  GridColumnsThreeWithGapLarge,
  GridColumnsFourWithGapLarge,
  GridColumnAndRows,
  GridColumnAndRowsMobileTablet,
};

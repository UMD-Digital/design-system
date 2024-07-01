import { Queries } from '../tokens/breakpoints';
import { Spacing } from '../tokens/spacing';

const GridBase = {
  display: 'grid',
  gridTemplateColumns: '1fr',
};

const GridBaseQueries = {
  [`@media (${Queries.large.min})`]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
};

const GridGapBaseQueries = {
  gridGap: Spacing.lg,

  [`@media (${Queries.large.min})`]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  [`@media (${Queries.desktop.min})`]: {
    gridGap: Spacing.lg,
  },
};

const GridColumnsBase = {
  ...GridBase,
  ...GridBaseQueries,
};

const GridColumnsThree = {
  ...GridBase,
  ...GridBaseQueries,

  [`@media (${Queries.desktop.min})`]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
};

const GridColumnsFour = {
  ...GridBase,
  ...GridBaseQueries,

  [`@media (${Queries.highDef.min})`]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
};

const GridColumnsBaseWithGap = {
  ...GridBase,
  ...GridGapBaseQueries,

  [`@media (${Queries.desktop.min})`]: {
    gridGap: Spacing.xl,
  },
};

const GridColumnsThreeWithGap = {
  ...GridBase,
  ...GridGapBaseQueries,

  [`@media (${Queries.desktop.min})`]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
};

const GridColumnsFourWithGap = {
  ...GridBase,
  ...GridGapBaseQueries,

  [`@media (${Queries.highDef.min})`]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
};

const GridColumnsThreeWithGapLarge = {
  ...GridBase,
  ...GridGapBaseQueries,

  [`@media (${Queries.desktop.min})`]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: Spacing.xl,
  },
};

const GridColumnsFourWithGapLarge = {
  ...GridBase,
  ...GridGapBaseQueries,

  [`@media (${Queries.highDef.min})`]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: Spacing.xl,
  },
};

const GridRowsWithGapBase = {
  ...GridBase,
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
  GridColumnsBase,
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

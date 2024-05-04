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
  [`@media (${Queries.large.min})`]: {
    gridGap: Spacing.lg,
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
  gridGap: Spacing.lg,

  [`@media (${Queries.desktop.min})`]: {
    gridGap: Spacing.xl,
  },
};

const GridColumnsThreeWithGap = {
  ...GridBase,
  ...GridGapBaseQueries,
  gridGap: Spacing.lg,

  [`@media (${Queries.desktop.min})`]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: Spacing.xl,
  },
};

const GridColumnsFourWithGap = {
  ...GridBase,
  ...GridGapBaseQueries,
  gridGap: Spacing.lg,

  [`@media (${Queries.highDef.min})`]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: Spacing.xl,
  },
};

const GridRowsWithGapBase = {
  ...GridBase,
  gridGap: Spacing.md,
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
  GridColumnAndRows,
  GridColumnAndRowsMobileTablet,
};

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

const GridRows = {
  '.base': {
    ...GridBase,
    ...GridBaseQueries,
  },

  '.base-three': {
    ...GridBase,
    ...GridBaseQueries,

    [`@media (${Queries.desktop.min})`]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },

  '.base-four': {
    ...GridBase,
    ...GridBaseQueries,

    [`@media (${Queries.highDef.min})`]: {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
  },
};

const GridRowsWithGap = {
  '.base': {
    ...GridBase,
    ...GridGapBaseQueries,
    gridGap: Spacing.md,

    [`@media (${Queries.desktop.min})`]: {
      gridGap: Spacing['4xl'],
    },
  },

  '.base-three': {
    ...GridBase,
    ...GridGapBaseQueries,
    gridGap: Spacing.md,

    [`@media (${Queries.desktop.min})`]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },

  '.base-four': {
    ...GridBase,
    ...GridGapBaseQueries,
    gridGap: Spacing.md,

    [`@media (${Queries.highDef.min})`]: {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
  },
};

const GridColumnsWithGap = {
  '.base': {
    ...GridBase,
    gridGap: Spacing.md,
  },
};

const GridColumnAndRows = {
  '.mobile-tablet': {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    gap: Spacing.sm,
    justifyContent: 'flex-start',

    [`@media (${Queries.large.min})`]: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  },
};

export default {
  GridRows,
  GridRowsWithGap,
  GridColumnsWithGap,
  GridColumnAndRows,
};

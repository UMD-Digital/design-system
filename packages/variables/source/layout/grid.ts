import { Queries } from '../tokens/breakpoints';
import { spacing } from '../tokens/spacing';

const GridBase = {
  display: 'grid',
  gridGap: spacing.md,
  gridTemplateColumns: '1fr',
};

const GridBaseQueries = {
  [`@media (${Queries.large.min})`]: {
    gridGap: spacing.lg,
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  [`@media (${Queries.desktop.min})`]: {
    gridGap: spacing.lg,
  },
};

const Grid = {
  '.base': {
    ...GridBase,
    ...GridBaseQueries,

    [`@media (${Queries.desktop.min})`]: {
      gridGap: spacing['4xl'],
    },
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

    [`@media (${Queries.desktop.min})`]: {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
  },
};

export { Grid, GridBase };

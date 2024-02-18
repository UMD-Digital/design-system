import { queries } from '../tokens/breakpoints';
import { spacing } from '../tokens/spacing';

const GridBase = {
  display: 'grid',
  gridGap: spacing.md,
  gridTemplateColumns: '1fr',
};

const GridBaseQueries = {
  [`@media (${queries.large.min})`]: {
    gridGap: spacing.lg,
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  [`@media (${queries.desktop.min})`]: {
    gridGap: spacing.lg,
  },
};

const Grid = {
  '.base': {
    ...GridBase,
    ...GridBaseQueries,

    [`@media (${queries.desktop.min})`]: {
      gridGap: spacing['4xl'],
    },
  },

  '.base-three': {
    ...GridBase,
    ...GridBaseQueries,

    [`@media (${queries.desktop.min})`]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },

  '.base-four': {
    ...GridBase,
    ...GridBaseQueries,

    [`@media (${queries.desktop.min})`]: {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
  },
};

export { Grid, GridBase };

import { Queries } from '../tokens/breakpoints';
import { Spacing } from '../tokens/spacing';

const GridBase = {
  display: 'grid',
  gridGap: Spacing.md,
  gridTemplateColumns: '1fr',
};

const GridBaseQueries = {
  [`@media (${Queries.large.min})`]: {
    gridGap: Spacing.lg,
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  [`@media (${Queries.desktop.min})`]: {
    gridGap: Spacing.lg,
  },
};

const Grid = {
  '.base': {
    ...GridBase,
    ...GridBaseQueries,

    [`@media (${Queries.desktop.min})`]: {
      gridGap: Spacing['4xl'],
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

import { spacing, queries } from '../tokens/layout';

const gridBase = {
  display: 'grid',
  gridGap: spacing.md,
  gridTemplateColumns: '1fr',
};

const gridBaseQueries = {
  [`@media (${queries.large.min})`]: {
    gridGap: spacing.lg,
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  [`@media (${queries.desktop.min})`]: {
    gridGap: spacing.lg,
  },
};

const umdGrid = {
  '.umd-grid': {
    ...gridBase,
    ...gridBaseQueries,

    [`@media (${queries.desktop.min})`]: {
      gridGap: spacing['4xl'],
    },
  },

  '.umd-grid-three': {
    ...gridBase,
    ...gridBaseQueries,

    [`@media (${queries.desktop.min})`]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },

  '.umd-grid-four': {
    ...gridBase,
    ...gridBaseQueries,

    [`@media (${queries.desktop.min})`]: {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
  },
};

export { umdGrid };

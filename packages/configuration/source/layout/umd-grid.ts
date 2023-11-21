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

const umdGridStandard = {
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

const umdGridGutterless = {
  '.umd-grid-gutterless-two': {
    ...gridBase,

    gridGap: `${spacing.min}`,

    [`@media (${queries.large.min})`]: {
      gridGap: `0px`,
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },

  '.umd-grid-gutterless-three': {
    ...gridBase,

    gridGap: `${spacing.min}`,

    [`@media (${queries.large.min})`]: {
      gridGap: `0px`,
      gridTemplateColumns: 'repeat(2, 1fr)',
    },

    [`@media (${queries.desktop.min})`]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },

  '.umd-grid-gutterless-four': {
    ...gridBase,

    [`@media (${queries.large.min})`]: {
      gridGap: `0px`,
      gridTemplateColumns: 'repeat(2, 1fr)',
    },

    [`@media (${queries.desktop.min})`]: {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
  },
};

const umdGridSpecial = {
  '.umd-grid-featured-card': {
    ...gridBase,

    [`@media (${queries.medium.min})`]: {
      gridGap: `${spacing.md}`,
      gridTemplateColumns: 'repeat(2, 1fr)',

      '& > *:first-child': {
        gridColumnStart: '1',
        gridColumnEnd: 'span 2',
      },
    },

    [`@media (${queries.desktop.min})`]: {
      gridGap: `${spacing.lg}`,
      gridTemplateColumns: `[start-feature] calc(50% - ${spacing.md}) [end-feature start-cards] repeat(2, 1fr) [end-cards]`,

      [`& > umd-element-card-overlay:first-child,
        & > umd-element-card:first-child`]: {
        gridColumnStart: '1',
        gridColumnEnd: '1',
      },
    },
  },

  '.umd-grid-four-animated-overlay-card': {
    ...umdGridGutterless['.umd-grid-gutterless-four'],

    '& umd-element-card-overlay': {
      boxShadow: '0 0 0 0 rgba(0, 0, 0, 0.2)',
      transition: 'box-shadow 0.5s ease-in-out, transform 0.5s ease-in-out',
      transform: 'scale(1)',

      [`&:hover,
        &:focus-within `]: {
        boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.2)',
        transform: 'scale(1.025)',
        zIndex: '99',
      },
    },
  },
};

const umdGrid = {
  ...umdGridStandard,
  ...umdGridGutterless,
  ...umdGridSpecial,
};

export { umdGrid };

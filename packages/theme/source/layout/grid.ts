import { Layout, Tokens } from '@universityofmaryland/variables';

const { Grid, GridBase } = Layout;
const { Queries, Spacing } = Tokens;

export const GridStandard = {
  '.umd-grid': {
    ...Grid['.base'],
  },

  '.umd-grid-three': {
    ...Grid['.base-three'],
  },

  '.umd-grid-four': {
    ...Grid['.base-four'],
  },
};

export const GridGutterless = {
  '.umd-grid-gutterless-two': {
    ...GridBase,

    gridGap: Spacing.min,

    [`@media (${Queries.large.min})`]: {
      gridGap: `0px`,
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },

  '.umd-grid-gutterless-three': {
    ...GridBase,

    gridGap: Spacing.min,

    [`@media (${Queries.large.min})`]: {
      gridGap: `0px`,
      gridTemplateColumns: 'repeat(2, 1fr)',
    },

    [`@media (${Queries.desktop.min})`]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },

  '.umd-grid-gutterless-four': {
    ...GridBase,

    gridGap: Spacing.min,

    [`@media (${Queries.large.min})`]: {
      gridGap: `0px`,
      gridTemplateColumns: 'repeat(2, 1fr)',
    },

    [`@media (${Queries.desktop.min})`]: {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
  },
};

export const GridSpecial = {
  '.umd-grid-featured-card': {
    ...GridBase,

    [`@media (${Queries.medium.min})`]: {
      gridGap: `${Spacing.md}`,
      gridTemplateColumns: 'repeat(2, 1fr)',

      '& > *:first-child': {
        gridColumnStart: '1',
        gridColumnEnd: 'span 2',
      },
    },

    [`@media (${Queries.desktop.min})`]: {
      gridGap: `${Spacing.lg}`,
      gridTemplateColumns: `[start-feature] calc(50% - ${Spacing.md}) [end-feature start-cards] repeat(2, 1fr) [end-cards]`,

      [`& > umd-element-card-overlay:first-child,
        & > umd-element-card:first-child`]: {
        gridColumnStart: '1',
        gridColumnEnd: '1',
      },
    },
  },

  '.umd-grid-two-animated-overlay-card': {
    ...GridGutterless['.umd-grid-gutterless-two'],

    [`@media (${Queries.desktop.min})`]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
      minHeight: `calc(${Spacing['3xl']} * 10)`,
    },

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

  '.umd-grid-three-animated-overlay-card': {
    ...GridGutterless['.umd-grid-gutterless-three'],

    [`@media (${Queries.desktop.min})`]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
      minHeight: `calc(${Spacing['3xl']} * 10)`,
    },

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

  '.umd-grid-four-animated-overlay-card': {
    ...GridGutterless['.umd-grid-gutterless-four'],

    [`@media (${Queries.desktop.min})`]: {
      gridTemplateColumns: 'repeat(4, 1fr)',
      minHeight: `calc(${Spacing['3xl']} * 10)`,
    },

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

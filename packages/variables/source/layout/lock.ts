import { Queries } from '../tokens/breakpoints';
import { Spacing } from '../tokens/spacing';

// To Do : Refactor to be part of spacing (renamed for horizitonal)

const lockBase = {
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: Spacing['md'],
  paddingRight: Spacing['md'],
  maxWidth: '1536px',

  [`@media (${Queries.tablet.min})`]: {
    paddingLeft: Spacing['2xl'],
    paddingRight: Spacing['2xl'],
  },

  [`@media (${Queries.desktop.min})`]: {
    paddingLeft: Spacing['4xl'],
    paddingRight: Spacing['4xl'],
  },
};

const Lock = {
  '.base': {
    ...lockBase,
  },
};

export { Lock };

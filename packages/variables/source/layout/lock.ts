import { Queries } from '../tokens/breakpoints';
import { spacing } from '../tokens/spacing';

const lockBase = {
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: spacing['md'],
  paddingRight: spacing['md'],
  maxWidth: '1536px',

  [`@media (${Queries.tablet.min})`]: {
    paddingLeft: spacing['2xl'],
    paddingRight: spacing['2xl'],
  },

  [`@media (${Queries.desktop.min})`]: {
    paddingLeft: spacing['4xl'],
    paddingRight: spacing['4xl'],
  },
};

const Lock = {
  '.base': {
    ...lockBase,
  },
};

export { Lock };

import { spacing, queries } from '../tokens/layout';

const lockBase = {
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: spacing['sm'],
  paddingRight: spacing['sm'],
  maxWidth: '1536px',

  [`@media (${queries.tablet.min})`]: {
    paddingLeft: spacing['2xl'],
    paddingRight: spacing['2xl'],
  },

  [`@media (${queries.desktop.min})`]: {
    paddingLeft: spacing['4xl'],
    paddingRight: spacing['4xl'],
  },
};

const umdLock = {
  '.umd-lock': {
    ...lockBase,
  },

  '.umd-lock-small': {
    ...lockBase,
    ...{
      maxWidth: '1296px',
    },
  },

  '.umd-lock-smaller': {
    ...lockBase,
    ...{
      maxWidth: '1180px',
    },
  },

  '.umd-lock-extra-small': {
    ...lockBase,
    ...{
      maxWidth: '960px',
    },
  },

  '.umd-lock-smallest': {
    ...lockBase,
    ...{ maxWidth: '800px' },
  },
};

export { umdLock };

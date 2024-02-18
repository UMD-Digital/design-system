import { Layout } from '@universityofmaryland/variables';

const { Lock } = Layout;

export const LockSizes = {
  '.umd-lock': {
    ...Lock['.base'],
  },

  '.umd-lock-small': {
    ...Lock['.base'],
    ...{
      maxWidth: '1296px',
    },
  },

  '.umd-lock-smaller': {
    ...Lock['.base'],
    ...{
      maxWidth: '1180px',
    },
  },

  '.umd-lock-extra-small': {
    ...Lock['.base'],
    ...{
      maxWidth: '960px',
    },
  },

  '.umd-lock-smallest': {
    ...Lock['.base'],
    ...{ maxWidth: '800px' },
  },
};

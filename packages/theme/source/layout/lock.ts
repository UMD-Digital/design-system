import { Layout } from '@universityofmaryland/variables';

const { LockMax, LockLarge, LockNormal, LockSmall, LockSmallest } = Layout;

export default {
  '.umd-lock': {
    ...LockMax,
  },

  '.umd-lock-small': {
    ...LockLarge,
  },

  '.umd-lock-smaller': {
    ...LockNormal,
  },

  '.umd-lock-extra-small': {
    ...LockSmall,
  },

  '.umd-lock-smallest': {
    ...LockSmallest,
  },
};

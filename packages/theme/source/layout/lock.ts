import { Layout } from '@universityofmaryland/variables';

const { LockFull, LockMax, LockLarge, LockNormal, LockSmall, LockSmallest } =
  Layout;

export default {
  '.umd-lock-full': {
    ...LockFull,
  },

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

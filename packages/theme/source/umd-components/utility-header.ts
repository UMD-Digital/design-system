import { spacing } from '@universityofmaryland/variables';

export default {
  'umd-utility-header:not(:defined)': {
    display: 'block',
    height: spacing['2xl'],

    '& > *': {
      display: 'none',
    },
  },
  'umd-utility-header:defined': {
    display: 'block',
  },
};

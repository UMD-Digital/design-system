import { Tokens } from '@universityofmaryland/variables';

const { Spacing } = Tokens;

export default {
  'umd-utility-header:not(:defined)': {
    display: 'block',
    height: Spacing['2xl'],

    '& > *': {
      display: 'none',
    },
  },
  'umd-utility-header:defined': {
    display: 'block',
  },
};

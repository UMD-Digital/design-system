import { Tokens } from '@universityofmaryland/variables';

export default {
  'umd-element-alert:not(:defined)': {
    display: 'none',
  },
  'umd-element-alert:defined': {
    display: 'block',
  },

  '* + umd-element-alert': {
    marginTop: Tokens.Spacing.lg,
  },
};

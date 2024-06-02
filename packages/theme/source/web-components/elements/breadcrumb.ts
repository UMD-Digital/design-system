import { Tokens } from '@universityofmaryland/variables';

export default {
  'umd-element-breadcrumb:not(:defined)': {
    display: 'none',
  },
  'umd-element-breadcrumb:defined': {
    display: 'block',
    marginTop: Tokens.Spacing.sm,
  },
};

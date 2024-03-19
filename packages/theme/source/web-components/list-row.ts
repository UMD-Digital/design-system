import { Tokens } from '@universityofmaryland/variables';

export default {
  'umd-element-list-row:not(:defined)': {
    display: 'none',
  },
  'umd-element-list-row:defined': {
    display: 'block',
  },
  'umd-element-list-row + umd-element-list-row': {
    marginTop: Tokens.Spacing.md,
  },
};

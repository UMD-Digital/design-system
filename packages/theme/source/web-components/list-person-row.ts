import { Tokens } from '@universityofmaryland/variables';

export default {
  'umd-element-list-person-row:not(:defined)': {
    display: 'none',
  },
  'umd-element-list-person-row:defined': {
    display: 'block',
  },
  'umd-element-list-person-row + umd-element-list-person-row': {
    marginTop: Tokens.Spacing.md,
  },
};

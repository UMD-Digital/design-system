import { Tokens } from '@universityofmaryland/variables';

export default {
  'umd-element-card:not(:defined)': {
    display: 'none',
  },
  'umd-element-card:defined': {
    display: 'block',
  },
  'umd-element-card[display="list"] + umd-element-card[display="list"]': {
    marginTop: Tokens.Spacing.md,
  },
};

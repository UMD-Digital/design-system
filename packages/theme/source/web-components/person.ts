import { Tokens } from '@universityofmaryland/variables';

export default {
  'umd-element-person:not(:defined)': {
    display: 'none',
  },
  'umd-element-person:defined': {
    display: 'block',
  },
  'umd-element-person[display="list"] + umd-element-person[display="list"]': {
    marginTop: Tokens.Spacing.md,
  },
};

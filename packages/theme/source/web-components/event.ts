import { Tokens } from '@universityofmaryland/variables';

export default {
  'umd-element-event:not(:defined)': {
    display: 'none',
  },
  'umd-element-event:defined': {
    display: 'block',
  },
  'umd-element-event[display="list"] + umd-element-event[display="list"]': {
    marginTop: Tokens.Spacing.md,
  },
};

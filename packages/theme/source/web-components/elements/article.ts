import { Tokens } from '@universityofmaryland/variables';

export default {
  'umd-element-article:not(:defined)': {
    display: 'none',
  },
  'umd-element-article:defined': {
    display: 'block',
  },
  'umd-element-article[display="list"] + umd-element-article[display="list"]': {
    marginTop: Tokens.Spacing.md,
  },
};

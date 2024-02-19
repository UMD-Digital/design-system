import { Tokens } from '@universityofmaryland/variables';

export default {
  'umd-element-nav-item:not(:defined)': {
    display: 'none',
  },
  'umd-element-nav-item:defined': {
    display: 'block',
  },
  'umd-element-nav-item + umd-element-nav-item': {
    marginLeft: Tokens.Spacing.md,

    [`@media (${Tokens.Queries.desktop.min})`]: {
      marginLeft: Tokens.Spacing.lg,
    },
  },
};

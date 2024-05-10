import { Tokens } from '@universityofmaryland/variables';

export default {
  'umd-element-accordion-item:not(:defined)': {
    display: 'none',
  },
  'umd-element-accordion-item:defined': {
    display: 'block',
  },
  'umd-element-accordion-item + umd-element-accordion-item': {
    marginTop: Tokens.Spacing.xs,
  },
};

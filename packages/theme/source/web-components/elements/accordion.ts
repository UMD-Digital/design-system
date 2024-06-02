import { Tokens } from '@universityofmaryland/variables';

const Default = {
  'umd-element-accordion-item:not(:defined)': {
    display: 'none',
  },
  'umd-element-accordion-item:defined': {
    display: 'block',
  },
  'umd-element-accordion-item + umd-element-accordion-item': {
    marginTop: Tokens.Spacing.min,
  },
};

export default {
  ...Default,
};

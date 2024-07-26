import { Tokens } from '@universityofmaryland/variables';

const { Spacing } = Tokens;

const Default = {
  'umd-element-pathway:not(:defined)': {
    display: 'none',
  },
  'umd-element-pathway:defined': {
    display: 'block',
  },
};

const Sticky = {
  'umd-element-pathway[type="sticky"] + umd-element-pathway[type="sticky"]': {
    marginTop: `${Spacing.max}`,
  },
};

export default {
  ...Default,
  ...Sticky,
};

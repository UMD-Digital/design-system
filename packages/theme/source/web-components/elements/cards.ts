import { Tokens } from '@universityofmaryland/variables';

const Standard = {
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

const Overlay = {
  'umd-element-card-overlay:not(:defined)': {
    display: 'none',
  },
  'umd-element-card-overlay:defined': {
    display: 'block',
  },
  'umd-element-card-overlay.size-large': {
    minHeight: '560px',
  },
};

export default {
  ...Standard,
  ...Overlay,
};

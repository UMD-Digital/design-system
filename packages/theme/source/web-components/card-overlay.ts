import { Tokens } from '@universityofmaryland/variables';

const { Colors } = Tokens;

export default {
  'umd-element-card-overlay:not(:defined)': {
    display: 'none',
  },
  'umd-element-card-overlay:defined': {
    display: 'block',

    '&[data-image="true"] .umd-cta-secondary, &[theme="dark"] .umd-cta-secondary':
      {
        color: Colors.white,
      },
  },
};

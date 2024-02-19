import { Tokens } from '@universityofmaryland/variables';

export default {
  'umd-element-events-date-slider:not(:defined)': {
    display: 'none',
  },
  'umd-element-events-date-slider:defined': {
    display: 'block',
  },
  '* + umd-element-events-date-slider': {
    marginTop: Tokens.Spacing['2xl'],
  },
};

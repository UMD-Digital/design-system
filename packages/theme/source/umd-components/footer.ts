import { colors, spacing } from '@universityofmaryland/variables';

export default {
  'umd-element-footer:not(:defined)': {
    display: 'block',
    backgroundColor: colors.black,
    height: `calc(${spacing.md} * 20)`,

    '& > *': {
      display: 'none',
    },
  },
  'umd-element-footer:defined': {
    display: 'block',
  },
};

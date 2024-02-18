import { Tokens } from '@universityofmaryland/variables';

const { colors, spacing } = Tokens;

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

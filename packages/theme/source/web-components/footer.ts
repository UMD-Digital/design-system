import { Tokens } from '@universityofmaryland/variables';

const { Colors, spacing } = Tokens;

export default {
  'umd-element-footer:not(:defined)': {
    display: 'block',
    backgroundColor: Colors.black,
    height: `calc(${spacing.md} * 20)`,

    '& > *': {
      display: 'none',
    },
  },
  'umd-element-footer:defined': {
    display: 'block',
  },
};

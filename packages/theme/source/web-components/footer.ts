import { Tokens } from '@universityofmaryland/variables';

const { Colors, Spacing } = Tokens;

export default {
  'umd-element-footer:not(:defined)': {
    display: 'block',
    backgroundColor: Colors.black,
    height: `calc(${Spacing.md} * 20)`,

    '& > *': {
      display: 'none',
    },
  },
  'umd-element-footer:defined': {
    display: 'block',
  },
  '* + umd-element-footer': {
    marginTop: Spacing['2xl'],
  },
};

import { Tokens } from '@universityofmaryland/variables';

const { Colors, Spacing } = Tokens;

export default {
  'umd-element-nav-drawer:not(:defined)': {
    backgroundColor: Colors.white,
    borderRight: `1px solid ${Colors.gray.light}`,
    display: 'block',
    height: '44px',
    paddingRight: Spacing.sm,
    width: '60px',

    '& > *': {
      display: 'none',
    },
  },
  'umd-element-nav-drawer:defined': {
    display: 'block',
  },
};

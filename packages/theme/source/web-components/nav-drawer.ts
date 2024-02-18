import { Tokens } from '@universityofmaryland/variables';

const { Colors, spacing } = Tokens;

export default {
  'umd-element-nav-drawer:not(:defined)': {
    backgroundColor: Colors.white,
    borderRight: `1px solid ${Colors.gray.light}`,
    display: 'block',
    height: '44px',
    paddingRight: spacing.sm,
    width: '60px',

    '& > *': {
      display: 'none',
    },
  },
  'umd-element-nav-drawer:defined': {
    display: 'block',
  },
};

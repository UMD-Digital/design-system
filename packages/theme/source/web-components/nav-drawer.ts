import { Tokens } from '@universityofmaryland/variables';

const { colors, spacing } = Tokens;

export default {
  'umd-element-nav-drawer:not(:defined)': {
    backgroundColor: colors.white,
    borderRight: `1px solid ${colors.gray.light}`,
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

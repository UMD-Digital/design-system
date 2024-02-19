import { Tokens } from '@universityofmaryland/variables';

const { Colors } = Tokens;

export default {
  'umd-element-nav-drawer:not(:defined)': {
    backgroundColor: Colors.white,
    display: 'block',
    height: '44px',
    width: '44px',

    '& > *': {
      display: 'none',
    },
  },
  'umd-element-nav-drawer:defined': {
    display: 'block',
  },
};

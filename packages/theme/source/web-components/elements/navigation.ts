import { Tokens } from '@universityofmaryland/variables';

const { Spacing, Colors } = Tokens;

const Drawer = {
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

const Item = {
  'umd-element-nav-item:not(:defined)': {
    display: 'none',
  },
  'umd-element-nav-item:defined': {
    display: 'block',
  },
};

const Navigation = {
  'umd-element-navigation-header:not(:defined)': {
    display: 'none',
  },
  'umd-element-navigation-header:defined': {
    display: 'block',
  },
};

const Utility = {
  'umd-utility-header:not(:defined)': {
    display: 'block',
    height: Spacing['2xl'],

    '& > *': {
      display: 'none',
    },
  },
  'umd-utility-header:defined': {
    display: 'block',
  },
};

export default {
  ...Drawer,
  ...Item,
  ...Navigation,
  ...Utility,
};

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

const Sticky = {
  'umd-element-navigation-sticky:not(:defined)': {
    display: 'none',
  },
  'umd-element-navigation-sticky:defined': {
    display: 'block',
    position: 'relative',
    zIndex: '99999',
  },
};

const Utility = {
  'umd-element-utility-header:not(:defined)': {
    display: 'block',
  },
  'umd-element-utility-header:defined': {
    display: 'block',
  },
};

export default {
  ...Drawer,
  ...Item,
  ...Navigation,
  ...Utility,
  ...Sticky,
};

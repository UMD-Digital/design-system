const Page = {
  'umd-element-alert-page:not(:defined)': {
    display: 'none',
  },
  'umd-element-alert-page:defined': {
    display: 'block',
  },
};

const Site = {
  'umd-element-alert-site:not(:defined)': {
    display: 'none',
  },
  'umd-element-alert-site:defined': {
    display: 'block',
  },
};

export default {
  ...Page,
  ...Site,
};

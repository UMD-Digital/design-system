const ImageExpand = {
  'umd-layout-image-expand:not(:defined)': {
    display: 'none',
  },
  'umd-layout-image-expand:defined': {
    display: 'block',
  },
  'umd-layout-image-expand *[slot="content"]': {
    width: '100%',
  },
  'umd-layout-image-expand *[slot="content"] umd-element-quote': {
    width: '100%',
    maxWidth: '650px',
  },
};

export default {
  ...ImageExpand,
};

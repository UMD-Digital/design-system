import { Tokens } from '@universityofmaryland/variables';

const { Colors } = Tokens;

const ImageExpand = {
  'umd-layout-image-expand:not(:defined)': {
    display: 'none',
  },
  'umd-layout-image-expand:defined': {
    display: 'block',
    backgroundColor: Colors.black,
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

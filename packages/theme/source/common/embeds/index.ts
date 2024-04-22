import { Tokens } from '@universityofmaryland/variables';

const { Colors } = Tokens;

const Video = {
  display: 'block',
  width: '100%',
  backgroundColor: Colors.black,

  '& iframe': {
    aspectRatio: '16/9',
    width: '100% !important',
    height: 'inherit !important',
  },
};

export default {
  '.umd-embed-video': {
    ...Video,
  },
};

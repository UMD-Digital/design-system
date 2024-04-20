import { Typography, Tokens } from '@universityofmaryland/variables';

const { Spacing, Colors, Queries } = Tokens;
const { LabelSmall } = Typography;

const Video = {
  display: 'block',
  width: '100%',

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

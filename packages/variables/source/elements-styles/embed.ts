import { Colors } from '../tokens';
import { create } from '../utilities';

// Consistent naming
const classNamePrefix = 'umd-embed';

// umd-embed-video
export const inline = create.jssObject({
  display: 'block',
  width: '100%',
  backgroundColor: Colors.black,

  '& iframe': {
    aspectRatio: '16/9',
    width: '100% !important',
    height: 'inherit !important',
  },

  className: `${classNamePrefix}-video`,
});

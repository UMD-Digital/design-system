import { colors } from '../tokens';
import { create } from '../utilities';

// Consistent naming
const classNamePrefix = 'umd-embed';

// umd-embed-video
export const inline = create.jssObject({
  display: 'block',
  width: '100%',
  backgroundColor: colors.black,

  className: `${classNamePrefix}-video`,

  '& iframe': {
    aspectRatio: '16/9',
    width: '100% !important',
    height: 'inherit !important',
  },
});

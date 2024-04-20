import Decorations from './text/decorations';
import FontFace from './font-faces';
import Fonts from './typography';
import RichText from './text/rich-text';
import TextLayout from './text/text-layout';
import Watermark from './text/watermark';

export default {
  ...Decorations,
  ...FontFace,
  ...Fonts,
  ...RichText,
  ...TextLayout,
  ...Watermark,
};

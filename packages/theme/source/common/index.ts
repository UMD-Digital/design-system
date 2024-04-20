import Embeds from './embeds';
import FontFace from './font-faces';
import Fonts from './typography';
import RichText from './text/rich-text';
import TextDecorations from './text/decorations';
import TextLayout from './text/text-layout';
import Watermark from './text/watermark';

export default {
  ...Embeds,
  ...FontFace,
  ...Fonts,
  ...RichText,
  ...TextDecorations,
  ...TextLayout,
  ...Watermark,
};

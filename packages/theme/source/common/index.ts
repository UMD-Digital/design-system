import Embeds from './embeds';
import FontFace from './font-faces';
import Fonts from './typography';
import Forms from './forms';
import RichText from './text/rich-text';
import TextDecorations from './text/decorations';
import TextLayout from './text/text-layout';
import Watermark from './text/watermark';

export default {
  ...Embeds,
  ...FontFace,
  ...Fonts,
  ...Forms,
  ...RichText,
  ...TextDecorations,
  ...TextLayout,
  ...Watermark,
};

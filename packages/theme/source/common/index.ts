import FontFace from './font-faces';
import Fonts from './typography';
import RichText from './text/rich-text';
import Ribbon from './text/ribbon';
import Tailwings from './text/tailwings';
import TextColumns from './text/text-columns';
import Watermark from './text/watermark';

export default {
  ...FontFace,
  ...Fonts,
  ...RichText,
  ...Ribbon,
  ...Tailwings,
  ...TextColumns,
  ...Watermark,
};

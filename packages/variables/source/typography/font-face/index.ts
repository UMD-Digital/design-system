import barlowCondensed from './barlow-condensed';
import crimsonPro from './crimson-pro';
import interstate from './interstate';

const { BoldItalic: BarlowCondensedBoldItalic } = barlowCondensed;
const { Light: CrimsonProLight, Regular: CrimsonProRegular } = crimsonPro;
const {
  Thin: InterstateThin,
  ExtraLight: InterstateExtraLight,
  Light: InterstateLight,
  Regular: InterstateRegular,
  Italic: InterstateItalic,
  Bold: InterstateBold,
  BoldItalic: InterstateBoldItalic,
  Black: InterstateBlack,
  UltraBlack: InterstateUltraBlack,
} = interstate;

export const FontFaces = {
  BarlowCondensedBoldItalic,
  CrimsonProLight,
  CrimsonProRegular,
  InterstateThin,
  InterstateExtraLight,
  InterstateLight,
  InterstateRegular,
  InterstateItalic,
  InterstateBold,
  InterstateBoldItalic,
  InterstateBlack,
  InterstateUltraBlack,
};

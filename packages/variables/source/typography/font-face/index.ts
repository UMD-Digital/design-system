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
  '@font-face': [
    BarlowCondensedBoldItalic['@font-face'],
    CrimsonProLight['@font-face'],
    CrimsonProRegular['@font-face'],
    InterstateThin['@font-face'],
    InterstateExtraLight['@font-face'],
    InterstateLight['@font-face'],
    InterstateRegular['@font-face'],
    InterstateItalic['@font-face'],
    InterstateBold['@font-face'],
    InterstateBoldItalic['@font-face'],
    InterstateBlack['@font-face'],
    InterstateUltraBlack['@font-face'],
  ],
};

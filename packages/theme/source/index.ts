import {
  breakpoints,
  colors,
  fontFace,
  fontFamily,
  fontSize,
  fontWeight,
  spacing,
  screenReaderOnly,
  animatedLinks,
  typography,
  umdFlexGrid,
  umdGrid,
  umdLock,
} from '@universityofmaryland/variables';

import { root } from './dependancies/root';
import { skipContent } from './elements/accessibility';
import { umdCta } from './elements/call-to-action';
import { umdLoader } from './elements/loader';
import { captionedMedia } from './elements/media-with-caption';
import { richText } from './elements/rich-text';
import { umdHeader } from './components/header';
import { umdIntro } from './components/intro';

export const base = {
  colors,
  fontFace,
  fontFamily,
  fontSize,
  fontWeight,
  breakpoints,
  spacing,
};

export const theme = {
  root,
  skipContent,
  screenReaderOnly,
  animatedLinks,
  richText,
  typography,
  umdLock,
  umdGrid,
  umdFlexGrid,
  umdCta,
  captionedMedia,
  umdLoader,
  umdHeader,
  umdIntro,
};

import {
  breakpoints,
  queries,
  colors,
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

const theme = {
  animatedLinks,
  breakpoints,
  captionedMedia,
  colors,
  fontFamily,
  fontSize,
  fontWeight,
  queries,
  richText,
  root,
  spacing,
  screenReaderOnly,
  typography,
  skipContent,
  umdCta,
  umdLoader,
  umdFlexGrid,
  umdGrid,
  umdLock,
  umdHeader,
  umdIntro,
};

export default theme;

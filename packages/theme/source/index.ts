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

import { umdHeader } from './components/header';
import { umdIntro } from './components/intro';

import UmdCommon from './common';
import UmdComponents from './umd-components';
import UmdFeeds from './umd-feeds';

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
  UmdCommon,
  typography,
  umdLock,
  umdGrid,
  umdFlexGrid,
  umdCta,
  captionedMedia,
  umdLoader,
  umdHeader,
  umdIntro,
  UmdComponents,
  UmdFeeds,
};

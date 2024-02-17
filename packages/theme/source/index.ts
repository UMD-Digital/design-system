import {
  Accessibility,
  Tokens,
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

import UmdAnimations from './animations';
import UmdCommon from './common';
import UmdComponents from './umd-components';
import UmdFeeds from './umd-feeds';

export const base = {
  ...Tokens,
};

export const theme = {
  root,
  skipContent,
  Accessibility,
  UmdAnimations,
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

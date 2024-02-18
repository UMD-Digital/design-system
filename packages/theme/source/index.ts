import {
  Tokens,
  typography,
  umdFlexGrid,
  umdGrid,
  umdLock,
} from '@universityofmaryland/variables';

import { root } from './dependancies/root';
import { umdLoader } from './elements/loader';
import { captionedMedia } from './elements/media-with-caption';

import { umdHeader } from './components/header';
import { umdIntro } from './components/intro';

import UmdAnimations from './animations';
import UmdAccessibility from './accessibility';
import UmdCommon from './common';
import UmdComponents from './umd-components';
import UmdFeeds from './umd-feeds';

export const base = {
  ...Tokens,
};

export const theme = {
  root,
  UmdAccessibility,
  UmdAnimations,
  UmdCommon,
  typography,
  umdLock,
  umdGrid,
  umdFlexGrid,
  captionedMedia,
  umdLoader,
  umdHeader,
  umdIntro,
  UmdComponents,
  UmdFeeds,
};

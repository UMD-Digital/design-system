import { Tokens, Root, WebComponents } from '@universityofmaryland/variables';

import transforms from './transforms';
import Common from './common';

const { Font } = Tokens;

export const base = {
  ...Tokens,
  fontFamily: Font.family,
  fontSize: Font.size,
  fontWeight: Font.weight,
  breakpoints: Tokens.Media.breakpoints,
};

export const theme = {
  Root,
  transforms,

  Common,
  WebComponents,
};

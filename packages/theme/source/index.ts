import { Tokens, root } from '@universityofmaryland/web-elements-styles';

import transforms from './transforms';

const { Font } = Tokens;

export const base = {
  ...Tokens,
  fontFamily: Font.family,
  fontSize: Font.size,
  fontWeight: Font.weight,
  breakpoints: Tokens.Media.breakpoints,
};

export const theme = {
  root,
  transforms,
};

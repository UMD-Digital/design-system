import { tokens, root } from '@universityofmaryland/web-elements-styles';
import transforms from './transforms';

const { font, media } = tokens;

export const base = {
  ...tokens,
  fontFamily: font.family,
  fontSize: font.size,
  fontWeight: font.weight,
  breakpoints: media.breakpoints,
};

export const theme = {
  root,
  transforms,
};

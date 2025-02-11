import {
  token,
  root,
  outputStyles,
} from '@universityofmaryland/web-styles-library';
import * as frameworkNamespace from './framework';

const { font, media } = token;

export const base = {
  ...token,
  fontFamily: font.family,
  fontSize: font.size,
  fontWeight: font.weight,
  breakpoints: media.breakpoints,
};

export const theme = {
  root,
  styles: outputStyles,
};

export const framework = frameworkNamespace;

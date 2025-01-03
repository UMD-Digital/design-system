import {
  token,
  root,
  utilities,
} from '@universityofmaryland/web-elements-styles';

const { font, media } = token;
const styles = utilities.transform.outputStyles;

export const base = {
  ...token,
  fontFamily: font.family,
  fontSize: font.size,
  fontWeight: font.weight,
  breakpoints: media.breakpoints,
};

export const theme = {
  root,
  styles,
};

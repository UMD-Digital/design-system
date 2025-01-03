import {
  tokens,
  root,
  utilities,
} from '@universityofmaryland/web-elements-styles';

const { font, media } = tokens;
const styles = utilities.transform.outputStyles;

export const base = {
  ...tokens,
  fontFamily: font.family,
  fontSize: font.size,
  fontWeight: font.weight,
  breakpoints: media.breakpoints,
};

export const theme = {
  root,
  styles,
};

import * as token from '../token';
import { root as utilities } from '../root';
import { transform } from '../utilities';

const { outputStyles: components } = transform;
const { color, font, media } = token;
const base = {
  ...token,
  fontFamily: font.family,
  fontSize: font.size,
  fontWeight: font.weight,
  breakpoints: media.breakpoints,
};

const tailwindBase = Object.fromEntries(
  Object.entries(base).map(([key, value]) => [
    key.charAt(0).toLocaleLowerCase() + key.slice(1),
    value,
  ]),
);

const theme = {
  screens: media.breakpoints,
  colors: color,
  ...tailwindBase,
};

export { utilities, components, theme };

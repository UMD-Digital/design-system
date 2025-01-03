import * as Tokens from '../tokens';
import { root as utilities } from '../root';
import { outputStyles as components } from './transform';

const { Font, Media } = Tokens;
const base = {
  ...Tokens,
  fontFamily: Font.family,
  fontSize: Font.size,
  fontWeight: Font.weight,
  breakpoints: Media.breakpoints,
};

const tailwindBase = Object.fromEntries(
  Object.entries(base).map(([key, value]) => [
    key.charAt(0).toLocaleLowerCase() + key.slice(1),
    value,
  ]),
);

const theme = {
  screens: Media.breakpoints,
  ...tailwindBase,
};

export { utilities, components, theme };

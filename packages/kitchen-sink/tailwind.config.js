/** @type {import('tailwindcss').Config} */

import plugin from 'tailwindcss/plugin';
import * as umdTheme from '@universityofmaryland/theme';

const {
  animatedLinks,
  breakpoints,
  captionedMedia,
  colors,
  fontFamily,
  fontSize,
  fontWeight,
  richText,
  root,
  spacing,
  screenReaderOnly,
  typography,
  skipContent,
  umdCta,
  umdLoader,
  umdFlexGrid,
  umdGrid,
  umdLinksGroup,
  umdLock,
  umdHeader,
} = umdTheme;

const theme = {
  colors,
  fontFamily,
  fontSize,
  fontWeight,
  screens: breakpoints,
  spacing,
};

const utilities = { ...root };

// The components are listed in order they should render in CSS.
const components = {
  ...skipContent,
  ...screenReaderOnly,
  ...animatedLinks,
  ...richText,
  ...typography,
  ...umdLock,
  ...umdGrid,
  ...umdFlexGrid,
  ...umdLinksGroup,
  ...umdCta,
  ...captionedMedia,
  ...umdLoader,
  ...umdHeader,
};

const plugins = [
  plugin(function ({ addUtilities, addComponents }) {
    addUtilities(utilities);
    addComponents(components);
  }),
];

const content = ['./source/**/*.{css,twig}'];

export { content, theme, plugins };

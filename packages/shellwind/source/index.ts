import plugin from 'tailwindcss/plugin';
import {
  colors,
  fontFamily,
  fontSize,
  screens,
  spacing,
  root,
  skipContent,
  animatedLinks,
  richText,
  typography,
  umdLock,
  umdGrid,
  umdFlexGrid,
  umdLinksGroup,
  umdCta,
  captionedMedia,
  umdLoader,
} from '@universityofmaryland/umd-web-configuration';

const theme = { colors, fontFamily, fontSize, screens, spacing };

const utilities = { ...root };

// // The components are listed in order they should render in CSS.
const classes = {
  ...skipContent,
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
};

const plugins = [
  plugin(function ({ addUtilities, addComponents }) {
    addUtilities(utilities);
    addComponents(classes);
  }),
];

export { theme, plugins };

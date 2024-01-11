import * as plugin from 'tailwindcss/plugin';
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

const umdUtilities = { ...root };

// // The components are listed in order they should render in CSS.
const umdComponents = {
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

const umdPlugin = plugin(function ({ addUtilities, addComponents }) {
  addUtilities(umdUtilities);
  addComponents(umdComponents);
});

const plugins = [umdPlugin];

export { theme, plugins };

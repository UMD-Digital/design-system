import plugin from 'tailwindcss/plugin';

// Tokens

import { colors } from './tokens/colors';
import { fontFamily, fontSize } from './tokens/fonts';
import { screens, spacing } from './tokens/layout';
import { root } from './dependancies/root';

// css-class based components

import { skipContent, screenReaderOnly } from './common/accessibility';
import { typography } from './common/typography';
import { animatedLinks } from './common/animated-links';
import { richText } from './common/rich-text';
import { umdFlexGrid } from './layout/umd-flex';
import { umdGrid } from './layout/umd-grid';
import { umdLock } from './layout/umd-lock';
import { umdLinksGroup } from './layout/umd-links-group';
import { umdCta } from './elements/call-to-action';
import { captionedMedia } from './elements/media-with-caption';
import { umdLoader } from './elements/loader';

const umdUtilities = { ...root };
const umdComponents = {
  ...skipContent,
  ...animatedLinks,
  ...richText,
  ...typography,
  ...umdGrid,
  ...umdLock,
  ...umdLinksGroup,
  ...umdCta,
  ...captionedMedia,
  ...umdLoader,
  ...umdFlexGrid,
};

const umdPlugin = plugin(function ({ addUtilities, addComponents }) {
  addUtilities(umdUtilities);
  addComponents(umdComponents);
});

const plugins = [umdPlugin];
const theme = { colors, fontFamily, fontSize, screens, spacing };

export {
  theme,
  plugins,
  umdUtilities,
  umdComponents,
  umdPlugin,
  root,
  colors,
  fontFamily,
  fontSize,
  screens,
  spacing,
  screenReaderOnly,
  skipContent,
  richText,
  typography,
  umdGrid,
  umdLock,
  umdLinksGroup,
  umdCta,
  captionedMedia,
  umdLoader,
  umdFlexGrid,
};

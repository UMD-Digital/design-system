/** @type {import('tailwindcss').Config} */

import plugin from 'tailwindcss/plugin';
import { colors } from '@universityofmaryland/design-system-configuration/dist/configuration/tokens/colors';
import { typography } from '@universityofmaryland/design-system-configuration/dist/configuration/common/typography';
import { umdLock } from '@universityofmaryland/design-system-configuration/dist/configuration/layout/umd-lock';

const content = ['./source/*.{css,ts}'];

const theme = {
  colors,
};

const components = {
  ...typography,
  ...umdLock,
};

const plugins = [
  plugin(function ({ addComponents }) {
    addComponents(components);
  }),
];

export { content, theme, plugins };

/** @type {import('tailwindcss').Config} */

import {
  theme,
  plugins,
} from '@universityofmaryland/design-system-configuration';

const content = ['./source/**/*.{css,ts,js}', './examples/**/*.{css}'];

export { content, theme, plugins };

/** @type {import('tailwindcss').Config} */

import {
  theme,
  plugins,
} from '@universityofmaryland/design-system-configuration';

const content = ['./source/**/*.{twig,css,ts,js}'];

export { content, theme, plugins };

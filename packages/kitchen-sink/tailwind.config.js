/** @type {import('tailwindcss').Config} */

import plugin from 'tailwindcss/plugin';
import { base, theme as umdTheme } from '@universityofmaryland/theme';

const content = ['./source/**/*.{css,twig}'];
const { root: utilities, ...styles } = umdTheme;
const tailwindTheme = { screens: base.Breakpoints, ...base };
const components = Object.values(styles).reduce(
  (arr, current) => ({ ...arr, ...current }),
  {},
);

const plugins = [
  plugin(function ({ addUtilities, addComponents }) {
    addUtilities(utilities);
    addComponents(components);
  }),
];

export { content, tailwindTheme as theme, plugins };

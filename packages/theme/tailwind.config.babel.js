/** @type {import('tailwindcss').Config} */

import { framework } from '@universityofmaryland/web-elements-styles';
import plugin from 'tailwindcss/plugin';

const content = ['./source/**/*.{css,twig}'];
const { utilities, components, theme } = framework.tailwing;

const plugins = [
  plugin(function ({ addUtilities, addComponents }) {
    addUtilities(utilities);
    addComponents(components);
  }),
];

export { content, theme, plugins };

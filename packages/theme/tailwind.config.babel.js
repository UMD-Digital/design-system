/** @type {import('tailwindcss').Config} */

import { framework } from './dist/index.js';
import plugin from 'tailwindcss/plugin';

const content = ['./source/**/*.{css,twig}'];
const { utilities, components, theme } = framework.tailwind;

const plugins = [
  plugin(function ({ addUtilities, addComponents }) {
    addUtilities(utilities);
    addComponents(components);
  }),
];

export { content, theme, plugins };

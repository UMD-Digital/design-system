/** @type {import('tailwindcss').Config} */

import plugin from 'tailwindcss/plugin';
import { base, theme as umdTheme } from './source/index';

const content = [{ raw: `<div class="uppercase"></div>` }];

const { root: utilities, ...styles } = umdTheme;

const tailwindBase = Object.fromEntries(
  Object.entries(base).map(([key, value]) => [
    key.charAt(0).toLocaleLowerCase() + key.slice(1),
    value,
  ]),
);

const theme = {
  screens: tailwindBase.breakpoints,
  ...tailwindBase,
};

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

const safelist = [{ pattern: /./ }];

export default { content, safelist, theme, plugins };

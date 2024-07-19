# Tailwind usage with the Theme

## Getting Started

Familiarize yourself with [Tailwind](https://tailwindcss.com/)

### Installation

NPM - [@universityofmaryland/theme](https://www.npmjs.com/package/@universityofmaryland/theme)

#### Tailwind Configuration Example

```js
/** @type {import('tailwindcss').Config} */

import plugin from 'tailwindcss/plugin';
import { base, theme as umdTheme } from '@universityofmaryland/theme';

const content = ['./source/**/*.{css,twig}'];
const { root: utilities, ...styles } = umdTheme;

const tailwindBase = Object.fromEntries(
  Object.entries(base).map(([key, value]) => [
    key.charAt(0).toLocaleLowerCase() + key.slice(1),
    value,
  ]),
);

const tailwindTheme = {
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

export { content, tailwindTheme as theme, plugins };
```

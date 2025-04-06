# Tailwind usage with the Theme

## Getting Started

Familiarize yourself with [Tailwind](https://tailwindcss.com/)

### Installation

NPM - [@universityofmaryland/theme](https://www.npmjs.com/package/@universityofmaryland/theme)

#### Tailwind Configuration Example

```js
/** @type {import('tailwindcss').Config} */

import { framework } from '@universityofmaryland/theme';
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
```

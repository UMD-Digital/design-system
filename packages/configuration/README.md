# UMD Design System

Staging: https://designsystem.umd-staging.com/

University of Maryland Design System by the [Office of Marketing and Communications Web Services](https://omc.umd.edu)

## Installation

```bash
yarn install @universityofmaryland/design-system-configuration
```

**Dependancies:** This package requires [tailwind](https://tailwindcss.com/), and is installed as a dependancy.

## Basic Usage

Import the configuration into your standard tailwind installation.

<!-- prettier-ignore -->
```javascript
import { theme, plugins } from '@universityofmaryland/design-system-configuration';
```

Example `tailwind.config.js` Configuration:

```javascript
/** @type {import('tailwindcss').Config} */

import {
  theme,
  plugins,
} from '@universityofmaryland/design-system-configuration';

const content = ['./source/**/*.{twig,css,ts,js}'];

export { content, theme, plugins };
```

_[Learn and remove more about tailwind configurations at tailwindcss.com](https://tailwindcss.com/docs/configuration)_

## Options

| Option        | Requirements                                                                                                                                                                                                          | Details                                                                                                                                                                                                                                         |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| theme         | Import without modification for use as tailwind's [theme options](https://tailwindcss.com/docs/theme).                                                                                                                | Contains theming options written to tailwind spcifications. Includes `colors`, `fontFamily`, `fontSize`, `screens`, and `spacing`.                                                                                                              |
| plugins       | Using this options overrides tailwinds [**plugins()**](https://tailwindcss.com/docs/plugins) function.                                                                                                                | Extend tailwind's base classes with UMDs collection of custom properties and classes for: color, fonts, Skip link, typography, rich text styles, grid, and flex grid, layout lock, Call to action links, captioned media, and a loader element. |
| umdUtilities  | Must be used in conjunction with tailwind's [**plugins()**](https://tailwindcss.com/docs/plugins) functionality, and the [`addUtilities()`](https://tailwindcss.com/docs/plugins#adding-utilities) helper function.   | Extend tailwind's untilities with UMDs collection of custom properties including theme colors, and base font styles.                                                                                                                            |
| umdComponents | Must be used in conjunction with tailwind's [**plugins()**](https://tailwindcss.com/docs/plugins) functionality, and the [`addComponents()`](https://tailwindcss.com/docs/plugins#adding-components) helper function. | Extend tailwind's "component" level classes with UMD's collection of custom classes.                                                                                                                                                            |

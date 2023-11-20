# UMD Web Configuration

Base configuration for the University of Maryland Design System by the [Office of Marketing and Communications Web Services](https://omc.umd.edu)

## Requirements

**Dependancies:** This package requires [tailwind](https://tailwindcss.com/), and is installed as a dependancy. _[Review tailwind's documentation](https://tailwindcss.com/docs/installation) for specific support with setting up tailwind._

## Installation

```bash
yarn install @universityofmaryland/umd-web-configuration
```

## Basic Usage

Import the configuration into your standard tailwind installation:

<!-- prettier-ignore -->
```javascript
import { theme, plugins } from '@universityofmaryland/umd-web-configuration';
```

Example `tailwind.config.js` Configuration:

```javascript
/** @type {import('tailwindcss').Config} */

import { theme, plugins } from '@universityofmaryland/umd-web-configuration';

const content = ['./source/**/*.{html,css,ts,js}'];

export { content, theme, plugins };
```

### Details:

- **Required: theme and plugins parameters:** To access the university's base design configuration in tailwind without any modifications, add the `theme`, and `plugins` parameters to the tailwind configuration.
- **Content:** Update the `content` parameter to match the file types in your project. Tailwind will look for and process these files during render _(The above example looks at all html, css, typescript, and javascript files in the project's **./source** folder)_.

_[Learn more about tailwind configurations at tailwindcss.com](https://tailwindcss.com/docs/configuration)_

## Options

| Option        | Requirements                                                                                                                                                                                                          | Details                                                                                                                                                                                                                                         |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| theme         | Import without modification for use as tailwind's [theme options](https://tailwindcss.com/docs/theme).                                                                                                                | Contains theming options written to tailwind spcifications. Includes `colors`, `fontFamily`, `fontSize`, `screens`, and `spacing`.                                                                                                              |
| plugins       | Using this options overrides tailwinds [**plugins()**](https://tailwindcss.com/docs/plugins) function.                                                                                                                | Extend tailwind's base classes with UMDs collection of custom properties and classes for: color, fonts, Skip link, typography, rich text styles, grid, and flex grid, layout lock, Call to action links, captioned media, and a loader element. |
| umdUtilities  | Must be used in conjunction with tailwind's [**plugins()**](https://tailwindcss.com/docs/plugins) functionality, and the [`addUtilities()`](https://tailwindcss.com/docs/plugins#adding-utilities) helper function.   | Extend tailwind's untilities with UMDs collection of custom properties including theme colors, and base font styles.                                                                                                                            |
| umdComponents | Must be used in conjunction with tailwind's [**plugins()**](https://tailwindcss.com/docs/plugins) functionality, and the [`addComponents()`](https://tailwindcss.com/docs/plugins#adding-components) helper function. | Extend tailwind's "component" level classes with UMD's collection of custom classes.                                                                                                                                                            |

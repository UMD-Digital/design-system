# Shellwind

_A configuration of the tokens and other styles from UMD Design system for use with the Tailwind CSS Framework._

## Requirements

**Dependancies:** This package is developed to work specifically with [tailwind CSS](https://tailwindcss.com/), and is installed as a dependancy. _[Review tailwind's documentation](https://tailwindcss.com/docs/installation) for specific support with setting up tailwind._

## Installation

```bash
yarn install @universityofmaryland/shellwind
```

## Basic Usage

Import the configuration into your standard tailwind installation:

<details open>
  <summary>ES Module Syntax</summary>

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

</details>

<details>
  <summary>CommonJS Syntax</summary>

<!-- prettier-ignore -->
```javascript
const { theme, plugins } = require('@universityofmaryland/umd-web-configuration');
```

Example `tailwind.config.js` Configuration:

<!-- prettier-ignore -->
```javascript
/** @type {import('tailwindcss').Config} */

const { theme, plugins } = require('@universityofmaryland/umd-web-configuration');

const content = ['./source/**/*.{html,css,ts,js}'];

module.exports = {
  content,
  theme,
  plugins,
};
```

</details>

### Details:

- **Required: theme and plugins parameters:** To access the university's system tokens and classes in tailwind, add the `theme`, and `plugins` parameters to the tailwind configuration.
- **Content:** Update the `content` parameter to match the file types in your project. Tailwind will look for and process these files during render _(The above example looks at all html, css, typescript, and javascript files in the project's **./source** folder)_.

_[Learn more about tailwind configurations at tailwindcss.com](https://tailwindcss.com/docs/configuration)_

## Options

| Option  | Requirements                                                                                           | Details                                                                                                                                                                 |
| ------- | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| theme   | Import without modification for use as tailwind's [theme options](https://tailwindcss.com/docs/theme). | Contains theming options written to tailwind spcifications. Includes `colors`, `fontFamily`, `fontSize`, `screens`, and `spacing`.                                      |
| plugins | Using this options overrides tailwinds [**plugins()**](https://tailwindcss.com/docs/plugins) function. | Extend tailwind's base classes with UMDs collection of custom properties and classes for: accessibility classes, typography, rich text styles, layouts grids, and more. |

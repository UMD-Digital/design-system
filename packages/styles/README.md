# University of Maryland Styles Library

[![Styles Version](https://img.shields.io/badge/Styles-v1.4.9-blue)](https://www.npmjs.com/package/@universityofmaryland/web-styles-library)

A comprehensive collection of JSS objects that can be used inline with JavaScript or converted to CSS strings using utility functions. This library provides the official University of Maryland design tokens and styling patterns for consistent branding across all digital properties.

## Overview

The UMD Styles Library provides consistent styling across University of Maryland web properties through a set of JavaScript Style Sheet (JSS) objects. These styles encapsulate UMD brand guidelines and provide accessibility-compliant design patterns. By using this library, developers can ensure their projects maintain visual consistency with the UMD brand while benefiting from optimized, responsive styles that work across all devices and browsers.

## Installation

```bash
# Install the library
npm install @universityofmaryland/web-styles-library

# Install peer dependencies
npm install postcss postcss-js postcss-nesting postcss-discard-duplicates

# Or using yarn
yarn add @universityofmaryland/web-styles-library
yarn add postcss postcss-js postcss-nesting postcss-discard-duplicates
```

## Usage With Framework

### Tailwind 3 - Primarly for web development

##### Does code splitting by default and provides helper css functionality

```typescript
/** @type {import('tailwindcss').Config} */

import * as Styles from '@universityofmaryland/web-styles-library';
import plugin from 'tailwindcss/plugin';

// Paths to your HTML, JS or CSS files
const content = [];

// Tailwind theme variables - accessible via theme() in CSS
// Style package tokens can be added here
const theme = {
  media: Styles.tokens.media,
};

// Tailwind plugin options - add custom utilities, components, and base styles
const plugins = [
  plugin(function ({ addUtilities, addComponents }) {
    // Add base styles - variables and reset styles
    addUtilities({
      ...Styles.root,
      ...Styles.reset,
    });
    // Add element styles - Bundled JSS objects from the styles library
    addComponents(Styles.outputStyles);
  }),
];

export { content, theme, plugins };
```

## Usage Without a Framework

### Converting Style Objects in CSS strings (stylesheet usage) - All styles

##### Pull in all styles from the package and apply them to your interface (DOM example provided)

```typescript
import * as Styles from '@universityofmaryland/web-styles-library';

// String of all styles: Parameter is the styleout provided by the library
const allStyles = await Styles.utilities.create.style.toString({
  ...Styles.outputStyles,
});

// Output

const styleSheet = document.createElement('style');
styleSheet.innerHTML = `${allStyles}`;
document.head.appendChild(styleSheet);
```

### Converting Style Objects in CSS strings (stylesheet usage) - Selection example

##### You can pick any styles objects to import (manual code splitting) - use cases for importing before and after body render

```typescript
import * as Styles from '@universityofmaryland/web-styles-library';

// String of selected styles: Parameter of selected style objects that you want to consume from the library
const exampleWithElementAndLayout =
  await Styles.utilities.create.style.toString({
    ...Styles.element,
    ...Styles.layout.grid,
  });

// Output

const styleSheet = document.createElement('style');
styleSheet.innerHTML = `${exampleWithElementAndLayout}`;
document.head.appendChild(styleSheet);
```

### Converting Style Objects in CSS strings (stylesheet usage) - Render example

##### Code splitting for load and usage

```typescript
import * as Styles from '@universityofmaryland/web-styles-library';

const fontStyles = Styles.typography.fontFace.base64fonts;

const headRenderStyles = await Styles.utilities.create.style.toString({
  ...Styles.preRender,
});

const bodyRenderStyles = await Styles.utilities.create.style.toString({
  ...Styles.postRender,
});
```

##### Code splitting for load and usage with dom

```typescript
import * as Styles from '@universityofmaryland/web-styles-library';

// Styles to load before the page renders - includes fonts in base64, variables, reset, and web component styles
Styles.preRenderCss.then((css) => {
  const styleSheet = document.createElement('style');
  const fonts = Styles.typography.fontFace.base64fonts;
  styleSheet.innerHTML = `${fonts} ${css}`;
  document.head.appendChild(styleSheet);
});

// Styles to load after the body - classes for layout and elements
Styles.postRenderCss.then((css) => {
  const styleSheet = document.createElement('style');
  styleSheet.innerHTML = `${css}`;
  document.head.appendChild(styleSheet);
});
```

### Converting Style Objects to CSS Variables

##### Import CSS variables for usage (included by default when importing preRender styles)

```typescript
import * as Styles from '@universityofmaryland/web-styles-library';

Styles.utilities.dom.tokens(Styles.variables);

// Output
<html style="--serif: 'Crimson Pro', Georgia, serif;">

.element {
  font-family: var(--serif)
}
```

### Converting Style Objects to Media Queries (included by default when importing preRender styles)

##### Media query usage with style queries - boolean values provided on root

```css
.element {
  display: none;

  @container style(--isMediaTablet: true) {
    display: block;
  }
}
```

## Usage with modern Javascript Frameworks with Server rendering

### Importing Styles to Reference

```typescript
// Import specific style modules
import * as Styles from '@universityofmaryland/web-styles-library';

const fadeInLine = Styles.animation.line.fadeInSimpleDark;

// Ouput
{
    "className": "umd-fadein-simple-dark",
    "position": "relative",
    "textDecoration": "none",
    "backgroundImage": "linear-gradient(#FFFFFF, #FFFFFF)",
    "backgroundPosition": "left calc(100% - 1px)",
    "backgroundRepeat": "no-repeat",
    "backgroundSize": "100% 1px",
    "color": "#FFFFFF",
    "transition": "color 0.5s, background-image 0.5s, background-position 0.5s",
    "&:hover, &:focus": {
        "backgroundImage": "linear-gradient(#FFD200, #FFD200)",
        "backgroundPosition": "left calc(100%)",
        "color": "#FFFFFF",
        "textDecoration": "none"
    }
}
```

### Converting Reference to style

```typescript
// Import specific style modules
import * as Styles from '@universityofmaryland/web-styles-library';

const fadeInLine = Styles.utilities.transform.jss.convertToClassSelectorCss({
  Styles.animation.line.fadeInSimpleDark,
);

// Ouput
.umd-fadein-simple-dark {
  position: relative;
  text-decoration: none;
  background-image: linear-gradient(#FFFFFF, #FFFFFF);
  background-position: left calc(100% - 1px);
  background-repeat: no-repeat;
  background-size: 100% 1px;
  color: #FFFFFF;
  transition: color 0.5s, background-image 0.5s, background-position 0.5s;
}
.umd-fadein-simple-dark:hover, .umd-fadein-simple-dark:focus {
  background-image: linear-gradient(#FFD200, #FFD200);
  background-position: left calc(100%);
  color: #FFFFFF;
  text-decoration: none;
}
```

## Available Style Modules

The library includes several style modules organized by functionality:

- **Accessibility**: Screen reader utilities and skip navigation
- **Animation**: Line effects, loaders, transitions, and nested element animations
- **Layout**: Flexible grid system with responsive behavior
- **Root**: Default styles for reset and variables
- **Tokens**: Official UMD brand colors, spacing, breakpoints, and fonts
- **Typography**: Text styles, fonts, and typographic scales
- **Web Components**: Default styles from all Web Components
- **Utilities**: Helper functions to convert JSS and CSS

Each module contains namespaces with specific style variables. For example:

- `color.red`
- `spacing.sm`
- `typography.sans.larger`
- `animation.line.fadeUnderRed`
- `accessibility.screenReader.only`

## Documentation

For detailed documentation of all available modules, namespaces, and style variables, see:

- [Complete Style Modules Documentation](https://umd-digital.github.io/design-system/styles/modules.html)
- [Color Variables](https://umd-digital.github.io/design-system/styles/variables/token.color.html)
- [Typography System](https://umd-digital.github.io/design-system/styles/modules/typography.html)
- [Layout System](https://umd-digital.github.io/design-system/styles/modules/layout.html)
- [Element Animation](https://umd-digital.github.io/design-system/styles/modules/animation.html)

## Accessibility

All styles in this library are designed with accessibility in mind:

- Color combinations meet WCAG 2.1 AA contrast requirements
- Typography sizes and spacing support readability
- Focus states are clearly visible
- Animation options include reduced-motion preferences

## Contributing

For contribution guidelines, please refer to the main repository README.

#### Testing

The library uses Jest for unit testing. To run tests:

```bash
# Run all tests
npm run test

# Run tests in watch mode during development
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

#### Release Process

The release process requires all tests to pass before publishing:

```bash
npm run release
```

This will:

1. Run all tests (and abort if any tests fail)
2. Clean the distribution directory
3. Build the project
4. Publish the package

## License

This project is licensed under the University of Maryland license.

# University of Maryland Styles Library

[![Styles Version](https://img.shields.io/badge/Styles-v1.2.4-blue)](https://www.npmjs.com/package/@universityofmaryland/web-styles-library)

A comprehensive collection of JSS objects that can be used inline with JavaScript or converted to CSS strings using utility functions. This library provides the official University of Maryland design tokens and styling patterns for consistent branding across all digital properties.

## Overview

The UMD Styles Library provides consistent styling across University of Maryland web properties through a set of JavaScript Style Sheet (JSS) objects. These styles encapsulate UMD brand guidelines and provide accessibility-compliant design patterns. By using this library, developers can ensure their projects maintain visual consistency with the UMD brand while benefiting from optimized, responsive styles that work across all devices and browsers.

## Installation

```bash
npm install @universityofmaryland/web-styles-library
# or
yarn add @universityofmaryland/web-styles-library
```

## Usage

### In conjection with a framework - Tailwind 3

```typescript
/** @type {import('tailwindcss').Config} */

import * as Styles from '@universityofmaryland/web-styles-library';
import plugin from 'tailwindcss/plugin';

const content = ['./source/**/*.{css,twig}'];

const { token, root: utilities, outputStyles: components } = Styles;
const { color, font, media } = token;
const base = {
  ...token,
  fontFamily: font.family,
  fontSize: font.size,
  fontWeight: font.weight,
  breakpoints: media.breakpoints,
};

const tailwindBase = Object.fromEntries(
  Object.entries(base).map(([key, value]) => [
    key.charAt(0).toLocaleLowerCase() + key.slice(1),
    value,
  ]),
);

const theme = {
  screens: media.breakpoints,
  queries: media.breakpoints,
  colors: color,
  ...tailwindBase,
};

const plugins = [
  plugin(function ({ addUtilities, addComponents }) {
    addUtilities(utilities);
    addComponents(components);
  }),
];

export { content, theme, plugins };
```

### Converting Style Objects in CSS strings (stylesheet usage) - All styles

```typescript
import * as Styles from '@universityofmaryland/web-styles-library';

// String of all styles: Parameter is the styleout provided by the library
const allStyles = await Styles.utilities.create.styleSheetString({
  ...Styles.outputStyles,
});

// Output

const styleSheet = document.createElement('style');
styleSheet.innerHTML = `${allStyles}`;
document.head.appendChild(styleSheet);
```

### Converting Style Objects in CSS strings (stylesheet usage) - Selection example

```typescript
import * as Styles from '@universityofmaryland/web-styles-library';

// String of selected styles: Parameter of selected style objects that you want to consume from the library
const exampleWithElementAndLayout =
  await Styles.utilities.create.styleSheetString({
    ...Styles.utilities.transform.processNestedObjects(Styles.element),
    ...Styles.utilities.transform.processNestedObjects(Styles.layout),
  });

// Output

const styleSheet = document.createElement('style');
styleSheet.innerHTML = `${exampleWithElementAndLayout}`;
document.head.appendChild(styleSheet);
```

### Importing Styles via JS for Advanced Purposes

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

### Converting to CSS String for use in CSS Modules (frameworks like Next.js)

```typescript
import * as Styles from '@universityofmaryland/web-styles-library';

const fadeInLine = Styles.utilities.transform.convertToCSS(
  Styles.animation.line.fadeInSimpleDark,
);

// Output
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
.umd-fadein-simple-dark&:hover, &:focus {
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
- **Colors**: Official UMD brand colors, accents, and accessibility-safe palettes
- **Typography**: Text styles, fonts, and typographic scales
- **Spacing**: Consistent spacing units and layout helpers
- **Breakpoints**: Responsive design breakpoints for all screen sizes
- **Grid**: Flexible grid system with responsive behavior
- **Effects**: Shadows, highlights, and other visual effects
- **Forms**: Form element styling with validation states
- **Media**: Image, video, and other media styling

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

# University of Maryland Styles Library

[![Styles Version](https://img.shields.io/badge/Styles-v1.1.1-blue)](https://www.npmjs.com/package/@universityofmaryland/web-styles-library)

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

### Importing Styles

```typescript
// Import specific style modules
import {
  animation,
  accessibility,
} from '@universityofmaryland/web-styles-library';

// Or import specific namespaces
import { line } from '@universityofmaryland/web-styles-library/animation';
import { screenReader } from '@universityofmaryland/web-styles-library/accessibility';
```

### Using with JavaScript

```typescript
// Apply styles directly in JavaScript
animation.line.fadeUnderRed.forEach((prop) => {
  element.style = prop;
});

// Or with a framework like React
const buttonStyle = {
  ...animation.transition.fadeInFromBottom,
};
```

### Converting to CSS String

```typescript
import { convertToCSS } from '@universityofmaryland/web-styles-library/utilities/transform';

const css = convertToCSS(animation.loader.dots);
// Use in stylesheet or style tag
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

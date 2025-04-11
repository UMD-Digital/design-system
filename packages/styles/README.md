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
element.style = animation.line.fadeUnderRed;

// Or with a framework like React
const buttonStyle = {
  ...animation.transition.fadeInFromBottom,
};
```

### Converting to CSS String

```typescript
import { convertToCSS } from '@universityofmaryland/web-styles-library/utils';

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

- `animation.line.fadeUnderRed`
- `accessibility.screenReader.only`
- `colors.brand.primary`
- `typography.headers.h1`
- `spacing.units.medium`

## Documentation

For detailed documentation of all available modules, namespaces, and style variables, see:

- [Complete Style Modules Documentation](https://umd-digital.github.io/design-system/styles/modules.html)
- [Color Variables](https://umd-digital.github.io/design-system/styles/colors.html)
- [Typography System](https://umd-digital.github.io/design-system/styles/typography.html)
- [Animation Library](https://umd-digital.github.io/design-system/styles/animations.html)

## Integration with Other UMD Libraries

This library is designed to work seamlessly with other UMD design system packages:

```typescript
import * as Styles from '@universityofmaryland/web-styles-library';
import * as Elements from '@universityofmaryland/web-elements-library';

// Create an element with official UMD styling
const button = Elements.Atomic.buttons.primary({
  text: 'Learn More',
  styles: {
    ...Styles.typography.buttons.primary,
    ...Styles.colors.buttons.primary,
    ...Styles.animation.hover.grow
  }
});
```

## Accessibility

All styles in this library are designed with accessibility in mind:
- Color combinations meet WCAG 2.1 AA contrast requirements
- Typography sizes and spacing support readability
- Focus states are clearly visible
- Animation options include reduced-motion preferences

## Contributing

For contribution guidelines, please refer to the main repository README.

## License

This project is licensed under the University of Maryland license.

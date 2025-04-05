**umd-styles-library**

***

# University of Maryland Styles Library

A collection of JSS objects that can be used inline with JavaScript or converted to CSS strings using utility functions.

## Overview

The UMD Styles Library provides consistent styling across University of Maryland web properties through a set of JavaScript Style Sheet (JSS) objects. These styles encapsulate UMD brand guidelines and provide accessibility-compliant design patterns.

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

Each module contains namespaces with specific style variables. For example:

- `animation.line.fadeUnderRed`
- `accessibility.screenReader.only`

## Documentation

For detailed documentation of all available modules, namespaces, and style variables, see:

[Modules Documentation](modules.md)

## Contributing

For contribution guidelines, please refer to the main repository README.

## License

This project is licensed under the University of Maryland license.

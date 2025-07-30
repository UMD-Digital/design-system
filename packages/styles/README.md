# University of Maryland Styles Library

[![Styles Version](https://img.shields.io/badge/Styles-v1.5.0-blue)](https://www.npmjs.com/package/@universityofmaryland/web-styles-library)

The foundation of the UMD Design System, providing design tokens, CSS utilities, and styling patterns that ensure consistent, accessible, and brand-compliant University of Maryland digital experiences.

## Overview

The UMD Styles Library is the cornerstone of visual consistency across all University of Maryland web properties. It provides a comprehensive collection of design tokens (colors, typography, spacing), utility classes, and CSS-in-JS objects that implement official UMD brand guidelines. This package serves as the single source of truth for styling, enabling developers to build interfaces that are automatically consistent, accessible, and responsive.

## Installation

```bash
# Using npm
npm install @universityofmaryland/web-styles-library

# Using yarn
yarn add @universityofmaryland/web-styles-library
```

### Peer Dependencies

For CSS transformation features:

```bash
npm install postcss postcss-js postcss-nesting postcss-discard-duplicates
```

## Quick Start

### Using with Tailwind CSS

```javascript
/** @type {import('tailwindcss').Config} */
import * as Styles from '@universityofmaryland/web-styles-library';
import plugin from 'tailwindcss/plugin';

const { token, root: utilities, outputStyles: components } = Styles;

export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: token.color,
      spacing: token.spacing,
      fontFamily: token.font.family,
    },
  },
  plugins: [
    plugin(({ addUtilities, addComponents }) => {
      addUtilities(utilities);
      addComponents(components);
    }),
  ],
};
```

### Standalone CSS Generation

```javascript
import * as Styles from '@universityofmaryland/web-styles-library';

// Pre-render CSS (fonts, variables, resets)
Styles.preRenderCss.then((css) => {
  const style = document.createElement('style');
  style.textContent = `${Styles.typography.fontFace.base64fonts} ${css}`;
  document.head.appendChild(style);
});

// Post-render CSS (utilities and components)
Styles.postRenderCss.then((css) => {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
});
```

## Core Features

### Design Tokens

Official UMD brand values accessible as JavaScript objects:

```javascript
import { token } from '@universityofmaryland/web-styles-library';

// Colors
token.color.red; // #e21833
token.color.gold; // #FFD200
token.color.black; // #000000

// Spacing
token.spacing.sm; // 0.5rem
token.spacing.md; // 1rem
token.spacing.lg; // 1.5rem

// Typography
token.font.family.sans; // 'Helvetica Neue', Helvetica, Arial, sans-serif
token.font.size.base; // 1rem
token.font.weight.bold; // 700

// Breakpoints
token.media.breakpoints.tablet; // 768px
token.media.breakpoints.desktop; // 1024px
```

### Utility Classes

Pre-built utility classes for common patterns:

```css
/* Layout spacing */
.umd-layout-space-vertical-landing
.umd-layout-space-horizontal-larger

/* Grid systems */
.umd-grid-gap-three
.umd-grid-gap-masonry

/* Typography */
.umd-sans-largest-uppercase
.umd-text-rich-simple-large

/* Backgrounds */
.umd-background-quarter-light
.umd-background-full-dark;
```

### CSS-in-JS Objects

All styles are available as JavaScript objects:

```javascript
import {
  animation,
  element,
  layout,
} from '@universityofmaryland/web-styles-library';

// Animation utilities
const fadeIn = animation.line.fadeInSimpleDark;
// Returns: { className: 'umd-fadein-simple-dark', ...styles }

// Element styles
const primaryButton = element.action.primary.normal;

// Layout patterns
const gridThree = layout.grid.columnsThree;
```

## Integration with Other Packages

### Components Package Integration

The Styles Library provides all visual styling for web components:

```html
<!-- Components use styles automatically -->
<umd-element-card data-theme="dark">
  <!-- Styled by the styles package -->
</umd-element-card>

<!-- Combine with utility classes -->
<div class="umd-layout-space-vertical-landing">
  <umd-element-hero><!-- content --></umd-element-hero>
</div>
```

### Elements Package Support

Elements rely on styles for all visual properties:

```javascript
import { Composite } from '@universityofmaryland/web-elements-library';
// Elements automatically include necessary styles
```

### Feeds Package Styling

Feed components inherit consistent styling:

```javascript
import { news } from '@universityofmaryland/web-feeds-library';
// Feeds use grid and card styles automatically
```

## Available Style Modules

### Core Modules

- **token** - Design tokens (colors, spacing, typography, media queries)
- **root** - CSS reset and variables
- **typography** - Font faces, sizes, and text styles
- **layout** - Grid systems, spacing, alignment
- **element** - Component-specific styles
- **animation** - Transitions and animations
- **accessibility** - Screen reader and a11y utilities

### Utility Modules

- **utilities.transform** - JSS to CSS conversion
- **utilities.create** - Style generation helpers
- **utilities.dom** - DOM manipulation utilities

## Common Use Cases

### Setting Up Base Styles

```javascript
import * as Styles from '@universityofmaryland/web-styles-library';

// Option 1: Use pre-built bundles
async function loadStyles() {
  const preRender = await Styles.preRenderCss;
  const postRender = await Styles.postRenderCss;

  // Apply styles to document
  const fonts = Styles.typography.fontFace.base64fonts;
  document.head.insertAdjacentHTML(
    'beforeend',
    `<style>${fonts} ${preRender}</style>`,
  );

  // After body renders
  document.head.insertAdjacentHTML('beforeend', `<style>${postRender}</style>`);
}

// Option 2: Select specific styles
const selectedStyles = await Styles.utilities.create.style.toString({
  ...Styles.layout.grid,
  ...Styles.element.action,
  ...Styles.typography.sans,
});
```

### Using Design Tokens

```javascript
// In JavaScript
const theme = {
  primaryColor: Styles.token.color.red,
  secondaryColor: Styles.token.color.gold,
  baseSpacing: Styles.token.spacing.md,
};

// As CSS variables
Styles.utilities.dom.tokens(Styles.variables);
// Creates: --color-red: #e21833; etc.
```

### Responsive Design

```javascript
// Media query tokens
const { breakpoints } = Styles.token.media;

// Use in CSS-in-JS
const responsiveCard = {
  padding: Styles.token.spacing.md,
  [`@media (min-width: ${breakpoints.tablet})`]: {
    padding: Styles.token.spacing.lg,
  },
  [`@media (min-width: ${breakpoints.desktop})`]: {
    padding: Styles.token.spacing.xl,
  },
};
```

### Tailwind Integration

See our [Tailwind Integration Guide](./tailwind.html) for detailed setup instructions.

## TypeScript Support

Full TypeScript support with type definitions:

```typescript
import type {
  JssObject,
  JssEntry,
} from '@universityofmaryland/web-styles-library';

// Type-safe style objects
const customStyle: JssObject = {
  className: 'my-custom-class',
  color: Styles.token.color.red,
  padding: Styles.token.spacing.md,
};
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Considerations

- **Tree-shakeable** - Import only what you need
- **CSS Variables** - Runtime theming support
- **Optimized bundles** - Pre/post render splitting
- **Cached transforms** - Efficient CSS generation

## Accessibility

All styles follow WCAG 2.1 AA guidelines:

- Color contrast ratios meet standards
- Focus states are clearly visible
- Typography supports readability
- Reduced motion preferences respected

## Documentation

- **[Complete Style Reference](./)** - All modules and utilities
- **[Design Tokens](./modules/token.html)** - Colors, spacing, typography
- **[Tailwind Guide](./tailwind.html)** - Tailwind CSS integration
- **[Layout System](./modules/layout.html)** - Grid and spacing utilities

## Testing

```bash
# Run tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

## Contributing

See the [main repository](https://github.com/umd-digital/design-system) for contribution guidelines.

## License

University of Maryland

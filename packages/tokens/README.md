# UMD Design System - Tokens

Design tokens for the University of Maryland Design System. This package provides the foundational design values (colors, typography, spacing, breakpoints) as a single source of truth.

[![Version](https://img.shields.io/badge/Tokens-v1.0.0-blue)](https://www.npmjs.com/package/@universityofmaryland/web-token-library)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Overview

The tokens package serves as the **foundation** for the entire UMD Design System, establishing design values that cascade through all other packages. It is designed to support a future Figma-to-code pipeline for automated design token synchronization.

**Key Features:**
- 🎨 Comprehensive color system with semantic naming
- 📐 Spacing scale with consistent increments
- 🔤 Typography tokens (font families, sizes, weights)
- 📱 Responsive breakpoints and media queries
- 🌳 Tree-shakable with selective imports
- 📦 Zero runtime dependencies
- 🔷 Full TypeScript support

## Installation

```bash
npm install @universityofmaryland/web-token-library
```

## Quick Start

```typescript
// Import all tokens
import * as token from '@universityofmaryland/web-token-library';

// Use in your styles
const myStyles = {
  color: token.color.red,
  padding: token.spacing.md,
  fontFamily: token.font.family.sans,
  fontSize: token.font.size.lg
};
```

## Available Tokens

### Color Tokens

```typescript
import { color } from '@universityofmaryland/web-token-library';

// Brand colors
color.red        // '#E21833' - UMD primary red
color.gold       // '#FFD200' - UMD gold
color.blue       // '#2F7EDA'
color.green      // '#008000'

// Neutral colors
color.white      // '#FFFFFF'
color.black      // '#000000'

// Gray scale
color.gray.darker     // '#242424'
color.gray.dark       // '#454545'
color.gray.mediumAA   // '#757575' - WCAG AA compliant
color.gray.medium     // '#7F7F7F'
color.gray.light      // '#E6E6E6'
color.gray.lighter    // '#F1F1F1'
color.gray.lightest   // '#FAFAFA'
```

### Spacing Tokens

```typescript
import { spacing } from '@universityofmaryland/web-token-library';

spacing.min    // '8px'
spacing.xs     // '12px'
spacing.sm     // '16px'
spacing.md     // '24px'
spacing.lg     // '32px'
spacing.xl     // '40px'
spacing['2xl'] // '48px'
spacing['3xl'] // '56px'
spacing['4xl'] // '64px'
spacing.max    // '120px'

// Max width constraints
spacing.maxWidth.smallest  // '800px'
spacing.maxWidth.small     // '992px'
spacing.maxWidth.normal    // '1280px'
spacing.maxWidth.large     // '1400px'
spacing.maxWidth.larger    // '1600px'
```

### Font Tokens

```typescript
import * as token from '@universityofmaryland/web-token-library';

// Font families
token.font.family.sans      // "'Interstate', Helvetica, Arial, Verdana, sans-serif"
token.font.family.serif     // "'Crimson Pro', Georgia, serif"
token.font.family.campaign  // "'Barlow Condensed', Arial Narrow, sans-serif"
token.font.family.mono      // 'monospace'

// Font sizes
token.font.size.min     // '12px'
token.font.size.sm      // '14px'
token.font.size.base    // '16px'
token.font.size.lg      // '18px'
token.font.size['4xl']  // '32px'
token.font.size.max     // '120px'

// Font weights
token.font.weight.normal    // '400'
token.font.weight.medium    // '500'
token.font.weight.semiBold  // '600'
token.font.weight.bold      // '700'
```

### Media Query Tokens

```typescript
import * as token from '@universityofmaryland/web-token-library';

// Breakpoint values
token.media.breakpoints.small.min    // '320px'
token.media.breakpoints.tablet.min   // '768px'
token.media.breakpoints.desktop.min  // '1024px'

// Media query strings (use in CSS-in-JS)
token.media.queries.desktop.min      // 'min-width: 1024px'
token.media.queries.tablet.max       // 'max-width: 1023px'

// Example usage in JSS
const styles = {
  padding: token.spacing.sm,
  [`@media (${token.media.queries.desktop.min})`]: {
    padding: token.spacing.lg
  }
};

// Conditional media variables (for container queries)
token.media.conditionals  // CSS custom properties for breakpoint detection
```

## Import Patterns

### Namespace Import (Recommended)

```typescript
import * as token from '@universityofmaryland/web-token-library';

const styles = {
  color: token.color.red,
  padding: token.spacing.md
};
```

### Named Imports

```typescript
import { color, spacing, font } from '@universityofmaryland/web-token-library';

const styles = {
  color: color.red,
  padding: spacing.md,
  fontFamily: font.family.sans
};
```

### Category-Specific Imports (Best for Tree-Shaking)

```typescript
import { color } from '@universityofmaryland/web-token-library/color';
import * as media from '@universityofmaryland/web-token-library/media';

const myColor = color.red;
const desktopQuery = media.queries.desktop.min;
```

## CDN Usage

For non-build-tool environments, load the UMD bundle:

```html
<script src="https://cdn.jsdelivr.net/npm/@universityofmaryland/web-token-library/dist/cdn.js"></script>
<script>
  const { color, spacing, font, media } = window.UniversityOfMarylandWebTokenLibrary;

  console.log(color.red);      // '#E21833'
  console.log(spacing.md);     // '24px'
  console.log(font.size.lg);   // '18px'
</script>
```

## TypeScript Support

Full TypeScript definitions are included:

```typescript
import type { ColorScale, BaseColors } from '@universityofmaryland/web-token-library/color';

const customColors: ColorScale = {
  // Type-safe color scale
};
```

## Browser Support

- Modern browsers (ES2020+)
- Node.js 14+
- Tree-shaking compatible with Webpack, Rollup, Vite

## Future: Figma Integration

This package is designed as the foundation for an automated Figma-to-code pipeline (Phase 2+). See [plan.md](plan.md) for the complete roadmap including:
- Automated token extraction from Figma
- Synchronization workflows
- Version control for design updates
- Token validation and testing

## Related Packages

- **[@universityofmaryland/web-styles-library](../styles)**: JSS objects and style utilities using these tokens
- **[@universityofmaryland/web-utilities-library](../utilities)**: Utility functions including token transformation helpers
- **[@universityofmaryland/web-components-library](../components)**: Web components built with these design tokens

## Documentation

- [Full API Documentation](https://umd-digital.github.io/design-system/tokens)
- [Design System Website](https://designsystem.umd.edu)
- [Figma Integration Roadmap](plan.md)

## Contributing

Tokens are currently manually maintained. See [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

## License

MIT © University of Maryland

# CLAUDE.md - Styles Package

## Package Overview

The **Styles Package** (`@universityofmaryland/web-styles-library`) provides JSS (JavaScript Style Sheets) objects, design tokens, and CSS utilities for the UMD Design System. All styles are JavaScript objects that can be transformed to CSS.

**Version**: 1.6.9
**Dependencies**: `postcss`, `postcss-discard-duplicates`, `postcss-js`, `postcss-nesting`

## Build System

### Vite Configuration

- **Builder**: Vite with TypeScript
- **Output Formats**: ES Modules (`.mjs`) and CommonJS (`.js`)
- **External Dependencies**: All `@universityofmaryland/*` packages
- **Special Build**: CDN bundle (IIFE format) via `build:cdn` script
- **Type Declarations**: Generated with `vite-plugin-dts`
- **Module Preservation**: `preserveModules: true` for granular imports

### Build Commands

```bash
npm run build      # Main build + CDN build
npm run build:cdn  # CDN-only build (IIFE format)
npm run dev        # Watch mode
npm run clean      # Remove dist
npm test          # Run all tests
```

### Special Builds

The styles package creates TWO builds:

1. **Module Build** (`npm run build`): Code-split ES/CJS modules
2. **CDN Build** (`BUILD_CDN=true`): Single-file IIFE bundle for `<script>` tags

## Package Structure

### Source Organization

```
source/
├── accessibility/  # Accessibility-focused styles
├── animation/      # Animation keyframes and utilities
├── element/        # Element-specific styles (buttons, forms, etc.)
├── layout/         # Layout utilities (grid, flex, etc.)
├── token/          # Design tokens (colors, spacing, fonts, media)
├── typography/     # Typography styles and font faces
├── utilities/      # Style transformation utilities
└── web-components/ # Web component-specific styles
```

### Export Pattern

```typescript
// Namespace import (recommended for JSS modules)
import * as token from '@universityofmaryland/web-styles-library/token';
import * as layout from '@universityofmaryland/web-styles-library/layout';

// Named exports from main
import { token, layout } from '@universityofmaryland/web-styles-library';

// Use tokens
const myStyles = {
  color: token.color.red,
  padding: token.spacing.md
};
```

## package.json Exports

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    },
    "./token": {
      "types": "./dist/token.d.ts",
      "import": "./dist/token.mjs",
      "require": "./dist/token.js"
    }
    // ... other categories
  }
}
```

## JSS Pattern

All styles are JavaScript objects:

```typescript
export const myStyle = {
  className: 'my-class',
  color: 'red',
  '&:hover': { color: 'blue' }
};
```

## Design Tokens

Centralized design system values:

### Token Categories
- **Colors**: `token.color.red`, `token.color.gray.dark`
- **Spacing**: `token.spacing.sm`, `token.spacing.maxWidth.small`
- **Typography**: `token.font.family.sans`, `token.font.size.lg`
- **Media Queries**: `token.media.min.desktop` (Mobile: 0-767px, Tablet: 768-1023px, Desktop: 1024px+)

## CDN Build

The CDN build bundles everything into a single IIFE file:

```html
<script src="https://cdn.example.com/styles/cdn.js"></script>
<script>
  const { token, layout } = window.Styles;
</script>
```

**Use Case**: Quick prototyping or legacy integrations without build tools

## Testing

- **Framework**: Jest with TypeScript
- **Location**: `source/__tests__/`
- **Test Pattern**: Snapshot testing for CSS output consistency

## Best Practices

1. **Use Namespace Imports**: JSS modules export objects, not primitives
   - ✅ `import * as token from '.../ token'`
   - ❌ `import token from '.../token'`  (no default export)

2. **Design Tokens First**: Use tokens before custom values
3. **Transform Before Use**: Convert JSS to CSS using utilities package
4. **Type Safety**: Leverage TypeScript for autocomplete

## Build Output

### Module Build
- `dist/index.{js,mjs,d.ts}` - Main export
- `dist/{category}.{js,mjs,d.ts}` - Category exports
- `dist/{category}/{module}.{js,mjs,d.ts}` - Individual modules

### CDN Build
- `dist/cdn.js` - Single IIFE bundle (no externals)

## Utilities Integration

The styles package provides JSS objects. Use the utilities package to convert them:

```typescript
import * as token from '@universityofmaryland/web-styles-library/token';
import { convertJSSObjectToStyles } from '@universityofmaryland/web-utilities-library/styles';

const css = convertJSSObjectToStyles({
  styleObj: {
    '.my-class': {
      color: token.color.red
    }
  }
});
```

## Notes

- JSS enables dynamic, type-safe styling
- All values are JavaScript - no CSS parsing needed
- PostCSS processes output for nesting and optimization
- CDN build is self-contained with no external dependencies

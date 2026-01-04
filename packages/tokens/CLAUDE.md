# CLAUDE.md - Tokens Package

## Package Overview

The **Tokens Package** (`@universityofmaryland/web-token-library`) provides design tokens as the foundational layer of the UMD Design System. This package establishes a single source of truth for design values that cascade through all other packages.

**Version**: 1.0.0
**Dependencies**: None (zero runtime dependencies)

## Purpose and Vision

### Current State (Phase 1)
A standalone package containing manually managed design tokens extracted from the styles package.

### Future State (Phase 2+)
Foundation for an automated Figma-to-code pipeline with:
- Automated token extraction from Figma Design Files
- Synchronization workflows for design updates
- Version control and change tracking
- Design-to-code validation

See [plan.md](plan.md) for complete Figma integration roadmap.

## Build System

### Vite Configuration

The tokens package uses **two build modes**:

1. **Module Build** (`npm run build`):
   - Formats: ES Modules only (`.js`) - No CommonJS support
   - Export Style: Named exports only - No default exports
   - Code-split by token category
   - Preserves module structure
   - Type declarations via `vite-plugin-dts`

2. **CDN Build** (`BUILD_CDN=true npm run build:cdn`):
   - Format: UMD (browser globals)
   - Single-file bundle: `dist/cdn.js`
   - Minified for production
   - No external dependencies

### Build Commands

```bash
npm run build          # Module build (ES only)
npm run build:cdn      # CDN build (UMD)
npm run dev            # Watch mode
npm run clean          # Remove dist
npm test               # Run Jest tests
npm run test:coverage  # With coverage report
npm run docs           # Generate TypeDoc documentation
```

## Package Structure

### Token Categories

```
source/
├── index.ts     # Main export aggregating all tokens
├── color.ts     # Color system tokens
├── font.ts      # Typography tokens
├── media.ts     # Breakpoint and media query tokens
└── spacing.ts   # Spacing scale and max-width tokens
```

### Export Pattern

All tokens use **named exports only** (no default exports):

```typescript
// index.ts pattern
import { color } from './color';
import { spacing } from './spacing';

export * as media from './media';  // Namespace export
export * as font from './font';    // Namespace export
export { color };                  // Named export
export { spacing };                // Named export
```

## Token Organization

### Color Tokens (`color.ts`)

```typescript
const colorScale = { /* shade variations */ };
const baseColors = { white, black };
export const color = { red, blue, gold, gray: {...}, ... } as const;
```

**Key Exports:**
- `color.red`, `color.gold`, `color.blue` - Brand colors
- `color.gray.darker`, `color.gray.mediumAA` - Gray scale
- `color.white`, `color.black` - Base colors
- `colorScale`, `baseColors` - Type utilities

### Spacing Tokens (`spacing.ts`)

```typescript
const spacingScale = { 0, 1, 2, 3, 4, 6, 8, ... };
export const maxWidth = { smallest, small, normal, large, larger };
export const spacing = { min, xs, sm, md, lg, xl, ..., maxWidth } as const;
```

**Key Exports:**
- `spacing.min` through `spacing.max` - Spacing scale
- `spacing.maxWidth.*` - Container max-width constraints
- `spacingScale` - Raw scale values

### Font Tokens (`font.ts`)

```typescript
export const size = { min, sm, base, lg, xl, ..., max };
export const weight = { thin, normal, medium, semiBold, bold, ... };
export const family = { sans, serif, campaign, mono };
```

**Key Exports:**
- `font.size.*` - Font size scale (12px - 120px)
- `font.weight.*` - Font weight values (100 - 950)
- `font.family.*` - Font stack definitions

### Media Tokens (`media.ts`)

```typescript
export const breakpointValues = { small, medium, large, tablet, desktop, ... };
export const breakpoints = { /* with 'px' units */ };
export const queries = { /* complete media query strings */ };
export const conditionals = { /* CSS custom properties */ };
```

**Key Exports:**
- `media.breakpointValues.*` - Numeric values
- `media.breakpoints.*` - Values with 'px'
- `media.queries.*` - Ready-to-use media query strings
- `media.conditionals` - Container query helpers

## Usage Patterns

### In Styles Package (Internal)

```typescript
// AFTER migration
import { color, spacing } from '@universityofmaryland/web-token-library';
import * as media from '@universityofmaryland/web-token-library/media';

const myStyle = {
  color: color.red,
  padding: spacing.md,
  [`@media (${media.queries.desktop.min})`]: {
    padding: spacing.lg
  }
};
```

### In Elements/Feeds Packages

```typescript
// AFTER migration
import * as token from '@universityofmaryland/web-token-library';

const elementStyles = {
  color: token.color.red,
  fontFamily: token.font.family.sans,
  fontSize: token.font.size.lg
};
```

### In Consumer Applications

```typescript
// New projects
import { color, spacing } from '@universityofmaryland/web-token-library';

// Or category-specific
import { color } from '@universityofmaryland/web-token-library/color';
```

## Testing

- **Framework**: Jest with TypeScript
- **Location**: `source/__tests__/`
- **Coverage Target**: 90%+
- **Test Focus**:
  - Token export structure
  - Type definitions
  - Value consistency
  - CDN bundle validation

### Test Examples

```typescript
// __tests__/color.test.ts
import { color } from '../color';

describe('Color Tokens', () => {
  it('exports UMD brand red', () => {
    expect(color.red).toBe('#E21833');
  });

  it('provides accessible gray scale', () => {
    expect(color.gray.mediumAA).toBe('#757575');
  });
});
```

## Build Output

### Module Build (`dist/`)
- `index.{js,mjs,d.ts}` - Main aggregated export
- `color.{js,mjs,d.ts}` - Color tokens
- `font.{js,mjs,d.ts}` - Font tokens
- `media.{js,mjs,d.ts}` - Media tokens
- `spacing.{js,mjs,d.ts}` - Spacing tokens
- `*.map` - Source maps for all files

### CDN Build (`dist/cdn.js`)
- Single IIFE bundle
- Minified (~5KB gzipped estimate)
- Global: `window.UniversityOfMarylandWebTokenLibrary`
- No external dependencies

## package.json Exports

```json
{
  "type": "module",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    },
    "./color": {
      "types": "./dist/color.d.ts",
      "import": "./dist/color.js"
    },
    "./font": { /* ... */ },
    "./media": { /* ... */ },
    "./spacing": { /* ... */ }
  }
}
```

**Note**: CommonJS (`require`) is not supported. Use ES module `import` only.

## Best Practices

1. **Import Pattern**: Use namespace imports for token module
   - ✅ `import * as token from '@universityofmaryland/web-token-library'`
   - ✅ `import { color, spacing } from '@universityofmaryland/web-token-library'`
   - ✅ `import * as media from '@universityofmaryland/web-token-library/media'`

2. **Zero Dependencies**: This package must remain dependency-free
   - Pure TypeScript/JavaScript
   - No runtime dependencies
   - DevDependencies only for build tools

3. **Token Naming**: Follow semantic conventions
   - Colors: Descriptive names (red, gold, gray.dark)
   - Spacing: T-shirt sizes (xs, sm, md, lg, xl)
   - Font sizes: Same scale as spacing
   - Breakpoints: Device-based (tablet, desktop, highDef)

4. **Immutability**: Use `as const` for token objects
   - Ensures TypeScript treats values as literals
   - Prevents accidental mutations
   - Enables better type inference

5. **Documentation**: Every token category needs JSDoc
   - Module-level documentation
   - Examples for each export
   - Clear description of use cases

## Future: Figma Integration (Phase 2)

### Technical Requirements

- **Figma API Integration**: Authenticate and fetch design tokens
- **Token Transformation**: Figma format → TypeScript
- **Naming Conventions**: Standardize token naming
- **Validation**: Ensure tokens match schema
- **Automation**: GitHub Actions workflow for sync
- **Change Detection**: Diff tokens and generate PRs

### Implementation Strategy

See [plan.md](plan.md) for complete roadmap including:
- Phase 1: Manual token package (current)
- Phase 2: Figma integration setup
- Phase 3: Advanced features (theming, composition)

## Notes

- This is the **first pure foundation package** with zero runtime dependencies
- Tokens cascade to styles → elements → components
- CDN build enables usage without build tools
- TypeScript types are comprehensive and accurate
- Package is designed for automated Figma extraction
- Version 1.x is manually maintained
- Version 2.x will introduce Figma automation

## Migration from Styles Package

**Before** (OLD - still works for compatibility):
```typescript
import * as token from '@universityofmaryland/web-styles-library/token';
```

**After** (NEW - recommended):
```typescript
import * as token from '@universityofmaryland/web-token-library';
```

The styles package continues to re-export tokens for backward compatibility, but new code should import directly from the tokens package.

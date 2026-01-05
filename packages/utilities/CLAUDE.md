# CLAUDE.md - Utilities Package

## Package Overview

The **Utilities Package** (`@universityofmaryland/web-utilities-library`) provides shared utility functions for all UMD Design System packages. It consolidates common functionality with selective import capabilities.

**Version**: 1.0.2
**Dependencies**: `@universityofmaryland/web-token-library`, `@universityofmaryland/web-styles-library`, `postcss`, `postcss-js`, `postcss-nesting`

## Build System

### Vite Configuration

- **Builder**: Vite with TypeScript
- **Output Formats**: ES Modules only (`.js`) - No CommonJS support
- **Export Style**: Named exports only - No default exports
- **External Dependencies**: All `@universityofmaryland/*` packages, postcss libraries
- **Type Declarations**: Generated with `vite-plugin-dts`
- **Module Preservation**: `preserveModules: true` for granular imports

### Build Commands

```bash
npm run build      # Production build
npm run dev        # Watch mode
npm run clean      # Remove dist
npm test          # Run all tests
npm run test:coverage  # With coverage
```

## Package Structure

### Category Organization

```
source/
├── accessibility/   # Focus management, a11y utilities
├── animation/       # Animation helpers, scroll behaviors
├── converter/       # Data conversion utilities
├── date/           # Date formatting and comparison
├── dom/            # DOM manipulation (addClass, removeClass, etc.)
├── elements/       # Element creation helpers (slots, links, templates)
├── events/         # Event handling (swipe detection, etc.)
├── media/          # Image/SVG utilities, responsive sizing
├── network/        # GraphQL and API fetch wrappers
├── performance/    # Debounce, throttle, optimization
├── storage/        # localStorage wrappers
├── string/         # String processing (capitalize, truncate, etc.)
├── styles/         # CSS-in-JS conversion, style utilities
└── validation/     # Input and accessibility validation
```

### Export Patterns

The package supports multiple import patterns:

```typescript
// Category import (preferred)
import { addClass, removeClass } from '@universityofmaryland/web-utilities-library/dom';

// Individual function import (maximum tree-shaking)
import { addClass } from '@universityofmaryland/web-utilities-library/dom/addClass';

// Wildcard category access
import * as DomUtils from '@universityofmaryland/web-utilities-library/dom';

// Main export (convenience, less optimal)
import { addClass } from '@universityofmaryland/web-utilities-library';
```

## package.json Exports

Dual-level exports for flexibility:

```json
{
  "type": "module",
  "exports": {
    "./dom": {
      "types": "./dist/dom.d.ts",
      "import": "./dist/dom.js"
    },
    "./dom/*": {
      "types": "./dist/dom/*.d.ts",
      "import": "./dist/dom/*.js"
    }
  }
}
```

**Note**: CommonJS (`require`) is not supported. Use ES module `import` only.

## Utility Function Pattern

Each utility follows this structure:

```typescript
/**
 * Brief description
 * @param param1 - Description
 * @returns Description
 * @example
 * ```typescript
 * const result = utilityName(arg1);
 * ```
 */
export const utilityName = (param1: Type): ReturnType => {
  // Pure function implementation
  return result;
};
```

## Testing Strategy

- **Framework**: Jest with TypeScript
- **Location**: `source/__tests__/{category}/`
- **Coverage**: 100% coverage target
- **Test Patterns**: Happy path, edge cases, error conditions

## Key Utilities by Category

### DOM
- `addClass`, `removeClass`, `toggleClass`
- `findParent`, `cleanCopy`
- `getIcon` - SVG icon injection

### Styles
- `convertJSSObjectToStyles` - JSS to CSS conversion
- `getStyleStringFromJssObject` - Style string generation
- `withViewTimelineAnimation` - Timeline animations

### Performance
- `debounce` - Debounce function calls
- `throttle` - Throttle function execution

### String
- `capitalize` - Capitalize strings
- `truncateText` - Text truncation with ellipsis

## Best Practices

1. **Import Granularly**: Use category or individual imports for optimal bundle sizes
2. **Pure Functions**: Most utilities are pure functions with no side effects
3. **Type Safety**: Full TypeScript support
4. **No Package Coupling**: Functions are standalone and reusable

## Build Output

- `dist/index.{js,d.ts}` - Main export (ES module only)
- `dist/{category}.{js,d.ts}` - Category barrels
- `dist/{category}/{function}.{js,d.ts}` - Individual functions
- Source maps for all builds

## Notes

- Utilities have minimal dependencies
- Functions are framework-agnostic
- Optimized for tree-shaking
- Used by elements, components, and feeds packages

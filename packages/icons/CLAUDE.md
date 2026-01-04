# CLAUDE.md - Icons Package

## Package Overview

The **Icons Package** (`@universityofmaryland/web-icons-library`) provides SVG icon and logo assets for the University of Maryland Design System. Icons are organized by category for selective import and optimal tree-shaking.

**Version**: 1.0.0
**Dependencies**: None (standalone package)

## Build System

### Vite Configuration

- **Builder**: Vite with TypeScript
- **Output Formats**: ES Modules only (`.js`) - No CommonJS support
- **Export Style**: Named exports only - No default exports
- **Type Declarations**: Generated with `vite-plugin-dts`
- **Build Artifacts**: `dist/` directory with code-split category files

### Build Commands

```bash
npm run build      # Production build with type declarations
npm run dev        # Development mode with watch
npm run clean      # Remove dist directory
npm run test       # Run Jest tests
```

## Package Structure

### Source Organization

```
source/
├── alerts/       # Alert and warning icons
├── brand/        # UMD brand icons (Fearless)
├── communication/# Email, phone, chat icons
├── content/      # Content-related icons (quote, etc.)
├── documents/    # Document type icons
├── location/     # Location and map icons
├── logos/        # UMD logos and wordmarks
├── media/        # Media control icons
├── navigation/   # Navigation icons (chevron, menu, etc.)
├── search/       # Search and magnifying glass icons
├── social/       # Social media icons
├── time/         # Clock and calendar icons
├── ui-controls/  # UI control icons (new window, etc.)
└── user/         # User and person icons
```

### Export Pattern

Each category is built as a separate entry point for optimal code splitting:

```typescript
// Import entire category
import * as NavigationIcons from '@universityofmaryland/web-icons-library/navigation';

// Import from main export
import { CHEVRON_SMALL } from '@universityofmaryland/web-icons-library';
```

## package.json Exports

The package provides selective exports for each category:

```json
{
  "type": "module",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    },
    "./navigation": {
      "types": "./dist/navigation.d.ts",
      "import": "./dist/navigation.js"
    }
    // ... other categories
  }
}
```

**Note**: CommonJS (`require`) is not supported. Use ES module `import` only.

## Icon Format

All icons are exported as SVG strings:

```typescript
export const CHEVRON_SMALL = '<svg>...</svg>';
```

## Testing

- **Framework**: Jest
- **Location**: `source/__tests__/`
- **Coverage**: Icon exports and SVG structure validation

## Best Practices

1. **Import Only What You Need**: Use category imports to minimize bundle size
2. **SVG Strings**: Icons are raw SVG strings, inject into DOM as needed
3. **No Dependencies**: This package has no external dependencies
4. **Type Safety**: Full TypeScript support with generated declarations

## Build Output

Each build produces:
- `dist/index.{js,d.ts}` - Main entry with all icons (ES module only)
- `dist/{category}.{js,d.ts}` - Individual category exports
- Source maps for debugging

## Notes

- Icons are static assets - no runtime dependencies
- All icons are optimized SVG strings
- Package is framework-agnostic
- Tree-shaking friendly with named exports

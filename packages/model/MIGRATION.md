# Migration Guide: Model Package Abstraction

This guide explains how the model utilities were extracted from the `@universityofmaryland/web-components-library` package into the new `@universityofmaryland/web-model-library` package.

## Summary

The model directory previously located at `packages/components/source/model/` has been extracted into a standalone package: `@universityofmaryland/web-model-library`. This change improves code organization, enables reusability across other packages, and sets the foundation for future model-driven development.

## What Changed

### Before (v1.15.8 and earlier)

```typescript
// In components package
import { Model, Attributes, Slots, Register } from 'model';
import type { ComponentRef } from '../../_types';
```

### After (v1.16.0+)

```typescript
// Using the new model package
import { Model, Attributes, Slots, Register } from '@universityofmaryland/web-model-library';
import type { ComponentRef } from '@universityofmaryland/web-model-library';
```

## Breaking Changes

**None** - This is a backward-compatible change. All public APIs remain unchanged. The only difference is the import path for type definitions.

## For Package Consumers

### If you're using `@universityofmaryland/web-components-library`

**No changes required.** The components package now internally depends on the model package. Everything continues to work as before.

### If you were directly accessing model utilities (advanced usage)

Update your imports from internal paths to the new package:

```typescript
// OLD - Internal import (no longer works)
import { Model } from '@universityofmaryland/web-components-library/model';

// NEW - Use the model package directly
import { Model } from '@universityofmaryland/web-model-library';
```

## For Monorepo Developers

If you're working within the UMD Design System monorepo:

### 1. Install Dependencies

```bash
cd /path/to/design-system
yarn  # or npm install
```

This will link the new model package within the monorepo.

### 2. Build Order

The model package must be built before the components package:

```bash
# Build model package first
cd packages/model
npm run build

# Then build components package
cd ../components
npm run build
```

### 3. Development Workflow

When developing:

```bash
# In model package
cd packages/model
npm run dev  # Watch mode

# In components package (separate terminal)
cd packages/components
npm run dev  # Watch mode
```

## Package Structure

### New Model Package

```
packages/model/
├── source/
│   ├── attributes/    # Attribute handling
│   ├── model/         # Core model system
│   ├── slots/         # Slot management
│   ├── utilities/     # Helper utilities
│   └── _types.ts      # Type definitions
├── __tests__/         # Test files
├── package.json       # v1.0.0
└── README.md
```

### Updated Components Package

- Removed: `source/model/` directory
- Added: Dependency on `@universityofmaryland/web-model-library@^1.0.0`
- Updated: All internal imports to use the new package

## Dependencies

### Model Package Dependencies

- `postcss` - For style processing
- `postcss-discard-duplicates` - CSS optimization
- Peer: `@universityofmaryland/web-styles-library` - Design tokens

### Components Package Dependencies

- Added: `@universityofmaryland/web-model-library@^1.0.0`

## TypeScript Configuration

### Model Package

```json
{
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "source",
    "moduleResolution": "bundler"
  }
}
```

### Components Package (Updated)

```json
{
  "paths": {
    "@universityofmaryland/web-model-library": ["../../model/dist/index.d.ts"],
    "@universityofmaryland/web-model-library/*": ["../../model/dist/*"]
  }
}
```

## Build Configuration

### Model Package Vite Config

- **Formats**: ES Modules (`.mjs`) and CommonJS (`.js`)
- **Externals**: All `@universityofmaryland/*` packages
- **Entries**: `index`, `attributes`, `model`, `slots`, `utilities`

### Components Package Vite Config (Updated)

- **Added to Externals**: `@universityofmaryland/web-model-library`
- **Removed Path Alias**: `model` alias removed
- **Updated Manual Chunks**: Removed `/model/` chunk

## Testing

Both packages have comprehensive test coverage:

### Model Package Tests

```bash
cd packages/model
npm test
```

- Tests for `Model.createCustomElement`
- Tests for `Attributes` system
- Tests for `Slots` utilities
- Tests for `Register` functions

### Components Package Tests

```bash
cd packages/components
npm test
```

All existing tests continue to pass without modification.

## Troubleshooting

### Build Errors

**Issue**: `Cannot find module '@universityofmaryland/web-model-library'`

**Solution**: Ensure you've run `yarn` or `npm install` at the root to link packages.

### Type Errors

**Issue**: TypeScript can't find types from model package

**Solution**: Build the model package first:
```bash
cd packages/model
npm run build
```

### Import Errors

**Issue**: Old imports from `'model'` still in code

**Solution**: All imports have been updated. If you see this in your custom code, update to:
```typescript
import { ... } from '@universityofmaryland/web-model-library';
```

## Timeline

- **v1.15.8** (2024-11-18): Last version with embedded model
- **v1.0.0** (2024-12-06): Model package created
- **v1.16.0** (2024-12-06): Components package updated to use model package

## Questions?

For questions or issues with the migration, please:
1. Check this migration guide
2. Review the [Model Package README](./README.md)
3. Review the [Model Package CLAUDE.md](./CLAUDE.md)
4. Open an issue in the repository

## Future Enhancements

With the model package now standalone, we can:
- Use model utilities in other packages (elements, feeds)
- Enhance the model system without affecting components
- Create model variations for specific use cases
- Improve testing and documentation of model patterns

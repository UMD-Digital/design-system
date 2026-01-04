# CLAUDE.md - Model Package

## Package Overview

The **Model Package** (`@universityofmaryland/web-model-library`) provides core utilities for building web components in the UMD design system. This package was extracted from the components package to create a standalone, reusable foundation for web component development.

**Version**: 1.0.0
**Dependencies**:
- `postcss` (for style processing)
- `postcss-discard-duplicates` (for CSS optimization)

**Peer Dependencies**:
- `@universityofmaryland/web-styles-library` (for design tokens)

## Package Purpose

This package abstracts the component model logic that was previously embedded in the components package. It provides:

1. **Component Model System** - Base class and factory for creating custom elements
2. **Attribute Handling** - Comprehensive system for observing and managing attributes
3. **Slot Management** - Utilities for validating and managing component slots
4. **Registration Utilities** - Helpers for registering web components
5. **Lifecycle Management** - Common lifecycle hooks for component initialization

## Build System

### Vite Configuration

- **Builder**: Vite with TypeScript
- **Output Formats**: ES Modules only (`.js`) - No CommonJS support
- **Export Style**: Named exports only - No default exports
- **External Dependencies**: All `@universityofmaryland/*` packages
- **Type Declarations**: Generated with `vite-plugin-dts`
- **Module Preservation**: `preserveModules: true` for granular imports

### Build Commands

```bash
npm run build      # Production build
npm run dev        # Watch mode
npm run clean      # Remove dist and build directories
npm test           # Run all tests
```

## Package Structure

### Source Organization

```
source/
├── attributes/   # Attribute handling system
│   ├── checks.ts     # Attribute state checking utilities
│   ├── handler.ts    # Attribute change observers
│   ├── names.ts      # Centralized attribute name constants
│   ├── values.ts     # Predefined attribute values
│   └── index.ts      # Main export
├── model/        # Core model system
│   └── index.ts      # Custom element factory and base class
├── slots/        # Slot management
│   ├── create.ts     # Slot creation utilities
│   ├── element.ts    # Common slot configurations
│   ├── extract.ts    # Slot extraction from DOM
│   ├── mapping.ts    # Slot name mappings
│   ├── query.ts      # Slot query utilities
│   ├── validate.ts   # Slot validation
│   └── index.ts      # Main export
├── utilities/    # Helper utilities
│   ├── lifecycle.ts  # Common lifecycle hooks
│   ├── register.ts   # Component registration
│   ├── styles.ts     # Style template generation
│   └── index.ts      # Main export
├── _types.ts     # Type definitions
└── index.ts      # Package main export
```

## Export Pattern

All exports are **named exports only** (no default exports):

```typescript
// Main export
import { Attributes, Model, Register, Slots, Lifecycle } from '@universityofmaryland/web-model-library';

// Category imports
import * as Model from '@universityofmaryland/web-model-library/model';
import * as Attributes from '@universityofmaryland/web-model-library/attributes';
import { Slots } from '@universityofmaryland/web-model-library/slots';
import * as Utilities from '@universityofmaryland/web-model-library/utilities';
```

## package.json Exports

```json
{
  "type": "module",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    },
    "./attributes": {
      "types": "./dist/attributes.d.ts",
      "import": "./dist/attributes.js"
    },
    "./model": {
      "types": "./dist/model.d.ts",
      "import": "./dist/model.js"
    },
    "./slots": {
      "types": "./dist/slots.d.ts",
      "import": "./dist/slots.js"
    },
    "./utilities": {
      "types": "./dist/utilities.d.ts",
      "import": "./dist/utilities.js"
    }
  }
}
```

**Note**: CommonJS (`require`) is not supported. Use ES module `import` only.

## Key Concepts

### Model System

The model system provides a factory function (`createCustomElement`) for creating web components with:
- Shadow DOM encapsulation
- Attribute observation and handling
- Slot validation
- Lifecycle management
- Error handling

### Attribute System

Comprehensive attribute handling with:
- Centralized attribute names and values
- State checking utilities
- Reactive attribute observers
- Configuration and observed attributes

### Slot System

Slot management with:
- Slot validation (required, allowed elements)
- Deprecation warnings
- Common slot configurations
- Slot creation factories

### Registration System

Component registration with:
- Automatic duplicate prevention
- WebComponents global registry
- Helper functions for standard patterns

## Testing

- **Framework**: Jest with JSDOM
- **Location**: `__tests__/`
- **Pattern**: Test module exports, component creation, registration
- **Coverage**: Comprehensive coverage of all utilities

## Integration with Components Package

The components package (`@universityofmaryland/web-components-library`) now depends on this model package. All imports of model utilities in the components package should use:

```typescript
import { Model, Attributes, Slots, Register } from '@universityofmaryland/web-model-library';
```

Instead of the previous internal imports:

```typescript
import { Model, Attributes, Slots, Register } from 'model';  // OLD
```

## Type Definitions

All type definitions are centralized in `_types.ts`:

- `ElementRef` - Base element reference
- `ComponentRef` - Component reference
- `SlotConfig` - Slot configuration
- `ComponentConfiguration` - Component config for `createCustomElement`
- `ComponentRegistration` - Registration function type
- Event detail types: `ComponentReadyDetail`, `ComponentErrorDetail`, `ComponentResizeDetail`

## Best Practices

1. **Import Pattern**: Use namespace imports for optimal tree-shaking
2. **Type Safety**: Always use TypeScript interfaces for props and configs
3. **Slot Validation**: Define and validate slots for all components
4. **Attribute Observers**: Use attribute handlers for dynamic behavior
5. **Lifecycle Hooks**: Leverage common lifecycle hooks for consistency

## Build Output

- `dist/index.{js,d.ts}` - Main export with all utilities (ES module only)
- `dist/attributes.{js,d.ts}` - Attribute system
- `dist/model.{js,d.ts}` - Model system
- `dist/slots.{js,d.ts}` - Slot system
- `dist/utilities.{js,d.ts}` - Registration and lifecycle utilities
- Preserved module structure for granular imports

## Notes

- This package is framework-agnostic and works with any web components
- Peer dependency on styles library for design tokens
- Zero breaking changes - maintains 100% API compatibility with extracted code
- Enables other packages to leverage model patterns without depending on components package
- Sets foundation for future model-driven component development

## Migration from Components Package

When migrating code from the components package:

1. **Update Imports**: Change `from 'model'` to `from '@universityofmaryland/web-model-library'`
2. **Update Type Imports**: Change `from '../../_types'` to `from '@universityofmaryland/web-model-library'`
3. **Verify Builds**: Ensure vite config externalizes the model package
4. **Update package.json**: Add model package to dependencies
5. **Run Tests**: Verify all tests pass after migration

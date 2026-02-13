# CLAUDE.md - Model Package

## Package Overview

The **Model Package** (`@universityofmaryland/web-model-library`) provides core utilities for building web components in the UMD design system. This package was extracted from the components package to create a standalone, reusable foundation for web component development.

**Version**: 1.0.3
**Dependencies**:
- `postcss` (for style processing)
- `postcss-discard-duplicates` (for CSS optimization)

**Peer Dependencies**:
- `@universityofmaryland/web-styles-library` (for design tokens)

## Refactoring Plan (v1.1.0)

**Status**: In progress — backwards compatible, opt-in additions

The model package is being enhanced in 5 modules, each building on the previous. All changes are additive; existing APIs remain unchanged.

### Module Order

1. **Testing** — Test fixture and helper utilities (`./testing` export)
   - `fixture.ts` — `createFixture`, `cleanupFixtures`
   - `shadow.ts` — `queryShadow`, `queryShadowAll`
   - `events.ts` — `simulateEvent`, `waitForEvent`
   - `slots.ts` — `createSlotContent`, `assertSlot`

2. **Utilities** — Debug and event helpers
   - `debug.ts` — `isDev`, `createLogger`
   - `events.ts` — `createCustomEvent`, `dispatchCustomEvent`, `defineEvents`, `createEventListener`, `delegate`

3. **Slots** — Validation, querying, and change detection
   - `slot-validation.ts` — `SlotConfig` interface
   - `slot-query.ts` — query helpers for slot content
   - `slot-events.ts` — `createSlotchangeHandler`, `SlotCache`, `SlotchangeController`

4. **Attributes** — Type converters, config, change detection, errors
   - `converters.ts` — `AttributeConverter` for type-safe attribute parsing
   - `config.ts` — `AttributeConfig` declarative attribute definitions
   - `change-detection.ts` — `ChangeDetectors` for efficient dirty checking
   - `errors.ts` — `AttributeTypeError`, `AttributeValidationError`

5. **Model** — Base component, update cycle, controllers, registration
   - `base-component.ts` — `firstConnected`, `willFirstUpdate` lifecycle hooks
   - `update-cycle.ts` — `requestUpdate`, `updateComplete` promise
   - `controllers.ts` — `ReactiveController` interface
   - `registration.ts` — `registerComponent` with validation

See [PLAN.md](/PLAN.md) for implementation roadmap.

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
│   ├── checks.ts           # Attribute state checking utilities
│   ├── handler.ts          # Attribute change observers
│   ├── names.ts            # Centralized attribute name constants
│   ├── values.ts           # Predefined attribute values
│   ├── converters.ts       # Type converters (v1.1.0)
│   ├── config.ts           # Declarative attribute config (v1.1.0)
│   ├── change-detection.ts # Dirty checking (v1.1.0)
│   ├── errors.ts           # Attribute error types (v1.1.0)
│   └── index.ts            # Main export
├── model/        # Core model system
│   ├── index.ts             # Custom element factory and base class
│   ├── base-component.ts    # Extended lifecycle hooks (v1.1.0)
│   ├── update-cycle.ts      # Batched update scheduling (v1.1.0)
│   ├── controllers.ts       # ReactiveController interface (v1.1.0)
│   └── registration.ts      # registerComponent helper (v1.1.0)
├── slots/        # Slot management
│   ├── create.ts            # Slot creation utilities
│   ├── element.ts           # Common slot configurations
│   ├── extract.ts           # Slot extraction from DOM
│   ├── mapping.ts           # Slot name mappings
│   ├── query.ts             # Slot query utilities
│   ├── validate.ts          # Slot validation
│   ├── slot-validation.ts   # SlotConfig interface (v1.1.0)
│   ├── slot-query.ts        # Enhanced queries (v1.1.0)
│   ├── slot-events.ts       # Slotchange handling (v1.1.0)
│   └── index.ts             # Main export
├── testing/      # Test utilities (v1.1.0)
│   ├── fixture.ts           # Test fixture helpers
│   ├── shadow.ts            # Shadow DOM query helpers
│   ├── events.ts            # Event simulation
│   ├── slots.ts             # Slot test utilities
│   └── index.ts             # Main export
├── utilities/    # Helper utilities
│   ├── lifecycle.ts         # Common lifecycle hooks
│   ├── register.ts          # Component registration
│   ├── styles.ts            # Style template generation
│   ├── debug.ts             # Dev-mode logging (v1.1.0)
│   ├── events.ts            # Custom event helpers (v1.1.0)
│   └── index.ts             # Main export
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

// Testing utilities (v1.1.0)
import { createFixture, queryShadow, simulateEvent } from '@universityofmaryland/web-model-library/testing';
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
    },
    "./testing": {
      "types": "./dist/testing.d.ts",
      "import": "./dist/testing.js"
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

### Reactive Update Cycle (v1.1.0)

Batched update scheduling inspired by Lit:
- `requestUpdate()` to schedule a microtask-batched re-render
- `updateComplete` promise for awaiting render completion
- `firstConnected` / `willFirstUpdate` lifecycle hooks

### Controller Pattern (v1.1.0)

`ReactiveController` interface for reusable cross-cutting concerns:
- Attach/detach lifecycle tied to host component
- Enables composition over inheritance for behaviors like focus management, media queries, intersection observers

### Type Converters (v1.1.0)

`AttributeConverter` for safe string-to-type conversion:
- Built-in converters: `String`, `Number`, `Boolean`, `JSON`
- Custom converter support via `fromAttribute` / `toAttribute`

### Testing Utilities (v1.1.0)

Dedicated `./testing` export for component test authoring:
- `createFixture` / `cleanupFixtures` — mount components in isolation
- `queryShadow` / `queryShadowAll` — traverse shadow DOM
- `simulateEvent` / `waitForEvent` — event testing
- `createSlotContent` / `assertSlot` — slot validation in tests

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
- `dist/testing.{js,d.ts}` - Test fixture and helper utilities (v1.1.0)
- Preserved module structure for granular imports

## Notes

- This package is framework-agnostic and works with any web components
- Peer dependency on styles library for design tokens
- Zero breaking changes - maintains 100% API compatibility with extracted code
- Enables other packages to leverage model patterns without depending on components package
- Sets foundation for future model-driven component development
- The `./testing` export is intended for dev/test environments only; not included in production bundles

## Migration from Components Package

When migrating code from the components package:

1. **Update Imports**: Change `from 'model'` to `from '@universityofmaryland/web-model-library'`
2. **Update Type Imports**: Change `from '../../_types'` to `from '@universityofmaryland/web-model-library'`
3. **Verify Builds**: Ensure vite config externalizes the model package
4. **Update package.json**: Add model package to dependencies
5. **Run Tests**: Verify all tests pass after migration

# CLAUDE.md - Builder Package

This file provides guidance to Claude Code when working with the builder package.

## Package Overview

**Package Name**: `@universityofmaryland/web-builder-library`
**Version**: 1.0.0
**Purpose**: Modern fluent builder API for creating HTML elements with UMD Design System styles

The builder package provides a chainable, type-safe interface for constructing DOM elements with integrated styling, lifecycle management, and animation support.

## Architecture

### Core Design Pattern: Fluent Builder

The package implements a **fluent builder pattern** where methods return `this` for chaining, culminating in a terminal `.build()` operation that returns an `ElementModel`.

```typescript
const element = new ElementBuilder('div')
  .withClassName('container')
  .withStyles({ element: { padding: '20px' } })
  .withChild(childElement)
  .build();
```

### Three-Layer Architecture

#### 1. Core Layer (`source/core/`)

**ElementBuilder** (`ElementBuilder.ts`)

- Main builder class with fluent API
- Manages element construction and method chaining
- Accumulates state until `.build()` is called
- Prevents modification after build with `assertNotBuilt()`

**StyleManager** (`StyleManager.ts`)

- Compiles JSS objects to CSS strings
- Handles style deduplication and priority ordering
- Supports theme variations (light/dark)
- Generates unique class names when needed

**LifecycleManager** (`LifecycleManager.ts`)

- Tracks event listeners for cleanup
- Manages observer lifecycles (IntersectionObserver, MutationObserver)
- Provides global cleanup registry
- Prevents memory leaks on element destruction

#### 2. Factory Layer (`source/factories/`)

**Presets** (`presets.ts`)

- Pre-configured builders with UMD Design System styles
- Categories: actions, headlines, text, layouts, assets
- Returns ElementBuilder instances ready for further chaining
- Uses slot elements as default for content projection

**Compose** (`compose.ts`)

- High-level composition functions for complex patterns
- Includes: textLockup, card, hero, list, grid
- Combines multiple presets into cohesive components
- Handles conditional rendering and prop-based configuration

#### 3. Type Layer (`source/core/types.ts`)

Comprehensive TypeScript definitions for:

- Builder interfaces and options
- Style definitions and elements
- Animation configurations
- Lifecycle tracking types
- Factory function signatures

## Key Architectural Decisions

### Decision 1: Constructor-Based API (Not Factory Functions)

**Chosen**: `new ElementBuilder()` constructor pattern
**Rejected**: `createElement()` factory functions

**Rationale**:

- Clear instantiation semantics
- Explicit class-based API
- Better IDE autocomplete
- Aligns with native DOM patterns (`new HTMLElement()`)

**Migration Note**: V1 used factory functions. V2 requires explicit constructor calls.

### Decision 2: Terminal Build Pattern

**Pattern**: Builder is immutable after `.build()` is called
**Enforcement**: `assertNotBuilt()` throws error on post-build modification

**Rationale**:

- Prevents stale references
- Clear single-use semantics
- Avoids confusion about state management

**Exception**: `.build()` can be called multiple times but returns cached result with warning.

### Decision 3: Slot Elements for Presets

**Chosen**: Presets return `ElementBuilder<HTMLSlotElement>`
**Rejected**: Returning specific element types (div, span, etc.)

**Rationale**:

- Content projection semantics
- Clear placeholder intent
- Flexible content insertion
- Web Component compatibility

### Decision 4: Style Integration via `.styled()` Method

**Method**: `.styled(styleObject)` accepts JSS objects from styles library
**Automatic**: Extracts className and applies full style object

**Example**:

```typescript
import * as Styles from '@universityofmaryland/web-styles-library';

new ElementBuilder(element).styled(Styles.typography.sans.larger).build();

// Equivalent to:
// .withClassName('umd-headline-sans-larger')
// .withStyles(Styles.typography.sans.larger)
```

### Decision 5: Animation System (Phase 1 Complete)

**Phase 1**: CSS animation shorthand generation via `.withAnimation()`
**Phase 2** (Planned): Keyframe definition and parent-child coordination

**Current Implementation**:

```typescript
.withAnimation('slideUnder', {
  duration: '300ms',
  delay: '100ms',
  easing: 'ease-in-out'
})
```

Generates: `animation: slideUnder 300ms ease-in-out 100ms;`

**Future** (Phase 2):

- `.withKeyframes()` for custom keyframe definitions
- `.withAnimationFor(child, ...)` for parent-child coordination
- See PLAN.md for full Phase 2 specification

## Module Structure

```
source/
├── index.ts                    # Main exports (named only)
├── core/
│   ├── ElementBuilder.ts       # Main builder class
│   ├── StyleManager.ts         # Style compilation
│   ├── LifecycleManager.ts     # Resource tracking
│   ├── types.ts                # Type definitions
│   └── index.ts                # Core exports
└── factories/
    ├── presets.ts              # Pre-configured builders
    ├── compose.ts              # Composition helpers
    └── index.ts                # Factory exports
```

## Export Strategy

### Named Exports Only

**Pattern**: All exports are named, no default exports

**Rationale**:

- Better tree-shaking
- Explicit imports
- Avoids `.default` confusion
- Cleaner bundler output

**Usage**:

```typescript
// Core
import { ElementBuilder } from '@universityofmaryland/web-builder-library';

// Presets
import {
  actions,
  headlines,
  text,
} from '@universityofmaryland/web-builder-library/presets';

// Compose
import {
  textLockup,
  card,
  hero,
} from '@universityofmaryland/web-builder-library/compose';

// Types
import type {
  ElementModel,
  BuilderOptions,
} from '@universityofmaryland/web-builder-library';
```

### Package.json Exports

All exports are explicit in package.json:

- `.` - Main entry (core + factories)
- `./core` - Core modules only
- `./core/ElementBuilder` - Individual core modules
- `./presets` - Preset factories (convenience)
- `./compose` - Composition helpers (convenience)

## ElementModel Return Type

All builders return `ElementModel<T>` from `.build()`:

```typescript
interface ElementModel<T extends HTMLElement = HTMLElement> {
  element: T; // The built DOM element
  styles: string; // Generated CSS string
  update?: (props) => void; // Optional updater
  destroy?: () => void; // Cleanup function
}
```

**Why ElementModel?**

- Consistent return type across all builders
- Bundles element with its styles
- Provides lifecycle methods
- Enables style injection pattern

## Common Usage Patterns

### Pattern 1: Simple Element Creation

```typescript
const container = new ElementBuilder()
  .withClassName('container')
  .withText('Hello World')
  .build();

document.body.appendChild(container.element);
```

### Pattern 2: Styled Element with UMD Design System

```typescript
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as Styles from '@universityofmaryland/web-styles-library';

const headline = new ElementBuilder(headlineElement)
  .styled(Styles.typography.sans.larger)
  .withAnimation('slideUnder')
  .build();
```

### Pattern 3: Using Presets

```typescript
import {
  actions,
  headlines,
} from '@universityofmaryland/web-builder-library/presets';

const button = actions
  .primary()
  .withText('Click Me')
  .withAttribute('href', '/page')
  .on('click', () => console.log('clicked'))
  .build();
```

### Pattern 4: Composition

```typescript
import { textLockup } from '@universityofmaryland/web-builder-library/compose';

const lockup = textLockup({
  eyebrow: 'News',
  headline: 'Latest Updates',
  text: 'Check out what's new',
  headlineSize: 'large'
}).build();
```

### Pattern 5: Conditional Building

```typescript
const builder = new ElementBuilder()
  .withClassName('card')
  .withChildIf(showImage, imageElement)
  .withStylesIf(isDark, darkThemeStyles);

if (hasTitle) {
  builder.withText(title);
}

const element = builder.build();
```

### Pattern 6: Array Mapping

```typescript
const list = new ElementBuilder('ul')
  .withChildrenFrom(items, (item, index) =>
    new ElementBuilder('li')
      .withText(item.text)
      .withAttribute('data-index', index),
  )
  .build();
```

## Testing Strategy

### Test Organization

Tests are co-located in `source/__tests__/`:

- `ElementBuilder.test.ts` - Core builder functionality
- `StyleManager.test.ts` - Style compilation
- `LifecycleManager.test.ts` - Resource cleanup
- `presets.test.ts` - Factory presets
- `createElement.test.ts` - Element creation utilities

### Testing Best Practices

**DO**:

- Test behavior, not implementation
- Use `jest.fn()` for event handlers
- Test both success and error cases
- Verify DOM structure after `.build()`
- Test style generation with snapshots

**DON'T**:

- Test private methods directly
- Mock ElementBuilder internals
- Test implementation details
- Skip cleanup/destroy tests

### Example Test Pattern

```typescript
test('should add class names and build element', () => {
  const div = document.createElement('div');
  const model = new ElementBuilder(div)
    .withClassName('test-class')
    .withText('Hello')
    .build();

  expect(model.element.classList.contains('test-class')).toBe(true);
  expect(model.element.textContent).toBe('Hello');
});
```

## Dependencies

### Peer Dependencies

- `@universityofmaryland/web-styles-library` ^1.0.0
  - Required for JSS object integration
  - Provides design tokens and style definitions
  - Must be installed by consumer

### Direct Dependencies

- `@universityofmaryland/web-utilities-library` ^1.0.0
  - Optional utility functions
  - Used internally for DOM helpers

### External Dependencies

- Always externalized in build (not bundled)
- Consumers must provide peer dependencies
- Enables optimal tree-shaking

## Build Configuration

### Vite Build Pattern

**Outputs**:

- ESM: `.mjs` files
- CJS: `.js` files
- Types: `.d.ts` files

**Key Settings**:

```javascript
rollupOptions: {
  external: (id) => id.startsWith('@universityofmaryland/'),
  output: {
    preserveModules: true,
    preserveModulesRoot: 'source'
  }
}
```

**Why preserveModules?**

- Maintains source structure in dist/
- Enables selective imports
- Better tree-shaking for consumers

## Migration from V1

### Breaking Changes

**V1 Pattern** (Deprecated):

```typescript
import { createStyledElement } from '@universityofmaryland/web-builder-library/v1';
const element = createStyledElement(el, styles);
```

**V2 Pattern** (Current):

```typescript
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
const model = new ElementBuilder(el).styled(styles).build();
```

### Migration Checklist

- [ ] Replace `createStyledElement()` with `new ElementBuilder()`
- [ ] Update imports from factory functions to class constructors
- [ ] Change `.element` access to `.build().element`
- [ ] Update style application to use `.styled()` or `.withStyles()`
- [ ] Add `.build()` terminal operation
- [ ] Update tests to match new API

See PLAN.md Phase 7 for detailed migration guide.

## Common Pitfalls

### Pitfall 1: Modifying After Build

```typescript
// ❌ WRONG - Throws error
const builder = new ElementBuilder();
const model = builder.build();
builder.withClassName('test'); // Error!

// ✅ CORRECT - Build once
const builder = new ElementBuilder().withClassName('test');
const model = builder.build();
```

### Pitfall 2: Forgetting .build()

```typescript
// ❌ WRONG - Returns builder, not element
const element = new ElementBuilder().withText('Hello');
document.body.appendChild(element); // Error!

// ✅ CORRECT - Call .build()
const model = new ElementBuilder().withText('Hello').build();
document.body.appendChild(model.element);
```

### Pitfall 3: Not Injecting Styles

```typescript
// ❌ INCOMPLETE - Element unstyled
const model = new ElementBuilder().styled(Styles.typography.sans.large).build();
document.body.appendChild(model.element); // No styles applied!

// ✅ CORRECT - Inject styles
const styleTag = document.createElement('style');
styleTag.textContent = model.styles;
document.head.appendChild(styleTag);
document.body.appendChild(model.element);
```

### Pitfall 4: Default Export Confusion

```typescript
// ❌ WRONG - No default export
import ElementBuilder from '@universityofmaryland/web-builder-library';

// ✅ CORRECT - Named import
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
```

## Performance Considerations

### Style Compilation

- Styles are compiled once during `.build()`
- StyleManager deduplicates identical style objects
- Generated CSS is cached within builder instance

### Memory Management

- Event listeners tracked by LifecycleManager
- Call `.destroy()` to cleanup when removing elements
- Global registry available via `cleanupAll()`

### Build Performance

- Builder is lightweight (minimal overhead)
- Most work happens during `.build()` (one-time cost)
- Chaining methods is virtually zero-cost

## Future Development

### Phase 2: Animation System (Planned)

See PLAN.md for full specification. Summary:

**Phase 2A**: Keyframe definition

- `.withKeyframes(name, definition)`
- Auto-scoped keyframe names
- Percentage-based keyframe support

**Phase 2B**: Parent-child coordination

- `.withAnimationFor(child, animation, options)`
- Data attribute-based child targeting
- Declarative animation timing

**Phase 2C**: Timeline system (optional)

- `.withAnimationTimeline([...])`
- Sequence multiple animations
- Complex choreography support

## Related Documentation

- **README.md** - User-facing documentation and examples
- **PLAN.md** - Development roadmap and architecture decisions
- **API.md** (Planned) - Complete API reference
- **MIGRATION.md** (Planned) - V1 to V2 migration guide
- **ANIMATIONS.md** (Planned) - Animation system cookbook

## Package-Specific Commands

```bash
# Development
npm start              # Watch mode with Vite
npm run dev            # Same as start

# Testing
npm test               # Run all tests
npm run test:watch     # Watch mode
npm run test:coverage  # Generate coverage report

# Building
npm run build          # Production build
npm run clean          # Clean dist directory

# Release
npm run release        # Test, build, and publish to npm
```

## Integration with Other Packages

### With Elements Package

- Elements package will migrate to use ElementBuilder
- See PLAN.md Phase 7 for POC migration strategy
- Text lockup element is first migration candidate

### With Components Package

- Components may use ElementBuilder for complex slot rendering
- Shadow DOM compatibility maintained
- Style encapsulation preserved

### With Styles Package

- Direct integration via `.styled()` method
- Import JSS objects from styles library
- Automatic className extraction and application

## Questions? Issues?

- Check README.md for usage examples
- Review PLAN.md for architecture decisions
- Read test files for behavior examples
- Consult root CLAUDE.md for monorepo patterns

**Version**: 1.0
**Last Updated**: 2025-01-24
**Status**: Production Ready (Phase 1 Complete)

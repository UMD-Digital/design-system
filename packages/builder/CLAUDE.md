# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package Overview

`@universityofmaryland/web-builder-library` (v1.0.3) — Fluent builder API for creating HTML elements with UMD Design System styles. Chainable, type-safe interface with integrated styling, lifecycle management, and animation support.

## Commands

```bash
npm start              # Dev server with watch mode
npm test               # Run Jest tests
npm test -- path/to/test.test.ts  # Run single test file
npm run test:watch     # Watch mode
npm run test:coverage  # Coverage report
npm run build          # Production build (Vite, ESM only)
npm run clean          # Remove dist/
npm run release        # Test + build + publish
```

## Architecture

### Core Classes (`source/core/`)

**ElementBuilder** (`ElementBuilder.ts`) — Main fluent builder. Methods return `this` for chaining; `.build()` is the terminal operation returning `ElementModel`. Immutable after build (`assertNotBuilt()` enforces this). Repeat `.build()` calls return cached result with warning.

**StyleManager** (`StyleManager.ts`) — Compiles JSS objects to CSS strings. Deduplicates via hash-based IDs. Supports priority-based cascade ordering and intelligent query merging within priority levels.

**LifecycleManager** (`LifecycleManager.ts`) — Tracks event listeners, observers, intervals, timeouts for cleanup. Global registry via `getGlobalLifecycleRegistry()` and `cleanupAll()`.

### Style Priority System (CSS Cascade)

Two priority levels generate **separate CSS blocks** — the browser cascade determines winners:

- **Priority 1** (base, outputted first): `.styled()`, `.withAnimation()`
- **Priority 2** (overrides, outputted last): `.withStyles()`, `.withStylesIf()`

Within each priority level, matching `@media`/`@container`/`@supports` queries are merged.

### ElementModel Return Type

```typescript
interface ElementModel<T extends HTMLElement = HTMLElement> {
  element: T;
  styles: string;       // Generated CSS — consumer must inject into DOM
  update?: (props) => void;
  destroy?: () => void;
  events?: Record<string, Function>;  // Custom events via .withEvents()
}
```

### Key API Surface

| Category | Methods |
|----------|---------|
| Class/Style | `withClassName()`, `withStyles()`, `withStylesIf()`, `styled()` |
| Attributes | `withAttribute()`, `withAttributes()`, `withAria()`, `withData()`, `withRole()` |
| Content | `withText()`, `withHTML()` |
| Children | `withChild()`, `withChildren()`, `withChildIf()`, `withChildrenFrom()` |
| Events | `on()`, `withEvents()` |
| Modifiers | `withModifier()`, `withAnimation()`, `ref()`, `apply()`, `clone()` |
| Accessors | `getElement()` (non-destructive), `getStyles()`, `getClassNames()` |
| Terminal | `build()`, `mountTo()` |

Children accept `ElementBuilder`, `ElementModel`, `HTMLElement`, or `string`. When an `ElementModel` child is added, its styles are auto-merged.

### Exports

Named exports only — no default exports anywhere. Selective imports supported:

```typescript
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { StyleManager } from '@universityofmaryland/web-builder-library/core/StyleManager';
import type { ElementModel } from '@universityofmaryland/web-builder-library';
```

Also exports: `LifecycleManager`, `cleanupAll`, `getGlobalLifecycleRegistry`, `getLifecycleStats`, `createStyleTag`, `injectStyles`, plus type guards (`isStyleDefinition`, `isElementStyles`, `isElementBuilder`, `isElementModel`).

## Testing

Tests in `__tests__/` directory. Jest with jsdom environment. Config extends root via `jest.config.cjs`.

Test files: `ElementBuilder.test.ts`, `StyleManager.test.ts`, `LifecycleManager.test.ts`, `createElement.test.ts`, `integration-hero-example.test.ts`, `refactor-validation.test.ts`, `priority-cascade-test.test.ts`.

Test behavior, not implementation. Verify DOM structure after `.build()`. Use `jest.fn()` for handlers. Don't mock ElementBuilder internals.

## Build

Vite with `preserveModules: true`. ESM only (no CommonJS). All `@universityofmaryland/*` packages externalized. Type declarations via `vite-plugin-dts`. Minification disabled. Sourcemaps enabled.

## Common Pitfalls

1. **Modifying after build** — throws error. All chaining must happen before `.build()`.
2. **Forgetting `.build()`** — returns the builder, not an element.
3. **Not injecting `model.styles`** — the CSS string must be added to the DOM separately.
4. **Default imports** — don't exist. Always use named imports.

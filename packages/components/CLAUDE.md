# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package Overview

`@universityofmaryland/web-components-library` (v1.18.0) — Web Components (Custom Elements) wrapping the elements/feeds packages for declarative HTML usage. This is the primary consumer-facing package in the monorepo.

## Commands

```bash
pnpm run dev              # Watch mode development build
pnpm run build            # Full production build (module + bundle + CDN)
pnpm run build:cdn        # CDN-only IIFE build
pnpm run build:bundle     # Bundle-only ESM build

pnpm test                 # Run all tests
pnpm test -- __tests__/card/standard.test.ts  # Single test file
pnpm run test:watch       # Watch mode
pnpm run test:coverage    # Coverage report
pnpm run test:snapshot    # Update snapshots
```

**Build dependency**: This package depends on all other workspace packages being built first. Build from the monorepo root with `npx lerna run build --stream` if sibling packages are stale.

## Architecture

### Three Build Outputs

1. **Module build** (default) — Code-split ES modules, all `@universityofmaryland/*` externalized. For npm consumers with bundlers.
2. **CDN build** (`BUILD_CDN=true`) — Single IIFE bundle, zero externals, auto-registers all components. Exposed as `window.UmdWebComponents`.
3. **Bundle build** (`BUILD_BUNDLE=true`) — Single ESM file with all deps inlined. Used via `initializeBundle()` from `/bundle` export.

### Component Registration Pattern

Components are **not** raw `HTMLElement` subclasses. They use `Model.defineComponent()` from the model library:

```typescript
// source/web-components/card/_model.ts
import { card } from '@universityofmaryland/web-elements-library/composite';
import { Attributes, Model, Slots } from '@universityofmaryland/web-model-library';

const createCardComponent = ({ tagName }: { tagName: string }) => {
  const slots = { headline: { required: true, ...Slots.element.allowed.subHeadline } };

  const createComponent = (element: HTMLElement) => {
    // Read attributes/slots from the host element, delegate to elements library
    return card.block({ ...cardData });
  };

  return Model.defineComponent({ tagName, slots, createComponent }, { eager: false });
};
```

The returned function (`CardStandard`, `HeroBase`, etc.) registers the custom element when called. Components are **not** auto-registered on import — the consumer must call the registration function.

### Dual Export Pattern

Each component category exports both namespace and flat named exports:

```typescript
// Namespace: Components.card.standard()
export * as card from './card';

// Flat: CardStandard()
export { CardStandard } from './card';
```

### Key Abstractions

- **`Attributes`** (model library) — Reads `data-theme`, `data-visual`, `data-display`, `data-loading-priority` etc. from the host element
- **`Slots`** (model library) — Provides slot name constants and slot content extractors
- **`helpers/styles.ts`** — `jssToCSS()` converts JSS objects to CSS strings via PostCSS; `reset` provides Shadow DOM reset styles
- **`helpers/slots.ts`** — `observer()` sets up MutationObserver for dev-mode hot-reload of slot changes (disabled in production)
- **`web-components/_event.ts`** — Shared event date/location extraction logic used by card-event, slider-event, and text-event components

### Source Layout

```
source/
├── _types.ts              # Root types (MUST have zero imports to avoid circular deps)
├── index.ts               # Main entry: Components namespace + flat re-exports
├── helpers/               # styles.ts (jssToCSS, reset), slots.ts (MutationObserver)
├── web-components/        # One directory per component category
│   ├── _event.ts          # Shared event data extraction
│   ├── _types.ts          # Component-specific types (currently empty)
│   ├── card/
│   │   ├── _model.ts      # Shared card factory (createCardComponent)
│   │   ├── standard.ts    # CardStandard = CardModel({ tagName: 'umd-element-card' })
│   │   └── ...
│   └── ...
└── exports/               # Build entry points
    ├── cdn.ts             # IIFE entry, auto-init, window.UmdWebComponents
    ├── bundle.ts          # ESM bundle with all deps, initializeBundle()
    ├── loader.ts          # loadComponentClass() iterates ComponentMap
    ├── structural.ts      # Category grouping
    ├── interactive.ts
    ├── feed.ts
    └── content.ts
```

### Component Naming Convention

Tag names use `umd-element-*` or `umd-feed-*` prefix (not just `umd-*` as the root CLAUDE.md suggests). The exact tag name is defined per-component in its source file.

## Testing

- **Framework**: Jest + JSDOM, config extends root `jest.config.cjs`
- **Setup**: `__tests__/test-helpers/setup.ts` mocks `customElements`, `IntersectionObserver`, `ResizeObserver`, `matchMedia`
- **All workspace dependencies are mocked** via `moduleNameMapper` in root jest config pointing to `/__mocks__/` files
- **Test helpers** in `__tests__/test-helpers/`:
  - `component.ts` — `createTestComponent()`, `cleanupComponents()`, `createSlotContent()`, `captureWarningsAsync()`
  - `validation.ts` — `validateSlotConfiguration()`, `getComponentAttributes()`, `validateDeprecatedAttribute()`

### What to test

Test the Web Component layer only: registration, attributes, slot distribution, Shadow DOM. Do **not** test element creation logic from sibling packages — that's already mocked.

### Test file pattern

Tests mirror the component directory structure:
```
__tests__/card/standard.test.ts  →  source/web-components/card/standard.ts
```

## Vite Config Notes

- `WORKSPACE_ALIASES` in `vite.config.ts` resolve `@universityofmaryland/*` sub-path imports to sibling `dist/` directories during dev/CDN builds
- Module build externalizes all `@universityofmaryland/*` imports; CDN/bundle builds inline everything
- `manualChunks` groups `/utilities/` and `/_types` into shared chunks
- Path alias `helpers` → `source/helpers` for clean imports

## Attribute Conventions

Components use `data-*` attributes (migrated from bare attributes):
- `data-theme` — `dark`, `light`, `maryland`
- `data-visual` — `transparent`, `aligned`, `bordered`
- `data-display` — `list`, `block`
- `data-loading-priority` — `eager`, `lazy`

Legacy bare attributes (`theme`, `visual`) still work but emit deprecation warnings.

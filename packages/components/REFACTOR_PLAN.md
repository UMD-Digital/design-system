# Components Package Refactor Plan

## Executive Summary

This document outlines a comprehensive plan to refactor the components package export system to:
1. Use named exports exclusively (aligning with monorepo standards)
2. Eliminate redundant export patterns
3. Maintain 100% backwards compatibility
4. Improve maintainability for future component additions
5. Enable future CDN builds per component category

---

## Current State Analysis

### Problem 1: Triple Export Pattern in `api/index.ts`

Each component appears THREE times:

```typescript
// 1. Import from source file (uses default export)
import accordionItem from './accordion/item';

// 2. Re-export with @internal annotation (WHY?)
/** @internal */ export { default as accordionItem } from './accordion/item';

// 3. Grouped object for Components.accordion.item() API
export const accordion = { item: accordionItem };
```

**Issues:**
- 309 lines of repetitive code
- `@internal` annotation is misleading (these ARE public exports)
- Imports bypass the category index files entirely
- Hard to maintain when adding new components

### Problem 2: Default Exports Everywhere

```typescript
// api/card/standard.ts
export default CardModel({ tagName: 'umd-element-card' });

// api/hero/base.ts
export default BaseHero;

// source/index.ts
export default LoadUmdComponents;

// exports/bundle.ts
export default UmdBundle;
```

**Violates:** Monorepo standard of "Named exports only - No default exports"

### Problem 3: Category Index Files Are Bypassed

```typescript
// api/card/index.ts - DOES convert to named exports
export { default as standard } from './standard';

// BUT api/index.ts ignores this and imports directly:
import cardStandard from './card/standard';
```

The category index files do the right thing, but `api/index.ts` doesn't use them.

### Problem 4: package.json Has Invalid `require` Fields

```json
"require": "./dist/index.js"  // Package is ESM-only, this doesn't work
```

### Problem 5: Test Files Import Default Exports

```typescript
// __tests__/card/standard.test.ts
import cardStandard from '../../source/api/card/standard';
```

Tests will need updating as part of the migration.

---

## Proposed Architecture

### Directory Structure (Final State)

```
source/
├── web-components/           # Renamed from api/
│   ├── accordion/
│   │   ├── index.ts          # Category barrel
│   │   └── item.ts           # Named export
│   ├── card/
│   │   ├── index.ts
│   │   ├── _model.ts         # Shared model (internal)
│   │   ├── standard.ts
│   │   ├── overlay.ts
│   │   └── ...
│   └── index.ts              # Main barrel (simplified)
├── exports/
│   ├── loader.ts             # Shared utilities
│   ├── bundle.ts             # Full bundle
│   ├── cdn.ts                # CDN build entry
│   ├── structural.ts
│   ├── interactive.ts
│   ├── feed.ts
│   └── content.ts
├── helpers/
│   ├── slots.ts
│   └── styles.ts
├── _types.ts
└── index.ts
```

### Export Pattern (Final State)

#### Individual Component Files

```typescript
// web-components/card/standard.ts

// ... component implementation ...

/**
 * Standard Card Component
 * @category Components
 */
export const CardStandard = CardModel({ tagName: 'umd-element-card' });

// Backwards compatibility alias (lowercase for grouped API)
export { CardStandard as standard };
```

#### Category Index Files

```typescript
// web-components/card/index.ts

// Re-export with lowercase aliases for Components.card.standard() API
export { CardStandard, standard } from './standard';
export { CardOverlay, overlay } from './overlay';
export { CardArticle, article } from './article';
export { CardEvent, event } from './event';
export { CardIcon, icon } from './icon';
export { CardVideo, video } from './video';
```

#### Main web-components/index.ts (Dramatically Simplified)

```typescript
// web-components/index.ts

/**
 * Component Registration Functions
 *
 * Grouped exports for the Components.category.variant() pattern.
 */

// Namespace exports - provides Components.card.standard() API
export * as accordion from './accordion';
export * as actions from './actions';
export * as alert from './alert';
export * as brand from './brand';
export * as card from './card';
export * as carousel from './carousel';
export * as feed from './feed';
export * as footer from './footer';
export * as hero from './hero';
export * as layout from './layout';
export * as media from './media';
export * as navigation from './navigation';
export * as pathway from './pathway';
export * as person from './person';
export * as quote from './quote';
export * as slider from './slider';
export * as social from './social';
export * as stat from './stat';
export * as tab from './tab';
export * as text from './text';

// Flat named exports for direct imports and tree-shaking
export { CardStandard, CardOverlay, CardArticle, CardEvent, CardIcon, CardVideo } from './card';
export { HeroBase, HeroLogo, HeroMinimal, HeroExpand, HeroGrid, HeroVideoArrow } from './hero';
// ... etc for all components
```

**Result:** ~50 lines instead of ~309 lines

#### Main index.ts (No Default Export)

```typescript
// source/index.ts

// Type exports
export type { /* all types */ } from './_types';
export type { SlotProps, BaseProps, OptionalProps, SlotResult } from '@universityofmaryland/web-model-library';

// Component namespace
export * as Components from './web-components';

// Re-export individual components for direct imports
export * from './web-components';

// Initialization functions
export { initializeBundle } from './exports/bundle';
export { loadComponentClass } from './exports/loader';

/**
 * @deprecated Use initializeBundle() from './bundle' instead.
 * Will be removed in v2.0.
 */
export { LoadUmdComponents } from './exports/loader';
```

---

## Backwards Compatibility Matrix

| Current Usage | After Refactor | Status |
|--------------|----------------|--------|
| `import LoadUmdComponents from '...'` | `import { LoadUmdComponents } from '...'` | Deprecated, works via named export |
| `import { Components } from '...'` | `import { Components } from '...'` | Works unchanged |
| `Components.card.standard()` | `Components.card.standard()` | Works unchanged |
| `import { initializeBundle } from '.../bundle'` | `import { initializeBundle } from '.../bundle'` | Works unchanged |
| `import UmdBundle from '.../bundle'` | `import { UmdBundle } from '.../bundle'` | Add named export |
| `import '@.../components/card'` | `import '@.../components/card'` | Works unchanged |
| `window.UmdWebComponents` (CDN) | `window.UmdWebComponents` | Works unchanged |

### Breaking Change Mitigation

The ONLY breaking change is removing default exports. Mitigation:

```typescript
// For LoadUmdComponents - already deprecated with warning
// source/index.ts
export { LoadUmdComponents } from './exports/loader';

// For UmdBundle - add named export alongside
// exports/bundle.ts
export { UmdBundle };
```

---

## Implementation Phases

### Phase 1: Foundation (Non-Breaking)

**Goal:** Convert individual component files to named exports with backwards-compat aliases.

**Files to modify:** All files in `api/*/` directories (~60 files)

**Pattern:**
```typescript
// Before (api/card/standard.ts)
export default CardModel({ tagName: 'umd-element-card' });

// After
export const CardStandard = CardModel({ tagName: 'umd-element-card' });
export { CardStandard as standard };
export default CardStandard; // TEMPORARY for backwards compat
```

**Test after:** `npm test` passes, `npm run build` succeeds

### Phase 2: Update Category Index Files

**Goal:** Export both PascalCase names and lowercase aliases.

**Files to modify:** `api/*/index.ts` (~20 files)

**Pattern:**
```typescript
// Before (api/card/index.ts)
export { default as standard } from './standard';

// After
export { CardStandard, standard } from './standard';
```

**Test after:** `npm test` passes, `npm run build` succeeds

### Phase 3: Simplify api/index.ts

**Goal:** Remove triple export pattern, use namespace exports.

**Before:** ~309 lines with imports, @internal exports, and grouped objects
**After:** ~50 lines with namespace exports

```typescript
// Before
import accordionItem from './accordion/item';
/** @internal */ export { default as accordionItem } from './accordion/item';
// ... 60+ more imports ...
export const accordion = { item: accordionItem };
// ... 20+ more grouped objects ...

// After
export * as accordion from './accordion';
export * as actions from './actions';
// ... ~20 namespace exports
export { CardStandard, CardOverlay, /* ... */ } from './card';
// ... flat exports for tree-shaking
```

**Test after:** Verify `Components.card.standard()` still works

### Phase 4: Update Main index.ts and exports/bundle.ts

**Goal:** Remove default exports from entry points.

**index.ts changes:**
- Remove `export default LoadUmdComponents`
- Add `export { LoadUmdComponents }` (deprecated)

**bundle.ts changes:**
- Remove `export default UmdBundle`
- Add `export { UmdBundle }`

### Phase 5: Update Test Files

**Goal:** Convert test imports from default to named.

**Files to modify:** ~50 test files

**Pattern:**
```typescript
// Before
import cardStandard from '../../source/api/card/standard';

// After
import { CardStandard } from '../../source/api/card/standard';
// or
import { standard as cardStandard } from '../../source/api/card/standard';
```

### Phase 6: Remove Temporary Default Exports

**Goal:** Remove the `export default` lines added in Phase 1.

**Prerequisite:** All tests pass with named imports.

### Phase 7: Rename api/ to web-components/

**Goal:** More descriptive directory name.

**Changes:**
1. Rename directory: `api/` → `web-components/`
2. Update imports in:
   - `source/index.ts`
   - `exports/*.ts`
   - `vite.config.ts`
3. Update package.json export paths if needed

### Phase 8: Clean Up package.json

**Goal:** Remove invalid `require` fields.

```json
// Before
{
  ".": {
    "types": "./dist/index.d.ts",
    "import": "./dist/index.js",
    "require": "./dist/index.js"  // Remove
  }
}

// After
{
  ".": {
    "types": "./dist/index.d.ts",
    "import": "./dist/index.js"
  }
}
```

---

## Future Enhancements (Post-Refactor)

### Per-Category CDN Builds

After refactor, adding category-specific CDN builds is straightforward:

```typescript
// vite.config.ts additions
const CDN_BUILDS = {
  'cdn': 'exports/cdn.ts',
  'cdn-structural': 'exports/cdn-structural.ts',
  'cdn-interactive': 'exports/cdn-interactive.ts',
  'cdn-feed': 'exports/cdn-feed.ts',
  'cdn-content': 'exports/cdn-content.ts',
};
```

```typescript
// exports/cdn-structural.ts
import { structuralComponents } from './structural';
import { loadComponentClass } from './loader';

const LoadStructuralComponents = () => {
  loadComponentClass(structuralComponents);
};

if (typeof window !== 'undefined') {
  (window as any).UmdStructuralComponents = {
    init: LoadStructuralComponents,
    Components: structuralComponents,
  };
}

export { LoadStructuralComponents };
```

### React/Vue Wrapper Packages

The `web-components/` naming enables:
```
source/
├── web-components/     # Current components
├── react-components/   # Future React wrappers
└── vue-components/     # Future Vue wrappers
```

---

## Validation Checklist

### After Each Phase

- [ ] `npm test` passes
- [ ] `npm run build` succeeds
- [ ] `npm run build:cdn` succeeds
- [ ] `npm run build:bundle` succeeds

### Final Validation

- [ ] All import patterns from compatibility matrix work
- [ ] CDN build registers components correctly
- [ ] Bundle build includes all dependencies
- [ ] TypeScript declarations are correct
- [ ] Tree-shaking works (verify with bundle analyzer)

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Breaking consumer imports | Low | High | Backwards compat aliases |
| Build failures during migration | Medium | Medium | Phased approach with tests |
| Type declaration issues | Medium | Low | Test with consuming project |
| CDN build size increase | Low | Low | Manual verification |

---

## Estimated Effort

| Phase | Files | Complexity | Estimate |
|-------|-------|------------|----------|
| Phase 1 | ~60 | Low | Mechanical changes |
| Phase 2 | ~20 | Low | Mechanical changes |
| Phase 3 | 1 | Medium | Logic changes |
| Phase 4 | 2 | Low | Simple changes |
| Phase 5 | ~50 | Low | Mechanical changes |
| Phase 6 | ~60 | Low | Remove lines |
| Phase 7 | ~10 | Medium | Path updates |
| Phase 8 | 1 | Low | Remove fields |

---

## Appendix: Current File Inventory

### Component Files (Default Export → Named Export)

```
api/accordion/item.ts
api/actions/display.ts
api/alert/page.ts
api/alert/promo.ts
api/alert/site.ts
api/brand/stack.ts
api/brand/chevron-scroll.ts
api/card/article.ts
api/card/event.ts
api/card/icon.ts
api/card/overlay.ts
api/card/standard.ts
api/card/video.ts
api/carousel/base.ts
api/carousel/cards.ts
api/carousel/image/single.ts
api/carousel/image/multiple.ts
api/carousel/thumbnail.ts
api/carousel/wide.ts
api/feed/alert.ts
api/feed/events/grid.ts
api/feed/events/grouped.ts
api/feed/events/list.ts
api/feed/experts/bio.ts
api/feed/experts/grid.ts
api/feed/experts/list.ts
api/feed/news/featured.ts
api/feed/news/grid.ts
api/feed/news/list.ts
api/footer/options.ts
api/hero/base.ts
api/hero/custom/video.ts
api/hero/custom/grid.ts
api/hero/custom/expand.ts
api/hero/logo.ts
api/hero/minimal.ts
api/layout/box-logo.ts
api/layout/image-expand.ts
api/layout/modal.ts
api/layout/section-intro/small.ts
api/layout/section-intro/wide.ts
api/layout/scroll-top.ts
api/layout/sticky-columns.ts
api/media/inline.ts
api/media/gif.ts
api/navigation/breadcrumb.ts
api/navigation/drawer.ts
api/navigation/header.ts
api/navigation/item.ts
api/navigation/slider.ts
api/navigation/sticky.ts
api/pathway/image.ts
api/pathway/highlight.ts
api/person/bio.ts
api/person/display.ts
api/person/hero.ts
api/quote/display.ts
api/slider/event/display.ts
api/slider/event/feed.ts
api/social/sharing.ts
api/stat/display.ts
api/tab/display.ts
api/text/event-lockup.ts
```

### Model Files (Internal - Default Export OK but Convert for Consistency)

```
api/card/_model.ts
api/alert/_model.ts (if exists)
... etc
```

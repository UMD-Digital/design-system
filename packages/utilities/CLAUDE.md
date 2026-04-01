# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package Overview

`@universityofmaryland/web-utilities-library` — shared utility functions for all UMD Design System packages. Provides 56+ utilities organized into 15 categories with selective import support.

**Dependencies**: `@universityofmaryland/web-token-library`, `postcss`, `postcss-js`, `postcss-nesting`
**Peer dependency**: `@universityofmaryland/web-styles-library`

## Commands

```bash
npm run build              # Vite production build (ES modules only)
npm run dev                # Vite watch mode
npm test                   # Jest (all 48 suites, 1032+ tests)
npm test -- __tests__/dom  # Run tests for a single category
npm test -- __tests__/dom/addClass.test.ts  # Run a single test file
npm run test:watch         # Jest watch mode
npm run test:coverage      # Coverage report (target: 100%)
npm run test:snapshot      # Update snapshots
npm run docs               # Generate TypeDoc
```

## Source Categories

```
source/
├── accessibility/   # Focus trapping, keyboard nav, motion preferences, alt text
├── adapters/        # Type converters (ComponentRef → UMDElement/ElementVisual)
├── animation/       # Smooth scroll, grid animations, shrink-remove
├── date/            # Date formatting (display, comparison, event details)
├── dom/             # Class manipulation, parent finding, icon extraction, cloning
├── elements/        # Slot/template creation for Shadow DOM web components
├── events/          # Keyboard handling, swipe gesture detection
├── media/           # SVG parsing, image conversion, responsive sizing
├── network/         # GraphQL fetch with bearer auth
├── performance/     # Debounce
├── storage/         # localStorage get/set wrappers
├── string/          # Capitalize, truncate (word-boundary and size-based)
├── styles/          # JSS→CSS conversion (via PostCSS), media queries, view timeline
├── theme/           # Boolean→token mappings (isDark → colors, variants, borders)
├── validation/      # Slot image validation, HTMLElement type guard
└── types/           # PostCSS type declarations
```

## Architecture

### Category barrel pattern

Every category has an `index.ts` that re-exports individual utility files. The main `source/index.ts` re-exports all categories as namespaces. The Vite config lists each category as a separate entry point, enabling three import levels:

```typescript
// Category import (preferred)
import { addClass } from '@universityofmaryland/web-utilities-library/dom';
// Individual import (max tree-shaking)
import { addClass } from '@universityofmaryland/web-utilities-library/dom/addClass';
// Main export (convenience)
import { addClass } from '@universityofmaryland/web-utilities-library';
```

### Theme utility

`source/theme/index.ts` exports a `theme` object with methods (`variant`, `foreground`, `background`, `border`, `inverse`, `fontColor`, `subdued`, `muted`) that centralize `isDark?: boolean` → design token value mappings. This eliminates scattered ternary expressions across consuming packages.

### Styles utilities

`jssToCSS` is the most heavily used utility. It converts JSS objects to CSS strings using PostCSS with the `postcss-nesting` plugin. This is the runtime path that processes all component styles in the design system.

### Adapters

`toUMDElement` and `toElementVisual` safely convert `ComponentRef` results (which may be `DocumentFragment` or `HTMLElement`) into typed interfaces for downstream consumption. They include type narrowing via `instanceof HTMLElement`.

## Adding a New Utility

1. Create `source/{category}/{utilityName}.ts` with named export
2. Add `export { utilityName } from './{utilityName}'` to `source/{category}/index.ts`
3. Category is already re-exported from `source/index.ts` via `export * from './{category}'`
4. If adding a **new category**: add entry to `vite.config.ts` `lib.entry`, add exports to `package.json`, add re-export to `source/index.ts`
5. Create `__tests__/{category}/{utilityName}.test.ts`

## Testing Conventions

- Tests live in `__tests__/{category}/` mirroring the source structure
- Test environment: jsdom (configured in `jest.config.js`)
- Jest config extends root `../../jest.config.cjs`
- Test our utility logic only — don't assert token values or DOM API behavior
- Structure: happy path → edge cases → error conditions → consistency → type checks
- Use `jest.useFakeTimers()` for debounce/timing tests
- Mocks are auto-generated from `/__mocks__/` at repo root

## Build Details

- ES modules only (`.js`) — no CommonJS
- Named exports only — no default exports
- `preserveModules: true` with `preserveModulesRoot: 'source'` keeps individual files in dist
- All `@universityofmaryland/*` packages and postcss libs are externalized
- `vite-plugin-dts` generates `.d.ts` files alongside each module
- `minify: false` — consumers handle minification

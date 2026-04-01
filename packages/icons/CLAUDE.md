# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package Overview

The **Icons Package** (`@universityofmaryland/web-icons-library`) provides SVG icon and logo assets as exported string constants. No runtime dependencies.

## Commands

```bash
pnpm run build           # Vite production build (ES modules + .d.ts)
pnpm run dev             # Build with watch mode
pnpm run test            # Jest tests
pnpm run test:watch      # Jest watch mode
pnpm run test:coverage   # Jest with coverage report
pnpm run test:snapshot   # Update Jest snapshots

# Single test file
npx jest __tests__/arrows.test.ts
```

## Source Structure

Icons live in `source/`, one directory per category. Each category has an `index.ts` that exports `const` SVG strings. The root `source/index.ts` re-exports all categories.

**Categories**: `arrows`, `brand`, `calendar`, `communication`, `controls`, `files`, `indicators`, `location`, `logos`, `media`, `people`, `search`, `social`

### Naming Convention

Icon exports use **snake_case** (not UPPER_CASE):

```typescript
export const arrow_up = `<svg ...>...</svg>`;
export const arrow_left = `<svg ...>...</svg>`;
```

### Logos Category — Nested Namespace

`logos/` is unique: it uses namespace re-exports (`export * as umd from './umd'`) creating nested objects with `dark`/`light` variants:

```typescript
import * as logos from '@universityofmaryland/web-icons-library/logos';
logos.umd.dark;       // SVG string
logos.forward.light;  // SVG string
// Sub-namespaces: campaign, forward, seal, umd
```

## Build & Exports

Vite builds each category as a separate entry point with `preserveModules: true`. The `package.json` exports map supports three import depths:

```typescript
// Category import (recommended)
import { arrow_up } from '@universityofmaryland/web-icons-library/arrows';

// Deep import to individual file
import { arrow_up } from '@universityofmaryland/web-icons-library/arrows/index';

// Main barrel (all icons)
import { arrow_up } from '@universityofmaryland/web-icons-library';
```

ES modules only — no CommonJS. Named exports only — no default exports.

## Tests

Tests are in `__tests__/` at the package root (not inside `source/`), one file per category. Each test verifies:

- Export availability (`toBeDefined`)
- Valid SVG markup (`toContain('<svg')`)
- Accessibility attributes (`aria-hidden="true"`, `title`)

No mocks needed — this package has zero dependencies.

## SVG Conventions

All icon SVGs include:
- `aria-hidden="true"` attribute
- `title` attribute on the `<svg>` element (not a `<title>` child element)
- `viewBox` for scaling
- Inline `fill` colors or `fill="none"` with stroke paths

Icons are sourced from Figma design files. Direct edits may be overwritten on next Figma sync.

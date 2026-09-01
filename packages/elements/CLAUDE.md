# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

See the root [CLAUDE.md](/CLAUDE.md) for monorepo-wide conventions (ES modules only, named exports only, Vite build pattern, design token system).

## Package Overview

The **Elements Package** (`@universityofmaryland/web-elements-library`) provides foundational UI element builders. Elements return `ElementModel` objects containing DOM nodes and associated CSS styles. This package is consumed by the `components` and `feeds` packages.

**Workspace dependencies**: `web-token-library`, `web-builder-library`, `web-utilities-library`, `web-styles-library`, `web-icons-library`

## Commands

```bash
pnpm start                # Watch mode (alias for pnpm dev)
pnpm build                # Production build
pnpm test                 # Run all tests
pnpm test -- path/to/test # Run single test file
pnpm run test:watch       # Watch mode for tests
pnpm run test:coverage    # Generate coverage report
pnpm run test:snapshot    # Update snapshots
```

## Source Structure

```
source/
├── _types.ts         # Shared types: ElementModel, ThemeProps, SizeProps, type guards
├── atomic/           # Simple, single-purpose elements
│   ├── actions/      # Links, button-like elements
│   ├── animations/   # Animation definitions
│   ├── assets/       # Images, videos
│   ├── buttons/      # Button elements
│   ├── events/       # Event meta, sign displays
│   ├── layout/       # Layout containers (block, overlay, person)
│   ├── text/         # Text elements
│   └── text-lockup/  # 10 text composition variants (small, medium, large, date, contact, person, etc.)
├── composite/        # Complex multi-part elements (16 categories)
│   ├── accordion, alert, banner, card, carousel, footer, hero,
│   │   layout, media, navigation, pathway, person, quote,
│   │   slider, social, tabs
└── layout/           # Layout grid utilities (grid, stacked, gridGap, gridBorder, gridOffset, image)
```

### Entry Points

| Export path | Entry file | Contents |
|---|---|---|
| `.` | `source/index.ts` | Re-exports Atomic, Composite, Layout namespaces |
| `./atomic` | `source/atomic/index.ts` | actions, animations, assets, buttons, events, layout, text, textLockup |
| `./composite` | `source/composite/index.ts` | accordion, alert, banner, card, carousel, footer, hero, layout, media, navigation, pathway, person, quote, slider, social, tabs |
| `./layout` | `source/layout/index.ts` | Image, stacked, grid, gridGap, gridBorder, gridOffset |

### Path Aliases (vite.config.ts + tsconfig.json)

These aliases allow bare imports within the package source:

| Alias | Resolves to |
|---|---|
| `_types` | `source/_types` |
| `helpers` | `source/helpers` |
| `atomic` | `source/atomic` |
| `composite` | `source/composite` |
| `layout` | `source/layout` |

Example: `import { assets } from 'atomic'` resolves to `source/atomic/index.ts`

## Element Model Pattern

All elements return this interface (defined in `source/_types.ts`):

```typescript
interface ElementModel {
  element: HTMLElement;
  styles: string;
  update?: (props: any) => void;
  destroy?: () => void;
}
```

Elements are built using `ElementBuilder` from `@universityofmaryland/web-builder-library`:

```typescript
export const createTextLockupSmall = (props: TextLockupSmallProps): ElementModel => {
  return new ElementBuilder('div')
    .withClassName('text-lockup-small')
    .styled(textLockupStyles)
    .withChildIf(props.eyebrow, eyebrowElement)
    .withChild(headlineElement)
    .build();
};
```

## Import Organization

Follow this ordering in all source files:

```typescript
// 1. Styles - namespace imports
import * as token from '@universityofmaryland/web-styles-library/token';
import * as layout from '@universityofmaryland/web-styles-library/layout';

// 2. Builder - default import
import ElementBuilder from '@universityofmaryland/web-builder-library';

// 3. Utilities - named imports with subpaths
import { extractIconElement } from '@universityofmaryland/web-utilities-library/dom';
import { combineStyles } from '@universityofmaryland/web-utilities-library/styles';

// 4. Icons - named imports with icon prefix aliases
import { email as iconEmail } from '@universityofmaryland/web-icons-library/communication';
import { arrow_long as iconArrowLong } from '@universityofmaryland/web-icons-library/arrows';

// 5. Relative directory resources
import { createContainer } from './container';

// 6. Package resources via path aliases
import { assets } from 'atomic';

// 7. Local types (use `type` keyword)
import { type CarouselWideProps } from './_types';

// 8. Package-level types
import { type BaseProps } from '../../_types';
```

**Key rules**: Styles always use `import * as`. Builder always uses default import. Icons use `icon` prefix aliases. Types always use `type` keyword. Blank lines between groups.

## Testing

- **Framework**: Jest with JSDOM
- **Test location**: `__tests__/` (package root, not inside source)
- **Guide**: See `__tests__/TESTING.md` for philosophy and patterns
- **Mocks**: All `@universityofmaryland/*` packages are auto-mocked via Jest config. See `/__mocks__/MOCKS.md` for the mock system.

**Testing philosophy**: Test element creation logic (DOM structure, props handling, Element Model return values). Don't test external package logic (token values, utility implementations, style compilation).

## Shared Types (`source/_types.ts`)

Common prop interfaces used across elements:

- **ThemeProps**: `isThemeDark`, `isThemeLight`, `isThemeGold`, `isThemeMaryland`
- **SizeProps**: `isSizeSmall`, `isSizeMedium`, `isSizeLarge`
- **DisplayProps**: `isAligned`, `hasBorder`, `isTransparent`, `isFullWidth`, `isSticky`, `isFixed`
- **LayoutProps**: `isTextCenter`, `isTextRight`, `isVerticalCenter`, `isHorizontalCenter`
- **MediaProps**: `autoPlay`, `loop`, `muted`, `poster`, `controls`
- **ContentElement**: `HTMLElement | null`

Type guards: `isImageElement()`, `isVideoElement()`, `isLinkElement()`, `isButtonElement()`, `isDivElement()`, `hasContent()`, `hasImageContent()`, `hasVideoContent()`

### Style Override Props

Caller-supplied style overrides are defined once in `source/_types.ts` as `StyleOverrideProps` — factories accept them via `Pick<StyleOverrideProps, 'customStyles'>` (or `'elementStyles'`), never by re-declaring the props inline:

- **`customStyles?: Record<string, any>`** — a flat JSS record merged into the root element's own styles (spread inside the `element` key of `.withStyles({ element: { ... } })`). Do not use `additionalStyles` or `additionalElementStyles` — these are deprecated aliases that were renamed to `customStyles`.
- **`elementStyles?: ElementStyles`** — the full structured `ElementStyles` object (`element`, `pseudoBefore`, `pseudoAfter`, `siblingAfter`, `subElement`) forwarded whole to `ElementBuilder.withStyles()`.

`ElementBaseProps` (also in `source/_types.ts`) combines `ThemeProps + CommonContentProps + StyleOverrideProps` — the standard prop bag consumers can assemble once and spread into any factory.

Note: `elementStyles` is also the conventional import alias for `@universityofmaryland/web-styles-library/element`. Prefer a different alias (e.g. `stylePresets`) in new files to keep the prop name greppable.

## Image Wrapper & Captions

Many elements reuse a shared image wrapper. There are **two wrapper paths**, and both have captions **off by default** — a consumer must opt in:

1. **`atomic/assets/image/background.ts`** (`assets.image.background`) — the widely reused background/asset image wrapper. `isShowCaption?: boolean` defaults to `false`. When enabled, caption text is read from the `data-credit` attribute on the `<img>` (`data-caption` is deprecated, removed in 3.0) and rendered as a static overlay span styled with `Styles.element.asset.image.caption`.
2. **`layout/image.ts`** (`createLayoutImageContainer`) — layout image container. `showCaption?: boolean` defaults to `false`; `isToggleCaption?: boolean` picks the caption UI from `atomic/assets/image/caption.ts` (`createCaption.create`): a collapsible toggle button (`true`) or a block overlay (`false`). Note: `createCaption.bindToggle(clone)` must be called on any cloned caption markup (e.g. duplicated carousel slides) — `cloneNode` drops listeners; see `composite/carousel/elements/equal-width-items.ts`.

### Caption use cases

Elements that opt in to captions (everything not listed keeps the default of no caption — notably all `card/*`, `person/*`, `carousel/wide`, `hero/logo`, and `animations/brand/card-stack` consumers of `assets.image.background`):

| Element (source file) | Wrapper | Caption style | Notes |
|---|---|---|---|
| `composite/hero/standard.ts` | `assets.image.background` | Static overlay span | Shown when `<img>` has `data-credit` |
| `composite/hero/minimal.ts` | `assets.image.background` | Static overlay span | Same |
| `composite/hero/overlay.ts` | `assets.image.background` | Static overlay span | Same |
| `composite/hero/stacked.ts` | `assets.image.background` | Static overlay span | Same |
| `composite/hero/custom/expand.ts` | `assets.image.background` | Static overlay span | Same |
| `composite/hero/custom/grid.ts` | `assets.image.background` | Static overlay span | Same |
| `composite/pathway/_common.ts` | `assets.image.background` | Static overlay span | All standard pathway variants |
| `composite/pathway/hero.ts` | `assets.image.background` | Static overlay span | Pathway hero variant |
| `composite/media/elements/gif.ts` | `assets.image.background` | Static overlay span | GIF media asset |
| `composite/carousel/image/standard.ts` | `createLayoutImageContainer` | Toggle (default) or block | `isToggleCaption` prop, default `true` |
| `composite/carousel/image/multiple.ts` | `createLayoutImageContainer` | Toggle (default) or block | Same |
| `composite/carousel/elements/overlay.ts` | `createLayoutImageContainer` | Toggle (default) or block | Fullscreen carousel overlay |
| `composite/media/inline/standard.ts` | `createLayoutImageContainer` | Block | `showCaption: true` |
| `composite/media/inline/caption.ts` | `createLayoutImageContainer` | Block | Plus a slotted text caption below the image |
| `composite/media/inline/wrapped.ts` | `createLayoutImageContainer` | Block | Text-wrapped variant |

When building a new element that reuses either wrapper, decide explicitly whether image credits should surface and document the choice — do not rely on the default silently.

## ElementBuilder Migration

Elements are being migrated from direct DOM manipulation to the `ElementBuilder` fluent API. Most atomic and many composite elements have been migrated. When creating or modifying elements, use `ElementBuilder` — do not introduce direct `document.createElement` patterns.

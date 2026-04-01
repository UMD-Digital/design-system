# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package Overview

`@universityofmaryland/web-styles-library` — JSS (JavaScript Style Sheets) objects, design tokens, CSS utilities, and static CSS exports for the UMD Design System. All styles are JavaScript objects that can be transformed to CSS.

**Depends on**: `@universityofmaryland/web-token-library` (workspace), PostCSS (nesting, deduplication)

## Commands

```bash
npm run build          # Vite module build + CDN build (IIFE) + CSS generation
npm run build:cdn      # CDN-only IIFE bundle
npm run build:css      # Generate static CSS files from JSS (tsx scripts/generate-css.ts)
npm run build:tailwind # Generate Tailwind 4 CSS files (tsx scripts/generate-tailwind.ts)
npm run dev            # Vite watch mode
npm test               # Jest (node environment)
npm test -- path/to/test.test.ts  # Single test file
npm run test:watch     # Jest watch mode
npm run test:coverage  # Jest with coverage report
npm run test:snapshot  # Update snapshots
```

## Source Architecture

```
source/
├── _types.ts          # Core types: JssEntry, JssObject, JssInputFormat, JssNamedOutputFormat
├── index.ts           # Main entry — builds preRender/postRender pipeline, re-exports all modules
├── root.ts            # Root and reset styles, CSS variable definitions
├── web-components.ts  # Web component base styles (single file, not a directory)
├── accessibility/     # Screen reader, skip link styles
├── animation/         # Transitions, loaders, line animations
├── element/           # Buttons (action/), forms (field/), text styles, images (asset/), events
├── layout/            # Grid systems, backgrounds, spacing (horizontal/vertical), alignment
├── typography/        # Sans, serif, campaign, stats styles + font-face/ definitions
├── utilities/         # create/ (JSS/style builders), transform/ (JSS↔CSS, variables), dom/ (token application)
├── exports/           # generate.ts (CSS generation), tailwind.ts, cdn.ts — programmatic build APIs
└── tailwind/          # Tailwind 4 CSS generation (generator.ts)
```

### Entry Point Pipeline (`index.ts`)

The main entry organizes styles into a render pipeline:

1. **preRender** — root + reset + webComponentStyles (base CSS that loads first)
2. **postRender** — all module namespaces flattened via `formatNestedObjects()` (category styles)
3. **outputStyles** — font-faces + preRender + postRender (complete bundle)

Both `preRenderCss` and `postRenderCss` are exported as resolved CSS `Promise<string>`.

### Tokens

Tokens come from the separate `@universityofmaryland/web-token-library` package and are re-exported as `token` from the main entry. There is no `source/token/` directory in this package.

## Build System

Three build outputs from a single `vite.config.ts`:

1. **Module Build** — ES modules with `preserveModules: true`, 8+ entry points (index, accessibility, animation, element, layout, typography, utilities, tailwind, exports/*). All `@universityofmaryland/*` externalized.
2. **CDN Build** (`BUILD_CDN=true`) — Single IIFE bundle at `dist/cdn.js`, all deps inlined.
3. **CSS Build** (`scripts/generate-css.ts`) — 10 minified CSS files in `dist/css/` generated from JSS modules via `generateCSSStrings()` in `exports/generate.ts`.
4. **Tailwind Build** (`scripts/generate-tailwind.ts`) — Tailwind 4 CSS + theme-only CSS via `generateTailwindStrings()` in `exports/tailwind.ts`.

**ES modules only, named exports only. No CommonJS, no default exports.**

## Testing

- **Framework**: Jest, node environment, config in `jest.config.cjs` (extends root)
- **Location**: `__tests__/` at package root (not inside `source/`)
- **Guide**: See `__tests__/TESTING.md` for detailed testing philosophy and patterns
- **Pattern**: Snapshot testing for style object consistency; transformation testing for JSS→CSS; structure testing for property presence
- **What to test**: Style exports, JSS objects, CSS/variable transformation, utility functions
- **What NOT to test**: PostCSS internals, token values from the token library, browser CSS parsing

## JSS Pattern

All styles are JavaScript objects with a `className` property:

```typescript
export const myStyle: JssObject = {
  className: 'my-class',
  color: 'red',
  '&:hover': { color: 'blue' }
};
```

Use `utilities/create/jss.ts` → `objectWithClassName()` for type-checked JSS creation.
Use `utilities/transform/jss.ts` for JSS→CSS conversion.
Use `utilities/transform/variables.ts` for token→CSS variable conversion.

## Composable Style Pattern

Files with 3+ related style variants use a composable function pattern:

```typescript
export interface ButtonOptions {
  size?: 'normal' | 'large';
  color?: 'default' | 'white';
}

export function composeButton(options?: ButtonOptions): JssObject {
  const { size = 'normal', color = 'default' } = options || {};
  // Build from base styles, layer variant-specific properties
  return create.jss.objectWithClassName({ ...composed, className: [...] });
}

// Static exports for backwards compatibility
export const normal = composeButton();
export const large = composeButton({ size: 'large' });
```

### Where it's used

- **element/action/**: `composePrimary()`, `composeSecondary()`, `composeOutline()`, `composeIcon()`
- **element/text/**: `composeSimple()`, `composeAdvanced()`, `composePill()`, `composeWatermark()`, `composeTrailing()`, `composeAdjacent()`, `composeLink()`
- **element/asset/**: `composeWrapper()`, `composeAspect()`
- **layout/background/**: `composeFull()`, `composeHighlight()`, `composeQuarter()`, `composeWrap()`
- **layout/grid/**: `composeColumns()`, `composeBordered()`, `composeGap()`
- **layout/space/**: `composeHorizontal()`

### When to use it

Use when: 3+ related variants share a base structure with only 1-3 varying properties (size, color, theme). Good signal: you're copying/pasting code to create a new variant.

Don't use when: exports serve fundamentally different purposes, have unique base structures, or are single-purpose (e.g., `caption.ts`, `code.ts`, `vertical.ts` spacing contexts).

### Implementation checklist

1. Define TypeScript interface with all options
2. Set sensible defaults for all optional parameters
3. Build className from option values
4. Include deprecated className aliases for migration
5. Maintain all existing static exports using the compose function

## Static CSS Exports

Pre-compiled CSS files in `dist/css/`, generated at build time from JSS:

| File | Content |
|------|---------|
| `tokens.min.css` | CSS custom properties (`:root` variables) |
| `font-faces.min.css` | `@font-face` rules |
| `styles.min.css` | Full bundle (includes tokens + all categories) |
| `base.min.css` | Root and reset styles (requires tokens) |
| `typography.min.css` | Typography classes (requires tokens) |
| `layout.min.css` | Layout/grid classes (requires tokens) |
| `element.min.css` | Buttons, forms, etc. (requires tokens) |
| `animation.min.css` | Animation utilities (requires tokens) |
| `accessibility.min.css` | Screen reader/a11y (requires tokens) |
| `web-components.min.css` | Web component styles (requires tokens) |

Import `tokens.min.css` before any category file, or use `styles.min.css` for the full bundle.

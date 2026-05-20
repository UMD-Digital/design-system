# University of Maryland Styles Library

[![Styles Version](https://img.shields.io/badge/Styles-v1.8.11-blue)](https://www.npmjs.com/package/@universityofmaryland/web-styles-library)

The foundation of the UMD Design System, providing design tokens, CSS utilities, and styling patterns that ensure consistent, accessible, and brand-compliant University of Maryland digital experiences.

## Overview

The UMD Styles Library is the cornerstone of visual consistency across all University of Maryland web properties. It provides a comprehensive collection of design tokens (colors, typography, spacing), utility classes, and CSS-in-JS objects that implement official UMD brand guidelines. This package serves as the single source of truth for styling, enabling developers to build interfaces that are automatically consistent, accessible, and responsive.

## Installation

```bash
# Using npm
npm install @universityofmaryland/web-styles-library

# Using yarn
yarn add @universityofmaryland/web-styles-library
```

### Peer Dependencies

For CSS transformation features:

```bash
npm install postcss postcss-js postcss-nesting postcss-discard-duplicates
```

## Quick Start

### Static CSS Imports (Recommended)

The simplest way to use the styles library is to import the pre-compiled CSS files directly.

#### Vite

No extra configuration needed—just import in your code:

```typescript
// In your main entry file (e.g., main.ts)
import '@universityofmaryland/web-styles-library/css/styles.min.css';
```

#### Webpack

Requires `css-loader` and `style-loader` (or `mini-css-extract-plugin` for production):

```typescript
// In your entry file
import '@universityofmaryland/web-styles-library/css/styles.min.css';
```

#### Selective Imports

Import only what you need for smaller bundle sizes:

```typescript
// Critical CSS (load first to prevent FOUT/FOUC)
import '@universityofmaryland/web-styles-library/css/font-faces.min.css';
import '@universityofmaryland/web-styles-library/css/tokens.min.css';
import '@universityofmaryland/web-styles-library/css/base.min.css';
import '@universityofmaryland/web-styles-library/css/typography.min.css';
import '@universityofmaryland/web-styles-library/css/web-components.min.css';
```

#### Available CSS Files

| File | Description | Requires Tokens |
|------|-------------|-----------------|
| `styles.min.css` | Full bundle (includes tokens) | No |
| `tokens.min.css` | CSS custom properties for design tokens | - |
| `font-faces.min.css` | @font-face rules for all font families | No |
| `base.min.css` | Root and reset styles | Yes |
| `typography.min.css` | Typography utility classes | Yes |
| `layout.min.css` | Layout and grid utility classes | Yes |
| `element.min.css` | Element styles (buttons, forms, etc.) | Yes |
| `animation.min.css` | Animation utility classes | Yes |
| `accessibility.min.css` | Screen reader and a11y utilities | Yes |
| `web-components.min.css` | Web component styles | Yes |

### CDN Usage (unpkg.com)

For quick prototyping or projects without a build system, load styles directly via CDN.

#### CSS Files

```html
<!-- Full bundle -->
<link rel="stylesheet" href="https://unpkg.com/@universityofmaryland/web-styles-library/dist/css/styles.min.css">

<!-- Or load specific files -->
<link rel="stylesheet" href="https://unpkg.com/@universityofmaryland/web-styles-library/dist/css/tokens.min.css">
<link rel="stylesheet" href="https://unpkg.com/@universityofmaryland/web-styles-library/dist/css/typography.min.css">
<link rel="stylesheet" href="https://unpkg.com/@universityofmaryland/web-styles-library/dist/css/layout.min.css">
```

#### Render-Blocking Critical CSS

For optimal performance, load critical styles as render-blocking in the `<head>` to prevent Flash of Unstyled Text (FOUT) and Flash of Unstyled Content (FOUC):

```html
<head>
  <!-- Critical: Render-blocking CSS (prevents FOUT/FOUC) -->
  <link rel="stylesheet" href="https://unpkg.com/@universityofmaryland/web-styles-library/dist/css/font-faces.min.css" blocking="render">
  <link rel="stylesheet" href="https://unpkg.com/@universityofmaryland/web-styles-library/dist/css/tokens.min.css" blocking="render">
  <link rel="stylesheet" href="https://unpkg.com/@universityofmaryland/web-styles-library/dist/css/base.min.css" blocking="render">
  <link rel="stylesheet" href="https://unpkg.com/@universityofmaryland/web-styles-library/dist/css/typography.min.css" blocking="render">
  <link rel="stylesheet" href="https://unpkg.com/@universityofmaryland/web-styles-library/dist/css/web-components.min.css" blocking="render">

  <!-- Non-critical: Load async using media="print" trick -->
  <link rel="stylesheet" href="https://unpkg.com/@universityofmaryland/web-styles-library/dist/css/layout.min.css" media="print" onload="this.media='all'">
  <link rel="stylesheet" href="https://unpkg.com/@universityofmaryland/web-styles-library/dist/css/animation.min.css" media="print" onload="this.media='all'">
</head>
```

**Why this matters:**
- `blocking="render"` ensures styles load before first paint
- Font-faces CSS loads custom fonts to prevent Flash of Unstyled Text (FOUT)
- Typography CSS applies font styles consistently
- Web-components CSS prevents Flash of Unstyled Content (FOUC) for custom elements
- Non-critical CSS uses the `media="print"` trick to load asynchronously without blocking render

#### JavaScript Bundle (IIFE)

For projects that need programmatic access to design tokens and style utilities without a build system:

```html
<script src="https://unpkg.com/@universityofmaryland/web-styles-library/dist/cdn.js"></script>
<script>
  const { token, layout, typography } = window.Styles;
  console.log(token.color.red); // #E21833
</script>
```

#### Version Pinning

For production environments, pin to a specific version to avoid unexpected changes:

```html
<!-- Pin to specific version for production -->
<link rel="stylesheet" href="https://unpkg.com/@universityofmaryland/web-styles-library@1.7.8/dist/css/styles.min.css">
<script src="https://unpkg.com/@universityofmaryland/web-styles-library@1.7.8/dist/cdn.js"></script>
```

#### Tailwind CSS Files

The library includes pre-built Tailwind CSS integration files:

```html
<!-- Tailwind 4 theme integration (use with Tailwind CSS) -->
<link rel="stylesheet" href="https://unpkg.com/@universityofmaryland/web-styles-library/dist/tailwind.css">

<!-- Theme-only (no Tailwind dependency, just UMD design tokens as CSS variables) -->
<link rel="stylesheet" href="https://unpkg.com/@universityofmaryland/web-styles-library/dist/tailwind-theme.css">
```

### Using with Tailwind CSS

```javascript
/** @type {import('tailwindcss').Config} */
import * as Styles from '@universityofmaryland/web-styles-library';
import plugin from 'tailwindcss/plugin';

const { token, root: utilities, outputStyles: components } = Styles;

export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: token.color,
      spacing: token.spacing,
      fontFamily: token.font.family,
    },
  },
  plugins: [
    plugin(({ addUtilities, addComponents }) => {
      addUtilities(utilities);
      addComponents(components);
    }),
  ],
};
```

## Recommended: Critical CSS Loading (Vite)

For production applications, split CSS into critical (render-blocking) and non-critical (deferred) bundles to optimize Core Web Vitals and prevent FOUT/FOUC.

### Why Critical CSS?

| Benefit | Description |
|---------|-------------|
| Prevents FOUT | Typography loads before first paint |
| Prevents FOUC | Web components styled immediately |
| Better LCP | Faster Largest Contentful Paint |
| Better CLS | No layout shift from late-loading styles |

### Critical vs Non-Critical Files

| Category | Files | Purpose |
|----------|-------|---------|
| **Critical** | font-faces, tokens, base, typography, web-components | Must load before first paint |
| **Non-Critical** | accessibility, layout, element | Can load after first paint |

### Project Structure

```
src/
├── styles/
│   ├── critical.css      # Critical CSS imports
│   └── main.css          # Non-critical CSS imports
├── index.html
└── vite.config.ts
```

## Web Components Performance: Coordinated Fade-In (CLS + LCP + FOUC)

UMD custom elements (`umd-*`) upgrade asynchronously, which can produce three measurable problems:

- **FOUC** — slot content flashes before the custom element registers
- **CLS** — the component's box shifts when its real dimensions appear
- **LCP** — naive "hide everything until ready" strategies inflate Largest Contentful Paint

The styles library addresses all three in two layers. Layer 1 is automatic; Layer 2 is opt-in.

### Layer 1 — Automatic placeholder sizing (no opt-in required)

Every supported `umd-*` element family in `web-components.min.css` reserves vertical space pre-upgrade via `:not(:defined)` rules using `min-height` and `contain-intrinsic-size` declared in **pixels per breakpoint** (mobile / tablet / desktop). This eliminates layout shift on upgrade with no work from you — as long as `web-components.min.css` loads in the critical path, which the Recommended critical CSS configuration above already covers.

LCP-bearing components (`hero*`, `carousel*`) intentionally leave their slot content visible pre-upgrade so the slot image or headline can be painted and counted as the LCP candidate. Below-the-fold families (cards, feeds, pathway) hide their slot content for stronger FOUC protection.

### Layer 2 — Opt-in coordinated fade-in

For pages where residual per-component pop-in is still distracting, opt into a single page-wide fade-in. Two pieces ship for this:

**1. CSS classes** (included in `base.min.css` and `styles.min.css`)

| Class | Effect |
|---|---|
| `html.umd-fout-gate` | `opacity: 0` |
| `html.umd-fout-ready` | `opacity: 1` with a 200 ms fade transition |

**2. JS coordinator** (subpath module — only loaded if you import it)

```ts
// Easiest — auto-runs on import with sensible defaults
import '@universityofmaryland/web-styles-library/scripts/fout-gate';
```

```ts
// Or explicit control
import { initFoutGate } from '@universityofmaryland/web-styles-library/scripts/fout-gate';

await initFoutGate({
  fallbackMs: 100,    // shorter fallback for fast networks (default: 200)
  tagPrefix: 'umd-',  // which custom-element prefix to wait for
});
```

The coordinator adds `umd-fout-gate` to `<html>` synchronously on import, awaits `customElements.whenDefined()` for every undefined `umd-*` tag currently in the DOM, then swaps to `umd-fout-ready` inside `requestAnimationFrame`. A configurable fallback timeout guarantees the page becomes visible even if a component never registers.

**Option defaults**

| Option | Type | Default |
|---|---|---|
| `gateClass` | `string` | `'umd-fout-gate'` |
| `readyClass` | `string` | `'umd-fout-ready'` |
| `tagPrefix` | `string` | `'umd-'` |
| `fallbackMs` | `number` | `200` |

### Why `<html>` and not `<body>`?

Chrome's LCP algorithm disqualifies elements inside an `opacity: 0` subtree from being LCP candidates — **except** when the `documentElement` itself is the opacity-0 ancestor (a carve-out for A/B testing libraries). Gating on `<body>` would inflate LCP by the entire gate duration; gating on `<html>` does not.

### Recommended: pre-apply the gate in HTML (zero-race opt-in)

For the lowest-risk loading order, ship the gate class directly in your HTML so it applies before any script executes. The JS coordinator then only handles release:

```html
<!DOCTYPE html>
<html lang="en" class="umd-fout-gate">
  <head>
    <link rel="stylesheet" href="https://unpkg.com/@universityofmaryland/web-styles-library/dist/css/base.min.css" blocking="render">
    <link rel="stylesheet" href="https://unpkg.com/@universityofmaryland/web-styles-library/dist/css/web-components.min.css" blocking="render">
    <script type="module" src="https://unpkg.com/@universityofmaryland/web-styles-library/dist/scripts/fout-gate.js"></script>
  </head>
  <body>
    <!-- your umd-* components here -->
  </body>
</html>
```

### When to skip Layer 2

Layer 1 alone (placeholder sizing) keeps CLS near zero on most pages. Skip the coordinated fade-in if:

- Your page has only one or two `umd-*` components — per-component pop-in is barely visible.
- You cannot guarantee the JS coordinator loads early (a late-loaded script leaves a window where content paints, then disappears, then re-appears).
- You are debugging visual issues — the gate hides everything, making CSS bugs harder to spot.
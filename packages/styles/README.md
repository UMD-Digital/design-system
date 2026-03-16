# University of Maryland Styles Library

[![Styles Version](https://img.shields.io/badge/Styles-v1.8.5-blue)](https://www.npmjs.com/package/@universityofmaryland/web-styles-library)

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

##
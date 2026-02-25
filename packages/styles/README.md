# University of Maryland Styles Library

[![Styles Version](https://img.shields.io/badge/Styles-v1.8.4-blue)](https://www.npmjs.com/package/@universityofmaryland/web-styles-library)

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

### Critical CSS Entry (src/styles/critical.css)

```css
/* Critical CSS - Render blocking */
@import '@universityofmaryland/web-styles-library/css/font-faces.min.css';
@import '@universityofmaryland/web-styles-library/css/tokens.min.css';
@import '@universityofmaryland/web-styles-library/css/base.min.css';
@import '@universityofmaryland/web-styles-library/css/typography.min.css';
@import '@universityofmaryland/web-styles-library/css/web-components.min.css';
```

### Non-Critical CSS Entry (src/styles/main.css)

```css
/* Non-critical CSS - Deferred loading */
@import '@universityofmaryland/web-styles-library/css/accessibility.min.css';
@import '@universityofmaryland/web-styles-library/css/layout.min.css';
@import '@universityofmaryland/web-styles-library/css/element.min.css';

/* Your application styles */
```

### Vite Configuration

```typescript
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        critical: 'src/styles/critical.css',
        main: 'src/styles/main.css',
      },
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'assets/[name].[hash].css';
          }
          return 'assets/[name].[hash][extname]';
        },
      },
    },
    cssCodeSplit: true,
  },
});
```

### HTML Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UMD App</title>

  <!-- Hide body until critical CSS loads -->
  <style id="critical-inline">
    body { content-visibility: hidden; }
  </style>

  <!-- Critical CSS - Render blocking -->
  <link rel="stylesheet" href="/critical.css" blocking="render">

  <!-- Non-critical CSS - Deferred -->
  <link rel="stylesheet" href="/main.css" media="print" onload="this.media='all'">
  <noscript>
    <link rel="stylesheet" href="/main.css">
  </noscript>
</head>
<body>
  <!-- App content -->
</body>
</html>
```

## Alternative Loading Patterns

Beyond CDN and direct bundler imports, the styles library supports several integration patterns for different environments and build systems.

### 1. Direct Node Modules Import (Recommended for Bundled Apps)

Import CSS directly in your entry file - your bundler handles the rest.

```typescript
// Works with Vite, Webpack, Rollup, etc.
import '@universityofmaryland/web-styles-library/css/tokens.min.css';
import '@universityofmaryland/web-styles-library/css/typography.min.css';
```

**Pros:** Zero config, tree-shaking, source maps, bundle optimization
**Cons:** Requires a bundler

### 2. Build-Time Extraction (Copy from node_modules)

Copy CSS files during build to your public/static directory.

**npm script approach:**
```json
{
  "scripts": {
    "copy:styles": "mkdir -p public/styles && cp node_modules/@universityofmaryland/web-styles-library/dist/css/*.min.css public/styles/"
  }
}
```

**Vite plugin approach:**
```typescript
import { copyFileSync, mkdirSync } from 'fs';

function copyStylesPlugin() {
  return {
    name: 'copy-styles',
    writeBundle() {
      const src = 'node_modules/@universityofmaryland/web-styles-library/dist/css';
      const dest = 'dist/styles';
      mkdirSync(dest, { recursive: true });
      copyFileSync(`${src}/tokens.min.css`, `${dest}/tokens.min.css`);
      copyFileSync(`${src}/typography.min.css`, `${dest}/typography.min.css`);
    }
  };
}
```

**Pros:** Works with any build system, full control over output location
**Cons:** Manual path maintenance when package updates

### 3. PostCSS Integration

Use `@import` in your CSS files with PostCSS processing.

```css
/* main.css */
@import '@universityofmaryland/web-styles-library/dist/css/tokens.min.css';
@import '@universityofmaryland/web-styles-library/dist/css/typography.min.css';

/* Your custom styles */
.my-component {
  color: var(--umd-color-red);
}
```

```javascript
// postcss.config.js
module.exports = {
  plugins: {
    'postcss-import': {},
  }
};
```

**Pros:** Integrates with existing CSS pipeline, allows composition
**Cons:** Requires PostCSS setup

### 4. Programmatic CSS Generation (SSR)

Generate CSS strings at runtime or build time using exported functions.

```typescript
import { generateCSSStrings } from '@universityofmaryland/web-styles-library/exports/generate';
import { writeFileSync } from 'fs';

async function build() {
  const css = await generateCSSStrings();

  // Write to files
  writeFileSync('public/tokens.css', css.tokens);
  writeFileSync('public/typography.css', css.typography);

  // Or inline in HTML
  const html = `<style>${css.tokens}${css.typography}</style>`;
}
```

**SSR middleware example:**
```typescript
let cssCache = null;

app.get('/styles/:category.css', async (req, res) => {
  if (!cssCache) {
    const { generateCSSStrings } = await import('@universityofmaryland/web-styles-library/exports/generate');
    cssCache = await generateCSSStrings();
  }
  res.type('text/css').send(cssCache[req.params.category]);
});
```

**Pros:** Dynamic generation, works with SSR frameworks
**Cons:** Runtime overhead, more complex setup

### 5. Tailwind CSS Integration

Use pre-built Tailwind theme files.

```css
/* Import in your main CSS */
@import '@universityofmaryland/web-styles-library/dist/tailwind.css';

/* Or theme-only (no Tailwind dependency) */
@import '@universityofmaryland/web-styles-library/dist/tailwind-theme.css';
```

**Pros:** Works with Tailwind projects, includes CSS variables
**Cons:** Larger file size than targeted imports

### 6. Static HTML Links (No Bundler)

Copy files and reference via `<link>` tags.

```bash
# Copy during deployment
cp node_modules/@universityofmaryland/web-styles-library/dist/css/tokens.min.css public/
cp node_modules/@universityofmaryland/web-styles-library/dist/css/typography.min.css public/
```

```html
<head>
  <link rel="stylesheet" href="/tokens.min.css" blocking="render">
  <link rel="stylesheet" href="/typography.min.css" blocking="render">
</head>
```

**Pros:** Works anywhere, no build tools needed
**Cons:** Manual file management, extra HTTP requests

### Loading Pattern Comparison

| Approach | Bundler Required | Best For |
|----------|------------------|----------|
| Direct Import | Yes | Modern web apps (Vite, Webpack) |
| Build Extraction | No | Static sites, SSR, CI/CD pipelines |
| PostCSS | Yes | CSS composition, custom pipelines |
| Programmatic | No | SSR, dynamic themes, Node.js apps |
| Tailwind | Yes | Tailwind CSS projects |
| Static Links | No | Legacy systems, HTML-only |

### Key Files in Package

| File | Description |
|------|-------------|
| `dist/css/font-faces.min.css` | @font-face rules for all font families |
| `dist/css/tokens.min.css` | CSS custom properties for design tokens |
| `dist/css/typography.min.css` | Typography utility classes |
| `dist/css/styles.min.css` | Full bundle (all CSS combined) |
| `dist/tailwind.css` | Tailwind 4 theme integration |
| `dist/tailwind-theme.css` | Theme-only CSS variables |
| `exports/generate` | Programmatic CSS generation functions |

## Standalone CSS Generation

```javascript
import * as Styles from '@universityofmaryland/web-styles-library';

// Pre-render CSS (fonts, variables, resets)
Styles.preRenderCss.then((css) => {
  const style = document.createElement('style');
  style.textContent = `${Styles.typography.fontFace.base64fonts} ${css}`;
  document.head.appendChild(style);
});

// Post-render CSS (utilities and components)
Styles.postRenderCss.then((css) => {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
});
```

## Core Features

### Design Tokens

> **Note**: Design tokens have been extracted to a standalone package [`@universityofmaryland/web-token-library`](../tokens). The styles package re-exports these tokens for backwards compatibility. For new projects, consider importing directly from the tokens package for better tree-shaking.

Official UMD brand values accessible as JavaScript objects:

```javascript
// Recommended (direct from tokens package)
import * as token from '@universityofmaryland/web-token-library';

// Also supported (backwards compatibility)
import { token } from '@universityofmaryland/web-styles-library';

// Colors
token.color.red; // #e21833
token.color.gold; // #FFD200
token.color.black; // #000000

// Spacing
token.spacing.sm; // 0.5rem
token.spacing.md; // 1rem
token.spacing.lg; // 1.5rem

// Typography
token.font.family.sans; // 'Helvetica Neue', Helvetica, Arial, sans-serif
token.font.size.base; // 1rem
token.font.weight.bold; // 700

// Breakpoints
token.media.breakpoints.tablet; // 768px
token.media.breakpoints.desktop; // 1024px
```

### Utility Classes

Pre-built utility classes for common patterns:

```css
/* Layout spacing */
.umd-layout-space-vertical-landing
.umd-layout-space-horizontal-larger

/* Grid systems */
.umd-grid-gap-three
.umd-grid-gap-masonry

/* Typography */
.umd-sans-largest-uppercase
.umd-text-rich-simple-large

/* Backgrounds */
.umd-background-quarter-light
.umd-background-full-dark;
```

### CSS-in-JS Objects

All styles are available as JavaScript objects:

```javascript
import {
  animation,
  element,
  layout,
} from '@universityofmaryland/web-styles-library';

// Animation utilities
const fadeIn = animation.line.fadeInSimpleDark;
// Returns: { className: 'umd-fadein-simple-dark', ...styles }

// Element styles
const primaryButton = element.action.primary.normal;

// Layout patterns
const gridThree = layout.grid.columnsThree;
```

## Integration with Other Packages

### Components Package Integration

The Styles Library provides all visual styling for web components:

```html
<!-- Components use styles automatically -->
<umd-element-card data-theme="dark">
  <!-- Styled by the styles package -->
</umd-element-card>

<!-- Combine with utility classes -->
<div class="umd-layout-space-vertical-landing">
  <umd-element-hero><!-- content --></umd-element-hero>
</div>
```

### Elements Package Support

Elements rely on styles for all visual properties:

```javascript
import { Composite } from '@universityofmaryland/web-elements-library';
// Elements automatically include necessary styles
```

### Feeds Package Styling

Feed components inherit consistent styling:

```javascript
import { news } from '@universityofmaryland/web-feeds-library';
// Feeds use grid and card styles automatically
```

## Available Style Modules

### Core Modules

- **token** - Design tokens (colors, spacing, typography, media queries)
- **root** - CSS reset and variables
- **typography** - Font faces, sizes, and text styles
- **layout** - Grid systems, spacing, alignment
- **element** - Component-specific styles
- **animation** - Transitions and animations
- **accessibility** - Screen reader and a11y utilities

### Utility Modules

- **utilities.transform** - JSS to CSS conversion
- **utilities.create** - Style generation helpers
- **utilities.dom** - DOM manipulation utilities

## Common Use Cases

### Setting Up Base Styles

```javascript
import * as Styles from '@universityofmaryland/web-styles-library';

// Option 1: Use pre-built bundles
async function loadStyles() {
  const preRender = await Styles.preRenderCss;
  const postRender = await Styles.postRenderCss;

  // Apply styles to document
  const fonts = Styles.typography.fontFace.base64fonts;
  document.head.insertAdjacentHTML(
    'beforeend',
    `<style>${fonts} ${preRender}</style>`,
  );

  // After body renders
  document.head.insertAdjacentHTML('beforeend', `<style>${postRender}</style>`);
}

// Option 2: Select specific styles
const selectedStyles = await Styles.utilities.create.style.toString({
  ...Styles.layout.grid,
  ...Styles.element.action,
  ...Styles.typography.sans,
});
```

### Using Design Tokens

```javascript
// In JavaScript
const theme = {
  primaryColor: Styles.token.color.red,
  secondaryColor: Styles.token.color.gold,
  baseSpacing: Styles.token.spacing.md,
};

// As CSS variables
Styles.utilities.dom.tokens(Styles.variables);
// Creates: --color-red: #e21833; etc.
```

### Responsive Design

```javascript
// Media query tokens
const { breakpoints } = Styles.token.media;

// Use in CSS-in-JS
const responsiveCard = {
  padding: Styles.token.spacing.md,
  [`@media (min-width: ${breakpoints.tablet})`]: {
    padding: Styles.token.spacing.lg,
  },
  [`@media (min-width: ${breakpoints.desktop})`]: {
    padding: Styles.token.spacing.xl,
  },
};
```

### Tailwind Integration

See our [Tailwind Integration Guide](./tailwind.html) for detailed setup instructions.

## TypeScript Support

Full TypeScript support with type definitions:

```typescript
import type {
  JssObject,
  JssEntry,
} from '@universityofmaryland/web-styles-library';

// Type-safe style objects
const customStyle: JssObject = {
  className: 'my-custom-class',
  color: Styles.token.color.red,
  padding: Styles.token.spacing.md,
};
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Considerations

- **Tree-shakeable** - Import only what you need
- **CSS Variables** - Runtime theming support
- **Optimized bundles** - Pre/post render splitting
- **Cached transforms** - Efficient CSS generation

## Accessibility

All styles follow WCAG 2.1 AA guidelines:

- Color contrast ratios meet standards
- Focus states are clearly visible
- Typography supports readability
- Reduced motion preferences respected

## Documentation

- **[Complete Style Reference](./)** - All modules and utilities
- **[Design Tokens](./modules/token.html)** - Colors, spacing, typography
- **[Tailwind Guide](./tailwind.html)** - Tailwind CSS integration
- **[Layout System](./modules/layout.html)** - Grid and spacing utilities

## Testing

```bash
# Run tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

## Contributing

See the [main repository](https://github.com/umd-digital/design-system) for contribution guidelines.

## License

University of Maryland

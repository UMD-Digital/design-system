# CLAUDE.md - Components Package

## Package Overview

The **Components Package** (`@universityofmaryland/web-components-library`) provides Web Components (Custom Elements) that wrap the elements package for declarative, HTML-based usage. This is the primary consumer-facing package.

**Version**: 1.16.4
**Dependencies**:
- `@universityofmaryland/web-elements-library`
- `@universityofmaryland/web-feeds-library`
- `@universityofmaryland/web-styles-library`
- `@universityofmaryland/web-icons-library`
- `@universityofmaryland/web-utilities-library`
- `@universityofmaryland/web-model-library`
- `@universityofmaryland/web-token-library`

## Build System

### Vite Configuration

- **Builder**: Vite with TypeScript
- **Output Formats**: ES Modules only (`.js`) - No CommonJS support
- **Export Style**: Named exports only - No default exports
- **External Dependencies**: All `@universityofmaryland/*` packages (except in special builds)
- **Type Declarations**: Generated with `vite-plugin-dts`
- **Code Splitting**: Manual chunks for shared code

### Build Commands

```bash
npm run build      # Main build + CDN build
npm run build:cdn  # CDN-only build (IIFE format)
npm run vite       # Development watch mode
npm test          # Run all tests
```

### Special Builds

The components package creates THREE build outputs:

1. **Module Build** (`npm run build`): 
   - Code-split ES modules with external dependencies
   - For npm/yarn installations with build tools
   - Optimal tree-shaking and bundle sizes

2. **CDN Build** (`BUILD_CDN=true`):
   - Single-file IIFE bundle
   - All dependencies bundled (no externals)
   - For `<script>` tag usage without build tools
   - Exposed as `window.UmdWebComponents`

3. **Bundle Build** (special):
   - Combined bundle for specific integration needs
   - All dependencies included but ESM format

### CDN vs Module Usage

**Module Build** (npm install):
```javascript
import '@universityofmaryland/web-components-library';
// Or selective imports
import '@universityofmaryland/web-components-library/components/hero';
```

**CDN Build** (script tag):
```html
<script src="https://cdn.example.com/components/cdn.js"></script>
<!-- Components auto-register -->
<umd-hero headline="Welcome"></umd-hero>
```

## Package Structure

### Source Organization

```
source/
├── api/              # Web Component definitions
│   ├── alert/           # Alert components
│   ├── card/            # Card components
│   ├── carousel/        # Carousel components
│   ├── feed/            # Feed components
│   ├── hero/            # Hero components
│   ├── navigation/      # Navigation components
│   ├── person/          # Person display components
│   ├── quote/           # Quote components
│   └── ...
├── exports/          # Export entry points
│   ├── bundle.ts        # Bundle export
│   ├── cdn.ts           # CDN export
│   ├── structural.ts    # Structural components
│   ├── interactive.ts   # Interactive components
│   ├── feed.ts          # Feed components
│   └── content.ts       # Content components
├── helpers/          # Component utilities
└── model/            # Component models and utilities
```

### Export Pattern

```typescript
// Import all components
import '@universityofmaryland/web-components-library';

// Import by category
import '@universityofmaryland/web-components-library/structural';
import '@universityofmaryland/web-components-library/interactive';

// Import individual component
import '@universityofmaryland/web-components-library/components/hero';
```

## package.json Exports

```json
{
  "type": "module",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    },
    "./cdn": {
      "types": "./dist/cdn.d.ts",
      "import": "./dist/cdn.js"
    },
    "./structural": {
      "types": "./dist/structural.d.ts",
      "import": "./dist/structural.js"
    },
    "./components/*": {
      "types": "./dist/components/*.d.ts",
      "import": "./dist/components/*.js"
    }
  }
}
```

**Note**: CommonJS (`require`) is not supported. Use ES module `import` only.

## Web Component Pattern

All components follow Web Components standards:

```typescript
class UmdHero extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    // Use elements package to build UI
    const heroElement = createHeroElement({
      headline: this.getAttribute('headline'),
      text: this.getAttribute('text')
    });
    
    // Inject into shadow DOM
    this.shadowRoot.innerHTML = `
      <style>${heroElement.styles}</style>
    `;
    this.shadowRoot.appendChild(heroElement.element);
  }
}

customElements.define('umd-hero', UmdHero);
```

### Usage

```html
<umd-hero 
  headline="Welcome to UMD" 
  text="Discover excellence"
  theme="dark">
</umd-hero>
```

## Component Categories

### Structural
Layout and container components (hero, section, footer)

### Interactive
User-interaction components (carousel, accordion, tabs)

### Feed
Dynamic content components (news feed, events feed)

### Content
Content display components (quote, person, card)

## Shadow DOM and Styles

Components use Shadow DOM for:
- **Style Encapsulation**: Styles don't leak out
- **Slot Distribution**: Content projection with `<slot>`
- **Custom Properties**: CSS variables for theming

```typescript
// Component exposes CSS variables
:host {
  --umd-color-primary: var(--theme-primary, #e21833);
}
```

## Testing

- **Framework**: Jest with JSDOM
- **Location**: `source/__tests__/`
- **Pattern**: Test component registration, attributes, rendering
- **Mocks**: Mock external dependencies and elements

## Best Practices

1. **Attributes vs Properties**: Use attributes for simple values, properties for objects
2. **Event Naming**: Use kebab-case for custom events (`detail-change`)
3. **Slot Usage**: Provide named slots for flexible content
4. **Accessibility**: Include ARIA attributes and keyboard support
5. **Performance**: Use lazy loading for off-screen components

## Build Output

### Module Build
- `dist/index.js` - Main entry
- `dist/structural.js` - Structural components
- `dist/interactive.js` - Interactive components
- `dist/components/{name}.js` - Individual components
- `dist/shared/{category}.js` - Shared chunks

### CDN Build
- `dist/cdn.js` - Single IIFE bundle with all dependencies

### Build Optimization

The build uses manual chunking:

```typescript
manualChunks: (id) => {
  if (id.includes('/utilities/')) return 'shared/utilities';
  if (id.includes('/model/')) return 'shared/model';
  if (id.includes('/_types')) return 'shared/types';
}
```

This creates shared chunks that multiple components can reference.

## Integration with Elements

Components wrap elements for declarative usage:

```typescript
// Elements package (imperative)
import { createHero } from '@universityofmaryland/web-elements-library/composite';
const hero = createHero({ headline: 'Hello' });
document.body.appendChild(hero.element);

// Components package (declarative)
import '@universityofmaryland/web-components-library/components/hero';
document.body.innerHTML = '<umd-hero headline="Hello"></umd-hero>';
```

## External Dependencies Handling

### Module Build
- Externals: All `@universityofmaryland/*` packages
- Consumer must install peer dependencies
- Optimal for applications with build tools

### CDN Build
- Externals: None (all bundled)
- Self-contained and ready to use
- Larger file size but zero setup

## Notes

- Components are framework-agnostic Web Components
- Works in vanilla JS, React, Vue, Angular, etc.
- CDN build enables no-build workflows
- Module build provides maximum optimization
- Shadow DOM ensures style isolation
- All components follow UMD design system guidelines

## Common Patterns

### Theming
```html
<umd-hero theme="dark" theme-style="maryland"></umd-hero>
```

### Slots
```html
<umd-card>
  <img slot="image" src="...">
  <h3 slot="headline">Title</h3>
  <p slot="text">Description</p>
</umd-card>
```

### Events
```javascript
document.querySelector('umd-carousel')
  .addEventListener('slide-change', (e) => {
    console.log('New slide:', e.detail.index);
  });
```

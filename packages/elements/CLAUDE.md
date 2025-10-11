# CLAUDE.md - Elements Package

## Package Overview

The **Elements Package** (`@universityofmaryland/web-elements-library`) provides foundational UI element builders using the Element Model pattern. Elements return JavaScript objects containing DOM nodes and their associated styles.

**Version**: 1.4.8
**Dependencies**: 
- `@universityofmaryland/web-styles-library` (peer)
- `@universityofmaryland/web-icons-library` (peer)
- `@universityofmaryland/web-utilities-library`

## Build System

### Vite Configuration

- **Builder**: Vite with TypeScript
- **Output Formats**: ES Modules (`.mjs`) and CommonJS (`.js`)
- **External Dependencies**: All `@universityofmaryland/*` packages
- **Type Declarations**: Generated with `vite-plugin-dts`
- **Module Preservation**: `preserveModules: true` for granular imports

### Build Commands

```bash
npm run build      # Production build
npm run dev        # Watch mode
npm run clean      # Remove dist and build directories
npm test          # Run all tests
```

## Package Structure

### Source Organization

```
source/
├── atomic/       # Simple, single-purpose elements
│   ├── actions/      # Links, buttons
│   ├── animations/   # Animation elements
│   ├── assets/       # Images, videos
│   ├── buttons/      # Button elements
│   ├── events/       # Event-related displays
│   ├── layout/       # Layout containers
│   └── text-lockup/  # Text composition elements
├── composite/    # Complex, multi-part elements
│   ├── alert/        # Alert components
│   ├── card/         # Card variations
│   ├── carousel/     # Carousel systems
│   ├── footer/       # Footer compositions
│   ├── hero/         # Hero sections
│   ├── navigation/   # Navigation systems
│   ├── person/       # Person displays
│   ├── quote/        # Quote displays
│   └── ...
├── layout/       # Layout utilities
└── model/        # Element models and utilities
```

### Export Pattern

```typescript
// Category import
import { textLockup, assets } from '@universityofmaryland/web-elements-library/atomic';
import { createAlert } from '@universityofmaryland/web-elements-library/composite';

// Main export
import { textLockup, createAlert } from '@universityofmaryland/web-elements-library';
```

## Element Model Pattern

All elements return an `ElementModel` object:

```typescript
interface ElementModel {
  element: HTMLElement | DocumentFragment;  // DOM node
  styles: string;                          // Associated CSS
  update?: (props: any) => void;           // Optional updater
  destroy?: () => void;                    // Optional cleanup
}
```

### Example Usage

```typescript
import { textLockup } from '@universityofmaryland/web-elements-library/atomic';

const myElement = textLockup.small({
  eyebrow: 'Category',
  headline: 'My Headline',
  text: 'Description text'
});

// Inject into DOM
document.body.appendChild(myElement.element);

// Inject styles
const styleEl = document.createElement('style');
styleEl.textContent = myElement.styles;
document.head.appendChild(styleEl);
```

## package.json Exports

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    },
    "./atomic": {
      "types": "./dist/atomic.d.ts",
      "import": "./dist/atomic.mjs",
      "require": "./dist/atomic.js"
    },
    "./composite": {
      "types": "./dist/composite.d.ts",
      "import": "./dist/composite.mjs",
      "require": "./dist/composite.js"
    }
  }
}
```

## Key Concepts

### Atomic vs Composite

- **Atomic**: Simple, single-purpose elements (buttons, text lockups, images)
- **Composite**: Complex combinations of atomic elements (heroes, cards, footers)

### Style Integration

Elements use JSS from the styles package:

```typescript
import * as token from '@universityofmaryland/web-styles-library/token';
import * as layout from '@universityofmaryland/web-styles-library/layout';
import { convertJSSObjectToStyles } from '@universityofmaryland/web-utilities-library/styles';

const styles = convertJSSObjectToStyles({
  styleObj: {
    '.my-element': {
      padding: token.spacing.md,
      ...layout.grid.inline.tabletRows
    }
  }
});
```

## Testing

- **Framework**: Jest with JSDOM
- **Location**: `source/__tests__/`
- **Pattern**: Test element creation, styles, and props
- **Mocks**: Mock external dependencies

## Best Practices

1. **Use Namespace Imports**: For styles library modules
   - ✅ `import * as token from '@universityofmaryland/web-styles-library/token'`
   - ❌ `import token from '@universityofmaryland/web-styles-library/token'`

2. **Element Model**: Always return `{ element, styles }`
3. **Props Validation**: Use TypeScript interfaces for props
4. **Style Scoping**: Use unique class names to avoid conflicts
5. **Accessibility**: Include ARIA attributes and semantic HTML

## Build Output

- `dist/index.{js,mjs,d.ts}` - Main export with all elements
- `dist/atomic.{js,mjs,d.ts}` - Atomic elements
- `dist/composite.{js,mjs,d.ts}` - Composite elements
- `dist/layout.{js,mjs,d.ts}` - Layout utilities
- `dist/model.{js,mjs,d.ts}` - Element models
- Preserved module structure for granular imports

## Notes

- Elements are framework-agnostic
- Peer dependencies allow version flexibility
- Element Model pattern enables consistent API
- Styles are co-located with elements
- Used as building blocks for components package

# CLAUDE.md - Elements Package

## Package Overview

The **Elements Package** (`@universityofmaryland/web-elements-library`) provides foundational UI element builders using the Element Model pattern. Elements return JavaScript objects containing DOM nodes and their associated styles.

**Version**: 1.5.5
**Dependencies**:
- `@universityofmaryland/web-token-library`
- `@universityofmaryland/web-builder-library`
- `@universityofmaryland/web-utilities-library`
- `@universityofmaryland/web-styles-library` (peer)
- `@universityofmaryland/web-icons-library` (peer)

## Planned: ElementBuilder Migration

**Status**: In Progress (v1.17+)

All elements are being migrated to use the ElementBuilder pattern for consistency:

```typescript
// Before (direct manipulation)
export const createTextLockup = (props: TextLockupProps): ElementModel => {
  const container = document.createElement('div');
  container.classList.add('umd-text-lockup');
  // ... manual DOM construction
  return { element: container, styles };
};

// After (ElementBuilder)
export const createTextLockup = (props: TextLockupProps): ElementModel => {
  return new ElementBuilder('div')
    .withClassName('umd-text-lockup')
    .styled(textLockupStyles)
    .withChildIf(props.eyebrow, eyebrowElement)
    .withChild(headlineElement)
    .withChildIf(props.text, textElement)
    .build();
};
```

**Migration Order**:
1. Atomic elements (text-lockup, buttons, actions) - In Progress
2. Assets (images, videos, gifs)
3. Events (meta, sign)
4. Composite elements (cards, heroes, navigation)
5. Complex composites (carousel, pathway, footer)

See [PLAN.md](/PLAN.md) for implementation roadmap.

## Build System

### Vite Configuration

- **Builder**: Vite with TypeScript
- **Output Formats**: ES Modules only (`.js`) - No CommonJS support
- **Export Style**: Named exports only - No default exports
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
  "type": "module",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    },
    "./atomic": {
      "types": "./dist/atomic.d.ts",
      "import": "./dist/atomic.js"
    },
    "./composite": {
      "types": "./dist/composite.d.ts",
      "import": "./dist/composite.js"
    }
  }
}
```

**Note**: CommonJS (`require`) is not supported. Use ES module `import` only.

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

## Import Organization

All TypeScript files should follow this import ordering structure:

```typescript
// 1. Styles package - Use namespace imports
import * as token from '@universityofmaryland/web-styles-library/token';
import * as layout from '@universityofmaryland/web-styles-library/layout';

// 2. Builder package - Default import
import ElementBuilder from '@universityofmaryland/web-builder-library';

// 3. Utilities package - Named imports with specific paths
import { extractIconElement } from '@universityofmaryland/web-utilities-library/dom';
import { combineStyles } from '@universityofmaryland/web-utilities-library/styles';

// 4. Icons package - Named imports with aliases
import { email as iconEmail } from '@universityofmaryland/web-icons-library/communication';
import { arrow_long as iconArrowLong } from '@universityofmaryland/web-icons-library/arrows';

// 5. Relative directory resources - Named imports
import { createContainer } from './container';
import { createImage } from './image';

// 6. Package resources - Named imports using aliases
import { assets } from 'atomic';
import { textLockup } from 'atomic';

// 7. Local types - Type imports from component _types
import { type CarouselWideProps } from './_types';

// 8. Package types - Type imports from package-level _types
import { type BaseProps } from '../../_types';
```

**Key Rules:**
- Styles: Always use namespace imports (`import * as`)
- Builder: Always use default import
- Utilities: Use specific subpath imports
- Icons: Use named imports with `icon` prefix aliases
- Types: Always use `type` keyword in imports
- Group related imports together
- Maintain blank lines between groups

## Best Practices

1. **Use Namespace Imports**: For styles library modules
   - ✅ `import * as token from '@universityofmaryland/web-styles-library/token'`
   - ❌ `import token from '@universityofmaryland/web-styles-library/token'`

2. **Import Ordering**: Follow the structure defined above
3. **Element Model**: Always return `{ element, styles }`
4. **Props Validation**: Use TypeScript interfaces for props
5. **Style Scoping**: Use unique class names to avoid conflicts
6. **Accessibility**: Include ARIA attributes and semantic HTML

## Build Output

- `dist/index.{js,d.ts}` - Main export with all elements (ES module only)
- `dist/atomic.{js,d.ts}` - Atomic elements
- `dist/composite.{js,d.ts}` - Composite elements
- `dist/layout.{js,d.ts}` - Layout utilities
- `dist/model.{js,d.ts}` - Element models
- Preserved module structure for granular imports

## Notes

- Elements are framework-agnostic
- Peer dependencies allow version flexibility
- Element Model pattern enables consistent API
- Styles are co-located with elements
- Used as building blocks for components package

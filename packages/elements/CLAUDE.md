# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the University of Maryland Web Elements Library - a foundational UI library that provides atomic and composite building blocks for creating UMD digital properties. The library is built with TypeScript and follows a modular architecture.

## Build Commands

```bash
# Development - watch mode with webpack
npm start
# or
npm run webpack

# Production build
npm run build

# Clean build artifacts
npm run clean

# Publish to npm (includes build)
npm run release

# Update version badges
npm run prebuild
```

## Architecture

The library is organized into five main categories:

1. **Atomic Elements** (`source/atomic/`) - Basic building blocks
   - actions (buttons, links)
   - animations (transitions, loaders)
   - assets (images, icons)
   - buttons (specialized button components)
   - events (event-related UI)
   - layout (basic layout components)
   - text-lockup (text groupings)

2. **Composite Elements** (`source/composite/`) - Complex UI patterns built from atomic elements
   - Components like accordion, alert, banner, card, carousel, footer, hero, navigation, person, quote, etc.
   - Each composite typically has multiple variations (e.g., card has block, list, overlay)

3. **Layout** (`source/layout/`) - Page layout controls

4. **Model** (`source/model/`) - Element creation and interaction patterns
   - elements/ - Factory functions for creating various element types
   - modifiers/ - Style and behavior modifiers

5. **Utilities** (`source/utilities/`) - Helper functions
   - accessibility - ARIA and focus management
   - assets - Icon and logo utilities
   - markup - DOM manipulation helpers
   - styles - CSS-in-JS utilities

## Key Patterns

### Element Structure
Elements typically return an object with:
- `element`: The DOM HTMLElement
- `styles`: Associated CSS styles
- `update`: Method to update properties
- `destroy`: Cleanup method

### File Structure Pattern
All element files should follow this consistent structure:

1. **Imports** - External dependencies, utilities, and types
2. **Interfaces** - File-specific TypeScript interfaces
3. **Constants** - Structured constants using `as const`
   - `CLASS_NAMES` - All CSS class names
   - `THEME_VALUES` - Theme-related values (sizes, colors, etc.)
   - `ANIMATION_CONFIG` - Animation configurations
   - Other domain-specific constants
4. **Reusable pure functions** - Small, testable, Unix-type functions
5. **Component structure** - UI element creation functions
6. **Default export** - Main component function

Example structure:
```typescript
// Imports
import * as Styles from '@universityofmaryland/web-styles-library';
import * as Utils from 'utilities';
import { ElementModel } from 'model';
import { type ElementVisual } from '_types';

// Interfaces
interface ComponentProps {
  // ...
}

// Constants
const CLASS_NAMES = {
  CONTAINER: 'component-container',
  // ...
} as const;

const THEME_VALUES = {
  MAX_WIDTH: '1200px',
  // ...
} as const;

// Pure functions
const buildChildren = (props: ComponentProps): ElementVisual[] => {
  // ...
};

// Component structure
const createSubComponent = (props: ComponentProps) => {
  return ElementModel.create({
    element: document.createElement('div'),
    className: CLASS_NAMES.SUB,
    children: buildChildren(props),
    elementStyles: { /* ... */ },
  });
};

// Default export
export default (props: ComponentProps) => {
  return ElementModel.create({
    element: document.createElement('div'),
    className: CLASS_NAMES.CONTAINER,
    children: [createSubComponent(props)],
    elementStyles: { /* ... */ },
    events: {
      onClick: () => { /* ... */ },
    },
  });
};
```

### Best Practices
- Use the `children` property in ElementModel instead of manual DOM manipulation
- Extract magic numbers and strings into constants
- Create helper functions for building children arrays
- Use `Utils` imports instead of direct utility imports
- Return early from functions when appropriate
- Avoid IIFEs in default exports

### TypeScript Configuration
- Source files in `source/` directory
- Output to `dist/` directory
- Uses module resolution for clean imports
- Extends base tsconfig from repository root

### Webpack Configuration
- Entry point: `source/index.ts`
- Outputs UMD module to `dist/index.js`
- Handles TypeScript, CSS (with PostCSS), and images
- PostCSS configured for autoprefixing and modern CSS features

### CSS Processing
- PostCSS with autoprefixer
- CSS modules loaded as strings for CSS-in-JS
- Supports IE 11 through postcss-preset-env

## Development Tips

- The library exports everything through the main index file
- Each category (Atomic, Composite, etc.) has its own index that re-exports all sub-modules
- Elements are designed to be tree-shakable
- CSS is typically included within components as strings
- Follow existing patterns when adding new elements - check similar components first
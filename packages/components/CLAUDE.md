# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server with watch mode
npm start

# Build for production (outputs to dist/)
npm run build

# Build and publish to npm
npm run release
```

## Architecture Overview

This is a Web Components library that extends `@universityofmaryland/web-elements-library`. Components are built using Shadow DOM and a slot-based content distribution system.

### Component Structure

Each component follows this pattern:
1. **API file** (`source/api/[component]/index.ts`) - Defines the custom element class
2. **Model exports** - Components may have `_model.ts` files for shared types
3. **Variants** - Complex components have multiple variant files (e.g., card has standard.ts, overlay.ts, etc.)

### Model System

The framework provides utilities in `source/model/`:
- **Attributes**: Validation and handling of HTML attributes
- **Slots**: Extraction and validation of slotted content
- **Registration**: Component registration with the browser

Key patterns:
- Use `CreateElement()` for DOM creation
- Use `SlotOberserver` for reactive slot content
- Validate attributes with `AttributeHandler`
- Register components with their tag names (e.g., `umd-card`)

### Styling

- Components use Shadow DOM for style encapsulation
- Styles are written in PostCSS and processed through Tailwind
- Animation utilities available in `source/utilities/animations.ts`

## Component Development

When creating or modifying components:
1. Extend the base Web Element class
2. Define allowed attributes in the component
3. Handle slot content validation
4. Use the markup utilities for DOM manipulation
5. Follow the existing naming conventions (umd-[component])

## Testing and Validation

The library emphasizes accessibility (WCAG 2.1 AA compliance). When working with components:
- Ensure proper ARIA attributes
- Test keyboard navigation
- Validate HTML structure using the markup utilities
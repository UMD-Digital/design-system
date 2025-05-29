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
- Use `SlotObserver` for reactive slot content
- Validate attributes with `AttributeHandler`
- Register components with their tag names (e.g., `umd-card`)

### Attribute System

The component library uses a sophisticated attribute system with two types of attributes:

1. **Configuration Attributes (data-*)**
   - Use HTML5 data attributes: `data-theme`, `data-display`, `data-visual-open`
   - Set initial component state and configuration
   - Example: `<umd-element-card data-theme="dark" data-display="list">`

2. **Observed Attributes**
   - Trigger component behavior when changed
   - Examples: `is-visual-open`, `resize`, `is-visual-closed`
   - Used for programmatic control: `element.setAttribute('is-visual-open', 'true')`

**Attribute Handlers**
- Located in `source/model/attributes/handler.ts`
- Observers watch for specific attribute changes and execute callbacks
- Use `Attributes.handler.combine()` to apply multiple handlers
- Common observers: `resize`, `visuallyOpen`, `visuallyClosed`

**Deprecation Pattern**
- Old attributes (without `data-` prefix) are being phased out
- Deprecated attributes log warnings but still function
- Will be removed in version 2.0

### Styling

- Components use Shadow DOM for style encapsulation
- Styles are written in PostCSS and processed through Tailwind
- Animation utilities available in `source/utilities/animations.ts`

## Component Development

When creating or modifying components:
1. Extend the base Web Element class using `Model.createCustomElement()`
2. Define allowed attributes in the component
3. Handle slot content validation
4. Use the markup utilities for DOM manipulation
5. Follow the existing naming conventions (umd-[component])

### Documentation Standards

When documenting components, follow this pattern:

```typescript
/**
 * Component Name
 *
 * Brief description of the component's purpose.
 *
 * ## Custom Element
 * `<umd-element-name>`
 *
 * ## Slots
 * - `slot-name` - Description (required/optional, accepts: element types)
 *
 * ## Attributes
 * - `data-attribute` - Configuration attributes with options:
 *   - `value1` - Description
 *   - `value2` - Description
 *
 * ## Observed Attributes
 * - `attribute-name` - Description of what it triggers
 *
 * @example
 * [Examples of usage]
 *
 * @category Components
 * @since 1.0.0
 */
```

## Testing and Validation

The library emphasizes accessibility (WCAG 2.1 AA compliance). When working with components:
- Ensure proper ARIA attributes
- Test keyboard navigation
- Validate HTML structure using the markup utilities
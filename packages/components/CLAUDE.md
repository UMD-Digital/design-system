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

### Type System Architecture

The library uses a modular type system with clear separation between type definitions and implementations:

#### Type Definitions (`source/model/types.ts`)

Pure type definitions and interfaces:
- `ComponentRef` - Base reference returned by all component factories
- `CreateComponentFunction` - Standard signature for component creation functions
- `ComponentRegistration` - Function signature for registering components
- `ComponentConfiguration` - Complete configuration object for components
- `SlotConfig` & `SlotConfiguration` - Slot system types
- `CommonSlots` - Pre-defined slot configurations (headline, text, actions, etc.)
- `ThemeProps`, `VisualStateProps`, `LayoutProps` - Component property interfaces
- `BaseContentProps` & `ExtendedContentProps` - Content structure types
- `ComponentEvents` - Event handler interfaces
- `TypedComponentRef` - Extended component reference with typed events

#### Helper Functions Locations

Implementations are organized by domain:
- **Attribute Handlers** (`source/model/attributes/handler.ts`)
  - `CommonAttributeHandlers` - Pre-configured handlers (resize, visualToggle, accordion)
- **Lifecycle Utilities** (`source/model/utilities/lifecycle.ts`)
  - `CommonLifecycleHooks` - Standard hooks (loadOnConnect, loadAnimation, resizeOnConnect)
- **Registration Utilities** (`source/model/utilities/register.ts`)
  - `createComponentRegistration` - Helper to create registration functions
- **Validation Utilities** (`source/utilities/markup/validate.ts`)
  - `isHTMLElement` - Type guard for HTML elements

#### Import Convenience (`source/_types.ts`)

The `_types.ts` file provides a single import point that re-exports everything:
```typescript
// Import everything from one location
import {
  ComponentRef,
  CreateComponentFunction,
  CommonSlots,
  CommonAttributeHandlers,
  CommonLifecycleHooks,
  createComponentRegistration,
  isHTMLElement
} from '_types';
```

### Component Implementation Pattern

When creating components, follow this structure:

```typescript
import {
  CreateComponentFunction,
  SlotConfiguration,
  CommonSlots,
  CommonAttributeHandlers,
  createComponentRegistration,
} from '_types';

// Define component tag name
const tagName = 'umd-element-name';

// Define slots using CommonSlots where possible
const slots: SlotConfiguration = {
  headline: CommonSlots.headline,
  text: CommonSlots.text,
  // Add custom slots as needed
};

// Implement create function with proper typing
const createComponent: CreateComponentFunction = ({ element, slots }) => {
  // Component implementation
  return { element, styles };
};

// Export using the standard registration helper
export default createComponentRegistration({
  tagName,
  slots,
  createComponent,
  attributes: CommonAttributeHandlers.resize, // Use common handlers
});
```

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
1. Import types from `source/_types.ts` for consistency
2. Use `CommonSlots` for standard slot configurations
3. Implement the `CreateComponentFunction` interface
4. Use `CommonAttributeHandlers` for standard behaviors
5. Export using `createComponentRegistration` helper
6. Follow the existing naming conventions (umd-[component])

### Complex Components with Models

For components with shared logic across variants:
1. Create a `_model.ts` file in the component directory
2. Define component-specific interfaces extending base types
3. Export factory functions that return registration functions
4. Import and use in variant files (e.g., standard.ts, overlay.ts)

### Domain-Specific Types

Some component domains have their own `_types.ts` files:
- Feed components: `source/api/feed/_types.ts`
- These extend the base types with domain-specific properties

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

### Component Testing

The library uses Jest with jsdom for testing web components. Tests are located in `source/api/__tests__/` directories.

#### Test Structure

Each component test validates:
1. **Component Registration** - Verify the component can be registered with customElements
2. **Custom Element Creation** - Confirm the web component is created with correct tag name
3. **Slot Validation** - Test all defined slots (required/optional, allowed elements)
4. **Deprecated Slot Validation** - Verify deprecated slots still work with console warnings
5. **Attribute Validation** - Test all data-* configuration attributes
6. **Deprecated Attribute Validation** - Verify deprecated attributes work with warnings
7. **Observed Attribute Validation** - Test reactive attributes trigger updates

#### Test Organization

```
source/api/__tests__/
├── test-helpers/
│   ├── setup.ts          # Jest environment setup with polyfills
│   ├── component.ts      # Component testing utilities
│   └── validation.ts     # Attribute/slot validation helpers
├── accordion/
│   └── item.test.ts
├── brand/
│   └── chevron-scroll.test.ts
└── [component]/
    └── [name].test.ts
```

#### Test Pattern

```typescript
describe('Component: umd-element-[name]', () => {
  const tagName = 'umd-element-[name]';

  beforeEach(() => { jest.clearAllMocks(); });
  afterEach(() => { cleanupComponents(); });

  describe('Registration', () => {
    it('should register the web component');
    it('should create custom element with correct tag name');
  });

  describe('Slots', () => {
    it('should validate required slots');
    it('should accept allowed elements in slots');
    it('should handle deprecated slots with warnings');
  });

  describe('Attributes', () => {
    it('should handle configuration attributes');
    it('should handle deprecated attributes with warnings');
  });

  describe('Observed Attributes', () => {
    it('should react to attribute changes');
  });
});
```

#### Test Helpers

**Component Helpers** (`test-helpers/component.ts`):
- `createTestComponent()` - Creates and mounts a test component
- `cleanupComponents()` - Cleans up DOM after tests
- `waitForComponentDefinition()` - Waits for custom element registration
- `captureWarnings()` - Captures console warnings for deprecation tests
- `setAttributeAndWait()` - Sets attributes and waits for updates

**Validation Helpers** (`test-helpers/validation.ts`):
- `validateSlotConfiguration()` - Validates slots match requirements
- `isAllowedElement()` - Checks if element type is allowed in slot
- `validateDeprecatedAttribute()` - Verifies deprecation warnings
- `isComponentRegistered()` - Checks customElements registration

#### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run a specific test file
npm test -- source/api/__tests__/accordion/item.test.ts
```
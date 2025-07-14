# University of Maryland Web Components Library

[![Components Version](https://img.shields.io/badge/Components-v1.12.5-blue)](https://www.npmjs.com/package/@universityofmaryland/web-components-library)

High-level web components built from the elements library for interfaces, interactivity, layout, and data feeds. This library provides ready-to-use web components that follow the University of Maryland's design guidelines and accessibility standards. These components are designed to work seamlessly together to create consistent, branded UMD web experiences while maintaining performance and usability across all devices.

## Installation

```bash
# Using npm
npm install @universityofmaryland/web-components-library

# Using yarn
yarn add @universityofmaryland/web-components-library
```

## Usage

### Loading All Components

The simplest way to use the components is to load all of them at once. This approach is ideal for applications that use many UMD components.

```javascript
import LoadUmdComponents from '@universityofmaryland/web-components-library';

document.addEventListener('DOMContentLoaded', () => {
  LoadUmdComponents();
  // All components are now registered and available in the DOM
});
```

### Tree-Shaking (Loading Individual Components)

For better performance, you can import only the components you need:

```javascript
import {
  card,
  navigation,
  hero,
} from '@universityofmaryland/web-components-library/Components';

// Initialize specific components
card.standard();
navigation.header();
hero.minimal();
```

## Available Components

The library includes a wide range of components organized by type:

### Layout Components

- `layout.boxLogo` - Box with logo layout
- `layout.imageExpand` - Expandable image layout
- `layout.modal` - Modal dialog
- `layout.scrollTop` - Scroll to top button
- `layout.stickyColumns` - Sticky columns layout

### UI Components

- `accordion` - Collapsible content panels
- `actions` - Action buttons and links
- `alert` - Alert notifications
- `card` - Various card styles (standard, article, overlay)
- `carousel` - Image and content carousels
- `hero` - Hero sections (standard, minimal, expand, logo)
- `navigation` - Navigation components (header, drawer, breadcrumb)
- `person` - Person/profile components
- `quote` - Quote/testimonial components
- `stat` - Statistics display
- `tab` - Tabbed interface
- `text` - Text components

### Example Usage

#### Card Component

```html
<umd-element-card>
  <img slot="image" src="path/to/image.jpg" alt="Card image" />
  <p slot="eyebrow">Category</p>
  <h3 slot="headline">Card Title</h3>
  <p slot="text">
    Card description text goes here with details about the card content.
  </p>
  <div slot="actions">
    <a href="#">Learn More</a>
  </div>
</umd-element-card>
```

## Component Model System

The library uses a sophisticated model system for creating and registering web components with consistent behavior, validation, and lifecycle management.

### Registration System

Components are registered using the `Register.webComponent()` utility:

```javascript
import { Register } from 'model';

export default Register.webComponent({
  tagName: 'umd-element-example',
  slots: slotConfiguration,
  createComponent: componentFactory,
  attributes: attributeHandlers, // Optional: reactive attribute observers
  afterConnect: lifecycleCallback, // Optional: lifecycle hooks
});
```

### Attribute System

The library uses two types of attributes:

#### Configuration Attributes (data-\*)

Set initial component state and configuration:

```html
<umd-element-card data-theme="dark">
  <!-- Content -->
</umd-element-card>
```

Common configuration attributes:

- `data-theme` - Color theme (`light`, `dark`)
- `data-display` - Display style (`grid`, `list`, `inline`)
- `data-visual-open` - Initial open state
- `data-size` - Component size (`small`, `medium`, `large`)

#### Observed Attributes

Trigger component behavior when changed:

```javascript
// Programmatic control
element.setAttribute('is-visual-open', 'true');
element.setAttribute('resize', 'true');
```

Common observed attributes:

- `is-visual-open` - Opens component
- `is-visual-closed` - Closes component
- `resize` - Triggers resize calculation
- `load` - Triggers load event

### Attribute Handlers

The library provides pre-built attribute handlers:

```javascript
import { Attributes } from 'model';

// Single handler
const resizeHandler = Attributes.handler.common.resize();

// Combined handlers
const multiHandler = Attributes.handler.combine([
  Attributes.handler.common.resize(),
  Attributes.handler.common.visualToggle(),
]);

// Custom handler with callback
const customHandler = Attributes.handler.common.resize((element) => {
  element.events?.recalculate();
});
```

Available handlers:

- `resize()` - Handles component resizing
- `visualToggle()` - Open/close animations
- `visualShowHide()` - Show/hide visibility
- `accordion()` - Complete accordion behavior

### Slot System

Components use a slot-based content distribution system with validation:

```javascript
import { Slots } from 'model';

const slots = {
  headline: {
    allowedElements: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    required: true,
  },
  text: {
    allowedElements: ['div', 'p'],
    required: false,
  },
  actions: {
    allowedElements: ['div', 'nav'],
    deprecated: { replacement: 'cta' },
  },
};
```

Using slots in HTML:

```html
<umd-element-example>
  <h3 slot="headline">Title</h3>
  <p slot="text">Content text</p>
  <div slot="actions">
    <a href="#">Learn More</a>
  </div>
</umd-element-example>
```

### Lifecycle Hooks

Pre-built lifecycle hooks for common initialization patterns:

```javascript
import { Lifecycle } from 'model';

// Available hooks
afterConnect: Lifecycle.hooks.loadOnConnect,      // Calls load event
afterConnect: Lifecycle.hooks.loadAnimation,      // Sets up animations
afterConnect: Lifecycle.hooks.resizeOnConnect,    // Triggers resize
```

### Creating Custom Components

Example of a complete component implementation:

```javascript
import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Slots, Register, Lifecycle } from 'model';
import type { CreateComponentFunction, SlotConfiguration } from '../_types';

// Define the custom element tag name
const tagName = 'umd-custom-component';

// Configure slots with validation
const slots: SlotConfiguration = {
  headline: {
    allowedElements: ['h2', 'h3', 'h4'],
    required: true,
  },
  text: {
    allowedElements: ['p', 'div'],
  },
  image: {
    allowedElements: ['img', 'picture'],
    required: false,
  },
};

// Create the component factory function
const createComponent: CreateComponentFunction = (element) => {
  // Extract validated slot content
  const headline = Slots.headline.default({ element });
  const text = Slots.text.default({ element });
  const image = Slots.query.elements({ element, name: 'image' });

  // Extract configuration attributes
  const isThemeDark = Attributes.isTheme.dark({ element });
  const displayStyle = element.getAttribute('data-display') || 'default';

  // Create component using the Elements library
  return Composite.customComponent.create({
    headline,
    text,
    image,
    isThemeDark,
    displayStyle,
  });
};

// Register the web component with all features
export default Register.webComponent({
  tagName,
  slots,
  createComponent,
  attributes: [
    Attributes.handler.common.resize(),
    Attributes.handler.common.visualToggle(),
  ],
  afterConnect: Lifecycle.hooks.loadOnConnect,
});
```

### Component Events

Components dispatch custom events for state changes:

```javascript
// Listen for component events
element.addEventListener('component:ready', (e) => {
  console.log('Component initialized');
});

element.addEventListener('component:resize', (e) => {
  console.log('Component resized');
});

element.addEventListener('component:error', (e) => {
  console.error('Component error:', e.detail);
});
```

### Advanced Component Features

#### Reactive Updates

Components automatically update when observed attributes change:

```javascript
// Triggers resize handler
element.setAttribute('resize', 'true');

// Triggers visual state change
element.setAttribute('is-visual-open', 'true');
```

#### Shadow DOM

All components use Shadow DOM for style encapsulation:

```javascript
// Access shadow root
const shadowRoot = element.shadowRoot;

// Query within shadow DOM
const internalElement = shadowRoot.querySelector('.component-part');
```

## Development

### Setting Up a Development Environment

```bash
# Clone the repository
git clone https://github.com/umd-digital/design-system.git
cd design-system/packages/components

# Install dependencies
npm install

# Start development server
npm start
```

### Building Components

```bash
# Production build
npm run build

# Build and publish to npm
npm run release
```

### Testing

The library uses Jest with jsdom for testing web components:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run specific test file
npm test -- source/api/__tests__/card/standard.test.ts
```

#### Test Structure

Each component test validates:

- Component registration with `customElements`
- Slot configuration and validation
- Attribute handling (both configuration and observed)
- Deprecation warnings
- Event dispatching
- Error handling

### Type System

The library is built with TypeScript and provides comprehensive type definitions:

```typescript
import type {
  ComponentRef,
  CreateComponentFunction,
  ComponentRegistration,
  SlotConfiguration,
  ThemeProps,
  VisualStateProps,
  ComponentEvents,
} from '@universityofmaryland/web-components-library';
```

Key interfaces:

- `ComponentRef` - Reference returned by component factories
- `SlotConfiguration` - Slot validation rules
- `CreateComponentFunction` - Component factory signature
- `ComponentRegistration` - Registration function type
- `AttributeHandler` - Attribute observer configuration

### Common Patterns

#### Using Common Slots

```javascript
import { CommonSlots } from 'model/slots/common';

const slots = {
  headline: CommonSlots.headline, // Pre-configured headline slot
  text: CommonSlots.text, // Pre-configured text slot
  actions: CommonSlots.actions, // Pre-configured actions slot
  customSlot: {
    // Custom slot definition
    allowedElements: ['div', 'section'],
    required: false,
  },
};
```

#### Component Composition

Components can be composed from other components:

```javascript
import {
  card,
  hero,
} from '@universityofmaryland/web-components-library/Components';

// Initialize multiple components
card.standard();
card.overlay();
hero.minimal();

// Components work together
const heroWithCards = `
  <umd-element-hero>
    <h1 slot="headline">Welcome</h1>
    <div slot="actions">
      <umd-element-call-to-action>
        <!-- CTA Slot Options -->
      </umd-element-call-to-action>
    </div>
  </umd-element-hero>
`;
```

## Browser Support

The UMD Web Components Library supports all modern browsers that support Web Components, including:

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

For older browsers, consider using the [Web Components polyfills](https://github.com/webcomponents/polyfills).

## Dependencies

This library depends on:

- `@universityofmaryland/web-elements-library` (^1.2.0) - For foundational UI elements
- `@universityofmaryland/web-styles-library` (^1.4.2) - For styling and theming
- TypeScript (^5.0.0) - For type safety
- PostCSS & Tailwind CSS - For styling processing

## Performance Considerations

- Components are lazy-loaded when first used
- Shadow DOM provides style isolation without global CSS pollution
- Slot validation happens once during initialization
- Attribute observers only trigger for registered attributes
- Components dispatch events for async operations

## Accessibility

All components in this library are designed with accessibility in mind:

- WCAG 2.1 AA compliant
- Keyboard navigable interfaces with visible focus indicators
- Screen reader friendly with proper ARIA attributes and live regions
- Focus management for interactive elements
- Color contrast ratios that meet accessibility standards
- Reduced motion support via `prefers-reduced-motion`
- Semantic HTML structure

## Documentation

- [Design System Website](https://designsystem.umd.edu)
- [Component Playground](http://playground.designsystem.umd.edu)
- [TypeDoc API Documentation](https://umd-digital.github.io/design-system/)
- [GitHub Repository](https://github.com/umd-digital/design-system)

## Contributing

For contribution guidelines, please refer to the main repository README.

## License

This project is licensed under the University of Maryland license.

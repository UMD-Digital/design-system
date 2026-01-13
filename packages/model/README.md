# @universityofmaryland/web-model-library

[![Model Version](https://img.shields.io/badge/Model-v1.0.3-blue)](https://www.npmjs.com/package/@universityofmaryland/web-model-library)

Core utilities for building web components in the UMD design system. Provides the foundational tools for attribute handling, slot management, component registration, and custom element creation.

## Installation

```bash
npm install @universityofmaryland/web-model-library
```

## Overview

The Model system provides four main utilities:

- **Attributes** - Comprehensive attribute handling with validation and observation
- **Model** - Base class and factory for creating custom elements
- **Register** - Component registration utilities
- **Slots** - Slot extraction and validation utilities
- **Lifecycle** - Common lifecycle hooks for component initialization

## Usage

### Basic Component Creation

```typescript
import { Attributes, Model, Register, Slots } from '@universityofmaryland/web-model-library';

const tagName = 'umd-my-component';

const slots = {
  headline: { required: true, allowedElements: ['h2', 'h3'] },
  content: { allowedElements: ['div', 'p'] }
};

const attributes = Attributes.handler.combine(
  Attributes.handler.observe.resize({
    callback: (element) => element.events?.handleResize()
  })
);

const createComponent = (element: HTMLElement) => {
  return {
    element: createDOMStructure(),
    styles: componentStyles,
    events: componentEvents
  };
};

export default () => {
  Register.registerWebComponent({
    name: tagName,
    element: Model.createCustomElement({
      tagName,
      slots,
      attributes,
      createComponent
    })
  });
};
```

### Selective Imports

For optimal tree-shaking, you can import from specific entry points:

```typescript
// Import from category
import * as Model from '@universityofmaryland/web-model-library/model';
import * as Attributes from '@universityofmaryland/web-model-library/attributes';
import Slots from '@universityofmaryland/web-model-library/slots';
import * as Register from '@universityofmaryland/web-model-library/utilities';

// Or import everything
import { Attributes, Model, Register, Slots, Lifecycle } from '@universityofmaryland/web-model-library';
```

## API

### Model

- `createCustomElement(config)` - Factory function to create a custom element class
- `BaseComponent` - Base class for all web components (typically not used directly)

### Attributes

- `names` - Centralized constants for all attribute names
- `values` - Predefined values for attributes
- `handler` - Reactive observers for attribute changes
- Check functions: `hasInfo`, `hasDecoration`, `isDisplay`, `isTheme`, etc.

### Slots

Slot creation factories and utilities:
- `actions.default()` - Create action slots
- `headline.default()` - Create headline slots
- `text.default()` - Create text slots
- `assets.image()` - Create image slots
- `element.allowed` - Common slot configurations

### Register

- `registerWebComponent({ name, element })` - Register a web component
- `webComponent(config)` - Helper to create a standard component registration function

### Lifecycle

Common lifecycle hooks:
- `hooks.loadOnConnect` - Standard afterConnect that calls load event
- `hooks.loadAnimation` - Setup component animations
- `hooks.resizeOnConnect` - Standard resize handler

## Best Practices

1. **Slot Validation**: Always validate required slots
2. **Data Attributes**: Use data-* attributes for configuration
3. **Attribute Observers**: Implement proper attribute observers for dynamic behavior
4. **Deprecation Warnings**: Handle slot deprecation warnings gracefully
5. **Error Messages**: Provide meaningful error messages for validation failures

## TypeScript Support

This package includes full TypeScript definitions. Import types as needed:

```typescript
import type {
  ElementRef,
  ComponentRef,
  SlotConfig,
  ComponentConfiguration,
  ComponentRegistration
} from '@universityofmaryland/web-model-library';
```

## License

MIT

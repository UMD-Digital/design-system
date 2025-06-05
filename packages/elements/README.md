# University of Maryland Web Elements Library

[![Elements Version](https://img.shields.io/badge/Elements-v1.2.1-blue)](https://www.npmjs.com/package/@universityofmaryland/web-elements-library)

Foundational UI elements that make up the University of Maryland Components Library. This library provides the building blocks used to create more complex UI components while maintaining consistent design patterns across all UMD digital properties. Elements are crafted to be lightweight, accessible, and easily combinable into larger structures while adhering to UMD brand guidelines.

## Installation

```bash
# Using npm
npm install @universityofmaryland/web-elements-library

# Using yarn
yarn add @universityofmaryland/web-elements-library
```

## Usage

### Importing Elements

```javascript
// Import specific element categories
import { Atomic, Composite, Layout } from '@universityofmaryland/web-elements-library';

// Example: Using an atomic element
const buttonElement = Atomic.actions.text({
  text: 'Click Me',
  url: '#',
  isStyled: true
});

// Add the element to the DOM
document.body.appendChild(buttonElement.element);
```

## Element Categories

The library organizes elements into several categories:

### Atomic Elements

Atomic elements are the most basic building blocks that cannot be broken down further:

```javascript
import { Atomic } from '@universityofmaryland/web-elements-library';

// Actions
const buttonElement = Atomic.actions.text({
  text: 'Learn More',
  url: '/learn-more',
  isStyled: true
});

// Assets
const imageElement = Atomic.assets.image.background({
  image: document.querySelector('img'),
  isScaled: true
});
```

Available atomic elements:
- `actions` - Buttons and interactive elements
- `animations` - Animation elements
- `assets` - Images, icons, and media elements
- `buttons` - Button variations
- `events` - Event-related elements
- `layout` - Basic layout elements
- `textLockup` - Text grouping elements

### Composite Elements

Composite elements are combinations of atomic elements that form more complex UI patterns:

```javascript
import { Composite } from '@universityofmaryland/web-elements-library';

const cardElement = Composite.card.block({
  headline: document.querySelector('h3'),
  text: document.querySelector('p'),
  image: document.querySelector('img'),
  actions: document.querySelector('.actions')
});
```

Available composite elements:
- `accordion` - Expandable content sections
- `alert` - Alert/notification elements
- `banner` - Banner elements
- `card` - Card elements (block, list, overlay)
- `carousel` - Carousel/slider elements
- `hero` - Hero section elements
- `layout` - Layout compositions
- `media` - Media display elements
- `navigation` - Navigation elements
- `pathway` - Pathway/journey elements
- `person` - Person/profile elements
- `quote` - Quote display elements
- `slider` - Slider elements
- `social` - Social media elements
- `tabs` - Tabbed interface elements

### Layout Elements

Elements specifically designed for controlling page layout:

```javascript
import { Layout } from '@universityofmaryland/web-elements-library';

const imageLayout = Layout.image({
  image: document.querySelector('img'),
  align: 'left'
});
```

### Model Elements

Elements for creating and interacting with the component model:

```javascript
import { Model } from '@universityofmaryland/web-elements-library';

// Create model elements
const actionElement = Model.elements.actions({ url: '#', text: 'Click' });
```

### Utilities

Helper functions for working with elements:

```javascript
import { Utilities } from '@universityofmaryland/web-elements-library';

// Accessibility utilities
Utilities.accessibility.focusable(element);

// DOM manipulation
Utilities.markup.create.element('div', { class: 'container' });
```

## Element Structure

Most elements return an object with the following properties:

```javascript
{
  element: HTMLElement, // The DOM element
  styles: string,       // CSS styles associated with the element
  update: Function,     // Method to update element properties
  destroy: Function,    // Method to clean up and remove element
  // Other element-specific properties
}
```

Example of using the update method:

```javascript
const button = Atomic.buttons.primary({
  text: 'Learn More',
  url: '#'
});

// Update properties later
button.update({
  text: 'View Details',
  isDisabled: true
});
```

## Browser Support

This library supports all modern browsers, including:
- Chrome
- Firefox
- Safari
- Edge

## Performance Considerations

The Elements library is designed with performance in mind:
- Tree-shakable imports to reduce bundle size
- Optimized rendering through element reuse
- Minimal DOM operations for updates
- Efficient event handling patterns

## Accessibility

All elements are built with accessibility as a priority:
- WCAG 2.1 AA compliant
- Proper semantic markup
- ARIA attributes where appropriate
- Keyboard navigation support
- Focus management utilities

## Documentation

For complete documentation of all available elements and their options, see the [official UMD Design System documentation](https://umd-digital.github.io/design-system/).

## Contributing

For contribution guidelines, please refer to the main repository README.

## License

This project is licensed under the University of Maryland license.
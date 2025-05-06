# University of Maryland Web Components Library

[![Components Version](https://img.shields.io/badge/Components-v1.10.2-blue)](https://www.npmjs.com/package/@universityofmaryland/web-components-library)

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
import { card, navigation, hero } from '@universityofmaryland/web-components-library/Components';

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
  <img slot="image" src="path/to/image.jpg" alt="Card image">
  <p slot="eyebrow">Category</p>
  <h3 slot="headline">Card Title</h3>
  <p slot="text">Card description text goes here with details about the card content.</p>
  <div slot="actions">
    <a href="#">Learn More</a>
  </div>
</umd-element-card>
```

#### Navigation Component

```html
<umd-element-navigation>
  <div slot="logo">
    <img src="path/to/logo.svg" alt="UMD Logo">
  </div>
  <ul slot="items">
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Services</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</umd-element-navigation>
```

## Advanced Configuration

Components can be customized using attributes:

```html
<umd-element-card is-theme-dark is-visual-aligned>
  <!-- Card content -->
</umd-element-card>
```

Common attributes include:
- `is-theme-dark` - Sets dark theme
- `is-visual-aligned` - Sets content alignment
- `is-visual-transparent` - Makes background transparent
- `is-visual-bordered` - Adds border to component
- `is-animated` - Enables animations for the component
- `is-responsive` - Adjusts layout based on viewport size (enabled by default)

You can also configure components through JavaScript:

```javascript
// Select an existing component
const cardElement = document.querySelector('umd-element-card');

// Configure through properties
cardElement.isThemeDark = true;
cardElement.isVisualAligned = true;

// Or use the configure method
cardElement.configure({
  isThemeDark: true,
  isVisualAligned: true,
  customData: { category: 'Featured' }
});
```

## Browser Support

The UMD Web Components Library supports all modern browsers that support Web Components, including:
- Chrome
- Firefox
- Safari
- Edge

## Dependencies

This library depends on:
- `@universityofmaryland/web-elements-library` - For foundational UI elements
- `@universityofmaryland/web-styles-library` - For styling and theming

## Accessibility

All components in this library are designed with accessibility in mind:
- WCAG 2.1 AA compliant
- Keyboard navigable interfaces
- Screen reader friendly with proper ARIA attributes
- Focus management for interactive elements
- Color contrast that meets accessibility standards

## Documentation

For complete documentation of all available components and their options, see the [official UMD Design System documentation](https://umd-digital.github.io/design-system/).

## Contributing

For contribution guidelines, please refer to the main repository README.

## License

This project is licensed under the University of Maryland license.
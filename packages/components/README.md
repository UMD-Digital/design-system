# University of Maryland Web Components Library

[![Components Version](https://img.shields.io/badge/Components-v1.12.13-blue)](https://www.npmjs.com/package/@universityofmaryland/web-components-library)

High-level web components built from the elements library for interfaces, interactivity, layout, and data feeds. This library provides ready-to-use web components that follow the University of Maryland's design guidelines and accessibility standards.

## Installation

```bash
# Using npm
npm install @universityofmaryland/web-components-library

# Using yarn
yarn add @universityofmaryland/web-components-library
```

## Quick Start

```javascript
import LoadUmdComponents from '@universityofmaryland/web-components-library';

document.addEventListener('DOMContentLoaded', () => {
  LoadUmdComponents();
  // All components are now registered and available
});
```

Or load specific components for better performance:

```javascript
import { card, hero } from '@universityofmaryland/web-components-library/Components';

card.standard();
hero.minimal();
```

## How Components Work

### Web Components Architecture

UMD components are standard web components built with:
- **Custom Elements** - Define new HTML tags like `<umd-element-card>`
- **Shadow DOM** - Encapsulates styles and prevents CSS conflicts
- **Slots** - Content distribution system for flexible layouts

### Basic Structure

```html
<umd-element-card data-theme="dark">
  <h3 slot="headline">Card Title</h3>
  <p slot="text">Card content goes here</p>
  <div slot="actions">
    <a href="#">Learn More</a>
  </div>
</umd-element-card>
```

Components use:
- **Tag name** - Always prefixed with `umd-element-`
- **Configuration attributes** - Use `data-*` prefix for initial setup
- **Slots** - Named areas where content can be inserted

### Working with the Styles Package

For consistent spacing, typography, and layouts, install the companion styles package:

```bash
npm install @universityofmaryland/web-styles-library
```

This provides utility classes that work seamlessly with components:

```html
<!-- Apply consistent spacing -->
<div class="umd-layout-space-vertical-landing">
  <umd-element-hero>
    <!-- Hero content -->
  </umd-element-hero>
</div>

<!-- Create responsive grids -->
<div class="umd-grid-gap-three">
  <umd-element-card><!-- Card 1 --></umd-element-card>
  <umd-element-card><!-- Card 2 --></umd-element-card>
  <umd-element-card><!-- Card 3 --></umd-element-card>
</div>
```

See [HTML Usage Examples](docs/components/usage.html#styles-integration) for detailed integration patterns.

## Available Components

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

## Documentation

- **[HTML Usage Examples](docs/components/usage.html)** - Interactive examples and common patterns
- **[Advanced Usage Guide](docs/components/advanced-usage.md)** - Type system, testing, and reactive components
- **[Design System Website](https://designsystem.umd.edu)** - Full documentation
- **[Component Playground](http://playground.designsystem.umd.edu)** - Interactive demos

## Browser Support

Supports all modern browsers with Web Components support:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

This project is licensed under the University of Maryland license.

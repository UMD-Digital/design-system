# University of Maryland Web Components Library

[![Components Version](https://img.shields.io/badge/Components-v1.12.23-blue)](https://www.npmjs.com/package/@universityofmaryland/web-components-library)

High-level web components built on the UMD Elements Library, providing feature-rich, accessible, and brand-compliant UI components for University of Maryland digital experiences.

## Overview

The UMD Web Components Library is the primary interface for developers building UMD websites and applications. It provides a comprehensive collection of web components that implement UMD design patterns, ensuring consistency, accessibility, and brand compliance across all digital properties. These components are built on top of the Elements Library and styled using the Styles Library, creating a complete design system solution.

## Installation

```bash
# Using npm
npm install @universityofmaryland/web-components-library

# Using yarn
yarn add @universityofmaryland/web-components-library
```

### Peer Dependencies

For complete functionality, install the companion packages:

```bash
npm install @universityofmaryland/web-styles-library
npm install @universityofmaryland/web-elements-library
```

## Quick Start

### Load All Components

```javascript
import LoadUmdComponents from '@universityofmaryland/web-components-library';

// Initialize all components
LoadUmdComponents();
```

### Load Specific Components (Recommended)

```javascript
import { Components } from '@universityofmaryland/web-components-library';

// Load only what you need
Components.card.standard();
Components.hero.base();
Components.navigation.primary();
```

### HTML Usage

```html
<umd-element-hero data-theme="dark" data-display="overlay">
  <img slot="image" src="hero.jpg" alt="Hero image" />
  <p slot="eyebrow">Welcome</p>
  <h1 slot="headline">University of Maryland</h1>
  <div slot="text">
    <p>Fearless ideas start here.</p>
  </div>
  <div slot="actions">
    <umd-element-call-to-action data-display="primary">
      <a href="/apply">Apply Now</a>
    </umd-element-call-to-action>
  </div>
</umd-element-hero>
```

## Component Architecture

### Web Components Standards

All components follow W3C Web Components standards:

- **Custom Elements** - Semantic HTML tags (e.g., `<umd-element-card>`)
- **Shadow DOM** - Style encapsulation and DOM isolation
- **Slots** - Content distribution for flexible layouts
- **Attributes** - Configuration and reactive updates

### Naming Convention

All components use the `umd-element-` prefix:

- `<umd-element-card>`
- `<umd-element-hero>`
- `<umd-element-navigation>`

### Attribute System

Components use configuration attributes with the `data-*` prefix:

- Set initial state: `data-theme="dark"`
- Configure display: `data-display="overlay"`

## Integration with Other Packages

### Styles Package Integration

The Styles Package provides utility classes for spacing, grids, and typography:

```html
<!-- Consistent spacing -->
<div class="umd-layout-space-vertical-landing">
  <umd-element-hero><!-- content --></umd-element-hero>
</div>

<!-- Responsive grids -->
<div class="umd-grid-gap-three">
  <umd-element-card><!-- card 1 --></umd-element-card>
  <umd-element-card><!-- card 2 --></umd-element-card>
  <umd-element-card><!-- card 3 --></umd-element-card>
</div>
```

[Learn more about Styles integration →](components/usage.html#styles-integration)

### Elements Package Relationship

Components are built on Elements:

- Elements provide atomic building blocks
- Components compose Elements into features
- Components add interactivity and state management

### Feeds Package Integration

For dynamic content, combine with Feeds:

```javascript
import { Components } from '@universityofmaryland/web-components-library';
import { Feeds } from '@universityofmaryland/web-feeds-library';

// Initialize components
Components.feed.newsList();

// Component will handle feed display
```

## Component Categories

### Navigation Components

- `navigation.primary` - Main site navigation
- `navigation.drawer` - Mobile navigation drawer
- `navigation.breadcrumb` - Breadcrumb navigation
- `navigation.utility` - Utility navigation bar

### Content Components

- `hero.*` - Hero sections (base, expand, grid, logo, minimal)
- `card.*` - Card layouts (standard, article, event, overlay, icon)
- `carousel.*` - Content carousels
- `accordion.item` - Expandable content sections

### Layout Components

- `layout.modal` - Modal dialogs
- `layout.stickyColumns` - Sticky column layouts
- `layout.scrollTop` - Scroll to top functionality

### Interactive Components

- `tab.display` - Tabbed interfaces
- `slider.*` - Content sliders
- `actions.display` - Call-to-action buttons

### Media Components

- `media.inline` - Inline media players
- `person.*` - Person/profile displays
- `quote.display` - Quote/testimonial blocks
- `stat.display` - Statistics displays

## Common Use Cases

### Hero with Call-to-Action

```html
<umd-element-hero data-display="overlay">
  <img slot="image" src="campus.jpg" alt="Campus view" />
  <h1 slot="headline">Discover Your Future</h1>
  <p slot="text">Join our community of innovators.</p>
  <div slot="actions">
    <umd-element-call-to-action data-display="primary">
      <a href="/apply">Apply Now</a>
    </umd-element-call-to-action>
  </div>
</umd-element-hero>
```

### Card Grid Layout

```html
<div class="umd-grid-gap-three">
  <umd-element-card data-theme="light">
    <a slot="image" href="/programs">
      <img src="programs.jpg" alt="Academic programs" />
    </a>
    <h3 slot="headline">
      <a href="/programs">Academic Programs</a>
    </h3>
    <p slot="text">Explore our 200+ degree programs.</p>
  </umd-element-card>
  <!-- Additional cards -->
</div>
```

### Navigation Header

```html
<umd-element-navigation-header>
  <div slot="logo">
    <a href="/">University of Maryland</a>
  </div>
  <nav slot="primary">
    <ul>
      <li><a href="/about">About</a></li>
      <li><a href="/academics">Academics</a></li>
      <li><a href="/research">Research</a></li>
    </ul>
  </nav>
</umd-element-navigation-header>
```

## TypeScript Support

Full TypeScript support with comprehensive type definitions:

```typescript
import type {
  ComponentRef,
  SlotConfiguration,
  ComponentEvents,
} from '@universityofmaryland/web-components-library';

// Type-safe component usage
const card = document.querySelector<HTMLElement & ComponentEvents>(
  'umd-element-card',
);
if (card) {
  card.addEventListener('component:ready', (e) => {
    console.log('Card initialized');
  });
}
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Documentation

- **[Component Reference](./)** - Complete API documentation
- **[Usage Examples](./usage.html)** - Practical implementation guide with real-world examples
- **[Advanced Guide](./advanced-usage.html)** - TypeScript, testing, reactive components, and custom development
- **[Design System](https://designsystem.umd.edu)** - Full design system docs

## Testing

```bash
# Run tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

## Contributing

See the [main repository](https://github.com/umd-digital/design-system) for contribution guidelines.

## License

University of Maryland

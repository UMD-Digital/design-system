# University of Maryland Web Elements Library

[![Elements Version](https://img.shields.io/badge/Elements-v1.3.7-blue)](https://www.npmjs.com/package/@universityofmaryland/web-elements-library)

Foundational UI building blocks for the UMD Design System, providing atomic elements that combine to create complex, accessible, and brand-compliant University of Maryland digital experiences.

## Overview

The UMD Web Elements Library provides the essential building blocks used to construct the UMD Web Components Library. Think of elements as atoms in a design system - they are the smallest, indivisible units that maintain meaning and functionality. These elements handle core UI patterns like buttons, images, text layouts, and containers while remaining unopinionated about their final appearance, relying on the Styles Library for visual presentation.

## Installation

```bash
# Using npm
npm install @universityofmaryland/web-elements-library

# Using yarn
yarn add @universityofmaryland/web-elements-library
```

### Peer Dependencies

Elements are styled by the Styles package:

```bash
npm install @universityofmaryland/web-styles-library
```

## Quick Start

```javascript
import { Composite, Atomic } from '@universityofmaryland/web-elements-library';

// Create a card element
const card = Composite.card.block({
  headline: document.createElement('h3'),
  text: document.createElement('p'),
  image: document.querySelector('img'),
  isThemeDark: true,
});

// Add to DOM
document.querySelector('.container').appendChild(card.element);

// Apply associated styles
const style = document.createElement('style');
style.textContent = card.styles;
document.head.appendChild(style);
```

## Architecture

### Element Categories

#### Atomic Elements

The most basic building blocks:

- **actions** - Buttons and interactive elements
- **animations** - Animation patterns and effects
- **assets** - Images, videos, and media handling
- **buttons** - Specialized button components
- **events** - Event-related display elements
- **layout** - Basic layout structures
- **textLockup** - Text grouping patterns

#### Composite Elements

Combinations of atomic elements forming UI patterns:

- **accordion** - Expandable content sections
- **alert** - Notification and alert displays
- **banner** - Banner and promotional elements
- **card** - Content cards (block, list, overlay)
- **carousel** - Image and content sliders
- **footer** - Footer compositions
- **hero** - Hero sections (see detailed documentation below)
- **layout** - Complex layout patterns
- **media** - Media display compositions
- **navigation** - Navigation structures
- **pathway** - User journey elements
- **person** - Profile and bio displays
- **quote** - Quote and testimonial blocks
- **slider** - Content slider variations
- **social** - Social media integrations
- **stat** - Statistics displays
- **tabs** - Tabbed interfaces

### Element Return Structure

All elements return a consistent interface:

```typescript
interface ElementModel {
  element: HTMLElement | DocumentFragment;
  styles: string;
  events?: {
    load?: () => void;
    resize?: () => void;
    destroy?: () => void;
  };
}
```

## Integration with Other Packages

### Styles Package Dependency

Elements rely entirely on the Styles package for visual presentation:

```javascript
import { Composite } from '@universityofmaryland/web-elements-library';
// Styles are automatically included in the element.styles property
```

### Components Package Relationship

Components are built using Elements:

- Elements provide structure and behavior
- Components add web component wrapper and lifecycle
- Elements can be used standalone for custom implementations

### Usage in Feeds Package

Feed layouts use Elements for content display:

```javascript
// Feeds internally use card and grid elements
import { card } from '@universityofmaryland/web-elements-library/Composite';
```

## Common Element Patterns

### Actions Elements

```javascript
import { Atomic } from '@universityofmaryland/web-elements-library';

// Text-based action
const textAction = Atomic.actions.text({
  text: 'Learn More',
  url: '/learn-more',
  isStyled: true,
});

// Icon action
const iconAction = Atomic.actions.icon({
  icon: 'arrow-right',
  url: '#',
  ariaLabel: 'Next page',
});
```

### Card Elements

```javascript
import { Composite } from '@universityofmaryland/web-elements-library';

// Block card
const blockCard = Composite.card.block({
  headline: document.querySelector('h3'),
  text: document.querySelector('p'),
  image: document.querySelector('img'),
  actions: document.querySelector('.actions'),
  isThemeDark: false,
});

// Overlay card
const overlayCard = Composite.card.overlay({
  headline: headlineElement,
  text: textElement,
  image: imageElement,
  isTypeColor: true,
  isThemeDark: true,
});
```

### Hero Elements

The hero category offers multiple variations for impactful layouts:

#### Standard Hero

```javascript
const hero = Composite.hero.standard({
  headline: document.createElement('h1'),
  eyebrow: document.createElement('span'),
  text: document.createElement('p'),
  actions: document.createElement('div'),
  image: imageElement,
  includesAnimation: true,
  isThemeDark: true,
});
```

#### Minimal Hero

```javascript
const minimalHero = Composite.hero.minimal({
  headline: document.createElement('h1'),
  text: document.createElement('p'),
  eyebrow: document.createElement('span'),
});
```

#### Overlay Hero

```javascript
const overlayHero = Composite.hero.overlay({
  headline: headlineElement,
  text: textElement,
  image: imageElement,
  hasBorder: true,
  isTransparent: false,
  isSticky: true,
  isTextCenter: true,
});
```

#### Custom Variations

**Grid Hero** - Content blocks in grid layout:

```javascript
const gridHero = Composite.hero.custom.grid({
  headline: headlineElement,
  blocks: [block1, block2, block3, block4],
  image: backgroundImage,
  isThemeDark: true,
});
```

**Expand Hero** - With expandable content:

```javascript
const expandHero = Composite.hero.custom.expand({
  headline: headlineElement,
  text: textElement,
  expandedContent: hiddenContent,
  includesAnimation: true,
});
```

### Layout Elements

```javascript
import { Composite } from '@universityofmaryland/web-elements-library';

// Sticky columns
const stickyLayout = Composite.layout.stickyColumns({
  leftColumn: sidebarContent,
  rightColumn: mainContent,
  stickyOffset: 100,
});

// Image expand layout
const imageExpand = Composite.layout.image.expand({
  image: imageElement,
  caption: 'Image caption',
  isExpanded: false,
});
```

## TypeScript Support

Full TypeScript definitions for type safety:

```typescript
import type {
  ElementModel,
  HeroStandardProps,
  CardBlockProps,
  ThemeProps,
} from '@universityofmaryland/web-elements-library';

const heroProps: HeroStandardProps = {
  headline: document.createElement('h1'),
  isThemeDark: true,
  includesAnimation: false,
};
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Considerations

- **Lightweight** - Minimal JavaScript, no framework dependencies
- **Tree-shakeable** - Import only needed elements
- **Efficient** - Reusable element instances
- **Lazy-loadable** - Load elements on demand

## Accessibility

All elements follow WCAG 2.1 AA standards:

- Semantic HTML structure
- ARIA attributes where needed
- Keyboard navigation support
- Screen reader compatibility
- Focus management utilities

## Documentation

- **[Element Reference](./)** - Complete API documentation
- **[Design System](https://designsystem.umd.edu)** - Full design system docs

## Testing

```bash
# Run tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage

# Test specific category
npm test -- composite/hero
```

## Contributing

See the [main repository](https://github.com/umd-digital/design-system) for contribution guidelines.

## License

University of Maryland

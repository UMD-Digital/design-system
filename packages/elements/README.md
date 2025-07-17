# University of Maryland Web Elements Library

[![Elements Version](https://img.shields.io/badge/Elements-v1.3.5-blue)](https://www.npmjs.com/package/@universityofmaryland/web-elements-library)

Foundational UI elements that make up the University of Maryland Components Library. This library provides the building blocks used to create more complex UI components while maintaining consistent design patterns across all UMD digital properties. Elements are crafted to be lightweight, accessible, and easily combinable into larger structures while adhering to UMD brand guidelines.

## Installation

```bash
# Using npm
npm install @universityofmaryland/web-elements-library

# Using yarn
yarn add @universityofmaryland/web-elements-library
```

## Quick Start

Here's a simple example to get you started with the Elements library:

```javascript
import { Composite } from '@universityofmaryland/web-elements-library';

// Create a hero section
const hero = Composite.hero.standard({
  headline: document.createElement('h1'),
  text: document.createElement('p'),
  image: document.querySelector('img'),
  isThemeDark: true
});

// Add the hero to your page
document.getElementById('hero-container').appendChild(hero.element);

// Inject the associated styles
const styleElement = document.createElement('style');
styleElement.textContent = hero.styles;
document.head.appendChild(styleElement);
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
- `hero` - Hero section elements (see detailed section below)
- `layout` - Layout compositions
- `media` - Media display elements
- `navigation` - Navigation elements
- `pathway` - Pathway/journey elements
- `person` - Person/profile elements
- `quote` - Quote display elements
- `slider` - Slider elements
- `social` - Social media elements
- `tabs` - Tabbed interface elements

#### Hero Elements

The hero category provides multiple variations for creating impactful page headers and feature sections:

##### Standard Hero
The default hero pattern with flexible content and media options:

```javascript
const heroStandard = Composite.hero.standard({
  headline: document.createElement('h1'),
  eyebrow: document.createElement('span'),
  text: document.createElement('p'),
  actions: document.createElement('div'),
  image: document.querySelector('img'),
  video: document.querySelector('video'),
  includesAnimation: true,
  isHeightSmall: false,
  isHeightFull: false,
  isTextCenter: false,
  isTextRight: false,
  isThemeDark: true
});
```

##### Minimal Hero
A simplified hero with essential content only:

```javascript
const heroMinimal = Composite.hero.minimal({
  headline: document.createElement('h1'),
  text: document.createElement('p'),
  eyebrow: document.createElement('span'),
  isThemeDark: false
});
```

##### Stacked Hero
Hero with vertically stacked content and media:

```javascript
const heroStacked = Composite.hero.stacked({
  headline: document.createElement('h1'),
  text: document.createElement('p'),
  image: document.querySelector('img'),
  includesAnimation: true,
  isHeightSmall: false,
  isHeightFull: true,
  isWidthLarge: true,  // Stacked-specific property
  isThemeDark: true
});
```

##### Overlay Hero
Hero with overlay effects and advanced styling options:

```javascript
const heroOverlay = Composite.hero.overlay({
  headline: document.createElement('h1'),
  text: document.createElement('p'),
  image: document.querySelector('img'),
  hasBorder: true,
  isTransparent: false,
  isSticky: false,
  isTextCenter: true,
  isThemeDark: true
});
```

##### Logo Hero
Hero featuring institutional branding:

```javascript
const heroLogo = Composite.hero.logo({
  headline: document.createElement('h1'),
  logo: document.createElement('div'), // Logo element
  text: document.createElement('p'),
  actions: document.createElement('div'),
  image: document.querySelector('img'),
  isThemeDark: true,
  isThemeLight: false,
  isThemeMaryland: false
});
```

##### Custom Hero Variations

The library also provides specialized hero patterns for specific use cases:

###### Expand Hero
Hero with expandable content sections:

```javascript
const heroExpand = Composite.hero.custom.expand({
  headline: document.createElement('h1'),
  text: document.createElement('p'),
  expandedContent: document.createElement('div'), // Content revealed on expand
  includesAnimation: true,
  isThemeDark: true
});
```

###### Grid Hero
Hero with content blocks arranged in a grid:

```javascript
const heroGrid = Composite.hero.custom.grid({
  headline: document.createElement('h1'),
  text: document.createElement('p'),
  blocks: [
    document.createElement('div'), // Grid block 1
    document.createElement('div'), // Grid block 2
    document.createElement('div'), // Grid block 3
    document.createElement('div')  // Grid block 4
  ],
  image: document.querySelector('img'),
  isThemeDark: true
});
```

###### Video Arrow Hero
Hero with prominent video playback controls:

```javascript
const heroVideoArrow = Composite.hero.custom.videoArrow({
  headline: document.createElement('h1'),
  text: document.createElement('p'),
  video: document.querySelector('video'),
  image: document.querySelector('img'), // Poster image
  videoControls: true,
  includesAnimation: true,
  isThemeDark: true
});
```

##### Hero Properties Reference

Common properties across hero variants:
- `headline` - Main heading element
- `eyebrow` - Small text above headline
- `text` - Descriptive paragraph text
- `actions` - CTA buttons or links
- `image` - Hero image element
- `video` - Hero video element
- `includesAnimation` - Enable entrance animations
- `isThemeDark` - Dark theme styling

Size properties (Standard, Stacked, Overlay):
- `isHeightSmall` - Reduced height variant
- `isHeightFull` - Full viewport height

Layout properties (Standard, Overlay):
- `isTextCenter` - Center-aligned text
- `isTextRight` - Right-aligned text

Theme properties (Logo):
- `isThemeLight` - Light theme variant
- `isThemeMaryland` - Maryland brand theme

Unique properties:
- `isWidthLarge` (Stacked) - Extended width layout
- `hasBorder`, `isTransparent`, `isSticky` (Overlay) - Styling options
- `expandedContent` (Expand) - Hidden content section
- `blocks` (Grid) - Array of content blocks
- `videoControls` (Video Arrow) - Show video controls

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

## Testing

The Elements library includes comprehensive test coverage for all components. Tests are written using Jest and follow a consistent pattern:

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- source/composite/__tests__/hero/standard.test.ts
```

### Test Structure

Tests are organized by component category and located in `__tests__` directories:

```
source/
├── composite/
│   └── __tests__/
│       ├── hero/
│       │   ├── standard.test.ts
│       │   ├── minimal.test.ts
│       │   ├── stacked.test.ts
│       │   ├── overlay.test.ts
│       │   ├── logo.test.ts
│       │   └── custom/
│       │       ├── expand.test.ts
│       │       ├── grid.test.ts
│       │       └── video-arrow.test.ts
│       ├── card/
│       │   ├── block.test.ts
│       │   ├── list.test.ts
│       │   └── overlay.test.ts
│       └── types/
│           ├── hero-types.test.ts
│           └── card-types.test.ts
```

### Writing Tests

When adding new elements, include tests that cover:

1. **Basic Structure** - Element creation with minimal props
2. **Content Properties** - All content variations
3. **Asset Properties** - Image and video handling
4. **Animation Properties** - Animation flags and behaviors
5. **Theme Properties** - Theme variations
6. **Edge Cases** - Null/undefined handling
7. **Type Safety** - TypeScript interface compliance

Example test pattern:

```javascript
import { Composite } from '@universityofmaryland/web-elements-library';
import type { HeroStandardProps } from '../../hero/_types';

describe('Hero Standard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a standard hero with minimal props', () => {
    const props: HeroStandardProps = {
      isThemeDark: true
    };
    
    const result = Composite.hero.standard(props);
    
    expect(result).toBeDefined();
    expect(result.element).toBeInstanceOf(HTMLElement);
    expect(typeof result.styles).toBe('string');
  });
});
```

## TypeScript Support

The library is written in TypeScript and provides comprehensive type definitions for all elements:

### Import Types

```typescript
import type {
  HeroStandardProps,
  HeroMinimalProps,
  HeroStackedProps,
  HeroOverlayProps,
  HeroLogoProps,
  HeroGridProps,
  HeroExpandProps,
  HeroVideoArrowProps,
  CardBlockProps,
  CardListProps,
  CardOverlayProps
} from '@universityofmaryland/web-elements-library';
```

### Type Safety

All element functions are strictly typed to ensure proper usage:

```typescript
// TypeScript will enforce required properties
const hero: HeroStandardProps = {
  headline: document.createElement('h1'),
  // isThemeDark is optional with boolean type
  isThemeDark: true
};

// Type error if invalid property is provided
const invalidHero: HeroStandardProps = {
  headline: document.createElement('h1'),
  invalidProp: true // TypeScript error
};
```

## Contributing

For contribution guidelines, please refer to the main repository README.

## License

This project is licensed under the University of Maryland license.
# @universityofmaryland/web-builder-library

Element Builder for the University of Maryland Design System

## Installation

```bash
npm install @universityofmaryland/web-builder-library
```

## Usage

### Quick Start - Default Import

The simplest way to use the builder is through the default export:

```typescript
import ElementBuilder from '@universityofmaryland/web-builder-library';

// Use pre-styled elements
const button = document.createElement('a');
button.textContent = 'Click Me';
button.href = '/page';

const { element, styles } = ElementBuilder.styled.actions.primary({ element: button });

// Inject into DOM
document.body.appendChild(element);

// Inject styles
const styleTag = document.createElement('style');
styleTag.textContent = styles;
document.head.appendChild(styleTag);
```

### API Structure

ElementBuilder provides three main interfaces:

#### 1. Styled Elements - Pre-configured UMD Design System Styles

```typescript
import ElementBuilder from '@universityofmaryland/web-builder-library';

// Actions
ElementBuilder.styled.actions.primary({ element });
ElementBuilder.styled.actions.secondary({ element });
ElementBuilder.styled.actions.outline({ element });

// Buttons
ElementBuilder.styled.buttons.fullScreen({ element });
ElementBuilder.styled.buttons.videoState({ element });

// Text
ElementBuilder.styled.text.eyebrow({ element });
ElementBuilder.styled.text.ribbon({ element });

// Headlines
ElementBuilder.styled.headline.sansLarge({ element });
ElementBuilder.styled.headline.sansMin({ element });

// Layout
ElementBuilder.styled.layout.gridStacked({ element });
ElementBuilder.styled.layout.overlay({ element });

// Rich Text
ElementBuilder.styled.richText.container({ element });

// Assets
ElementBuilder.styled.assets.image({ element });

// Event
ElementBuilder.styled.event.meta({ element });
```

#### 2. Create Utilities - Custom Styled Elements

```typescript
import ElementBuilder from '@universityofmaryland/web-builder-library';

// Create custom styled div
const myDiv = ElementBuilder.create.div({
  className: 'my-custom-class',
  elementStyles: {
    element: { padding: '20px', backgroundColor: '#fff' }
  }
});

// Create custom styled paragraph
const myParagraph = ElementBuilder.create.paragraph({
  className: 'my-paragraph',
  elementStyles: {
    element: { fontSize: '16px', lineHeight: '1.5' }
  }
});

// Create custom styled span
const mySpan = ElementBuilder.create.span({
  className: 'my-span'
});

// Create custom element with any tag
const mySection = ElementBuilder.create.element({
  element: document.createElement('section'),
  className: 'my-section'
});
```

#### 3. Advanced - Direct Access to Builder Class

```typescript
import ElementBuilder from '@universityofmaryland/web-builder-library';

// Use the ElementBuilder class directly for advanced use cases
const builder = new ElementBuilder.ElementBuilder('my-class', document.createElement('div'));
const result = builder.createElement({
  config: {
    styleModifiers: (props) => `/* Custom CSS */`
  }
});

// Use advanced factory with builder variants
const element = ElementBuilder.create.advanced(
  {
    element: document.createElement('div'),
    elementStyles: { element: { margin: '10px' } }
  },
  { className: 'advanced-element' }
);
```

### Element Model Pattern

All builders return an `ElementModel` with this structure:

```typescript
interface ElementModel {
  element: HTMLElement;      // The styled DOM element
  className: string;         // The class name applied
  styles: string;            // Generated CSS styles
}
```

### Complete Example

```typescript
import ElementBuilder from '@universityofmaryland/web-builder-library';

// Create a primary action button
const link = document.createElement('a');
link.textContent = 'Learn More';
link.href = '/about';

const action = ElementBuilder.styled.actions.primary({ element: link });

// Create a custom container
const container = ElementBuilder.create.div({
  className: 'action-container',
  elementStyles: {
    element: {
      display: 'flex',
      justifyContent: 'center',
      padding: '2rem'
    }
  }
});

// Combine elements
container.element.appendChild(action.element);

// Inject into DOM
document.body.appendChild(container.element);

// Inject combined styles
const styleTag = document.createElement('style');
styleTag.textContent = action.styles + container.styles;
document.head.appendChild(styleTag);
```

## Alternative Import Patterns

For tree-shaking and selective imports, you can import specific modules:

```typescript
// Import specific styled element category
import * as actions from '@universityofmaryland/web-builder-library/styledElements/actions';
const primaryAction = actions.primary({ element });

// Import utility functions
import { createDiv } from '@universityofmaryland/web-builder-library/styledElements';
const myDiv = createDiv({ className: 'my-class' });

// Import core classes
import { ElementBuilder, createStyledElement } from '@universityofmaryland/web-builder-library/core';
```

## API Documentation

### Styled Element Categories

Pre-configured element builders integrating with UMD Design System styles:

- **`styled.actions`** - Link and action elements
  - `primary`, `primaryLarge`, `secondary`, `secondaryLarge`, `secondaryWhite`, `secondaryGold`, `outline`, `outlineLarge`, `outlineWhite`, `icon`

- **`styled.buttons`** - Button elements
  - `fullScreen`, `videoState`

- **`styled.text`** - Text decoration elements
  - `eyebrow`, `ribbon`, `lineAdjustment`

- **`styled.headline`** - Headline elements
  - `sansLarge`, `sansMin`, `sansMedium`, `sansSmall`, `serifLarge`, `serifMedium`

- **`styled.layout`** - Layout container elements
  - `gridStacked`, `overlay`

- **`styled.richText`** - Rich text elements
  - `container`

- **`styled.assets`** - Asset-related elements
  - `image`

- **`styled.event`** - Event-related elements
  - `meta`, `sign`

### Create Utilities

- **`create.element(props)`** - Create styled element with custom tag
- **`create.div(props)`** - Create styled div element
- **`create.paragraph(props)`** - Create styled p element
- **`create.span(props)`** - Create styled span element
- **`create.advanced(props, options)`** - Advanced factory with builder variants

### Type Exports

```typescript
import type {
  ElementProps,
  ElementStyles,
  StyleOptions,
  CompositeChild,
  BuilderConfig,
  StyleModifierProps,
  styleObject
} from '@universityofmaryland/web-builder-library';
```

## Peer Dependencies

- `@universityofmaryland/web-styles-library` ^1.0.0

## License

MIT

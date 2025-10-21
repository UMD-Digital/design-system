# @universityofmaryland/web-builder-library

Element Builder for the University of Maryland Design System

## Installation

```bash
npm install @universityofmaryland/web-builder-library
```

## Usage

### Default Export - Element Builder

```typescript
import { ElementBuilder, createStyledElement } from '@universityofmaryland/web-builder-library';

// Use the ElementBuilder class directly
const builder = new ElementBuilder('my-class', document.createElement('div'));
const result = builder.createElement({
  config: {
    styleModifiers: (props) => `/* CSS styles */`
  }
});

// Or use the createStyledElement factory
const element = createStyledElement(
  { element: document.createElement('div') },
  { className: 'my-class' }
);
```

### Styled Elements - Pre-configured Builders

```typescript
import * as actions from '@universityofmaryland/web-builder-library/styledElements/actions';
import * as buttons from '@universityofmaryland/web-builder-library/styledElements/buttons';
import * as text from '@universityofmaryland/web-builder-library/styledElements/text';

// Create action elements
const primaryAction = actions.primary({
  element: document.createElement('a'),
});

// Create button elements
const fullscreenButton = buttons.fullScreen({
  element: document.createElement('button'),
});

// Create text elements
const eyebrow = text.eyebrow({
  element: document.createElement('span'),
});
```

Or use utility functions from styledElements:

```typescript
import { create, createDiv } from '@universityofmaryland/web-builder-library/styledElements';

const myElement = createDiv({ className: 'my-custom-class' });
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
import * as actions from '@universityofmaryland/web-builder-library/styledElements/actions';

const button = document.createElement('a');
button.textContent = 'Click Me';
button.href = '/page';

const { element, styles } = actions.primary({ element: button });

// Inject element into DOM
document.body.appendChild(element);

// Inject styles into head
const styleTag = document.createElement('style');
styleTag.textContent = styles;
document.head.appendChild(styleTag);
```

## API Documentation

### Core Exports

- `ElementBuilder` - Main builder class
- `createStyledElement` - Factory function with builder variants
- Type exports: `ElementProps`, `BuilderConfig`, `StyleModifierProps`, etc.

### Styled Elements

Pre-configured element builders integrating with UMD Design System styles:

- `actions` - Link and action elements (primary, secondary, outline, icon)
- `assets` - Asset-related elements
- `buttons` - Button elements (fullScreen, videoState)
- `event` - Event-related elements
- `headline` - Headline elements
- `layout` - Layout container elements
- `richText` - Rich text elements
- `text` - Text decoration elements (eyebrow, ribbon, lineAdjustment)

### Utility Functions

From `styledElements`:

- `create(props)` - Create styled element with className
- `createDiv(props)` - Create styled div element
- `createParagraph(props)` - Create styled p element
- `createSpan(props)` - Create styled span element

## Peer Dependencies

- `@universityofmaryland/web-styles-library` ^1.0.0

## License

MIT

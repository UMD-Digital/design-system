# @universityofmaryland/web-builder-library

Element Builder for the University of Maryland Design System

## Installation

```bash
npm install @universityofmaryland/web-builder-library
```

## Usage

### Quick Start

The builder package provides a fluent API for creating HTML elements with UMD Design System styles:

```typescript
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as Styles from '@universityofmaryland/web-styles-library';

// Create a simple element
const container = new ElementBuilder()
  .withClassName('container')
  .withText('Hello World')
  .build();

// Create an element with UMD styles
const button = new ElementBuilder('slot')
  .withClassName('umd-action-primary')
  .withStyles(Styles.element.action.primary.normal)
  .withText('Click Me')
  .withAttribute('href', '/page')
  .build();

// Inject into DOM
document.body.appendChild(button.element);

// Inject styles
const styleTag = document.createElement('style');
styleTag.textContent = button.styles;
document.head.appendChild(styleTag);
```

### API Structure

#### ElementBuilder - Core Fluent Builder API

The main class for building elements with a chainable interface:

```typescript
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as Styles from '@universityofmaryland/web-styles-library';

// Create a new element (defaults to div)
const container = new ElementBuilder()
  .withClassName('container')
  .withStyles({ element: { padding: '20px' } })
  .withChild(childElement)
  .build();

// Create a specific element type
const link = new ElementBuilder('a')
  .withAttribute('href', '/about')
  .withText('About Us')
  .build();

// Wrap an existing element with UMD styles
const headline = new ElementBuilder(headlineElement)
  .styled(Styles.typography.sans.larger)
  .withAnimation('slideUnder', { duration: '300ms' })
  .build();
```

### Using with UMD Design System Styles

The builder integrates seamlessly with the styles package composable functions:

```typescript
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as Styles from '@universityofmaryland/web-styles-library';

// Primary action button
const primaryButton = new ElementBuilder('slot')
  .withClassName('umd-action-primary')
  .withStyles(Styles.element.action.primary.normal)
  .withText('Click Me')
  .build();

// Large headline with animation
const headline = new ElementBuilder('slot')
  .withClassName('umd-headline-sans-large')
  .withStyles(Styles.typography.sans.fonts.large)
  .withAnimation('slideUnder')
  .withText('My Headline')
  .build();

// Grid layout with gap
const grid = new ElementBuilder()
  .withClassName('umd-grid-3')
  .withStyles(Styles.layout.grid.gap.three)
  .withChildren(item1, item2, item3)
  .build();

// Custom composable options
const customButton = new ElementBuilder('slot')
  .withClassName('umd-action-primary-large-white')
  .withStyles(Styles.element.action.primary.composePrimary({
    size: 'large',
    color: 'white'
  }))
  .withText('Custom Button')
  .build();
```

### Element Model Pattern

All builders return an `ElementModel` with this structure:

```typescript
interface ElementModel<T extends HTMLElement = HTMLElement> {
  element: T;              // The built HTML element
  styles: string;          // Compiled CSS styles (including children)
  update?: (props) => void; // Optional update method for reactivity
  destroy?: () => void;    // Optional cleanup method
  events?: Record<string, Function>; // Optional custom events ✨ NEW
}
```

**Properties:**
- `element` - The DOM element created by the builder
- `styles` - CSS string including all styles (auto-merged from children)
- `update()` - Update the element with new props (when supported)
- `destroy()` - Clean up event listeners and resources
- `events` - Custom methods/events attached via `.withEvents()` (optional)

### Complete Example

```typescript
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as Styles from '@universityofmaryland/web-styles-library';

// Create a primary action button with UMD styles
const action = new ElementBuilder('slot')
  .withClassName('umd-action-primary')
  .withStyles(Styles.element.action.primary.normal)
  .withText('Learn More')
  .withAttribute('href', '/about')
  .build();

// Create a custom container
const container = new ElementBuilder()
  .withClassName('action-container')
  .withStyles({
    element: {
      display: 'flex',
      justifyContent: 'center',
      padding: '2rem',
    },
  })
  .withChild(action.element)
  .build();

// Inject into DOM
document.body.appendChild(container.element);

// Inject combined styles
const styleTag = document.createElement('style');
styleTag.textContent = container.styles + action.styles;
document.head.appendChild(styleTag);
```

## Animation Support

The builder includes CSS animation support for adding motion to elements:

```typescript
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as Styles from '@universityofmaryland/web-styles-library';

// Add animation to an element with UMD styles
const animatedButton = new ElementBuilder('slot')
  .withClassName('umd-action-primary')
  .withStyles(Styles.element.action.primary.normal)
  .withText('Click Me')
  .withAnimation('slideUnder', {
    duration: '300ms',
    delay: '100ms',
    easing: 'ease-in-out',
    iterationCount: 1,
    direction: 'normal',
    fillMode: 'forwards',
  })
  .build();

// Custom element with animation
const fadeInDiv = new ElementBuilder()
  .withClassName('content')
  .withText('Animated content')
  .withAnimation('fadeIn', { duration: '500ms' })
  .build();
```

**Animation Options**:

- `duration` - Animation duration (e.g., '300ms', '1s')
- `delay` - Animation delay before starting
- `easing` - Timing function (ease-in-out, linear, etc.)
- `iterationCount` - Number of times to repeat (number or 'infinite')
- `direction` - Animation direction (normal, reverse, alternate, alternate-reverse)
- `fillMode` - How styles apply before/after animation (none, forwards, backwards, both)

**Note**: Keyframe definitions must be provided in your CSS. Phase 2 of the animation system (coming soon) will support inline keyframe definitions.

## Advanced Features

### Non-Destructive Element Access with `.getElement()`

The `.getElement()` method provides non-destructive access to the underlying element with accumulated classes and attributes applied. Unlike `.build()`, it does not finalize the builder, allowing you to continue modifying it:

```typescript
import { ElementBuilder } from '@universityofmaryland/web-builder-library';

// Create a builder and get the element without finalizing
const builder = new ElementBuilder('div')
  .withClassName('container')
  .withAttribute('data-id', '123')
  .withData({ test: 'true' });

// Get element with classes and attributes applied
const element = builder.getElement();

console.log(element.className); // 'container'
console.log(element.getAttribute('data-id')); // '123'
console.log(element.getAttribute('data-test')); // 'true'

// Builder can still be modified!
builder
  .withClassName('active')
  .withChild(document.createElement('span'));

// Now build the final version
const model = builder.build();
console.log(model.element.classList.contains('active')); // true
```

**Use Cases:**
- Getting element reference for external libraries before finalizing
- Early DOM manipulation while preserving builder state
- Conditional logic based on element properties before building

**Comparison with `.build().element`:**

```typescript
// .getElement() - Non-destructive, builder remains usable
const el1 = builder.getElement();
builder.withClassName('more-classes'); // ✅ Still works

// .build().element - Finalizes builder (terminal operation)
const el2 = builder.build().element;
builder.withClassName('classes'); // ⚠️ Warning: builder already built
```

### ElementModel Children with Auto-Style Merging

The builder now intelligently handles `ElementModel` children, automatically merging their styles with the parent. This eliminates the need for manual style concatenation:

```typescript
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as Styles from '@universityofmaryland/web-styles-library';

// Create a button ElementModel
const button = new ElementBuilder('slot')
  .withClassName('umd-action-primary')
  .withStyles(Styles.element.action.primary.normal)
  .withText('Play')
  .withStyles({ element: { backgroundColor: 'blue' } })
  .build();

// Pass ElementModel directly to withChildren - styles merge automatically!
const container = new ElementBuilder()
  .withClassName('video-container')
  .withStyles({ element: { padding: '20px' } })
  .withChildren(videoElement, button)  // button is ElementModel, not button.element
  .build();

// container.styles now includes both container and button styles
// No manual concatenation needed!
```

**Before (manual approach):**
```typescript
const button = new ElementBuilder('button').build();
const container = new ElementBuilder()
  .withChild(button.element)  // Must extract .element
  .build();

// Manual style merging required
const styleTag = document.createElement('style');
styleTag.textContent = container.styles + button.styles;
document.head.appendChild(styleTag);
```

**After (automatic approach):**
```typescript
const button = new ElementBuilder('button').build();
const container = new ElementBuilder()
  .withChild(button)  // Pass ElementModel directly
  .build();

// Styles are already merged!
const styleTag = document.createElement('style');
styleTag.textContent = container.styles;  // Includes button styles
document.head.appendChild(styleTag);
```

**Supported Child Types:**
- `ElementBuilder` - Another builder (auto-built and merged)
- `ElementModel` - Previously built element (auto-merged) ✨ **NEW**
- `HTMLElement` - Plain DOM element
- `string` - Text content

### Custom Events with `.withEvents()`

Attach custom methods and event handlers to your ElementModel for imperative control:

```typescript
import { ElementBuilder } from '@universityofmaryland/web-builder-library';

const videoElement = document.createElement('video');
const button = document.createElement('button');

const videoPlayer = new ElementBuilder()
  .withClassName('video-player')
  .withChildren(videoElement, button)
  .withEvents({
    play: () => videoElement.play(),
    pause: () => videoElement.pause(),
    seek: (time: number) => videoElement.currentTime = time,
    getCurrentTime: () => videoElement.currentTime,
  })
  .build();

// Use custom events
videoPlayer.events.play();
videoPlayer.events.pause();
videoPlayer.events.seek(30);
console.log(videoPlayer.events.getCurrentTime());
```

**Real-World Example - Video Toggle:**

```typescript
const button = new ElementBuilder('button')
  .withAttribute('type', 'button')
  .withAttribute('aria-label', 'Play')
  .withHTML(playIcon)
  .build();

const setPlay = () => {
  button.element.setAttribute('aria-label', 'Pause');
  button.element.innerHTML = pauseIcon;
  video.play();
};

const setPause = () => {
  button.element.setAttribute('aria-label', 'Play');
  button.element.innerHTML = playIcon;
  video.pause();
};

// Clean, declarative API
const videoToggle = new ElementBuilder()
  .withClassName('umd-element-video')
  .withStyles({ element: { position: 'relative' } })
  .withChildren(video, button)  // ElementModel auto-merged
  .withEvents({ setPlay, setPause })  // Custom events attached
  .build();

// Use the events
videoToggle.events.setPlay();
videoToggle.events.setPause();
```

**Benefits:**
- Clean separation of DOM structure and behavior
- No manual object spreading required
- Type-safe event definitions
- Events only included when defined (optional property)

### Combined Usage

Both features work together seamlessly for complex components:

```typescript
// Child component with events
const controlPanel = new ElementBuilder()
  .withClassName('controls')
  .withChildren(playButton, stopButton, volumeSlider)
  .withEvents({
    play: () => console.log('play'),
    stop: () => console.log('stop'),
  })
  .build();

// Parent component uses child as ElementModel
const mediaPlayer = new ElementBuilder()
  .withClassName('media-player')
  .withChildren(
    videoElement,
    controlPanel,  // ElementModel with events - styles auto-merge
    progressBar
  )
  .withEvents({
    fullscreen: () => document.documentElement.requestFullscreen(),
  })
  .build();

// Both components maintain their own events
controlPanel.events.play();
mediaPlayer.events.fullscreen();

// Styles are fully merged
styleTag.textContent = mediaPlayer.styles;  // Includes controlPanel styles
```

## Alternative Import Patterns

For tree-shaking and selective imports, you can import specific modules:

```typescript
// Import core builder
import { ElementBuilder } from '@universityofmaryland/web-builder-library';

// Import from core modules
import {
  ElementBuilder,
  StyleManager,
  LifecycleManager,
} from '@universityofmaryland/web-builder-library/core';

// Import individual core modules
import { ElementBuilder } from '@universityofmaryland/web-builder-library/core/ElementBuilder';

// Import UMD Design System styles
import * as Styles from '@universityofmaryland/web-styles-library';
```

## API Documentation

### ElementBuilder Methods

The core builder class provides a comprehensive fluent API:

**Class Methods**:

- `withClassName(...names: string[])` - Add CSS class names
- `withStyles(styles, priority?)` - Add JSS style objects
- `styled(styleObject, priority?)` - Apply UMD Design System style object
- `withAttribute(key, value)` - Set HTML attribute
- `withAttributes(attrs)` - Set multiple attributes
- `withAria(attrs)` - Set ARIA attributes
- `withData(attrs)` - Set data attributes
- `withText(text)` - Set text content
- `withHTML(html)` - Set inner HTML
- `withChild(child)` - Add child element (supports ElementModel with auto-style merge)
- `withChildren(...children)` - Add multiple children (supports ElementModel with auto-style merge)
- `withChildIf(condition, child)` - Conditionally add child
- `withChildrenFrom(items, mapper)` - Map array to children
- `withEvents(events)` - Attach custom events/methods to ElementModel ✨ **NEW**
- `on(event, handler, options?)` - Add event listener
- `onClick/onInput/onChange/onFocus/etc` - Convenience event methods
- `withAnimation(name, options)` - Add CSS animation
- `withModifier(fn)` - Apply custom element modifier
- `ref(callback)` - Get reference to element
- `apply(fn)` - Apply function to builder
- `clone()` - Clone builder (immutable branching)
- `getStyles()` - Get compiled styles without building
- `getClassNames()` - Get accumulated class names
- `getElement()` - Get element with classes/attributes applied (non-destructive)
- `build()` - Build final ElementModel (terminal operation)
- `mountTo(parent)` - Build and mount to parent

**Conditional Methods**:

- `withStylesIf(condition, styles)`
- `withChildIf(condition, child)`

**ARIA Convenience Methods**:

- `ariaLabel(label)`
- `ariaHidden(hidden)`
- `ariaExpanded(expanded)`
- `ariaPressed(pressed)`
- `ariaCurrent(current)`
- `withRole(role)`

### Preset Factories

See "Presets - Pre-configured UMD Design System Builders" section above for complete list.

### Composition Functions

See "Compose - High-Level Composition Helpers" section above for complete list.

### Type Exports

```typescript
import type {
  ElementProps,
  ElementStyles,
  StyleOptions,
  CompositeChild,
  BuilderConfig,
  StyleModifierProps,
  styleObject,
} from '@universityofmaryland/web-builder-library';
```

## Peer Dependencies

- `@universityofmaryland/web-styles-library` ^1.0.0

## License

MIT

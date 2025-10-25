# @universityofmaryland/web-builder-library

Element Builder for the University of Maryland Design System

## Installation

```bash
npm install @universityofmaryland/web-builder-library
```

## Usage

### Quick Start

The builder package provides three main ways to create elements:

1. **ElementBuilder Class** - Core fluent builder API
2. **Presets** - Pre-configured builders with UMD Design System styles
3. **Compose** - High-level composition functions for complex patterns

```typescript
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { actions } from '@universityofmaryland/web-builder-library/presets';

// Method 1: Using ElementBuilder directly
const container = new ElementBuilder()
  .withClassName('container')
  .withText('Hello World')
  .build();

// Method 2: Using presets
const button = actions
  .primary()
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

The builder package provides three main interfaces:

#### 1. ElementBuilder - Core Fluent Builder API

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

#### 2. Presets - Pre-configured UMD Design System Builders

Pre-configured builders that return ElementBuilder instances ready for further customization:

```typescript
import {
  actions,
  headlines,
  text,
  layouts,
} from '@universityofmaryland/web-builder-library/presets';

// Actions (buttons and links)
const primary = actions.primary().withText('Primary Action').build();
const secondary = actions.secondary().withText('Secondary Action').build();
const outline = actions.outline().withText('Outline Action').build();

// Headlines (various sizes)
const largeHeadline = headlines.sansLarge().withText('Large Headline').build();
const mediumHeadline = headlines
  .sansMedium()
  .withText('Medium Headline')
  .build();

// Text elements
const eyebrow = text.eyebrow().withText('Eyebrow Text').build();
const body = text.body().withText('Body text content').build();

// Layouts
const grid = layouts.grid(3, true).withChildren(card1, card2, card3).build();

const stacked = layouts
  .stacked('medium')
  .withChildren(headline, text, action)
  .build();
```

**Available Preset Categories**:

- **actions**: `primary`, `primaryLarge`, `primaryWhite`, `secondary`, `secondaryLarge`, `secondaryWhite`, `secondaryGold`, `outline`, `outlineLarge`, `outlineWhite`, `iconSmall`, `iconSmallDark`
- **headlines**: `sansExtraLarge`, `sansLargest`, `sansLarger`, `sansLarge`, `sansMedium`, `sansSmall`, `sansSmaller`, `sansMin`, `sansScalingLarger`, `sansScalingMin`, `campaignMaximum`, `campaignExtraLarge`, `campaignLarge`
- **text**: `eyebrow`, `ribbon`, `body`
- **layouts**: `grid(columns, withGap)`, `container`, `centered`, `stacked(gap)`, `inline(gap)`, `gridStacked`
- **assets**: `image(isScaled)`, `caption`

#### 3. Compose - High-Level Composition Helpers

Composition functions for common UI patterns:

```typescript
import { textLockup, card, hero } from '@universityofmaryland/web-builder-library/compose';

// Text lockup (eyebrow + headline + text)
const lockup = textLockup({
  eyebrow: 'News & Events',
  headline: 'Latest Updates',
  text: 'Check out what's happening at UMD',
  headlineSize: 'large'
}).build();

// Card component
const myCard = card({
  image: '/image.jpg',
  imageAlt: 'Card image',
  eyebrow: 'Featured',
  headline: 'Card Title',
  text: 'Card description',
  action: {
    text: 'Learn More',
    href: '/learn-more',
    type: 'secondary'
  }
}).build();

// Hero component
const myHero = hero({
  image: '/hero.jpg',
  headline: 'Welcome',
  text: 'University of Maryland',
  actions: [
    { text: 'Apply Now', href: '/apply', type: 'primary' },
    { text: 'Learn More', href: '/about', type: 'secondary' }
  ]
}).build();
```

**Available Composition Functions**:

- `textLockup(props)` - Eyebrow + headline + text pattern
- `card(props)` - Card with image, content, and action
- `hero(props)` - Hero section with background and actions
- `list(props)` - List from array of items
- `grid(props)` - Grid layout with mapped items

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
import { actions } from '@universityofmaryland/web-builder-library/presets';

// Create a primary action button
const action = actions
  .primary()
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
import { actions } from '@universityofmaryland/web-builder-library/presets';

// Add animation to an element
const animatedButton = actions
  .primary()
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

### ElementModel Children with Auto-Style Merging

The builder now intelligently handles `ElementModel` children, automatically merging their styles with the parent. This eliminates the need for manual style concatenation:

```typescript
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { actions } from '@universityofmaryland/web-builder-library/presets';

// Create a button ElementModel
const button = actions
  .primary()
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

// Import specific preset categories
import {
  actions,
  headlines,
  text,
} from '@universityofmaryland/web-builder-library/presets';

// Import composition helpers
import {
  textLockup,
  card,
  hero,
} from '@universityofmaryland/web-builder-library/compose';

// Import from core modules
import {
  StyleManager,
  LifecycleManager,
} from '@universityofmaryland/web-builder-library/core';

// Import individual core modules
import { ElementBuilder } from '@universityofmaryland/web-builder-library/core/ElementBuilder';
```

## API Documentation

### ElementBuilder Methods

The core builder class provides a comprehensive fluent API:

**Class Methods**:

- `withClassName(...names: string[])` - Add CSS class names
- `withStyles(styles, priority?)` - Add JSS style objects
- `styled(styleObject, priority?)` - Apply UMD Design System style object
- `withThemeDark(isDark?)` - Apply dark theme (white text/icon colors)
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
- `build()` - Build final ElementModel (terminal operation)
- `buildElement()` - Build and return just the element
- `mountTo(parent)` - Build and mount to parent

**Conditional Methods**:

- `withClassNameIf(condition, ...names)`
- `withStylesIf(condition, styles)`
- `withAttributeIf(condition, key, value)`
- `withTextIf(condition, text)`
- `withChildIf(condition, child)`

**ARIA Convenience Methods**:

- `ariaLabel(label)`
- `ariaHidden(hidden)`
- `ariaExpanded(expanded)`
- `ariaPressed(pressed)`
- `ariaCurrent(current)`
- `role(role)`
- `focusable(tabindex)`

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

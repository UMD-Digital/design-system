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
interface ElementModel {
  element: HTMLElement; // The styled DOM element
  className: string; // The class name applied
  styles: string; // Generated CSS styles
}
```

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
- `withTheme(theme)` - Set theme (light/dark)
- `withAttribute(key, value)` - Set HTML attribute
- `withAttributes(attrs)` - Set multiple attributes
- `withAria(attrs)` - Set ARIA attributes
- `withData(attrs)` - Set data attributes
- `withText(text)` - Set text content
- `withHTML(html)` - Set inner HTML
- `withChild(child)` - Add child element
- `withChildren(...children)` - Add multiple children
- `withChildIf(condition, child)` - Conditionally add child
- `withChildrenFrom(items, mapper)` - Map array to children
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
- `withThemeIf(condition, theme)`
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

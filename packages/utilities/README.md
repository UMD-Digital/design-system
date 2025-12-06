# @universityofmaryland/web-utilities-library

[![Utilities Version](https://img.shields.io/badge/Utilities-v1.0.2-blue)](https://www.npmjs.com/package/@universityofmaryland/web-utilities-library)

Shared utility functions for the University of Maryland Design System, organized by category for optimal tree-shaking and selective imports. Includes utilities for DOM manipulation, accessibility, animations, date formatting, style processing, and more.

## Installation

```bash
npm install @universityofmaryland/web-utilities-library
# or
yarn add @universityofmaryland/web-utilities-library
```

## Usage

### Recommended: Category-Based Imports

Import utilities from specific categories for optimal tree-shaking:

```typescript
// DOM utilities
import { addClass, removeClass } from '@universityofmaryland/web-utilities-library/dom';

// Style utilities
import { jssToCSS, createMediaQuery } from '@universityofmaryland/web-utilities-library/styles';

// Animation utilities
import { smoothScrollToElement, observeGridAnimations } from '@universityofmaryland/web-utilities-library/animation';

// Accessibility utilities
import { trapFocus, imageHasAlt } from '@universityofmaryland/web-utilities-library/accessibility';
```

### Individual Function Import

For maximum tree-shaking optimization:

```typescript
import { addClass } from '@universityofmaryland/web-utilities-library/dom/addClass';
import { jssToCSS } from '@universityofmaryland/web-utilities-library/styles/jssToCSS';
```

### Category Namespace Import

Import entire categories when you need multiple utilities:

```typescript
import * as DomUtils from '@universityofmaryland/web-utilities-library/dom';
import * as StyleUtils from '@universityofmaryland/web-utilities-library/styles';

// Use utilities
DomUtils.addClass(element, 'active');
const css = StyleUtils.jssToCSS({ styleObj: jssObject });
```

### Main Package Import

Import everything from the main entry point (not recommended for production):

```typescript
import * as Utils from '@universityofmaryland/web-utilities-library';

Utils.addClass(element, 'active');
Utils.smoothScrollToElement({ element, spread: 20 });
```

## Utility Categories

### Accessibility (`/accessibility`)

Utilities for WCAG compliance and accessible interactions:

- `trapFocus` - Trap keyboard focus within a container (for modals, dialogs)
- `handleKeyboardNavigation` - Handle Escape, Tab, and Arrow key navigation
- `isScreenZoomed` - Detect if the browser is zoomed
- `isPreferredReducedMotion` - Check if user prefers reduced motion
- `imageHasAlt` - Validate that images have proper alt attributes

```typescript
import { trapFocus } from '@universityofmaryland/web-utilities-library/accessibility';

const cleanup = trapFocus({
  element: dialogElement,
  action: (event) => {
    if (event.key === 'Escape') closeDialog();
  }
});
```

### Animation (`/animation`)

Animation helpers and scroll behaviors:

- `smoothScrollToElement` - Smooth scroll to an element with offset
- `observeGridAnimations` - Stagger fade-in animations for grid items
- `wrapLinkForAnimation` - Wrap link text in spans for character animation
- `shrinkThenRemove` - Animate element shrinking before removal

```typescript
import { smoothScrollToElement } from '@universityofmaryland/web-utilities-library/animation';

smoothScrollToElement({
  element: targetSection,
  spread: 100 // Offset from top
});
```

### Adapters (`/adapters`)

Type adapters for converting between different component interfaces:

- `toElementVisual` - Convert ComponentRef to ElementVisual format
- `toUMDElement` - Convert ComponentRef to UMDElement format

### Date (`/date`)

Date parsing and formatting utilities:

- `formatDateForDisplay` - Format dates for visual display (e.g., "Sep 29, 2025")
- `formatDateForComparison` - Format dates for string comparison (ISO format)
- `parseDateFromElement` - Extract and format date from element text
- `createEventDetails` - Create structured event data with dates and location

```typescript
import { formatDateForDisplay } from '@universityofmaryland/web-utilities-library/date';

const formatted = formatDateForDisplay(new Date());
// {
//   full: 'Sep 29, 2025',
//   dayOfWeekLong: 'Monday',
//   dayOfWeek: 'Mon',
//   month: 'Sep',
//   day: '29',
//   time: '2:30pm'
// }
```

### DOM (`/dom`)

DOM manipulation and traversal utilities:

- `addClass` - Add CSS class to element
- `removeClass` - Remove CSS class from element
- `findParent` - Find parent element matching selector
- `wrapTextNodeInSpan` - Wrap text nodes in span elements
- `cloneElementWithoutAttributes` - Clone element without attributes
- `extractIconElement` - Extract SVG or IMG icon from element
- `getImageFromSlot` - Get image from named slot in Shadow DOM

```typescript
import { addClass, removeClass } from '@universityofmaryland/web-utilities-library/dom';

addClass(element, 'active');
removeClass(element, 'hidden');
```

### Elements (`/elements`)

Element creation and slot management for Web Components:

- `createSlot` - Create slot element for Shadow DOM
- `createStyleTemplate` - Create style template element
- `createLinkWithSpan` - Create link element with wrapped text
- `createStyledSlotOrClone` - Create slot or clone based on 'styled' attribute

```typescript
import { createSlot } from '@universityofmaryland/web-utilities-library/elements';

const slot = createSlot({
  type: 'span',
  name: 'content',
  defaultText: 'Default content'
});
```

### Events (`/events`)

Event handling and gesture detection:

- `handleKeyboardNavigation` - Handle keyboard events (Escape, Tab, Arrows)
- `setupSwipeDetection` - Detect left/right swipe gestures on touch devices

```typescript
import { setupSwipeDetection } from '@universityofmaryland/web-utilities-library/events';

setupSwipeDetection({
  container: carouselElement,
  callback: (swipedRight) => {
    if (swipedRight) goToNextSlide();
    else goToPreviousSlide();
  }
});
```

### Media (`/media`)

Image and SVG utilities:

- `parseSvgString` - Parse SVG string into DOM element
- `imageFromSvg` - Convert SVG element to image element
- `getResponsiveImageSize` - Calculate responsive image dimensions

```typescript
import { parseSvgString } from '@universityofmaryland/web-utilities-library/media';

const svgElement = parseSvgString('<svg>...</svg>');
container.appendChild(svgElement);
```

### Network (`/network`)

Network request utilities:

- `fetchGraphQL` - Fetch data from GraphQL API

```typescript
import { fetchGraphQL } from '@universityofmaryland/web-utilities-library/network';

const data = await fetchGraphQL({
  url: 'https://api.example.com/graphql',
  query: '{ users { id name } }'
});
```

### Performance (`/performance`)

Performance optimization utilities:

- `debounce` - Debounce function calls

```typescript
import { debounce } from '@universityofmaryland/web-utilities-library/performance';

const debouncedResize = debounce(() => {
  console.log('Window resized');
}, 300);

window.addEventListener('resize', debouncedResize);
```

### Storage (`/storage`)

localStorage wrappers:

- `getLocalStorageInt` - Get integer from localStorage
- `setLocalStorageTimestamp` - Set timestamp in localStorage

### String (`/string`)

String manipulation utilities:

- `capitalize` - Capitalize first letter of string
- `truncate` - Truncate string to specified length
- `truncateText` - Smart text truncation with word boundaries
- `truncateTextBasedOnSize` - Truncate text to fit container size

```typescript
import { capitalize, truncate } from '@universityofmaryland/web-utilities-library/string';

const title = capitalize('hello world'); // 'Hello world'
const short = truncate('Long text here', 10); // 'Long te...'
```

### Styles (`/styles`)

CSS-in-JS and style processing utilities:

- `jssToCSS` - Convert JSS object to CSS string (most used utility!)
- `jssEntryToCSS` - Convert JSS entry to CSS string
- `combineStyles` - Merge multiple JSS objects
- `createMediaQuery` - Create @media query JSS object
- `createMediaQueryRange` - Create range @media query
- `parsePixelValue` - Parse pixel string to number
- `withViewTimelineAnimation` - Add view timeline animation

```typescript
import { jssToCSS, createMediaQuery } from '@universityofmaryland/web-utilities-library/styles';

const jssObject = {
  '.button': {
    color: 'red',
    fontSize: '16px',
    ...createMediaQuery('min-width', 768, {
      fontSize: '18px'
    })
  }
};

const css = jssToCSS({ styleObj: jssObject });
// Injects CSS into document
```

### Validation (`/validation`)

Input and accessibility validation:

- `getValidatedSlotImage` - Get and validate image from slot (checks alt text)
- `isHTMLElement` - Type guard for HTMLElement

```typescript
import { getValidatedSlotImage } from '@universityofmaryland/web-utilities-library/validation';

const image = getValidatedSlotImage({
  element: component,
  slotName: 'hero'
});
// Returns null if image missing or lacks alt text
```

## TypeScript Support

Full TypeScript definitions are included with autocomplete support:

```typescript
import { addClass } from '@universityofmaryland/web-utilities-library/dom';

// All utilities are fully typed
addClass(element, 'active'); // Type-safe

// Category imports provide type safety
import type * as DomUtils from '@universityofmaryland/web-utilities-library/dom';
```

## Bundle Size Optimization

### Tree-Shaking (Recommended)

Use selective imports to include only the utilities you need:

```typescript
// ✅ Excellent: Only addClass is bundled
import { addClass } from '@universityofmaryland/web-utilities-library/dom';

// ✅ Good: Only dom category is bundled
import * as DomUtils from '@universityofmaryland/web-utilities-library/dom';

// ⚠️ Caution: All utilities are bundled
import * as Utils from '@universityofmaryland/web-utilities-library';
```

### Build Tool Configuration

Most modern bundlers (Webpack, Rollup, Vite, esbuild) support tree-shaking by default when using ES modules. Ensure your build tool is configured for production mode.

## API Documentation

Full API documentation generated with TypeDoc is available at:

**[https://umd-digital.github.io/design-system/modules/_universityofmaryland_web_utilities_library.html](https://umd-digital.github.io/design-system/modules/_universityofmaryland_web_utilities_library.html)**

## Testing

This package has **100% test coverage** with comprehensive Jest tests:

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

**Test Statistics**:
- 48 test suites
- 1032 passing tests
- 100% code coverage (statements, branches, functions, lines)

## Development

```bash
# Install dependencies
npm install

# Build the package
npm run build

# Watch mode for development
npm start

# Run tests
npm test

# Generate TypeDoc documentation
npm run docs
```

## Package Exports

This package uses modern [package exports](https://nodejs.org/api/packages.html#exports) for optimal tree-shaking:

```json
{
  "exports": {
    ".": "./dist/index.mjs",
    "./accessibility": "./dist/accessibility.mjs",
    "./animation": "./dist/animation.mjs",
    "./dom": "./dist/dom.mjs",
    "./styles": "./dist/styles.mjs",
    // ... other categories
  }
}
```

Both CommonJS (`.js`) and ES Modules (`.mjs`) are supported with full TypeScript definitions (`.d.ts`).

## Migration Guide

If you're upgrading from an earlier version, see the [MIGRATION.md](./MIGRATION.md) guide for details on renamed functions and updated import paths.

**Recent Changes (v0.1.0 → v0.2.0)**:
- 19 functions renamed for consistency
- 1 function reorganized (imageHasAlt: validation → accessibility)
- 3 category moves for better semantics
- Established naming conventions (parse*, format*, create*, extract*, etc.)

## Browser Support

All utilities work in modern browsers:

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## License

MIT © University of Maryland

## Related Packages

Part of the University of Maryland Design System:

- [@universityofmaryland/web-icons-library](https://www.npmjs.com/package/@universityofmaryland/web-icons-library) - Icon and logo assets
- [@universityofmaryland/web-styles-library](https://www.npmjs.com/package/@universityofmaryland/web-styles-library) - Design tokens and styles
- [@universityofmaryland/web-elements-library](https://www.npmjs.com/package/@universityofmaryland/web-elements-library) - UI element builders
- [@universityofmaryland/web-components-library](https://www.npmjs.com/package/@universityofmaryland/web-components-library) - Web Components
- [@universityofmaryland/web-feeds-library](https://www.npmjs.com/package/@universityofmaryland/web-feeds-library) - Dynamic content feeds

## Support

- **Documentation**: [https://designsystem.umd.edu](https://designsystem.umd.edu)
- **Playground**: [http://playground.designsystem.umd.edu](http://playground.designsystem.umd.edu)
- **TypeDoc**: [https://umd-digital.github.io/design-system/](https://umd-digital.github.io/design-system/)
- **Issues**: [GitHub Issues](https://github.com/UMD-Digital/design-system/issues)

# University of Maryland Feeds Library

[![Feeds Version](https://img.shields.io/badge/Feeds-v1.1.0-blue)](https://www.npmjs.com/package/@universityofmaryland/web-feeds-library)

Dynamic content feed components for displaying University of Maryland news, events, and academic information with automatic updates, caching, and brand-compliant styling.

## Overview

The UMD Feeds Library simplifies the integration of dynamic UMD content into any web application. It provides pre-built components for displaying news articles, event calendars, and academic program information that automatically sync with UMD data sources. Built on the Elements Library and styled with the Styles Library, these components ensure consistent presentation while handling all complexities of data fetching, caching, error handling, and responsive layouts.

## Installation

```bash
# Using npm
npm install @universityofmaryland/web-feeds-library

# Using yarn
yarn add @universityofmaryland/web-feeds-library
```

### Peer Dependencies

For complete styling and functionality:

```bash
npm install @universityofmaryland/web-styles-library
npm install @universityofmaryland/web-elements-library
```

## Quick Start

```javascript
import { news, events } from '@universityofmaryland/web-feeds-library';

// Create a news grid
const newsGrid = news.grid({
  token: 'your-api-token',
  numberOfColumnsToShow: 3,
  isThemeDark: false,
});

// Add to your page
document.querySelector('.news-container').appendChild(newsGrid.element);
```

## Feed Types

### News Feeds

Display UMD news articles in various layouts:

```javascript
import { news } from '@universityofmaryland/web-feeds-library';

// Grid layout - Responsive card grid
const newsGrid = news.grid({
  token: 'your-api-token',
  numberOfColumnsToShow: 3,
  isThemeDark: false,
  isTransparent: false,
});

// List layout - Vertical article list
const newsList = news.list({
  token: 'your-api-token',
});

// Featured layout - Hero article with sidebar
const newsFeatured = news.featured({
  token: 'your-api-token',
  isLazyLoad: true,
  isLayoutReversed: false,
});
```

### Event Feeds

Display UMD events with calendar integration:

```javascript
import { events } from '@universityofmaryland/web-feeds-library';

// Grid layout - Event cards
const eventsGrid = events.grid({
  token: 'your-api-token',
  numberOfColumnsToShow: 3,
});

// List layout - Chronological list
const eventsList = events.list({
  token: 'your-api-token',
});

// Slider - Horizontal scroll
const eventsSlider = events.slider({
  token: 'your-api-token',
});
```

### Academic Feeds

Display academic programs and information:

```javascript
import { academic } from '@universityofmaryland/web-feeds-library';

// Academic event slider
const academicSlider = academic.slider({
  token: 'your-api-token',
  department: 'engineering',
  programType: 'graduate',
});
```

## Integration with Other Packages

### Styles Package Integration

Feeds automatically use UMD styles for consistent appearance:

```html
<!-- Feeds inherit grid and spacing utilities -->
<div class="umd-layout-space-vertical-landing">
  <div id="news-feed"></div>
</div>
```

### Elements Package Usage

Feeds are built using Elements for rendering:

- Card elements for item display
- Grid layouts from layout elements
- Typography from text elements

### Components Package Compatibility

Feeds can be wrapped in web components:

```javascript
import { Components } from '@universityofmaryland/web-components-library';
import { news } from '@universityofmaryland/web-feeds-library';

// Initialize feed component wrapper
Components.feed.newsList();
// Feed will render inside the component
```

## Configuration Options

### Common Properties

All feeds accept these base properties:

```typescript
interface BaseFeedProps {
  token: string; // Required: API authentication token
  isThemeDark?: boolean; // Dark theme styling
  isTransparent?: boolean; // Transparent card backgrounds
}
```

### Layout-Specific Options

**Grid Layout:**

```typescript
interface GridProps extends BaseFeedProps {
  numberOfColumnsToShow?: number; // 1-4, default: 3
}
```

**Featured Layout:**

```typescript
interface FeaturedProps extends BaseFeedProps {
  isLazyLoad?: boolean;
  isLayoutReversed?: boolean;
}
```

### Event Handling

```javascript
import { events } from '@universityofmaryland/web-feeds-library';

const eventsFeed = events.list({
  token: 'your-api-token',
  onLoad: (items) => {
    console.log(`Loaded ${items.length} events`);
  },
  onError: (error) => {
    console.error('Feed error:', error);
    // Show fallback content
  },
  onItemClick: (item) => {
    // Custom click handler
    console.log('Clicked:', item.title);
  },
});

// Listen for feed updates
eventsFeed.element.addEventListener('feed:update', (e) => {
  console.log('Feed updated with new items');
});
```

## Performance Features

### Lazy Loading

Load content as users scroll:

```javascript
const lazyFeed = news.featured({
  token: 'your-api-token',
  isLazyLoad: true,
});
```

## TypeScript Support

Full TypeScript definitions included:

```typescript
import type {
  NewsFeedProps,
  EventsFeedProps,
  FeedItem,
  FeedEvents,
} from '@universityofmaryland/web-feeds-library';

const newsProps: NewsFeedProps = {
  token: 'token',
  numberOfColumnsToShow: 3,
  isThemeDark: false,
};
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Accessibility

All feed components are WCAG 2.1 AA compliant:

- Semantic HTML markup
- ARIA live regions for updates
- Keyboard navigation
- Screen reader announcements
- Skip links for long lists

## Documentation

- **[Feed Components](./)** - Complete reference
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

# CLAUDE.md - Feeds Package

## Package Overview

The **Feeds Package** (`@universityofmaryland/web-feeds-library`) provides dynamic content feed components for academic programs, news, and events. Feeds fetch and display data from UMD APIs.

**Version**: 1.1.1
**Dependencies**:
- `@universityofmaryland/web-elements-library`
- `@universityofmaryland/web-styles-library`
- `@universityofmaryland/web-utilities-library`

## Build System

### Vite Configuration

- **Builder**: Vite with TypeScript
- **Output Formats**: ES Modules (`.mjs`) and CommonJS (`.js`)
- **External Dependencies**: All `@universityofmaryland/*` packages
- **Type Declarations**: Generated with `vite-plugin-dts`
- **Module Preservation**: `preserveModules: true`

### Build Commands

```bash
npm run build      # Production build
npm run dev        # Watch mode
npm run clean      # Remove build directory
npm test          # Run all tests
```

## Package Structure

### Source Organization

```
source/
├── composite/
│   ├── academic/     # Academic program feeds
│   ├── events/       # Event feeds (calendar, list, grid)
│   └── news/         # News feeds (featured, list, grid)
├── elements/         # Feed-specific element builders
└── macros/           # Feed utility functions (loaders, lazy loading)
```

### Export Pattern

```typescript
// Category import
import { createEventsFeed } from '@universityofmaryland/web-feeds-library/events';
import { createNewsFeed } from '@universityofmaryland/web-feeds-library/news';

// Main export
import { createEventsFeed, createNewsFeed } from '@universityofmaryland/web-feeds-library';
```

## package.json Exports

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    },
    "./events": {
      "types": "./dist/events.d.ts",
      "import": "./dist/events.mjs",
      "require": "./dist/events.js"
    },
    "./news": {
      "types": "./dist/news.d.ts",
      "import": "./dist/news.mjs",
      "require": "./dist/news.js"
    },
    "./academic": {
      "types": "./dist/academic.d.ts",
      "import": "./dist/academic.mjs",
      "require": "./dist/academic.js"
    }
  }
}
```

## Feed Types

### Events Feeds
- **Grid**: Event grid display
- **List**: Event list display
- **Grouped**: Events grouped by date

### News Feeds
- **Featured**: Highlighted news item
- **Grid**: News grid display
- **List**: News list display

### Academic Feeds
- Academic program listings and details

## Element Model Pattern

Feeds follow the Element Model pattern:

```typescript
interface ElementModel {
  element: HTMLElement | DocumentFragment;
  styles: string;
  update?: (props: any) => void;
  destroy?: () => void;
}
```

### Example Usage

```typescript
import { createEventsFeed } from '@universityofmaryland/web-feeds-library/events';

const feed = createEventsFeed({
  apiUrl: 'https://api.example.com/events',
  layout: 'grid',
  limit: 6
});

// Inject into DOM
document.querySelector('#feed-container').appendChild(feed.element);

// Inject styles
const styleEl = document.createElement('style');
styleEl.textContent = feed.styles;
document.head.appendChild(styleEl);
```

## Data Fetching

Feeds use the utilities package for API calls:

```typescript
import { graphQLFetch } from '@universityofmaryland/web-utilities-library/network';

const data = await graphQLFetch({
  url: apiUrl,
  query: myQuery
});
```

## Testing

- **Framework**: Jest with JSDOM
- **Location**: `source/__tests__/`
- **Pattern**: Test feed creation, data fetching, and rendering
- **Mocks**: Mock API responses

## Best Practices

1. **Lazy Loading**: Use macros for lazy-loaded feed content
2. **Loading States**: Show loaders while fetching
3. **Error Handling**: Gracefully handle API failures
4. **Caching**: Consider caching strategies for performance
5. **Accessibility**: Ensure feeds are keyboard navigable

## Build Output

- `dist/index.{js,mjs,d.ts}` - Main export
- `dist/events.{js,mjs,d.ts}` - Events feeds
- `dist/news.{js,mjs,d.ts}` - News feeds
- `dist/academic.{js,mjs,d.ts}` - Academic feeds
- Preserved module structure

## Integration with Elements

Feeds build upon elements package:

```typescript
import { textLockup, assets } from '@universityofmaryland/web-elements-library/atomic';
import { createCard } from '@universityofmaryland/web-elements-library/composite';

// Use elements to build feed items
const feedItem = createCard({
  image: data.image,
  headline: data.title,
  text: data.description
});
```

## Notes

- Feeds require network access for data
- API URLs must be configured
- Feeds are dynamic and update with new data
- Use web components package for automatic updates
- Optimized for UMD content APIs

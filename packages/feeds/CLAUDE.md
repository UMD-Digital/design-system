# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package Overview

The **Feeds Package** (`@universityofmaryland/web-feeds-library`) provides dynamic content feed components for academic programs, news, events, experts, and in-the-news mentions. Feeds fetch and display data from UMD APIs using a composable factory pattern with reusable strategies.

**Version**: 1.3.9
**Dependencies**:
- `@universityofmaryland/web-elements-library` - UI components
- `@universityofmaryland/web-styles-library` - Design tokens and styles
- `@universityofmaryland/web-utilities-library` - Shared utilities
- `@universityofmaryland/web-builder-library` - Element builder
- `@universityofmaryland/web-token-library` - Design tokens

## Build System

### Vite Configuration

- **Builder**: Vite with TypeScript
- **Output Formats**: ES Modules only (`.js`) - No CommonJS support
- **Export Style**: Named exports only - No default exports
- **External Dependencies**: All `@universityofmaryland/*` packages
- **Type Declarations**: Generated with `vite-plugin-dts`
- **Module Preservation**: `preserveModules: true`

### Build Commands

```bash
npm run build      # Production build
npm run dev        # Watch mode
npm run clean      # Remove build directory
npm test           # Run all tests
npm test -- __tests__/feeds/events/grid.test.ts  # Run single test file
```

## Package Structure

### Source Organization

```
source/
├── feeds/                  # Feed implementations
│   ├── academic/
│   │   ├── _types.ts       # Academic type definitions
│   │   ├── index.ts        # Public API
│   │   └── slider.ts       # Academic program carousel (widget pattern)
│   ├── events/
│   │   ├── _types.ts       # Event type definitions
│   │   ├── index.ts        # Public API
│   │   ├── grid.ts         # ✅ Grid layout (factory pattern)
│   │   ├── list.ts         # ✅ List layout (factory pattern)
│   │   ├── grouped.ts      # ✅ Date-grouped layout (specialized)
│   │   ├── slider.ts       # ✅ Carousel (widget pattern)
│   │   └── image.ts        # Shared event image config helper
│   ├── experts/
│   │   ├── _types.ts       # Expert type definitions
│   │   ├── index.ts        # Public API
│   │   ├── bio.ts          # ✅ Expert biography (specialized)
│   │   ├── grid.ts         # ✅ Grid layout (factory pattern)
│   │   ├── in-the-news.ts  # ✅ Expert news coverage (specialized)
│   │   └── list.ts         # ✅ List layout (factory pattern)
│   ├── in-the-news/
│   │   ├── _types.ts       # In-the-news type definitions
│   │   ├── index.ts        # Public API
│   │   ├── grid.ts         # ✅ Grid layout (factory pattern)
│   │   └── list.ts         # ✅ List layout (factory pattern)
│   └── news/
│       ├── _types.ts       # News type definitions
│       ├── index.ts        # Public API
│       ├── featured.ts     # ✅ Featured layout (specialized)
│       ├── grid.ts         # ✅ Grid layout (factory pattern)
│       └── list.ts         # ✅ List layout (factory pattern)
├── factory/                # Factory pattern implementation
│   ├── core/
│   │   ├── types.ts        # TypeScript interfaces for factory
│   │   ├── index.ts        # Exports
│   │   └── createBaseFeed.ts  # Main factory function
│   └── helpers/
│       ├── feedHelpers.ts     # State management helpers
│       ├── displayHandler.ts  # Display logic handlers
│       ├── fetchHandler.ts    # Data fetching handlers
│       └── index.ts           # Exports
├── strategies/             # Reusable strategy patterns
│   ├── display/            # How entries are displayed
│   │   ├── events.ts       # Event display strategy
│   │   ├── experts.ts      # Expert display strategy
│   │   ├── inTheNews.ts    # In-the-news display strategy
│   │   ├── news.ts         # News display strategy
│   │   └── index.ts        # Exports
│   ├── fetch/              # How data is fetched
│   │   ├── graphql.ts      # Base GraphQL fetch strategy
│   │   ├── academic.ts     # Academic GraphQL queries/fetch
│   │   ├── events.ts       # Events GraphQL queries/fetch
│   │   ├── experts.ts      # Experts GraphQL queries/fetch
│   │   ├── inTheNews.ts    # In-the-news GraphQL queries/fetch
│   │   ├── news.ts         # News GraphQL queries/fetch
│   │   └── index.ts        # Exports
│   ├── layout/             # How feed is laid out
│   │   ├── grid.ts         # Grid layout strategies (5 variants)
│   │   ├── featured.ts     # Featured layout strategy factory
│   │   └── index.ts        # Exports
│   └── index.ts            # All strategy exports
├── states/                 # State management classes
│   ├── _types.ts           # State type definitions
│   ├── loading.ts          # Loading spinner state
│   ├── pagination.ts       # Pagination/lazy load state
│   ├── empty.ts            # Empty/no results state
│   ├── announcer.ts        # Accessibility announcer
│   └── index.ts            # Exports
├── helpers/                # Shared helper functions
│   ├── events/             # Event-specific helpers
│   ├── network/            # Network/fetch helpers
│   ├── grouping/           # Data grouping helpers
│   ├── styles/             # Style helpers (shadow DOM)
│   └── index.ts            # Exports
├── types/                  # Centralized type definitions
│   ├── core.ts             # Core types (ElementModel, strategies)
│   ├── api.ts              # API response types
│   ├── feeds.ts            # Feed configuration types
│   ├── data/               # Data model types per feed
│   │   ├── academic.ts
│   │   ├── events.ts
│   │   ├── experts.ts
│   │   ├── inTheNews.ts
│   │   ├── news.ts
│   │   └── index.ts
│   └── index.ts            # Exports
├── widgets/                # Interactive widgets
│   ├── slider.ts           # Carousel/slider widget
│   └── index.ts            # Exports
└── _types.ts               # Global type definitions

__tests__/                  # Test files (17 suites)
├── feeds/
│   ├── academic/
│   │   ├── index.test.ts
│   │   └── slider.test.ts
│   ├── events/
│   │   ├── grid.test.ts
│   │   ├── list.test.ts
│   │   ├── grouped.test.ts
│   │   ├── slider.test.ts
│   │   └── image.test.ts
│   └── news/
│       ├── grid.test.ts
│       ├── list.test.ts
│       └── featured.test.ts
├── factory/
│   └── createBaseFeed.test.ts
├── helpers/
│   ├── events/
│   ├── network/
│   └── styles/
└── strategies/
    ├── display/
    ├── fetch/
    └── layout/
```

**Note**: Experts and in-the-news feeds currently lack dedicated test files. The 17 test suites cover events, news, academic, factory, strategies, helpers, and states.

## Package Exports

```json
{
  "type": "module",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    },
    "./academic": {
      "types": "./dist/academic.d.ts",
      "import": "./dist/academic.js"
    },
    "./events": {
      "types": "./dist/events.d.ts",
      "import": "./dist/events.js"
    },
    "./experts": {
      "types": "./dist/experts.d.ts",
      "import": "./dist/experts.js"
    },
    "./in-the-news": {
      "types": "./dist/in-the-news.d.ts",
      "import": "./dist/in-the-news.js"
    },
    "./news": {
      "types": "./dist/news.d.ts",
      "import": "./dist/news.js"
    }
  }
}
```

**Note**: CommonJS (`require`) is not supported. Use ES module `import` only.

## Feed Types

### Events Feeds
- **Grid** (`grid.ts`) ✅: Event grid display — factory pattern
- **List** (`list.ts`) ✅: Event list display — factory pattern
- **Grouped** (`grouped.ts`) ✅: Events grouped by date — specialized
- **Slider** (`slider.ts`) ✅: Carousel display — widget pattern
- **Image** (`image.ts`): Shared helper for event image config (used by grid, list, grouped)

### News Feeds
- **Grid** (`grid.ts`) ✅: News grid display — factory pattern
- **List** (`list.ts`) ✅: News list display — factory pattern
- **Featured** (`featured.ts`) ✅: Highlighted news item — specialized

### Academic Feeds
- **Slider** (`slider.ts`) ✅: Academic program carousel — widget pattern

### Experts Feeds
- **Grid** (`grid.ts`) ✅: Expert profiles grid — factory pattern
- **List** (`list.ts`) ✅: Expert profiles list — factory pattern
- **Bio** (`bio.ts`) ✅: Single expert biography — specialized
- **In The News** (`in-the-news.ts`) ✅: Expert + news coverage — specialized

### In-The-News Feeds
- **Grid** (`grid.ts`) ✅: News mentions grid — factory pattern
- **List** (`list.ts`) ✅: News mentions list — factory pattern

## Architecture Overview

The feeds package uses a **factory pattern with composable strategies** to eliminate code duplication and provide a consistent API across all feed types.

### Core Concepts

1. **Factory** - Creates feed instances with standard initialization, state management, and lifecycle
2. **Strategies** - Reusable, swappable implementations for fetch, display, and layout
3. **Helpers** - Utility functions for state management and common operations
4. **States** - State management classes for loading, pagination, empty states
5. **Element Model** - Standard interface all feeds return

### Data Flow

```
User creates feed
    ↓
Factory initializes (createBaseFeed)
    ↓
Create helpers (state management)
    ↓
Create fetch handlers (data fetching)
    ↓
Create display handlers (rendering)
    ↓
Start fetching (fetchHandlers.start)
    ↓
Fetch count → Store in helpers
    ↓
Fetch entries → Pass to display
    ↓
Display maps entries using display strategy
    ↓
Append to layout using layout strategy
    ↓
Add pagination if needed
    ↓
Return { element, styles, events }
```

## Factory Pattern (Preferred for Standard Feeds)

The factory pattern is the **recommended approach** for standard grid and list feeds.

### Basic Usage

```typescript
import { createBaseFeed } from './factory';
import { eventsFetchStrategy, eventsDisplayStrategy, gridGapLayout } from './strategies';

export default (props) => createBaseFeed({
  ...props,

  // Strategies define behavior
  fetchStrategy: eventsFetchStrategy,      // How to fetch data
  displayStrategy: eventsDisplayStrategy,  // How to display entries
  layoutStrategy: gridGapLayout,           // How to layout the feed

  // Configure images
  imageConfig: (entry) => ({
    imageUrl: entry.image?.[0]?.url,
    altText: entry.image?.[0]?.altText,
    linkUrl: entry.url,
  }),
});
```

### Factory Props

```typescript
interface BaseFeedConfig<TData, TVariables> {
  // API Configuration
  token: string;                           // API authentication token
  categories?: string[];                   // Filter by categories

  // Display Configuration
  isThemeDark?: boolean;                   // Use dark theme
  isTransparent?: boolean;                 // Transparent cards
  isOverlay?: boolean;                     // Overlay style
  isAligned?: boolean;                     // Align card content
  cardType?: 'block' | 'list';            // Card style

  // Layout Configuration
  numberOfColumnsToShow?: number;          // Grid columns (1-4)
  numberOfRowsToStart: number;             // Initial rows to fetch

  // Lazy Loading
  isLazyLoad?: boolean;                    // Enable pagination

  // Strategies (required)
  fetchStrategy: FetchStrategy<TData, TVariables>;    // Data fetching
  displayStrategy: DisplayStrategy<TData>;             // Entry display
  layoutStrategy: LayoutStrategy;                      // Feed layout

  // Optional Configuration
  noResultsConfig?: NoResultsConfig;       // Empty state config
  imageConfig?: (entry: TData) => ImageConfig;  // Image configuration
  entriesToRemove?: string[];              // IDs to exclude
}
```

### What the Factory Handles

The factory eliminates ~70% of boilerplate by handling:

1. ✅ **Container creation** - Creates main container element
2. ✅ **Loading state** - Shows spinner during initial fetch
3. ✅ **State management** - Manages offset, total, styles via helpers
4. ✅ **Shadow DOM support** - Handles shadow root injection
5. ✅ **Data fetching** - Orchestrates API calls via fetch strategy
6. ✅ **Entry display** - Maps entries to cards via display strategy
7. ✅ **Layout creation** - Creates grid/list layout via layout strategy
8. ✅ **Pagination** - Adds "Load more" button if lazy loading enabled
9. ✅ **Error handling** - Shows empty state on errors
10. ✅ **Event system** - Dispatches feed lifecycle events

### Benefits

- **30-40% code reduction** - Less code to write and maintain
- **Consistency** - All feeds work the same way
- **Reusability** - Strategies shared across feeds
- **Type safety** - Full TypeScript generics support
- **Testability** - Easy to mock strategies
- **Extensibility** - Add new feeds by creating strategies

## Strategy System

Strategies are **swappable implementations** for fetch, display, and layout.

### Fetch Strategy

Defines **how to fetch data** from an API.

```typescript
interface FetchStrategy<TData, TVariables = any> {
  // Fetch total count of entries
  fetchCount: (variables: TVariables) => Promise<number | null>;

  // Fetch array of entries
  fetchEntries: (variables: TVariables) => Promise<TData[] | null>;

  // Compose API variables from base props
  composeApiVariables: (baseProps: any) => TVariables;
}
```

**Example - Events Fetch Strategy:**

```typescript
export const eventsFetchStrategy = createGraphQLFetchStrategy<EventType>({
  endpoint: 'https://calendar.umd.edu/graphql',

  queries: {
    entries: EVENTS_QUERY,
    count: EVENTS_COUNT_QUERY,
  },

  transformResponse: (data) => {
    if (!data?.data?.entries) return null;
    return data.data.entries.events || null;
  },

  transformCount: (data) => {
    if (!data?.data?.count) return 0;
    return data.data.count.events?.length || 0;
  },

  composeVariables: (baseVariables) => ({
    ...baseVariables,
    startDate: new Date().toDateString(),
  }),
});
```

**Available Fetch Strategies:**
- `eventsFetchStrategy` - Events with startsAfterOrAt filter
- `eventsFetchStrategyRange` - Events with rangeStart filter (for grouped)
- `newsFetchStrategy` - News articles
- `expertsFetchStrategy` - Expert profiles
- `inTheNewsFetchStrategy` - In-the-news mentions
- `academicFetchStrategy` - Academic programs

### Display Strategy

Defines **how entries are displayed** as cards.

```typescript
interface DisplayStrategy<TData> {
  layoutType: 'grid' | 'list' | 'featured';

  // Map entry data to card element
  mapEntryToCard: (
    entry: TData,
    options: CardMappingOptions
  ) => ElementModel;
}
```

**Example - Events Display Strategy:**

```typescript
export const eventsDisplayStrategy: DisplayStrategy<EventType> = {
  layoutType: 'grid',

  mapEntryToCard: (entry, options) => {
    const { isThemeDark, isTransparent, isAligned, imageConfig, cardType } = options;

    // Create card elements
    const headline = createTextWithLink({ text: entry.title, url: entry.url });
    const text = createTextContainer({ text: entry.summary, allowHTML: true });
    const eventMeta = eventElements.meta({ ...entry, isThemeDark } as any);
    const image = imageConfig ? createImageOrLinkedImage(imageConfig(entry)) : undefined;

    // Create date sign for list cards
    const dateSign = cardType === 'list'
      ? eventElements.sign({
          startMonth: entry.startMonth,
          startDay: entry.startDay,
          endMonth: entry.endMonth,
          endDay: entry.endDay,
          isThemeDark,
          isLargeSize: true,
        })
      : undefined;

    // Return appropriate card type
    if (cardType === 'list') {
      return card.list({ headline, text, eventMeta, dateSign, image, isAligned, isThemeDark });
    }

    return card.block({ headline, text, eventMeta, image, isAligned, isTransparent, isThemeDark });
  },
};
```

**Available Display Strategies:**
- `eventsDisplayStrategy` - Event cards with metadata
- `newsDisplayStrategy` - News article cards
- `expertsDisplayStrategy` - Expert profile cards
- `inTheNewsDisplayStrategy` - In-the-news mention cards

**Card Mapping Options:**

```typescript
interface CardMappingOptions {
  isThemeDark?: boolean;        // Dark theme
  isTransparent?: boolean;      // Transparent background
  isOverlay?: boolean;          // Overlay style
  isAligned?: boolean;          // Align content
  cardType?: 'block' | 'list';  // Card style
  imageConfig?: (entry: any) => ImageConfig;  // Image config
}
```

### Layout Strategy

Defines **how the feed container is laid out**.

```typescript
interface LayoutStrategy {
  // Create layout element
  create: (options: { columns?: number; isThemeDark?: boolean }) => ElementModel;

  // Get unique ID for layout container
  getId: () => string;
}
```

**Example - Grid Layout:**

```typescript
export const gridGapLayout: LayoutStrategy = {
  create: ({ columns = 3 }) => {
    return gridGap({ columns: columns as 2 | 3 | 4 });
  },

  getId: () => 'umd-grid-gap-layout-container',
};
```

**Available Layout Strategies:**
- `gridLayout` - Standard responsive grid
- `gridGapLayout` - Responsive grid with visual gaps
- `gridBorderLayout` - Grid with borders between items (supports dark theme)
- `stackedLayout` - Vertical stack with optional dividers
- `gridOffsetLayout` - Grid with sticky offset positioning for first item
- `createFeaturedLayoutStrategy()` - Factory for dynamic featured layouts (offset/grid based on entry count)

## Helper System

Helpers manage **feed state** and provide access functions.

```typescript
interface FeedHelpers {
  // Setters
  setTotalEntries: (count: number) => void;
  setOffset: (count: number) => void;
  setStyles: (styles: string) => void;
  setShadowRoot: (shadowRoot: ShadowRoot) => void;

  // Getters
  getContainer: () => HTMLElement;
  getOffset: () => number;
  getTotalEntries: () => number;
  getStyles: () => string;
  getShadowRoot: () => ShadowRoot | null;
}
```

**Usage:**

```typescript
const helpers = createFeedHelpers({
  container: document.createElement('div'),
  initialStyles: '',
});

// Set total from API
helpers.setTotalEntries(50);

// Increment offset after loading more
helpers.setOffset(10);

// Accumulate styles
helpers.setStyles(card.styles);

// Access state
const total = helpers.getTotalEntries();  // 50
const offset = helpers.getOffset();       // 10
```

## State Management Classes

State classes manage UI states like loading, pagination, and empty results.

### LoadingState

```typescript
import { LoadingState } from 'states';

const loading = new LoadingState({ isThemeDark: false });

// Show loading
container.appendChild(loading.element);

// Hide loading
loading.hide();

// Access styles
const styles = loading.styles;
```

### PaginationState

```typescript
import { PaginationState } from 'states';

const pagination = new PaginationState({
  totalEntries: 50,
  offset: 10,
  isLazyLoad: true,
  callback: async () => {
    // Load more logic
  },
});

// Render pagination button
const element = pagination.render(container);

// Check if more items available
if (pagination.hasMore()) {
  // ...
}

// Update state
pagination.updateState(20, 50);

// Cleanup
pagination.destroy();
```

### EmptyState

```typescript
import { EmptyState } from 'states';

const emptyState = new EmptyState({
  message: 'No events found',
  linkUrl: 'https://calendar.umd.edu',
  linkText: 'View all events',
  isThemeDark: false,
});

emptyState.render(container);
```

### Announcer

```typescript
import { Announcer } from 'states';

const announcer = new Announcer({
  message: 'Showing 10 of 50 events',
});

container.appendChild(announcer.getElement());
```

## Specialized Implementations

For feeds with **complex requirements** that don't fit the factory pattern.

### When to Use Specialized

Use specialized implementations when you need:

- ✅ Complex data transformations (grouping, filtering, sorting)
- ✅ Dynamic content injection (headers, separators)
- ✅ Custom rendering logic
- ✅ Multiple layout variations
- ✅ Custom state management

### Pattern

```typescript
export default (props: CustomProps): ElementModel => {
  const { isThemeDark, token } = props;

  // Use strategies where possible
  const fetchStrategy = eventsFetchStrategyRange;

  // Custom state management
  const container = document.createElement('div');
  let styles = '';

  // Custom rendering logic
  const renderCustom = async (events: EventType[]) => {
    // Complex transformations
    const grouped = grouping.groupEventsByDate(events);

    // Dynamic content
    grouped.forEach((group) => {
      // Add custom headers
      const header = createHeader(group.date);
      container.appendChild(header);

      // Render group entries
      group.events.forEach((entry) => {
        const card = createCard(entry);
        container.appendChild(card.element);
        styles += card.styles;
      });
    });
  };

  // Initialize
  const initialize = async () => {
    const variables = fetchStrategy.composeApiVariables({ ...props });
    const entries = await fetchStrategy.fetchEntries(variables);
    await renderCustom(entries);
  };

  initialize();

  return { element: container, get styles() { return styles; }, events: {} };
};
```

### Examples

**Events Grouped** - Groups events by date with dynamic date headers
**News Featured** - Sticky positioning with featured/supporting articles

## Creating a New Feed

### Option 1: Factory Pattern (Recommended)

**For standard grid/list feeds:**

```typescript
// 1. Create display strategy (if needed)
export const myDisplayStrategy: DisplayStrategy<MyType> = {
  layoutType: 'grid',
  mapEntryToCard: (entry, options) => {
    // Map entry to card
    return card.block({ ... });
  },
};

// 2. Create fetch strategy (if needed)
export const myFetchStrategy = createGraphQLFetchStrategy<MyType>({
  endpoint: 'https://api.example.com/graphql',
  queries: { entries: MY_QUERY, count: MY_COUNT_QUERY },
  transformResponse: (data) => data.data.entries,
  transformCount: (data) => data.data.count,
  composeVariables: (base) => ({ ...base }),
});

// 3. Create feed using factory
export default (props) => createBaseFeed({
  ...props,
  fetchStrategy: myFetchStrategy,
  displayStrategy: myDisplayStrategy,
  layoutStrategy: gridGapLayout,
  imageConfig: (entry) => ({ ... }),
});
```

### Option 2: Specialized Implementation

**For complex feeds:**

```typescript
export default (props): ElementModel => {
  // 1. Use strategies where possible
  const fetchStrategy = myFetchStrategy;

  // 2. Custom state management
  const container = document.createElement('div');
  let styles = '';

  // 3. Custom rendering
  const render = async (data) => {
    // Complex logic here
  };

  // 4. Initialize
  const init = async () => {
    const data = await fetchStrategy.fetchEntries(...);
    await render(data);
  };

  init();
  return { element: container, get styles() { return styles; } };
};
```

## Extending Strategies

### Create Custom Display Strategy

```typescript
export const customDisplayStrategy: DisplayStrategy<CustomType> = {
  layoutType: 'grid',

  mapEntryToCard: (entry, options) => {
    const { isThemeDark, imageConfig } = options;

    // Create custom card elements
    const headline = createTextWithLink({ ... });
    const customElement = createCustomElement({ ... });

    return card.block({
      headline,
      customElement,
      isThemeDark,
    });
  },
};
```

### Create Custom Fetch Strategy

```typescript
export const customFetchStrategy = createGraphQLFetchStrategy<CustomType>({
  endpoint: 'https://custom-api.com/graphql',

  queries: {
    entries: `query { ... }`,
    count: `query { ... }`,
  },

  transformResponse: (data) => {
    // Custom response transformation
    return data.data.items.map(item => ({
      // Transform to CustomType
    }));
  },

  transformCount: (data) => {
    return data.data.total;
  },

  composeVariables: (baseProps) => ({
    // Custom variable composition
    apiKey: baseProps.token,
    filters: baseProps.categories,
  }),
});
```

### Create Custom Layout Strategy

```typescript
export const customLayout: LayoutStrategy = {
  create: ({ columns, isThemeDark }) => {
    // Create custom layout element
    const layout = new ElementBuilder()
      .withClassName('custom-layout')
      .withStyles({
        element: {
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
        },
      })
      .build();

    return layout;
  },

  getId: () => 'custom-layout-container',
};
```

## Element Model Pattern

All feeds and components return an `ElementModel`:

```typescript
interface ElementModel {
  element: HTMLElement | DocumentFragment;  // DOM element
  styles: string;                           // CSS styles as string
  update?: (props: any) => void;           // Optional update function
  destroy?: () => void;                    // Optional cleanup function
  events?: {                               // Optional event handlers
    callback?: (shadowRoot: ShadowRoot) => void;
    [key: string]: any;
  };
}
```

### Usage

```typescript
const feed = eventsGrid({
  token: 'my-token',
  numberOfColumnsToShow: 3,
});

// Inject into DOM
document.body.appendChild(feed.element);

// Inject styles
const styleEl = document.createElement('style');
styleEl.textContent = feed.styles;
document.head.appendChild(styleEl);

// Shadow DOM support
if (feed.events?.callback) {
  const shadowRoot = element.attachShadow({ mode: 'open' });
  feed.events.callback(shadowRoot);
  shadowRoot.appendChild(feed.element);
}
```

## Testing

### Test Structure

```
__tests__/
├── feeds/              # Feed implementation tests
│   ├── academic/
│   │   ├── index.test.ts
│   │   └── slider.test.ts
│   ├── events/
│   │   ├── grid.test.ts
│   │   ├── list.test.ts
│   │   ├── grouped.test.ts
│   │   └── slider.test.ts
│   └── news/
│       ├── grid.test.ts
│       ├── list.test.ts
│       └── featured.test.ts
├── factory/            # Factory pattern tests
├── strategies/         # Strategy tests
├── states/            # State class tests
└── helpers/           # Helper function tests
```

### Test Pattern

```typescript
describe('Events Grid (Factory Pattern)', () => {
  it('should create feed with factory pattern', () => {
    const feed = eventsGrid({
      token: 'test-token',
      numberOfColumnsToShow: 3,
      numberOfRowsToStart: 2,
    });

    expect(feed.element).toBeDefined();
    expect(feed.styles).toBeDefined();
  });

  it('should handle theme prop', () => {
    const feed = eventsGrid({
      token: 'test-token',
      isThemeDark: true,
    });

    expect(feed.element).toBeDefined();
  });
});
```

### Mocking

Mock files are located in `__mocks__/` at repository root:

- `webElementsLibrary.js` - Mock for elements library
- `webStylesLibrary.js` - Mock for styles library
- `webUtilitiesLibrary.js` - Mock for utilities library

## Best Practices

### 1. Use Factory Pattern for Standard Feeds

```typescript
// ✅ GOOD - Use factory for standard grid/list
export default (props) => createBaseFeed({
  ...props,
  fetchStrategy: eventsFetchStrategy,
  displayStrategy: eventsDisplayStrategy,
  layoutStrategy: gridGapLayout,
});

// ❌ BAD - Don't duplicate factory logic
export default (props) => {
  const container = document.createElement('div');
  // ... 100 lines of boilerplate ...
};
```

### 2. Reuse Strategies

```typescript
// ✅ GOOD - Reuse existing strategies
export default (props) => createBaseFeed({
  ...props,
  fetchStrategy: eventsFetchStrategy,  // Reuse!
  displayStrategy: eventsDisplayStrategy,  // Reuse!
  layoutStrategy: gridGapLayout,  // Reuse!
});

// ❌ BAD - Don't create new strategies for same data
export const myCustomEventsFetchStrategy = ...  // Duplicate!
```

### 3. Theme Consistency

```typescript
// ✅ GOOD - Pass theme to all components
const card = card.list({
  headline,
  text,
  eventMeta: eventElements.meta({ ...entry, isThemeDark }),
  dateSign: eventElements.sign({ ...entry, isThemeDark }),
  isThemeDark,  // Card itself
});

// ❌ BAD - Missing theme props
const card = card.list({
  headline,
  text,
  // Missing isThemeDark - will use wrong colors!
});
```

### 4. Shadow DOM Support

```typescript
// ✅ GOOD - Dynamic styles getter
return {
  element: container,
  get styles() {
    return styles;  // Always returns current value
  },
  events: { callback: shadowRootCallback },
};

// ❌ BAD - Static styles snapshot
return {
  element: container,
  styles,  // Captured at creation time - missing async styles!
};
```

### 5. Error Handling

```typescript
// ✅ GOOD - Graceful error handling
const entries = await fetchStrategy.fetchEntries(variables);
if (!entries || entries.length === 0) {
  displayHandlers.displayNoResults({ message: 'No results found' });
  return;
}

// ❌ BAD - No error handling
const entries = await fetchStrategy.fetchEntries(variables);
// What if this fails or returns null?
```

## Migration Status

### Completed ✅

1. **Events Grid** - Factory pattern
2. **Events List** - Factory pattern
3. **Events Grouped** - Specialized
4. **Events Slider** - Widget pattern
5. **News Grid** - Factory pattern
6. **News List** - Factory pattern
7. **News Featured** - Specialized
8. **Academic Slider** - Widget pattern
9. **Experts Grid** - Factory pattern
10. **Experts List** - Factory pattern
11. **Experts Bio** - Specialized
12. **Experts In The News** - Specialized
13. **In-The-News Grid** - Factory pattern
14. **In-The-News List** - Factory pattern

## Common Issues

### Issue 1: Lazy Load Button Not Appearing

**Cause**: Callback reference not passed correctly

**Solution**: Factory uses mutable reference pattern - ensure using latest version

### Issue 2: Theme Colors Not Applying

**Cause**: Missing `isThemeDark` prop

**Solution**: Pass `isThemeDark` to ALL components (cards, signs, metadata)

### Issue 3: Event Metadata Missing

**Cause**: GraphQL query missing date/time fields

**Solution**: Use `eventsFetchStrategy` which includes all required fields

### Issue 4: Styles Not Injecting to Shadow DOM

**Cause**: Shadow root not set in helpers

**Solution**: Factory handles this automatically via `setShadowRoot()`

## Performance Considerations

1. **Code Splitting** - Use selective imports for smaller bundles
2. **Lazy Loading** - Enable `isLazyLoad` for large datasets
3. **Caching** - Consider implementing client-side caching for API responses
4. **Shadow DOM** - Use shadow DOM for style encapsulation in web components
5. **CSS Optimization** - Styles are automatically deduplicated before injection

## Integration Examples

### Standalone Usage

```typescript
import { eventsGrid } from '@universityofmaryland/web-feeds-library/events';

const feed = eventsGrid({
  token: 'my-token',
  numberOfColumnsToShow: 3,
  numberOfRowsToStart: 2,
  isLazyLoad: true,
  isThemeDark: false,
});

document.querySelector('#feed').appendChild(feed.element);
document.head.appendChild(
  Object.assign(document.createElement('style'), { textContent: feed.styles })
);
```

### Web Component

```typescript
import { eventsGrid } from '@universityofmaryland/web-feeds-library/events';

class EventsFeedElement extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });

    const feed = eventsGrid({
      token: this.getAttribute('token') || '',
      numberOfColumnsToShow: 3,
      isThemeDark: this.hasAttribute('dark'),
    });

    feed.events?.callback(shadowRoot);
    shadowRoot.appendChild(feed.element);
  }
}

customElements.define('umd-events-feed', EventsFeedElement);
```

## Notes

- All feeds require an API token for authentication
- Feeds automatically handle loading states and errors
- Use factory pattern for standard grid/list feeds
- Strategies are reusable across different feed types
- Shadow DOM support is built-in
- All implementations are fully typed with TypeScript
- 16 test suites / 171 tests cover events, news, academic, factory, strategies, helpers, and states
- Experts and in-the-news feeds do not yet have dedicated test files

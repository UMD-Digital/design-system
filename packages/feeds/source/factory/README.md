# Feed Factory

A factory pattern implementation for creating reusable, composable feeds. Eliminates ~70% of boilerplate code while maintaining flexibility for complex layouts.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
- [Examples](#examples)
- [Testing](#testing)
- [Migration Guide](#migration-guide)

---

## Overview

The feed factory pattern separates concerns into three main strategies:

1. **Fetch Strategy** - How to get data from APIs
2. **Display Strategy** - How to map data to UI elements
3. **Layout Strategy** - How to arrange elements

This separation allows for:
- Reusable strategies across feed types
- Easy testing of individual concerns
- Minimal code for new feed types
- Type-safe composition

---

## Architecture

```
┌─────────────────────────────────────────┐
│         createBaseFeed()                │
│                                         │
│  ┌───────────┐  ┌────────────┐  ┌─────┐│
│  │   Fetch   │  │  Display   │  │Layout││
│  │ Strategy  │  │  Strategy  │  │Strat││
│  └───────────┘  └────────────┘  └─────┘│
│                                         │
│  ┌──────────────────────────────────┐  │
│  │       Helper Utilities           │  │
│  │  • Feed Helpers (state)          │  │
│  │  • Display Handler (rendering)   │  │
│  │  • Fetch Handler (API calls)     │  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### Key Components

**Factory Core:**
- `createBaseFeed()` - Main factory function
- `types.ts` - TypeScript interfaces

**Helper Utilities:**
- `feedHelpers.ts` - State management (offset, total, styles)
- `displayHandler.ts` - Rendering logic (initial, lazy-load, no-results)
- `fetchHandler.ts` - API interaction (start, loadMore)

---

## Quick Start

### Creating a Simple Grid Feed

```typescript
import { createBaseFeed } from './factory';
import { eventsFetchStrategy } from './strategies/fetch/events';
import { eventsDisplayStrategy } from './strategies/display/events';
import { gridGapLayout } from './strategies/layout';

const eventsFeed = createBaseFeed({
  // Authentication
  token: 'your-api-token',

  // Display options
  isThemeDark: false,
  numberOfColumnsToShow: 3,
  numberOfRowsToStart: 2,

  // Features
  isLazyLoad: true,

  // Strategies
  fetchStrategy: eventsFetchStrategy,
  displayStrategy: eventsDisplayStrategy,
  layoutStrategy: gridGapLayout,

  // Image configuration
  imageConfig: (entry) => ({
    imageUrl: entry.image[0].url,
    altText: entry.image[0].altText || 'Event Image',
    linkUrl: entry.url,
    linkLabel: 'University of Maryland Event',
  }),
});

// Use the feed
document.body.appendChild(eventsFeed.element);
```

### Creating a New Feed Type

```typescript
// 1. Create display strategy (10-15 lines)
const buildingStatusDisplayStrategy: DisplayStrategy<BuildingStatus> = {
  layoutType: 'grid',
  mapEntryToCard: (entry, { isThemeDark, imageConfig }) =>
    card.block({
      headline: createTextWithLink({
        text: entry.buildingName,
        url: entry.url
      }),
      text: createTextContainer({
        text: `Status: ${entry.status}`
      }),
      image: imageConfig?.(entry),
      isThemeDark,
    }),
};

// 2. Create fetch strategy (10-15 lines)
const buildingStatusFetchStrategy = createGraphQLFetchStrategy({
  endpoint: 'https://facilities.umd.edu/graphql',
  queries: { entries: BUILDING_STATUS_QUERY },
  transformResponse: (data) => data?.data?.buildings || [],
  transformCount: (data) => data?.data?.buildingCount || 0,
});

// 3. Compose feed (20-25 lines total!)
export default (props) => createBaseFeed({
  ...props,
  fetchStrategy: buildingStatusFetchStrategy,
  displayStrategy: buildingStatusDisplayStrategy,
  layoutStrategy: gridGapLayout,
});
```

**That's it!** ~50 lines of code vs ~300+ lines with the old approach.

---

## API Reference

### `createBaseFeed<TData, TVariables>(config)`

Main factory function for creating feeds.

**Type Parameters:**
- `TData` - The type of entry data from the API
- `TVariables` - The type of API variables (optional, defaults to `any`)

**Parameters:**

```typescript
interface BaseFeedConfig<TData, TVariables> {
  // Authentication
  token: string | null;

  // Display Options
  isThemeDark?: boolean;
  isTransparent?: boolean;
  numberOfColumnsToShow?: number;
  numberOfRowsToStart: number;

  // Features
  isLazyLoad?: boolean;

  // Filtering
  categories?: string[];
  entriesToRemove?: Array<string | number>;

  // Strategies (required)
  fetchStrategy: FetchStrategy<TData, TVariables>;
  displayStrategy: DisplayStrategy<TData>;
  layoutStrategy: LayoutStrategy;

  // Optional Overrides
  noResultsConfig?: NoResultsConfig;
  imageConfig?: (entry: TData) => ImageConfig;
}
```

**Returns:**

```typescript
interface FeedFactoryResult {
  element: HTMLElement;
  styles: string;
  events?: {
    callback?: (shadowRoot: ShadowRoot) => void;
  };
}
```

---

### Strategy Interfaces

#### `FetchStrategy<TData, TVariables>`

```typescript
interface FetchStrategy<TData, TVariables> {
  /** Fetch total count for pagination */
  fetchCount: (variables: TVariables) => Promise<number | null>;

  /** Fetch entries */
  fetchEntries: (variables: TVariables) => Promise<TData[] | null>;

  /** Compose API variables from props */
  composeApiVariables: (props: any) => TVariables;
}
```

#### `DisplayStrategy<TData>`

```typescript
interface DisplayStrategy<TData> {
  /** Map entry to card element */
  mapEntryToCard: (entry: TData, options: CardMappingOptions) => ElementModel;

  /** Default layout type */
  layoutType: 'grid' | 'list' | 'stacked' | 'custom';
}
```

#### `LayoutStrategy`

```typescript
interface LayoutStrategy {
  /** Create layout container */
  create: (options: LayoutOptions) => ElementModel;

  /** Get container ID */
  getId: () => string;
}
```

---

## Examples

### Grid Feed with Categories

```typescript
const eventsFeed = createBaseFeed({
  token: 'my-token',
  numberOfRowsToStart: 2,
  numberOfColumnsToShow: 3,
  isLazyLoad: true,
  categories: ['sports', 'arts'],
  fetchStrategy: eventsFetchStrategy,
  displayStrategy: eventsDisplayStrategy,
  layoutStrategy: gridGapLayout,
  imageConfig: (entry) => ({
    imageUrl: entry.image[0].url,
    altText: entry.image[0].altText,
    linkUrl: entry.url,
  }),
});
```

### List Feed with Dark Theme

```typescript
const newsFeed = createBaseFeed({
  token: 'my-token',
  numberOfRowsToStart: 5,
  isThemeDark: true,
  isLazyLoad: true,
  fetchStrategy: newsFetchStrategy,
  displayStrategy: newsDisplayStrategy,
  layoutStrategy: stackedLayout,
  imageConfig: (entry) => ({
    imageUrl: entry.image[0].url,
    altText: entry.image[0].altText,
  }),
});
```

### Custom No Results Configuration

```typescript
const expertsFeed = createBaseFeed({
  token: 'my-token',
  numberOfRowsToStart: 3,
  numberOfColumnsToShow: 3,
  fetchStrategy: expertsFetchStrategy,
  displayStrategy: expertsDisplayStrategy,
  layoutStrategy: gridGapLayout,
  noResultsConfig: {
    message: 'No experts found matching your criteria',
    linkUrl: 'https://experts.umd.edu',
    linkText: 'Browse all experts',
  },
});
```

### Override Display Strategy

```typescript
const customDisplayStrategy: DisplayStrategy<EventType> = {
  ...eventsDisplayStrategy,
  mapEntryToCard: (entry, options) => {
    // Custom mapping logic
    if (options.isFeatured) {
      return card.overlay.image({ /* ... */ });
    }
    return eventsDisplayStrategy.mapEntryToCard(entry, options);
  },
};

const feed = createBaseFeed({
  token: 'my-token',
  numberOfRowsToStart: 2,
  fetchStrategy: eventsFetchStrategy,
  displayStrategy: customDisplayStrategy,
  layoutStrategy: gridGapLayout,
});
```

---

## Testing

The factory is designed for easy testing with dependency injection.

### Testing a Feed

```typescript
import { createBaseFeed } from './factory';

describe('Events Feed', () => {
  const mockFetchStrategy = {
    fetchCount: jest.fn().mockResolvedValue(10),
    fetchEntries: jest.fn().mockResolvedValue([/* mock data */]),
    composeApiVariables: jest.fn().mockReturnValue({}),
  };

  const mockDisplayStrategy = {
    layoutType: 'grid',
    mapEntryToCard: jest.fn().mockReturnValue({
      element: document.createElement('div'),
      styles: '',
    }),
  };

  const mockLayoutStrategy = {
    create: jest.fn().mockReturnValue({
      element: document.createElement('div'),
      styles: '',
    }),
    getId: () => 'test-layout',
  };

  it('should create feed with correct structure', () => {
    const feed = createBaseFeed({
      token: 'test-token',
      numberOfRowsToStart: 2,
      fetchStrategy: mockFetchStrategy,
      displayStrategy: mockDisplayStrategy,
      layoutStrategy: mockLayoutStrategy,
    });

    expect(feed.element).toBeInstanceOf(HTMLElement);
    expect(feed.styles).toBeTruthy();
  });

  it('should call fetch strategy on initialization', async () => {
    createBaseFeed({
      token: 'test-token',
      numberOfRowsToStart: 2,
      fetchStrategy: mockFetchStrategy,
      displayStrategy: mockDisplayStrategy,
      layoutStrategy: mockLayoutStrategy,
    });

    // Wait for async initialization
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(mockFetchStrategy.fetchCount).toHaveBeenCalled();
    expect(mockFetchStrategy.fetchEntries).toHaveBeenCalled();
  });
});
```

---

## Migration Guide

### Before (Old Approach)

```typescript
// ~97 lines of code
export default (props: BlockProps): ElementModel =>
  (() => {
    const { isThemeDark, numberOfColumnsToShow } = props;
    const loading = new LoadingState({ isThemeDark });
    const container = document.createElement('div');
    const setTotalEntries = (count: number) => (totalEntries = count);
    const setOffset = (count: number) => (offset = offset + count);
    // ... 80 more lines of boilerplate
  })();
```

### After (Factory Approach)

```typescript
// ~25 lines of code
export default (props: BlockProps): ElementModel =>
  createBaseFeed({
    ...props,
    fetchStrategy: eventsFetchStrategy,
    displayStrategy: eventsDisplayStrategy,
    layoutStrategy: gridGapLayout,
    imageConfig: (entry) => ({
      imageUrl: entry.image[0].url,
      altText: entry.image[0].altText || 'Event Image',
      linkUrl: entry.url,
      linkLabel: 'University of Maryland Event',
    }),
  });
```

**Benefits:**
- 74% code reduction
- Reusable strategies
- Easier to test
- Type-safe
- Consistent patterns

---

## Best Practices

1. **Reuse strategies** - Create strategies once, use across feed types
2. **Keep strategies pure** - No side effects in strategy functions
3. **Test strategies in isolation** - Easier to verify behavior
4. **Use TypeScript** - Leverage type safety
5. **Document custom strategies** - Help future developers

---

## Advanced Usage

### Custom Fetch Handler

For special cases where you need custom fetch logic:

```typescript
import { createFetchHandlers } from './factory/helpers';

const customFetchHandlers = createFetchHandlers({
  fetchStrategy: myCustomStrategy,
  helpers: feedHelpers,
  baseProps: { /* ... */ },
  displayHandlers: displayHandlers,
  layoutElement: layout,
});
```

### Custom Display Handler

For special display logic:

```typescript
import { createDisplayHandlers } from './factory/helpers';

const customDisplayHandlers = createDisplayHandlers({
  displayStrategy: myCustomStrategy,
  layoutStrategy: layoutStrategy,
  helpers: feedHelpers,
  cardMappingOptions: { /* ... */ },
  /* ... */
});
```

---

## Related Documentation

- [Strategy Patterns](../strategies/README.md)
- [Adding New Feed Types](../../docs/ADDING_NEW_FEEDS.md)
- [Architecture Overview](../../docs/ARCHITECTURE.md)

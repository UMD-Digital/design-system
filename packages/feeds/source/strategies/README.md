# Feed Strategies

Strategy patterns for composable, reusable feeds. Separate concerns into fetch, display, and layout strategies for maximum flexibility and reusability.

## Table of Contents

- [Overview](#overview)
- [Display Strategies](#display-strategies)
- [Fetch Strategies](#fetch-strategies)
- [Layout Strategies](#layout-strategies)
- [Creating Custom Strategies](#creating-custom-strategies)
- [Examples](#examples)
- [Testing](#testing)

---

## Overview

Strategies separate the concerns of feed creation:

- **Display Strategy** - How to map data to UI elements
- **Fetch Strategy** - How to get data from APIs
- **Layout Strategy** - How to arrange elements

This separation enables:
- ✅ Reusable components across feed types
- ✅ Easy testing of individual concerns
- ✅ Type-safe composition
- ✅ Minimal code for new feed types

---

## Display Strategies

Display strategies map feed entries to card elements.

### Events Display Strategy

Maps event data to cards with event metadata.

```typescript
import { eventsDisplayStrategy } from './strategies';

const feed = createBaseFeed({
  displayStrategy: eventsDisplayStrategy,
  imageConfig: (entry) => {
    const imageUrl = entry.image?.[0]?.url;
    const altText = entry.image?.[0]?.altText;

    if (!imageUrl || !altText) return null;

    return {
      imageUrl: imageUrl,
      altText: altText,
      linkUrl: entry.url,
      linkLabel: 'University of Maryland Event',
    };
  },
  // ...
});
```

**Features:**
- Event metadata (date, location, time)
- Block and list card layouts
- Date sign for list layout
- Theme support

### News Display Strategy

Maps news article data to cards with date information.

```typescript
import { newsDisplayStrategy } from './strategies';

const feed = createBaseFeed({
  displayStrategy: newsDisplayStrategy,
  imageConfig: (entry) => {
    const imageUrl = entry.image?.[0]?.url;
    const altText = entry.image?.[0]?.altText;

    if (!imageUrl || !altText) return null;

    return {
      imageUrl: imageUrl,
      altText: altText,
      linkUrl: entry.url,
    };
  },
  // ...
});
```

**Features:**
- Date metadata
- Block, overlay, and list card layouts
- Overlay image support
- Theme support

### Experts Display Strategy

Maps expert profile data to cards.

```typescript
import { expertsDisplayStrategy } from './strategies';

const feed = createBaseFeed({
  displayStrategy: expertsDisplayStrategy,
  imageConfig: (entry) => {
    const imageUrl = entry.image?.[0]?.url;
    const altText = entry.name;

    if (!imageUrl || !altText) return null;

    return {
      imageUrl: imageUrl,
      altText: altText,
      linkUrl: entry.url,
    };
  },
  // ...
});
```

**Features:**
- Name, title, department
- Expertise information
- Block card layout
- Theme support

### Card Mapping Options

All display strategies accept these options:

```typescript
interface CardMappingOptions {
  isThemeDark?: boolean;      // Use dark theme
  isTransparent?: boolean;     // Transparent background
  isAligned?: boolean;         // Align items
  isOverlay?: boolean;         // Overlay style (news only)
  isFeatured?: boolean;        // Featured style
  cardType?: 'block' | 'list'; // Card type
  imageConfig?: (entry) => ImageConfig | null; // Image configuration
}
```

---

## Fetch Strategies

Fetch strategies handle data fetching from APIs.

### GraphQL Fetch Strategy Factory

Generic factory for creating GraphQL-based fetch strategies.

```typescript
import { createGraphQLFetchStrategy } from './strategies';

const myFetchStrategy = createGraphQLFetchStrategy({
  endpoint: 'https://api.example.com/graphql',

  queries: {
    entries: MY_QUERY,
    count: MY_COUNT_QUERY,  // Optional
  },

  transformResponse: (data) => data?.data?.entries || null,
  transformCount: (data) => data?.data?.count || 0,

  // Optional: Customize variable composition
  composeVariables: (baseVariables) => ({
    ...baseVariables,
    customField: 'value',
  }),
});
```

### Events Fetch Strategy

Fetches event data from UMD Calendar API.

```typescript
import { eventsFetchStrategy } from './strategies';

const feed = createBaseFeed({
  token: 'my-token',
  categories: ['sports', 'arts'],
  fetchStrategy: eventsFetchStrategy,
  // ...
});
```

**Features:**
- Date filtering (starts after/at)
- Category filtering
- Pagination support
- Occurrence loading

**Variant: `eventsFetchStrategyRange`**
- Uses range start filter
- For grouped event displays

### News Fetch Strategy

Fetches news article data from Maryland Today API.

```typescript
import { newsFetchStrategy } from './strategies';

const feed = createBaseFeed({
  token: 'my-token',
  categories: ['research', 'campus-news'],
  isUnion: true, // Union (OR) vs intersection (AND)
  fetchStrategy: newsFetchStrategy,
  // ...
});
```

**Features:**
- Category filtering (union/intersection)
- Entry exclusion
- Pagination support
- Combined count + entries query

---

## Layout Strategies

Layout strategies create the feed container layout.

### Grid Layout

Standard responsive grid.

```typescript
import { gridLayout } from './strategies';

const feed = createBaseFeed({
  layoutStrategy: gridLayout,
  numberOfColumnsToShow: 3,
  // ...
});
```

### Grid Gap Layout

Responsive grid with pronounced gaps.

```typescript
import { gridGapLayout } from './strategies';

const feed = createBaseFeed({
  layoutStrategy: gridGapLayout,
  numberOfColumnsToShow: 3,
  // ...
});
```

### Stacked Layout

Vertical stack with dividers.

```typescript
import { stackedLayout } from './strategies';

const feed = createBaseFeed({
  layoutStrategy: stackedLayout,
  isThemeDark: true,
  // ...
});
```

### Grid Offset Layout

Grid with sticky offset for first item.

```typescript
import { gridOffsetLayout } from './strategies';

const feed = createBaseFeed({
  layoutStrategy: gridOffsetLayout,
  numberOfColumnsToShow: 2,
  // ...
});
```

### Featured Layout

Dynamic layout for featured displays.

```typescript
import { createFeaturedLayoutStrategy } from './strategies';

const feed = createBaseFeed({
  layoutStrategy: createFeaturedLayoutStrategy({
    isLayoutReversed: true,
    stickyTopPosition: 100,
  }),
  // ...
});
```

---

## Creating Custom Strategies

### Custom Display Strategy

```typescript
import { DisplayStrategy, CardMappingOptions } from './factory';
import { card } from '@universityofmaryland/web-elements-library/composite';

interface MyDataType {
  id: number;
  title: string;
  description: string;
}

const myDisplayStrategy: DisplayStrategy<MyDataType> = {
  layoutType: 'grid',

  mapEntryToCard: (entry: MyDataType, options: CardMappingOptions) => {
    const { isThemeDark } = options;

    return card.block({
      headline: createTextWithLink({
        text: entry.title,
        url: `/item/${entry.id}`,
      }),
      text: createTextContainer({
        text: entry.description,
      }),
      isThemeDark,
    });
  },
};
```

### Custom Fetch Strategy

```typescript
import { createGraphQLFetchStrategy } from './strategies';

const myFetchStrategy = createGraphQLFetchStrategy<MyDataType>({
  endpoint: 'https://api.example.com/graphql',

  queries: {
    entries: `
      query GetItems($limit: Int, $offset: Int) {
        items(limit: $limit, offset: $offset) {
          id
          title
          description
        }
      }
    `,
  },

  transformResponse: (data) => data?.data?.items || null,
  transformCount: (data) => data?.data?.itemCount || 0,
});
```

### Custom Layout Strategy

```typescript
import { LayoutStrategy } from './factory';

const myLayoutStrategy: LayoutStrategy = {
  create: (options) => {
    const container = document.createElement('div');
    container.className = 'my-custom-layout';

    return {
      element: container,
      styles: '.my-custom-layout { display: flex; }',
    };
  },

  getId: () => 'my-custom-layout-container',
};
```

---

## Examples

### Simple Event Grid

```typescript
import { createBaseFeed } from './factory';
import {
  eventsFetchStrategy,
  eventsDisplayStrategy,
  gridGapLayout,
} from './strategies';

const eventGrid = createBaseFeed({
  token: 'my-token',
  numberOfRowsToStart: 2,
  numberOfColumnsToShow: 3,
  isLazyLoad: true,
  categories: ['sports'],

  fetchStrategy: eventsFetchStrategy,
  displayStrategy: eventsDisplayStrategy,
  layoutStrategy: gridGapLayout,

  imageConfig: (entry) => {
    const imageUrl = entry.image?.[0]?.url;
    const altText = entry.image?.[0]?.altText;

    if (!imageUrl || !altText) return null;

    return {
      imageUrl: imageUrl,
      altText: altText,
      linkUrl: entry.url,
    };
  },
});
```

### News List with Dark Theme

```typescript
const newsList = createBaseFeed({
  token: 'my-token',
  numberOfRowsToStart: 5,
  isThemeDark: true,
  isLazyLoad: true,

  fetchStrategy: newsFetchStrategy,
  displayStrategy: newsDisplayStrategy,
  layoutStrategy: stackedLayout,

  imageConfig: (entry) => {
    const imageUrl = entry.image?.[0]?.url;
    const altText = entry.image?.[0]?.altText;

    if (!imageUrl || !altText) return null;

    return {
      imageUrl: imageUrl,
      altText: altText,
      linkUrl: entry.url,
    };
  },
});
```

### Experts Grid

```typescript
const expertsGrid = createBaseFeed({
  token: 'my-token',
  numberOfRowsToStart: 3,
  numberOfColumnsToShow: 3,
  categories: ['engineering', 'computer-science'],

  fetchStrategy: expertsFetchStrategy,  // Coming soon
  displayStrategy: expertsDisplayStrategy,
  layoutStrategy: gridGapLayout,

  imageConfig: (entry) => {
    const imageUrl = entry.image?.[0]?.url;
    const altText = entry.name;

    if (!imageUrl || !altText) return null;

    return {
      imageUrl: imageUrl,
      altText: altText,
      linkUrl: entry.url,
    };
  },
});
```

### Override Display Strategy

```typescript
const customNewsStrategy: DisplayStrategy<NewsEntryType> = {
  ...newsDisplayStrategy,

  mapEntryToCard: (entry, options) => {
    // Use overlay for featured items
    if (options.isFeatured) {
      return newsDisplayStrategy.mapEntryToCard(entry, {
        ...options,
        isOverlay: true,
      });
    }

    // Default mapping
    return newsDisplayStrategy.mapEntryToCard(entry, options);
  },
};

const feed = createBaseFeed({
  token: 'my-token',
  numberOfRowsToStart: 2,
  fetchStrategy: newsFetchStrategy,
  displayStrategy: customNewsStrategy,
  layoutStrategy: gridLayout,
});
```

---

## Testing

### Testing Display Strategies

```typescript
import { eventsDisplayStrategy } from './strategies';

describe('Custom Display Strategy', () => {
  const mockEntry = {
    id: 1,
    title: 'Test Event',
    url: 'https://example.com',
    // ... other fields
  };

  it('should create card element', () => {
    const result = eventsDisplayStrategy.mapEntryToCard(mockEntry, {
      isThemeDark: false,
    });

    expect(result.element).toBeInstanceOf(HTMLElement);
    expect(result.styles).toBeTruthy();
  });
});
```

### Testing Fetch Strategies

```typescript
import { createGraphQLFetchStrategy } from './strategies';

jest.mock('@universityofmaryland/web-utilities-library/network');

describe('Custom Fetch Strategy', () => {
  const mockStrategy = createGraphQLFetchStrategy({
    endpoint: 'https://test.com/graphql',
    queries: { entries: 'query' },
    transformResponse: (data) => data?.entries,
    transformCount: (data) => data?.count,
  });

  it('should fetch entries', async () => {
    const result = await mockStrategy.fetchEntries({
      token: 'test',
    });

    expect(result).toBeTruthy();
  });
});
```

### Testing Layout Strategies

```typescript
import { gridLayout } from './strategies';

describe('Custom Layout Strategy', () => {
  it('should create layout element', () => {
    const result = gridLayout.create({ columns: 3 });

    expect(result.element).toBeInstanceOf(HTMLElement);
    expect(result.styles).toBeTruthy();
  });
});
```

---

## Best Practices

1. **Keep strategies pure** - No side effects
2. **Test in isolation** - Each strategy independently
3. **Reuse when possible** - Don't duplicate strategies
4. **Type everything** - Leverage TypeScript
5. **Document behavior** - JSDoc for public APIs
6. **Handle errors gracefully** - Return null, don't throw
7. **Follow naming conventions** - `*DisplayStrategy`, `*FetchStrategy`, `*Layout`

---

## Related Documentation

- [Factory README](../factory/README.md)
- [Adding New Feed Types](../../docs/ADDING_NEW_FEEDS.md)
- [Architecture Overview](../../docs/ARCHITECTURE.md)

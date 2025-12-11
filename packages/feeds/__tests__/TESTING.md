# Feeds Package - Unit Testing Guide

## Overview

This directory contains **unit tests** for the Feeds package. These tests focus on verifying that feed components fetch data correctly, transform it properly, and create expected DOM structures using **mocked dependencies**.

## Testing Philosophy

### What to Test in This Package

✅ **Test OUR feed logic:**
- Data fetching and GraphQL queries
- Data transformation and mapping
- Feed element creation
- Error handling and loading states
- Feed-specific utilities (loaders, lazy loading)
- Event handling

❌ **Don't test external package logic:**
- Element creation from `@universityofmaryland/web-elements-library`
- Style compilation from `@universityofmaryland/web-styles-library`
- Utility functions from `@universityofmaryland/web-utilities-library`
- API responses (mock these)

### Example: Good vs Bad Tests

```typescript
// ❌ BAD: Testing elements package or real API
import { createCard } from '@universityofmaryland/web-elements-library/composite';

it('validates card element structure', () => {
  const card = createCard({ headline: 'Test' });
  expect(card.element.tagName).toBe('DIV');  // Tests elements package!
});

it('fetches real news from API', async () => {
  const news = await fetchNews();  // Real API call!
  expect(news.length).toBeGreaterThan(0);
});

// ✅ GOOD: Testing OUR feed logic with mocks
import { createNewsFeed } from '../composite/news/list';

jest.mock('@universityofmaryland/web-elements-library/composite', () => ({
  createCard: jest.fn().mockReturnValue({
    element: document.createElement('div'),
    styles: '.mock-card { }'
  })
}));

it('transforms news data into feed items', () => {
  const mockData = [{ title: 'News 1', date: '2025-01-01' }];
  const feed = createNewsFeed({ data: mockData });

  expect(feed.element).toBeDefined();
  expect(feed.styles).toBeDefined();
});
```

## What We're Testing

### Data Fetching

Test that feeds:
- Make correct GraphQL queries
- Handle fetch errors gracefully
- Parse responses correctly
- Apply filters and limits

**Example:**
```typescript
describe('News Feed Fetch', () => {
  it('constructs correct GraphQL query', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: { news: [] } })
    });

    await fetchNews({ limit: 5 });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: 'POST',
        body: expect.stringContaining('limit: 5')
      })
    );
  });

  it('handles fetch errors', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));
    const consoleSpy = jest.spyOn(console, 'error');

    const result = await fetchNews();

    expect(result).toEqual([]);
    expect(consoleSpy).toHaveBeenCalled();
  });
});
```

### Data Transformation

Test that feeds:
- Map API data to feed format
- Extract required fields
- Handle missing data
- Apply defaults

**Example:**
```typescript
describe('Data Transformation', () => {
  it('transforms event data to feed items', () => {
    const rawData = {
      title: 'Event Title',
      start_date: '2025-12-01',
      location: 'Campus'
    };

    const transformed = transformEventData(rawData);

    expect(transformed).toHaveProperty('headline');
    expect(transformed).toHaveProperty('date');
    expect(transformed).toHaveProperty('text');
  });

  it('handles missing fields gracefully', () => {
    const incomplete = { title: 'Event' };

    const transformed = transformEventData(incomplete);

    expect(transformed.headline).toBe('Event');
    expect(transformed.date).toBeUndefined();
  });
});
```

### Feed Element Creation

Test that feeds:
- Create ElementModel objects
- Include all feed items
- Apply layouts correctly
- Generate styles

**Example:**
```typescript
describe('Feed Creation', () => {
  it('creates grid layout feed', () => {
    const mockData = [
      { title: 'Item 1' },
      { title: 'Item 2' }
    ];

    const feed = createEventGrid({ data: mockData });

    expect(feed.element).toBeDefined();
    expect(feed.element.children.length).toBe(2);
    expect(feed.styles).toContain('grid');
  });

  it('limits feed items', () => {
    const mockData = Array(10).fill({ title: 'Item' });

    const feed = createNewsList({ data: mockData, limit: 5 });

    expect(feed.element.children.length).toBe(5);
  });
});
```

### Loading States

Test that macros:
- Show loaders while fetching
- Remove loaders when complete
- Handle errors visually

**Example:**
```typescript
describe('Loader Macro', () => {
  it('displays loader during fetch', () => {
    const container = document.createElement('div');
    showLoader(container);

    expect(container.querySelector('.loader')).toBeDefined();
  });

  it('removes loader when complete', () => {
    const container = document.createElement('div');
    showLoader(container);
    hideLoader(container);

    expect(container.querySelector('.loader')).toBeNull();
  });
});
```

## Mocked Dependencies

All external packages are automatically mocked via Jest configuration:

- `@universityofmaryland/web-elements-library` → Element builders
- `@universityofmaryland/web-styles-library` → Style objects
- `@universityofmaryland/web-utilities-library` → Utility functions
- `global.fetch` → API calls (mock in tests)

**Mocks are auto-generated** - see `/__mocks__/MOCKS.md` for details.

## Common Test Patterns

### Pattern 1: Mock API Response

```typescript
beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      data: {
        events: [
          { title: 'Event 1', date: '2025-01-01' },
          { title: 'Event 2', date: '2025-01-02' }
        ]
      }
    })
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});
```

### Pattern 2: Test Data Transformation

```typescript
it('maps API fields to feed format', () => {
  const apiData = { event_title: 'Title', event_date: '2025-01-01' };
  const feedData = mapEventData(apiData);

  expect(feedData.headline).toBe('Title');
  expect(feedData.date).toBe('2025-01-01');
});
```

### Pattern 3: Test Error Handling

```typescript
it('handles empty API response', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ data: { events: [] } })
  });

  const feed = await createEventsFeed();

  expect(feed.element.textContent).toContain('No events found');
});
```

## Test Organization

```
__tests__/
├── TESTING.md              # This file
├── composite/              # Feed component tests
│   ├── academic/          # Academic feed tests
│   ├── events/            # Event feed tests
│   └── news/              # News feed tests
├── elements/               # Feed element tests
├── macros/                 # Feed utility tests
│   ├── loader.test.ts
│   ├── lazy-load.test.ts
│   └── aria-live.test.ts
└── utilities/              # Utility tests
    ├── events/
    └── network/
```

## Running Tests

```bash
# From package directory
npm test                 # Run all tests
npm run test:watch       # Watch mode
npm run test:coverage    # With coverage

# From repository root
npx lerna run test --scope=@universityofmaryland/web-feeds-library
```

## Best Practices

1. ✅ **Mock fetch calls** - Don't make real API requests
2. ✅ **Test data flow** - API → transform → render
3. ✅ **Test error states** - Network errors, empty data
4. ✅ **Test loading states** - Loaders and placeholders
5. ✅ **Mock external deps** - Don't test other packages
6. ✅ **Clean up after tests** - Clear mocks and DOM

## Resources

- **Mock System Documentation**: `/__mocks__/MOCKS.md`
- **Package Documentation**: `/packages/feeds/CLAUDE.md`
- **Jest Documentation**: https://jestjs.io/
- **Testing Philosophy**: `/__mocks__/MOCKS.md#testing-philosophy`

## Questions?

Review the comprehensive mock system documentation at `/__mocks__/MOCKS.md` for:
- Testing philosophy and strategy
- Mock generation details
- Troubleshooting guide
- Integration vs unit testing

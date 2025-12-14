# Expert Feeds

This directory will contain expert feed implementations using the factory pattern.

## Planned Implementation

Expert feeds will use the same factory pattern as events and news feeds:

```typescript
import { createBaseFeed } from 'factory';
import { expertsDisplayStrategy } from 'strategies';

export default (props) =>
  createBaseFeed({
    ...props,
    fetchStrategy: expertsFetchStrategy,  // TODO: Create
    displayStrategy: expertsDisplayStrategy,
    layoutStrategy: gridGapLayout,
  });
```

## Required Steps

1. Create `expertsFetchStrategy` in `/source/strategies/fetch/experts.ts`
2. Implement GraphQL queries for experts API
3. Add expert type transformations
4. Create grid and list feed variations
5. Add comprehensive tests

## Benefits of Factory Pattern

- **Reusable strategies**: Share fetch and display logic across feeds
- **Type-safe**: Full TypeScript support with generics
- **Testable**: Mock strategies for unit testing
- **Maintainable**: Clear separation of concerns
- **Scalable**: Easy to add new feed types

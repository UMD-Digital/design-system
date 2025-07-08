# Test Migration Guide

This guide helps migrate existing tests to use the new centralized test structure.

## Import Changes

### Before (Old Structure)
```typescript
import { createElement, validateElementStructure } from '../test-helpers/element';
import '../test-helpers/setup';
```

### After (New Structure)
```typescript
// Import from centralized location
import { createElement, validateElementStructure } from '@/source/__tests__/helpers';
import '@/source/__tests__/helpers/setup';

// Or use the root imports
import { createElement, validateElementStructure } from '../../../__tests__/helpers';
import '../../../__tests__/helpers/setup';
```

## New Utilities Available

### Assertion Utilities
```typescript
import { 
  assertElementModel,
  assertHasClasses,
  assertHasAttributes,
  assertTextContent,
  assertAccessibility 
} from '@/source/__tests__/utils/assertions';
```

### Event Utilities
```typescript
import { 
  simulateClick,
  simulateKeyboard,
  waitForEvent,
  spyOnEvent 
} from '@/source/__tests__/utils/events';
```

### Timer Utilities
```typescript
import { 
  flushPromises,
  waitFor,
  nextFrame,
  withFakeTimers 
} from '@/source/__tests__/utils/timers';
```

### Test Fixtures
```typescript
import { testContent } from '@/source/__tests__/fixtures/content';
import { createCardStructure, createHeroStructure } from '@/source/__tests__/fixtures/elements';
```

## Example Migration

### Before
```typescript
describe('Card Block', () => {
  it('should create card', () => {
    const headline = createElement('h3', 'Title');
    const result = cardBlock({ headline });
    
    expect(result.element).toBeInstanceOf(HTMLElement);
    expect(result.element.classList.contains('card-block')).toBe(true);
    expect(result.element.textContent).toContain('Title');
  });
});
```

### After
```typescript
describe('Card Block', () => {
  it('should create card', () => {
    const headline = createElement('h3', 'Title');
    const result = cardBlock({ headline });
    
    // Use assertion utilities
    assertElementModel(result);
    assertHasClasses(result.element, 'card-block');
    assertTextContent(result.element, 'Title');
  });
});
```

## Benefits of New Structure

1. **Centralized Utilities**: All test helpers in one place
2. **Better Assertions**: More descriptive and reusable assertions
3. **Event Simulation**: Comprehensive event testing utilities
4. **Test Fixtures**: Reusable test data and DOM structures
5. **Type Safety**: Better TypeScript support throughout

## Steps to Migrate

1. Update import paths to use centralized test structure
2. Replace manual assertions with utility functions
3. Use fixtures for common test data
4. Leverage event utilities for interaction testing
5. Apply timer utilities for async testing

## Running Tests

No changes to test commands:
```bash
npm test
npm run test:watch
npm run test:coverage
```
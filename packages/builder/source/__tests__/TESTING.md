# Builder Package - Unit Testing Guide

## Overview

This directory contains **unit tests** for the Builder package. These tests focus on verifying that the ElementBuilder fluent API creates correct Element Models with proper style compilation using **mocked dependencies**.

## Testing Philosophy

### What to Test in This Package

✅ **Test OUR builder logic:**
- ElementBuilder method chaining
- Element creation and configuration
- Style merging and priority system
- Event attachment and lifecycle management
- Error handling and validation
- ElementModel structure

❌ **Don't test external package logic:**
- Style compilation from `@universityofmaryland/web-styles-library`
- Utility function implementations from `@universityofmaryland/web-utilities-library`
- Token values from `@universityofmaryland/web-token-library`

### Example: Good vs Bad Tests

```typescript
// ❌ BAD: Testing styles package logic
import * as Styles from '@universityofmaryland/web-styles-library';

it('validates style object structure', () => {
  expect(Styles.typography.sans.large).toHaveProperty('className');
});

// ✅ GOOD: Testing OUR builder logic
import { ElementBuilder } from '../core/ElementBuilder';

it('chains methods and builds element', () => {
  const builder = new ElementBuilder('div')
    .withClassName('test')
    .withText('Hello');

  const model = builder.build();

  expect(model.element.className).toContain('test');
  expect(model.element.textContent).toBe('Hello');
});
```

## What We're Testing

### ElementBuilder Core

Test that ElementBuilder:
- Supports method chaining
- Builds valid Element Models
- Applies classes and attributes correctly
- Handles child elements
- Merges styles with priority
- Prevents modification after build

**Example:**
```typescript
describe('ElementBuilder Core', () => {
  it('supports method chaining', () => {
    const builder = new ElementBuilder('div');
    const result = builder.withClassName('test');

    expect(result).toBe(builder);  // Returns same instance
  });

  it('builds valid ElementModel', () => {
    const model = new ElementBuilder('div').build();

    expect(model).toHaveProperty('element');
    expect(model).toHaveProperty('styles');
    expect(model.element instanceof HTMLElement).toBe(true);
  });

  it('prevents modification after build', () => {
    const builder = new ElementBuilder('div');
    builder.build();

    expect(() => builder.withClassName('test')).toThrow();
  });
});
```

### Style Management

Test that StyleManager:
- Compiles styles correctly
- Handles priority levels
- Deduplicates styles
- Merges child styles

**Example:**
```typescript
describe('StyleManager', () => {
  it('compiles JSS to CSS string', () => {
    const builder = new ElementBuilder('div')
      .withStyles({ element: { color: 'red' } });

    const model = builder.build();

    expect(typeof model.styles).toBe('string');
    expect(model.styles.length).toBeGreaterThan(0);
  });

  it('merges styles from child ElementModels', () => {
    const child = new ElementBuilder('span')
      .withStyles({ element: { fontSize: '14px' } })
      .build();

    const parent = new ElementBuilder('div')
      .withChild(child)
      .build();

    expect(parent.styles).toContain(child.styles);
  });
});
```

### Lifecycle Management

Test that LifecycleManager:
- Tracks event listeners
- Provides cleanup methods
- Manages observers

**Example:**
```typescript
describe('LifecycleManager', () => {
  it('tracks event listeners for cleanup', () => {
    const handler = jest.fn();
    const model = new ElementBuilder('button')
      .on('click', handler)
      .build();

    expect(model.destroy).toBeDefined();

    model.destroy();
    // Verify cleanup happened
  });
});
```

## Mocked Dependencies

All external packages are automatically mocked via Jest configuration:

- `@universityofmaryland/web-styles-library` → Style objects and utilities
- `@universityofmaryland/web-utilities-library` → Utility functions
- `@universityofmaryland/web-token-library` → Design tokens

**Mocks are auto-generated** - see `/__mocks__/MOCKS.md` for details.

## Common Test Patterns

### Pattern 1: Method Chaining

```typescript
it('supports chaining multiple methods', () => {
  const builder = new ElementBuilder('div')
    .withClassName('class1')
    .withClassName('class2')
    .withAttribute('id', 'test')
    .withText('Hello');

  expect(builder.build().element.className).toContain('class1');
  expect(builder.build().element.className).toContain('class2');
});
```

### Pattern 2: Conditional Building

```typescript
it('conditionally adds children', () => {
  const builder = new ElementBuilder('div')
    .withChildIf(true, document.createElement('span'))
    .withChildIf(false, document.createElement('p'));

  const element = builder.build().element;

  expect(element.children.length).toBe(1);
  expect(element.children[0].tagName).toBe('SPAN');
});
```

### Pattern 3: Style Priority

```typescript
it('applies styles with correct priority', () => {
  const builder = new ElementBuilder('div')
    .styled(mockStyleObject, 1)     // Lower priority
    .withStyles(customStyles, 2);    // Higher priority

  const model = builder.build();

  // Verify style order/priority in output
  expect(model.styles).toBeDefined();
});
```

### Pattern 4: Event Attachment

```typescript
it('attaches custom events to ElementModel', () => {
  const playFn = jest.fn();
  const model = new ElementBuilder('div')
    .withEvents({ play: playFn })
    .build();

  expect(model.events).toBeDefined();
  expect(model.events.play).toBe(playFn);
});
```

## Test Organization

```
__tests__/
├── TESTING.md                # This file
├── ElementBuilder.test.ts    # Core builder tests
├── StyleManager.test.ts      # Style compilation tests
├── LifecycleManager.test.ts  # Lifecycle management tests
└── integration.test.ts       # Internal integration tests
```

## Running Tests

```bash
# From package directory
npm test                 # Run all tests
npm run test:watch       # Watch mode
npm run test:coverage    # With coverage

# From repository root
npx lerna run test --scope=@universityofmaryland/web-builder-library
```

## Regenerating Mocks

If external package exports change, regenerate mocks:

```bash
# From repository root
npm run generate:mocks
```

See `/__mocks__/MOCKS.md` for complete mock system documentation.

## Best Practices

1. ✅ **Test method contracts** - Verify public API behavior
2. ✅ **Test error conditions** - Invalid inputs, post-build modification
3. ✅ **Test immutability** - Builder state after `.build()`
4. ✅ **Use type assertions** - Leverage TypeScript for type safety
5. ✅ **Clear beforeEach** - Reset mocks between tests

## Resources

- **Mock System Documentation**: `/__mocks__/MOCKS.md`
- **Package Documentation**: `/packages/builder/CLAUDE.md`
- **API Reference**: `/packages/builder/ELEMENT-BUILDER-METHODS.md`
- **Jest Documentation**: https://jestjs.io/
- **Testing Philosophy**: `/__mocks__/MOCKS.md#testing-philosophy`

## Questions?

Review the comprehensive mock system documentation at `/__mocks__/MOCKS.md` for:
- Testing philosophy and strategy
- Mock generation details
- Troubleshooting guide
- Integration vs unit testing

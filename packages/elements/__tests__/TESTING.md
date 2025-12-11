# Elements Package - Unit Testing Guide

## Overview

This directory contains **unit tests** for the Elements package. These tests focus on verifying that element builder functions create correct DOM structures and styles using **mocked dependencies**.

## Testing Philosophy

### What to Test in This Package

✅ **Test OUR element creation logic:**
- Element structure (correct tags, attributes, children)
- Element Model return values (`element`, `styles`)
- Props handling and transformation
- Error handling for invalid inputs
- Default values and optional props

❌ **Don't test external package logic:**
- Token values from `@universityofmaryland/web-token-library`
- Utility function implementations from `@universityofmaryland/web-utilities-library`
- Style compilation from `@universityofmaryland/web-styles-library`
- Builder methods from `@universityofmaryland/web-builder-library`

### Example: Good vs Bad Tests

```typescript
// ❌ BAD: Testing token package logic
import { color } from '@universityofmaryland/web-token-library';

it('validates UMD red color', () => {
  expect(color.red).toBe('#E21833');  // Tests token package, not elements!
});

// ✅ GOOD: Testing OUR element logic
import { createButton } from '../atomic/actions/button';

it('creates button element with correct structure', () => {
  const button = createButton({ text: 'Click Me' });

  expect(button.element.tagName).toBe('BUTTON');
  expect(button.element.textContent).toBe('Click Me');
  expect(button.styles).toBeDefined();
});
```

## What We're Testing

### Atomic Elements

Test that atomic element builders:
- Create correct HTML elements
- Apply props correctly
- Return valid Element Models
- Handle edge cases gracefully

**Example:**
```typescript
// source/__tests__/atomic/text-lockup.test.ts
describe('Text Lockup Atomic Element', () => {
  it('creates div with headline and text', () => {
    const lockup = textLockup.small({
      headline: 'Title',
      text: 'Description'
    });

    expect(lockup.element.tagName).toBe('DIV');
    expect(lockup.element.textContent).toContain('Title');
    expect(lockup.element.textContent).toContain('Description');
  });
});
```

### Composite Elements

Test that composite element builders:
- Combine multiple atomic elements correctly
- Pass props through to children
- Create complex DOM structures
- Generate appropriate styles

**Example:**
```typescript
// source/__tests__/composite/card.test.ts
describe('Card Composite Element', () => {
  it('assembles card from headline, text, and image', () => {
    const card = createCard({
      headline: document.createElement('h3'),
      text: document.createElement('p'),
      image: document.createElement('img')
    });

    expect(card.element).toBeDefined();
    expect(card.element.children.length).toBeGreaterThan(0);
  });
});
```

## Mocked Dependencies

All external packages are automatically mocked via Jest configuration:

- `@universityofmaryland/web-token-library` → Design tokens
- `@universityofmaryland/web-styles-library` → Style objects
- `@universityofmaryland/web-utilities-library` → Utility functions
- `@universityofmaryland/web-builder-library` → Element builder

**Mocks are auto-generated** - see `/__mocks__/MOCKS.md` for details.

### Using Mocked Functions

You can verify that OUR code calls mocked functions:

```typescript
import { addClass } from '@universityofmaryland/web-utilities-library/dom';

it('applies custom class name', () => {
  createButton({ className: 'custom-btn' });

  expect(addClass).toHaveBeenCalled();
  expect(addClass).toHaveBeenCalledWith(
    expect.any(Object),
    'custom-btn'
  );
});
```

## Common Test Patterns

### Pattern 1: Element Creation

```typescript
it('creates valid element', () => {
  const element = createMyElement({ /* props */ });

  expect(element.element).toBeDefined();
  expect(element.element instanceof HTMLElement).toBe(true);
  expect(element.styles).toBeDefined();
});
```

### Pattern 2: Props Application

```typescript
it('applies props correctly', () => {
  const element = createMyElement({
    text: 'Hello',
    className: 'my-class'
  });

  expect(element.element.textContent).toBe('Hello');
  expect(element.element.className).toContain('my-class');
});
```

### Pattern 3: Error Handling

```typescript
it('handles missing required props', () => {
  expect(() => createMyElement({})).not.toThrow();
  // Or if it should throw:
  expect(() => createMyElement({})).toThrow('Required prop missing');
});
```

### Pattern 4: Optional Props

```typescript
it('uses defaults when optional props not provided', () => {
  const withDefaults = createMyElement({});
  const withExplicit = createMyElement({ theme: 'default' });

  expect(withDefaults.element.className).toBe(withExplicit.element.className);
});
```

## Test Organization

```
__tests__/
├── TESTING.md           # This file
├── atomic/              # Atomic element tests
│   ├── actions.test.ts
│   ├── text-lockup.test.ts
│   └── assets.test.ts
└── composite/           # Composite element tests
    ├── card.test.ts
    ├── hero.test.ts
    └── navigation.test.ts
```

## Running Tests

```bash
# From package directory
npm test                 # Run all tests
npm run test:watch       # Watch mode
npm run test:coverage    # With coverage

# From repository root
npm test                 # Run all package tests
npx lerna run test --scope=@universityofmaryland/web-elements-library
```

## Regenerating Mocks

If external package exports change, regenerate mocks:

```bash
# From repository root
npm run generate:mocks
```

See `/__mocks__/MOCKS.md` for complete mock system documentation.

## Best Practices

1. ✅ **Clear test names** - Describe what you're testing
2. ✅ **Test one thing** - One assertion focus per test
3. ✅ **Use beforeEach** - Reset mocks between tests
4. ✅ **Test edge cases** - Empty strings, nulls, undefined
5. ✅ **Document WHY** - Add comments for complex tests

## Resources

- **Mock System Documentation**: `/__mocks__/MOCKS.md`
- **Package Documentation**: `/packages/elements/CLAUDE.md`
- **Jest Documentation**: https://jestjs.io/
- **Testing Philosophy**: `/__mocks__/MOCKS.md#testing-philosophy`

## Questions?

Review the comprehensive mock system documentation at `/__mocks__/MOCKS.md` for:
- Testing philosophy and strategy
- Mock generation details
- Troubleshooting guide
- Integration vs unit testing

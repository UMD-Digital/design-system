# Model Package - Unit Testing Guide

## Overview

This directory contains **unit tests** for the Model package. These tests focus on verifying that model utilities for Web Components work correctly, including attribute validation, slot management, and element model helpers. **This package has minimal dependencies**.

## Testing Philosophy

### What to Test in This Package

✅ **Test OUR model utilities:**
- Attribute validation and type checking
- Slot content extraction and validation
- Element model structure validation
- Helper function behavior
- Type guards and predicates

❌ **Don't test external package logic:**
- Style compilation from `@universityofmaryland/web-styles-library`
- Browser DOM APIs (use JSDOM mocks)

### Example: Good vs Bad Tests

```typescript
// ❌ BAD: Testing browser or style package
it('validates style object from styles library', () => {
  const styleObj = Styles.typography.sans.large;
  expect(styleObj.className).toBeDefined();  // Tests styles package!
});

// ✅ GOOD: Testing OUR attribute validation
import { validateAttribute } from '../attributes';

it('validates boolean attribute', () => {
  const isValid = validateAttribute('data-active', 'true', 'boolean');
  expect(isValid).toBe(true);
});

it('rejects invalid boolean attribute', () => {
  const isValid = validateAttribute('data-active', 'invalid', 'boolean');
  expect(isValid).toBe(false);
});
```

## What We're Testing

### Attribute Validation

Test that attribute helpers:
- Validate attribute types
- Check required attributes
- Provide default values
- Handle edge cases

**Example:**
```typescript
describe('Attribute Validation', () => {
  it('validates string attributes', () => {
    expect(validateStringAttribute('hello')).toBe(true);
    expect(validateStringAttribute('')).toBe(true);
    expect(validateStringAttribute(null)).toBe(false);
  });

  it('validates boolean attributes', () => {
    expect(validateBooleanAttribute('true')).toBe(true);
    expect(validateBooleanAttribute('false')).toBe(true);
    expect(validateBooleanAttribute('')).toBe(false);
  });

  it('validates enum attributes', () => {
    const validOptions = ['small', 'medium', 'large'];
    expect(validateEnumAttribute('medium', validOptions)).toBe(true);
    expect(validateEnumAttribute('invalid', validOptions)).toBe(false);
  });
});
```

### Slot Management

Test that slot helpers:
- Extract slot content
- Validate slot elements
- Handle missing slots
- Check slot assignments

**Example:**
```typescript
describe('Slot Management', () => {
  it('extracts slotted content', () => {
    const container = document.createElement('div');
    const slotted = document.createElement('span');
    slotted.slot = 'header';
    slotted.textContent = 'Header Content';
    container.appendChild(slotted);

    const content = getSlottedContent(container, 'header');
    expect(content).toBe(slotted);
  });

  it('returns null for missing slot', () => {
    const container = document.createElement('div');
    const content = getSlottedContent(container, 'missing');
    expect(content).toBeNull();
  });

  it('validates slot element type', () => {
    const img = document.createElement('img');
    expect(isValidImageSlot(img)).toBe(true);

    const div = document.createElement('div');
    expect(isValidImageSlot(div)).toBe(false);
  });
});
```

### Element Model Helpers

Test that element model utilities:
- Validate ElementModel structure
- Merge element models
- Combine styles
- Handle lifecycle methods

**Example:**
```typescript
describe('Element Model Helpers', () => {
  it('validates complete ElementModel', () => {
    const model = {
      element: document.createElement('div'),
      styles: '.my-class { color: red; }'
    };

    expect(isValidElementModel(model)).toBe(true);
  });

  it('rejects incomplete ElementModel', () => {
    const invalid = {
      element: document.createElement('div')
      // missing styles
    };

    expect(isValidElementModel(invalid)).toBe(false);
  });

  it('merges element models', () => {
    const model1 = {
      element: document.createElement('div'),
      styles: '.class1 { }'
    };

    const model2 = {
      element: document.createElement('span'),
      styles: '.class2 { }'
    };

    const merged = mergeStyles(model1, model2);
    expect(merged).toContain('.class1');
    expect(merged).toContain('.class2');
  });
});
```

## Mocked Dependencies

Minimal external dependencies:

- `@universityofmaryland/web-styles-library` → Style objects (peer dependency)
- JSDOM → Browser DOM APIs

**Mocks are auto-generated** - see `/__mocks__/MOCKS.md` for details.

## Common Test Patterns

### Pattern 1: Attribute Type Validation

```typescript
it('validates attribute type', () => {
  expect(validateType('value', 'string')).toBe(true);
  expect(validateType(123, 'number')).toBe(true);
  expect(validateType('123', 'number')).toBe(false);
});
```

### Pattern 2: Slot Content Extraction

```typescript
it('extracts slot by name', () => {
  const host = document.createElement('div');
  const slotted = document.createElement('p');
  slotted.slot = 'content';
  host.appendChild(slotted);

  const result = extractSlot(host, 'content');
  expect(result).toBe(slotted);
});
```

### Pattern 3: Type Guards

```typescript
it('identifies HTML elements', () => {
  expect(isHTMLElement(document.createElement('div'))).toBe(true);
  expect(isHTMLElement({})).toBe(false);
  expect(isHTMLElement(null)).toBe(false);
});
```

## Test Organization

```
__tests__/
├── TESTING.md              # This file
├── attributes.test.ts      # Attribute validation tests
├── slots.test.ts           # Slot management tests
├── element-model.test.ts   # ElementModel helpers tests
└── type-guards.test.ts     # Type guard tests
```

## Running Tests

```bash
# From package directory
npm test                 # Run all tests
npm run test:watch       # Watch mode
npm run test:coverage    # With coverage

# From repository root
npx lerna run test --scope=@universityofmaryland/web-model-library
```

## Best Practices

1. ✅ **Test pure functions** - Model utilities are mostly pure
2. ✅ **Test all branches** - Cover all validation paths
3. ✅ **Use descriptive names** - Test name = utility + scenario + expected
4. ✅ **Test edge cases** - null, undefined, empty, invalid types
5. ✅ **Mock DOM APIs** - Use JSDOM, don't rely on real browser

## Resources

- **Mock System Documentation**: `/__mocks__/MOCKS.md`
- **Package Documentation**: `/packages/model/CLAUDE.md`
- **Jest Documentation**: https://jestjs.io/
- **Testing Philosophy**: `/__mocks__/MOCKS.md#testing-philosophy`

## Questions?

Review the comprehensive mock system documentation at `/__mocks__/MOCKS.md` for:
- Testing philosophy and strategy
- Mock generation details
- Troubleshooting guide
- Integration vs unit testing

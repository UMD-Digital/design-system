# Utilities Package - Unit Testing Guide

## Overview

This directory contains **unit tests** for the Utilities package. These tests focus on verifying that utility functions perform their specific transformations correctly using **mocked dependencies** where needed.

## Testing Philosophy

### What to Test in This Package

✅ **Test OUR utility function logic:**
- Input transformation and output
- Edge case handling
- Error conditions and validation
- Function behavior with various inputs
- Return value structure and types

❌ **Don't test external package logic:**
- Token values from `@universityofmaryland/web-token-library`
- Style objects from `@universityofmaryland/web-styles-library`
- Browser DOM APIs (use JSDOM)
- PostCSS transformation internals

### Example: Good vs Bad Tests

```typescript
// ❌ BAD: Testing external package
import { color } from '@universityofmaryland/web-token-library';

it('validates token color value', () => {
  expect(color.red).toBe('#E21833');  // Tests token package!
});

// ✅ GOOD: Testing OUR utility function
import { addClass } from '../dom/addClass';

it('adds class to element classList', () => {
  const element = document.createElement('div');

  addClass(element, 'test-class');

  expect(element.classList.contains('test-class')).toBe(true);
});
```

## What We're Testing

### DOM Utilities

Test that DOM utilities:
- Manipulate DOM correctly
- Handle edge cases (null, undefined)
- Work with various element types
- Return expected values

**Example:**
```typescript
// source/__tests__/dom/addClass.test.ts
describe('addClass Utility', () => {
  it('adds single class to element', () => {
    const element = document.createElement('div');

    addClass(element, 'my-class');

    expect(element.classList.contains('my-class')).toBe(true);
  });

  it('handles element without className gracefully', () => {
    const element = document.createElement('div');
    element.removeAttribute('class');

    expect(() => addClass(element, 'test')).not.toThrow();
  });

  it('does not add duplicate classes', () => {
    const element = document.createElement('div');

    addClass(element, 'test');
    addClass(element, 'test');

    expect(element.className).toBe('test');
  });
});
```

### Style Utilities

Test that style utilities:
- Convert JSS to CSS correctly
- Handle nested objects
- Process media queries
- Generate valid CSS strings

**Example:**
```typescript
// source/__tests__/styles/jssToCSS.test.ts
describe('jssToCSS Utility', () => {
  it('converts simple JSS object to CSS', () => {
    const jss = {
      '.button': {
        color: 'red',
        fontSize: '16px'
      }
    };

    const css = jssToCSS({ styleObj: jss });

    expect(css).toContain('.button');
    expect(css).toContain('color: red');
    expect(css).toContain('font-size: 16px');
  });

  it('handles nested media queries', () => {
    const jss = {
      '.container': {
        padding: '10px',
        '@media (min-width: 768px)': {
          padding: '20px'
        }
      }
    };

    const css = jssToCSS({ styleObj: jss });

    expect(css).toContain('@media (min-width: 768px)');
  });
});
```

### String Utilities

Test that string utilities:
- Transform strings correctly
- Handle empty strings
- Process special characters
- Maintain type safety

**Example:**
```typescript
// source/__tests__/string/capitalize.test.ts
describe('capitalize Utility', () => {
  it('capitalizes first letter', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('handles empty string', () => {
    expect(capitalize('')).toBe('');
  });

  it('handles already capitalized string', () => {
    expect(capitalize('Hello')).toBe('Hello');
  });

  it('does not affect other letters', () => {
    expect(capitalize('hELLO')).toBe('HELLO');
  });
});
```

### Performance Utilities

Test that performance utilities:
- Debounce/throttle correctly
- Use proper timing
- Clean up resources

**Example:**
```typescript
// source/__tests__/performance/debounce.test.ts
describe('debounce Utility', () => {
  jest.useFakeTimers();

  it('delays function execution', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 300);

    debounced();
    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(300);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('cancels previous calls', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 300);

    debounced();
    debounced();
    debounced();

    jest.advanceTimersByTime(300);
    expect(fn).toHaveBeenCalledTimes(1);  // Only last call
  });
});
```

## Mocked Dependencies

Minimal external dependencies, but some utilities may use:

- `@universityofmaryland/web-token-library` → Design tokens
- `@universityofmaryland/web-styles-library` → Style objects
- PostCSS libraries → CSS transformation (peer dependencies)

**Mocks are auto-generated** - see `/__mocks__/MOCKS.md` for details.

## Common Test Patterns

### Pattern 1: Input/Output Testing

```typescript
it('transforms input to expected output', () => {
  const input = 'test input';
  const output = myUtility(input);

  expect(output).toBe('expected output');
});
```

### Pattern 2: Edge Case Testing

```typescript
it('handles null input', () => {
  expect(() => myUtility(null)).not.toThrow();
});

it('handles undefined input', () => {
  expect(() => myUtility(undefined)).not.toThrow();
});

it('handles empty array', () => {
  expect(myUtility([])).toEqual([]);
});
```

### Pattern 3: Side Effect Testing

```typescript
it('modifies element as expected', () => {
  const element = document.createElement('div');

  myUtility(element, 'value');

  expect(element.getAttribute('data-test')).toBe('value');
});
```

### Pattern 4: Type Guard Testing

```typescript
it('correctly identifies type', () => {
  expect(isHTMLElement(document.createElement('div'))).toBe(true);
  expect(isHTMLElement({})).toBe(false);
  expect(isHTMLElement(null)).toBe(false);
});
```

## Test Organization

```
__tests__/
├── TESTING.md              # This file
├── accessibility/          # Accessibility utilities
├── animation/              # Animation utilities
├── dom/                    # DOM manipulation utilities
├── string/                 # String processing utilities
├── styles/                 # Style transformation utilities
├── performance/            # Performance utilities
└── validation/             # Validation utilities
```

## Coverage Target

The Utilities package maintains **100% test coverage** (48 test suites, 1032+ tests).

### Running Coverage

```bash
npm run test:coverage
```

**Coverage Report:**
- Statements: 100%
- Branches: 100%
- Functions: 100%
- Lines: 100%

## Running Tests

```bash
# From package directory
npm test                 # Run all tests
npm run test:watch       # Watch mode
npm run test:coverage    # With coverage report

# From repository root
npx lerna run test --scope=@universityofmaryland/web-utilities-library
```

## Regenerating Mocks

If external package exports change, regenerate mocks:

```bash
# From repository root
npm run generate:mocks
```

See `/__mocks__/MOCKS.md` for complete mock system documentation.

## Best Practices

1. ✅ **Test pure functions** - Most utilities are pure, easy to test
2. ✅ **Test all branches** - Achieve 100% coverage
3. ✅ **Use descriptive names** - Test name = function + scenario + expected
4. ✅ **Test edge cases** - null, undefined, empty, extreme values
5. ✅ **Use fake timers** - For debounce, throttle, animation tests
6. ✅ **Mock DOM APIs** - Use JSDOM, don't rely on real browser

## Resources

- **Mock System Documentation**: `/__mocks__/MOCKS.md`
- **Package Documentation**: `/packages/utilities/CLAUDE.md`
- **Jest Documentation**: https://jestjs.io/
- **Testing Philosophy**: `/__mocks__/MOCKS.md#testing-philosophy`

## Questions?

Review the comprehensive mock system documentation at `/__mocks__/MOCKS.md` for:
- Testing philosophy and strategy
- Mock generation details
- Troubleshooting guide
- Integration vs unit testing

# Styles Package - Unit Testing Guide

## Overview

This directory contains **unit tests** for the Styles package. These tests focus on verifying that JSS objects, design tokens, and CSS transformation utilities work correctly using **snapshot testing and minimal mocking**.

## Testing Philosophy

### What to Test in This Package

✅ **Test OUR style exports and utilities:**
- JSS object structure and className generation
- CSS transformation (JSS to CSS)
- Variable transformation (tokens to CSS variables)
- Typography style consistency
- Accessibility style compliance
- Utility function behavior

❌ **Don't test external dependencies:**
- PostCSS transformation internals (peer dependency)
- Token values from `@universityofmaryland/web-token-library` (re-exported here)
- Browser CSS parsing

### Example: Good vs Bad Tests

```typescript
// ❌ BAD: Testing PostCSS library
it('validates postcss compilation', () => {
  const result = postcss.parse('.class { color: red; }');
  expect(result).toBeDefined();  // Tests postcss package!
});

// ✅ GOOD: Testing OUR JSS transformation
import { jssToCSS } from '../utilities/transform/jss';

it('transforms JSS object to CSS string', () => {
  const jss = {
    '.button': {
      color: 'red',
      fontSize: '16px'
    }
  };

  const css = jssToCSS(jss);

  expect(css).toContain('.button');
  expect(css).toContain('color: red');
  expect(css).toContain('font-size: 16px');
});
```

## What We're Testing

### JSS Object Structure

Test that JSS objects:
- Export correct className
- Include all required style properties
- Use design token values
- Match snapshots

**Example:**
```typescript
describe('Typography JSS', () => {
  it('exports headline styles with className', () => {
    const headline = typography.sans.large;

    expect(headline.className).toBeDefined();
    expect(headline.fontSize).toBeDefined();
    expect(headline.lineHeight).toBeDefined();
  });

  it('matches snapshot', () => {
    expect(typography.sans).toMatchSnapshot();
  });
});
```

### CSS Transformation

Test that transformation utilities:
- Convert JSS to CSS correctly
- Handle nested selectors
- Process media queries
- Generate valid CSS syntax

**Example:**
```typescript
describe('JSS to CSS Transformation', () => {
  it('converts simple JSS object', () => {
    const jss = {
      '.container': {
        padding: '20px',
        margin: '0 auto'
      }
    };

    const css = jssToCSS(jss);

    expect(css).toContain('.container');
    expect(css).toContain('padding: 20px');
    expect(css).toContain('margin: 0 auto');
  });

  it('handles nested media queries', () => {
    const jss = {
      '.responsive': {
        width: '100%',
        '@media (min-width: 768px)': {
          width: '50%'
        }
      }
    };

    const css = jssToCSS(jss);

    expect(css).toContain('@media (min-width: 768px)');
    expect(css).toContain('width: 50%');
  });

  it('handles pseudo-selectors', () => {
    const jss = {
      '.link': {
        color: 'blue',
        '&:hover': {
          color: 'darkblue'
        }
      }
    };

    const css = jssToCSS(jss);

    expect(css).toContain('.link:hover');
    expect(css).toContain('color: darkblue');
  });
});
```

### Variable Transformation

Test that variable utilities:
- Convert tokens to CSS variables
- Format variable names correctly
- Handle nested token objects
- Apply to DOM correctly

**Example:**
```typescript
describe('Token to CSS Variable', () => {
  it('formats token keys to CSS variable names', () => {
    expect(formatTokenKey('primaryColor')).toBe('--primary-color');
    expect(formatTokenKey('fontSize')).toBe('--font-size');
  });

  it('converts token object to CSS variables', () => {
    const tokens = {
      color: { primary: '#E21833', secondary: '#FFD200' },
      spacing: { sm: '8px', md: '16px' }
    };

    const cssVars = tokensToCssVariables(tokens);

    expect(cssVars).toContain('--color-primary: #E21833');
    expect(cssVars).toContain('--color-secondary: #FFD200');
    expect(cssVars).toContain('--spacing-sm: 8px');
  });
});
```

### Typography Styles

Test that typography:
- Exports all font families
- Includes all size variants
- Applies correct line heights
- Matches snapshots

**Example:**
```typescript
describe('Typography Exports', () => {
  it('exports sans font family', () => {
    expect(typography.sans).toBeDefined();
    expect(typography.sans.small).toBeDefined();
    expect(typography.sans.large).toBeDefined();
  });

  it('exports serif font family', () => {
    expect(typography.serif).toBeDefined();
    expect(typography.serif.medium).toBeDefined();
  });

  it('exports campaign font family', () => {
    expect(typography.campaign).toBeDefined();
    expect(typography.campaign.extraLarge).toBeDefined();
  });

  it('matches snapshot', () => {
    expect(typography).toMatchSnapshot();
  });
});
```

### Accessibility Styles

Test that accessibility utilities:
- Provide screen reader only styles
- Include skip link styles
- Support focus indicators
- Match WCAG guidelines

**Example:**
```typescript
describe('Accessibility Utilities', () => {
  it('exports screen reader only style', () => {
    const srOnly = accessibility.screenReader.only;

    expect(srOnly.className).toBeDefined();
    expect(srOnly.position).toBe('absolute');
    expect(srOnly.width).toBe('1px');
    expect(srOnly.height).toBe('1px');
  });

  it('exports skip link style', () => {
    const skipLink = accessibility.skip.content;

    expect(skipLink.className).toBeDefined();
    expect(skipLink).toHaveProperty('position');
  });
});
```

## Mocked Dependencies

Minimal external dependencies:

- `postcss` → CSS processing (peer dependency, used but not tested directly)
- `postcss-js` → JSS to PostCSS conversion
- `postcss-nesting` → Nesting support
- `@universityofmaryland/web-token-library` → Design tokens (re-exported)

**Mocks are auto-generated** - see `/__mocks__/MOCKS.md` for details.

## Common Test Patterns

### Pattern 1: Snapshot Testing

```typescript
it('matches snapshot', () => {
  expect(styleObject).toMatchSnapshot();
});
```

### Pattern 2: Structure Testing

```typescript
it('exports required properties', () => {
  expect(styleObj).toHaveProperty('className');
  expect(styleObj).toHaveProperty('fontSize');
  expect(styleObj).toHaveProperty('lineHeight');
});
```

### Pattern 3: Transformation Testing

```typescript
it('transforms input to expected output', () => {
  const input = { '.class': { color: 'red' } };
  const output = transform(input);

  expect(output).toContain('.class');
  expect(output).toContain('color: red');
});
```

## Test Organization

```
__tests__/
├── TESTING.md                    # This file
├── typography/                   # Typography style tests
│   ├── campaign.test.ts
│   ├── sans.test.ts
│   ├── serif.test.ts
│   └── stats.test.ts
├── accessibility/                # Accessibility style tests
│   ├── screen-reader.test.ts
│   └── skip.test.ts
└── utilities/                    # Utility function tests
    ├── create/                   # Style creation utilities
    │   ├── jss.test.ts
    │   └── style.test.ts
    ├── transform/                # Transformation utilities
    │   ├── css.test.ts
    │   ├── jss.test.ts
    │   └── variables.test.ts
    └── dom/                      # DOM utilities
        └── tokens.test.ts
```

## Running Tests

```bash
# From package directory
npm test                 # Run all tests
npm run test:watch       # Watch mode
npm run test:coverage    # With coverage

# From repository root
npx lerna run test --scope=@universityofmaryland/web-styles-library
```

## Coverage Target

The Styles package maintains **90%+ test coverage**.

### Running Coverage

```bash
npm run test:coverage
```

## Best Practices

1. ✅ **Use snapshot tests** - For style object consistency
2. ✅ **Test transformations** - Verify JSS to CSS conversion
3. ✅ **Test all exports** - Ensure nothing is broken
4. ✅ **Document style purpose** - Explain why styles exist
5. ✅ **Test accessibility** - Verify WCAG compliance
6. ✅ **Keep tests simple** - Style tests should be straightforward

## Resources

- **Mock System Documentation**: `/__mocks__/MOCKS.md`
- **Package Documentation**: `/packages/styles/CLAUDE.md`
- **Jest Documentation**: https://jestjs.io/
- **PostCSS Documentation**: https://postcss.org/
- **Testing Philosophy**: `/__mocks__/MOCKS.md#testing-philosophy`

## Questions?

Review the comprehensive mock system documentation at `/__mocks__/MOCKS.md` for:
- Testing philosophy and strategy
- Mock generation details
- Troubleshooting guide
- Integration vs unit testing

# Tokens Package - Unit Testing Guide

## Overview

This directory contains **unit tests** for the Tokens package. These tests focus on verifying that design token exports have correct structure, types, and values. **This package has zero runtime dependencies**, so testing is straightforward.

## Testing Philosophy

### What to Test in This Package

✅ **Test OUR token exports:**
- Export structure and types
- Token value formats (strings, numbers, objects)
- Export availability (color, spacing, font, media)
- TypeScript type definitions
- Backwards compatibility

❌ **Don't test (nothing external to test):**
- This package has no external dependencies
- All tests verify our own token definitions

### Example: Testing Token Structure

```typescript
// ✅ GOOD: Testing OUR token structure
import { color } from '../color';

it('exports red color token', () => {
  expect(color.red).toBeDefined();
  expect(typeof color.red).toBe('string');
  expect(color.red).toMatch(/^#[0-9A-Fa-f]{6}$/);  // Valid hex color
});
```

## What We're Testing

### Color Tokens

Test that color tokens:
- Export correct structure
- Provide brand colors
- Include gray scale
- Use valid hex values

**Example:**
```typescript
// source/__tests__/color.test.ts
import { color, colorScale, baseColors } from '../color';

describe('Color Tokens', () => {
  it('exports UMD brand red', () => {
    expect(color.red).toBe('#E21833');
  });

  it('exports UMD brand gold', () => {
    expect(color.gold).toBe('#FFD200');
  });

  it('exports gray scale with accessibility compliant values', () => {
    expect(color.gray.mediumAA).toBe('#757575');  // WCAG AA compliant
  });

  it('exports base colors', () => {
    expect(color.white).toBe('#FFFFFF');
    expect(color.black).toBe('#000000');
  });

  it('provides colorScale export', () => {
    expect(colorScale).toBeDefined();
    expect(typeof colorScale).toBe('object');
  });

  it('provides baseColors export', () => {
    expect(baseColors).toHaveProperty('white');
    expect(baseColors).toHaveProperty('black');
  });
});
```

### Spacing Tokens

Test that spacing tokens:
- Export scale values
- Include maxWidth constraints
- Use consistent units

**Example:**
```typescript
// source/__tests__/spacing.test.ts
import spacing, { spacingScale, maxWidth } from '../spacing';

describe('Spacing Tokens', () => {
  it('exports spacing scale', () => {
    expect(spacing.min).toBe('8px');
    expect(spacing.xs).toBe('12px');
    expect(spacing.sm).toBe('16px');
    expect(spacing.md).toBe('24px');
    expect(spacing.lg).toBe('32px');
  });

  it('exports maxWidth constraints', () => {
    expect(spacing.maxWidth.smallest).toBe('800px');
    expect(spacing.maxWidth.normal).toBe('1280px');
  });

  it('provides spacingScale export', () => {
    expect(spacingScale).toBeDefined();
    expect(spacingScale[0]).toBe(0);
    expect(typeof spacingScale[1]).toBe('number');
  });
});
```

### Font Tokens

Test that font tokens:
- Export font sizes
- Export font weights
- Export font families
- Use correct formats

**Example:**
```typescript
// source/__tests__/font.test.ts
import * as font from '../font';

describe('Font Tokens', () => {
  it('exports font sizes', () => {
    expect(font.size.min).toBe('12px');
    expect(font.size.base).toBe('16px');
    expect(font.size.lg).toBe('18px');
  });

  it('exports font weights', () => {
    expect(font.weight.normal).toBe('400');
    expect(font.weight.bold).toBe('700');
  });

  it('exports font families', () => {
    expect(font.family.sans).toContain('Interstate');
    expect(font.family.serif).toContain('Crimson Pro');
    expect(font.family.campaign).toContain('Barlow Condensed');
  });

  it('uses string values for sizes', () => {
    Object.values(font.size).forEach(size => {
      expect(typeof size).toBe('string');
      expect(size).toMatch(/^\d+px$/);
    });
  });
});
```

### Media Query Tokens

Test that media tokens:
- Export breakpoint values
- Export query strings
- Provide conditional helpers

**Example:**
```typescript
// source/__tests__/media.test.ts
import * as media from '../media';

describe('Media Query Tokens', () => {
  it('exports breakpoint values', () => {
    expect(media.breakpointValues.tablet).toBe(768);
    expect(media.breakpointValues.desktop).toBe(1024);
  });

  it('exports breakpoints with units', () => {
    expect(media.breakpoints.tablet.min).toBe('768px');
    expect(media.breakpoints.desktop.min).toBe('1024px');
  });

  it('exports query strings', () => {
    expect(media.queries.tablet.min).toContain('min-width');
    expect(media.queries.tablet.min).toContain('768px');
  });

  it('exports conditionals for container queries', () => {
    expect(media.conditionals).toBeDefined();
  });
});
```

## No Mocked Dependencies

This package has **zero dependencies**, so no mocks are needed. All tests verify actual token values.

## Common Test Patterns

### Pattern 1: Value Testing

```typescript
it('exports expected value', () => {
  expect(token.someValue).toBe('expected-value');
});
```

### Pattern 2: Structure Testing

```typescript
it('exports nested object structure', () => {
  expect(token.nested).toHaveProperty('child');
  expect(token.nested.child).toBeDefined();
});
```

### Pattern 3: Type Testing

```typescript
it('exports correct type', () => {
  expect(typeof token.value).toBe('string');
  expect(Array.isArray(token.array)).toBe(true);
});
```

### Pattern 4: Format Validation

```typescript
it('uses correct format', () => {
  expect(token.color).toMatch(/^#[0-9A-Fa-f]{6}$/);  // Hex color
  expect(token.spacing).toMatch(/^\d+px$/);          // Pixel value
});
```

## Test Organization

```
__tests__/
├── TESTING.md          # This file
├── color.test.ts       # Color token tests
├── spacing.test.ts     # Spacing token tests
├── font.test.ts        # Font token tests
└── media.test.ts       # Media query token tests
```

## Running Tests

```bash
# From package directory
npm test                 # Run all tests
npm run test:watch       # Watch mode
npm run test:coverage    # With coverage

# From repository root
npx lerna run test --scope=@universityofmaryland/web-token-library
```

## Future: Figma Integration Testing

When Figma integration is implemented (Phase 2+), add tests for:

- Token synchronization
- Format transformation
- Validation against schema
- Backwards compatibility
- Version control

See `/packages/tokens/plan.md` for Figma integration roadmap.

## Best Practices

1. ✅ **Test all exports** - Verify each token category
2. ✅ **Validate formats** - Ensure values match expected patterns
3. ✅ **Test types** - Verify TypeScript types are correct
4. ✅ **Document values** - Explain why specific values are used
5. ✅ **Test consistency** - Verify related tokens align (e.g., spacing scale)

## Resources

- **Package Documentation**: `/packages/tokens/CLAUDE.md`
- **Figma Integration Plan**: `/packages/tokens/plan.md`
- **Mock System Documentation**: `/__mocks__/MOCKS.md`
- **Jest Documentation**: https://jestjs.io/

## Questions?

Review the package documentation at `/packages/tokens/CLAUDE.md` for:
- Token organization
- Export patterns
- Future Figma integration
- TypeScript types

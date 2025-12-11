# Icons Package - Unit Testing Guide

## Overview

This directory contains **unit tests** for the Icons package. These tests focus on verifying that SVG icon exports are valid, properly formatted, and accessible. **This package has zero dependencies**, so testing validates our icon assets.

## Testing Philosophy

### What to Test in This Package

✅ **Test OUR icon exports:**
- Icon export availability
- SVG string validity
- Accessibility attributes (aria-hidden, title)
- SVG structure (viewBox, paths)
- Category organization

❌ **Don't test (nothing external to test):**
- This package has no runtime dependencies
- All tests verify our own icon definitions

### Example: Testing Icon Structure

```typescript
// ✅ GOOD: Testing OUR icon exports
import { CHEVRON_SMALL } from '../navigation';

it('exports chevron icon as valid SVG', () => {
  expect(CHEVRON_SMALL).toBeDefined();
  expect(CHEVRON_SMALL).toContain('<svg');
  expect(CHEVRON_SMALL).toContain('</svg>');
});
```

## What We're Testing

### Icon Availability

Test that icons:
- Export from correct categories
- Use consistent naming
- Are available as strings

**Example:**
```typescript
// source/__tests__/navigation.test.ts
import {
  CHEVRON_SMALL,
  ARROW_UP,
  ARROW_LEFT,
  ARROW_RIGHT
} from '../navigation';

describe('Navigation Icons', () => {
  it('exports chevron icon', () => {
    expect(CHEVRON_SMALL).toBeDefined();
    expect(typeof CHEVRON_SMALL).toBe('string');
  });

  it('exports arrow icons', () => {
    expect(ARROW_UP).toBeDefined();
    expect(ARROW_LEFT).toBeDefined();
    expect(ARROW_RIGHT).toBeDefined();
  });
});
```

### SVG Validity

Test that SVG strings:
- Are well-formed
- Include viewBox
- Contain paths or shapes
- Use proper SVG namespace

**Example:**
```typescript
// source/__tests__/controls.test.ts
import { CLOSE, PLAY, PAUSE } from '../controls';

describe('Control Icons - SVG Validity', () => {
  it('exports valid SVG structure', () => {
    expect(CLOSE).toContain('<svg');
    expect(CLOSE).toContain('viewBox');
    expect(CLOSE).toContain('</svg>');
  });

  it('includes SVG paths or shapes', () => {
    expect(PLAY).toMatch(/<path|<circle|<rect|<polygon/);
  });

  it('is properly formatted XML', () => {
    expect(() => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(PAUSE, 'image/svg+xml');
      const errors = doc.querySelector('parsererror');
      expect(errors).toBeNull();
    }).not.toThrow();
  });
});
```

### Accessibility

Test that icons:
- Include aria-hidden attribute
- Have title elements
- Support screen readers
- Are properly labeled

**Example:**
```typescript
// source/__tests__/accessibility.test.ts
import { CLOSE, SEARCH, ALERT } from '../';

describe('Icon Accessibility', () => {
  it('includes aria-hidden for decorative icons', () => {
    expect(CLOSE).toContain('aria-hidden="true"');
  });

  it('includes title element for context', () => {
    expect(SEARCH).toContain('<title>');
    expect(SEARCH).toContain('</title>');
  });

  it('has unique IDs to prevent conflicts', () => {
    expect(ALERT).toMatch(/id="[^"]+"/);
  });
});
```

### Logo Exports

Test that logo variations:
- Export all variants (dark, light)
- Include campaign logos
- Maintain brand compliance

**Example:**
```typescript
// source/__tests__/logos.test.ts
import * as UMDLogos from '../logos';

describe('UMD Logos', () => {
  it('exports UMD logo variants', () => {
    expect(UMDLogos.umd.dark).toBeDefined();
    expect(UMDLogos.umd.light).toBeDefined();
  });

  it('exports Forward logo variants', () => {
    expect(UMDLogos.forward.dark).toBeDefined();
    expect(UMDLogos.forward.light).toBeDefined();
  });

  it('all logos are valid SVG', () => {
    const allLogos = Object.values(UMDLogos).flatMap(Object.values);
    allLogos.forEach(logo => {
      expect(logo).toContain('<svg');
      expect(logo).toContain('</svg>');
    });
  });
});
```

## Icon Categories

Test organization by category:

```
__tests__/
├── TESTING.md          # This file
├── arrows.test.ts      # Directional arrows
├── controls.test.ts    # UI controls (close, play, pause)
├── indicators.test.ts  # Alerts and warnings
├── calendar.test.ts    # Time and date icons
├── files.test.ts       # Document icons
├── search.test.ts      # Search icons
├── media.test.ts       # Media type icons
├── brand.test.ts       # UMD brand icons
├── people.test.ts      # User and profile icons
├── location.test.ts    # Location and map icons
├── communication.test.ts # Email, phone icons
├── social.test.ts      # Social media icons
└── logos.test.ts       # UMD logo variants
```

## No Mocked Dependencies

This package has **zero dependencies**, so no mocks are needed. All tests verify actual icon SVG strings generated from Figma.

## Common Test Patterns

### Pattern 1: Export Availability

```typescript
it('exports icon', () => {
  expect(ICON_NAME).toBeDefined();
  expect(typeof ICON_NAME).toBe('string');
});
```

### Pattern 2: SVG Structure

```typescript
it('contains valid SVG', () => {
  expect(icon).toContain('<svg');
  expect(icon).toContain('viewBox');
  expect(icon).toContain('</svg>');
});
```

### Pattern 3: Accessibility Attributes

```typescript
it('includes accessibility attributes', () => {
  expect(icon).toContain('aria-hidden="true"');
  expect(icon).toContain('<title>');
});
```

### Pattern 4: Category Batch Testing

```typescript
const allIcons = { ICON1, ICON2, ICON3 };

it('all icons are valid SVG', () => {
  Object.values(allIcons).forEach(icon => {
    expect(icon).toContain('<svg');
    expect(icon).toContain('</svg>');
  });
});
```

## Running Tests

```bash
# From package directory
npm test                 # Run all tests
npm run test:watch       # Watch mode
npm run test:coverage    # With coverage

# From repository root
npx lerna run test --scope=@universityofmaryland/web-icons-library
```

## Icon Source: Figma

All icons are **generated from Figma design files**. Tests should not be manually updated - instead:

1. **Update Figma** - Make changes in design files
2. **Regenerate icons** - Run Figma export script (when available)
3. **Run tests** - Verify new icons pass validation

**Note**: Direct modifications to icon files may be overwritten during next Figma sync.

## Best Practices

1. ✅ **Test all exports** - Verify each icon in category
2. ✅ **Validate SVG** - Ensure well-formed XML
3. ✅ **Check accessibility** - Verify ARIA attributes
4. ✅ **Batch test** - Test all icons in category together
5. ✅ **Document purpose** - Explain what each icon represents

## Resources

- **Package Documentation**: `/packages/icons/CLAUDE.md`
- **Mock System Documentation**: `/__mocks__/MOCKS.md`
- **Accessibility Guidelines**: WCAG 2.1 AA standards
- **Jest Documentation**: https://jestjs.io/

## Questions?

Review the package documentation at `/packages/icons/CLAUDE.md` for:
- Icon organization
- Export patterns
- Figma source information
- Accessibility guidelines
- Usage examples

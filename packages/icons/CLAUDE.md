# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with the UMD Icons Library package.

## Project Overview

The University of Maryland Web Icons Library is a standalone icon package that provides SVG icons and logos organized by category for optimal tree-shaking. This package was created to separate icon assets from the elements package and provide better organization for selective imports.

## Build Commands

```bash
# Development - watch mode with Vite
npm start
# or
npm run dev

# Production build
npm run build

# Clean build artifacts
npm run clean

# Publish to npm (includes build)
npm run release

# Testing
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # With coverage report
```

## Architecture

### Package Purpose

This package serves as the centralized icon library for the UMD Design System. It:
- Provides SVG icons and logos as string exports
- Enables selective imports to minimize bundle sizes
- Organizes icons by semantic categories
- Maintains accessibility standards (aria-hidden, title attributes)
- Supports TypeScript with full type definitions

### Directory Structure

Icons are organized by category for logical grouping and selective imports:

```
source/
├── index.ts              # Main barrel export
├── navigation/           # Navigation and directional icons
│   └── index.ts
├── ui-controls/          # UI control icons (play, pause, close, etc.)
│   └── index.ts
├── communication/        # Communication icons (email, phone)
│   └── index.ts
├── documents/            # Document-related icons
│   └── index.ts
├── time/                 # Time and calendar icons
│   └── index.ts
├── media/                # Media-related icons
│   └── index.ts
├── alerts/               # Alert and notification icons
│   └── index.ts
├── search/               # Search icons
│   └── index.ts
├── logos/                # UMD logo assets
│   └── index.ts
├── social/               # Social media platform icons
│   └── index.ts
├── brand/                # UMD brand-specific icons
│   └── index.ts
├── user/                 # User and profile icons
│   └── index.ts
├── location/             # Location and map icons
│   └── index.ts
├── content/              # Content type indicators
│   └── index.ts
└── __tests__/           # Test files
    ├── index.test.ts
    ├── navigation.test.ts
    ├── logos.test.ts
    └── social.test.ts
```

## Key Patterns

### Icon Export Pattern

Each icon is exported as a constant string containing SVG markup:

```typescript
/**
 * Category Name Icons
 *
 * Brief description of the category
 */

export const ICON_NAME = `<svg title="icon description" id="icon_id" aria-hidden="true" ...>...</svg>`;
```

### Icon Requirements

All icons must:
1. Be exported as `const` with UPPER_SNAKE_CASE naming
2. Include `aria-hidden="true"` attribute
3. Include a descriptive `title` attribute
4. Include a unique `id` attribute (prefixed with `icon_` or `icon-`)
5. Be valid SVG markup as a template literal string
6. Include JSDoc comments in category files

### Category Organization

When adding new icons or creating categories:

1. **Choose the right category** - Place icons in the most semantically appropriate category
2. **Keep categories focused** - Each category should have a clear, specific purpose
3. **Export from category index** - All icons in a category must be exported from `index.ts`
4. **Update main index** - Main `index.ts` must re-export all category exports
5. **Update vite.config.ts** - Add new categories to build entry points
6. **Update package.json** - Add export paths for new categories
7. **Document in README** - Update the Icon Categories section

### Selective Imports

The package supports multiple import patterns:

```typescript
// Category-based imports (preferred for multiple icons)
import { ARROW, CHEVRON_SMALL } from '@universityofmaryland/web-icons-library/navigation';

// Individual category namespace
import * as Navigation from '@universityofmaryland/web-icons-library/navigation';

// Main export (less optimal for tree-shaking)
import { ARROW, FACEBOOK } from '@universityofmaryland/web-icons-library';
```

### Adding New Icons

When adding a new icon:

1. **Determine the category** - Which category does this icon belong to?
2. **Add to category file** - Add the export to `source/[category]/index.ts`
3. **Follow naming convention** - Use UPPER_SNAKE_CASE
4. **Include accessibility attributes** - `aria-hidden="true"` and `title`
5. **Add tests** - Create/update tests in `__tests__/[category].test.ts`
6. **Update README** - Add to the appropriate category list

Example workflow:
```typescript
// 1. Add to source/navigation/index.ts
export const DOWN_ARROW = `<svg title="down arrow icon" id="icon-down-arrow" aria-hidden="true" ...>...</svg>`;

// 2. Icon automatically exported via main index.ts (already imports * from navigation)

// 3. Add test to __tests__/navigation.test.ts
it('should export DOWN_ARROW icon', () => {
  expect(NavigationIcons.DOWN_ARROW).toBeDefined();
  expect(NavigationIcons.DOWN_ARROW).toContain('<svg');
});

// 4. Update README.md in the Navigation section
```

## Testing Strategy

### Test Organization

Tests are co-located in `__tests__/` directory with one file per category plus a main index test.

### Test Coverage Requirements

- All icon exports must be tested
- Tests should verify:
  - Icon is defined
  - Icon contains `<svg` tag
  - Icon has correct id attribute
  - Icon has `aria-hidden="true"` attribute
  - Category barrel exports work correctly

### Test Pattern

```typescript
import * as CategoryIcons from '../category';

describe('Category Icons', () => {
  it('should export ICON_NAME', () => {
    expect(CategoryIcons.ICON_NAME).toBeDefined();
    expect(CategoryIcons.ICON_NAME).toContain('<svg');
    expect(CategoryIcons.ICON_NAME).toContain('icon-id');
  });

  it('should have aria-hidden on all icons', () => {
    const icons = Object.values(CategoryIcons);
    icons.forEach(icon => {
      expect(icon).toContain('aria-hidden="true"');
    });
  });
});
```

## TypeScript Configuration

- Strict mode enabled
- Target: ES2020
- Module: ESNext
- Declaration files generated with source maps
- Extends base tsconfig from monorepo root

## Build System

### Vite Configuration

The package uses Vite for:
- Fast builds with hot module replacement
- Tree-shaking and code splitting
- TypeScript compilation
- Declaration file generation

### Build Outputs

- `dist/index.js` - CommonJS main entry
- `dist/index.mjs` - ESM module entry
- `dist/index.d.ts` - TypeScript declarations
- `dist/[category]/` - Individual category builds

### Entry Points

Each icon category is a separate entry point for optimal tree-shaking:
```typescript
// vite.config.ts
entry: {
  index: resolve(__dirname, 'source/index.ts'),
  navigation: resolve(__dirname, 'source/navigation/index.ts'),
  'ui-controls': resolve(__dirname, 'source/ui-controls/index.ts'),
  // ... other categories
}
```

## Best Practices

### Code Style

- Use `const` for all icon exports
- Use template literals for SVG strings
- Use UPPER_SNAKE_CASE for icon names
- Include JSDoc comments for categories
- Keep SVG markup on a single line

### Icon Guidelines

- All icons must be accessibility-compliant
- Include descriptive titles
- Use semantic id attributes
- Ensure SVG viewBox is properly set
- Remove unnecessary SVG attributes (xmlns not required for inline SVG)

### Documentation

- Every category file should have a JSDoc comment
- README must list all available icons by category
- Include usage examples for new patterns
- Document accessibility considerations

### Maintenance

- Regularly audit for unused icons
- Keep category organization logical
- Maintain consistent naming patterns
- Update tests when adding/removing icons

## Common Tasks

### Adding a New Category

1. Create directory: `source/new-category/`
2. Create index file: `source/new-category/index.ts`
3. Add icons with proper exports
4. Update `source/index.ts` to export from new category
5. Update `vite.config.ts` entry points
6. Update `package.json` exports field
7. Create test file: `__tests__/new-category.test.ts`
8. Update README documentation

### Migrating Icons from Other Packages

1. Identify icons to migrate
2. Determine appropriate category
3. Copy SVG markup
4. Ensure accessibility attributes present
5. Create exports with proper naming
6. Write tests
7. Update documentation

## Icon Accessibility

All icons in this library follow these accessibility principles:

1. **Decorative Icons**: Use `aria-hidden="true"` - icons should not be announced by screen readers
2. **Semantic Meaning**: When icons convey meaning, provide alternative text in implementation
3. **Visual Context**: Include `title` attributes for visual users
4. **Focus Management**: Icons within interactive elements should have proper ARIA labels on the parent

Example implementation:
```html
<!-- Icon is decorative, button has accessible label -->
<button aria-label="Close dialog">
  ${CLOSE_BUTTON}
</button>
```

## Integration with Monorepo

This package integrates with the existing Lerna setup:
- Uses Yarn workspaces
- Follows same build patterns as other packages
- Uses shared Jest and TypeScript configurations
- Follows same versioning strategy

Other packages can depend on this package for their icon needs:
```json
{
  "dependencies": {
    "@universityofmaryland/web-icons-library": "^1.0.0"
  }
}
```

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

The University of Maryland Web Utilities Library is a foundational package that provides shared utility functions for all UMD Design System packages. It consolidates and organizes utility functions from the components, elements, feeds, and styles packages into a single, well-structured library with selective import capabilities.

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

This package serves as the foundation for utility functions across the UMD Design System. It:
- Provides a centralized location for all utility functions
- Enables selective imports to minimize bundle sizes
- Establishes clear organizational patterns for different types of utilities
- Serves as a dependency for components, elements, feeds, and styles packages
- Removes code duplication and improves maintainability

### No Backward Compatibility

This is a greenfield package. We are NOT maintaining backward compatibility with how utilities currently work in their original packages. This means:
- Function signatures can be improved
- Better naming conventions can be adopted
- Code can be refactored for clarity
- Modern JavaScript/TypeScript patterns should be used
- Dependencies on package-specific code should be removed or abstracted

### Directory Structure

Utilities are organized by category for logical grouping and selective imports:

```
source/
├── index.ts              # Main barrel export
├── dom/                  # DOM manipulation utilities
│   ├── index.ts
│   ├── addClass.ts
│   ├── removeClass.ts
│   └── ...
├── string/               # String processing utilities
│   ├── index.ts
│   ├── capitalize.ts
│   └── ...
├── array/                # Array utilities
│   ├── index.ts
│   └── ...
├── object/               # Object manipulation utilities
│   ├── index.ts
│   └── ...
└── __tests__/           # Test files
    ├── dom/
    ├── string/
    └── ...
```

## Key Patterns

### Utility Function Pattern

Each utility should:
1. Be a pure function when possible (no side effects)
2. Have a single, well-defined purpose
3. Be fully typed with TypeScript
4. Include JSDoc comments with examples
5. Have comprehensive test coverage

Example structure:
```typescript
/**
 * Brief description of what the utility does
 *
 * @param param1 - Description of parameter
 * @param param2 - Description of parameter
 * @returns Description of return value
 *
 * @example
 * ```typescript
 * const result = utilityName(arg1, arg2);
 * // result: expected output
 * ```
 */
export const utilityName = (param1: Type1, param2: Type2): ReturnType => {
  // Implementation
  return result;
};
```

### Category Organization

When adding new utilities or organizing existing ones:

1. **Choose the right category** - Place utilities in the most logical category
2. **Keep categories focused** - Each category should have a clear theme
3. **Avoid deep nesting** - Maximum 2 levels of nesting preferred
4. **Export from category index** - Each category has an index.ts that exports all utilities
5. **Update main index** - Main index.ts re-exports all category exports

### Selective Imports

The package supports two import patterns:

```typescript
// Category-based imports (preferred for multiple utilities)
import { addClass, removeClass } from '@universityofmaryland/web-utilities-library/dom';
import { capitalize, truncate } from '@universityofmaryland/web-utilities-library/string';

// Individual utility imports (maximum tree-shaking)
import { addClass } from '@universityofmaryland/web-utilities-library/dom/addClass';

// Main export (for convenience, but less optimal for tree-shaking)
import { addClass, capitalize } from '@universityofmaryland/web-utilities-library';
```

### Adding New Utilities

When adding a new utility:

1. **Determine the category** - Which category does this utility belong to?
2. **Create the utility file** - Follow the naming convention (camelCase.ts)
3. **Write the implementation** - Pure functions, proper types, JSDoc comments
4. **Export from category index** - Add to the category's index.ts
5. **Update Vite config** - Add category to build entry points if it's new
6. **Update package.json exports** - Add export path for the category
7. **Write tests** - Comprehensive test coverage in __tests__/[category]/
8. **Update plan.md** - Document the new utility in the architecture section

Example workflow:
```typescript
// 1. Create source/validation/isEmail.ts
export const isEmail = (value: string): boolean => {
  // Implementation
};

// 2. Update source/validation/index.ts
export { isEmail } from './isEmail';

// 3. If validation is new, update vite.config.ts entry points
// 4. If validation is new, update package.json exports
// 5. Create source/__tests__/validation/isEmail.test.ts
// 6. Update plan.md
```

## Testing Strategy

### Test Organization

Tests mirror the source structure:
```
source/__tests__/
├── dom/
│   ├── addClass.test.ts
│   └── removeClass.test.ts
├── string/
│   └── capitalize.test.ts
└── ...
```

### Test Coverage Requirements

- **100% coverage** for all utility functions
- Tests should cover:
  - Happy path scenarios
  - Edge cases (empty inputs, null, undefined)
  - Error conditions
  - Type checking (TypeScript compilation)
  - Browser-specific behavior (if applicable)

### Test Pattern

```typescript
describe('utilityName', () => {
  describe('happy path', () => {
    it('should perform expected behavior with valid inputs', () => {
      // Test implementation
    });
  });

  describe('edge cases', () => {
    it('should handle empty input', () => {
      // Test implementation
    });

    it('should handle null/undefined', () => {
      // Test implementation
    });
  });

  describe('error conditions', () => {
    it('should throw appropriate error for invalid input', () => {
      // Test implementation
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

Each utility category is a separate entry point for optimal tree-shaking:
```typescript
// vite.config.ts
entry: {
  index: resolve(__dirname, 'source/index.ts'),
  dom: resolve(__dirname, 'source/dom/index.ts'),
  string: resolve(__dirname, 'source/string/index.ts'),
  // ... other categories
}
```

## Best Practices

### Code Style

- Use const for all declarations when possible
- Prefer arrow functions for utilities
- Use descriptive variable names
- Keep functions small and focused (Unix philosophy)
- Avoid abbreviations unless they're well-known (e.g., DOM, HTML)

### Documentation

- Every exported function must have JSDoc comments
- Include @param and @returns tags
- Provide at least one @example
- Explain edge cases or gotchas in the description

### Type Safety

- Avoid `any` type unless absolutely necessary
- Use strict type checking
- Prefer type guards over type assertions
- Use generics when appropriate

### Dependencies

- Avoid external dependencies when possible
- If a dependency is needed, justify it in PR/commit
- Keep the package lightweight

## Common Pitfalls

### ❌ Don't Do This

```typescript
// Importing package-specific code
import { Component } from '@universityofmaryland/web-components-library';

// Side effects in utilities
export const addListener = (element: HTMLElement) => {
  element.addEventListener('click', () => console.log('clicked'));
};

// Utilities that depend on other utilities without proper organization
// (creates tight coupling)
```

### ✅ Do This Instead

```typescript
// Pure, standalone utilities
export const addClass = (element: HTMLElement, className: string): void => {
  element.classList.add(className);
};

// Clearly defined dependencies within the same category
import { normalize } from './normalize';

export const capitalize = (str: string): string => {
  return normalize(str).charAt(0).toUpperCase() + normalize(str).slice(1);
};
```

## Migration Guidelines

When migrating utilities from other packages:

1. **Identify the utility** - Find utilities that are truly reusable
2. **Check for dependencies** - Identify dependencies on other code
3. **Refactor if needed** - Remove package-specific dependencies
4. **Categorize** - Determine the correct category
5. **Rename if needed** - Use better naming conventions
6. **Add types** - Ensure full TypeScript coverage
7. **Document** - Add comprehensive JSDoc comments
8. **Test** - Write complete test coverage
9. **Update CHANGELOG** - Document what was migrated

## Architectural Decisions

### Why Vite?

- Fast builds and hot module replacement
- Excellent tree-shaking capabilities
- Native ESM support
- Simple configuration
- Great TypeScript support

### Why Selective Imports?

- Minimizes bundle sizes for consumers
- Enables better code splitting
- Makes it clear which utilities are being used
- Supports both category and individual imports

### Why No External Dependencies?

- Keeps package lightweight
- Reduces security vulnerabilities
- Simplifies maintenance
- Utilities should be simple enough to implement directly

### Why Comprehensive Testing?

- Utilities are foundational - they must be reliable
- Tests serve as documentation
- Prevents regressions during refactoring
- Builds confidence in the package

## Future Considerations

### Planned Migrations

1. ✅ Components package utilities (Steps 4-5)
2. ✅ Elements package utilities (Steps 6-7)
3. ⏳ Feeds package utilities (Future work)
4. ⏳ Styles package utilities (Future work)

### Actual Categories (Based on Analysis)

After analyzing the components and elements packages, these categories have been identified:

1. **`accessibility/`** - Focus management, zoom detection, reduced motion checks
2. **`animation/`** - Element animations, scroll behaviors, link span wrapping
3. **`date/`** - Date formatting and comparison utilities
4. **`dom/`** - DOM manipulation (addClass, removeClass, findParent, cleanCopy, etc.)
5. **`elements/`** - Element creation helpers (slots, links, style templates)
6. **`events/`** - Event handling (swipe detection, etc.)
7. **`media/`** - Image/SVG utilities, responsive sizing
8. **`network/`** - GraphQL and API fetch wrappers
9. **`performance/`** - Debounce, throttle, and optimization utilities
10. **`storage/`** - localStorage wrappers
11. **`string/`** - String processing (capitalize, truncate, etc.)
12. **`styles/`** - CSS-in-JS conversion, media queries, style combination
13. **`validation/`** - Input and accessibility validation

See `ANALYSIS.md` for complete details on each utility function.

## Integration with Monorepo

This package integrates with the existing Lerna setup:
- Uses Yarn workspaces
- Follows same build patterns as other packages
- Uses shared Jest and TypeScript configurations
- Follows same versioning strategy

Other packages will eventually depend on this package for their utility functions.
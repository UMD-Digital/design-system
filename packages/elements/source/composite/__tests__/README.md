# Composite Component Tests

This directory contains tests for the composite components in the elements package.

## Test Structure

### Type Tests (`types/`)
- `type-compilation.test.ts` - Verifies that TypeScript interfaces compile correctly and follow our explicit typing pattern
- Tests ensure that card and hero interfaces have the correct properties and type constraints

### Component Tests
Tests for individual component implementations would go in their respective directories:
- `card/` - Tests for card components (block, list, overlay)
- `hero/` - Tests for hero components (standard, minimal, overlay, stacked, logo)

### Test Helpers (`test-helpers/`)
- `setup.ts` - DOM mocking and test environment setup
- `element.ts` - Helper functions for creating test elements and validating structures

## Testing Approach

Due to the modular architecture and module resolution in this monorepo, we focus on:

1. **Type Safety Tests** - Ensuring interfaces are properly defined and follow the explicit typing pattern
2. **Mock-based Integration Tests** - Using the mock infrastructure in `__mocks__/` to test component behavior
3. **Unit Tests** - Testing individual functions and utilities where possible

## Running Tests

```bash
# Run all tests in this directory
npm test -- __tests__/

# Run specific test suites
npm test -- __tests__/types/
npm test -- __tests__/card/
npm test -- __tests__/hero/
```

## Mock Infrastructure

The repository includes comprehensive mocks in the root `__mocks__/` directory:
- `webElementsLibrary.js` - Complete mock of the elements library
- `webStylesLibrary.js` - Mock of the styles library
- `elements.js` - Legacy element creation helpers

These mocks are automatically used by Jest when testing components that import from these packages.
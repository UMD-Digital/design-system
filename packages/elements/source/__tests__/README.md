# Elements Package Test Structure

This directory contains the centralized test infrastructure for the elements package.

## Directory Structure

```
__tests__/
├── helpers/      # Test utility functions and helpers
│   ├── element.ts   # Element creation and validation utilities
│   └── setup.ts     # Test environment setup and global mocks
├── mocks/        # Mock implementations for external dependencies
├── fixtures/     # Test data and sample configurations
└── utils/        # Additional testing utilities
```

## Usage

### Importing Test Helpers

```typescript
import { createElement, validateElementStructure } from '@/source/__tests__/helpers/element';
import '@/source/__tests__/helpers/setup'; // Import for global test setup
```

### Running Tests

Tests are organized alongside their source files in `__tests__` directories throughout the codebase.

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run a specific test file
npm test -- path/to/test.test.ts
```

## Test Patterns

### Element Testing
- Use `createElement` to create test DOM elements
- Use `validateElementStructure` to verify element properties
- Use `createMockElementModel` for mocking ElementModel returns

### Component Testing
- Mock external dependencies using the mocks directory
- Test component creation, updates, and destruction
- Verify DOM structure and event handling

### Type Testing
- Compile-time type checking tests
- Runtime type validation tests
- Interface compatibility tests
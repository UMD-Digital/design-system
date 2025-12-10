# Mock System Documentation

## Overview

The UMD Design System uses auto-generated Jest mocks to enable isolated package testing without circular dependencies. This document explains how the mock system works, how to generate mocks, and best practices for testing.

## Purpose and Benefits

### Why Mocks?

In a monorepo with interdependent packages, testing individual packages can be challenging:

1. **Circular Dependencies**: Package A depends on Package B, which depends on Package A
2. **Build Order**: Tests may run before dependent packages are built
3. **Test Isolation**: Unit tests should test only the package's own code
4. **Performance**: Loading real packages with all dependencies slows down tests

### Solution: Auto-Generated Mocks

Our mock system:
- **Auto-generates** mocks from built packages
- **Preserves structure** of exports (objects, functions, classes)
- **Converts functions** to `jest.fn()` for easy testing
- **Maintains values** for design tokens and constants
- **Enables isolation** by mocking external dependencies

## How It Works

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Build Process                            │
├─────────────────────────────────────────────────────────────┤
│  1. Build packages in dependency order                       │
│     tokens → styles → utilities → builder → elements         │
│                                                               │
│  2. Generate mocks from built outputs                        │
│     source/generate-mocks.js reads dist/index.js             │
│                                                               │
│  3. Create mock files in __mocks__/                          │
│     webTokenLibrary.js, webStylesLibrary.js, etc.            │
│                                                               │
│  4. Jest uses mocks via moduleNameMapper                     │
│     jest.config.js maps @universityofmaryland/* to mocks     │
└─────────────────────────────────────────────────────────────┘
```

### Mock Generation Flow

```javascript
// 1. Load built package
const packageExports = require('packages/tokens/dist/index.js');

// 2. Transform to mock structure
const mockContent = mockifyValue(packageExports);
// Functions → jest.fn()
// Objects → preserved structure
// Values → preserved (strings, numbers, etc.)

// 3. Write to __mocks__/
fs.writeFileSync('__mocks__/webTokenLibrary.js', mockContent);

// 4. Jest maps imports to mocks
moduleNameMapper: {
  '^@universityofmaryland/web-token-library$': './__mocks__/webTokenLibrary.js'
}
```

## Mock Generation Script

### Location

`source/generate-mocks.js`

### Configuration

The script uses a configuration array to define which packages to mock:

```javascript
const PACKAGES_TO_MOCK = [
  {
    name: 'tokens',                                    // Package folder name
    npmName: '@universityofmaryland/web-token-library', // NPM package name
    mockFileName: 'webTokenLibrary.js',                // Output mock filename
    distPath: 'packages/tokens/dist/index.js',         // Built package path
    description: 'Design tokens (colors, spacing...)', // Purpose description
    specialHandlers: {                                 // Optional: custom handling
      'functionName': true,                            // Mark for special treatment
      'ClassName': 'class',                            // Mark as class
    },
  },
  // ... more packages
];
```

### Running Mock Generation

```bash
# Generate all mocks (from repository root)
npm run generate:mocks

# Or run script directly
node source/generate-mocks.js
```

### Output

```
============================================================
UMD Design System - Mock Generation
============================================================

Generating mock for @universityofmaryland/web-token-library...
✅ Mock generated successfully at __mocks__/webTokenLibrary.js

Generating mock for @universityofmaryland/web-styles-library...
✅ Mock generated successfully at __mocks__/webStylesLibrary.js

...

============================================================
Summary
============================================================
✅ Successfully generated: 8 mocks
   - tokens
   - styles
   - utilities
   - builder
   - model
   - elements
   - feeds
   - components

✨ Mock generation complete!
```

## Generated Mocks

### Directory Structure

```
__mocks__/
├── webTokenLibrary.js       - Design tokens
├── webStylesLibrary.js      - Style objects and tokens
├── webUtilitiesLibrary.js   - Utility functions
├── webBuilderLibrary.js     - Element builder
├── webModelLibrary.js       - Web component model
├── webElementsLibrary.js    - Element builders
├── webFeedsLibrary.js       - Feed components
├── webComponentsLibrary.js  - Web components
├── elements.js              - Legacy element helpers
└── macros.js                - Legacy UI macros
```

### Mock File Structure

Each generated mock follows this pattern:

```javascript
// This file is auto-generated by source/generate-mocks.js
// Do not edit manually. Run 'npm run generate:mocks' to regenerate.
//
// Mock for: @universityofmaryland/web-token-library
// Description: Design tokens (colors, spacing, fonts, media queries)

module.exports = {
  color: {
    red: '#E21833',      // Values preserved
    gold: '#FFD200',
    gray: {
      dark: '#454545'
    }
  },
  spacing: {
    md: '24px',
    lg: '32px'
  },
  font: {
    size: { /* ... */ },
    weight: { /* ... */ }
  },
  // Functions converted to jest.fn()
  someFunction: jest.fn(),
  // Classes converted to mock implementations
  SomeClass: jest.fn().mockImplementation(function(...args) {
    return { __mockClass: 'SomeClass', args };
  })
};
```

## Jest Configuration

### moduleNameMapper

`jest.config.js` maps package imports to mocks:

```javascript
moduleNameMapper: {
  '^@universityofmaryland/web-token-library$': path.resolve(
    __dirname,
    './__mocks__/webTokenLibrary.js',
  ),
  '^@universityofmaryland/web-styles-library$': path.resolve(
    __dirname,
    './__mocks__/webStylesLibrary.js',
  ),
  '^@universityofmaryland/web-builder-library$': path.resolve(
    __dirname,
    './__mocks__/webBuilderLibrary.js',
  ),
  // ... other packages
}
```

### How Jest Uses Mocks

When a test imports a package:

```typescript
// In a test file
import { color } from '@universityofmaryland/web-token-library';

// Jest intercepts and redirects to:
const { color } = require('./__mocks__/webTokenLibrary.js');
```

## Mock Transformation Rules

### Functions

```javascript
// Original
export function myFunction(arg) {
  return arg * 2;
}

// Mocked
myFunction: jest.fn()
```

### Classes

```javascript
// Original
export class ElementBuilder {
  constructor(element) { /* ... */ }
  build() { /* ... */ }
}

// Mocked
ElementBuilder: jest.fn().mockImplementation(function(...args) {
  return { __mockClass: 'ElementBuilder', args };
})
```

### Objects with Values

```javascript
// Original
export const color = {
  red: '#E21833',
  gray: { dark: '#454545' }
};

// Mocked (values preserved)
color: {
  red: '#E21833',
  gray: {
    dark: '#454545'
  }
}
```

### Arrays

```javascript
// Original
export const breakpoints = [320, 768, 1024];

// Mocked (values preserved)
breakpoints: [320, 768, 1024]
```

## Special Handlers

Some functions need custom mock implementations:

### convertJSSObjectToStyles

```javascript
// Custom handler in generate-mocks.js
specialHandlers: {
  'convertJSSObjectToStyles': true
}

// Generates mock that actually converts simple JSS to CSS
convertJSSObjectToStyles: jest.fn(({ styleObj }) => {
  return Object.entries(styleObj || {}).map(([selector, styles]) => {
    const styleString = Object.entries(styles).map(([prop, value]) =>
      `${prop}: ${value};`
    ).join(' ');
    return `${selector} { ${styleString} }`;
  }).join('\n');
})
```

### Classes

```javascript
// Mark as class in configuration
specialHandlers: {
  'ElementBuilder': 'class',
  'StyleManager': 'class'
}

// Generates mock class implementation
ElementBuilder: jest.fn().mockImplementation(function(...args) {
  return { __mockClass: 'ElementBuilder', args };
})
```

## Using Mocks in Tests

### Example: Testing with Token Mocks

```typescript
// packages/styles/source/typography/__tests__/sans.test.ts
import { color, font } from '@universityofmaryland/web-token-library';

describe('Typography - Sans', () => {
  it('uses design tokens', () => {
    // color and font are mocked automatically
    expect(color.red).toBe('#E21833');
    expect(font.size.base).toBe('16px');
  });
});
```

### Example: Testing with Function Mocks

```typescript
// packages/elements/source/__tests__/button.test.ts
import { convertJSSObjectToStyles } from '@universityofmaryland/web-utilities-library';

describe('Button Element', () => {
  it('converts styles correctly', () => {
    // convertJSSObjectToStyles is a jest.fn() mock
    const result = convertJSSObjectToStyles({ styleObj: { '.btn': { color: 'red' } } });

    expect(convertJSSObjectToStyles).toHaveBeenCalled();
    expect(result).toContain('.btn');
  });
});
```

### Example: Customizing Mocks Per Test

```typescript
import { myFunction } from '@universityofmaryland/web-utilities-library';

describe('Custom Mock Behavior', () => {
  beforeEach(() => {
    // Reset mocks between tests
    jest.clearAllMocks();
  });

  it('customizes mock return value', () => {
    // Override mock implementation
    (myFunction as jest.Mock).mockReturnValue('custom value');

    const result = myFunction();
    expect(result).toBe('custom value');
  });
});
```

## Workflow and Best Practices

### Development Workflow

```bash
# 1. Make changes to package source code
cd packages/tokens
# ... edit files ...

# 2. Build the package
npm run build

# 3. Regenerate mocks (from root)
cd ../..
npm run generate:mocks

# 4. Run tests
npm test
```

### CI/CD Workflow

```yaml
# .github/workflows/test.yml
jobs:
  test:
    steps:
      - name: Install dependencies
        run: yarn install

      - name: Build packages
        run: npx lerna run build --stream

      - name: Generate mocks
        run: npm run generate:mocks

      - name: Run tests
        run: npm test
```

### When to Regenerate Mocks

Regenerate mocks when:

1. **Package exports change** - New functions, classes, or exports added
2. **Token values change** - Design token updates
3. **After building packages** - Ensure mocks reflect latest code
4. **Before running tests** - Especially in CI environments
5. **After dependency updates** - When package structure changes

### Best Practices

#### DO:
- ✅ Regenerate mocks after building packages
- ✅ Commit generated mocks to version control
- ✅ Use mocks for unit tests within packages
- ✅ Clear mocks between tests (`jest.clearAllMocks()`)
- ✅ Customize mock behavior when needed
- ✅ Document special handlers in mock configuration

#### DON'T:
- ❌ Manually edit generated mock files
- ❌ Use mocks for integration tests (use real packages)
- ❌ Rely on mock implementation details
- ❌ Skip regeneration after package changes
- ❌ Commit mocks without regenerating first

## Package Testing Strategy

### Unit Tests (Use Mocks)

Test individual package functionality in isolation:

```typescript
// packages/elements/source/__tests__/button.test.ts
// Uses mocks for: @universityofmaryland/web-token-library
//                 @universityofmaryland/web-styles-library
//                 @universityofmaryland/web-utilities-library

import { createButton } from '../button';

describe('Button Element', () => {
  it('creates button element', () => {
    const button = createButton({ text: 'Click' });
    expect(button.element).toBeDefined();
  });
});
```

### Integration Tests (Use Real Packages)

Test interactions between packages:

```typescript
// __tests__/integration/button-integration.test.ts
// Uses real packages built in CI

import { createButton } from '@universityofmaryland/web-elements-library';
import { color } from '@universityofmaryland/web-token-library';

describe('Button Integration', () => {
  it('uses real design tokens', () => {
    const button = createButton({ theme: 'primary' });
    // Verify actual token values, not mocks
    expect(button.styles).toContain(color.red);
  });
});
```

## Troubleshooting

### Mock Not Found

**Error**: `Cannot find module '__mocks__/webTokenLibrary.js'`

**Solution**:
```bash
npm run generate:mocks
```

### Mock Out of Date

**Error**: Tests fail with "Unexpected export" or similar

**Solution**:
```bash
# Rebuild package
cd packages/tokens
npm run build

# Regenerate mocks
cd ../..
npm run generate:mocks
```

### Package Not Built

**Error**: `⚠️  Skipping tokens: Package not built`

**Solution**:
```bash
# Build specific package
cd packages/tokens
npm run build

# Or build all packages
cd ../..
npx lerna run build --stream
```

### Circular Dependency

**Error**: Tests hang or fail with circular dependency errors

**Solution**: Ensure jest.config.js has proper module name mappings for all cross-package dependencies.

### Mock Implementation Incorrect

**Error**: Mock doesn't match expected behavior

**Solution**: Add special handler in `source/generate-mocks.js`:

```javascript
{
  name: 'myPackage',
  // ...
  specialHandlers: {
    'myFunction': true,  // Custom implementation
    'MyClass': 'class',  // Mark as class
  }
}
```

## Maintenance

### Adding New Package

1. **Create package** with proper exports
2. **Build package**: `cd packages/newpackage && npm run build`
3. **Add to mock configuration** in `source/generate-mocks.js`:
   ```javascript
   {
     name: 'newpackage',
     npmName: '@universityofmaryland/web-newpackage-library',
     mockFileName: 'webNewPackageLibrary.js',
     distPath: 'packages/newpackage/dist/index.js',
     description: 'New package description',
   }
   ```
4. **Generate mock**: `npm run generate:mocks`
5. **Add to jest.config.js**:
   ```javascript
   moduleNameMapper: {
     '^@universityofmaryland/web-newpackage-library$': path.resolve(
       __dirname,
       './__mocks__/webNewPackageLibrary.js',
     ),
   }
   ```

### Updating Existing Mock

1. **Update package source**
2. **Build package**: `npm run build`
3. **Regenerate mocks**: `npm run generate:mocks`
4. **Verify tests**: `npm test`
5. **Commit changes**: Include both source and generated mocks

### Removing Package

1. **Remove from PACKAGES_TO_MOCK** in `source/generate-mocks.js`
2. **Delete mock file** from `__mocks__/`
3. **Remove from jest.config.js** moduleNameMapper
4. **Update dependent packages**

## Advanced Topics

### Mock Customization

For complex mocking needs, create custom mock files in `__mocks__/`:

```javascript
// __mocks__/customMock.js
module.exports = {
  // Custom implementation
  complexFunction: jest.fn((arg) => {
    // Custom behavior
    return arg * 2;
  }),
};
```

### Partial Mocks

Mock only specific exports while using real implementations for others:

```typescript
jest.mock('@universityofmaryland/web-token-library', () => ({
  ...jest.requireActual('@universityofmaryland/web-token-library'),
  color: { red: '#CUSTOM' }, // Override specific export
}));
```

### Mock Spying

Monitor calls to mocked functions:

```typescript
import { myFunction } from '@universityofmaryland/web-utilities-library';

it('tracks function calls', () => {
  myFunction('arg');

  expect(myFunction).toHaveBeenCalledWith('arg');
  expect(myFunction).toHaveBeenCalledTimes(1);
});
```

## Resources

- **Mock Generator**: `source/generate-mocks.js`
- **Jest Config**: `jest.config.js`
- **Mock Directory**: `__mocks__/`
- **Package Tests**: `packages/*/source/__tests__/`
- **Jest Documentation**: https://jestjs.io/docs/mock-functions

## Summary

The UMD Design System mock generation system:

1. **Auto-generates** mocks from built packages
2. **Preserves** export structure and values
3. **Converts** functions to `jest.fn()`
4. **Enables** isolated package testing
5. **Eliminates** circular dependencies
6. **Integrates** with Jest via moduleNameMapper

**Key Command**: `npm run generate:mocks`

Always regenerate mocks after building packages to ensure tests use up-to-date code.

# Mock System Documentation

## Overview

The UMD Design System uses auto-generated Jest mocks to enable **isolated unit testing** of individual packages without circular dependencies or reliance on external package logic. This document explains how the mock system works, how to generate mocks, and best practices for writing focused unit tests.

## Testing Philosophy

### Focus: Unit Testing, Not Integration Testing

The mock system is designed specifically for **unit testing** - testing individual package functionality in isolation:

**✅ Unit Tests (Use Mocks):**
- Test **your package's logic only**
- Mock **all external dependencies** from other packages
- Verify **interfaces and contracts**, not implementations
- Run **fast and independently** without build dependencies
- Focus on **single responsibility** of the package being tested

**❌ Integration Tests (Don't Use Mocks):**
- Test **interactions between real packages**
- Use **actual built packages**, not mocks
- Verify **end-to-end functionality** with real implementations
- Run in **CI/CD environments** after all packages are built
- Test **system behavior** and cross-package workflows

### Key Principle: Minimize External Logic

**Your tests should focus on YOUR code, not other packages' code.**

When writing tests:
1. **Mock external dependencies** - Don't test other packages' logic
2. **Test your transformations** - Focus on what YOUR code does with inputs
3. **Verify YOUR behavior** - Test your package's unique functionality
4. **Trust interfaces** - Assume mocked dependencies work correctly

**Example - Testing an Element Builder:**
```typescript
// ❌ BAD: Testing external package logic
import { color } from '@universityofmaryland/web-token-library';

it('validates token colors', () => {
  expect(color.red).toBe('#E21833');  // Testing token package, not yours!
});

// ✅ GOOD: Testing YOUR package's usage of tokens
import { createButton } from '../button';

it('applies token colors to button styles', () => {
  const button = createButton({ theme: 'primary' });
  expect(button.styles).toContain('color:');  // Testing YOUR logic
  expect(button.element.tagName).toBe('BUTTON');  // Testing YOUR output
});
```

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

### Script Location and Purpose

**File:** `/source/generate-mocks.js`

The mock generation script is a Node.js utility that automatically creates Jest-compatible mock files by:

1. **Loading built packages** from `dist/` directories
2. **Analyzing exports** (functions, classes, objects, values)
3. **Transforming to mocks** (functions → `jest.fn()`, values preserved)
4. **Writing mock files** to `__mocks__/` directory
5. **Preserving structure** to maintain import compatibility

**Key Features:**
- Automatically preserves design token values
- Converts functions to `jest.fn()` for spying
- Handles classes with mock implementations
- Supports special handlers for complex functions
- Generates clean, documented mock files

### npm Script Commands

The script is available via npm commands defined in the root `package.json`:

```bash
# Generate mocks only
npm run generate:mocks

# Build all packages, generate mocks, and run tests
npm run test:all

# CI/CD test workflow (sequential, with mocks)
npm run test:ci
```

**When to Run:**
- After building any package: `npm run generate:mocks`
- Before running tests: `npm run test:all`
- During CI/CD: `npm run test:ci`
- After adding/removing package exports

### How the Script Works

#### 1. Package Discovery
The script uses a configuration array (`PACKAGES_TO_MOCK`) that defines:
- Package folder name (`tokens`, `styles`, etc.)
- NPM package name (`@universityofmaryland/web-token-library`)
- Output mock filename (`webTokenLibrary.js`)
- Built package path (`packages/tokens/dist/index.js`)
- Description for documentation
- Special handlers for complex functions/classes

#### 2. Package Loading
```javascript
// Clears require cache for fresh load
delete require.cache[require.resolve(fullDistPath)];

// Loads built package
const packageExports = require(fullDistPath);
```

#### 3. Export Transformation
The `mockifyValue()` function recursively transforms exports:

**Functions:**
```javascript
// Original function
export function addClass(element, className) { /* ... */ }

// Transformed to mock
addClass: jest.fn()
```

**Classes:**
```javascript
// Original class
export class ElementBuilder { /* ... */ }

// Transformed to mock with special handler
ElementBuilder: jest.fn().mockImplementation(function(...args) {
  return { __mockClass: 'ElementBuilder', args };
})
```

**Objects with Values (preserved):**
```javascript
// Original object
export const color = { red: '#E21833', gold: '#FFD200' };

// Preserved in mock
color: { red: '#E21833', gold: '#FFD200' }
```

**Arrays (preserved):**
```javascript
// Original array
export const breakpoints = [320, 768, 1024];

// Preserved in mock
breakpoints: [320, 768, 1024]
```

#### 4. Mock File Generation
The script generates a mock file with:
- Auto-generated header with warnings
- Package name and description
- `module.exports` with transformed structure

**Example Output:**
```javascript
// This file is auto-generated by source/generate-mocks.js
// Do not edit manually. Run 'npm run generate:mocks' to regenerate.
//
// Mock for: @universityofmaryland/web-token-library
// Description: Design tokens (colors, spacing, fonts, media queries)

module.exports = {
  color: { red: '#E21833', /* ... */ },
  spacing: { md: '24px', /* ... */ },
  font: { /* ... */ }
};
```

#### 5. Error Handling
The script handles various error scenarios:
- **Package not built** - Warns and skips with build instructions
- **Manual mocks** - Detects `MANUAL MOCK` comments and preserves them
- **Browser APIs** - Skips packages requiring window/HTMLElement
- **Require errors** - Provides detailed error messages

### Script Configuration

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

### Unit Tests: Test YOUR Package Logic Only

**Purpose:** Verify that YOUR code works correctly with mocked dependencies

**Location:** `packages/{package}/source/__tests__/`

**What to Test:**
1. **Your transformations** - How your code processes inputs
2. **Your outputs** - What your functions/classes return
3. **Your error handling** - How your code handles edge cases
4. **Your interfaces** - That your public API works as expected

**What NOT to Test:**
1. ❌ Other packages' logic (token values, utility functions, etc.)
2. ❌ Mocked function implementations (you control those)
3. ❌ Integration between packages (that's integration testing)
4. ❌ Browser APIs or DOM behavior (use JSDOM mocks)

**Example: Elements Package Unit Test**
```typescript
// packages/elements/source/__tests__/button.test.ts
// Tests YOUR button creation logic, not external packages

import { createButton } from '../button';
import * as token from '@universityofmaryland/web-token-library';  // Mocked
import { addClass } from '@universityofmaryland/web-utilities-library';  // Mocked

describe('Button Element - Unit Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates button element with correct tag', () => {
    // Testing YOUR logic: element creation
    const button = createButton({ text: 'Click' });

    expect(button.element).toBeDefined();
    expect(button.element.tagName).toBe('BUTTON');  // YOUR code's output
  });

  it('applies text content to button', () => {
    // Testing YOUR logic: text handling
    const button = createButton({ text: 'Submit' });

    expect(button.element.textContent).toBe('Submit');  // YOUR code's output
  });

  it('generates CSS styles', () => {
    // Testing YOUR logic: style generation
    const button = createButton({ text: 'Click' });

    expect(button.styles).toBeDefined();
    expect(typeof button.styles).toBe('string');  // YOUR code returns string
    expect(button.styles.length).toBeGreaterThan(0);  // YOUR code generates styles
  });

  it('uses addClass utility for custom classes', () => {
    // Testing YOUR logic: integration with utilities
    const button = createButton({ text: 'Click', className: 'custom' });

    expect(addClass).toHaveBeenCalled();  // YOUR code called it
    expect(addClass).toHaveBeenCalledWith(
      expect.any(Object),
      'custom'
    );
  });

  it('handles missing text gracefully', () => {
    // Testing YOUR error handling
    const button = createButton({ text: '' });

    expect(button.element.textContent).toBe('');  // YOUR code's behavior
  });
});
```

**Example: Styles Package Unit Test**
```typescript
// packages/styles/source/element/action/__tests__/primary.test.ts
// Tests YOUR composable function logic, not token values

import { composePrimary } from '../primary';
import * as token from '@universityofmaryland/web-token-library';  // Mocked

describe('Primary Action Composable - Unit Tests', () => {
  it('returns JSS object with className', () => {
    // Testing YOUR logic: composable function structure
    const result = composePrimary();

    expect(result).toHaveProperty('className');
    expect(typeof result.className).toBe('string');
  });

  it('generates different classNames for different options', () => {
    // Testing YOUR logic: option handling
    const normal = composePrimary();
    const large = composePrimary({ size: 'large' });
    const white = composePrimary({ color: 'white' });

    expect(normal.className).not.toBe(large.className);
    expect(normal.className).not.toBe(white.className);
  });

  it('merges size and color options correctly', () => {
    // Testing YOUR logic: option composition
    const result = composePrimary({ size: 'large', color: 'white' });

    expect(result.className).toContain('large');
    expect(result.className).toContain('white');
  });

  it('uses default options when none provided', () => {
    // Testing YOUR logic: default behavior
    const withDefaults = composePrimary();
    const withExplicitDefaults = composePrimary({ size: 'normal', color: 'default' });

    expect(withDefaults.className).toBe(withExplicitDefaults.className);
  });
});
```

### Integration Tests: Test Package Interactions

**Purpose:** Verify that real packages work together correctly

**Location:** `__tests__/integration/` (repository root)

**What to Test:**
1. ✅ Real data flow between packages
2. ✅ Actual token values applied to elements
3. ✅ End-to-end component rendering
4. ✅ Full style compilation pipeline

**Example: Integration Test**
```typescript
// __tests__/integration/button-integration.test.ts
// Uses REAL packages built in CI, not mocks

import { createButton } from '@universityofmaryland/web-elements-library';
import { color } from '@universityofmaryland/web-token-library';

describe('Button Integration - Real Packages', () => {
  it('applies real design tokens to button styles', () => {
    const button = createButton({ theme: 'primary' });

    // Verify ACTUAL token values are in output
    expect(button.styles).toContain(color.red);  // Real value: #E21833
    expect(button.styles).toContain('#E21833');
  });

  it('compiles JSS to valid CSS', () => {
    const button = createButton({ text: 'Click' });

    // Verify real CSS compilation
    expect(button.styles).toMatch(/\.[\w-]+\s*\{[^}]+\}/);  // Valid CSS
  });
});
```

### Testing Matrix

| Test Type | Location | Dependencies | Speed | Purpose |
|-----------|----------|--------------|-------|---------|
| **Unit** | `packages/*/source/__tests__/` | Mocked | Fast | Test package logic |
| **Integration** | `__tests__/integration/` | Real | Slower | Test package interactions |
| **E2E** | `__tests__/e2e/` | Real + Browser | Slowest | Test full workflows |

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

### The Mock System

The UMD Design System mock generation system:

1. **Auto-generates** mocks from built packages
2. **Preserves** export structure and values
3. **Converts** functions to `jest.fn()`
4. **Enables** isolated unit testing
5. **Eliminates** circular dependencies
6. **Integrates** with Jest via moduleNameMapper

**Key Command**: `npm run generate:mocks`

Always regenerate mocks after building packages to ensure tests use up-to-date code.

### Testing Philosophy Recap

**✅ DO - Unit Tests:**
- Test YOUR package's logic only
- Mock ALL external dependencies
- Focus on transformations and outputs
- Verify interfaces and error handling
- Keep tests fast and independent

**❌ DON'T - Unit Tests:**
- Test other packages' logic
- Rely on real package implementations
- Test integration between packages
- Verify specific token values or utility logic

**Remember:** Your tests should break when YOUR code changes, not when external packages change. If changing another package breaks your tests, you're testing their logic, not yours.

### Quick Reference

| Scenario | Use Mocks? | Test Type | Location |
|----------|------------|-----------|----------|
| Testing my function logic | ✅ Yes | Unit | `packages/*/source/__tests__/` |
| Testing my class creation | ✅ Yes | Unit | `packages/*/source/__tests__/` |
| Testing token values | ❌ No | Integration | `__tests__/integration/` |
| Testing package interaction | ❌ No | Integration | `__tests__/integration/` |
| Testing full workflows | ❌ No | E2E | `__tests__/e2e/` |

For detailed testing examples and best practices, see package-specific `TESTING.md` files in each `__tests__/` directory.

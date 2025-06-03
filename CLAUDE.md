# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

The University of Maryland Design System is a Lerna-managed monorepo containing design tokens, utilities, and components for UMD digital properties. It uses Yarn workspaces with TypeScript, Jest for testing, and Webpack for bundling.

## Architecture

### Monorepo Structure
```
packages/
├── styles/     - JSS objects, design tokens, CSS utilities (v1.4.2)
├── elements/   - Foundational UI elements using web components (v1.2.0)
├── components/ - High-level web components built on elements (v1.10.11)
├── feeds/      - Dynamic content feed components (v1.0.4)
└── theme/      - Tailwind CSS integration
```

### Package Dependencies
- `styles` is the foundation (no UMD dependencies)
- `elements` depends on `styles`
- `components` depends on `elements` and `styles`
- `feeds` depends on `elements` and `styles`

## Common Commands

### Root Level Commands
```bash
# Development servers for each package
yarn styles      # Styles package dev server
yarn elements    # Elements package dev server
yarn components  # Components package dev server
yarn feeds       # Feeds package dev server

# Testing
yarn test        # Run all tests across packages
yarn clean       # Clean all packages

# Package-specific commands via Lerna
npx lerna run [command] --scope=@universityofmaryland/[package-name]
```

### Package-Level Commands
```bash
# In any package directory
npm start              # Development server with watch mode
npm run build          # Production build
npm test               # Run tests
npm run test:watch     # Watch mode for tests
npm run test:coverage  # Generate coverage report
npm run release        # Test, build, and publish to npm

# Run single test file
npm test -- path/to/test.test.ts
```

## Key Architectural Patterns

### 1. JSS (JavaScript Style Sheets) - Styles Package
All styles are JavaScript objects that can be transformed to CSS:
```typescript
export const myStyle = {
  className: 'my-class',
  color: 'red',
  '&:hover': { color: 'blue' }
};
```

### 2. Element Model Pattern - Elements/Components/Feeds
Components return an `ElementModel`:
```typescript
interface ElementModel {
  element: HTMLElement | DocumentFragment;
  styles: string;
  update?: (props: any) => void;
  destroy?: () => void;
}
```

### 3. Web Components - Components Package
- Use Shadow DOM for style encapsulation
- Follow naming convention: `umd-[component]`
- Use slot-based content distribution
- Extend base Web Element classes

### 4. Design Tokens - Styles Package
Centralized in `token/` module:
- Colors: `token/color.ts`
- Spacing: `token/spacing.ts`
- Typography: `token/font.ts`
- Media queries: `token/media.ts` (Mobile: 0-767px, Tablet: 768-1023px, Desktop: 1024px+)

## Testing Strategy

- **Framework**: Jest with TypeScript support
- **Location**: Tests in `__tests__` directories co-located with source
- **Styles**: Snapshot testing for CSS output consistency
- **Components**: Mock DOM and dependencies, focus on creation and events
- **Coverage**: Run with `npm run test:coverage`

### Mock Files Pattern

The repository uses a centralized `__mocks__/` directory at the root level for mocking package dependencies in tests:

```
__mocks__/
├── webComponentsLibrary.js  - Mock for @universityofmaryland/web-components-library
├── webElementsLibrary.js    - Mock for @universityofmaryland/web-elements-library
├── webFeedsLibrary.js       - Mock for @universityofmaryland/web-feeds-library
├── webStylesLibrary.js      - Mock for @universityofmaryland/web-styles-library
├── elements.js              - Legacy mock for basic element creation helpers
└── macros.js                - Mock for common UI macro patterns (loaders, lazy loading, etc.)
```

#### Mock Structure Guidelines

1. **Package Mocks** (web*Library.js):
   - Each package has its own dedicated mock file
   - Mocks should mirror the actual package's export structure
   - Use `jest.fn()` for functions with appropriate return values
   - Include mock implementations for complex behaviors

2. **Mock Naming Convention**:
   - Package mocks: `web[PackageName]Library.js`
   - Helper mocks: descriptive names like `elements.js`, `macros.js`

3. **Mock Implementation Patterns**:
   ```javascript
   // For element creation functions
   jest.fn().mockReturnValue({
     element: document.createElement('div'),
     styles: '.mock-style-class'
   })
   
   // For web components
   const createMockWebComponent = (tagName) => {
     class MockComponent extends HTMLElement { /* ... */ }
     return () => {
       if (!customElements.get(tagName)) {
         customElements.define(tagName, MockComponent);
       }
     };
   };
   ```

4. **Usage in Tests**:
   - Jest automatically uses these mocks when packages are imported
   - Mocks can be customized per test using `jest.mocked()`
   - Clear mocks between tests with `jest.clearAllMocks()`

## TypeScript Configuration

- Strict mode enabled across all packages
- Module: ESNext, Target: ES2020
- Declaration files generated
- Source maps included

## Important Utilities

### Styles Package
- `utilities/transform/jss`: Convert JSS objects to CSS strings
- `utilities/transform/variables`: Convert design tokens to CSS variables
- `utilities/create/style`: Create style elements for DOM injection

### Elements/Components Packages
- `utilities/markup/`: DOM manipulation helpers
- `model/attributes/`: HTML attribute validation
- `model/slots/`: Slot content management

## Documentation

- Main website: https://designsystem.umd.edu
- Storybook playground: http://playground.designsystem.umd.edu
- TypeDoc documentation: https://umd-digital.github.io/design-system/
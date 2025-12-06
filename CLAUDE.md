# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

The University of Maryland Design System is a Lerna-managed monorepo containing design tokens, utilities, components, and web components for UMD digital properties. It uses Yarn workspaces with TypeScript, Vite for bundling, and Jest for testing.

## Architecture

### Monorepo Structure
```
packages/
├── icons/      - SVG icon and logo assets (v1.0.0)
├── utilities/  - Shared utility functions (v0.1.0)
├── styles/     - JSS objects, design tokens, CSS utilities (v1.6.9)
├── model/      - Web component model utilities (v1.0.0)
├── elements/   - Foundational UI element builders (v1.4.8)
├── feeds/      - Dynamic content feed components (v1.1.1)
└── components/ - Web Components (Custom Elements) (v1.15.0-beta.0)
```

### Package Dependencies & Build Order

The dependency graph determines build order:

1. **icons** - No dependencies (standalone SVG assets)
2. **utilities** - Depends on `styles` for JSS utilities
3. **styles** - No UMD dependencies (has postcss deps)
4. **model** - Depends on `styles` (peer dependency for design tokens)
5. **elements** - Depends on `styles`, `icons`, `utilities`
6. **feeds** - Depends on `elements`, `styles`, `utilities`
7. **components** - Depends on all packages above + `model`

### Build System Pattern

All packages follow a **consistent Vite build pattern**:

- **Output Formats**: ES Modules (`.mjs`) and CommonJS (`.js`)
- **Type Declarations**: Generated with `vite-plugin-dts`
- **External Dependencies**: All `@universityofmaryland/*` packages are externalized
- **Module Preservation**: `preserveModules: true` for granular imports
- **Code Splitting**: Category-based entry points

**External Configuration** (all packages):
```typescript
rollupOptions: {
  external: (id: string) => id.startsWith('@universityofmaryland/')
}
```

### Special Builds

Two packages have special CDN builds:

**Styles Package**:
- Main build: Code-split modules with externals
- CDN build: Single IIFE bundle (`dist/cdn.js`)

**Components Package**:
- Main build: Code-split modules with externals
- CDN build: Single IIFE bundle with ALL dependencies (`dist/cdn.js`)
- Bundle build: ESM bundle for special integrations

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
- Package-specific docs: See `CLAUDE.md` in each package directory

## Package Export Patterns

### Selective Imports (Recommended)

All packages support selective imports for optimal tree-shaking:

```typescript
// Category imports
import { addClass } from '@universityofmaryland/web-utilities-library/dom';
import * as token from '@universityofmaryland/web-styles-library/token';
import { CHEVRON_SMALL } from '@universityofmaryland/web-icons-library/navigation';
import { textLockup } from '@universityofmaryland/web-elements-library/atomic';

// Individual imports (maximum optimization)
import { addClass } from '@universityofmaryland/web-utilities-library/dom/addClass';

// Main exports (convenience)
import { addClass } from '@universityofmaryland/web-utilities-library';
```

### Important Import Pattern

**For styles library JSS modules, use namespace imports:**

```typescript
// ✅ Correct - use namespace import
import * as token from '@universityofmaryland/web-styles-library/token';
import * as layout from '@universityofmaryland/web-styles-library/layout';

// ❌ Wrong - no default exports
import token from '@universityofmaryland/web-styles-library/token';
```

This is because JSS modules export named exports like `{ color, spacing, media, font }`, not a default export.

## Planned Future Packages

The following packages are planned for future development:

### 1. Element Model Package
**Package Name**: `@universityofmaryland/web-element-model`
**Purpose**: Abstract the Element Model pattern from the elements package

**Features**:
- Element Model interface and base classes
- Helper functions for creating Element Models
- Documentation and examples for custom element builders
- Enable consumers to create their own element variations

**Benefits**:
- Better documentation of the Element Model pattern
- Reusable utilities for custom implementations
- Testing utilities for Element Model validation
- Separation of concerns (model vs implementation)

### 2. Component Model Package
**Package Name**: `@universityofmaryland/web-component-model`
**Purpose**: Abstract Web Component utilities from the components package

**Features**:
- Base Web Component classes with common functionality
- Shadow DOM utilities and helpers
- Attribute/property synchronization utilities
- Slot management helpers
- Event emitter utilities
- Lifecycle helpers

**Benefits**:
- Consistent Web Component patterns
- Reduced boilerplate in component definitions
- Testing utilities for Web Components
- Enable consumers to extend and customize components

### 3. Tokens Package
**Package Name**: `@universityofmaryland/web-tokens`
**Purpose**: Design tokens synchronized from Figma

**Features**:
- Automated token extraction from Figma
- Token transformation to multiple formats (JS, CSS, SCSS)
- Semantic token naming
- Theme variants (light/dark, maryland/default)
- Color, typography, spacing, and effect tokens

**Implementation**:
- GitHub Actions workflow to fetch tokens from Figma API
- Token transformation scripts
- Version control for token updates
- Integration with styles package

**Benefits**:
- Single source of truth (Figma)
- Designer-driven token updates
- Automated synchronization
- Consistent design-to-code workflow

## Planned CI/CD Enhancements

### GitHub Actions Workflows

#### 1. Testing Workflow
```yaml
name: Test
on: [push, pull_request]
jobs:
  jest:
    - Run Jest tests across all packages
    - Generate coverage reports
    - Upload coverage to Codecov

  playwright:
    - Run Playwright E2E tests
    - Test Web Components in real browsers
    - Visual regression testing

  percy:
    - Percy visual regression testing
    - Component screenshot comparison
    - Catch unintended visual changes
```

#### 2. Release Workflow
```yaml
name: Release
on:
  push:
    branches: [main]
jobs:
  version:
    - Run Lerna version bump
    - Update CHANGELOG
    - Create git tags

  build:
    - Build all packages in dependency order
    - Generate type declarations
    - Create CDN bundles

  test:
    - Run full test suite (Jest + Playwright + Percy)
    - Ensure all tests pass before publish

  publish:
    - Publish to npm registry
    - Upload CDN bundles to CDN provider
    - Deploy documentation site

  notify:
    - Slack/email notifications
    - Update status badges
```

#### 3. Figma Token Sync Workflow
```yaml
name: Sync Tokens
on:
  schedule:
    - cron: '0 0 * * *'  # Daily
  workflow_dispatch:      # Manual trigger
jobs:
  sync:
    - Fetch tokens from Figma API
    - Transform tokens to JS/CSS formats
    - Create PR with token updates
    - Notify designers of changes
```

### Testing Strategy

**Jest** (Unit/Integration):
- All utility functions
- Element Model creation
- Component attribute handling
- 90%+ code coverage target

**Playwright** (E2E):
- Web Component rendering
- Interactive component behavior
- Accessibility testing
- Cross-browser compatibility

**Percy** (Visual Regression):
- Component visual snapshots
- Theme variant validation
- Responsive design testing
- Prevent unintended visual changes

## Development Workflow

### Local Development
```bash
# Install dependencies
yarn install

# Build all packages in order
npx lerna run build --stream

# Or build individual package
cd packages/components && npm run build

# Run tests
yarn test

# Watch mode for development
cd packages/components && npm start
```

### Making Changes

1. **Create feature branch**
2. **Make changes** in appropriate package(s)
3. **Add tests** for new functionality
4. **Build packages** in dependency order
5. **Run tests** (Jest + Playwright + Percy locally)
6. **Create PR** with descriptive title
7. **CI runs** all checks automatically
8. **Review and merge** after approval

### Release Process

1. **Merge to main** triggers release workflow
2. **Lerna version** determines version bumps
3. **Build all packages** in dependency order
4. **Run full test suite** (Jest + Playwright + Percy)
5. **Publish to npm** if tests pass
6. **Deploy documentation** and CDN bundles
7. **Git tags created** for release tracking

## Key Principles

1. **Consistent Build Pattern**: All packages use same Vite configuration pattern
2. **External Dependencies**: Workspace packages are always externalized for optimal tree-shaking
3. **Type Safety**: Full TypeScript support with generated declarations
4. **Code Splitting**: Category-based entry points for selective imports
5. **CDN Support**: Special IIFE builds for non-build-tool environments
6. **Testing**: Comprehensive testing at all levels (unit, integration, E2E, visual)
7. **Automation**: CI/CD for testing, releasing, and token synchronization
8. **Documentation**: Each package has its own CLAUDE.md with specific guidance

## Notes

- See individual package `CLAUDE.md` files for package-specific details
- All packages follow semantic versioning
- Breaking changes should be coordinated across dependent packages
- CDN builds enable zero-build-tool usage for rapid prototyping
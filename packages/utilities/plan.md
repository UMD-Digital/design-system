# UMD Web Utilities Library - Architecture & Planning

## Overview

The Web Utilities Library is the foundational utility package for the UMD Design System. It consolidates utility functions from across the design system into a single, well-organized, tree-shakeable package.

## Goals

### Primary Goals
1. **Centralization** - Single source of truth for utility functions
2. **Tree-Shaking** - Minimal bundle impact through selective imports
3. **Organization** - Logical, intuitive structure for utilities
4. **Maintainability** - Clear patterns and comprehensive tests
5. **Foundation** - Serve as dependency for all other design system packages

### Non-Goals
- NOT maintaining backward compatibility with existing utility APIs
- NOT including component-specific logic
- NOT adding external dependencies without strong justification

## Package Structure

### Directory Organization

```
packages/utilities/
├── source/                    # Source code
│   ├── index.ts              # Main barrel export
│   ├── [category]/           # Category directories
│   │   ├── index.ts          # Category barrel export
│   │   ├── utility1.ts       # Individual utility
│   │   └── utility2.ts
│   └── __tests__/            # Test files
│       └── [category]/       # Tests mirror source structure
│           ├── utility1.test.ts
│           └── utility2.test.ts
├── dist/                      # Build output
├── coverage/                  # Test coverage reports
├── package.json
├── vite.config.ts
├── tsconfig.json
├── jest.config.js
├── CLAUDE.md                 # AI coding assistant guide
├── CHANGELOG.md              # User-facing changelog
└── plan.md                   # This file
```

### Category Design Principles

When organizing utilities into categories:

1. **Logical Grouping** - Group by purpose/domain, not by source package
2. **Clear Boundaries** - Each category should have a distinct purpose
3. **Flat Structure** - Prefer flat over deeply nested (max 2 levels)
4. **Discoverable** - Category names should be intuitive
5. **Balanced** - Avoid categories with too many or too few utilities

## Build System

### Technology Choices

**Vite**
- Why: Fast builds, excellent tree-shaking, native ESM, simple config
- Benefits: Developer experience, build performance, output optimization
- Trade-offs: Newer tool, but proven in production use

**TypeScript**
- Why: Type safety, better developer experience, documentation
- Configuration: Strict mode, ES2020 target, declaration generation
- Benefits: Catches errors early, self-documenting code

**Jest**
- Why: Industry standard, excellent TypeScript support, comprehensive features
- Configuration: jsdom environment for DOM utilities, coverage reporting
- Benefits: Familiar to developers, extensive ecosystem

### Build Outputs

The build produces multiple formats for maximum compatibility:

1. **ESM (`.mjs`)** - Modern JavaScript, optimal tree-shaking
2. **CommonJS (`.js`)** - Node.js compatibility
3. **TypeScript Declarations (`.d.ts`)** - Type information

### Entry Points Strategy

Each utility category is a separate entry point:

```json
{
  "exports": {
    ".": "./dist/index.js",
    "./dom": "./dist/dom/index.js",
    "./string": "./dist/string/index.js"
  }
}
```

This enables:
- **Selective imports**: Only import what you need
- **Optimal tree-shaking**: Dead code elimination
- **Clear dependencies**: Easy to see what's being used

## Testing Strategy

### Coverage Requirements

- **Target**: 100% code coverage for all utilities
- **Minimum**: 95% code coverage (allows for edge cases)
- **Metrics**: Lines, statements, branches, functions

### Test Organization

Tests mirror the source structure:
```
source/dom/addClass.ts → source/__tests__/dom/addClass.test.ts
```

Benefits:
- Easy to find tests for any utility
- Clear mapping between source and tests
- Organized by category

### Test Patterns

Each utility test should cover:

1. **Happy Path** - Expected behavior with valid inputs
2. **Edge Cases** - Empty strings, null, undefined, edge values
3. **Error Conditions** - Invalid inputs, error handling
4. **Type Safety** - TypeScript compilation checks
5. **Browser Compatibility** - DOM/browser-specific behavior (if applicable)

Example test structure:
```typescript
describe('utilityName', () => {
  describe('happy path', () => {
    it('should do expected thing with valid input', () => {});
  });

  describe('edge cases', () => {
    it('should handle empty input', () => {});
    it('should handle null/undefined', () => {});
  });

  describe('error conditions', () => {
    it('should throw on invalid input', () => {});
  });
});
```

## Migration Strategy

### Phased Approach

The migration happens in phases:

**Phase 1: Components Package** (Steps 4-5)
- Migrate utilities from components package
- Add comprehensive test coverage
- Learn patterns and refine approach

**Phase 2: Elements Package** (Steps 6-7)
- Migrate utilities from elements package
- Add comprehensive test coverage
- Validate architecture decisions

**Phase 3: Future Work**
- Migrate utilities from feeds package
- Migrate utilities from styles package
- Refine and optimize

### Migration Process

For each utility being migrated:

1. **Identify** - Find the utility in source package
2. **Analyze** - Understand its purpose and dependencies
3. **Categorize** - Determine which category it belongs to
4. **Refactor** - Remove package-specific dependencies
5. **Rename** - Use better naming if needed
6. **Type** - Add or improve TypeScript types
7. **Document** - Write JSDoc with examples
8. **Test** - Write comprehensive tests
9. **Verify** - Ensure tests pass with 100% coverage

### Handling Dependencies

Some utilities may depend on:
- Other utilities (OK, but document the dependency)
- Package-specific code (NOT OK, needs refactoring)
- External libraries (Evaluate carefully)

Resolution strategies:
- **Internal dependencies**: Group related utilities in same category
- **Package-specific**: Abstract or inline the dependency
- **External libraries**: Evaluate if truly necessary, document decision

## Import Patterns

### Consumer Usage

Consumers can import utilities in multiple ways:

```typescript
// 1. Category import (preferred for multiple utilities)
import { addClass, removeClass } from '@universityofmaryland/web-utilities-library/dom';

// 2. Individual import (maximum tree-shaking)
import { addClass } from '@universityofmaryland/web-utilities-library/dom/addClass';

// 3. Main export (convenience, less optimal)
import { addClass } from '@universityofmaryland/web-utilities-library';
```

Recommendations:
- Use category imports when using multiple utilities from same category
- Use individual imports for single utility from a category
- Use main export for prototyping or when bundle size isn't critical

## Architectural Decisions

### Decision Log

**Decision 1: Use Vite Instead of Webpack**
- Rationale: Faster builds, better tree-shaking, simpler config
- Trade-offs: Newer tool, but elements package successfully uses it
- Status: ✅ Adopted

**Decision 2: Selective Imports via Multiple Entry Points**
- Rationale: Optimal bundle sizes, clear dependencies
- Trade-offs: More complex package.json exports
- Status: ✅ Adopted

**Decision 3: No External Dependencies (Default)**
- Rationale: Keep package lightweight, reduce security surface
- Trade-offs: May need to implement some utilities from scratch
- Status: ✅ Adopted (with exceptions allowed if justified)

**Decision 4: 100% Test Coverage Requirement**
- Rationale: Utilities are foundational, must be reliable
- Trade-offs: More time investment upfront
- Status: ✅ Adopted

**Decision 5: No Backward Compatibility**
- Rationale: Greenfield opportunity to improve APIs
- Trade-offs: Can't directly replace existing utilities
- Status: ✅ Adopted

## Future Roadmap

### Short Term (Current Phase)
- ✅ Package foundation setup
- ✅ Selective import pattern implementation
- ⏳ Utility analysis and architecture design
- ⏳ Components package migration
- ⏳ Elements package migration

### Medium Term (Next 3-6 months)
- Migrate utilities from feeds package
- Migrate utilities from styles package
- Update consuming packages to use utilities library
- Performance benchmarking and optimization
- Documentation site/examples

### Long Term (6+ months)
- Additional utility categories as needs emerge
- Integration with design system documentation
- Community contributions guidelines
- Automated migration tools for consumers

## Success Metrics

### Package Health
- ✅ Build time < 5 seconds
- ✅ Test suite < 10 seconds
- ✅ 100% test coverage
- ✅ Zero TypeScript errors
- ✅ All tests passing

### Developer Experience
- Clear documentation
- Intuitive import patterns
- Comprehensive examples
- Helpful error messages

### Bundle Impact
- Category imports < 5KB per category (gzipped)
- Individual imports < 1KB per utility (gzipped)
- Zero unused code in production builds

## Maintenance Guidelines

### Adding New Categories

When adding a new utility category:

1. Create `source/[category]/` directory
2. Create `source/[category]/index.ts` barrel export
3. Add entry point to `vite.config.ts`
4. Add export path to `package.json`
5. Create `source/__tests__/[category]/` directory
6. Update `CHANGELOG.md`
7. Update this document

### Versioning Strategy

Follow Semantic Versioning:
- **Major (x.0.0)**: Breaking changes to APIs
- **Minor (0.x.0)**: New utilities added (backward compatible)
- **Patch (0.0.x)**: Bug fixes (backward compatible)

### Deprecation Policy

When deprecating utilities:
1. Add `@deprecated` JSDoc tag with alternative
2. Add console warning in development mode
3. Update CHANGELOG with deprecation notice
4. Remove in next major version (minimum 6 months notice)

## Known Limitations

### Current Limitations

1. **No Build-Time Optimization** - Individual utilities not separately optimized
2. **Manual Category Management** - Categories must be manually added to config
3. **No Runtime Validation** - Type checking only at compile time

### Accepted Trade-offs

1. **Bundle Size vs. Convenience** - Main export is convenient but less optimal
2. **Test Time vs. Coverage** - 100% coverage takes longer but ensures quality
3. **API Flexibility vs. Stability** - No backward compatibility enables improvements

## References

### Internal Documentation
- [CLAUDE.md](./CLAUDE.md) - AI assistant guide
- [CHANGELOG.md](./CHANGELOG.md) - User-facing changes

### External Resources
- [Vite Documentation](https://vitejs.dev/)
- [Jest Documentation](https://jestjs.io/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Keep a Changelog](https://keepachangelog.com/)
- [Semantic Versioning](https://semver.org/)

## Appendix: Potential Utility Categories

Based on analysis of existing packages, potential categories include:

- `dom` - DOM manipulation (addClass, removeClass, createElement helpers)
- `string` - String utilities (capitalize, truncate, slugify)
- `array` - Array utilities (chunk, unique, flatten)
- `object` - Object utilities (merge, clone, pick, omit)
- `validation` - Input validation (isEmail, isURL, isEmpty)
- `async` - Async patterns (debounce, throttle, retry)
- `date` - Date/time utilities (format, parse, diff)
- `accessibility` - A11y helpers (focusTrap, announceToScreenReader)
- `animation` - Animation utilities (easing, transition helpers)
- `layout` - Layout calculations (viewport, dimensions, positions)
- `event` - Event handling (delegation, custom events)
- `storage` - Storage utilities (localStorage, sessionStorage wrappers)
- `url` - URL utilities (parseQuery, buildURL)

The actual categories will be determined during the analysis phase (Step 3) based on what utilities actually exist in the codebase.
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-11-08

### Breaking Changes

**Factory Removal**
- **REMOVED:** Entire `factories/` directory including presets and compose functionality
- **REMOVED:** Factory exports from package.json (`./presets`, `./compose`, `./factories`)
- **REMOVED:** `actions`, `headlines`, `text`, `layouts`, and `assets` preset builders
- **REMOVED:** `textLockup`, `card`, `hero`, `list`, and `grid` composition functions
- **MIGRATION:** All factory functionality now available via composable functions in `@universityofmaryland/web-styles-library`
- Removed ~1,900 lines of code from the builder package

**API Simplification**
- **REMOVED:** `buildElement()` method - use `.build()` instead
- **REMOVED:** Convenience ARIA methods (`ariaCurrent`, `ariaPressed`, `ariaExpanded`, `ariaHidden`, `ariaLabel`) - use `.withAria()` instead
- **REMOVED:** Convenience event methods (`onClick`, `onKeyup`, `onKeydown`, `onSubmit`, `onChange`, `onInput`, `onFocus`, `onBlur`, `onMouseEnter`, `onMouseLeave`) - use `.on()` instead
- **REMOVED:** `withClass()` method - use `.withClassName()` instead
- **REMOVED:** `focusable()` method - no replacement needed (not in use)
- **REMOVED:** Conditional methods (`withChildIf`, `withStylesIf`, `withThemeDarkIf`) - use standard JavaScript conditionals instead

**Random ClassName Generation**
- **CHANGED:** `getCurrentClassName()` no longer generates random classNames
- **CHANGED:** `.withStyles()` now warns and skips when no className is set
- **CHANGED:** StyleManager.add() now accepts `className: string | null`
- **BEHAVIOR:** Developers must explicitly set classNames before applying styles for cleaner DOM and easier debugging

**Method Renaming**
- **RENAMED:** `role()` → `withRole()` for API consistency

### Added

- Added `getClassNames()` method for non-destructive className access
- Added section dividers in ElementBuilder.ts for improved code organization (12 logical sections)
- Added validation that `.withStyles()` requires an explicit className

### Changed

- Architecture simplified from 3-layer to 2-layer (removed Factory layer)
- Updated all documentation (README.md, CLAUDE.md) to reflect factory removal
- Updated code organization in ElementBuilder.ts with clear section dividers
- Cleaned up method syntax and naming for consistency
- Updated elements package (2 files) to use Styles package composables instead of factory presets

### Removed

- Removed PLAN.md file
- Removed factory tests: `presets.test.ts` and `compose.test.ts`
- Removed factory entry points from vite.config.ts

### Documentation

- Updated README.md with Styles package usage examples
- Updated CLAUDE.md to reflect 2-layer architecture
- Removed all factory-related documentation
- Added migration examples for using Styles package composable functions

### Migration Guide

**Before (Factory Pattern):**
```typescript
import { actions } from '@universityofmaryland/web-builder-library/presets';
const button = actions.primary().withText('Click Me').build();
```

**After (Styles Package Composables):**
```typescript
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as Styles from '@universityofmaryland/web-styles-library';

const button = new ElementBuilder('slot')
  .withClassName('umd-action-primary')
  .withStyles(Styles.element.action.primary.normal)
  .withText('Click Me')
  .build();
```

### Reference

All changes reference: DSYS-2503

## [1.0.0] - 2025-10-21

### Added

- Initial release of `@universityofmaryland/web-builder-library`
- Extracted from `@universityofmaryland/web-elements-library` model directory
- `ElementBuilder` class for creating styled HTML elements
- `createStyledElement` factory with builder variants (default, base, action, animationLine, childLink)
- Styled element models for actions, buttons, text, events, headlines, layout, assets, and rich text
- Full TypeScript support with exported types
- Element Model pattern with consistent return interface
- Style modifier system with theming support (dark mode, color variations)
- Child composition and attribute management
- ESM and CommonJS builds
- Comprehensive type declarations

### Changed

- Reorganized from `model` to `builder` package structure
- Renamed `modifiers` to `core` for clarity
- Renamed `elements` to `styledElements` for clarity
- Improved export structure with main and styledElements subpaths

### Documentation

- Complete README with usage examples
- API documentation
- TypeScript JSDoc comments

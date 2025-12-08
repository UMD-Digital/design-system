# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.1.0 (2025-12-08)

### Bug Fixes

- **utilities:** Fix remaining test failures to achieve 100% pass rate ([482bc78](https://github.com/UMD-Digital/design-system/commit/482bc783deffab3201d0aef3cd23d1e2f68c5d02))

### Features

- **utilities:** Implement selective import pattern with small bundles ([4afe4af](https://github.com/UMD-Digital/design-system/commit/4afe4af4028c9881fb4b89cbac61057925755239))
- **utilities:** Initialize utilities package with build and test infrastructure ([91c9e26](https://github.com/UMD-Digital/design-system/commit/91c9e26f9ed3a0e92060bf1fff7fe26a94d94d8a))
- **utilities:** Migrate utility functions from components package ([2246dc9](https://github.com/UMD-Digital/design-system/commit/2246dc97e0a7c209662312e2a9ead26db0500226))
- **utilities:** Migrate utility functions from elements package ([7bd2325](https://github.com/UMD-Digital/design-system/commit/7bd23251bc33106c54e327cf799b4db713ee0631))

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-09-29

### Added

- Initial package setup with Vite build system
- Jest testing infrastructure with TypeScript support
- Basic package structure and configuration
- Support for selective imports with tree-shaking
- Project documentation (CLAUDE.md, plan.md, ANALYSIS.md)
- Comprehensive utility function analysis from components and elements packages

#### Migrated from Components Package

- **DOM utilities:** `isHTMLElement` - Type guard for HTMLElement validation
- **Element creation:**
  - `createSlot` - Creates named slot elements for Shadow DOM
  - `createLinkWithSpan` - Creates external links with security attributes
  - `createStyleTemplate` - Creates template elements with embedded styles
- **Validation utilities:** `imageHasAlt` - Validates image alt text for accessibility (WCAG compliant)

#### Test Coverage

- 100% code coverage across all migrated utilities
- 133 comprehensive tests covering:
  - Happy path scenarios
  - Edge cases (empty inputs, null/undefined, type validation)
  - Error conditions
  - Accessibility compliance
  - Unicode and special character handling
  - Integration with Shadow DOM

#### Migrated from Elements Package

- **Accessibility utilities:** 4 functions for focus management, zoom detection, and motion preferences
  - `eventAccessibilityFocus` - Keyboard event handling for focus management (Escape, Tab, Arrow keys)
  - `eventAccessibilityFocusTrap` - Focus trap for modal dialogs (WCAG 2.1 compliant)
  - `isScreenZoomed` - Detects browser zoom levels (accounts for high DPI displays)
  - `isPreferredReducedMotion` - Checks for reduced motion preference
- **Animation utilities:** 3 functions for smooth transitions and link animations
  - `shrinkThenRemove` - Animates element collapse using requestAnimationFrame
  - `scrollTo` - Smooth scrolling with focus management
  - `animationLinkSpan` - Wraps link content in span for CSS animations
- **Date utilities:** 2 functions for date formatting and comparison
  - `createVisualFormattedDate` - Multiple date format strings (full, day, month, time)
  - `createDateCompareString` - ISO 8601 date strings for comparison (YYYY-MM-DD)
- **DOM utilities (additions):** 3 more functions for DOM manipulation
  - `findParent` - Recursive parent search by attribute
  - `wrapTextNodeInSpan` - Wraps text nodes in span elements
  - `cleanCopy` - Clones element with only href attribute preserved
- **Event utilities:** 1 function for touch/mobile interactions
  - `createEventSwipe` - Touch swipe detection with threshold and timing
- **Media utilities:** 4 functions for image and SVG handling
  - `imageFromSvg` - Converts SVG strings to img elements with base64 data URI
  - `svgFromString` - Parses SVG markup into DOM nodes
  - `getResponsiveImageSize` - Calculates responsive image dimensions with aspect ratio
  - `getIcon` - Extracts and optionally colors SVG/IMG icons
- **Network utilities:** 1 function for API communication
  - `fetchGraphQL` - GraphQL query executor with bearer token auth and error handling
- **Performance utilities:** 1 function for optimization
  - `debounce` - Function debouncing with configurable wait time (50ms default)
- **Storage utilities:** 2 functions for localStorage operations
  - `getLocalStorageInt` - Retrieves and parses integer values from localStorage
  - `setLocalStorageTimestamp` - Stores current timestamp in localStorage
- **String utilities (additions):** 3 more functions for text processing
  - `truncateText` - HTML-aware truncation preserving element structure
  - `truncateTextBasedOnSize` - Responsive truncation with configurable breakpoints
  - `convertPixelStringToNumber` - Converts CSS pixel strings to numbers
- **Style utilities:** 6 functions for CSS-in-JS and responsive design
  - `combineStyles` - Combines multiple style strings with null filtering
  - `convertJSSObjectToStyles` - JSS to CSS conversion using PostCSS with nesting
  - `getStyleStringFromJssObject` - Wraps JSS with className selector
  - `withViewTimelineAnimation` - Progressive enhancement wrapper for animations
  - `createContainerQuery` - Creates media queries for responsive breakpoints
  - `createRangeContainerQuery` - Creates ranged media queries (min and max width)

#### Dependencies Added

- `@universityofmaryland/web-styles-library@^1.4.2` - For JSS type definitions
- `postcss@^8.4.49` - CSS transformation
- `postcss-js@^4.0.1` - JSS to PostCSS conversion
- `postcss-nesting@^13.0.1` - CSS nesting support

#### Bug Fixes

- Fixed `createRangeContainerQuery` - Added missing 'px' unit to max-width in media query

#### Test Coverage for Elements Utilities

- **827 passing tests with 100% pass rate** (40 test suites)
- **99.72% overall code coverage** (99.15% branches, 100% functions, 100% lines)
- Comprehensive test coverage added for all 35+ migrated utilities:
  - **Accessibility tests** (4 suites, 20 tests) - Focus management, zoom detection, motion preferences
  - **Animation tests** (3 suites, 28 tests) - Shrink/scroll animations, link span wrapping
  - **Date tests** (2 suites, 22 tests) - Date formatting and comparison with UTC handling
  - **DOM tests additions** (3 suites, 21 tests) - findParent, wrapTextNodeInSpan, cleanCopy
  - **Events tests** (1 suite, 14 tests) - Touch swipe detection
  - **Media tests** (4 suites, 32 tests) - SVG/image conversion, responsive sizing, icon extraction
  - **Network tests** (1 suite, 18 tests) - GraphQL fetch with auth and error handling
  - **Performance tests** (1 suite, 17 tests) - Debounce functionality with context preservation
  - **Storage tests** (2 suites, 24 tests) - localStorage int/timestamp operations
  - **String tests additions** (3 suites, 38 tests) - HTML truncation, responsive truncation, pixel parsing
  - **Styles tests** (6 suites, 47 tests) - JSS conversion, media queries, style combination
- Test patterns follow existing conventions: happy path, edge cases, error conditions
- All edge cases resolved: timezone handling, null safety, color format expectations

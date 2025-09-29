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
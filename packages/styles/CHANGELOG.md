# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.8.0 (2025-12-08)

**Note:** Version bump only for package @universityofmaryland/web-styles-library

# Changelog - Styles Package

All notable changes to the `@universityofmaryland/web-styles-library` package will be documented in this file.

## [1.7.3] - 2025-12-06

### Removed

- **BREAKING**: Removed `./token` export and re-export module
- Removed token directory entirely - design tokens now exclusively in `@universityofmaryland/web-token-library`

### Migration Required

- **All consumers** must update token imports:
  - ❌ Old: `import * as token from '@universityofmaryland/web-styles-library/token'`
  - ✅ New: `import * as token from '@universityofmaryland/web-token-library'`
- Install `@universityofmaryland/web-token-library` as a direct dependency
- See tokens package documentation for complete import patterns

## [1.7.2] - 2025-12-06

### Changed

- **Internal**: Migrated design tokens to standalone `@universityofmaryland/web-token-library` package
- Added `@universityofmaryland/web-token-library` as a dependency
- Removed token source files (color.ts, font.ts, media.ts, spacing.ts) - migrated to tokens package

## [1.5.0] - Current

### Added

- Image height base utilities in recent updates

### Changed

- Various style adjustments to support element model conversions

## [1.4.2] - Previous Release

### Features

- JSS (JavaScript Style Sheets) objects for design system
- Design tokens for colors, spacing, typography, and media queries
- CSS variable integration
- PostCSS processing with nesting support
- TypeScript definitions for all style objects

### Core Modules

- **token/** - Design tokens (colors, spacing, fonts, media queries)
- **typography/** - Font definitions and text styles
- **element/** - UI component styles (buttons, forms, cards, etc.)
- **layout/** - Layout utilities (grid, alignment, backgrounds)
- **animation/** - Transitions and animations
- **accessibility/** - Screen reader and skip navigation utilities
- **utilities/** - Helper functions for JSS/CSS transformation

### Media Query Breakpoints

- Mobile: 0-767px
- Tablet: 768-1023px
- Desktop: 1024px+

## Notes

This package is the foundation of the UMD Design System with no internal dependencies on other UMD packages.

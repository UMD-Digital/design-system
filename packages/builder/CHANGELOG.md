# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

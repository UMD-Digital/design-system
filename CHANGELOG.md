# Change Log

All notable changes to the University of Maryland Design System will be documented in this file.

This project uses [Lerna](https://lerna.js.org/) for managing multiple packages within the monorepo. Each package maintains independent versioning.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Package Versions

Current package versions:
- **components**: 1.16.0-beta.1
- **elements**: 1.5.4
- **feeds**: 1.2.4
- **styles**: 1.7.2
- **utilities**: 1.0.2
- **tokens**: 1.0.0
- **model**: 1.0.0
- **builder**: 1.0.0
- **icons**: 1.0.1

---

## [Unreleased]

### Changed

**Build System Modernization**
- **ES Modules Only**: Removed CommonJS output from all packages
  - All packages now use `formats: ['es']` in Vite config
  - All package.json files now include `"type": "module"`
  - Removed `require` entries from package.json exports
  - Output files changed from `.mjs` to `.js`
- **Named Exports Only**: Converted all default exports to named exports
  - tokens: `color` and `spacing` are now named exports
  - styles: `webComponentStyles` and `createTokens` are now named exports
  - model: `Slots`, `AttributeNames`, `AttributeValues`, `handler` are now named exports
  - feeds: All feed functions converted to named exports (`eventsGrid`, `eventsList`, `eventsSlider`, `eventsGrouped`, `newsGrid`, `newsList`, `newsFeatured`, `expertsGrid`, `expertsList`, `expertsBio`, `academicSlider`, `createSliderWidget`)
  - feeds/states: Removed legacy APIs (`loader`, `noResults`, `buttonLazyLoad`, `ariaLive`). Use class-based APIs instead (`LoadingState`, `EmptyState`, `PaginationState`, `Announcer`)
  - All packages follow consistent named export pattern for optimal tree-shaking
- Updated vite.config.ts files to use ES module imports instead of `require()`

### Added

**Phase 1 & 2: Core Release Automation**
- **Automated Release Workflow**: GitHub Actions workflow for publishing packages
  - Manual trigger with version bump selection
  - Support for pre-releases (alpha, beta, rc)
  - Dry-run mode for testing
  - Automated testing, building, and publishing
  - Badge updates and changelog generation
  - GitHub release creation
- **Release Documentation**:
  - Consolidated release management guide ([.github/RELEASE_GUIDE.md](.github/RELEASE_GUIDE.md))
  - Validation report with test results ([.github/VALIDATION_REPORT.md](.github/VALIDATION_REPORT.md))
- Enhanced badge update script with dry-run and package-specific modes
- This CHANGELOG file to track all package changes
- PublishConfig to all package.json files for scoped package publishing
- Version badges for all 9 packages (icons, tokens, builder, model, utilities, styles, elements, feeds, components)

**Phase 3: Enhanced Features**
- **Notification System**: Automated Slack and Discord notifications
  - Release started, success, and failure notifications
  - Rich message formatting with links to NPM and releases
  - Configurable via GitHub Secrets (optional)
  - Separate reusable workflow for notifications
- **Release Template**: Standardized GitHub release notes template
  - Sections for breaking changes, features, bug fixes
  - Migration guide template
  - Package version listing
  - Links to documentation and NPM
- **Workflow Integration**: Enhanced main release workflow
  - Automatic notification on success/failure
  - Package list collection and reporting
  - Workflow output for downstream jobs

**Phase 4: Advanced Features**
- **Package-Specific Release Workflow**: Release individual packages
  - Dedicated workflow for single-package releases
  - Automatic dependency building in correct order
  - Supports all version bump types and pre-releases
  - Perfect for hotfixes and independent updates
- **Consolidated Documentation**:
  - Single comprehensive release management guide ([.github/RELEASE_GUIDE.md](.github/RELEASE_GUIDE.md))
  - Covers setup, standard workflows, and advanced features
  - Package-specific release instructions
  - Notification setup guides (Slack & Discord)
  - Release template usage guide
  - Workflow integration patterns
  - Troubleshooting for all scenarios

### Changed
- Lerna configuration updated for independent versioning with conventional commits
- Badge update script moved from `source/` to `scripts/` directory
- Root package.json updated with CI/CD helper scripts:
  - `test:all` - Run all tests with mocks
  - `build` and `build:ci` - Build all packages
  - `version:check` and `version:dry-run` - Version preview commands
- **Documentation restructure**: Moved all release docs to `.github/` directory
  - Consolidated 3 separate guides into single `RELEASE_GUIDE.md`
  - Moved validation report to `.github/VALIDATION_REPORT.md`
  - Keeps `docs/` directory for external user-facing documentation only
  - All internal release process docs now in `.github/` with workflows

---

## Historical Releases

---

## [1.16] - 2025-01-05

### Summary
Major release introducing three new foundational packages (Tokens, Model, and Builder), migrating elements to a standardized ElementBuilder pattern, and establishing automated CI/CD workflows for package management.

### New Packages
- **Tokens v1.0.0**: Design token primitives extracted from styles package
  - Color palettes, spacing scales, typography, and media query tokens
  - Zero runtime dependencies
  - ES, CJS, and UMD build outputs

- **Model v1.0.0**: Web component model utilities
  - Attribute handling system with centralized names and values
  - Slot management with validation and deprecation warnings
  - Component registration with duplicate prevention
  - Lifecycle management utilities

- **Builder v1.0.0**: Chainable element builder with lifecycle management
  - Fluent API for constructing DOM elements
  - StyleManager for JSS-to-CSS compilation
  - LifecycleManager for event listener and observer cleanup
  - CSS cascade-based priority system for style merging

### Added
- **Utility Navigation**: Support for 20+ languages
- **Events Grouped Component**: Date-grouped events with filtering
- **Automated Release Workflow**: GitHub Actions for package publishing
  - Manual trigger with version bump selection
  - Support for pre-releases (alpha, beta, rc)
  - Badge updates and changelog generation
- **Composable Style Functions**: Throughout styles package for flexible variant generation

### Changed
- **ElementBuilder Migration**: Converted composite and atomic elements to builder pattern
  - Person, Hero, Cards, Footer, Alert components converted
  - Standardized API across all elements
- **Theme System**: Expanded theme options with compose functions
- **CI/CD**: Individual package release automation with dependency graph support

### Fixed
- Theme color inconsistencies in Person Hero and Card components
- Hero Standard alignment issues with centered text
- Carousel theme styling
- CI/CD package naming and Lerna bootstrap compatibility

---

## [1.15] - 2024-12

### Summary
Introduced new Icons and Utilities packages, enhanced monorepo architecture, and converted Quote and Footer elements to Element Model pattern.

### New Packages
- **Icons v1.0.0**: Standalone SVG assets library
  - Category-based organization (alerts, brand, communication, navigation, social, etc.)
  - Tree-shakeable named exports
  - Zero runtime dependencies

- **Utilities v0.1.0**: Shared utility functions
  - DOM manipulation (addClass, removeClass, toggleClass)
  - Style conversion (JSS to CSS)
  - Performance utilities (debounce, throttle)
  - Network utilities (GraphQL, fetch wrappers)

### Added
- **Quote Element**: Element Model conversion with animation lifecycle
- **Footer Element**: Element Model conversion with social icon mobile display
- **GIF Support**: Extended to Pathway and Hero elements
- **Granular Exports**: Implemented across packages for smaller bundle sizes

### Changed
- **Monorepo Architecture**: Enhanced through utility package extraction
- **Vite Resolution**: Improved for local dependencies

### Fixed
- CDN build compatibility issues
- Banner Promo SVG-to-IMG conversion
- Hero grid Firefox reduce-motion support
- Card Stack and media GIF sizing problems

---

## [1.14] - 2024-11

### Summary
Converted Pathway components to Element Model pattern, added Event Details and Media GIF elements, and migrated all packages to Vite bundler for optimized payloads.

### Added
- **Event Details Element**: New element for displaying event metadata
- **Media GIF Element**: Support for animated GIF with link support
- **Stats Element**: Atomic stats display component
- **Text Lockup**: Atomic text composition elements
- **Pathway Components**: Converted to Element Model pattern
  - Pathway Overlay
  - Pathway Highlight
  - Pathway Sticky
- **Jest Testing Library**: Added to Components Package

### Changed
- **Vite Build System**: All packages transitioned to Vite for reduced bundle sizes
- **Code Splitting**: Enhanced with granular exports directory structure
- **GIF Support**: Extended to Hero Stacked and Pathway variants

### Fixed
- Layout shift issues with categories during loading
- Pathway highlighting color and sizing concerns
- Hero dark theme support across variants
- Circular dependency issues in Styles package

---

## Foundation Packages

### Tokens v1.0.0 (2024-12)

**Initial Release - Design Token Library**

#### Added
- Complete design token system
- Color tokens (brand colors, grays)
- Spacing tokens (responsive scale)
- Typography tokens (fonts, weights, sizes)
- Media query tokens (breakpoints)
- CDN build for browser usage

### Model v1.0.0 (2024-12)

**Initial Release - Web Component Model**

#### Added
- Element Model pattern utilities
- Base classes for web components
- Attribute system with centralized names/values
- Slot management helpers with validation
- Component registration utilities

### Builder v1.0.0 (2024-12)

**Initial Release - Element Builder**

#### Added
- Fluent builder API for element construction
- StyleManager for JSS compilation
- LifecycleManager for resource tracking
- CSS cascade priority system
- Integration with UMD Design System styles

### Icons v1.0.1 (2024-11)

**Initial Release - Icon Library**

#### Added
- Complete SVG icon set (14 categories)
- UMD logo assets
- Category-based organization
- Tree-shakeable exports

---

## Release Types

### Breaking Changes
Changes that require consumer code modifications. These trigger major version bumps.

### Features
New functionality that maintains backward compatibility. These trigger minor version bumps.

### Bug Fixes
Patches that fix issues without changing the API. These trigger patch version bumps.

### Dependencies
Updates to internal package dependencies.

---

## Migration Guides

When breaking changes occur, migration guides will be provided in the release notes for each affected package.

---

## Contributing

For information about contributing to this project and understanding our release process, please see the [Contributing Guide](CONTRIBUTING.md).

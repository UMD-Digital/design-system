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

### Components v1.16.0-beta.1 (2025-12-06)

**Beta Release - Component Library Enhancements**

#### Added
- Enhanced component exports and build configuration
- Improved TypeScript declarations

### Components v1.15.8 (Previous Release)

**Stable Release**

### Elements v1.5.4 (Previous Release)

**Bug Fixes and Improvements**

### Feeds v1.2.4 (Previous Release)

**Feed Component Updates**

### Styles v1.7.2 (Previous Release)

**Style System Enhancements**

### Utilities v1.0.2 (Previous Release)

**Initial Stable Release**

### Tokens v1.0.0 (2024)

**Initial Release - Design Token Library**

#### Added
- Complete design token system
- Color tokens (brand colors, grays)
- Spacing tokens (responsive scale)
- Typography tokens (fonts, weights, sizes)
- Media query tokens (breakpoints)

### Model v1.0.0 (2024)

**Initial Release - Web Component Model**

#### Added
- Element Model pattern utilities
- Base classes for web components
- Attribute and slot management helpers

### Builder v1.0.0 (2024)

**Initial Release - Element Builder**

#### Added
- Element builder utilities for styled elements
- Integration with token system

### Icons v1.0.1 (2024)

**Initial Release - Icon Library**

#### Added
- Complete SVG icon set
- UMD logo assets
- Category-based organization

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

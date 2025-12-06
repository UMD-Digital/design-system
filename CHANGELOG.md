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

### Added
- Automated release workflow with GitHub Actions
- Enhanced badge update script with dry-run and package-specific modes
- This CHANGELOG file to track all package changes

### Changed
- Lerna configuration updated for independent versioning with conventional commits
- Badge update script moved from `source/` to `scripts/` directory

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

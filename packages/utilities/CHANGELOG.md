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
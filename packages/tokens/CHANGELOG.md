# Changelog

All notable changes to the Tokens package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-12-06

### Added
- **Initial release** of standalone tokens package
- Extracted design tokens from `@universityofmaryland/web-styles-library`
- Color tokens with UMD brand colors and gray scale
- Spacing tokens with consistent scale and max-width constraints
- Typography tokens (font families, sizes, weights)
- Media query tokens with breakpoints and utilities
- ES Module and CommonJS builds
- UMD/CDN build for browser usage
- Full TypeScript declarations
- Comprehensive documentation and examples
- Zero runtime dependencies
- Tree-shakable module exports

### Migration Notes
- This package replaces token imports from `@universityofmaryland/web-styles-library/token`
- For backward compatibility, styles package continues to re-export tokens
- No breaking changes for existing consumers
- New projects should import directly from `@universityofmaryland/web-token-library`

## Future Versions

See [plan.md](plan.md) for roadmap including Figma integration (v2.0.0+).

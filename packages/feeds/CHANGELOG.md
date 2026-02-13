# Changelog - Feeds Package

All notable changes to the `@universityofmaryland/web-feeds-library` package will be documented in this file.

## [1.3.4] - Current

### Changes
- Events: conditional target blank for links
- Experts: support for Bluesky and Substack social profiles

## [1.3.2]

### Changes
- Bug fixes and refinements

## [1.3.0] - Release 1.17.1

### Features
- **In-The-News feeds**: Grid and list layouts via factory pattern
- Experts: filter by IDs support
- Experts: media trained filter

## [1.2.5 - 1.2.9]

### Features
- **Experts feeds**: Grid and list layouts via factory pattern
- **Experts bio**: Single expert biography (specialized)
- **Experts in-the-news**: Expert + news coverage (specialized)
- Expert list base factory implementation
- Beta releases for expert feeds testing

### Changes
- Peer dependency structure updates
- Package export default fallbacks
- CommonJS exports removed (ES Modules only)

## [1.1.0 - 1.2.4]

### Features
- **Factory pattern**: Composable `createBaseFeed` with strategy system
- **Strategy system**: Reusable fetch, display, and layout strategies
- **Events grid/list**: Migrated to factory pattern
- **News grid/list**: Migrated to factory pattern
- **News featured**: Specialized featured layout
- **Events grouped**: Date-grouped event layout
- **Layout strategies**: `gridLayout`, `gridGapLayout`, `gridBorderLayout`, `stackedLayout`, `gridOffsetLayout`, `createFeaturedLayoutStrategy`

### Changes
- Vite build with multiple entry points for reduced bundle size
- Token package integration
- Grouped list border separators
- Events grouped headlines
- Events without image support

## [1.0.4 - 1.0.9]

### Features
- Initial dynamic content feed components
- Events feeds (grid, list, grouped, slider)
- News feeds (grid, list, featured)
- Academic feeds (slider)
- Shadow DOM style encapsulation
- API integration with UMD content APIs
- Lazy loading / pagination support
- Loading, empty, and announcer state classes

### Dependencies
- `@universityofmaryland/web-elements-library`
- `@universityofmaryland/web-styles-library`
- `@universityofmaryland/web-utilities-library`
- `@universityofmaryland/web-builder-library`
- `@universityofmaryland/web-token-library`

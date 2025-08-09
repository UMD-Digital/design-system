# Changelog - Components Package

All notable changes to the `@universityofmaryland/web-components-library` package will be documented in this file.

## [1.13.0-beta.3] - Current Beta

### Recent Changes
- **Hero Components**: Container inline type updates across all hero variants
  - Brand video
  - Grid  
  - Expand
  - Logo
  - Minimal
  - Overlay
  - Standard
  - Stacked

## [1.13.0-beta.2] - Previous Beta

### Changes
- **Card**: Block variant image sizing improvements
- **Card**: Inline size adjustments

## [1.10.11] - Previous Stable Release

### Features
- High-level web components built on elements library
- Shadow DOM for style encapsulation
- Slot-based content distribution system
- TypeScript with full type definitions
- WCAG 2.1 AA accessibility compliance

### Component Categories

#### Core Components
- **accordion** - Expandable content sections
- **alert** - Notification messages
- **banner** - Page headers and promotional content
- **brand** - UMD branding elements
- **button** - Interactive button components
- **card** - Content cards with multiple variants (standard, overlay, list, block)
- **carousel** - Image/content sliders
- **feed** - Dynamic content feeds
- **footer** - Page footers
- **grid** - Layout grids
- **hero** - Hero sections with multiple variants
- **lock** - Content locking mechanisms
- **modal** - Dialog modals
- **navigation** - Navigation menus and breadcrumbs
- **person** - Person profile displays
- **quote** - Quote blocks
- **stat** - Statistics displays
- **tab** - Tabbed content
- **testimonial** - Testimonial displays

### Architecture Highlights

#### Component Structure
- **API files** (`/api/[component]/`) - Custom element class definitions
- **Model system** - Attributes, slots, and registration utilities
- **Type system** - Modular types with clear separation of concerns
- **Lifecycle hooks** - Standard hooks for component initialization

#### Attribute System
- **Configuration attributes** (`data-*`) - Initial state/configuration
- **Observed attributes** - Reactive behavior triggers
  - `resize` - Component recalculation
  - `data-visual-open` - Open/closed state
  - `data-layout-hidden` - Visibility control
  - `data-layout-position` - Position value

### Dependencies
- Depends on `@universityofmaryland/web-elements-library`
- Depends on `@universityofmaryland/web-styles-library`

## Migration Notes

### Deprecations (for v2.0)
- Non-prefixed attributes (use `data-*` prefix)
- Legacy slot names (see individual component documentation)

## Notes

This package provides complete web components ready for use in UMD digital properties. Components follow Web Components standards and can be used in any modern web framework or vanilla JavaScript.
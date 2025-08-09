# Changelog - Elements Package

All notable changes to the `@universityofmaryland/web-elements-library` package will be documented in this file.

## [1.3.7] - Current

### Recent Changes
- **Carousel**: Wide variant conversion to element model pattern
- **Hero Grid**: Removed unnecessary variable
- **Card**: Block variant image sizing improvements  
- **Card**: Inline size adjustments
- **Hero Variants**: Container inline type updates across multiple hero types
  - Brand video
  - Grid
  - Expand
  - Logo
  - Minimal
  - Overlay
  - Standard
  - Stacked

## [1.2.0] - Previous Release

### Features
- Foundational UI elements using the element model pattern
- Atomic and composite building blocks for UMD digital properties
- TypeScript support with full type definitions
- Modular architecture with tree-shakable exports

### Core Structure
- **Atomic Elements** (`/atomic/`)
  - actions (buttons, links)
  - animations (transitions, loaders)
  - assets (images, icons)
  - buttons (specialized button components)
  - events (event-related UI)
  - layout (basic layout components)
  - text-lockup (text groupings)

- **Composite Elements** (`/composite/`)
  - accordion, alert, banner, card, carousel
  - footer, hero, navigation, person, quote
  - Multiple variations per component

- **Layout** - Page layout controls
- **Model** - Element creation and interaction patterns
- **Utilities** - Helper functions for accessibility, assets, markup, and styles

### Element Model Pattern
All elements return:
```javascript
{
  element: HTMLElement,
  styles: string,
  update?: (props) => void,
  destroy?: () => void
}
```

### Dependencies
- Depends on `@universityofmaryland/web-styles-library`

## Notes

This package provides the foundational building blocks for the components and feeds packages.
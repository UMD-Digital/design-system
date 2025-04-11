# University of Maryland Design System

[![Components Version](https://img.shields.io/badge/Components-v1.9.10-blue)](https://www.npmjs.com/package/@universityofmaryland/web-components-library)
[![Elements Version](https://img.shields.io/badge/Elements-v1.2.0-blue)](https://www.npmjs.com/package/@universityofmaryland/web-elements-library)
[![Feeds Version](https://img.shields.io/badge/Feeds-v1.0.0-blue)](https://www.npmjs.com/package/@universityofmaryland/web-feeds-library)
[![Styles Version](https://img.shields.io/badge/Styles-v1.1.1-blue)](https://www.npmjs.com/package/@universityofmaryland/web-styles-library)

The University of Maryland's Design System is intended for use by university campus entities and partners. The packages prompt consistency in brand, design, and accessibility compliance across university web properties.

## Packages

The design system consists of the following packages:

- **[Components](packages/components/README.md)**: High-level web components built from the elements library for interfaces, interactivity, layout, and data feeds
- **[Elements](packages/elements/README.md)**: Foundational UI elements that make up the components
- **[Feeds](packages/feeds/README.md)**: Components for displaying dynamic content feeds (news, events, etc.)
- **[Styles](packages/styles/README.md)**: JSS objects and utilities for styling consistent with UMD brand guidelines

### For information, visit [UMD Design Site Website](https://designsystem.umd.edu)

### For documentation, visit [UMD Design Site Github Pages](https://umd-digital.github.io/design-system/)

## Development

### Testing

Run tests across all packages:
```
yarn test
```

Run tests for a specific package:
```
yarn styles:test  # Test the styles package
```

Run tests with coverage reports:
```
cd packages/styles && yarn test:coverage
```

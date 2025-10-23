# University of Maryland Design System

[![Components Version](https://img.shields.io/badge/Components-v1.15.5-blue)](https://www.npmjs.com/package/@universityofmaryland/web-components-library)
[![Elements Version](https://img.shields.io/badge/Elements-v1.5.3-blue)](https://www.npmjs.com/package/@universityofmaryland/web-elements-library)
[![Feeds Version](https://img.shields.io/badge/Feeds-v1.2.1-blue)](https://www.npmjs.com/package/@universityofmaryland/web-feeds-library)
[![Styles Version](https://img.shields.io/badge/Styles-v1.7.0-blue)](https://www.npmjs.com/package/@universityofmaryland/web-styles-library)
[![Utilities Version](https://img.shields.io/badge/Utilities-v1.0.1-blue)](https://www.npmjs.com/package/@universityofmaryland/web-utilities-library)
[![Icons Version](https://img.shields.io/badge/Icons-v1.0.1-blue)](https://www.npmjs.com/package/@universityofmaryland/web-icons-library)

The University of Maryland's Design System is intended for use by university campus entities and partners. The packages prompt consistency in brand, design, and accessibility compliance across university web properties.

### For information, visit [UMD Design System Website](https://designsystem.umd.edu)

### For storybook, visit [UMD Design System Playground](http://playground.designsystem.umd.edu)

### For documentation, visit [UMD Design System Github Pages](https://umd-digital.github.io/design-system/)

## Packages

### Primary Package

- **[Components](packages/components/README.md)**: High-level Web Components (Custom Elements) that bundle all design system packages for easy consumption. Provides encapsulated, reusable components with Shadow DOM for interfaces, interactivity, layout, and data feeds. **This is the recommended starting point for most projects.**

### Core Packages

Mid-level building blocks that combine foundation packages:

- **[Styles](packages/styles/README.md)**: JSS objects, design tokens, and style utilities consistent with UMD brand guidelines. Includes colors, typography, spacing, media queries, and layout patterns.

- **[Elements](packages/elements/README.md)**: Foundational UI element builders that create consistent, accessible HTML structures. Includes atomic components (typography, actions, media) and composite components (cards, navigation, tabs, sliders).

- **[Feeds](packages/feeds/README.md)**: Dynamic content feed components for displaying news articles, events, testimonials, and data visualizations from various data sources.

### Foundation Packages

Low-level primitives for building custom implementations:

- **[Icons](packages/icons/README.md)**: SVG icon and logo assets organized by category for optimal tree-shaking. Includes navigation, controls, social media, brand assets, and UMD logos.

- **[Utilities](packages/utilities/README.md)**: Shared utility functions organized into 14 categories: accessibility, adapters, animation, date, DOM manipulation, elements, events, media, network, performance, storage, string processing, style utilities, and validation. Includes 100% test coverage and comprehensive TypeDoc documentation.

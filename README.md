# University of Maryland Design System

[![Components Version](https://img.shields.io/badge/Components-v1.16.0-beta.1-blue)](https://www.npmjs.com/package/@universityofmaryland/web-components-library)
[![Elements Version](https://img.shields.io/badge/Elements-v1.5.4-blue)](https://www.npmjs.com/package/@universityofmaryland/web-elements-library)
[![Feeds Version](https://img.shields.io/badge/Feeds-v1.2.4-blue)](https://www.npmjs.com/package/@universityofmaryland/web-feeds-library)
[![Styles Version](https://img.shields.io/badge/Styles-v1.7.3-blue)](https://www.npmjs.com/package/@universityofmaryland/web-styles-library)
[![Model Version](https://img.shields.io/badge/Model-v1.0.0-blue)](https://www.npmjs.com/package/@universityofmaryland/web-model-library)
[![Tokens Version](https://img.shields.io/badge/Tokens-v1.0.0-blue)](https://www.npmjs.com/package/@universityofmaryland/web-token-library)
[![Builder Version](https://img.shields.io/badge/Builder-v1.0.0-blue)](https://www.npmjs.com/package/@universityofmaryland/web-builder-library)
[![Utilities Version](https://img.shields.io/badge/Utilities-v1.0.2-blue)](https://www.npmjs.com/package/@universityofmaryland/web-utilities-library)
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

- **[Styles](packages/styles/README.md)**: JSS (JavaScript Style Sheets) objects and style utilities consistent with UMD brand guidelines. Re-exports design tokens from the Tokens package for backwards compatibility. Includes layout patterns, typography styles, and CSS transformation utilities.

- **[Elements](packages/elements/README.md)**: Foundational UI element builders that create consistent, accessible HTML structures. Includes atomic components (typography, actions, media) and composite components (cards, navigation, tabs, sliders).

- **[Feeds](packages/feeds/README.md)**: Dynamic content feed components for displaying news articles, events, testimonials, and data visualizations from various data sources.

### Foundation Packages

Low-level primitives for building custom implementations:

- **[Tokens](packages/tokens/README.md)**: Design tokens as the single source of truth for UMD brand. Includes color palettes, typography scales, spacing systems, and media query breakpoints. Supports ES, CJS, and UMD formats with zero runtime dependencies. Foundation for the planned Figma-to-code token pipeline.

- **[Model](packages/model/README.md)**: Web component model utilities for building custom elements. Provides attribute handling, slot management, component registration, lifecycle hooks, and the base model system for creating web components with Shadow DOM, validation, and error handling.

- **[Builder](packages/builder/README.md)**: Fluent API for building DOM elements with integrated styling, lifecycle management, and animation support. Provides `ElementBuilder` class for chainable element construction, automatic style merging from child elements, and seamless integration with UMD Design System styles via `.styled()` method.

- **[Icons](packages/icons/README.md)**: SVG icon and logo assets organized by category for optimal tree-shaking. Includes navigation, controls, social media, brand assets, and UMD logos.

- **[Utilities](packages/utilities/README.md)**: Shared utility functions organized into 14 categories: accessibility, adapters, animation, date, DOM manipulation, elements, events, media, network, performance, storage, string processing, style utilities, and validation. Includes 100% test coverage and comprehensive TypeDoc documentation.

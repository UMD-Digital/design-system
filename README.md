# University of Maryland Design System

[![Components Version](https://img.shields.io/badge/Components-v1.17.0-blue)](https://www.npmjs.com/package/@universityofmaryland/web-components-library)

[![Elements Version](https://img.shields.io/badge/Elements-v1.6.0-blue)](https://www.npmjs.com/package/@universityofmaryland/web-elements-library) [![Feeds Version](https://img.shields.io/badge/Feeds-v1.3.0-blue)](https://www.npmjs.com/package/@universityofmaryland/web-feeds-library) [![Styles Version](https://img.shields.io/badge/Styles-v1.7.6-blue)](https://www.npmjs.com/package/@universityofmaryland/web-styles-library)

[![Model Version](https://img.shields.io/badge/Model-v1.0.1-blue)](https://www.npmjs.com/package/@universityofmaryland/web-model-library) [![Builder Version](https://img.shields.io/badge/Builder-v1.0.0-blue)](https://www.npmjs.com/package/@universityofmaryland/web-builder-library) [![Utilities Version](https://img.shields.io/badge/Utilities-v1.0.3-blue)](https://www.npmjs.com/package/@universityofmaryland/web-utilities-library) [![Tokens Version](https://img.shields.io/badge/Tokens-v1.0.1-blue)](https://www.npmjs.com/package/@universityofmaryland/web-token-library) [![Icons Version](https://img.shields.io/badge/Icons-v1.0.1-blue)](https://www.npmjs.com/package/@universityofmaryland/web-icons-library)

The University of Maryland Design System is a comprehensive monorepo of design tokens, Web Components, utilities, and styling tools built for university campus entities and partners. It provides a foundation for creating consistent, accessible, and brand-compliant web experiences across all university digital properties. Whether you need ready-to-use Web Components, flexible element builders for custom implementations, or low-level design tokens and utilities, the system offers packages at multiple abstraction levels to support diverse development workflows and technical requirements.

## Documentation & Resources

### [UMD Design System Website](https://designsystem.umd.edu)

The official marketing and information site provides an overview of the design system, getting started guides, design principles, brand guidelines, and usage recommendations. This is the best starting point for new users to understand the system's philosophy and capabilities.

### [UMD Design System Playground](http://playground.designsystem.umd.edu)

An interactive Storybook environment showcasing all components with live examples, visual documentation, and interactive controls. Use the playground to explore component variants, test different configurations, copy code snippets, and experiment with design system features in real-time.

### [UMD Design System GitHub Pages](https://umd-digital.github.io/design-system/)

Comprehensive technical documentation generated from TypeDoc, including complete API references, type definitions, function signatures, and detailed package documentation. This resource is essential for developers working with the system at a technical level.

## Packages

### Primary Package

- **[Components](packages/components/README.md)**: High-level Web Components (Custom Elements) following W3C standards that bundle all design system packages for easy consumption. Provides encapsulated, reusable components with Shadow DOM for style isolation, slot-based content distribution, and reactive attribute handling. Includes navigation, content, layout, interactive, and media components with automatic accessibility and brand compliance. **This is the recommended starting point for most projects.**

### Core Packages

Mid-level building blocks that combine foundation packages:

- **[Feeds](packages/feeds/README.md)**: Dynamic content feed components for displaying University of Maryland news, events, and academic information with automatic updates, caching, and error handling. Supports multiple layouts (grid, list, featured, slider) with lazy loading and responsive design. Built on Elements and Styles packages for consistent presentation.

- **[Elements](packages/elements/README.md)**: Foundational UI element builders that return Element Model objects containing DOM nodes and associated styles. Provides atomic components (typography, actions, media) and composite components (cards, navigation, hero sections, tabs, carousels) with framework-agnostic, imperative APIs. All elements follow WCAG 2.1 AA standards and support lightweight, tree-shakeable usage.

- **[Styles](packages/styles/README.md)**: JSS (JavaScript Style Sheets) objects and style utilities consistent with UMD brand guidelines. Features composable style functions for flexible customization, Tailwind CSS integration support, and pre/post render CSS bundles. Re-exports design tokens from the Tokens package for backwards compatibility. Includes layout patterns, typography styles, utility classes, and CSS transformation utilities with WCAG 2.1 AA compliance.

### Foundation Packages

Low-level primitives for building custom implementations:

- **[Model](packages/model/README.md)**: Core Web Components utilities extracted from the Components package for reusable component development. Provides a custom element factory (`createCustomElement`), comprehensive attribute observation and state checking, slot validation with required/allowed element enforcement, component registration utilities, and common lifecycle hooks. Enables standardized Web Component patterns with Shadow DOM encapsulation.

- **[Builder](packages/builder/README.md)**: Modern fluent builder API for creating HTML elements with chainable method calls and automatic style compilation. Features CSS animation support, custom event attachment, ElementModel children with auto-style merging, non-destructive element access, and priority-based style cascading. Integrates seamlessly with UMD Design System styles library for creating pre-styled components. Returns Element Model objects with built elements, compiled CSS, and optional lifecycle methods.

- **[Tokens](packages/tokens/README.md)**: Design tokens as the single source of truth for UMD brand values. Provides color palettes, typography scales, spacing systems, and media query breakpoints with zero runtime dependencies. Supports ES Modules, CommonJS, and UMD formats. Designed as the foundation for a planned automated Figma-to-code token synchronization pipeline to enable designer-driven updates without developer intervention.

- **[Icons](packages/icons/README.md)**: SVG icon and logo assets generated from Figma design files and organized by category for optimal tree-shaking. All icons include proper accessibility attributes (aria-hidden, title) and are exported as optimized SVG strings. Includes navigation, controls, social media, calendar, location, communication, brand assets, and official UMD logos with dark/light variants.

- **[Utilities](packages/utilities/README.md)**: Comprehensive collection of shared utility functions organized into 14 categories with 100% test coverage (48 test suites, 1032+ passing tests). Includes accessibility (focus trap, keyboard navigation), animation (smooth scroll, grid animations), DOM manipulation (addClass, findParent), JSS-to-CSS conversion, date formatting, event handling (swipe detection), media utilities, network (GraphQL fetch), performance (debounce), storage wrappers, string processing, and validation. All utilities are tree-shakeable with category-based and individual function imports.

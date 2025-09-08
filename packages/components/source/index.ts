/**
 * Main entry point for the University of Maryland Web Components Library.
 * Provides web components, base elements, and utilities for building
 * consistent, accessible web interfaces following UMD design standards.
 *
 * ## Quick Start
 *
 * Register all components at once:
 * ```typescript
 * import LoadUmdComponents from '@universityofmaryland/web-components-library';
 *
 * // Register all components
 * LoadUmdComponents();
 * ```
 *
 * Or import specific components:
 * ```typescript
 * import { Components } from '@universityofmaryland/web-components-library';
 *
 * // Register specific components
 * Components.card.standard();
 * Components.hero.base();
 * ```
 *
 * ## Exports
 *
 * - **Components** - All web component registration functions
 * - **Elements** - Base element classes and primitives from web-elements-library
 * - **Utilities** - Helper functions for animations, markup, and more
 * - **LoadUmdComponents** - Function to register all components at once
 */
import * as umdComponents from './api';
import * as umdUtilities from './utilities';
import { loadComponentClass, ComponentMap } from './exports/loader';

const allList = umdComponents as unknown as ComponentMap;

/**
 * Registers all UMD web components with the browser.
 * Also initializes the intersection observer for animations.
 *
 * @example
 * ```typescript
 * import LoadUmdComponents from '@universityofmaryland/web-components-library';
 *
 * // Register all components when DOM is ready
 * document.addEventListener('DOMContentLoaded', () => {
 *   LoadUmdComponents();
 * });
 * ```
 */
const LoadUmdComponents = () => {
  loadComponentClass(allList);
};

/**
 * All web component registration functions organized by category.
 * Each component must be called to register it with the browser.
 *
 * @example
 * ```typescript
 * import { Components } from '@universityofmaryland/web-components-library';
 *
 * // Register card components
 * Components.card.standard();
 * Components.card.overlay();
 * ```
 */
export const Components = umdComponents;

/**
 * Utility functions for animations, markup creation, validation, and more.
 * Combines utilities from both this library and the web-elements-library.
 *
 * @example
 * ```typescript
 * import { Utilties } from '@universityofmaryland/web-components-library';
 *
 * // Use animation utilities
 * Utilties.Animations.loadIntersectionObserver();
 *
 * // Create markup
 * const element = Utilties.Markup.create.element({
 *   elementType: 'div',
 *   attributes: { class: 'container' }
 * });
 * ```
 */
export const Utilties = {
  ...umdUtilities,
};

export default LoadUmdComponents;

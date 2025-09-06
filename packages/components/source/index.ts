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
import * as umdComponents from './components';
import * as umdElements from '@universityofmaryland/web-elements-library';
import * as umdUtilities from './utilities';

/**
 * Type definition for a map of component registration functions.
 * Used to organize components by category and variant.
 *
 * @since 1.13.9
 * @example
 * ```typescript
 * import { ComponentMap } from '@universityofmaryland/web-components-library';
 *
 * const myComponents: ComponentMap = {
 *   card: {
 *     standard: () => {...},
 *     overlay: () => {...}
 *   }
 * };
 * ```
 */
export interface ComponentMap {
  [key: string]: {
    [subKey: string]: () => void;
  };
}

const { utility, ...navComponents } = umdComponents.navigation;

const allList = umdComponents as ComponentMap;
const structuralList: ComponentMap = {
  hero: umdComponents.hero,
  navigation: navComponents,
};
const interactiveList: ComponentMap = {
  accordion: umdComponents.accordion,
  carousel: umdComponents.carousel,
  social: umdComponents.social,
  tab: umdComponents.tab,
};
const feedList: ComponentMap = {
  feed: umdComponents.feed,
  slider: umdComponents.slider,
  utility: { utility },
};

/**
 * Utility function to register a collection of UMD web components.
 * Iterates through a ComponentMap and calls each registration function.
 *
 * @param componentMap - Map of component categories to registration functions
 * @since 1.13.9
 * @example
 * ```typescript
 * import { loadComponentClass } from '@universityofmaryland/web-components-library';
 *
 * const myCustomList = {
 *   card: { standard: () => {...}, overlay: () => {...} },
 *   hero: { base: () => {...} }
 * };
 *
 * loadComponentClass(myCustomList);
 * ```
 */
export const loadComponentClass = (componentMap: ComponentMap) => {
  for (const key in componentMap) {
    if (Object.prototype.hasOwnProperty.call(componentMap, key)) {
      const component = componentMap[key];

      for (const subKey in component) {
        if (Object.prototype.hasOwnProperty.call(component, subKey)) {
          component[subKey]();
        }
      }
    }
  }
};

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
  umdUtilities.Animations.loadIntersectionObserver();
};

/**
 * Registers above-the-fold UMD web components (hero and navigation).
 *
 * @since 1.13.9
 * @example
 * ```typescript
 * import { LoadHeadComponents } from '@universityofmaryland/web-components-library';
 *
 * // Register above-the-fold components when DOM is ready
 * document.addEventListener('DOMContentLoaded', () => {
 *   LoadHeadComponents();
 * });
 * ```
 */
export const LoadStructuralComponents = () => {
  console.log('Loading structural components...');
  loadComponentClass(structuralList);
};

/**
 * Registers interactive UMD web components (accordion, carousel, slider, social, tab).
 *
 * @since 1.13.9
 * @example
 * ```typescript
 * import { LoadInteractiveComponents } from '@universityofmaryland/web-components-library';
 *
 * // Register interactive components when DOM is ready
 * document.addEventListener('DOMContentLoaded', () => {
 *   LoadInteractiveComponents();
 * });
 * ```
 */
export const LoadInteractiveComponents = () => {
  loadComponentClass(interactiveList);
};

/**
 * Registers feed UMD web components for dynamic content.
 *
 * @since 1.13.9
 * @example
 * ```typescript
 * import { LoadFeedComponents } from '@universityofmaryland/web-components-library';
 *
 * // Register feed components when DOM is ready
 * document.addEventListener('DOMContentLoaded', () => {
 *   LoadFeedComponents();
 * });
 * ```
 */
export const LoadFeedComponents = () => {
  loadComponentClass(feedList);
};

/**
 * Registers all common UMD web components (excluding above-the-fold, interactive, and feed components).
 *
 * @since 1.13.9
 * @example
 * ```typescript
 * import { LoadCommonComponents } from '@universityofmaryland/web-components-library';
 *
 * // Register common components when DOM is ready
 * document.addEventListener('DOMContentLoaded', () => {
 *   LoadCommonComponents();
 * });
 * ```
 */
export const LoadCommonComponents = () => {
  const excludedKeys = new Set([
    ...Object.keys(structuralList),
    ...Object.keys(interactiveList),
    ...Object.keys(feedList),
  ]);

  const commonList: ComponentMap = {};
  for (const key in allList) {
    if (!excludedKeys.has(key)) {
      commonList[key] = allList[key];
    }
  }

  loadComponentClass(commonList);
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
 * Base element classes and primitives from the web-elements-library.
 * These are the building blocks used by the web components.
 *
 * @example
 * ```typescript
 * import { Elements } from '@universityofmaryland/web-components-library';
 *
 * // Access base element functionality
 * const { Composite, Atomic } = Elements;
 * ```
 */
export const Elements = {
  ...umdElements,
};

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
  ...umdElements.Utilities,
};

export default LoadUmdComponents;

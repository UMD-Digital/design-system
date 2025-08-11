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

interface ComponentMap {
  [key: string]: {
    [subKey: string]: () => void;
  };
}

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
  const list = umdComponents as ComponentMap;

  for (const key in list) {
    if (Object.prototype.hasOwnProperty.call(list, key)) {
      const component = list[key];

      for (const subKey in component) {
        if (Object.prototype.hasOwnProperty.call(component, subKey)) {
          component[subKey]();
        }
      }
    }
  }

  umdUtilities.Animations.loadIntersectionObserver();
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

/**
 * Auto-initialization for CDN usage
 *
 * When the library is loaded via a traditional script tag (not as an ES module),
 * it automatically initializes all web components when the DOM is ready.
 * This provides a zero-configuration experience for CDN users.
 *
 * ## CDN Usage Examples
 *
 * ### Auto-initialization (Simplest)
 * ```html
 * <!-- Components auto-initialize when DOM is ready -->
 * <script src="https://unpkg.com/@universityofmaryland/web-components-library/dist/index.js"></script>
 * ```
 *
 * ### Manual Initialization
 * ```html
 * <script src="https://unpkg.com/@universityofmaryland/web-components-library/dist/index.js"></script>
 * <script>
 *   // Manually initialize if needed
 *   window.UmdWebComponents.init();
 * </script>
 * ```
 *
 * ### Selective Component Loading
 * ```html
 * <script src="https://unpkg.com/@universityofmaryland/web-components-library/dist/index.js"></script>
 * <script>
 *   // Load only specific components
 *   window.UmdWebComponents.Components.card.standard();
 *   window.UmdWebComponents.Components.hero.base();
 * </script>
 * ```
 *
 * ## Global API
 *
 * When loaded via CDN, the following is exposed on `window.UmdWebComponents`:
 * - `init()` - Manually initialize all components (same as LoadUmdComponents)
 * - `Components` - Object containing all component registration functions
 *
 * @remarks
 * - Auto-initialization only occurs for non-module script tags
 * - ES module imports must manually call LoadUmdComponents()
 * - The global object is always created for CDN compatibility
 *
 * @since 1.13.0
 */
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  const currentScript = document.currentScript;
  const isScriptTag =
    currentScript &&
    currentScript.tagName === 'SCRIPT' &&
    !currentScript.type?.includes('module');

  if (isScriptTag) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', LoadUmdComponents);
    } else {
      LoadUmdComponents();
    }
  }

  // Make the library available globally for CDN usage
  (window as any).UmdWebComponents = {
    init: LoadUmdComponents,
    Components,
  };
}

export default LoadUmdComponents;

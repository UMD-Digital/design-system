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

// Export all types from the root _types file
export type {
  // Core interfaces
  ElementRef,
  ComponentRef,

  // Slot configuration types
  SlotConfig,
  SlotConfiguration,

  // Event detail types
  ComponentEventDetail,
  ComponentReadyDetail,
  ComponentErrorDetail,
  ComponentResizeDetail,

  // Component configuration
  ComponentConfiguration,

  // Component property interfaces
  ThemeProps,
  VisualStateProps,
  LayoutProps,

  // Content structure types
  BaseContentProps,
  ExtendedContentProps,

  // Component event handlers
  ComponentEvents,

  // Function signatures
  CreateComponentFunction,
  ComponentRegistration,
  ComponentFactory,

  // Extended component reference with typed events
  TypedComponentRef,

  // Attribute element reference
  AttributeElementRef,
} from './_types';

// Export model types
export type { SlotProps, BaseProps, OptionalProps, SlotResult } from './model';

/**
 * @deprecated This function is deprecated and will be removed in version 2.0.
 * Use the bundle export instead:
 * ```typescript
 * import { initializeBundle } from '@universityofmaryland/web-components-library/bundle';
 * initializeBundle();
 * ```
 */
const LoadUmdComponents = () => {
  console.error(
    '[DEPRECATED] LoadUmdComponents is deprecated.\n' +
      'Use: import { initializeBundle } from "@universityofmaryland/web-components-library/bundle"',
  );
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

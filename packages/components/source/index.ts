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

export type {
  ElementRef,
  ComponentRef,
  SlotConfig,
  SlotConfiguration,
  ComponentEventDetail,
  ComponentReadyDetail,
  ComponentErrorDetail,
  ComponentResizeDetail,
  ComponentConfiguration,
  ThemeProps,
  VisualStateProps,
  LayoutProps,
  BaseContentProps,
  ExtendedContentProps,
  ComponentEvents,
  CreateComponentFunction,
  ComponentRegistration,
  ComponentFactory,
  TypedComponentRef,
  AttributeElementRef,
} from './_types';

export type { SlotProps, BaseProps, OptionalProps, SlotResult } from './model';

const allList = umdComponents as unknown as ComponentMap;

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

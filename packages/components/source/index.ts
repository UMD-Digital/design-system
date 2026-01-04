/**
 * Main entry point for the University of Maryland Web Components Library.
 * Provides web components, base elements, and utilities for building
 * consistent, accessible web interfaces following UMD design standards.
 *
 * ## Quick Start
 *
 * Register all components at once:
 * ```typescript
 * import { initializeBundle } from '@universityofmaryland/web-components-library/bundle';
 *
 * // Register all components
 * initializeBundle();
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
 * Or import individual components for optimal tree-shaking:
 * ```typescript
 * import { CardStandard, HeroBase } from '@universityofmaryland/web-components-library';
 *
 * CardStandard();
 * HeroBase();
 * ```
 *
 * ## Exports
 *
 * - **Components** - All web component registration functions (namespace)
 * - **Individual exports** - Direct component imports for tree-shaking
 * - **LoadUmdComponents** - Deprecated: Use initializeBundle from /bundle instead
 */

// Type exports
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

export type {
  SlotProps,
  BaseProps,
  OptionalProps,
  SlotResult,
} from '@universityofmaryland/web-model-library';

// Component namespace export
import * as umdComponents from './web-components';

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

// Re-export all named components for direct imports
export * from './web-components';

// Loader utilities
export { loadComponentClass, LoadUmdComponents } from './exports/loader';
export type { ComponentMap } from './exports/loader';

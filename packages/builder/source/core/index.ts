/**
 * @file index.ts
 * @description Core exports for the UMD Design System Element Builder (v2)
 *
 * This module exports the core builder components:
 * - ElementBuilder: Main chainable builder class
 * - StyleManager: Style compilation and deduplication
 * - LifecycleManager: Resource tracking and cleanup
 * - Type definitions and utilities
 */

// Core classes
export { ElementBuilder } from './ElementBuilder';
export { StyleManager, createStyleTag, injectStyles } from './StyleManager';
export {
  LifecycleManager,
  getGlobalLifecycleRegistry,
  cleanupAll,
  getLifecycleStats,
} from './LifecycleManager';

// Type definitions
export type {
  // Base types
  ThemeType,
  AnimationType,

  // Style types
  ElementStyles,
  StyleDefinition,
  StyleEntry,
  StyleType,

  // Builder types
  BuilderOptions,
  ElementModel,
  ElementBuilderInterface,

  // Lifecycle types
  TrackedListener,
  TrackedObserver,
  CleanupFunction,
  ResourceCounts,

  // Factory types
  ElementFactory,
  ActionFactories,
  HeadlineFactories,
  TextFactories,
  LayoutFactories,

  // Utility types
  DeepPartial,
  BuilderElement,
  AnimationConfig,

  // Plugin types
  BuilderPlugin,
  PresetConfig,
} from './types';

// Type guards
export { isStyleDefinition, isElementStyles, isElementBuilder } from './types';

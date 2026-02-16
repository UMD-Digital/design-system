/**
 * Utilities for Web Component Model
 *
 * This module exports utility functions for component lifecycle management,
 * registration, and styling.
 */

export { registerWebComponent, webComponent, type WebComponentConfig } from './register';
export { hooks, CommonLifecycleHooks } from './lifecycle';
export { stylesTemplate as StylesTemplate } from './styles';
export { isDev, createLogger, withLifecycleDebug } from './debug';
export type { Logger } from './debug';

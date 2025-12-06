/**
 * Utilities for Web Component Model
 *
 * This module exports utility functions for component lifecycle management,
 * registration, and styling.
 */

export { registerWebComponent, webComponent, type WebComponentConfig } from './register';
export { hooks, CommonLifecycleHooks } from './lifecycle';
export { default as StylesTemplate } from './styles';

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
export {
  createCustomEvent,
  dispatchCustomEvent,
  defineEvents,
  createEventListener,
  delegate,
} from './events';
export type { CustomEventOptions, DefineEvents } from './events';
export {
  isElement,
  isHTMLElement,
  isCustomElement,
  isShadowRoot,
  isSlotElement,
  isTemplateElement,
  assertElement,
  assertHTMLElement,
  assertShadowRoot,
} from './types';
export {
  createMutationObserver,
  createResizeObserver,
  createIntersectionObserver,
  querySlotted,
  closestAcrossShadow,
} from './dom';
export type {
  MutationObserverOptions,
  ResizeObserverOptionsConfig,
  IntersectionObserverOptions,
} from './dom';

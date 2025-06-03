/**
 * Common Type Definitions and Utilities for UMD Web Components
 * 
 * This file re-exports type definitions from api/_types and provides
 * convenient access to common patterns and utilities.
 */

// Re-export all types from api/_types
export * from './api/_types';

// Re-export utility functions and constants
export { createComponentRegistration } from './model/utilities/register';
export { CommonAttributeHandlers } from './model/attributes/handler';
export { CommonLifecycleHooks } from './model/utilities/lifecycle';
export { isHTMLElement } from './utilities/markup/validate';

// Re-export commonly used slot configurations
export const CommonSlots = {
  headline: {
    allowedElements: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span']
  },
  text: {
    allowedElements: ['p', 'span', 'div']
  },
  actions: {
    allowedElements: ['a', 'button']
  },
  image: {
    allowedElements: ['img']
  },
  content: {
    // Allows any element
  }
} as const;
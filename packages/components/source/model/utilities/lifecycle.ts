/**
 * Common Lifecycle Hooks for Components
 *
 * This module provides standard lifecycle implementations that can be
 * reused across multiple components.
 */

import type { ComponentRef } from '../types';

/**
 * Common lifecycle hooks for component initialization and state management
 */
export const hooks = {
  /**
   * Standard afterConnect that calls the component's load event
   */
  loadOnConnect: (ref: ComponentRef) => ref?.events?.load(),

  /**
   * AfterConnect hook that sets up component animations
   * Delays animation initialization to ensure proper positioning
   */
  loadAnimation: (ref: ComponentRef) => {
    const element = ref.element;
    setTimeout(() => {
      if (element.getBoundingClientRect().top > 0) {
        ref?.events?.loadAnimation();
      }
    }, 10);
  },

  /**
   * Standard resize handler for afterConnect
   */
  resizeOnConnect: (ref: ComponentRef) => ref?.events?.resize(),
};

/**
 * @deprecated Use hooks instead
 */
export const CommonLifecycleHooks = hooks;
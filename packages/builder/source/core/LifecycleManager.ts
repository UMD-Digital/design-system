/**
 * @file LifecycleManager.ts
 * @description Manages element lifecycle, event listeners, and resource cleanup
 *
 * Prevents memory leaks by tracking and cleaning up:
 * - Event listeners
 * - Mutation observers
 * - Intervals and timeouts
 * - Custom cleanup functions
 */

import type {
  TrackedListener,
  TrackedObserver,
  CleanupFunction,
  ResourceCounts,
} from './types';

/**
 * Manages element lifecycle and resource cleanup
 *
 * Automatically tracks resources and provides cleanup methods
 * to prevent memory leaks in single-page applications
 *
 * @example
 * ```typescript
 * const lifecycle = new LifecycleManager();
 * lifecycle.setElement(element);
 * lifecycle.trackListener('click', handleClick);
 * // Later...
 * lifecycle.cleanup(); // Removes all tracked resources
 * ```
 */
export class LifecycleManager {
  private element?: HTMLElement;
  private listeners: TrackedListener[] = [];
  private observers: TrackedObserver[] = [];
  private intervals: number[] = [];
  private timeouts: number[] = [];
  private cleanupFunctions: CleanupFunction[] = [];
  private isDestroyed: boolean = false;

  /**
   * Set the element this lifecycle manager is managing
   * @param element - The HTML element
   */
  setElement(element: HTMLElement): void {
    this.element = element;
  }

  /**
   * Track an event listener for later cleanup
   * @param event - Event name
   * @param handler - Event handler function
   * @param options - Event listener options
   */
  trackListener(
    event: string,
    handler: EventListener,
    options?: AddEventListenerOptions,
  ): void {
    this.assertNotDestroyed();
    this.listeners.push({ event, handler, options });
  }

  /**
   * Track a mutation observer for later cleanup
   * @param observer - MutationObserver instance
   * @param target - The node being observed
   * @param config - Observer configuration
   */
  trackObserver(
    observer: MutationObserver,
    target: Node,
    config: MutationObserverInit,
  ): void {
    this.assertNotDestroyed();
    this.observers.push({ observer, target, config });
  }

  /**
   * Track an interval for later cleanup
   * @param id - Interval ID from setInterval
   */
  trackInterval(id: number): void {
    this.assertNotDestroyed();
    this.intervals.push(id);
  }

  /**
   * Track a timeout for later cleanup
   * @param id - Timeout ID from setTimeout
   */
  trackTimeout(id: number): void {
    this.assertNotDestroyed();
    this.timeouts.push(id);
  }

  /**
   * Track a custom cleanup function
   * @param fn - Function to call during cleanup
   */
  trackCleanup(fn: CleanupFunction): void {
    this.assertNotDestroyed();
    this.cleanupFunctions.push(fn);
  }

  /**
   * Create and track a new interval
   * @param callback - Function to call on interval
   * @param ms - Milliseconds between calls
   * @returns Interval ID
   */
  createInterval(callback: () => void, ms: number): number {
    this.assertNotDestroyed();
    const id = window.setInterval(callback, ms);
    this.trackInterval(id);
    return id;
  }

  /**
   * Create and track a new timeout
   * @param callback - Function to call after timeout
   * @param ms - Milliseconds to wait
   * @returns Timeout ID
   */
  createTimeout(callback: () => void, ms: number): number {
    this.assertNotDestroyed();
    const id = window.setTimeout(callback, ms);
    this.trackTimeout(id);
    return id;
  }

  /**
   * Create and track a new mutation observer
   * @param callback - Observer callback
   * @param target - Node to observe
   * @param options - Observer options
   * @returns MutationObserver instance
   */
  createObserver(
    callback: MutationCallback,
    target: Node,
    options: MutationObserverInit,
  ): MutationObserver {
    this.assertNotDestroyed();
    const observer = new MutationObserver(callback);
    observer.observe(target, options);
    this.trackObserver(observer, target, options);
    return observer;
  }

  /**
   * Clean up all tracked resources
   * This is called automatically when the element is destroyed
   */
  cleanup(): void {
    if (this.isDestroyed) {
      return;
    }

    if (this.element) {
      this.listeners.forEach(({ event, handler, options }) => {
        this.element!.removeEventListener(event, handler, options);
      });
    }

    this.observers.forEach(({ observer }) => {
      observer.disconnect();
    });

    this.intervals.forEach((id) => {
      clearInterval(id);
    });

    this.timeouts.forEach((id) => {
      clearTimeout(id);
    });

    this.cleanupFunctions.forEach((fn) => {
      try {
        fn();
      } catch (error) {
        console.error('Error in cleanup function:', error);
      }
    });

    this.listeners = [];
    this.observers = [];
    this.intervals = [];
    this.timeouts = [];
    this.cleanupFunctions = [];

    this.isDestroyed = true;
  }

  /**
   * Check if this lifecycle manager has been destroyed
   */
  isCleanedUp(): boolean {
    return this.isDestroyed;
  }

  /**
   * Get count of tracked resources (for debugging)
   */
  getResourceCounts(): ResourceCounts {
    return {
      listeners: this.listeners.length,
      observers: this.observers.length,
      intervals: this.intervals.length,
      timeouts: this.timeouts.length,
      cleanupFunctions: this.cleanupFunctions.length,
    };
  }

  /**
   * Assert that the lifecycle manager hasn't been destroyed
   * @private
   */
  private assertNotDestroyed(): void {
    if (this.isDestroyed) {
      throw new Error(
        'LifecycleManager: Cannot track resources after cleanup has been called',
      );
    }
  }
}

/**
 * Global registry for tracking all lifecycle managers
 * Useful for debugging memory leaks in development
 */
class GlobalLifecycleRegistry {
  private static instance: GlobalLifecycleRegistry;
  private managers: WeakMap<HTMLElement, LifecycleManager> = new WeakMap();
  private allManagers: Set<LifecycleManager> = new Set();

  private constructor() {}

  static getInstance(): GlobalLifecycleRegistry {
    if (!GlobalLifecycleRegistry.instance) {
      GlobalLifecycleRegistry.instance = new GlobalLifecycleRegistry();
    }
    return GlobalLifecycleRegistry.instance;
  }

  register(element: HTMLElement, manager: LifecycleManager): void {
    this.managers.set(element, manager);
    this.allManagers.add(manager);
  }

  get(element: HTMLElement): LifecycleManager | undefined {
    return this.managers.get(element);
  }

  cleanupAll(): void {
    this.allManagers.forEach((manager) => {
      if (!manager.isCleanedUp()) {
        manager.cleanup();
      }
    });
    this.allManagers.clear();
  }

  /**
   * Get statistics about all tracked lifecycle managers
   * Useful for debugging memory leaks
   */
  getStats(): {
    total: number;
    active: number;
    totalResources: ResourceCounts;
  } {
    const totalResources: ResourceCounts = {
      listeners: 0,
      observers: 0,
      intervals: 0,
      timeouts: 0,
      cleanupFunctions: 0,
    };

    let active = 0;

    this.allManagers.forEach((manager) => {
      if (!manager.isCleanedUp()) {
        active++;
        const counts = manager.getResourceCounts();
        totalResources.listeners += counts.listeners;
        totalResources.observers += counts.observers;
        totalResources.intervals += counts.intervals;
        totalResources.timeouts += counts.timeouts;
        totalResources.cleanupFunctions += counts.cleanupFunctions;
      }
    });

    return {
      total: this.allManagers.size,
      active,
      totalResources,
    };
  }
}

/**
 * Get the global lifecycle registry instance
 * Useful for debugging and monitoring
 */
export function getGlobalLifecycleRegistry(): GlobalLifecycleRegistry {
  return GlobalLifecycleRegistry.getInstance();
}

/**
 * Clean up all tracked lifecycle managers
 * Useful for cleaning up during HMR or when unmounting an entire app
 */
export function cleanupAll(): void {
  GlobalLifecycleRegistry.getInstance().cleanupAll();
}

/**
 * Get statistics about all lifecycle managers
 * Useful for debugging memory leaks in development
 */
export function getLifecycleStats() {
  return GlobalLifecycleRegistry.getInstance().getStats();
}

// Development mode helpers
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).__UMD_LIFECYCLE_DEBUG__ = {
    getStats: getLifecycleStats,
    cleanupAll,
    getRegistry: getGlobalLifecycleRegistry,
  };

  console.info(
    '🔧 UMD Lifecycle debugging tools available at window.__UMD_LIFECYCLE_DEBUG__',
  );
}

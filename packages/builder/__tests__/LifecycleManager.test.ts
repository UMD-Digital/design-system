/**
 * @file LifecycleManager.test.ts
 * @description Unit tests for LifecycleManager
 */

import { LifecycleManager } from '../source/core/LifecycleManager';

describe('LifecycleManager', () => {
  let element: HTMLElement;
  let manager: LifecycleManager;

  beforeEach(() => {
    element = document.createElement('div');
    manager = new LifecycleManager();
    manager.setElement(element);
  });

  afterEach(() => {
    manager.cleanup();
  });

  describe('Event Listener Tracking', () => {
    test('should track and remove event listeners', () => {
      const handler = jest.fn();
      manager.trackListener('click', handler);
      element.addEventListener('click', handler);

      element.dispatchEvent(new Event('click'));
      expect(handler).toHaveBeenCalledTimes(1);

      manager.cleanup();
      element.dispatchEvent(new Event('click'));
      expect(handler).toHaveBeenCalledTimes(1); // Should not be called again
    });

    test('should handle multiple listeners for same event', () => {
      const handler1 = jest.fn();
      const handler2 = jest.fn();

      manager.trackListener('click', handler1);
      manager.trackListener('click', handler2);
      element.addEventListener('click', handler1);
      element.addEventListener('click', handler2);

      element.dispatchEvent(new Event('click'));
      expect(handler1).toHaveBeenCalledTimes(1);
      expect(handler2).toHaveBeenCalledTimes(1);

      manager.cleanup();
      element.dispatchEvent(new Event('click'));
      expect(handler1).toHaveBeenCalledTimes(1);
      expect(handler2).toHaveBeenCalledTimes(1);
    });

    test('should handle event listener options', () => {
      const handler = jest.fn();
      manager.trackListener('click', handler, { once: true });
      element.addEventListener('click', handler, { once: true });

      element.dispatchEvent(new Event('click'));
      element.dispatchEvent(new Event('click'));

      expect(handler).toHaveBeenCalledTimes(1);
    });

    test('should track listeners with capture option', () => {
      const handler = jest.fn();
      manager.trackListener('click', handler, { capture: true });
      element.addEventListener('click', handler, { capture: true });

      element.dispatchEvent(new Event('click', { bubbles: true }));
      expect(handler).toHaveBeenCalledTimes(1);

      manager.cleanup();
      element.dispatchEvent(new Event('click', { bubbles: true }));
      expect(handler).toHaveBeenCalledTimes(1);
    });
  });

  describe('MutationObserver Tracking', () => {
    test('should track and disconnect mutation observers', () => {
      const callback = jest.fn();
      const observer = manager.createObserver(callback, element, {
        childList: true,
      });

      expect(observer).toBeInstanceOf(MutationObserver);

      element.appendChild(document.createElement('span'));

      // Wait for mutation observer to trigger
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          expect(callback).toHaveBeenCalled();

          manager.cleanup();
          element.appendChild(document.createElement('div'));

          setTimeout(() => {
            // Should not be called again after cleanup
            expect(callback).toHaveBeenCalledTimes(1);
            resolve();
          }, 10);
        }, 10);
      });
    });

    test('should handle multiple mutation observers', () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      manager.createObserver(callback1, element, { childList: true });
      manager.createObserver(callback2, element, { attributes: true });

      element.appendChild(document.createElement('span'));
      element.setAttribute('data-test', 'value');

      return new Promise<void>((resolve) => {
        setTimeout(() => {
          expect(callback1).toHaveBeenCalled();
          expect(callback2).toHaveBeenCalled();
          resolve();
        }, 10);
      });
    });
  });

  describe('Interval Tracking', () => {
    test('should track and clear intervals', () => {
      jest.useFakeTimers();
      const callback = jest.fn();

      manager.createInterval(callback, 100);

      jest.advanceTimersByTime(100);
      expect(callback).toHaveBeenCalledTimes(1);

      jest.advanceTimersByTime(100);
      expect(callback).toHaveBeenCalledTimes(2);

      manager.cleanup();

      jest.advanceTimersByTime(100);
      expect(callback).toHaveBeenCalledTimes(2); // Should not be called after cleanup

      jest.useRealTimers();
    });

    test('should handle multiple intervals', () => {
      jest.useFakeTimers();
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      manager.createInterval(callback1, 100);
      manager.createInterval(callback2, 200);

      jest.advanceTimersByTime(100);
      expect(callback1).toHaveBeenCalledTimes(1);
      expect(callback2).toHaveBeenCalledTimes(0);

      jest.advanceTimersByTime(100);
      expect(callback1).toHaveBeenCalledTimes(2);
      expect(callback2).toHaveBeenCalledTimes(1);

      manager.cleanup();

      jest.advanceTimersByTime(200);
      expect(callback1).toHaveBeenCalledTimes(2);
      expect(callback2).toHaveBeenCalledTimes(1);

      jest.useRealTimers();
    });
  });

  describe('Timeout Tracking', () => {
    test('should track and clear timeouts', () => {
      jest.useFakeTimers();
      const callback = jest.fn();

      manager.createTimeout(callback, 100);

      jest.advanceTimersByTime(99);
      expect(callback).not.toHaveBeenCalled();

      jest.advanceTimersByTime(1);
      expect(callback).toHaveBeenCalledTimes(1);

      jest.useRealTimers();
    });

    test('should clear timeout before it fires', () => {
      jest.useFakeTimers();
      const callback = jest.fn();

      manager.createTimeout(callback, 100);

      jest.advanceTimersByTime(50);
      manager.cleanup();

      jest.advanceTimersByTime(100);
      expect(callback).not.toHaveBeenCalled();

      jest.useRealTimers();
    });

    test('should handle multiple timeouts', () => {
      jest.useFakeTimers();
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      manager.createTimeout(callback1, 100);
      manager.createTimeout(callback2, 200);

      jest.advanceTimersByTime(100);
      expect(callback1).toHaveBeenCalledTimes(1);
      expect(callback2).not.toHaveBeenCalled();

      jest.advanceTimersByTime(100);
      expect(callback2).toHaveBeenCalledTimes(1);

      jest.useRealTimers();
    });
  });

  describe('Custom Cleanup Functions', () => {
    test('should register and call custom cleanup functions', () => {
      const cleanup1 = jest.fn();
      const cleanup2 = jest.fn();

      manager.trackCleanup(cleanup1);
      manager.trackCleanup(cleanup2);

      manager.cleanup();

      expect(cleanup1).toHaveBeenCalledTimes(1);
      expect(cleanup2).toHaveBeenCalledTimes(1);
    });

    test('should handle cleanup function errors gracefully', () => {
      const errorCleanup = jest.fn(() => {
        throw new Error('Cleanup error');
      });
      const successCleanup = jest.fn();

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      manager.trackCleanup(errorCleanup);
      manager.trackCleanup(successCleanup);

      manager.cleanup();

      expect(errorCleanup).toHaveBeenCalledTimes(1);
      expect(successCleanup).toHaveBeenCalledTimes(1);
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  describe('Comprehensive Cleanup', () => {
    test('should clean up all tracked resources', () => {
      jest.useFakeTimers();

      const eventHandler = jest.fn();
      const intervalCallback = jest.fn();
      const timeoutCallback = jest.fn();
      const customCleanup = jest.fn();

      manager.trackListener('click', eventHandler);
      element.addEventListener('click', eventHandler);
      manager.createInterval(intervalCallback, 100);
      manager.createTimeout(timeoutCallback, 100);
      manager.trackCleanup(customCleanup);

      // Trigger some activity
      element.dispatchEvent(new Event('click'));
      jest.advanceTimersByTime(100);

      expect(eventHandler).toHaveBeenCalledTimes(1);
      expect(intervalCallback).toHaveBeenCalledTimes(1);
      expect(timeoutCallback).toHaveBeenCalledTimes(1);

      // Cleanup
      manager.cleanup();

      expect(customCleanup).toHaveBeenCalledTimes(1);

      // Verify nothing else happens after cleanup
      element.dispatchEvent(new Event('click'));
      jest.advanceTimersByTime(200);

      expect(eventHandler).toHaveBeenCalledTimes(1);
      expect(intervalCallback).toHaveBeenCalledTimes(1);
      expect(timeoutCallback).toHaveBeenCalledTimes(1);
      expect(customCleanup).toHaveBeenCalledTimes(1);

      jest.useRealTimers();
    });

    test('should allow multiple cleanup calls safely', () => {
      const cleanup = jest.fn();
      manager.trackCleanup(cleanup);

      manager.cleanup();
      expect(cleanup).toHaveBeenCalledTimes(1);

      manager.cleanup();
      expect(cleanup).toHaveBeenCalledTimes(1); // Should not be called again
    });
  });

  describe('Development Mode Debugging', () => {
    test('should provide resource count in development mode', () => {
      const eventHandler = jest.fn();
      manager.trackListener('click', eventHandler);
      manager.createInterval(() => {}, 100);
      manager.createTimeout(() => {}, 100);
      manager.trackCleanup(() => {});

      const counts = manager.getResourceCounts();

      expect(counts.listeners).toBe(1);
      expect(counts.intervals).toBe(1);
      expect(counts.timeouts).toBe(1);
      expect(counts.cleanupFunctions).toBe(1);
    });

    test('should show zero counts after cleanup', () => {
      manager.trackListener('click', jest.fn());
      manager.createInterval(() => {}, 100);

      manager.cleanup();

      const counts = manager.getResourceCounts();

      expect(counts.listeners).toBe(0);
      expect(counts.intervals).toBe(0);
      expect(counts.timeouts).toBe(0);
      expect(counts.cleanupFunctions).toBe(0);
    });
  });
});

import { debounce } from '../../source/performance/debounce';

describe('debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  describe('happy path', () => {
    it('should debounce function calls', () => {
      const callback = jest.fn();
      const debounced = debounce(callback, 100);

      debounced();
      debounced();
      debounced();

      expect(callback).not.toHaveBeenCalled();

      jest.advanceTimersByTime(100);

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should call function with last provided arguments', () => {
      const callback = jest.fn();
      const debounced = debounce(callback, 100);

      debounced('first');
      debounced('second');
      debounced('third');

      jest.advanceTimersByTime(100);

      expect(callback).toHaveBeenCalledWith('third');
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should reset timer on each call', () => {
      const callback = jest.fn();
      const debounced = debounce(callback, 100);

      debounced();
      jest.advanceTimersByTime(50);

      debounced();
      jest.advanceTimersByTime(50);

      expect(callback).not.toHaveBeenCalled();

      jest.advanceTimersByTime(50);

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should use default wait time of 50ms', () => {
      const callback = jest.fn();
      const debounced = debounce(callback);

      debounced();

      jest.advanceTimersByTime(49);
      expect(callback).not.toHaveBeenCalled();

      jest.advanceTimersByTime(1);
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should work with custom wait times', () => {
      const callback = jest.fn();
      const debounced = debounce(callback, 200);

      debounced();

      jest.advanceTimersByTime(199);
      expect(callback).not.toHaveBeenCalled();

      jest.advanceTimersByTime(1);
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple arguments', () => {
      const callback = jest.fn();
      const debounced = debounce(callback, 100);

      debounced('arg1', 'arg2', 'arg3');

      jest.advanceTimersByTime(100);

      expect(callback).toHaveBeenCalledWith('arg1', 'arg2', 'arg3');
    });

    it('should not preserve function context (arrow function limitation)', () => {
      let capturedThis: any;
      function callback(this: any) {
        capturedThis = this;
      }
      const debounced = debounce(callback, 100);
      const context = { value: 'test' };

      debounced.call(context);

      jest.advanceTimersByTime(100);

      // Arrow functions don't preserve context - this is expected behavior
      expect(capturedThis).toBeUndefined();
    });
  });

  describe('edge cases', () => {
    it('should handle zero wait time', () => {
      const callback = jest.fn();
      const debounced = debounce(callback, 0);

      debounced();

      jest.advanceTimersByTime(0);

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should handle very large wait times', () => {
      const callback = jest.fn();
      const debounced = debounce(callback, 10000);

      debounced();

      jest.advanceTimersByTime(9999);
      expect(callback).not.toHaveBeenCalled();

      jest.advanceTimersByTime(1);
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should handle rapid successive calls', () => {
      const callback = jest.fn();
      const debounced = debounce(callback, 100);

      for (let i = 0; i < 100; i++) {
        debounced();
      }

      jest.advanceTimersByTime(100);

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should allow multiple debounced function calls after wait', () => {
      const callback = jest.fn();
      const debounced = debounce(callback, 100);

      debounced();
      jest.advanceTimersByTime(100);

      debounced();
      jest.advanceTimersByTime(100);

      debounced();
      jest.advanceTimersByTime(100);

      expect(callback).toHaveBeenCalledTimes(3);
    });

    it('should handle function that throws error', () => {
      const callback = jest.fn(() => {
        throw new Error('Test error');
      });
      const debounced = debounce(callback, 100);

      debounced();

      expect(() => jest.advanceTimersByTime(100)).toThrow('Test error');
    });

    it('should handle undefined arguments', () => {
      const callback = jest.fn();
      const debounced = debounce(callback, 100);

      debounced(undefined);

      jest.advanceTimersByTime(100);

      expect(callback).toHaveBeenCalledWith(undefined);
    });

    it('should handle null arguments', () => {
      const callback = jest.fn();
      const debounced = debounce(callback, 100);

      debounced(null);

      jest.advanceTimersByTime(100);

      expect(callback).toHaveBeenCalledWith(null);
    });

    it('should handle object arguments', () => {
      const callback = jest.fn();
      const debounced = debounce(callback, 100);
      const obj = { key: 'value' };

      debounced(obj);

      jest.advanceTimersByTime(100);

      expect(callback).toHaveBeenCalledWith(obj);
    });

    it('should handle array arguments', () => {
      const callback = jest.fn();
      const debounced = debounce(callback, 100);
      const arr = [1, 2, 3];

      debounced(arr);

      jest.advanceTimersByTime(100);

      expect(callback).toHaveBeenCalledWith(arr);
    });
  });

  describe('timer management', () => {
    it('should clear previous timer when called again', () => {
      const callback = jest.fn();
      const debounced = debounce(callback, 100);

      debounced();
      const pendingTimers1 = jest.getTimerCount();

      debounced();
      const pendingTimers2 = jest.getTimerCount();

      // Should maintain only one pending timer
      expect(pendingTimers1).toBe(pendingTimers2);
    });

    it('should not have pending timers after execution', () => {
      const callback = jest.fn();
      const debounced = debounce(callback, 100);

      debounced();

      jest.advanceTimersByTime(100);

      expect(jest.getTimerCount()).toBe(0);
    });
  });

  describe('type preservation', () => {
    it('should preserve function return type', () => {
      const callback = jest.fn((x: number): string => x.toString());
      const debounced = debounce(callback, 100);

      // TypeScript should infer the correct parameter type
      debounced(42);

      jest.advanceTimersByTime(100);

      expect(callback).toHaveBeenCalledWith(42);
    });

    it('should work with no-argument functions', () => {
      const callback = jest.fn();
      const debounced = debounce(callback, 100);

      debounced();

      jest.advanceTimersByTime(100);

      expect(callback).toHaveBeenCalledWith();
    });

    it('should work with multi-argument functions', () => {
      const callback = jest.fn((a: string, b: number, c: boolean) => {});
      const debounced = debounce(callback, 100);

      debounced('test', 42, true);

      jest.advanceTimersByTime(100);

      expect(callback).toHaveBeenCalledWith('test', 42, true);
    });
  });

  describe('error conditions', () => {
    it('should handle null callback', () => {
      expect(() => debounce(null as any, 100)).not.toThrow();
    });

    it('should handle undefined callback', () => {
      expect(() => debounce(undefined as any, 100)).not.toThrow();
    });

    it('should handle negative wait time', () => {
      const callback = jest.fn();
      const debounced = debounce(callback, -100);

      debounced();

      // Negative timeout is treated as 0
      jest.advanceTimersByTime(0);

      expect(callback).toHaveBeenCalledTimes(1);
    });
  });
});
import { setupSwipeDetection } from '../../events/setupSwipeDetection';

describe('setupSwipeDetection', () => {
  let container: HTMLElement;
  let mockCallback: jest.Mock;

  beforeEach(() => {
    container = document.createElement('div');
    mockCallback = jest.fn();
    document.body.appendChild(container);
    jest.useFakeTimers();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  const createTouchEvent = (
    type: string,
    pageX: number,
  ): TouchEvent => {
    const touch = {
      pageX,
      pageY: 0,
      clientX: pageX,
      clientY: 0,
      screenX: pageX,
      screenY: 0,
      identifier: 0,
      target: container,
      radiusX: 0,
      radiusY: 0,
      rotationAngle: 0,
      force: 1,
    };

    const touchEvent = new Event(type, { bubbles: true, cancelable: true }) as any;
    touchEvent.changedTouches = [touch];
    return touchEvent as TouchEvent;
  };

  describe('happy path', () => {
    it('should detect swipe right', () => {
      setupSwipeDetection({ container, callback: mockCallback });

      const touchStart = createTouchEvent('touchstart', 100);
      container.dispatchEvent(touchStart);

      jest.advanceTimersByTime(150);

      const touchEnd = createTouchEvent('touchend', 150);
      container.dispatchEvent(touchEnd);

      expect(mockCallback).toHaveBeenCalledWith(true);
      expect(mockCallback).toHaveBeenCalledTimes(1);
    });

    it('should detect swipe left', () => {
      setupSwipeDetection({ container, callback: mockCallback });

      const touchStart = createTouchEvent('touchstart', 150);
      container.dispatchEvent(touchStart);

      jest.advanceTimersByTime(150);

      const touchEnd = createTouchEvent('touchend', 100);
      container.dispatchEvent(touchEnd);

      expect(mockCallback).toHaveBeenCalledWith(false);
      expect(mockCallback).toHaveBeenCalledTimes(1);
    });

    it('should detect swipe with minimum threshold', () => {
      setupSwipeDetection({ container, callback: mockCallback });

      const touchStart = createTouchEvent('touchstart', 100);
      container.dispatchEvent(touchStart);

      jest.advanceTimersByTime(150);

      const touchEnd = createTouchEvent('touchend', 120); // 20px difference (minimum threshold)
      container.dispatchEvent(touchEnd);

      expect(mockCallback).toHaveBeenCalledWith(true);
    });

    it('should detect swipe with allowed time threshold', () => {
      setupSwipeDetection({ container, callback: mockCallback });

      const touchStart = createTouchEvent('touchstart', 100);
      container.dispatchEvent(touchStart);

      jest.advanceTimersByTime(101); // Just over 100ms (minimum time)

      const touchEnd = createTouchEvent('touchend', 150);
      container.dispatchEvent(touchEnd);

      expect(mockCallback).toHaveBeenCalledWith(true);
    });
  });

  describe('edge cases', () => {
    it('should not trigger callback if distance is below threshold', () => {
      setupSwipeDetection({ container, callback: mockCallback });

      const touchStart = createTouchEvent('touchstart', 100);
      container.dispatchEvent(touchStart);

      jest.advanceTimersByTime(150);

      const touchEnd = createTouchEvent('touchend', 119); // 19px difference (below 20px threshold)
      container.dispatchEvent(touchEnd);

      expect(mockCallback).not.toHaveBeenCalled();
    });

    it('should not trigger callback if time is below threshold', () => {
      setupSwipeDetection({ container, callback: mockCallback });

      const touchStart = createTouchEvent('touchstart', 100);
      container.dispatchEvent(touchStart);

      jest.advanceTimersByTime(100); // Exactly 100ms (not > 100ms)

      const touchEnd = createTouchEvent('touchend', 150);
      container.dispatchEvent(touchEnd);

      expect(mockCallback).not.toHaveBeenCalled();
    });

    it('should not trigger callback if time is too fast', () => {
      setupSwipeDetection({ container, callback: mockCallback });

      const touchStart = createTouchEvent('touchstart', 100);
      container.dispatchEvent(touchStart);

      jest.advanceTimersByTime(50); // 50ms (below 100ms threshold)

      const touchEnd = createTouchEvent('touchend', 200);
      container.dispatchEvent(touchEnd);

      expect(mockCallback).not.toHaveBeenCalled();
    });

    it('should handle swipe with zero distance', () => {
      setupSwipeDetection({ container, callback: mockCallback });

      const touchStart = createTouchEvent('touchstart', 100);
      container.dispatchEvent(touchStart);

      jest.advanceTimersByTime(150);

      const touchEnd = createTouchEvent('touchend', 100); // Same position
      container.dispatchEvent(touchEnd);

      expect(mockCallback).not.toHaveBeenCalled();
    });

    it('should handle multiple swipes', () => {
      setupSwipeDetection({ container, callback: mockCallback });

      // First swipe right
      container.dispatchEvent(createTouchEvent('touchstart', 100));
      jest.advanceTimersByTime(150);
      container.dispatchEvent(createTouchEvent('touchend', 150));

      // Second swipe left
      container.dispatchEvent(createTouchEvent('touchstart', 150));
      jest.advanceTimersByTime(150);
      container.dispatchEvent(createTouchEvent('touchend', 100));

      expect(mockCallback).toHaveBeenCalledTimes(2);
      expect(mockCallback).toHaveBeenNthCalledWith(1, true);
      expect(mockCallback).toHaveBeenNthCalledWith(2, false);
    });

    it('should handle negative starting position', () => {
      setupSwipeDetection({ container, callback: mockCallback });

      const touchStart = createTouchEvent('touchstart', -50);
      container.dispatchEvent(touchStart);

      jest.advanceTimersByTime(150);

      const touchEnd = createTouchEvent('touchend', 0);
      container.dispatchEvent(touchEnd);

      expect(mockCallback).toHaveBeenCalledWith(true);
    });

    it('should handle large swipe distances', () => {
      setupSwipeDetection({ container, callback: mockCallback });

      const touchStart = createTouchEvent('touchstart', 0);
      container.dispatchEvent(touchStart);

      jest.advanceTimersByTime(150);

      const touchEnd = createTouchEvent('touchend', 500);
      container.dispatchEvent(touchEnd);

      expect(mockCallback).toHaveBeenCalledWith(true);
    });
  });

  describe('error conditions', () => {
    it('should handle null container', () => {
      expect(() =>
        setupSwipeDetection({ container: null as any, callback: mockCallback }),
      ).toThrow();
    });

    it('should handle undefined container', () => {
      expect(() =>
        setupSwipeDetection({
          container: undefined as any,
          callback: mockCallback,
        }),
      ).toThrow();
    });
  });

  describe('passive event listeners', () => {
    it('should use passive: false for touch events', () => {
      const addEventListenerSpy = jest.spyOn(container, 'addEventListener');

      setupSwipeDetection({ container, callback: mockCallback });

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'touchstart',
        expect.any(Function),
        { passive: false },
      );

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'touchend',
        expect.any(Function),
        { passive: false },
      );

      addEventListenerSpy.mockRestore();
    });
  });
});

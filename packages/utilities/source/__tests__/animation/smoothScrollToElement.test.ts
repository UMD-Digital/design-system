import { smoothScrollToElement } from '../../animation/smoothScrollToElement';

describe('smoothScrollToElement', () => {
  let element: HTMLElement;
  let rafSpy: jest.SpyInstance;

  beforeEach(() => {
    element = document.createElement('div');
    element.setAttribute('tabindex', '0');
    document.body.appendChild(element);

    // Mock getBoundingClientRect
    element.getBoundingClientRect = jest.fn().mockReturnValue({
      top: 500,
      left: 0,
      right: 0,
      bottom: 600,
      width: 100,
      height: 100,
    });

    // Mock window.pageYOffset
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: 0,
    });

    // Mock document scrollTop
    Object.defineProperty(document.documentElement, 'scrollTop', {
      writable: true,
      configurable: true,
      value: 0,
    });

    Object.defineProperty(document.body, 'scrollTop', {
      writable: true,
      configurable: true,
      value: 0,
    });

    // Mock requestAnimationFrame to execute immediately
    rafSpy = jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((callback: FrameRequestCallback) => {
        callback(0);
        return 0;
      });
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
    rafSpy.mockRestore();
  });

  describe('happy path', () => {
    it('should call requestAnimationFrame', () => {
      smoothScrollToElement({ element });

      expect(rafSpy).toHaveBeenCalled();
    });

    it('should focus the element after scrolling', () => {
      const focusSpy = jest.spyOn(element, 'focus');

      smoothScrollToElement({ element });

      expect(focusSpy).toHaveBeenCalledWith({ preventScroll: true });
    });

    it('should focus first focusable child if available', () => {
      const button = document.createElement('button');
      element.appendChild(button);

      const buttonFocusSpy = jest.spyOn(button, 'focus');

      smoothScrollToElement({ element });

      expect(buttonFocusSpy).toHaveBeenCalledWith({ preventScroll: true });
    });

    it('should use default spread of 30', () => {
      smoothScrollToElement({ element });

      expect(element.getBoundingClientRect).toHaveBeenCalled();
    });

    it('should use default frames of 60', () => {
      let callCount = 0;
      rafSpy.mockRestore();
      rafSpy = jest
        .spyOn(window, 'requestAnimationFrame')
        .mockImplementation((callback: FrameRequestCallback) => {
          callCount++;
          if (callCount <= 60) {
            callback(0);
          }
          return 0;
        });

      smoothScrollToElement({ element });

      expect(rafSpy).toHaveBeenCalled();
    });

    it('should use custom spread value', () => {
      smoothScrollToElement({ element, spread: 50 });

      expect(element.getBoundingClientRect).toHaveBeenCalled();
    });

    it('should use custom frames value', () => {
      let callCount = 0;
      rafSpy.mockRestore();
      rafSpy = jest
        .spyOn(window, 'requestAnimationFrame')
        .mockImplementation((callback: FrameRequestCallback) => {
          callCount++;
          if (callCount <= 30) {
            callback(0);
          }
          return 0;
        });

      smoothScrollToElement({ element, frames: 30 });

      expect(rafSpy).toHaveBeenCalled();
    });
  });

  describe('edge cases', () => {
    it('should return early if element is null', () => {
      smoothScrollToElement({ element: null as any });

      expect(rafSpy).not.toHaveBeenCalled();
    });

    it('should return early if element is undefined', () => {
      smoothScrollToElement({ element: undefined as any });

      expect(rafSpy).not.toHaveBeenCalled();
    });

    it('should handle element with no focusable children', () => {
      const div = document.createElement('div');
      element.appendChild(div);

      const focusSpy = jest.spyOn(element, 'focus');

      smoothScrollToElement({ element });

      expect(focusSpy).toHaveBeenCalledWith({ preventScroll: true });
    });

    it('should handle element at top of page', () => {
      element.getBoundingClientRect = jest.fn().mockReturnValue({
        top: 0,
        left: 0,
        right: 0,
        bottom: 100,
        width: 100,
        height: 100,
      });

      expect(() => smoothScrollToElement({ element })).not.toThrow();
    });

    it('should handle already scrolled page', () => {
      Object.defineProperty(window, 'pageYOffset', {
        writable: true,
        configurable: true,
        value: 300,
      });

      expect(() => smoothScrollToElement({ element })).not.toThrow();
    });

    it('should handle documentElement.scrollTop set', () => {
      Object.defineProperty(document.documentElement, 'scrollTop', {
        writable: true,
        configurable: true,
        value: 100,
      });

      expect(() => smoothScrollToElement({ element })).not.toThrow();
    });

    it('should handle body.scrollTop set', () => {
      Object.defineProperty(document.body, 'scrollTop', {
        writable: true,
        configurable: true,
        value: 100,
      });

      Object.defineProperty(document.documentElement, 'scrollTop', {
        writable: true,
        configurable: true,
        value: 0,
      });

      expect(() => smoothScrollToElement({ element })).not.toThrow();
    });

    it('should prefer anchor over button for focus', () => {
      const button = document.createElement('button');
      const anchor = document.createElement('a');
      anchor.href = '#';
      element.appendChild(anchor);
      element.appendChild(button);

      const anchorFocusSpy = jest.spyOn(anchor, 'focus');

      smoothScrollToElement({ element });

      expect(anchorFocusSpy).toHaveBeenCalledWith({ preventScroll: true });
    });

    it('should handle zero spread', () => {
      expect(() => smoothScrollToElement({ element, spread: 0 })).not.toThrow();
    });

    it('should handle negative spread', () => {
      expect(() => smoothScrollToElement({ element, spread: -10 })).not.toThrow();
    });

    it('should handle zero frames', () => {
      smoothScrollToElement({ element, frames: 0 });

      const focusSpy = jest.spyOn(element, 'focus');

      // With 0 frames, should focus immediately
      expect(rafSpy).toHaveBeenCalled();
    });

    it('should handle single frame', () => {
      smoothScrollToElement({ element, frames: 1 });

      expect(rafSpy).toHaveBeenCalled();
    });
  });

  describe('focus management', () => {
    it('should call focus with preventScroll option', () => {
      const button = document.createElement('button');
      element.appendChild(button);

      const focusSpy = jest.spyOn(button, 'focus');

      smoothScrollToElement({ element });

      expect(focusSpy).toHaveBeenCalledWith({ preventScroll: true });
    });

    it('should focus element even when focus throws', () => {
      element.focus = jest.fn().mockImplementation(() => {
        throw new Error('Focus error');
      });

      expect(() => smoothScrollToElement({ element })).toThrow();
    });
  });
});

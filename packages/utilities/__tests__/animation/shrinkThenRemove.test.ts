import { shrinkThenRemove } from '../../source/animation/shrinkThenRemove';

describe('shrinkThenRemove', () => {
  let container: HTMLElement;
  let rafSpy: jest.SpyInstance;
  let timeoutSpy: jest.SpyInstance;

  beforeEach(() => {
    container = document.createElement('div');
    container.style.height = '100px';
    container.style.paddingBottom = '20px';
    document.body.appendChild(container);

    // Mock getComputedStyle
    Object.defineProperty(window, 'getComputedStyle', {
      writable: true,
      value: jest.fn().mockReturnValue({
        paddingBottom: '20px',
      }),
    });

    // Mock requestAnimationFrame to execute callback immediately
    rafSpy = jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((callback: FrameRequestCallback) => {
        callback(0);
        return 0;
      });

    // Mock setTimeout
    timeoutSpy = jest
      .spyOn(window, 'setTimeout')
      .mockImplementation((callback: TimerHandler) => {
        if (typeof callback === 'function') {
          callback();
        }
        return 0 as any;
      });
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
    rafSpy.mockRestore();
    timeoutSpy.mockRestore();
  });

  describe('happy path', () => {
    it('should set overflow to hidden immediately', () => {
      shrinkThenRemove({ container });

      expect(container.style.overflow).toBe('hidden');
    });

    it('should call requestAnimationFrame', () => {
      shrinkThenRemove({ container });

      expect(rafSpy).toHaveBeenCalled();
    });

    it('should eventually set display to none', () => {
      shrinkThenRemove({ container });

      expect(container.style.display).toBe('none');
    });

    it('should eventually set closed attribute', () => {
      shrinkThenRemove({ container });

      expect(container.getAttribute('closed')).toBe('true');
    });

    it('should eventually set height to 0px', () => {
      shrinkThenRemove({ container });

      expect(container.style.height).toBe('0px');
    });

    it('should eventually set paddingBottom to 0px', () => {
      shrinkThenRemove({ container });

      expect(container.style.paddingBottom).toBe('0px');
    });
  });

  describe('edge cases', () => {
    it('should handle container with zero height', () => {
      Object.defineProperty(container, 'clientHeight', {
        writable: true,
        configurable: true,
        value: 0,
      });

      expect(() => shrinkThenRemove({ container })).not.toThrow();
    });

    it('should handle container with no padding', () => {
      (window.getComputedStyle as jest.Mock).mockReturnValue({
        paddingBottom: '0px',
      });

      expect(() => shrinkThenRemove({ container })).not.toThrow();
    });

    it('should handle container with fractional padding', () => {
      (window.getComputedStyle as jest.Mock).mockReturnValue({
        paddingBottom: '15.5px',
      });

      expect(() => shrinkThenRemove({ container })).not.toThrow();
    });

    it('should call setTimeout after animation completes', () => {
      shrinkThenRemove({ container });

      expect(timeoutSpy).toHaveBeenCalledWith(expect.any(Function), 100);
    });
  });

  describe('animation frames', () => {
    it('should animate over 30 frames', () => {
      let frameCount = 0;
      rafSpy.mockRestore();
      rafSpy = jest
        .spyOn(window, 'requestAnimationFrame')
        .mockImplementation((callback: FrameRequestCallback) => {
          frameCount++;
          if (frameCount <= 30) {
            callback(0);
          }
          return 0;
        });

      shrinkThenRemove({ container });

      // Should call requestAnimationFrame 30 times plus the initial call
      expect(rafSpy).toHaveBeenCalled();
    });

    it('should progressively reduce height', () => {
      const heights: string[] = [];
      let frameCount = 0;

      rafSpy.mockRestore();
      rafSpy = jest
        .spyOn(window, 'requestAnimationFrame')
        .mockImplementation((callback: FrameRequestCallback) => {
          callback(0);
          frameCount++;
          if (frameCount <= 3) {
            heights.push(container.style.height);
          }
          return 0;
        });

      Object.defineProperty(container, 'clientHeight', {
        writable: true,
        configurable: true,
        value: 90,
      });

      shrinkThenRemove({ container });

      // Heights should be decreasing
      expect(heights.length).toBeGreaterThan(0);
    });
  });

  describe('error conditions', () => {
    it('should handle null container', () => {
      expect(() => shrinkThenRemove({ container: null as any })).toThrow();
    });

    it('should handle undefined container', () => {
      expect(() => shrinkThenRemove({ container: undefined as any })).toThrow();
    });

    it('should handle container not in document', () => {
      const detachedContainer = document.createElement('div');
      detachedContainer.style.paddingBottom = '20px';

      Object.defineProperty(detachedContainer, 'clientHeight', {
        writable: true,
        configurable: true,
        value: 100,
      });

      expect(() => shrinkThenRemove({ container: detachedContainer })).not.toThrow();
    });
  });
});
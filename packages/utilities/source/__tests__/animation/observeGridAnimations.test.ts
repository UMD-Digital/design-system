import { observeGridAnimations } from '../../animation/observeGridAnimations';

describe('observeGridAnimations', () => {
  let mockIntersectionObserver: jest.Mock;
  let observeCallback: IntersectionObserverCallback | null = null;

  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = '';

    // Mock IntersectionObserver
    mockIntersectionObserver = jest.fn((callback: IntersectionObserverCallback) => {
      observeCallback = callback;
      return {
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      };
    });
    global.IntersectionObserver = mockIntersectionObserver as any;

    // Mock matchMedia (no reduced motion by default)
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  describe('happy path', () => {
    it('should create IntersectionObserver with correct options', () => {
      const container = document.createElement('div');
      container.className = 'umd-animation-grid';
      const child1 = document.createElement('div');
      container.appendChild(child1);
      document.body.appendChild(container);

      observeGridAnimations();

      expect(mockIntersectionObserver).toHaveBeenCalledWith(
        expect.any(Function),
        {
          rootMargin: '0px',
          threshold: [0.35],
        }
      );
    });

    it('should inject animation styles into document', () => {
      observeGridAnimations();

      const styleElement = document.querySelector('style');
      expect(styleElement).not.toBeNull();
      expect(styleElement?.innerHTML).toContain('fade-in-from-bottom');
      expect(styleElement?.innerHTML).toContain('umd-animation-transition-fade-bottom');
    });

    it('should observe elements in .umd-animation-grid', () => {
      const container = document.createElement('div');
      container.className = 'umd-animation-grid';
      const child1 = document.createElement('div');
      const child2 = document.createElement('div');
      container.appendChild(child1);
      container.appendChild(child2);
      document.body.appendChild(container);

      observeGridAnimations();

      const observerInstance = mockIntersectionObserver.mock.results[0].value;
      expect(observerInstance.observe).toHaveBeenCalledTimes(2);
      expect(observerInstance.observe).toHaveBeenCalledWith(child1);
      expect(observerInstance.observe).toHaveBeenCalledWith(child2);
    });

    it('should observe elements in .umd-grid-animation', () => {
      const container = document.createElement('div');
      container.className = 'umd-grid-animation';
      const child1 = document.createElement('div');
      container.appendChild(child1);
      document.body.appendChild(container);

      observeGridAnimations();

      const observerInstance = mockIntersectionObserver.mock.results[0].value;
      expect(observerInstance.observe).toHaveBeenCalledWith(child1);
    });

    it('should add animation class when element intersects', () => {
      const container = document.createElement('div');
      container.className = 'umd-animation-grid';
      const child = document.createElement('div');
      container.appendChild(child);
      document.body.appendChild(container);

      observeGridAnimations();

      // Mock intersection entry
      const mockEntry = {
        target: child,
        isIntersecting: true,
      } as unknown as IntersectionObserverEntry;

      const observerInstance = mockIntersectionObserver.mock.results[0].value;
      observeCallback!([mockEntry], observerInstance);

      expect(child.classList.contains('umd-animation-transition-fade-bottom')).toBe(true);
    });

    it('should unobserve element after intersection', () => {
      const container = document.createElement('div');
      container.className = 'umd-animation-grid';
      const child = document.createElement('div');
      container.appendChild(child);
      document.body.appendChild(container);

      observeGridAnimations();

      const mockEntry = {
        target: child,
        isIntersecting: true,
      } as unknown as IntersectionObserverEntry;

      const observerInstance = mockIntersectionObserver.mock.results[0].value;
      observeCallback!([mockEntry], observerInstance);

      expect(observerInstance.unobserve).toHaveBeenCalledWith(child);
    });

    it('should apply staggered delay to aligned elements', () => {
      const container = document.createElement('div');
      container.className = 'umd-animation-grid';
      container.style.display = 'grid';
      container.style.gridTemplateColumns = 'repeat(2, 1fr)';

      const child1 = document.createElement('div');
      const child2 = document.createElement('div');
      container.appendChild(child1);
      container.appendChild(child2);
      document.body.appendChild(container);

      // Mock getBoundingClientRect to simulate aligned elements
      jest.spyOn(child1, 'getBoundingClientRect').mockReturnValue({
        top: 100,
      } as DOMRect);
      jest.spyOn(child2, 'getBoundingClientRect').mockReturnValue({
        top: 100,
      } as DOMRect);

      observeGridAnimations();

      // Trigger resize to set alignment
      window.dispatchEvent(new Event('resize'));

      expect(child2.getAttribute('data-animation')).toBe('offset');

      // Simulate intersection for both
      const mockEntry1 = {
        target: child1,
        isIntersecting: true,
      } as unknown as IntersectionObserverEntry;
      const mockEntry2 = {
        target: child2,
        isIntersecting: true,
      } as unknown as IntersectionObserverEntry;

      const observerInstance = mockIntersectionObserver.mock.results[0].value;
      observeCallback!([mockEntry1], observerInstance);
      expect(child1.style.animationDelay).toBe('0ms');

      observeCallback!([mockEntry2], observerInstance);
      expect(child2.style.animationDelay).toBe('350ms');
    });
  });

  describe('edge cases', () => {
    it('should not run if prefers-reduced-motion is enabled', () => {
      window.matchMedia = jest.fn().mockImplementation((query) => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }));

      observeGridAnimations();

      expect(mockIntersectionObserver).not.toHaveBeenCalled();
      expect(document.querySelector('style')).toBeNull();
    });

    it('should not observe elements if no grid containers exist', () => {
      document.body.innerHTML = '<div>No grid here</div>';

      observeGridAnimations();

      const observerInstance = mockIntersectionObserver.mock.results[0]?.value;
      expect(observerInstance?.observe).toBeUndefined();
    });

    it('should handle empty grid containers', () => {
      const container = document.createElement('div');
      container.className = 'umd-animation-grid';
      document.body.appendChild(container);

      expect(() => observeGridAnimations()).not.toThrow();
    });

    it('should not add animation class when not intersecting', () => {
      const container = document.createElement('div');
      container.className = 'umd-animation-grid';
      const child = document.createElement('div');
      container.appendChild(child);
      document.body.appendChild(container);

      observeGridAnimations();

      const mockEntry = {
        target: child,
        isIntersecting: false,
      } as unknown as IntersectionObserverEntry;

      const observerInstance = mockIntersectionObserver.mock.results[0].value;
      observeCallback!([mockEntry], observerInstance);

      expect(child.classList.contains('umd-animation-transition-fade-bottom')).toBe(false);
    });

    it('should handle multiple resize events', () => {
      const container = document.createElement('div');
      container.className = 'umd-animation-grid';
      const child = document.createElement('div');
      container.appendChild(child);
      document.body.appendChild(container);

      observeGridAnimations();

      expect(() => {
        window.dispatchEvent(new Event('resize'));
        window.dispatchEvent(new Event('resize'));
        window.dispatchEvent(new Event('resize'));
      }).not.toThrow();
    });

    it('should reset delay for elements not on same row', () => {
      const container = document.createElement('div');
      container.className = 'umd-animation-grid';
      const child1 = document.createElement('div');
      const child2 = document.createElement('div');
      container.appendChild(child1);
      container.appendChild(child2);
      document.body.appendChild(container);

      // Mock different vertical positions
      jest.spyOn(child1, 'getBoundingClientRect').mockReturnValue({
        top: 100,
      } as DOMRect);
      jest.spyOn(child2, 'getBoundingClientRect').mockReturnValue({
        top: 200,
      } as DOMRect);

      observeGridAnimations();

      const mockEntry1 = {
        target: child1,
        isIntersecting: true,
      } as unknown as IntersectionObserverEntry;
      const mockEntry2 = {
        target: child2,
        isIntersecting: true,
      } as unknown as IntersectionObserverEntry;

      const observerInstance = mockIntersectionObserver.mock.results[0].value;
      observeCallback!([mockEntry1], observerInstance);
      observeCallback!([mockEntry2], observerInstance);

      // Second element should have no delay as it's on a new row
      expect(child2.style.animationDelay).toBe('0ms');
    });
  });

  describe('error conditions', () => {
    it('should handle missing window.matchMedia gracefully', () => {
      const originalMatchMedia = window.matchMedia;
      (window as any).matchMedia = undefined;

      expect(() => observeGridAnimations()).toThrow();

      window.matchMedia = originalMatchMedia;
    });

    it('should handle missing IntersectionObserver', () => {
      const originalIO = global.IntersectionObserver;
      (global as any).IntersectionObserver = undefined;

      document.body.innerHTML = '<div class="umd-animation-grid"><div></div></div>';

      expect(() => observeGridAnimations()).toThrow();

      global.IntersectionObserver = originalIO;
    });
  });
});

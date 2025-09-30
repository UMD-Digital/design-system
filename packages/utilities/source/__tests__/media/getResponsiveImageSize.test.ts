import { getResponsiveImageSize } from '../../media/getResponsiveImageSize';

describe('getResponsiveImageSize', () => {
  let image: HTMLImageElement;
  let parentNode: HTMLElement;
  let originalInnerHeight: number;

  beforeEach(() => {
    image = document.createElement('img');
    parentNode = document.createElement('div');
    document.body.appendChild(parentNode);

    originalInnerHeight = window.innerHeight;

    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 1000,
    });
  });

  afterEach(() => {
    document.body.innerHTML = '';
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: originalInnerHeight,
    });
  });

  describe('happy path', () => {
    it('should calculate responsive size based on aspect ratio', () => {
      Object.defineProperty(image, 'naturalWidth', { value: 800, writable: true });
      Object.defineProperty(image, 'naturalHeight', { value: 600, writable: true });
      Object.defineProperty(parentNode, 'offsetWidth', { value: 400, writable: true });

      const result = getResponsiveImageSize({ image, parentNode });

      // Aspect ratio: 800/600 = 1.333...
      // Max element height: 400 / 1.333 = 300
      // Max height (default): window.innerHeight - 48 = 952
      // Image natural height: 600
      // Result should be min(300, 952, 600) = 300
      expect(result).toBe(300);
    });

    it('should use custom maxWindowHeight', () => {
      Object.defineProperty(image, 'naturalWidth', { value: 800, writable: true });
      Object.defineProperty(image, 'naturalHeight', { value: 600, writable: true });
      Object.defineProperty(parentNode, 'offsetWidth', { value: 1000, writable: true });

      const result = getResponsiveImageSize({
        image,
        parentNode,
        maxWindowHeight: 500,
      });

      // Aspect ratio: 800/600 = 1.333...
      // Max element height: 1000 / 1.333 = 750
      // Custom max height: 500
      // Image natural height: 600
      // Result should be min(500, 750, 600) = 500
      expect(result).toBe(500);
    });

    it('should use default maxWindowHeight (window.innerHeight - 48)', () => {
      Object.defineProperty(image, 'naturalWidth', { value: 800, writable: true });
      Object.defineProperty(image, 'naturalHeight', { value: 600, writable: true });
      Object.defineProperty(parentNode, 'offsetWidth', { value: 1000, writable: true });

      const result = getResponsiveImageSize({ image, parentNode });

      // Max element height: 1000 / (800/600) = 750
      // Default max height: 1000 - 48 = 952
      // Image natural height: 600
      // Result should be min(750, 952, 600) = 600
      expect(result).toBe(600);
    });

    it('should return natural height when smaller than constraints', () => {
      Object.defineProperty(image, 'naturalWidth', { value: 400, writable: true });
      Object.defineProperty(image, 'naturalHeight', { value: 300, writable: true });
      Object.defineProperty(parentNode, 'offsetWidth', { value: 1000, writable: true });

      const result = getResponsiveImageSize({ image, parentNode });

      // Image is small, so return natural height
      expect(result).toBe(300);
    });

    it('should constrain to maxWindowHeight when element height exceeds it', () => {
      Object.defineProperty(image, 'naturalWidth', { value: 800, writable: true });
      Object.defineProperty(image, 'naturalHeight', { value: 2000, writable: true });
      Object.defineProperty(parentNode, 'offsetWidth', { value: 1000, writable: true });

      const result = getResponsiveImageSize({
        image,
        parentNode,
        maxWindowHeight: 500,
      });

      // Max element height would be larger, but constrained by maxWindowHeight
      expect(result).toBe(500);
    });
  });

  describe('edge cases', () => {
    it('should return maxWindowHeight when image is null', () => {
      const result = getResponsiveImageSize({
        image: null as any,
        parentNode,
        maxWindowHeight: 800,
      });

      expect(result).toBe(800);
    });

    it('should return default maxWindowHeight when image is null', () => {
      const result = getResponsiveImageSize({
        image: null as any,
        parentNode,
      });

      expect(result).toBe(window.innerHeight - 48);
    });

    it('should handle square images', () => {
      Object.defineProperty(image, 'naturalWidth', { value: 500, writable: true });
      Object.defineProperty(image, 'naturalHeight', { value: 500, writable: true });
      Object.defineProperty(parentNode, 'offsetWidth', { value: 600, writable: true });

      const result = getResponsiveImageSize({ image, parentNode });

      // Aspect ratio: 1
      // Max element height: 600 / 1 = 600
      // Result should be min(600, 952, 500) = 500
      expect(result).toBe(500);
    });

    it('should handle tall narrow images', () => {
      Object.defineProperty(image, 'naturalWidth', { value: 200, writable: true });
      Object.defineProperty(image, 'naturalHeight', { value: 1000, writable: true });
      Object.defineProperty(parentNode, 'offsetWidth', { value: 300, writable: true });

      const result = getResponsiveImageSize({
        image,
        parentNode,
        maxWindowHeight: 800,
      });

      // Aspect ratio: 0.2
      // Max element height: 300 / 0.2 = 1500
      // Constrained by maxWindowHeight: 800
      // Result: 800
      expect(result).toBe(800);
    });

    it('should handle wide short images', () => {
      Object.defineProperty(image, 'naturalWidth', { value: 2000, writable: true });
      Object.defineProperty(image, 'naturalHeight', { value: 400, writable: true });
      Object.defineProperty(parentNode, 'offsetWidth', { value: 1000, writable: true });

      const result = getResponsiveImageSize({ image, parentNode });

      // Aspect ratio: 5
      // Max element height: 1000 / 5 = 200
      // Image natural height: 400
      // Result: 200
      expect(result).toBe(200);
    });

    it('should handle zero parent width', () => {
      Object.defineProperty(image, 'naturalWidth', { value: 800, writable: true });
      Object.defineProperty(image, 'naturalHeight', { value: 600, writable: true });
      Object.defineProperty(parentNode, 'offsetWidth', { value: 0, writable: true });

      const result = getResponsiveImageSize({ image, parentNode });

      // With 0 width, max element height would be 0
      expect(result).toBe(0);
    });

    it('should handle zero image dimensions', () => {
      Object.defineProperty(image, 'naturalWidth', { value: 0, writable: true });
      Object.defineProperty(image, 'naturalHeight', { value: 0, writable: true });
      Object.defineProperty(parentNode, 'offsetWidth', { value: 500, writable: true });

      const result = getResponsiveImageSize({ image, parentNode });

      // Division by zero in aspect ratio would result in Infinity
      // Result depends on how the math works out
      expect(typeof result).toBe('number');
    });

    it('should handle very large images', () => {
      Object.defineProperty(image, 'naturalWidth', { value: 4000, writable: true });
      Object.defineProperty(image, 'naturalHeight', { value: 3000, writable: true });
      Object.defineProperty(parentNode, 'offsetWidth', { value: 800, writable: true });

      const result = getResponsiveImageSize({
        image,
        parentNode,
        maxWindowHeight: 700,
      });

      // Aspect ratio: 4000/3000 = 1.333...
      // Max element height: 800 / 1.333 = 600
      // Constrained by maxWindowHeight: 700
      // Result: 600
      expect(result).toBe(600);
    });

    it('should handle fractional dimensions', () => {
      Object.defineProperty(image, 'naturalWidth', { value: 777.7, writable: true });
      Object.defineProperty(image, 'naturalHeight', { value: 555.5, writable: true });
      Object.defineProperty(parentNode, 'offsetWidth', { value: 333.3, writable: true });

      const result = getResponsiveImageSize({ image, parentNode });

      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThan(0);
    });
  });

  describe('error conditions', () => {
    it('should handle undefined image', () => {
      const result = getResponsiveImageSize({
        image: undefined as any,
        parentNode,
        maxWindowHeight: 800,
      });

      expect(result).toBe(800);
    });

    it('should handle null parentNode', () => {
      Object.defineProperty(image, 'naturalWidth', { value: 800, writable: true });
      Object.defineProperty(image, 'naturalHeight', { value: 600, writable: true });

      expect(() =>
        getResponsiveImageSize({ image, parentNode: null as any }),
      ).toThrow();
    });

    it('should handle undefined parentNode', () => {
      Object.defineProperty(image, 'naturalWidth', { value: 800, writable: true });
      Object.defineProperty(image, 'naturalHeight', { value: 600, writable: true });

      expect(() =>
        getResponsiveImageSize({ image, parentNode: undefined as any }),
      ).toThrow();
    });
  });

  describe('aspect ratio calculations', () => {
    it('should maintain aspect ratio', () => {
      Object.defineProperty(image, 'naturalWidth', { value: 1920, writable: true });
      Object.defineProperty(image, 'naturalHeight', { value: 1080, writable: true });
      Object.defineProperty(parentNode, 'offsetWidth', { value: 960, writable: true });

      const result = getResponsiveImageSize({ image, parentNode });

      // Aspect ratio: 1920/1080 = 1.777...
      // Max element height: 960 / 1.777 = 540
      // Result should be 540
      expect(result).toBe(540);
    });

    it('should handle 16:9 aspect ratio', () => {
      Object.defineProperty(image, 'naturalWidth', { value: 1600, writable: true });
      Object.defineProperty(image, 'naturalHeight', { value: 900, writable: true });
      Object.defineProperty(parentNode, 'offsetWidth', { value: 800, writable: true });

      const result = getResponsiveImageSize({ image, parentNode });

      // Aspect ratio: 1600/900 = 1.777...
      // Max element height: 800 / 1.777 = 450
      expect(result).toBe(450);
    });

    it('should handle 4:3 aspect ratio', () => {
      Object.defineProperty(image, 'naturalWidth', { value: 1200, writable: true });
      Object.defineProperty(image, 'naturalHeight', { value: 900, writable: true });
      Object.defineProperty(parentNode, 'offsetWidth', { value: 800, writable: true });

      const result = getResponsiveImageSize({ image, parentNode });

      // Aspect ratio: 1200/900 = 1.333...
      // Max element height: 800 / 1.333 = 600
      expect(result).toBe(600);
    });
  });
});
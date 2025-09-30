import { isScreenZoomed } from '../../accessibility/isScreenZoomed';

describe('isScreenZoomed', () => {
  let originalDevicePixelRatio: number;

  beforeEach(() => {
    originalDevicePixelRatio = window.devicePixelRatio;
  });

  afterEach(() => {
    Object.defineProperty(window, 'devicePixelRatio', {
      writable: true,
      configurable: true,
      value: originalDevicePixelRatio,
    });
  });

  describe('happy path', () => {
    it('should return false for 100% zoom on standard DPI display', () => {
      Object.defineProperty(window, 'devicePixelRatio', {
        writable: true,
        configurable: true,
        value: 1,
      });

      expect(isScreenZoomed()).toBe(false);
    });

    it('should return false for 150% zoom on high DPI display (1.5x)', () => {
      Object.defineProperty(window, 'devicePixelRatio', {
        writable: true,
        configurable: true,
        value: 1.5,
      });

      // 1.5 > 1, so isHighDPI = true
      // browserZoomLevel = 150
      // 150 is not > 200, so returns false
      expect(isScreenZoomed()).toBe(false);
    });

    it('should return false for 100% zoom on high DPI display (2x)', () => {
      Object.defineProperty(window, 'devicePixelRatio', {
        writable: true,
        configurable: true,
        value: 2,
      });

      expect(isScreenZoomed()).toBe(false);
    });

    it('should return false for 200% zoom on high DPI display (2x)', () => {
      Object.defineProperty(window, 'devicePixelRatio', {
        writable: true,
        configurable: true,
        value: 2,
      });

      expect(isScreenZoomed()).toBe(false);
    });

    it('should return true for 150% zoom on high DPI display (3x total)', () => {
      Object.defineProperty(window, 'devicePixelRatio', {
        writable: true,
        configurable: true,
        value: 3,
      });

      expect(isScreenZoomed()).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('should return false at exactly 100% on standard DPI', () => {
      Object.defineProperty(window, 'devicePixelRatio', {
        writable: true,
        configurable: true,
        value: 1.0,
      });

      expect(isScreenZoomed()).toBe(false);
    });

    it('should return false at exactly 200% on high DPI display', () => {
      Object.defineProperty(window, 'devicePixelRatio', {
        writable: true,
        configurable: true,
        value: 2.0,
      });

      expect(isScreenZoomed()).toBe(false);
    });

    it('should return true at 201% on high DPI display', () => {
      Object.defineProperty(window, 'devicePixelRatio', {
        writable: true,
        configurable: true,
        value: 2.01,
      });

      expect(isScreenZoomed()).toBe(true);
    });

    it('should return false at 101% on high DPI display', () => {
      Object.defineProperty(window, 'devicePixelRatio', {
        writable: true,
        configurable: true,
        value: 1.01,
      });

      // isHighDPI = true (1.01 > 1)
      // browserZoomLevel = Math.round(101) = 101
      // 101 is not > 200, so returns false
      expect(isScreenZoomed()).toBe(false);
    });

    it('should handle very high DPI displays (3x)', () => {
      Object.defineProperty(window, 'devicePixelRatio', {
        writable: true,
        configurable: true,
        value: 3,
      });

      expect(isScreenZoomed()).toBe(true);
    });

    it('should handle very high zoom levels', () => {
      Object.defineProperty(window, 'devicePixelRatio', {
        writable: true,
        configurable: true,
        value: 5,
      });

      expect(isScreenZoomed()).toBe(true);
    });

    it('should handle fractional devicePixelRatio values', () => {
      Object.defineProperty(window, 'devicePixelRatio', {
        writable: true,
        configurable: true,
        value: 1.25,
      });

      // isHighDPI = true (1.25 > 1)
      // browserZoomLevel = Math.round(125) = 125
      // 125 is not > 200, so returns false
      expect(isScreenZoomed()).toBe(false);
    });

    it('should correctly identify high DPI at 1.5x', () => {
      Object.defineProperty(window, 'devicePixelRatio', {
        writable: true,
        configurable: true,
        value: 1.5,
      });

      // 1.5 > 1, so isHighDPI = true
      // browserZoomLevel = Math.round(1.5 * 100) = 150
      // 150 is not > 200, so should return false
      expect(isScreenZoomed()).toBe(false);
    });
  });

  describe('boundary conditions', () => {
    it('should handle devicePixelRatio of exactly 1', () => {
      Object.defineProperty(window, 'devicePixelRatio', {
        writable: true,
        configurable: true,
        value: 1,
      });

      expect(isScreenZoomed()).toBe(false);
    });

    it('should handle devicePixelRatio just above 1', () => {
      Object.defineProperty(window, 'devicePixelRatio', {
        writable: true,
        configurable: true,
        value: 1.001,
      });

      // isHighDPI = true (1.001 > 1)
      // browserZoomLevel = Math.round(100.1) = 100
      // 100 is not > 200, so should return false
      expect(isScreenZoomed()).toBe(false);
    });

    it('should handle devicePixelRatio just below 1', () => {
      Object.defineProperty(window, 'devicePixelRatio', {
        writable: true,
        configurable: true,
        value: 0.999,
      });

      // isHighDPI = false (0.999 not > 1)
      // browserZoomLevel = Math.round(99.9) = 100
      // 100 is not > 100, so should return false
      expect(isScreenZoomed()).toBe(false);
    });

    it('should handle zero devicePixelRatio', () => {
      Object.defineProperty(window, 'devicePixelRatio', {
        writable: true,
        configurable: true,
        value: 0,
      });

      expect(isScreenZoomed()).toBe(false);
    });
  });
});
import { isPreferredReducedMotion } from '../../source/accessibility/isPreferredReducedMotion';

describe('isPreferredReducedMotion', () => {
  let matchMediaMock: jest.Mock;

  beforeEach(() => {
    matchMediaMock = jest.fn();
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      configurable: true,
      value: matchMediaMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('happy path', () => {
    it('should return true when prefers-reduced-motion is enabled', () => {
      matchMediaMock.mockReturnValue({
        matches: true,
        media: '(prefers-reduced-motion: reduce)',
      });

      expect(isPreferredReducedMotion()).toBe(true);
      expect(matchMediaMock).toHaveBeenCalledWith(
        '(prefers-reduced-motion: reduce)',
      );
    });

    it('should return false when prefers-reduced-motion is not enabled', () => {
      matchMediaMock.mockReturnValue({
        matches: false,
        media: '(prefers-reduced-motion: reduce)',
      });

      expect(isPreferredReducedMotion()).toBe(false);
      expect(matchMediaMock).toHaveBeenCalledWith(
        '(prefers-reduced-motion: reduce)',
      );
    });
  });

  describe('edge cases', () => {
    it('should handle undefined matchMedia result', () => {
      matchMediaMock.mockReturnValue(undefined);

      // This will throw since the code doesn't handle undefined
      expect(() => isPreferredReducedMotion()).toThrow();
    });

    it('should handle null matchMedia result', () => {
      matchMediaMock.mockReturnValue(null);

      // This will throw since the code doesn't handle null
      expect(() => isPreferredReducedMotion()).toThrow();
    });

    it('should handle matchMedia result without matches property', () => {
      matchMediaMock.mockReturnValue({
        media: '(prefers-reduced-motion: reduce)',
      });

      expect(isPreferredReducedMotion()).toBe(false);
    });

    it('should call matchMedia only once', () => {
      matchMediaMock.mockReturnValue({
        matches: true,
      });

      isPreferredReducedMotion();

      expect(matchMediaMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('error conditions', () => {
    it('should handle missing matchMedia support', () => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        configurable: true,
        value: undefined,
      });

      expect(() => isPreferredReducedMotion()).toThrow();
    });

    it('should handle matchMedia throwing an error', () => {
      matchMediaMock.mockImplementation(() => {
        throw new Error('matchMedia error');
      });

      expect(() => isPreferredReducedMotion()).toThrow('matchMedia error');
    });
  });
});
import { imageHasAlt } from '../../source/accessibility/imageHasAlt';

describe('imageHasAlt', () => {
  // Suppress console.error for tests
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  describe('happy path', () => {
    it('should return true for image with alt text', () => {
      const img = document.createElement('img');
      img.setAttribute('alt', 'A description');

      expect(imageHasAlt(img)).toBe(true);
    });

    it('should return true for image with empty alt text (decorative)', () => {
      const img = document.createElement('img');
      img.setAttribute('alt', '');

      expect(imageHasAlt(img)).toBe(true);
    });

    it('should not log error when alt is present', () => {
      const img = document.createElement('img');
      img.setAttribute('alt', 'Description');

      imageHasAlt(img);

      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it('should work with images in DOM', () => {
      const container = document.createElement('div');
      container.innerHTML = '<img src="test.jpg" alt="Test image" />';

      const img = container.querySelector('img') as HTMLImageElement;

      expect(imageHasAlt(img)).toBe(true);
    });
  });

  describe('error conditions', () => {
    it('should return false for image without alt attribute', () => {
      const img = document.createElement('img');

      expect(imageHasAlt(img)).toBe(false);
    });

    it('should log error when alt is missing', () => {
      const img = document.createElement('img');

      imageHasAlt(img);

      expect(consoleErrorSpy).toHaveBeenCalledWith('Image elements require alt text');
    });

    it('should only log error once per call', () => {
      const img = document.createElement('img');

      imageHasAlt(img);

      expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('edge cases', () => {
    it('should return true for null image', () => {
      expect(imageHasAlt(null)).toBe(true);
    });

    it('should not log error for null image', () => {
      imageHasAlt(null);

      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it('should handle image with src but no alt', () => {
      const img = document.createElement('img');
      img.src = 'https://example.com/image.jpg';

      expect(imageHasAlt(img)).toBe(false);
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('should handle dynamically created images', () => {
      const img = new Image();
      img.alt = 'Dynamic image';

      expect(imageHasAlt(img)).toBe(true);
    });
  });

  describe('accessibility compliance', () => {
    it('should accept empty alt for decorative images (WCAG compliant)', () => {
      const img = document.createElement('img');
      img.setAttribute('alt', '');

      expect(imageHasAlt(img)).toBe(true);
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it('should accept meaningful alt text', () => {
      const img = document.createElement('img');
      img.setAttribute('alt', 'University of Maryland logo');

      expect(imageHasAlt(img)).toBe(true);
    });

    it('should accept alt text with unicode', () => {
      const img = document.createElement('img');
      img.setAttribute('alt', 'Über uns');

      expect(imageHasAlt(img)).toBe(true);
    });

    it('should accept alt text with special characters', () => {
      const img = document.createElement('img');
      img.setAttribute('alt', 'A & B <company>');

      expect(imageHasAlt(img)).toBe(true);
    });
  });

  describe('multiple images', () => {
    it('should validate multiple images independently', () => {
      const img1 = document.createElement('img');
      img1.alt = 'Image 1';

      const img2 = document.createElement('img');
      // img2 has no alt

      expect(imageHasAlt(img1)).toBe(true);
      expect(imageHasAlt(img2)).toBe(false);

      expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    });

    it('should handle batch validation', () => {
      const images = [
        Object.assign(document.createElement('img'), { alt: 'Valid' }),
        document.createElement('img'), // No alt
        Object.assign(document.createElement('img'), { alt: '' }), // Empty alt (valid)
        document.createElement('img'), // No alt
      ];

      const results = images.map(imageHasAlt);

      expect(results).toEqual([true, false, true, false]);
      expect(consoleErrorSpy).toHaveBeenCalledTimes(2);
    });
  });
});
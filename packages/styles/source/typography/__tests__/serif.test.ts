import * as serif from '../serif';
import { font, media } from '@universityofmaryland/web-token-library';

describe('typography/serif', () => {
  it('should match snapshot', () => {
    expect(serif).toMatchSnapshot();
  });

  describe('size objects', () => {
    it('should have correctly defined serif sizes', () => {
      // Test individual size exports
      expect(serif.maximum).toMatchSnapshot();
      expect(serif.extralarge).toMatchSnapshot();
      expect(serif.larger).toMatchSnapshot();
      expect(serif.large).toMatchSnapshot();
      expect(serif.medium).toMatchSnapshot();
    });

    it('should use the serif font family for all sizes', () => {
      // All sizes should use serif font family
      [
        serif.maximum,
        serif.extralarge,
        serif.larger,
        serif.large,
        serif.medium,
      ].forEach((size) => {
        // Using the base object inside each size
        expect(size.fontFamily).toBe(font.family.serif);
      });
    });
  });

  describe('fonts objects', () => {
    it('should have correctly named font objects with classNames', () => {
      expect(serif.fonts.maximum.className).toBe('umd-serif-maximum');
      expect(serif.fonts.extraLarge.className).toBe('umd-serif-extralarge');
      expect(serif.fonts.larger.className).toBe('umd-serif-larger');
      expect(serif.fonts.large.className).toBe('umd-serif-large');
      expect(serif.fonts.medium.className).toBe('umd-serif-medium');
    });

    it('should match snapshot for all fonts objects', () => {
      expect(serif.fonts).toMatchSnapshot();
    });
  });
});

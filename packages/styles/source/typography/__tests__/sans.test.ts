import * as sans from '../sans';
import { font, media } from '../../token';

describe('typography/sans', () => {
  it('should match snapshot', () => {
    expect(sans).toMatchSnapshot();
  });

  describe('size objects', () => {
    it('should have correctly defined size values', () => {
      // Test individual size exports
      expect(sans.largest).toMatchSnapshot();
      expect(sans.extraLarge).toMatchSnapshot();
      expect(sans.larger).toMatchSnapshot();
      expect(sans.large).toMatchSnapshot();
      expect(sans.medium).toMatchSnapshot();
      expect(sans.small).toMatchSnapshot();
      expect(sans.smaller).toMatchSnapshot();
      expect(sans.min).toMatchSnapshot();
    });

    it('should use the correct font family for all sizes', () => {
      // All sizes should use sans font family
      [
        sans.largest,
        sans.extraLarge,
        sans.larger,
        sans.large,
        sans.medium,
        sans.small,
        sans.smaller,
        sans.min,
      ].forEach((size) => {
        expect(size.fontFamily).toBe(font.family.sans);
      });
    });
  });

  describe('fonts objects', () => {
    it('should have all expected font objects with classNames', () => {
      // Test that all fonts have class names
      expect(sans.fonts.largest.className).toBe('umd-sans-largest');
      expect(sans.fonts.extraLarge.className).toBe('umd-sans-extralarge');
      expect(sans.fonts.larger.className).toBe('umd-sans-larger');
      expect(sans.fonts.large.className).toBe('umd-sans-large');
      expect(sans.fonts.medium.className).toBe('umd-sans-medium');
      expect(sans.fonts.small.className).toBe('umd-sans-small');
      expect(sans.fonts.smaller.className).toBe('umd-sans-smaller');
      expect(sans.fonts.min.className).toBe('umd-sans-min');
    });

    it('should match snapshot for all fonts objects', () => {
      expect(sans.fonts).toMatchSnapshot();
    });
  });

  describe('scaling fonts', () => {
    it('should match snapshot for scaling fonts', () => {
      expect(sans.scalingFonts).toMatchSnapshot();
    });
  });

  describe('transformations', () => {
    it('should have correctly defined transformations', () => {
      expect(sans.transformations.largestUppercase.fontWeight).toBe(
        font.weight.extraBold,
      );
      expect(sans.transformations.largestUppercase.textTransform).toBe(
        'uppercase',
      );

      expect(sans.transformations.extraLargeUppercase.fontWeight).toBe(
        font.weight.extraBold,
      );
      expect(sans.transformations.extraLargeUppercase.textTransform).toBe(
        'uppercase',
      );

      expect(sans.transformations.extraLargeBold.fontWeight).toBe(
        font.weight.bold,
      );
      expect(sans.transformations.largerBold.fontWeight).toBe(font.weight.bold);
    });

    it('should match snapshot for all transformations', () => {
      expect(sans.transformations).toMatchSnapshot();
    });
  });
});

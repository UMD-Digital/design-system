import * as stats from '../stats';
import { font, media } from '../../token';

describe('typography/stats', () => {
  it('should match snapshot', () => {
    expect(stats).toMatchSnapshot();
  });

  describe('size objects', () => {
    it('should have correctly defined stat text sizes', () => {
      // Test individual size exports
      expect(stats.large).toMatchSnapshot();
      expect(stats.medium).toMatchSnapshot();
      expect(stats.small).toMatchSnapshot();
    });

    it('should use the campaign font family for all stat text', () => {
      // Stat text uses campaign font for emphasis
      [stats.large, stats.medium, stats.small].forEach((size) => {
        expect(size.fontFamily).toBe(font.family.campaign);
        expect(size.fontStyle).toBe('italic');
        expect(size.fontWeight).toBe(font.weight.extraBold);
      });
    });
  });

  describe('fonts objects', () => {
    it('should have correctly named font objects with classNames', () => {
      expect(stats.fonts.statLarge.className).toBe('umd-statistic-sans-large');
      expect(stats.fonts.statMedium.className).toBe(
        'umd-statistic-sans-medium',
      );
      expect(stats.fonts.statSmall.className).toBe('umd-statistic-sans-small');
    });

    it('should match snapshot for all fonts objects', () => {
      expect(stats.fonts).toMatchSnapshot();
    });
  });
});

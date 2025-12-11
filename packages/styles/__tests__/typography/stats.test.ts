import * as stats from '../../source/typography/stats';

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

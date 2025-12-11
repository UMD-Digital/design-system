import * as IndicatorIcons from '../source/indicators';

describe('Indicator Icons', () => {
  it('should export alert icon', () => {
    expect(IndicatorIcons.alert).toBeDefined();
    expect(IndicatorIcons.alert).toContain('<svg');
    expect(IndicatorIcons.alert).toContain('aria-hidden="true"');
    expect(IndicatorIcons.alert).toContain('title="exclamation icon"');
  });

  it('should export warning icon', () => {
    expect(IndicatorIcons.warning).toBeDefined();
    expect(IndicatorIcons.warning).toContain('<svg');
    expect(IndicatorIcons.warning).toContain('aria-hidden="true"');
    expect(IndicatorIcons.warning).toContain('title="notification icon"');
  });

  it('should have aria-hidden on all icons', () => {
    const icons = Object.values(IndicatorIcons);
    icons.forEach(icon => {
      expect(icon).toContain('aria-hidden="true"');
    });
  });

  it('should have valid SVG markup for all icons', () => {
    const icons = Object.values(IndicatorIcons);
    icons.forEach(icon => {
      expect(icon).toMatch(/<svg[^>]*>.*<\/svg>/);
    });
  });
});

import * as BrandIcons from '../brand';

describe('Brand Icons', () => {
  it('should export fearless icon', () => {
    expect(BrandIcons.fearless).toBeDefined();
    expect(BrandIcons.fearless).toContain('<svg');
    expect(BrandIcons.fearless).toContain('aria-hidden="true"');
    expect(BrandIcons.fearless).toContain('title="fearless icon"');
  });

  it('should export quote icon', () => {
    expect(BrandIcons.quote).toBeDefined();
    expect(BrandIcons.quote).toContain('<svg');
    expect(BrandIcons.quote).toContain('aria-hidden="true"');
    expect(BrandIcons.quote).toContain('title="quote icon"');
  });

  it('should have aria-hidden on all icons', () => {
    const icons = Object.values(BrandIcons);
    icons.forEach(icon => {
      expect(icon).toContain('aria-hidden="true"');
    });
  });

  it('should have valid SVG markup for all icons', () => {
    const icons = Object.values(BrandIcons);
    icons.forEach(icon => {
      expect(icon).toMatch(/<svg[^>]*>.*<\/svg>/);
    });
  });
});

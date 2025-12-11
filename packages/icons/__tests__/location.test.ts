import * as LocationIcons from '../source/location';

describe('Location Icons', () => {
  it('should export pin icon', () => {
    expect(LocationIcons.pin).toBeDefined();
    expect(LocationIcons.pin).toContain('<svg');
    expect(LocationIcons.pin).toContain('aria-hidden="true"');
    expect(LocationIcons.pin).toContain('title="pin icon"');
  });

  it('should have aria-hidden on all icons', () => {
    const icons = Object.values(LocationIcons);
    icons.forEach(icon => {
      expect(icon).toContain('aria-hidden="true"');
    });
  });

  it('should have valid SVG markup for all icons', () => {
    const icons = Object.values(LocationIcons);
    icons.forEach(icon => {
      expect(icon).toMatch(/<svg[^>]*>.*<\/svg>/);
    });
  });
});

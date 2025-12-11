import * as MediaIcons from '../source/media';

describe('Media Icons', () => {
  it('should export gif icon', () => {
    expect(MediaIcons.gif).toBeDefined();
    expect(MediaIcons.gif).toContain('<svg');
    expect(MediaIcons.gif).toContain('aria-hidden="true"');
    expect(MediaIcons.gif).toContain('title="gif icon"');
  });

  it('should have aria-hidden on all icons', () => {
    const icons = Object.values(MediaIcons);
    icons.forEach(icon => {
      expect(icon).toContain('aria-hidden="true"');
    });
  });

  it('should have valid SVG markup for all icons', () => {
    const icons = Object.values(MediaIcons);
    icons.forEach(icon => {
      expect(icon).toMatch(/<svg[^>]*>.*<\/svg>/);
    });
  });
});

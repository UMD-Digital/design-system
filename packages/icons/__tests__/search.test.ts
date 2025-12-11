import * as SearchIcons from '../source/search';

describe('Search Icons', () => {
  it('should export search icon', () => {
    expect(SearchIcons.search).toBeDefined();
    expect(SearchIcons.search).toContain('<svg');
    expect(SearchIcons.search).toContain('aria-hidden="true"');
    expect(SearchIcons.search).toContain('title="magnify glass icon"');
  });

  it('should have aria-hidden on all icons', () => {
    const icons = Object.values(SearchIcons);
    icons.forEach(icon => {
      expect(icon).toContain('aria-hidden="true"');
    });
  });

  it('should have valid SVG markup for all icons', () => {
    const icons = Object.values(SearchIcons);
    icons.forEach(icon => {
      expect(icon).toMatch(/<svg[^>]*>.*<\/svg>/);
    });
  });
});

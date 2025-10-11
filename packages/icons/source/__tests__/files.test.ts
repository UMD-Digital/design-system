import * as FileIcons from '../files';

describe('File Icons', () => {
  it('should export document icon', () => {
    expect(FileIcons.document).toBeDefined();
    expect(FileIcons.document).toContain('<svg');
    expect(FileIcons.document).toContain('aria-hidden="true"');
    expect(FileIcons.document).toContain('title="document icon"');
  });

  it('should have aria-hidden on all icons', () => {
    const icons = Object.values(FileIcons);
    icons.forEach(icon => {
      expect(icon).toContain('aria-hidden="true"');
    });
  });

  it('should have valid SVG markup for all icons', () => {
    const icons = Object.values(FileIcons);
    icons.forEach(icon => {
      expect(icon).toMatch(/<svg[^>]*>.*<\/svg>/);
    });
  });
});

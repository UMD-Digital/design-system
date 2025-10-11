import * as SocialIcons from '../social';

describe('Social Media Icons', () => {
  it('should export facebook icon', () => {
    expect(SocialIcons.facebook).toBeDefined();
    expect(SocialIcons.facebook).toContain('<svg');
    expect(SocialIcons.facebook).toContain('aria-hidden="true"');
    expect(SocialIcons.facebook).toContain('title="facebook icon"');
  });

  it('should export x icon', () => {
    expect(SocialIcons.x).toBeDefined();
    expect(SocialIcons.x).toContain('<svg');
    expect(SocialIcons.x).toContain('aria-hidden="true"');
    expect(SocialIcons.x).toContain('title="x icon"');
  });

  it('should export twitter icon', () => {
    expect(SocialIcons.twitter).toBeDefined();
    expect(SocialIcons.twitter).toContain('<svg');
    expect(SocialIcons.twitter).toContain('aria-hidden="true"');
    expect(SocialIcons.twitter).toContain('title="twitter icon"');
  });

  it('should export instagram icon', () => {
    expect(SocialIcons.instagram).toBeDefined();
    expect(SocialIcons.instagram).toContain('<svg');
    expect(SocialIcons.instagram).toContain('aria-hidden="true"');
    expect(SocialIcons.instagram).toContain('title="instagram icon"');
  });

  it('should export youtube icon', () => {
    expect(SocialIcons.youtube).toBeDefined();
    expect(SocialIcons.youtube).toContain('<svg');
    expect(SocialIcons.youtube).toContain('aria-hidden="true"');
    expect(SocialIcons.youtube).toContain('title="youtube icon"');
  });

  it('should export linkedin icon', () => {
    expect(SocialIcons.linkedin).toBeDefined();
    expect(SocialIcons.linkedin).toContain('<svg');
    expect(SocialIcons.linkedin).toContain('aria-hidden="true"');
    expect(SocialIcons.linkedin).toContain('title="linkedin icon"');
  });

  it('should export threads icon', () => {
    expect(SocialIcons.threads).toBeDefined();
    expect(SocialIcons.threads).toContain('<svg');
    expect(SocialIcons.threads).toContain('aria-hidden="true"');
    expect(SocialIcons.threads).toContain('title="threads icon"');
  });

  it('should have aria-hidden on all icons', () => {
    const icons = Object.values(SocialIcons);
    icons.forEach(icon => {
      expect(icon).toContain('aria-hidden="true"');
    });
  });

  it('should have valid SVG markup for all icons', () => {
    const icons = Object.values(SocialIcons);
    icons.forEach(icon => {
      expect(icon).toMatch(/<svg[^>]*>.*<\/svg>/);
    });
  });
});

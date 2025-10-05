import * as SocialIcons from '../social';

describe('Social Media Icons', () => {
  it('should export FACEBOOK icon', () => {
    expect(SocialIcons.FACEBOOK).toBeDefined();
    expect(SocialIcons.FACEBOOK).toContain('<svg');
    expect(SocialIcons.FACEBOOK).toContain('icon_facebook');
  });

  it('should export X icon', () => {
    expect(SocialIcons.X).toBeDefined();
    expect(SocialIcons.X).toContain('<svg');
    expect(SocialIcons.X).toContain('icon_x');
  });

  it('should export INSTAGRAM icon', () => {
    expect(SocialIcons.INSTAGRAM).toBeDefined();
    expect(SocialIcons.INSTAGRAM).toContain('<svg');
    expect(SocialIcons.INSTAGRAM).toContain('icon_instagram');
  });

  it('should export YOUTUBE icon', () => {
    expect(SocialIcons.YOUTUBE).toBeDefined();
    expect(SocialIcons.YOUTUBE).toContain('<svg');
    expect(SocialIcons.YOUTUBE).toContain('icon_youtube');
  });

  it('should export LINKEDIN icon', () => {
    expect(SocialIcons.LINKEDIN).toBeDefined();
    expect(SocialIcons.LINKEDIN).toContain('<svg');
    expect(SocialIcons.LINKEDIN).toContain('icon_linkedin');
  });

  it('should export THREADS icon', () => {
    expect(SocialIcons.THREADS).toBeDefined();
    expect(SocialIcons.THREADS).toContain('<svg');
    expect(SocialIcons.THREADS).toContain('icon_threads');
  });

  it('should have aria-hidden on all icons', () => {
    const icons = Object.values(SocialIcons);
    icons.forEach(icon => {
      expect(icon).toContain('aria-hidden="true"');
    });
  });
});

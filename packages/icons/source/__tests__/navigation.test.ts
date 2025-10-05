import * as NavigationIcons from '../navigation';

describe('Navigation Icons', () => {
  it('should export ARROW icon', () => {
    expect(NavigationIcons.ARROW).toBeDefined();
    expect(NavigationIcons.ARROW).toContain('<svg');
    expect(NavigationIcons.ARROW).toContain('icon-arrow');
  });

  it('should export BACK_ARROW icon', () => {
    expect(NavigationIcons.BACK_ARROW).toBeDefined();
    expect(NavigationIcons.BACK_ARROW).toContain('<svg');
    expect(NavigationIcons.BACK_ARROW).toContain('icon-arrow-back');
  });

  it('should export FORWARD_ARROW icon', () => {
    expect(NavigationIcons.FORWARD_ARROW).toBeDefined();
    expect(NavigationIcons.FORWARD_ARROW).toContain('<svg');
    expect(NavigationIcons.FORWARD_ARROW).toContain('icon_forward_arrow');
  });

  it('should export SHORT_ARROW icon', () => {
    expect(NavigationIcons.SHORT_ARROW).toBeDefined();
    expect(NavigationIcons.SHORT_ARROW).toContain('<svg');
    expect(NavigationIcons.SHORT_ARROW).toContain('icon_short_arrow');
  });

  it('should export CHEVRON_SMALL icon', () => {
    expect(NavigationIcons.CHEVRON_SMALL).toBeDefined();
    expect(NavigationIcons.CHEVRON_SMALL).toContain('<svg');
    expect(NavigationIcons.CHEVRON_SMALL).toContain('icon_chevron');
  });

  it('should have aria-hidden on all icons', () => {
    const icons = Object.values(NavigationIcons);
    icons.forEach(icon => {
      expect(icon).toContain('aria-hidden="true"');
    });
  });
});

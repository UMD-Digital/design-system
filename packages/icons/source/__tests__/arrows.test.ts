import * as ArrowIcons from '../arrows';

describe('Arrow Icons', () => {
  it('should export arrow_up icon', () => {
    expect(ArrowIcons.arrow_up).toBeDefined();
    expect(ArrowIcons.arrow_up).toContain('<svg');
    expect(ArrowIcons.arrow_up).toContain('aria-hidden="true"');
    expect(ArrowIcons.arrow_up).toContain('title="arrow icon"');
  });

  it('should export arrow_left icon', () => {
    expect(ArrowIcons.arrow_left).toBeDefined();
    expect(ArrowIcons.arrow_left).toContain('<svg');
    expect(ArrowIcons.arrow_left).toContain('aria-hidden="true"');
    expect(ArrowIcons.arrow_left).toContain('title="arrow back icon"');
  });

  it('should export arrow_right icon', () => {
    expect(ArrowIcons.arrow_right).toBeDefined();
    expect(ArrowIcons.arrow_right).toContain('<svg');
    expect(ArrowIcons.arrow_right).toContain('aria-hidden="true"');
    expect(ArrowIcons.arrow_right).toContain('title="forward arrow icon"');
  });

  it('should export arrow_long icon', () => {
    expect(ArrowIcons.arrow_long).toBeDefined();
    expect(ArrowIcons.arrow_long).toContain('<svg');
    expect(ArrowIcons.arrow_long).toContain('aria-hidden="true"');
    expect(ArrowIcons.arrow_long).toContain('title="short arrow icon"');
  });

  it('should have aria-hidden on all icons', () => {
    const icons = Object.values(ArrowIcons);
    icons.forEach(icon => {
      expect(icon).toContain('aria-hidden="true"');
    });
  });

  it('should have valid SVG markup for all icons', () => {
    const icons = Object.values(ArrowIcons);
    icons.forEach(icon => {
      expect(icon).toMatch(/<svg[^>]*>.*<\/svg>/);
    });
  });
});

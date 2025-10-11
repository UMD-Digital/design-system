import * as ControlIcons from '../controls';

describe('Control Icons', () => {
  it('should export chevron_down icon', () => {
    expect(ControlIcons.chevron_down).toBeDefined();
    expect(ControlIcons.chevron_down).toContain('<svg');
    expect(ControlIcons.chevron_down).toContain('aria-hidden="true"');
    expect(ControlIcons.chevron_down).toContain('title="chevron icon"');
  });

  it('should export close icon', () => {
    expect(ControlIcons.close).toBeDefined();
    expect(ControlIcons.close).toContain('<svg');
    expect(ControlIcons.close).toContain('aria-hidden="true"');
    expect(ControlIcons.close).toContain('title="close button icon"');
  });

  it('should export close_large icon', () => {
    expect(ControlIcons.close_large).toBeDefined();
    expect(ControlIcons.close_large).toContain('<svg');
    expect(ControlIcons.close_large).toContain('aria-hidden="true"');
    expect(ControlIcons.close_large).toContain('title="X icon"');
  });

  it('should export pause icon', () => {
    expect(ControlIcons.pause).toBeDefined();
    expect(ControlIcons.pause).toContain('<svg');
    expect(ControlIcons.pause).toContain('aria-hidden="true"');
    expect(ControlIcons.pause).toContain('title="pause icon"');
  });

  it('should export play icon', () => {
    expect(ControlIcons.play).toBeDefined();
    expect(ControlIcons.play).toContain('<svg');
    expect(ControlIcons.play).toContain('aria-hidden="true"');
    expect(ControlIcons.play).toContain('title="play icon"');
  });

  it('should export fullscreen icon', () => {
    expect(ControlIcons.fullscreen).toBeDefined();
    expect(ControlIcons.fullscreen).toContain('<svg');
    expect(ControlIcons.fullscreen).toContain('aria-hidden="true"');
    expect(ControlIcons.fullscreen).toContain('title="full screen icon"');
  });

  it('should export print icon', () => {
    expect(ControlIcons.print).toBeDefined();
    expect(ControlIcons.print).toContain('<svg');
    expect(ControlIcons.print).toContain('aria-hidden="true"');
    expect(ControlIcons.print).toContain('title="printer icon"');
  });

  it('should export external_link icon', () => {
    expect(ControlIcons.external_link).toBeDefined();
    expect(ControlIcons.external_link).toContain('<svg');
    expect(ControlIcons.external_link).toContain('aria-hidden="true"');
    expect(ControlIcons.external_link).toContain('title="new window icon"');
  });

  it('should have aria-hidden on all icons', () => {
    const icons = Object.values(ControlIcons);
    icons.forEach(icon => {
      expect(icon).toContain('aria-hidden="true"');
    });
  });

  it('should have valid SVG markup for all icons', () => {
    const icons = Object.values(ControlIcons);
    icons.forEach(icon => {
      expect(icon).toMatch(/<svg[^>]*>.*<\/svg>/);
    });
  });
});

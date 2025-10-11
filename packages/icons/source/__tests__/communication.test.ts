import * as CommunicationIcons from '../communication';

describe('Communication Icons', () => {
  it('should export email icon', () => {
    expect(CommunicationIcons.email).toBeDefined();
    expect(CommunicationIcons.email).toContain('<svg');
    expect(CommunicationIcons.email).toContain('aria-hidden="true"');
    expect(CommunicationIcons.email).toContain('title="email icon"');
  });

  it('should export phone icon', () => {
    expect(CommunicationIcons.phone).toBeDefined();
    expect(CommunicationIcons.phone).toContain('<svg');
    expect(CommunicationIcons.phone).toContain('aria-hidden="true"');
    expect(CommunicationIcons.phone).toContain('title="phone icon"');
  });

  it('should have aria-hidden on all icons', () => {
    const icons = Object.values(CommunicationIcons);
    icons.forEach(icon => {
      expect(icon).toContain('aria-hidden="true"');
    });
  });

  it('should have valid SVG markup for all icons', () => {
    const icons = Object.values(CommunicationIcons);
    icons.forEach(icon => {
      expect(icon).toMatch(/<svg[^>]*>.*<\/svg>/);
    });
  });
});

import * as PeopleIcons from '../source/people';

describe('People Icons', () => {
  it('should export person icon', () => {
    expect(PeopleIcons.person).toBeDefined();
    expect(PeopleIcons.person).toContain('<svg');
    expect(PeopleIcons.person).toContain('aria-hidden="true"');
    expect(PeopleIcons.person).toContain('title="person icon"');
  });

  it('should have aria-hidden on all icons', () => {
    const icons = Object.values(PeopleIcons);
    icons.forEach(icon => {
      expect(icon).toContain('aria-hidden="true"');
    });
  });

  it('should have valid SVG markup for all icons', () => {
    const icons = Object.values(PeopleIcons);
    icons.forEach(icon => {
      expect(icon).toMatch(/<svg[^>]*>.*<\/svg>/);
    });
  });
});

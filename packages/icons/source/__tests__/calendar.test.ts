import * as CalendarIcons from '../calendar';

describe('Calendar Icons', () => {
  it('should export calendar icon', () => {
    expect(CalendarIcons.calendar).toBeDefined();
    expect(CalendarIcons.calendar).toContain('<svg');
    expect(CalendarIcons.calendar).toContain('aria-hidden="true"');
    expect(CalendarIcons.calendar).toContain('title="calendar icon"');
  });

  it('should export clock icon', () => {
    expect(CalendarIcons.clock).toBeDefined();
    expect(CalendarIcons.clock).toContain('<svg');
    expect(CalendarIcons.clock).toContain('aria-hidden="true"');
    expect(CalendarIcons.clock).toContain('title="clock icon"');
  });

  it('should export calendar_multi_day icon', () => {
    expect(CalendarIcons.calendar_multi_day).toBeDefined();
    expect(CalendarIcons.calendar_multi_day).toContain('<svg');
    expect(CalendarIcons.calendar_multi_day).toContain('aria-hidden="true"');
    expect(CalendarIcons.calendar_multi_day).toContain('title="multi day icon"');
  });

  it('should have aria-hidden on all icons', () => {
    const icons = Object.values(CalendarIcons);
    icons.forEach(icon => {
      expect(icon).toContain('aria-hidden="true"');
    });
  });

  it('should have valid SVG markup for all icons', () => {
    const icons = Object.values(CalendarIcons);
    icons.forEach(icon => {
      expect(icon).toMatch(/<svg[^>]*>.*<\/svg>/);
    });
  });
});

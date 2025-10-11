import * as Icons from '../index';

describe('Main Icons Export', () => {
  it('should export arrow icons', () => {
    expect(Icons.arrow_up).toBeDefined();
    expect(Icons.arrow_left).toBeDefined();
    expect(Icons.arrow_right).toBeDefined();
    expect(Icons.arrow_long).toBeDefined();
  });

  it('should export control icons', () => {
    expect(Icons.chevron_down).toBeDefined();
    expect(Icons.close).toBeDefined();
    expect(Icons.close_large).toBeDefined();
    expect(Icons.pause).toBeDefined();
    expect(Icons.play).toBeDefined();
    expect(Icons.fullscreen).toBeDefined();
    expect(Icons.print).toBeDefined();
    expect(Icons.external_link).toBeDefined();
  });

  it('should export indicator icons', () => {
    expect(Icons.alert).toBeDefined();
    expect(Icons.warning).toBeDefined();
  });

  it('should export calendar icons', () => {
    expect(Icons.calendar).toBeDefined();
    expect(Icons.clock).toBeDefined();
    expect(Icons.calendar_multi_day).toBeDefined();
  });

  it('should export file icons', () => {
    expect(Icons.document).toBeDefined();
  });

  it('should export search icons', () => {
    expect(Icons.search).toBeDefined();
  });

  it('should export media icons', () => {
    expect(Icons.gif).toBeDefined();
  });

  it('should export brand icons', () => {
    expect(Icons.fearless).toBeDefined();
    expect(Icons.quote).toBeDefined();
  });

  it('should export people icons', () => {
    expect(Icons.person).toBeDefined();
  });

  it('should export location icons', () => {
    expect(Icons.pin).toBeDefined();
  });

  it('should export communication icons', () => {
    expect(Icons.email).toBeDefined();
    expect(Icons.phone).toBeDefined();
  });

  it('should export social icons', () => {
    expect(Icons.facebook).toBeDefined();
    expect(Icons.x).toBeDefined();
    expect(Icons.twitter).toBeDefined();
    expect(Icons.instagram).toBeDefined();
    expect(Icons.youtube).toBeDefined();
    expect(Icons.linkedin).toBeDefined();
    expect(Icons.threads).toBeDefined();
  });

  it('should have aria-hidden on all string icon exports', () => {
    const iconValues = Object.values(Icons).filter(
      (value) => typeof value === 'string'
    );

    iconValues.forEach((icon) => {
      expect(icon).toContain('aria-hidden="true"');
    });
  });

  it('should have valid SVG markup for all string icon exports', () => {
    const iconValues = Object.values(Icons).filter(
      (value) => typeof value === 'string'
    );

    iconValues.forEach((icon) => {
      expect(icon).toMatch(/<svg[^>]*>.*<\/svg>/);
    });
  });
});

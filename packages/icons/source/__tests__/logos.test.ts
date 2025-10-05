import * as Logos from '../logos';

describe('Logo Assets', () => {
  it('should export DARK_LOGO', () => {
    expect(Logos.DARK_LOGO).toBeDefined();
    expect(Logos.DARK_LOGO).toContain('<svg');
    expect(Logos.DARK_LOGO).toContain('umd logo');
  });

  it('should export LIGHT_LOGO', () => {
    expect(Logos.LIGHT_LOGO).toBeDefined();
    expect(Logos.LIGHT_LOGO).toContain('<svg');
    expect(Logos.LIGHT_LOGO).toContain('umd logo');
  });

  it('should have aria-hidden on all logos', () => {
    const logos = Object.values(Logos);
    logos.forEach(logo => {
      expect(logo).toContain('aria-hidden="true"');
    });
  });
});

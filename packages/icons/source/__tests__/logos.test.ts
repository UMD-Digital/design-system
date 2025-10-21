import * as Logos from '../logos';

describe('Logo Assets', () => {
  it('should export campaign namespace', () => {
    expect(Logos.campaign).toBeDefined();
    expect(typeof Logos.campaign).toBe('object');
  });

  it('should export seal namespace', () => {
    expect(Logos.seal).toBeDefined();
    expect(typeof Logos.seal).toBe('object');
  });

  it('should export umd namespace', () => {
    expect(Logos.umd).toBeDefined();
    expect(typeof Logos.umd).toBe('object');
  });

  it('should have valid dark logo in umd namespace', () => {
    expect(Logos.umd.dark).toBeDefined();
    expect(Logos.umd.dark).toContain('<svg');
    expect(Logos.umd.dark).toContain('aria-hidden="true"');
    expect(Logos.umd.dark).toContain('title="umd logo"');
  });

  it('should have valid light logo in umd namespace', () => {
    expect(Logos.umd.light).toBeDefined();
    expect(Logos.umd.light).toContain('<svg');
    expect(Logos.umd.light).toContain('aria-hidden="true"');
    expect(Logos.umd.light).toContain('title="umd logo"');
  });

  it('should export forward namespace', () => {
    expect(Logos.forward).toBeDefined();
    expect(typeof Logos.forward).toBe('object');
  });

  it('should have valid dark logo in forward namespace', () => {
    expect(Logos.forward.dark).toBeDefined();
    expect(Logos.forward.dark).toContain('<svg');
    expect(Logos.forward.dark).toContain('aria-hidden="true"');
    expect(Logos.forward.dark).toContain('title="umd forward logo"');
  });

  it('should have valid light logo in forward namespace', () => {
    expect(Logos.forward.light).toBeDefined();
    expect(Logos.forward.light).toContain('<svg');
    expect(Logos.forward.light).toContain('aria-hidden="true"');
    expect(Logos.forward.light).toContain('title="umd forward logo"');
  });
});

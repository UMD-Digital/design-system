import {
  isTheme,
  isDisplay,
  isLayout,
  isVisual,
  includesFeature,
  getValue,
} from '../../source/attributes/checks';

describe('Deprecation warnings dev-gating', () => {
  let warnSpy: jest.SpyInstance;

  beforeEach(() => {
    warnSpy = jest.spyOn(console, 'warn').mockImplementation();
  });

  afterEach(() => {
    warnSpy.mockRestore();
    delete (window as any).__UMD_DEV__;
  });

  it('fires deprecation warning in dev mode', () => {
    (window as any).__UMD_DEV__ = true;

    const element = document.createElement('div');
    element.setAttribute('theme', 'dark');

    isTheme.dark({ element });

    expect(warnSpy).toHaveBeenCalled();
    const message = warnSpy.mock.calls[0].join(' ');
    expect(message).toContain('theme');
    expect(message).toContain('deprecated');
  });

  it('suppresses deprecation warning in production', () => {
    delete (window as any).__UMD_DEV__;

    const element = document.createElement('div');
    element.setAttribute('theme', 'dark');

    isTheme.dark({ element });

    expect(warnSpy).not.toHaveBeenCalled();
  });

  it('includes old and new attribute names in warning', () => {
    (window as any).__UMD_DEV__ = true;

    const element = document.createElement('div');
    element.setAttribute('theme', 'dark');

    isTheme.dark({ element });

    expect(warnSpy).toHaveBeenCalled();
    const message = warnSpy.mock.calls[0].join(' ');
    expect(message).toContain('theme');
    expect(message).toContain('data-theme');
  });

  it('includes element nodeName in warning', () => {
    (window as any).__UMD_DEV__ = true;

    const element = document.createElement('div');
    element.setAttribute('theme', 'dark');

    isTheme.dark({ element });

    expect(warnSpy).toHaveBeenCalled();
    const message = warnSpy.mock.calls[0].join(' ');
    expect(message).toContain('DIV');
  });

  it('fires deprecation warning for getValue with deprecated name in dev mode', () => {
    (window as any).__UMD_DEV__ = true;

    const element = document.createElement('div');
    element.setAttribute('days-to-hide', '5');

    getValue.daysToHide({ element });

    expect(warnSpy).toHaveBeenCalled();
    const message = warnSpy.mock.calls[0].join(' ');
    expect(message).toContain('days-to-hide');
    expect(message).toContain('deprecated');
  });

  it('suppresses getValue deprecation warning in production', () => {
    delete (window as any).__UMD_DEV__;

    const element = document.createElement('div');
    element.setAttribute('days-to-hide', '5');

    getValue.daysToHide({ element });

    expect(warnSpy).not.toHaveBeenCalled();
  });

  // ─── isDisplay.featured (deprecated "type" → "data-display") ─────

  it('isDisplay.featured fires deprecation warning in dev mode', () => {
    (window as any).__UMD_DEV__ = true;

    const element = document.createElement('div');
    element.setAttribute('type', 'featured');

    isDisplay.featured({ element });

    expect(warnSpy).toHaveBeenCalled();
    const message = warnSpy.mock.calls[0].join(' ');
    expect(message).toContain('type');
    expect(message).toContain('deprecated');
  });

  it('isDisplay.featured suppresses warning in production', () => {
    delete (window as any).__UMD_DEV__;

    const element = document.createElement('div');
    element.setAttribute('type', 'featured');

    isDisplay.featured({ element });

    expect(warnSpy).not.toHaveBeenCalled();
  });

  // ─── isLayout.fixed (deprecated "fixed" → "data-layout-fixed") ───

  it('isLayout.fixed fires deprecation warning in dev mode', () => {
    (window as any).__UMD_DEV__ = true;

    const element = document.createElement('div');
    element.setAttribute('fixed', '');

    isLayout.fixed({ element });

    expect(warnSpy).toHaveBeenCalled();
    const message = warnSpy.mock.calls[0].join(' ');
    expect(message).toContain('fixed');
    expect(message).toContain('deprecated');
  });

  it('isLayout.fixed suppresses warning in production', () => {
    delete (window as any).__UMD_DEV__;

    const element = document.createElement('div');
    element.setAttribute('fixed', '');

    isLayout.fixed({ element });

    expect(warnSpy).not.toHaveBeenCalled();
  });

  // ─── includesFeature.lazyLoad (deprecated "lazyload" → "data-lazy-load") ─

  it('includesFeature.lazyLoad fires deprecation warning in dev mode', () => {
    (window as any).__UMD_DEV__ = true;

    const element = document.createElement('div');
    element.setAttribute('lazyload', 'true');

    includesFeature.lazyLoad({ element });

    expect(warnSpy).toHaveBeenCalled();
    const message = warnSpy.mock.calls[0].join(' ');
    expect(message).toContain('lazyload');
    expect(message).toContain('deprecated');
  });

  it('includesFeature.lazyLoad suppresses warning in production', () => {
    delete (window as any).__UMD_DEV__;

    const element = document.createElement('div');
    element.setAttribute('lazyload', 'true');

    includesFeature.lazyLoad({ element });

    expect(warnSpy).not.toHaveBeenCalled();
  });

  // ─── isVisual.bordered (deprecated "border" → "data-visual-bordered") ─

  it('isVisual.bordered fires deprecation warning in dev mode', () => {
    (window as any).__UMD_DEV__ = true;

    const element = document.createElement('div');
    element.setAttribute('border', 'true');

    isVisual.bordered({ element });

    expect(warnSpy).toHaveBeenCalled();
    const message = warnSpy.mock.calls[0].join(' ');
    expect(message).toContain('border');
    expect(message).toContain('deprecated');
  });

  it('isVisual.bordered suppresses warning in production', () => {
    delete (window as any).__UMD_DEV__;

    const element = document.createElement('div');
    element.setAttribute('border', 'true');

    isVisual.bordered({ element });

    expect(warnSpy).not.toHaveBeenCalled();
  });
});

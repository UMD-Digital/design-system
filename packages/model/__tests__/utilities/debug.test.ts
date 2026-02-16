import { isDev, createLogger, withLifecycleDebug } from '../../source/utilities/debug';

describe('isDev', () => {
  const originalUmdDev = window.__UMD_DEV__;
  const originalNodeEnv = process.env.NODE_ENV;

  afterEach(() => {
    window.__UMD_DEV__ = originalUmdDev;
    process.env.NODE_ENV = originalNodeEnv;
  });

  it('returns false by default', () => {
    delete window.__UMD_DEV__;
    process.env.NODE_ENV = 'test';
    expect(isDev()).toBe(false);
  });

  it('returns true when window.__UMD_DEV__ is true', () => {
    window.__UMD_DEV__ = true;
    process.env.NODE_ENV = 'test';
    expect(isDev()).toBe(true);
  });

  it('returns false for truthy-but-not-boolean values', () => {
    (window as any).__UMD_DEV__ = 1;
    process.env.NODE_ENV = 'test';
    expect(isDev()).toBe(false);
  });

  it('returns false for string "true"', () => {
    (window as any).__UMD_DEV__ = 'true';
    process.env.NODE_ENV = 'test';
    expect(isDev()).toBe(false);
  });

  it('returns true when process.env.NODE_ENV is "development"', () => {
    delete window.__UMD_DEV__;
    process.env.NODE_ENV = 'development';
    expect(isDev()).toBe(true);
  });

  it('returns false when process.env.NODE_ENV is "production"', () => {
    delete window.__UMD_DEV__;
    process.env.NODE_ENV = 'production';
    expect(isDev()).toBe(false);
  });

  it('window flag takes precedence over process.env', () => {
    window.__UMD_DEV__ = true;
    process.env.NODE_ENV = 'production';
    expect(isDev()).toBe(true);
  });

  it('returns false when window.__UMD_DEV__ is false and NODE_ENV is not development', () => {
    window.__UMD_DEV__ = false;
    process.env.NODE_ENV = 'production';
    expect(isDev()).toBe(false);
  });
});

describe('createLogger', () => {
  const originalUmdDev = window.__UMD_DEV__;
  const originalNodeEnv = process.env.NODE_ENV;

  afterEach(() => {
    window.__UMD_DEV__ = originalUmdDev;
    process.env.NODE_ENV = originalNodeEnv;
    jest.restoreAllMocks();
  });

  it('returns an object with all 6 methods', () => {
    const logger = createLogger('test');
    expect(typeof logger.debug).toBe('function');
    expect(typeof logger.info).toBe('function');
    expect(typeof logger.warn).toBe('function');
    expect(typeof logger.error).toBe('function');
    expect(typeof logger.group).toBe('function');
    expect(typeof logger.groupEnd).toBe('function');
  });

  it('warn always logs with prefix', () => {
    delete window.__UMD_DEV__;
    process.env.NODE_ENV = 'production';
    const spy = jest.spyOn(console, 'warn').mockImplementation();
    const logger = createLogger('my-comp');

    logger.warn('something');
    expect(spy).toHaveBeenCalledWith('[UMD-DS:my-comp]', 'something');
  });

  it('error always logs with prefix', () => {
    delete window.__UMD_DEV__;
    process.env.NODE_ENV = 'production';
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const logger = createLogger('my-comp');

    logger.error('bad');
    expect(spy).toHaveBeenCalledWith('[UMD-DS:my-comp]', 'bad');
  });

  it('debug is suppressed when isDev() is false', () => {
    delete window.__UMD_DEV__;
    process.env.NODE_ENV = 'production';
    const spy = jest.spyOn(console, 'debug').mockImplementation();
    const logger = createLogger('comp');

    logger.debug('msg');
    expect(spy).not.toHaveBeenCalled();
  });

  it('debug logs with prefix when isDev() is true', () => {
    window.__UMD_DEV__ = true;
    const spy = jest.spyOn(console, 'debug').mockImplementation();
    const logger = createLogger('comp');

    logger.debug('msg');
    expect(spy).toHaveBeenCalledWith('[UMD-DS:comp]', 'msg');
  });

  it('info is suppressed when isDev() is false', () => {
    delete window.__UMD_DEV__;
    process.env.NODE_ENV = 'production';
    const spy = jest.spyOn(console, 'info').mockImplementation();
    const logger = createLogger('comp');

    logger.info('msg');
    expect(spy).not.toHaveBeenCalled();
  });

  it('info logs with prefix when isDev() is true', () => {
    window.__UMD_DEV__ = true;
    const spy = jest.spyOn(console, 'info').mockImplementation();
    const logger = createLogger('comp');

    logger.info('msg');
    expect(spy).toHaveBeenCalledWith('[UMD-DS:comp]', 'msg');
  });

  it('group/groupEnd are gated by isDev()', () => {
    delete window.__UMD_DEV__;
    process.env.NODE_ENV = 'production';
    const groupSpy = jest.spyOn(console, 'group').mockImplementation();
    const groupEndSpy = jest.spyOn(console, 'groupEnd').mockImplementation();
    const logger = createLogger('comp');

    logger.group('section');
    logger.groupEnd();
    expect(groupSpy).not.toHaveBeenCalled();
    expect(groupEndSpy).not.toHaveBeenCalled();
  });

  it('group/groupEnd log when isDev() is true', () => {
    window.__UMD_DEV__ = true;
    const groupSpy = jest.spyOn(console, 'group').mockImplementation();
    const groupEndSpy = jest.spyOn(console, 'groupEnd').mockImplementation();
    const logger = createLogger('comp');

    logger.group('section');
    logger.groupEnd();
    expect(groupSpy).toHaveBeenCalledWith('[UMD-DS:comp]', 'section');
    expect(groupEndSpy).toHaveBeenCalled();
  });

  it('passes all arguments through after prefix', () => {
    window.__UMD_DEV__ = true;
    const spy = jest.spyOn(console, 'debug').mockImplementation();
    const logger = createLogger('comp');

    logger.debug('a', 'b', { c: 3 });
    expect(spy).toHaveBeenCalledWith('[UMD-DS:comp]', 'a', 'b', { c: 3 });
  });
});

describe('withLifecycleDebug', () => {
  const originalUmdDev = window.__UMD_DEV__;
  const originalNodeEnv = process.env.NODE_ENV;

  afterEach(() => {
    window.__UMD_DEV__ = originalUmdDev;
    process.env.NODE_ENV = originalNodeEnv;
    jest.restoreAllMocks();
  });

  function createBase(overrides: Record<string, jest.Mock> = {}) {
    const Base = class {
      tagName = 'TEST-ELEMENT';
    } as any;

    if (overrides.connectedCallback) {
      Base.prototype.connectedCallback = overrides.connectedCallback;
    }
    if (overrides.disconnectedCallback) {
      Base.prototype.disconnectedCallback = overrides.disconnectedCallback;
    }
    if (overrides.attributeChangedCallback) {
      Base.prototype.attributeChangedCallback = overrides.attributeChangedCallback;
    }

    return Base;
  }

  it('returns a class extending the base', () => {
    const Base = createBase();
    const Enhanced = withLifecycleDebug(Base);
    const instance = new Enhanced();
    expect(instance instanceof Base).toBe(true);
  });

  it('connectedCallback logs and delegates to super', () => {
    window.__UMD_DEV__ = true;
    const superConnected = jest.fn();
    const Base = createBase({ connectedCallback: superConnected });
    const Enhanced = withLifecycleDebug(Base);
    const instance = new Enhanced();

    const spy = jest.spyOn(console, 'debug').mockImplementation();
    instance.connectedCallback();

    expect(spy).toHaveBeenCalledWith('[UMD-DS:test-element]', 'connectedCallback');
    expect(superConnected).toHaveBeenCalled();
  });

  it('disconnectedCallback logs and delegates to super', () => {
    window.__UMD_DEV__ = true;
    const superDisconnected = jest.fn();
    const Base = createBase({ disconnectedCallback: superDisconnected });
    const Enhanced = withLifecycleDebug(Base);
    const instance = new Enhanced();

    const spy = jest.spyOn(console, 'debug').mockImplementation();
    instance.disconnectedCallback();

    expect(spy).toHaveBeenCalledWith('[UMD-DS:test-element]', 'disconnectedCallback');
    expect(superDisconnected).toHaveBeenCalled();
  });

  it('attributeChangedCallback logs name/oldValue/newValue and delegates', () => {
    window.__UMD_DEV__ = true;
    const superAttr = jest.fn();
    const Base = createBase({ attributeChangedCallback: superAttr });
    const Enhanced = withLifecycleDebug(Base);
    const instance = new Enhanced();

    const spy = jest.spyOn(console, 'debug').mockImplementation();
    instance.attributeChangedCallback('theme', 'light', 'dark');

    expect(spy).toHaveBeenCalledWith(
      '[UMD-DS:test-element]',
      'attributeChangedCallback',
      { name: 'theme', oldValue: 'light', newValue: 'dark' },
    );
    expect(superAttr).toHaveBeenCalledWith('theme', 'light', 'dark');
  });

  it('does not throw if super lacks lifecycle methods', () => {
    window.__UMD_DEV__ = true;
    const Base = class { tagName = 'BARE-ELEMENT'; } as any;
    const Enhanced = withLifecycleDebug(Base);
    const instance = new Enhanced();

    jest.spyOn(console, 'debug').mockImplementation();
    expect(() => instance.connectedCallback()).not.toThrow();
    expect(() => instance.disconnectedCallback()).not.toThrow();
    expect(() => instance.attributeChangedCallback('x', null, 'y')).not.toThrow();
  });

  it('debug logging is suppressed in production mode', () => {
    delete window.__UMD_DEV__;
    process.env.NODE_ENV = 'production';
    const superConnected = jest.fn();
    const Base = createBase({ connectedCallback: superConnected });
    const Enhanced = withLifecycleDebug(Base);
    const instance = new Enhanced();

    const spy = jest.spyOn(console, 'debug').mockImplementation();
    instance.connectedCallback();

    expect(spy).not.toHaveBeenCalled();
    expect(superConnected).toHaveBeenCalled();
  });
});

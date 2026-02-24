import {
  AttributeTypeError,
  AttributeValidationError,
  devWarning,
  reportAttributeErrors,
} from '../../source/attributes/errors';

describe('AttributeTypeError', () => {
  it('is an instance of TypeError', () => {
    const err = new AttributeTypeError('count', 'number', 'abc');
    expect(err).toBeInstanceOf(TypeError);
    expect(err).toBeInstanceOf(AttributeTypeError);
  });

  it('has correct name property', () => {
    const err = new AttributeTypeError('count', 'number', 'abc');
    expect(err.name).toBe('AttributeTypeError');
  });

  it('stores attributeName, expectedType, and actualValue', () => {
    const err = new AttributeTypeError('size', 'number', 'big');
    expect(err.attributeName).toBe('size');
    expect(err.expectedType).toBe('number');
    expect(err.actualValue).toBe('big');
  });

  it('generates descriptive message', () => {
    const err = new AttributeTypeError('count', 'number', 'abc');
    expect(err.message).toContain('count');
    expect(err.message).toContain('number');
    expect(err.message).toContain('abc');
  });

  it('handles null actualValue', () => {
    const err = new AttributeTypeError('data', 'object', null);
    expect(err.actualValue).toBeNull();
    expect(err.message).toContain('null');
  });

  it('prefixes message with componentName when provided', () => {
    const err = new AttributeTypeError('count', 'number', 'abc', 'umd-card');
    expect(err.message).toMatch(/^\[umd-card\]/);
    expect(err.componentName).toBe('umd-card');
  });

  it('stores componentName as readonly property', () => {
    const err = new AttributeTypeError('count', 'number', 'abc', 'umd-card');
    expect(err.componentName).toBe('umd-card');
  });

  it('works without componentName (backwards compat)', () => {
    const err = new AttributeTypeError('count', 'number', 'abc');
    expect(err.componentName).toBeUndefined();
    expect(err.message).not.toContain('[');
  });
});

describe('AttributeValidationError', () => {
  it('is an instance of Error', () => {
    const err = new AttributeValidationError('theme', 'must be light or dark');
    expect(err).toBeInstanceOf(Error);
    expect(err).toBeInstanceOf(AttributeValidationError);
  });

  it('has correct name property', () => {
    const err = new AttributeValidationError('theme', 'must be light or dark');
    expect(err.name).toBe('AttributeValidationError');
  });

  it('stores attributeName and constraint', () => {
    const err = new AttributeValidationError('theme', 'must be light or dark');
    expect(err.attributeName).toBe('theme');
    expect(err.constraint).toBe('must be light or dark');
  });

  it('generates descriptive message', () => {
    const err = new AttributeValidationError('count', 'must be positive');
    expect(err.message).toContain('count');
    expect(err.message).toContain('must be positive');
  });

  it('prefixes message with componentName when provided', () => {
    const err = new AttributeValidationError('theme', 'invalid', 'umd-hero');
    expect(err.message).toMatch(/^\[umd-hero\]/);
    expect(err.componentName).toBe('umd-hero');
  });

  it('stores componentName as readonly property', () => {
    const err = new AttributeValidationError('theme', 'invalid', 'umd-hero');
    expect(err.componentName).toBe('umd-hero');
  });

  it('works without componentName (backwards compat)', () => {
    const err = new AttributeValidationError('theme', 'invalid');
    expect(err.componentName).toBeUndefined();
    expect(err.message).not.toContain('[');
  });
});

describe('devWarning', () => {
  let warnSpy: jest.SpyInstance;

  beforeEach(() => {
    warnSpy = jest.spyOn(console, 'warn').mockImplementation();
  });

  afterEach(() => {
    warnSpy.mockRestore();
    delete (window as any).__UMD_DEV__;
  });

  it('fires in dev mode', () => {
    (window as any).__UMD_DEV__ = true;
    devWarning('test message');
    expect(warnSpy).toHaveBeenCalledWith('[UMD-DS]', 'test message');
  });

  it('is suppressed in production', () => {
    delete (window as any).__UMD_DEV__;
    devWarning('test message');
    expect(warnSpy).not.toHaveBeenCalled();
  });

  it('includes [UMD-DS] prefix', () => {
    (window as any).__UMD_DEV__ = true;
    devWarning('some warning');
    expect(warnSpy).toHaveBeenCalledWith('[UMD-DS]', 'some warning');
  });
});

describe('reportAttributeErrors', () => {
  let errorSpy: jest.SpyInstance;
  let groupSpy: jest.SpyInstance;
  let groupEndSpy: jest.SpyInstance;

  beforeEach(() => {
    errorSpy = jest.spyOn(console, 'error').mockImplementation();
    groupSpy = jest.spyOn(console, 'group').mockImplementation();
    groupEndSpy = jest.spyOn(console, 'groupEnd').mockImplementation();
  });

  afterEach(() => {
    errorSpy.mockRestore();
    groupSpy.mockRestore();
    groupEndSpy.mockRestore();
  });

  it('does nothing for empty array', () => {
    reportAttributeErrors('umd-card', []);
    expect(errorSpy).not.toHaveBeenCalled();
    expect(groupSpy).not.toHaveBeenCalled();
  });

  it('logs single error without grouping', () => {
    const err = new Error('bad value');
    reportAttributeErrors('umd-card', [err]);
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining('umd-card'),
      'bad value',
    );
    expect(groupSpy).not.toHaveBeenCalled();
  });

  it('groups multiple errors', () => {
    (window as any).__UMD_DEV__ = true;
    try {
      const errors = [new Error('err1'), new Error('err2')];
      reportAttributeErrors('umd-card', errors);
      expect(groupSpy).toHaveBeenCalledWith(
        expect.stringContaining('umd-card'),
        '2 attribute errors',
      );
      expect(errorSpy).toHaveBeenCalledTimes(2);
      expect(groupEndSpy).toHaveBeenCalled();
    } finally {
      delete (window as any).__UMD_DEV__;
    }
  });

  it('includes component name in prefix', () => {
    const err = new Error('test');
    reportAttributeErrors('umd-hero', [err]);
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining('umd-hero'),
      'test',
    );
  });
});

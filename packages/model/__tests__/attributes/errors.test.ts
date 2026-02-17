import {
  AttributeTypeError,
  AttributeValidationError,
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
});

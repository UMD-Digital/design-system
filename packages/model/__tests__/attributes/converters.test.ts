import {
  Converters,
  resolveConverter,
  type AttributeConverter,
} from '../../source/attributes/converters';
import { AttributeTypeError } from '../../source/attributes/errors';

describe('Converters.string', () => {
  const c = Converters.string;

  it('returns the string value', () => {
    expect(c.fromAttribute('hello', 'test')).toBe('hello');
  });

  it('returns undefined for null', () => {
    expect(c.fromAttribute(null, 'test')).toBeUndefined();
  });

  it('returns empty string as-is', () => {
    expect(c.fromAttribute('', 'test')).toBe('');
  });

  it('toAttribute returns the string', () => {
    expect(c.toAttribute('world')).toBe('world');
  });
});

describe('Converters.number', () => {
  const c = Converters.number;

  it('converts valid integer string', () => {
    expect(c.fromAttribute('42', 'count')).toBe(42);
  });

  it('converts valid float string', () => {
    expect(c.fromAttribute('3.14', 'ratio')).toBe(3.14);
  });

  it('converts negative numbers', () => {
    expect(c.fromAttribute('-10', 'offset')).toBe(-10);
  });

  it('returns undefined for null', () => {
    expect(c.fromAttribute(null, 'count')).toBeUndefined();
  });

  it('throws AttributeTypeError for non-numeric string', () => {
    expect(() => c.fromAttribute('abc', 'count')).toThrow(AttributeTypeError);
  });

  it('throws for empty string (NaN)', () => {
    expect(() => c.fromAttribute('', 'count')).toThrow(AttributeTypeError);
  });

  it('toAttribute returns string representation', () => {
    expect(c.toAttribute(42)).toBe('42');
  });
});

describe('Converters.boolean', () => {
  const c = Converters.boolean;

  it('presence (empty string) returns true', () => {
    expect(c.fromAttribute('', 'open')).toBe(true);
  });

  it('"true" returns true', () => {
    expect(c.fromAttribute('true', 'open')).toBe(true);
  });

  it('"false" returns false', () => {
    expect(c.fromAttribute('false', 'open')).toBe(false);
  });

  it('any other string returns true (HTML convention)', () => {
    expect(c.fromAttribute('yes', 'open')).toBe(true);
  });

  it('returns undefined for null (absent)', () => {
    expect(c.fromAttribute(null, 'open')).toBeUndefined();
  });

  it('toAttribute returns empty string for true', () => {
    expect(c.toAttribute(true)).toBe('');
  });

  it('toAttribute returns null for false (remove attribute)', () => {
    expect(c.toAttribute(false)).toBeNull();
  });
});

describe('Converters.object', () => {
  const c = Converters.object;

  it('parses valid JSON object', () => {
    expect(c.fromAttribute('{"a":1}', 'data')).toEqual({ a: 1 });
  });

  it('parses valid JSON array', () => {
    expect(c.fromAttribute('[1,2,3]', 'items')).toEqual([1, 2, 3]);
  });

  it('returns undefined for null', () => {
    expect(c.fromAttribute(null, 'data')).toBeUndefined();
  });

  it('throws AttributeTypeError for invalid JSON', () => {
    expect(() => c.fromAttribute('{bad}', 'data')).toThrow(AttributeTypeError);
  });

  it('toAttribute returns JSON string', () => {
    expect(c.toAttribute({ x: 1 })).toBe('{"x":1}');
  });

  it('toAttribute handles arrays', () => {
    expect(c.toAttribute([1, 2])).toBe('[1,2]');
  });
});

describe('Converters.array', () => {
  const c = Converters.array;

  it('parses valid JSON array', () => {
    expect(c.fromAttribute('[1,2,3]', 'items')).toEqual([1, 2, 3]);
  });

  it('parses empty JSON array', () => {
    expect(c.fromAttribute('[]', 'items')).toEqual([]);
  });

  it('parses array of strings', () => {
    expect(c.fromAttribute('["a","b"]', 'tags')).toEqual(['a', 'b']);
  });

  it('returns undefined for null', () => {
    expect(c.fromAttribute(null, 'items')).toBeUndefined();
  });

  it('throws AttributeTypeError for non-array JSON (object)', () => {
    expect(() => c.fromAttribute('{"a":1}', 'items')).toThrow(
      AttributeTypeError,
    );
  });

  it('throws AttributeTypeError for non-array JSON (string)', () => {
    expect(() => c.fromAttribute('"hello"', 'items')).toThrow(
      AttributeTypeError,
    );
  });

  it('throws AttributeTypeError for non-array JSON (number)', () => {
    expect(() => c.fromAttribute('42', 'items')).toThrow(AttributeTypeError);
  });

  it('throws AttributeTypeError for invalid JSON', () => {
    expect(() => c.fromAttribute('{bad}', 'items')).toThrow(
      AttributeTypeError,
    );
  });

  it('toAttribute returns JSON string', () => {
    expect(c.toAttribute([1, 2])).toBe('[1,2]');
  });

  it('toAttribute handles empty array', () => {
    expect(c.toAttribute([])).toBe('[]');
  });
});

describe('resolveConverter', () => {
  it('resolves "string" to string converter', () => {
    const c = resolveConverter('string');
    expect(c.fromAttribute('hi', 'test')).toBe('hi');
  });

  it('resolves "number" to number converter', () => {
    const c = resolveConverter('number');
    expect(c.fromAttribute('5', 'test')).toBe(5);
  });

  it('resolves "boolean" to boolean converter', () => {
    const c = resolveConverter('boolean');
    expect(c.fromAttribute('', 'test')).toBe(true);
  });

  it('resolves "object" to object converter', () => {
    const c = resolveConverter('object');
    expect(c.fromAttribute('{}', 'test')).toEqual({});
  });

  it('resolves "array" to array converter', () => {
    const c = resolveConverter('array');
    expect(c.fromAttribute('[1]', 'test')).toEqual([1]);
  });

  it('passes through a custom converter as-is', () => {
    const custom: AttributeConverter<number> = {
      fromAttribute: (v) => (v ? v.length : undefined),
      toAttribute: (v) => String(v),
    };
    const resolved = resolveConverter(custom);
    expect(resolved).toBe(custom);
  });
});

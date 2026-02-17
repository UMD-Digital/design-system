import {
  defaultEquality,
  jsonEquality,
  ChangeDetector,
} from '../../source/attributes/change-detection';

describe('defaultEquality', () => {
  it('returns true for identical primitives', () => {
    expect(defaultEquality(1, 1)).toBe(true);
    expect(defaultEquality('a', 'a')).toBe(true);
    expect(defaultEquality(true, true)).toBe(true);
  });

  it('returns false for different values', () => {
    expect(defaultEquality(1, 2)).toBe(false);
    expect(defaultEquality('a', 'b')).toBe(false);
  });

  it('handles NaN correctly (NaN === NaN)', () => {
    expect(defaultEquality(NaN, NaN)).toBe(true);
  });

  it('distinguishes +0 and -0', () => {
    expect(defaultEquality(0, -0)).toBe(false);
  });

  it('returns false for structurally equal objects', () => {
    expect(defaultEquality({ a: 1 }, { a: 1 })).toBe(false);
  });

  it('returns true for same object reference', () => {
    const obj = { a: 1 };
    expect(defaultEquality(obj, obj)).toBe(true);
  });
});

describe('jsonEquality', () => {
  it('returns true for structurally equal objects', () => {
    expect(jsonEquality({ a: 1 }, { a: 1 })).toBe(true);
  });

  it('returns true for equal arrays', () => {
    expect(jsonEquality([1, 2, 3], [1, 2, 3])).toBe(true);
  });

  it('returns false for different objects', () => {
    expect(jsonEquality({ a: 1 }, { a: 2 })).toBe(false);
  });

  it('returns true for identical primitives', () => {
    expect(jsonEquality(42, 42)).toBe(true);
    expect(jsonEquality('hi', 'hi')).toBe(true);
  });

  it('returns false for different primitives', () => {
    expect(jsonEquality(1, 2)).toBe(false);
  });
});

describe('ChangeDetector', () => {
  it('returns true on first set', () => {
    const cd = new ChangeDetector();
    expect(cd.set('a', 1)).toBe(true);
  });

  it('returns false when setting the same value', () => {
    const cd = new ChangeDetector();
    cd.set('a', 1);
    expect(cd.set('a', 1)).toBe(false);
  });

  it('returns true when value changes', () => {
    const cd = new ChangeDetector();
    cd.set('a', 1);
    expect(cd.set('a', 2)).toBe(true);
  });

  it('get returns the stored value', () => {
    const cd = new ChangeDetector();
    cd.set('key', 'value');
    expect(cd.get('key')).toBe('value');
  });

  it('get returns undefined for unknown key', () => {
    const cd = new ChangeDetector();
    expect(cd.get('unknown')).toBeUndefined();
  });

  it('has returns true for set keys', () => {
    const cd = new ChangeDetector();
    cd.set('x', 1);
    expect(cd.has('x')).toBe(true);
  });

  it('has returns false for unset keys', () => {
    const cd = new ChangeDetector();
    expect(cd.has('x')).toBe(false);
  });

  it('reset clears all values', () => {
    const cd = new ChangeDetector();
    cd.set('a', 1);
    cd.set('b', 2);
    cd.reset();
    expect(cd.has('a')).toBe(false);
    expect(cd.has('b')).toBe(false);
  });

  it('after reset, set returns true again', () => {
    const cd = new ChangeDetector();
    cd.set('a', 1);
    cd.reset();
    expect(cd.set('a', 1)).toBe(true);
  });

  it('uses custom equality function', () => {
    const cd = new ChangeDetector(jsonEquality);
    cd.set('obj', { x: 1 });
    // Same structure — should be considered equal
    expect(cd.set('obj', { x: 1 })).toBe(false);
    // Different structure — should be considered changed
    expect(cd.set('obj', { x: 2 })).toBe(true);
  });

  it('handles NaN with default equality', () => {
    const cd = new ChangeDetector();
    cd.set('n', NaN);
    expect(cd.set('n', NaN)).toBe(false);
  });
});

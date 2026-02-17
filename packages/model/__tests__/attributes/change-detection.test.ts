import {
  defaultEquality,
  jsonEquality,
  ChangeDetector,
  ChangeDetectors,
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

  it('accepts per-call equality override', () => {
    const cd = new ChangeDetector();
    cd.set('a', { x: 1 });
    // Default Object.is would see a new ref as changed, but jsonEquality treats it as equal
    expect(cd.set('a', { x: 1 }, jsonEquality)).toBe(false);
    // Different structure — should still detect change
    expect(cd.set('a', { x: 2 }, jsonEquality)).toBe(true);
  });

  it('per-call override does not affect other keys', () => {
    const cd = new ChangeDetector();
    cd.set('a', { x: 1 });
    cd.set('b', { x: 1 });
    // Override only applies to this call
    cd.set('a', { x: 1 }, jsonEquality);
    // Key 'b' still uses default equality (Object.is) — new ref = changed
    expect(cd.set('b', { x: 1 })).toBe(true);
  });
});

describe('ChangeDetectors', () => {
  it('always returns true for same value', () => {
    expect(ChangeDetectors.always(1, 1)).toBe(true);
  });

  it('always returns true for different values', () => {
    expect(ChangeDetectors.always(1, 2)).toBe(true);
  });

  it('never returns false for different values', () => {
    expect(ChangeDetectors.never(1, 2)).toBe(false);
  });

  it('never returns false for same value', () => {
    expect(ChangeDetectors.never(1, 1)).toBe(false);
  });

  it('deep returns false for structurally equal objects', () => {
    expect(ChangeDetectors.deep({ a: 1 }, { a: 1 })).toBe(false);
  });

  it('deep returns true for different objects', () => {
    expect(ChangeDetectors.deep({ a: 1 }, { a: 2 })).toBe(true);
  });

  it('shallow returns false for shallow-equal objects', () => {
    const inner = { nested: true };
    expect(ChangeDetectors.shallow({ a: 1, b: inner }, { a: 1, b: inner })).toBe(false);
  });

  it('shallow returns true for different nested refs', () => {
    expect(ChangeDetectors.shallow({ a: { nested: true } }, { a: { nested: true } })).toBe(true);
  });

  it('shallow falls back to Object.is for primitives', () => {
    expect(ChangeDetectors.shallow(1, 1)).toBe(false);
    expect(ChangeDetectors.shallow(1, 2)).toBe(true);
  });

  it('shallow returns true when key counts differ', () => {
    expect(ChangeDetectors.shallow({ a: 1 }, { a: 1, b: 2 })).toBe(true);
  });

  it('shallow returns true for null vs object', () => {
    expect(ChangeDetectors.shallow(null, { a: 1 })).toBe(true);
    expect(ChangeDetectors.shallow({ a: 1 }, null)).toBe(true);
  });

  it('threshold returns false within epsilon', () => {
    expect(ChangeDetectors.threshold(0.5)(0.1, 0)).toBe(false);
  });

  it('threshold returns true beyond epsilon', () => {
    expect(ChangeDetectors.threshold(0.5)(0.6, 0)).toBe(true);
  });

  it('threshold returns false at exact epsilon boundary', () => {
    expect(ChangeDetectors.threshold(0.5)(0.5, 0)).toBe(false);
  });
});

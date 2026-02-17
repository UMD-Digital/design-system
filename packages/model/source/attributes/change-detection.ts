/**
 * Dirty-checking utilities for reactive attribute properties.
 *
 * Provides equality functions and a `ChangeDetector` class that
 * tracks per-property values and reports whether a set actually changed.
 */

/** Strict equality via `Object.is` — handles NaN correctly. */
export function defaultEquality(a: unknown, b: unknown): boolean {
  return Object.is(a, b);
}

/** Deep-ish equality via JSON serialisation. Suitable for plain objects/arrays. */
export function jsonEquality(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

export type EqualityFn = (a: unknown, b: unknown) => boolean;

export class ChangeDetector {
  private values = new Map<string, unknown>();
  private equalityFn: EqualityFn;

  constructor(equalityFn: EqualityFn = defaultEquality) {
    this.equalityFn = equalityFn;
  }

  /** Returns `true` if the value changed. */
  set(key: string, value: unknown, equalityFn?: EqualityFn): boolean {
    const prev = this.values.get(key);
    const eq = equalityFn ?? this.equalityFn;
    if (this.values.has(key) && eq(prev, value)) {
      return false;
    }
    this.values.set(key, value);
    return true;
  }

  get(key: string): unknown {
    return this.values.get(key);
  }

  has(key: string): boolean {
    return this.values.has(key);
  }

  reset(): void {
    this.values.clear();
  }
}

function shallowEqual(a: unknown, b: unknown): boolean {
  if (Object.is(a, b)) return true;
  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false;
  const keysA = Object.keys(a as object);
  const keysB = Object.keys(b as object);
  if (keysA.length !== keysB.length) return false;
  return keysA.every((key) =>
    Object.is((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key]),
  );
}

/**
 * Pre-built `hasChanged` functions for use with `ReactiveAttributeConfig.hasChanged`.
 * Each returns `true` when the value has changed and an update should fire.
 */
export const ChangeDetectors = {
  /** Always changed — update on every set. */
  always: (_newVal: unknown, _oldVal: unknown): boolean => true,

  /** Never changed — manual updates only. */
  never: (_newVal: unknown, _oldVal: unknown): boolean => false,

  /** Deep structural comparison via JSON serialization. */
  deep: (newVal: unknown, oldVal: unknown): boolean =>
    JSON.stringify(newVal) !== JSON.stringify(oldVal),

  /** Shallow object comparison — compares own enumerable properties by reference. */
  shallow: (newVal: unknown, oldVal: unknown): boolean =>
    !shallowEqual(newVal, oldVal),

  /** Number threshold — only changed if difference exceeds epsilon. */
  threshold:
    (epsilon: number) =>
    (newVal: unknown, oldVal: unknown): boolean =>
      Math.abs((newVal as number) - (oldVal as number)) > epsilon,
} as const;

export type HasChangedFn = (newValue: unknown, oldValue: unknown) => boolean;

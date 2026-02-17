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
  set(key: string, value: unknown): boolean {
    const prev = this.values.get(key);
    if (this.values.has(key) && this.equalityFn(prev, value)) {
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

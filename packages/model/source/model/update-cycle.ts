/**
 * Update Scheduler
 *
 * Batches multiple `schedule()` calls into a single microtask-based update.
 * Inspired by Lit's reactive update cycle.
 *
 * - Deduplicates: multiple `schedule()` calls before the microtask produce one update
 * - Re-entrant safe: if `performUpdate` triggers another `schedule()`, a new microtask is queued
 * - Max recursion guard (100 iterations) to prevent infinite loops
 */

const MAX_RECURSION = 100;

export class UpdateScheduler {
  private _pending = false;
  private _resolve: ((value: boolean) => void) | null = null;
  private _promise: Promise<boolean>;
  private _performUpdate: () => boolean;
  private _recursionCount = 0;

  constructor(performUpdate: () => boolean) {
    this._performUpdate = performUpdate;
    this._promise = Promise.resolve(true);
  }

  schedule(): void {
    if (this._pending) return;
    this._pending = true;

    this._promise = new Promise<boolean>((resolve) => {
      this._resolve = resolve;
      queueMicrotask(() => this._flush(resolve));
    });
  }

  private _flush(resolve: (value: boolean) => void): void {
    this._pending = false;
    this._recursionCount++;

    if (this._recursionCount > MAX_RECURSION) {
      this._recursionCount = 0;
      resolve(false);
      return;
    }

    const success = this._performUpdate();

    // If performUpdate triggered another schedule(), the new microtask
    // will handle it. Chain this resolve to the new promise.
    if (this._pending) {
      this._promise.then(resolve);
    } else {
      this._recursionCount = 0;
      resolve(success);
    }
  }

  get updateComplete(): Promise<boolean> {
    return this._promise;
  }
}

/**
 * Registration-specific error classes.
 *
 * - `ComponentRegistrationError` — thrown when a single component fails to register
 * - `BatchRegistrationError` — thrown when one or more components fail in a batch
 */

export type RegistrationFailureReason =
  | 'conflict'
  | 'invalid-name'
  | 'missing-constructor';

export class ComponentRegistrationError extends Error {
  readonly tagName: string;
  readonly reason: RegistrationFailureReason;
  readonly existingConstructor?: CustomElementConstructor;

  constructor(
    tagName: string,
    reason: RegistrationFailureReason,
    message: string,
    existingConstructor?: CustomElementConstructor,
  ) {
    super(`[${tagName}] ${message}`);
    this.name = 'ComponentRegistrationError';
    this.tagName = tagName;
    this.reason = reason;
    this.existingConstructor = existingConstructor;
  }
}

export class BatchRegistrationError extends Error {
  readonly errors: ComponentRegistrationError[];
  readonly succeeded: string[];

  constructor(
    errors: ComponentRegistrationError[],
    succeeded: string[],
  ) {
    const names = errors.map((e) => e.tagName).join(', ');
    super(`Batch registration failed for: ${names}`);
    this.name = 'BatchRegistrationError';
    this.errors = errors;
    this.succeeded = succeeded;
  }
}

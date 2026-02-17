/**
 * Custom error types for the reactive attribute system.
 *
 * - `AttributeTypeError` — thrown when type conversion fails
 * - `AttributeValidationError` — thrown when validation fails
 */

export class AttributeTypeError extends TypeError {
  readonly attributeName: string;
  readonly expectedType: string;
  readonly actualValue: string | null;

  constructor(
    attributeName: string,
    expectedType: string,
    actualValue: string | null,
  ) {
    super(
      `Attribute "${attributeName}" expected type "${expectedType}" but received "${actualValue}"`,
    );
    this.name = 'AttributeTypeError';
    this.attributeName = attributeName;
    this.expectedType = expectedType;
    this.actualValue = actualValue;
  }
}

export class AttributeValidationError extends Error {
  readonly attributeName: string;
  readonly constraint: string;

  constructor(attributeName: string, constraint: string) {
    super(
      `Attribute "${attributeName}" failed validation: ${constraint}`,
    );
    this.name = 'AttributeValidationError';
    this.attributeName = attributeName;
    this.constraint = constraint;
  }
}

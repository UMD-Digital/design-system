/**
 * Custom error types for the reactive attribute system.
 *
 * - `AttributeTypeError` — thrown when type conversion fails
 * - `AttributeValidationError` — thrown when validation fails
 * - `devWarning` — logs a warning only in dev mode
 * - `reportAttributeErrors` — groups multiple attribute errors under a component logger
 */

import { isDev, createLogger } from '../utilities/debug';

export class AttributeTypeError extends TypeError {
  readonly attributeName: string;
  readonly expectedType: string;
  readonly actualValue: string | null;
  readonly componentName?: string;

  constructor(
    attributeName: string,
    expectedType: string,
    actualValue: string | null,
    componentName?: string,
  ) {
    const prefix = componentName ? `[${componentName}] ` : '';
    super(
      `${prefix}Attribute "${attributeName}" expected type "${expectedType}" but received "${actualValue}"`,
    );
    this.name = 'AttributeTypeError';
    this.attributeName = attributeName;
    this.expectedType = expectedType;
    this.actualValue = actualValue;
    this.componentName = componentName;
  }
}

export class AttributeValidationError extends Error {
  readonly attributeName: string;
  readonly constraint: string;
  readonly componentName?: string;

  constructor(attributeName: string, constraint: string, componentName?: string) {
    const prefix = componentName ? `[${componentName}] ` : '';
    super(
      `${prefix}Attribute "${attributeName}" failed validation: ${constraint}`,
    );
    this.name = 'AttributeValidationError';
    this.attributeName = attributeName;
    this.constraint = constraint;
    this.componentName = componentName;
  }
}

export function devWarning(message: string): void {
  if (isDev()) {
    console.warn(`[UMD-DS]`, message);
  }
}

export function reportAttributeErrors(componentName: string, errors: Error[]): void {
  if (errors.length === 0) return;
  const logger = createLogger(componentName);
  if (errors.length === 1) {
    logger.error(errors[0].message);
    return;
  }
  logger.group(`${errors.length} attribute errors`);
  for (const err of errors) {
    logger.error(err.message);
  }
  logger.groupEnd();
}

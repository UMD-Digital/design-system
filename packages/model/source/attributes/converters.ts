/**
 * Type-safe bidirectional attribute converters.
 *
 * Each converter handles string↔value conversion for a specific type.
 * Use {@link resolveConverter} to normalize an {@link AttributeType} or custom
 * {@link AttributeConverter} into a concrete converter instance.
 *
 * @module converters
 */
import { AttributeTypeError } from './errors';

/**
 * Bidirectional converter between HTML attribute strings and typed values.
 *
 * Implement this interface to create custom converters for
 * {@link ReactiveAttributeConfig.converter}.
 *
 * @typeParam T - The JavaScript type this converter produces/consumes.
 */
export interface AttributeConverter<T = unknown> {
  /**
   * Convert an HTML attribute string to a typed value.
   *
   * @param value - The raw attribute string, or `null` if the attribute was removed.
   * @param attributeName - The attribute name (used in error messages).
   * @returns The converted value, or `undefined` if the attribute is absent.
   */
  fromAttribute(value: string | null, attributeName: string): T | undefined;

  /**
   * Convert a typed value back to an HTML attribute string.
   *
   * @param value - The typed value to serialize.
   * @returns The attribute string, or `null` to remove the attribute.
   */
  toAttribute(value: T): string | null;
}

/**
 * Built-in attribute type identifiers.
 *
 * Each maps to a pre-built {@link AttributeConverter}:
 * - `'string'` — pass-through (no conversion)
 * - `'number'` — `Number()` with NaN guard
 * - `'boolean'` — HTML boolean attribute convention (presence = true)
 * - `'object'` — `JSON.parse` / `JSON.stringify`
 * - `'array'` — `JSON.parse` / `JSON.stringify` with `Array.isArray` validation
 */
export type AttributeType = 'string' | 'number' | 'boolean' | 'object' | 'array';

/** String pass-through converter. Returns the raw attribute value unchanged. */
const stringConverter: AttributeConverter<string> = {
  fromAttribute(value) {
    return value ?? undefined;
  },
  toAttribute(value) {
    return value;
  },
};

/**
 * Numeric converter. Parses with `Number()` and throws
 * {@link AttributeTypeError} for NaN or empty strings.
 */
const numberConverter: AttributeConverter<number> = {
  fromAttribute(value, attributeName) {
    if (value === null) return undefined;
    if (value.trim() === '') {
      throw new AttributeTypeError(attributeName, 'number', value);
    }
    const num = Number(value);
    if (Number.isNaN(num)) {
      throw new AttributeTypeError(attributeName, 'number', value);
    }
    return num;
  },
  toAttribute(value) {
    return String(value);
  },
};

/**
 * Boolean converter following HTML boolean attribute conventions.
 *
 * - Attribute present (any value except `"false"`) → `true`
 * - Attribute value `"false"` → `false`
 * - Attribute absent (`null`) → `undefined`
 * - `toAttribute`: `true` → `""` (present), `false` → `null` (removed)
 */
const booleanConverter: AttributeConverter<boolean> = {
  fromAttribute(value) {
    if (value === null) return undefined;
    if (value === 'false') return false;
    return true;
  },
  toAttribute(value) {
    return value ? '' : null;
  },
};

/**
 * JSON object converter. Parses with `JSON.parse` and serializes with
 * `JSON.stringify`. Throws {@link AttributeTypeError} for invalid JSON.
 */
const objectConverter: AttributeConverter<unknown> = {
  fromAttribute(value, attributeName) {
    if (value === null) return undefined;
    try {
      return JSON.parse(value);
    } catch {
      throw new AttributeTypeError(attributeName, 'object', value);
    }
  },
  toAttribute(value) {
    return JSON.stringify(value);
  },
};

/**
 * JSON array converter. Same as {@link objectConverter} but additionally
 * validates that the parsed result is an array. Throws
 * {@link AttributeTypeError} if the parsed JSON is not an array.
 */
const arrayConverter: AttributeConverter<unknown[]> = {
  fromAttribute(value, attributeName) {
    if (value === null) return undefined;
    let parsed: unknown;
    try {
      parsed = JSON.parse(value);
    } catch {
      throw new AttributeTypeError(attributeName, 'array', value);
    }
    if (!Array.isArray(parsed)) {
      throw new AttributeTypeError(attributeName, 'array', value);
    }
    return parsed;
  },
  toAttribute(value) {
    return JSON.stringify(value);
  },
};

/**
 * Map of built-in {@link AttributeType} identifiers to their converter instances.
 *
 * Access directly or use {@link resolveConverter} for type-safe resolution.
 */
export const Converters = {
  string: stringConverter,
  number: numberConverter,
  boolean: booleanConverter,
  object: objectConverter,
  array: arrayConverter,
} as const;

/**
 * Resolve an {@link AttributeType} string or custom {@link AttributeConverter}
 * into a concrete converter instance.
 *
 * @typeParam T - The target value type.
 * @param typeOrConverter - A built-in type name or custom converter.
 * @returns The resolved converter instance.
 */
export function resolveConverter<T = unknown>(
  typeOrConverter: AttributeType | AttributeConverter<T>,
): AttributeConverter<T> {
  if (typeof typeOrConverter === 'string') {
    return Converters[typeOrConverter] as unknown as AttributeConverter<T>;
  }
  return typeOrConverter;
}

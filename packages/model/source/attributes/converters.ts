/**
 * Type-safe bidirectional attribute converters.
 *
 * Each converter handles string↔value conversion for a specific type.
 * Use `resolveConverter` to normalize an `AttributeType` or custom
 * `AttributeConverter` into a concrete converter instance.
 */
import { AttributeTypeError } from './errors';

export interface AttributeConverter<T = unknown> {
  fromAttribute(value: string | null, attributeName: string): T | undefined;
  toAttribute(value: T): string | null;
}

export type AttributeType = 'string' | 'number' | 'boolean' | 'object';

const stringConverter: AttributeConverter<string> = {
  fromAttribute(value) {
    return value ?? undefined;
  },
  toAttribute(value) {
    return value;
  },
};

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

const booleanConverter: AttributeConverter<boolean> = {
  fromAttribute(value) {
    if (value === null) return undefined;
    if (value === 'false') return false;
    // HTML boolean attribute convention: presence = true
    return true;
  },
  toAttribute(value) {
    return value ? '' : null;
  },
};

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

export const Converters = {
  string: stringConverter,
  number: numberConverter,
  boolean: booleanConverter,
  object: objectConverter,
} as const;

export function resolveConverter<T = unknown>(
  typeOrConverter: AttributeType | AttributeConverter<T>,
): AttributeConverter<T> {
  if (typeof typeOrConverter === 'string') {
    return Converters[typeOrConverter] as unknown as AttributeConverter<T>;
  }
  return typeOrConverter;
}

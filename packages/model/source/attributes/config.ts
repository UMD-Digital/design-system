/**
 * Declarative reactive attribute configuration.
 *
 * Defines a map of property names → attribute configs, then provides
 * helpers to derive `observedAttributes`, bulk-read values from an
 * element, and pre-resolve converters for runtime use.
 */
import {
  resolveConverter,
  type AttributeConverter,
  type AttributeType,
} from './converters';
import { AttributeValidationError } from './errors';

export interface ReactiveAttributeConfig<T = unknown> {
  /** Custom attribute name, or `false` to skip attribute observation. */
  attribute?: string | false;
  /** Built-in type for auto-conversion. */
  type?: AttributeType;
  /** Sync property value back to the attribute. Default: false. */
  reflect?: boolean;
  /** Custom converter (overrides `type`). */
  converter?: AttributeConverter<T>;
  /** Value used when the attribute is absent. */
  defaultValue?: T;
  /** Return an error message string to reject the value. */
  validate?: (value: T) => string | void;
}

export type ReactiveAttributeMap = Record<string, ReactiveAttributeConfig>;

export interface ResolvedAttributeConfig {
  propertyName: string;
  attributeName: string | false;
  converter: AttributeConverter;
  reflect: boolean;
  defaultValue: unknown;
  validate?: (value: unknown) => string | void;
}

/**
 * Convert a camelCase property name to a kebab-case attribute name.
 * e.g. `tabletSize` → `tablet-size`
 */
export function toAttributeName(propName: string): string {
  return propName.replace(/[A-Z]/g, (ch) => `-${ch.toLowerCase()}`);
}

/**
 * Derive the list of attribute names to observe from a reactive map.
 * Entries with `attribute: false` are excluded.
 */
export function defineObservedAttributes(map: ReactiveAttributeMap): string[] {
  return Object.entries(map)
    .map(([prop, cfg]) => {
      if (cfg.attribute === false) return null;
      return cfg.attribute ?? toAttributeName(prop);
    })
    .filter((n): n is string => n !== null);
}

/**
 * Bulk-read all reactive attributes from an element, applying type
 * conversion and defaults.  Returns a typed object keyed by property name.
 */
export function readAttributes<T extends Record<string, unknown>>(
  element: Element,
  map: ReactiveAttributeMap,
): T {
  const result: Record<string, unknown> = {};

  for (const [prop, cfg] of Object.entries(map)) {
    if (cfg.attribute === false) {
      result[prop] = cfg.defaultValue;
      continue;
    }

    const attrName = cfg.attribute ?? toAttributeName(prop);
    const converter = cfg.converter
      ? resolveConverter(cfg.converter)
      : cfg.type
        ? resolveConverter(cfg.type)
        : resolveConverter('string');

    const raw = element.getAttribute(attrName);
    const converted = converter.fromAttribute(raw, attrName);
    const value = converted !== undefined ? converted : cfg.defaultValue;

    if (value !== undefined && cfg.validate) {
      const error = cfg.validate(value);
      if (error) {
        throw new AttributeValidationError(attrName, error);
      }
    }

    result[prop] = value;
  }

  return result as T;
}

/**
 * Pre-resolve all configs for runtime use (converter instances,
 * computed attribute names, etc.).
 */
export function resolveAttributeConfigs(
  map: ReactiveAttributeMap,
): ResolvedAttributeConfig[] {
  return Object.entries(map).map(([prop, cfg]) => {
    const attributeName =
      cfg.attribute === false ? false : (cfg.attribute ?? toAttributeName(prop));

    const converter = cfg.converter
      ? resolveConverter(cfg.converter)
      : cfg.type
        ? resolveConverter(cfg.type)
        : resolveConverter('string');

    return {
      propertyName: prop,
      attributeName,
      converter,
      reflect: cfg.reflect ?? false,
      defaultValue: cfg.defaultValue,
      validate: cfg.validate,
    };
  });
}

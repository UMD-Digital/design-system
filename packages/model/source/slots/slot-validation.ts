/**
 * Declarative Slot Validation Engine
 *
 * Pure functions for validating slotted content against SlotConfig rules.
 * Checks run in order: required → deprecated → allowedElements →
 * disallowedElements → minItems → maxItems → custom validate.
 */
import type {
  SlotConfig,
  SlotValidationError,
  SlotValidationResult,
} from '../_types';

const camelToKebab = (str: string): string =>
  str
    .replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
    .replace(/^-/, '');

/**
 * Validate a pre-queried array of elements against a single slot config.
 */
export const validateSlotElements = (
  slotName: string,
  elements: Element[],
  config: SlotConfig,
): SlotValidationResult => {
  const errors: SlotValidationError[] = [];
  const kebab = camelToKebab(slotName);

  if (config.required && elements.length === 0) {
    errors.push({
      slot: slotName,
      error: 'missing',
      message: `Required slot "${kebab}" is missing`,
    });
  }

  if (config.deprecated && elements.length > 0) {
    errors.push({
      slot: slotName,
      error: 'deprecated',
      message: `Slot "${kebab}" is deprecated. ${config.deprecated}`,
    });
  }

  if (config.allowedElements && elements.length > 0) {
    const invalidElements = elements.filter(
      (el) => !config.allowedElements!.includes(el.tagName.toLowerCase()),
    );
    if (invalidElements.length > 0) {
      errors.push({
        slot: slotName,
        error: 'invalid-elements',
        message: `Slot "${kebab}" contains invalid elements. Allowed: ${config.allowedElements.join(', ')}`,
        invalidElements,
      });
    }
  }

  if (config.disallowedElements && elements.length > 0) {
    const disallowed = elements.filter((el) =>
      config.disallowedElements!.includes(el.tagName.toLowerCase()),
    );
    if (disallowed.length > 0) {
      errors.push({
        slot: slotName,
        error: 'disallowed-elements',
        message: `Slot "${kebab}" contains disallowed elements: ${disallowed.map((el) => el.tagName.toLowerCase()).join(', ')}`,
        invalidElements: disallowed,
      });
    }
  }

  if (config.minItems !== undefined && elements.length < config.minItems) {
    errors.push({
      slot: slotName,
      error: 'min-items',
      message: `Slot "${kebab}" requires at least ${config.minItems} item(s), found ${elements.length}`,
    });
  }

  if (config.maxItems !== undefined && elements.length > config.maxItems) {
    errors.push({
      slot: slotName,
      error: 'max-items',
      message: `Slot "${kebab}" allows at most ${config.maxItems} item(s), found ${elements.length}`,
    });
  }

  if (config.validate && elements.length > 0) {
    const result = config.validate(elements);
    if (result !== true) {
      errors.push({
        slot: slotName,
        error: 'custom-validation',
        message:
          typeof result === 'string'
            ? result
            : `Slot "${kebab}" failed custom validation`,
      });
    }
  }

  return { isValid: errors.length === 0, errors };
};

/**
 * Query a host element for slotted content and validate against config.
 */
export const validateSlot = (
  host: Element,
  slotName: string,
  config: SlotConfig,
): SlotValidationResult => {
  const kebab = camelToKebab(slotName);
  const elements = Array.from(host.querySelectorAll(`[slot="${kebab}"]`));
  return validateSlotElements(slotName, elements, config);
};

/**
 * Validate all slots defined in a config map against a host element.
 */
export const validateAllSlots = (
  host: Element,
  slots: Record<string, SlotConfig>,
): SlotValidationResult => {
  const allErrors: SlotValidationError[] = [];

  for (const [name, config] of Object.entries(slots)) {
    const result = validateSlot(host, name, config);
    allErrors.push(...result.errors);
  }

  return { isValid: allErrors.length === 0, errors: allErrors };
};

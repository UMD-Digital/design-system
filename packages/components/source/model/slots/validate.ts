import { SlotNames } from './mapping';

interface ValidatonErrors {
  isValid: boolean;
  errors: SlotValidationError[];
}

interface SlotValidationError {
  slot: string;
  element: HTMLElement;
  error: 'missing' | 'deprecated' | 'invalid-elements';
  message: string;
}

interface SlotVaidationOptions {
  type: string;
  isRequired?: boolean;
  isDeprecated?: boolean;
  allowedElements?: string[];
}

interface SlotVaidationProps extends SlotVaidationOptions {
  element: HTMLElement;
}

const validateSlotRequirements = ({
  element,
  type,
  isRequired,
  allowedElements,
}: SlotVaidationProps): ValidatonErrors => {
  const errors: SlotValidationError[] = [];
  const slottedContent = element.querySelector(
    `[slot="${type}"]`,
  ) as HTMLElement | null;

  // Check required slots
  if (isRequired && !slottedContent) {
    errors.push({
      element,
      slot: type,
      error: 'missing',
      message: `Required slot "${type}" is missing in ${element.tagName}`,
    });
  }

  // Check deprecated slots
  const isDeprecated = type in SlotNames.deprecated;
  if (isDeprecated && slottedContent) {
    errors.push({
      element,
      slot: type,
      error: 'deprecated',
      message: `${element.tagName} - Slot "${type}" is deprecated and will be removed in release 2.0`,
    });
  }

  // Check allowed elements
  if (allowedElements?.length && slottedContent) {
    const elementTag = slottedContent.tagName.toLowerCase();
    if (!allowedElements.includes(elementTag)) {
      errors.push({
        element,
        slot: type,
        error: 'invalid-elements',
        message: `Slot "${type}" contains invalid element "${elementTag}". Allowed: ${allowedElements.join(
          ', ',
        )}`,
      });
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export {
  validateSlotRequirements,
  type ValidatonErrors,
  type SlotValidationError,
  type SlotVaidationOptions,
};

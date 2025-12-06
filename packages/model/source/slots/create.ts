/**
 * Base properties required for slot creation
 */
export interface BaseProps {
  /** The HTML element to extract slot content from */
  element: HTMLElement;
}

interface BaseConfig extends BaseProps {
  type: string;
}

/**
 * Optional properties for slot configuration
 */
export interface OptionalProps {
  /** Whether to apply default styling to the slot content */
  isDefaultStyling: boolean;
  /** Whether this slot is required */
  isRequired: boolean;
}

interface ValidatonErrors {
  errors: string[];
}

interface SlotValidation extends ValidatonErrors {
  isValid: boolean;
}

type SlotConfig = BaseConfig & Partial<OptionalProps>;

/**
 * Result type for slot creation operations
 * Returns either the processed slot element or null if not found
 */
export type SlotResult = HTMLElement | null;

const createEmptySlot = (type: string): HTMLSlotElement => {
  const slot = document.createElement('slot');
  slot.setAttribute('name', type);
  return slot;
};

const validateSlotRequirements = (
  element: HTMLElement,
  type: string,
  isRequired: boolean,
): SlotValidation => {
  const errors: string[] = [];
  const slottedContent = element.querySelector(`[slot="${type}"]`);

  if (isRequired && !slottedContent) {
    errors.push(`Required slot "${type}" is missing in ${element.tagName}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

const cloneWithoutSlotAttribute = (element: HTMLElement): HTMLElement => {
  const clone = element.cloneNode(true) as HTMLElement;
  clone.removeAttribute('slot');
  return clone;
};

const processDefaultStyling = (
  element: HTMLElement,
  slotRef: string,
): SlotResult => {
  const elementRef = element.querySelector(
    `:scope > [slot=${slotRef}]`,
  ) as HTMLElement;

  if (!elementRef) {
    return null;
  }

  return elementRef.hasAttribute('styled')
    ? createEmptySlot(slotRef)
    : cloneWithoutSlotAttribute(elementRef);
};

const createSlot = ({
  element,
  type,
  isDefaultStyling = true,
  isRequired = false,
}: SlotConfig): SlotResult => {
  const validation = validateSlotRequirements(element, type, isRequired);
  if (!validation.isValid) {
    return null;
  }

  const slottedContent = element.querySelector(`[slot="${type}"]`);
  if (!slottedContent) {
    return null;
  }

  return isDefaultStyling
    ? processDefaultStyling(element, type)
    : createEmptySlot(type);
};

export { createSlot };

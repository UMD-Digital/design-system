import { createSlot } from './createSlot';

/**
 * Creates a slot element or clones the element based on 'styled' attribute
 *
 * If the element has a 'styled' attribute, returns a slot reference.
 * Otherwise, clones the element without the slot attribute.
 *
 * @param element - The parent element containing the slot
 * @param slotRef - The name of the slot to find
 * @returns Slot element, cloned element, or null if not found
 *
 * @example
 * ```typescript
 * const container = document.createElement('div');
 * const slotElement = document.createElement('div');
 * slotElement.setAttribute('slot', 'content');
 * slotElement.setAttribute('styled', '');
 * container.appendChild(slotElement);
 *
 * const result = createStyledSlotOrClone({ element: container, slotRef: 'content' });
 * // Returns a slot element for styled content
 * ```
 */
export const createStyledSlotOrClone = ({
  element,
  slotRef,
}: {
  element: HTMLElement;
  slotRef: string;
}) => {
  const elementRef = element.querySelector(
    `:scope > [slot=${slotRef}]`,
  ) as HTMLSlotElement;

  if (!elementRef) return null;
  const isStyled = elementRef.hasAttribute('styled');

  if (isStyled) {
    return createSlot(slotRef);
  }

  const clonedElement = elementRef.cloneNode(true) as HTMLElement;
  clonedElement.removeAttribute('slot');
  return clonedElement;
};

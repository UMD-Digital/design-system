import { createSlot } from './createSlot';

export const createSlotWithStyleOverwrite = ({
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

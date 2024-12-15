const extractSlot = ({
  element,
  type,
}: {
  element: HTMLElement;
  type: string;
}): HTMLElement | null => {
  const slot = element.querySelector(`[slot="${type}"]`);
  if (!slot) return null;

  const clone = slot.cloneNode(true) as HTMLElement;
  clone.removeAttribute('slot');

  return clone;
};

export { extractSlot };

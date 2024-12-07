interface SlotQuery {
  exists: boolean;
  isEmpty: boolean;
  content: Element | null;
  value: string;
}

const querySlot = (element: HTMLElement, type: string): SlotQuery => {
  const slot = element.querySelector(`[slot="${type}"]`);

  return {
    exists: slot !== null,
    isEmpty: !slot?.hasChildNodes(),
    content: slot,
    value: slot?.textContent?.trim() || '',
  };
};

export { querySlot, type SlotQuery };

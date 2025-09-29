/**
 * Creates a slot element with a specified name
 *
 * Utility for creating HTML slot elements for use in Shadow DOM components.
 *
 * @param name - The name attribute for the slot
 * @returns HTMLSlotElement with the specified name
 *
 * @example
 * ```typescript
 * const headlineSlot = createSlot('headline');
 * shadowRoot.appendChild(headlineSlot);
 * ```
 */
export const createSlot = (name: string): HTMLSlotElement => {
  const slot = document.createElement('slot');
  slot.setAttribute('name', name);
  return slot;
};
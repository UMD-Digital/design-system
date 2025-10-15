/**
 * Retrieves the first anchor element from a slot element
 *
 * Searches for anchor elements within the provided slot element and returns the first one found.
 * If multiple links are detected, it removes the parent elements (direct children of the slot)
 * that contain the additional links, keeping only the first link and its parent.
 * This ensures components that only support a single link maintain proper DOM structure.
 *
 * @param slot - The slot element containing the anchor elements
 * @returns The first HTMLAnchorElement if found, null otherwise
 *
 * @example
 * ```typescript
 * // Single link in slot
 * // HTML: <div slot="actions"><a href="/learn-more">Learn More</a></div>
 * const actionSlot = element.querySelector('[slot="actions"]');
 * const link = getLinkFromSlot(actionSlot);
 * // Returns the anchor element
 * ```
 *
 * @example
 * ```typescript
 * // Multiple links - removes extra parent elements
 * // HTML:
 * // <div slot="actions">
 * //   <div><a href="/link1">Link 1</a></div>
 * //   <div><a href="/link2">Link 2</a></div>
 * // </div>
 * const actionSlot = element.querySelector('[slot="actions"]');
 * const link = getLinkFromSlot(actionSlot);
 * // Logs warning, removes second div, returns first anchor
 * ```
 *
 * @example
 * ```typescript
 * // Direct anchor element as slot
 * // HTML: <a slot="actions" href="/read">Read More</a>
 * const actionSlot = element.querySelector('[slot="actions"]');
 * const link = getLinkFromSlot(actionSlot);
 * // Returns the anchor element itself
 * ```
 *
 * @category dom
 */
export const getLinkFromSlot = (
  slot: HTMLElement | null,
): HTMLAnchorElement | null => {
  if (!slot) return null;

  if (slot instanceof HTMLAnchorElement) {
    return slot;
  }

  const links = slot.querySelectorAll('a');
  if (links.length === 0) return null;

  if (links.length > 1) {
    console.warn(
      'Multiple links found in slot. Using the first link and removing parent elements of additional links.',
    );
    const firstLink = links[0];
    Array.from(slot.children).forEach((child) => {
      if (child instanceof HTMLAnchorElement && child !== firstLink) {
        child.remove();
        return;
      }
      const childLinks = child.querySelectorAll('a');
      if (childLinks.length > 0 && !child.contains(firstLink)) {
        child.remove();
      }
    });
  }

  return slot as HTMLAnchorElement;
};

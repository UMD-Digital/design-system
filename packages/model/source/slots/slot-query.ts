interface QueryOptions {
  flatten?: boolean;
  selector?: string;
}

function getSlotElement(
  host: HTMLElement,
  slotName?: string,
): HTMLSlotElement | null {
  const root = host.shadowRoot;
  if (!root) return null;

  const query = slotName
    ? `slot[name="${slotName}"]`
    : 'slot:not([name])';

  return root.querySelector<HTMLSlotElement>(query);
}

export function querySlottedElements(
  host: HTMLElement,
  slotName?: string,
  options?: QueryOptions,
): Element[] {
  const slot = getSlotElement(host, slotName);
  if (!slot) return [];

  const flatten = options?.flatten ?? false;
  const elements = slot.assignedElements({ flatten });

  if (options?.selector) {
    return elements.filter((el) => el.matches(options.selector!));
  }

  return elements;
}

export function querySlottedNodes(
  host: HTMLElement,
  slotName?: string,
  options?: Pick<QueryOptions, 'flatten'>,
): Node[] {
  const slot = getSlotElement(host, slotName);
  if (!slot) return [];

  const flatten = options?.flatten ?? false;
  return Array.from(slot.assignedNodes({ flatten }));
}

export function querySlottedElement<T extends Element = Element>(
  host: HTMLElement,
  slotName?: string,
  selector?: string,
): T | null {
  const elements = querySlottedElements(host, slotName, { selector });
  return (elements[0] as T) ?? null;
}

export function hasSlottedContent(
  host: HTMLElement,
  slotName?: string,
): boolean {
  return querySlottedElements(host, slotName, { flatten: true }).length > 0;
}

export function hasSlottedElement(
  host: HTMLElement,
  slotName: string,
  tagName: string,
): boolean {
  const elements = querySlottedElements(host, slotName, { flatten: true });
  const upper = tagName.toUpperCase();
  return elements.some((el) => el.tagName === upper);
}

export class SlotCache {
  private host: HTMLElement;
  private cache = new Map<string, HTMLSlotElement | null>();

  constructor(host: HTMLElement) {
    this.host = host;
  }

  getSlot(name?: string): HTMLSlotElement | null {
    const key = name ?? '';
    if (this.cache.has(key)) return this.cache.get(key)!;

    const slot = getSlotElement(this.host, name);
    this.cache.set(key, slot);
    return slot;
  }

  clear(): void {
    this.cache.clear();
  }
}

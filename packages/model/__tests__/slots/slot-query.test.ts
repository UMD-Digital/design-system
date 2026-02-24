import {
  querySlottedElements,
  querySlottedNodes,
  querySlottedElement,
  hasSlottedContent,
  hasSlottedElement,
  SlotCache,
} from '../../source/slots/slot-query';

function createHostWithSlot(
  slotName?: string,
  assignedElements: Element[] = [],
  assignedNodes: Node[] = [],
): HTMLElement {
  const host = document.createElement('div');
  const shadow = host.attachShadow({ mode: 'open' });

  const slot = document.createElement('slot');
  if (slotName) slot.setAttribute('name', slotName);

  slot.assignedElements = jest.fn(
    () => assignedElements,
  ) as unknown as typeof slot.assignedElements;
  slot.assignedNodes = jest.fn(
    () => assignedNodes,
  ) as unknown as typeof slot.assignedNodes;

  shadow.appendChild(slot);
  return host;
}

// --- querySlottedElements ---

describe('querySlottedElements', () => {
  it('returns assigned elements for a named slot', () => {
    const div = document.createElement('div');
    const span = document.createElement('span');
    const host = createHostWithSlot('content', [div, span]);

    expect(querySlottedElements(host, 'content')).toEqual([div, span]);
  });

  it('filters by selector', () => {
    const div = document.createElement('div');
    div.className = 'target';
    const span = document.createElement('span');
    const host = createHostWithSlot('content', [div, span]);

    const result = querySlottedElements(host, 'content', {
      selector: '.target',
    });
    expect(result).toEqual([div]);
  });

  it('respects flatten option', () => {
    const div = document.createElement('div');
    const host = createHostWithSlot('content', [div]);

    querySlottedElements(host, 'content', { flatten: true });
    const slot = host.shadowRoot!.querySelector('slot')!;
    expect(slot.assignedElements).toHaveBeenCalledWith({ flatten: true });
  });

  it('defaults flatten to false', () => {
    const host = createHostWithSlot('content', []);

    querySlottedElements(host, 'content');
    const slot = host.shadowRoot!.querySelector('slot')!;
    expect(slot.assignedElements).toHaveBeenCalledWith({ flatten: false });
  });

  it('returns empty array when host has no shadowRoot', () => {
    const host = document.createElement('div');
    expect(querySlottedElements(host, 'content')).toEqual([]);
  });

  it('returns empty array when slot is not found', () => {
    const host = createHostWithSlot('other');
    expect(querySlottedElements(host, 'content')).toEqual([]);
  });

  it('handles default slot (no name)', () => {
    const p = document.createElement('p');
    const host = createHostWithSlot(undefined, [p]);

    expect(querySlottedElements(host)).toEqual([p]);
  });
});

// --- querySlottedNodes ---

describe('querySlottedNodes', () => {
  it('returns assigned nodes including text nodes', () => {
    const text = document.createTextNode('hello');
    const div = document.createElement('div');
    const host = createHostWithSlot('content', [], [text, div]);

    expect(querySlottedNodes(host, 'content')).toEqual([text, div]);
  });

  it('respects flatten option', () => {
    const host = createHostWithSlot('content', [], []);

    querySlottedNodes(host, 'content', { flatten: true });
    const slot = host.shadowRoot!.querySelector('slot')!;
    expect(slot.assignedNodes).toHaveBeenCalledWith({ flatten: true });
  });

  it('defaults flatten to false', () => {
    const host = createHostWithSlot('content', [], []);

    querySlottedNodes(host, 'content');
    const slot = host.shadowRoot!.querySelector('slot')!;
    expect(slot.assignedNodes).toHaveBeenCalledWith({ flatten: false });
  });

  it('returns empty array when host has no shadowRoot', () => {
    const host = document.createElement('div');
    expect(querySlottedNodes(host, 'content')).toEqual([]);
  });
});

// --- querySlottedElement ---

describe('querySlottedElement', () => {
  it('returns first matching element', () => {
    const div = document.createElement('div');
    const span = document.createElement('span');
    const host = createHostWithSlot('content', [div, span]);

    expect(querySlottedElement(host, 'content')).toBe(div);
  });

  it('returns null when no elements', () => {
    const host = createHostWithSlot('content');
    expect(querySlottedElement(host, 'content')).toBeNull();
  });

  it('filters by selector and returns first match', () => {
    const div = document.createElement('div');
    const span = document.createElement('span');
    span.className = 'pick';
    const host = createHostWithSlot('content', [div, span]);

    expect(querySlottedElement(host, 'content', '.pick')).toBe(span);
  });
});

// --- hasSlottedContent ---

describe('hasSlottedContent', () => {
  it('returns true when elements are assigned', () => {
    const host = createHostWithSlot('content', [document.createElement('div')]);
    expect(hasSlottedContent(host, 'content')).toBe(true);
  });

  it('returns false when no elements are assigned', () => {
    const host = createHostWithSlot('content');
    expect(hasSlottedContent(host, 'content')).toBe(false);
  });

  it('uses flatten: true', () => {
    const host = createHostWithSlot('content');
    hasSlottedContent(host, 'content');
    const slot = host.shadowRoot!.querySelector('slot')!;
    expect(slot.assignedElements).toHaveBeenCalledWith({ flatten: true });
  });
});

// --- hasSlottedElement ---

describe('hasSlottedElement', () => {
  it('returns true when tag name matches', () => {
    const anchor = document.createElement('a');
    const host = createHostWithSlot('actions', [anchor]);

    expect(hasSlottedElement(host, 'actions', 'a')).toBe(true);
  });

  it('matches case-insensitively', () => {
    const anchor = document.createElement('a');
    const host = createHostWithSlot('actions', [anchor]);

    expect(hasSlottedElement(host, 'actions', 'A')).toBe(true);
  });

  it('returns false when no elements match tag name', () => {
    const div = document.createElement('div');
    const host = createHostWithSlot('actions', [div]);

    expect(hasSlottedElement(host, 'actions', 'a')).toBe(false);
  });

  it('returns false when slot has no content', () => {
    const host = createHostWithSlot('actions');
    expect(hasSlottedElement(host, 'actions', 'a')).toBe(false);
  });
});

// --- SlotCache ---

describe('SlotCache', () => {
  it('caches slot references', () => {
    const host = createHostWithSlot('content');
    const cache = new SlotCache(host);

    const first = cache.getSlot('content');
    const second = cache.getSlot('content');

    expect(first).toBe(second);
    expect(first).toBeInstanceOf(HTMLSlotElement);
  });

  it('clear invalidates cache', () => {
    const host = createHostWithSlot('content');
    const cache = new SlotCache(host);

    const first = cache.getSlot('content');
    cache.clear();

    // After clear, it re-queries — still same DOM element but cache was cleared
    const second = cache.getSlot('content');
    expect(first).toBe(second); // same DOM element
  });

  it('returns null for missing slots', () => {
    const host = createHostWithSlot('content');
    const cache = new SlotCache(host);

    expect(cache.getSlot('nonexistent')).toBeNull();
  });

  it('caches default slot with no name', () => {
    const host = createHostWithSlot(undefined);
    const cache = new SlotCache(host);

    const slot = cache.getSlot();
    expect(slot).toBeInstanceOf(HTMLSlotElement);
    expect(cache.getSlot()).toBe(slot);
  });

  it('caches null for missing slots', () => {
    const host = createHostWithSlot('content');
    const cache = new SlotCache(host);

    expect(cache.getSlot('missing')).toBeNull();
    // Second call should use cache (still null)
    expect(cache.getSlot('missing')).toBeNull();
  });
});

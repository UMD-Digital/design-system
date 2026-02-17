import {
  createMutationObserver,
  createResizeObserver,
  createIntersectionObserver,
  querySlotted,
  closestAcrossShadow,
} from '../../source/utilities/dom';

// --- Mock observers (JSDOM lacks ResizeObserver and IntersectionObserver) ---

let mockMutationObserver: {
  observe: jest.Mock;
  disconnect: jest.Mock;
};

let mockResizeObserver: {
  observe: jest.Mock;
  disconnect: jest.Mock;
};

let mockIntersectionObserver: {
  observe: jest.Mock;
  disconnect: jest.Mock;
};

beforeEach(() => {
  mockMutationObserver = { observe: jest.fn(), disconnect: jest.fn() };
  mockResizeObserver = { observe: jest.fn(), disconnect: jest.fn() };
  mockIntersectionObserver = { observe: jest.fn(), disconnect: jest.fn() };

  global.MutationObserver = jest.fn(
    () => mockMutationObserver,
  ) as unknown as typeof MutationObserver;

  global.ResizeObserver = jest.fn(
    () => mockResizeObserver,
  ) as unknown as typeof ResizeObserver;

  global.IntersectionObserver = jest.fn(
    () => mockIntersectionObserver,
  ) as unknown as typeof IntersectionObserver;
});

// --- createMutationObserver ---

describe('createMutationObserver', () => {
  it('creates and observes with default options', () => {
    const target = document.createElement('div');
    createMutationObserver(target, jest.fn());

    expect(mockMutationObserver.observe).toHaveBeenCalledWith(target, {
      childList: true,
      subtree: true,
    });
  });

  it('uses custom options when provided', () => {
    const target = document.createElement('div');
    const opts = { attributes: true, childList: false };
    createMutationObserver(target, jest.fn(), opts);

    expect(mockMutationObserver.observe).toHaveBeenCalledWith(target, opts);
  });

  it('cleanup disconnects the observer', () => {
    const cleanup = createMutationObserver(
      document.createElement('div'),
      jest.fn(),
    );
    cleanup();
    expect(mockMutationObserver.disconnect).toHaveBeenCalledTimes(1);
  });

  it('double cleanup only disconnects once', () => {
    const cleanup = createMutationObserver(
      document.createElement('div'),
      jest.fn(),
    );
    cleanup();
    cleanup();
    expect(mockMutationObserver.disconnect).toHaveBeenCalledTimes(1);
  });
});

// --- createResizeObserver ---

describe('createResizeObserver', () => {
  it('creates and observes the target', () => {
    const target = document.createElement('div');
    createResizeObserver(target, jest.fn());

    expect(mockResizeObserver.observe).toHaveBeenCalledWith(target, undefined);
  });

  it('passes options to observe', () => {
    const target = document.createElement('div');
    const opts = { box: 'border-box' as ResizeObserverBoxOptions };
    createResizeObserver(target, jest.fn(), opts);

    expect(mockResizeObserver.observe).toHaveBeenCalledWith(target, opts);
  });

  it('cleanup disconnects the observer', () => {
    const cleanup = createResizeObserver(
      document.createElement('div'),
      jest.fn(),
    );
    cleanup();
    expect(mockResizeObserver.disconnect).toHaveBeenCalledTimes(1);
  });

  it('double cleanup only disconnects once', () => {
    const cleanup = createResizeObserver(
      document.createElement('div'),
      jest.fn(),
    );
    cleanup();
    cleanup();
    expect(mockResizeObserver.disconnect).toHaveBeenCalledTimes(1);
  });
});

// --- createIntersectionObserver ---

describe('createIntersectionObserver', () => {
  it('creates observer with options and observes target', () => {
    const target = document.createElement('div');
    const opts = { threshold: 0.5 };
    createIntersectionObserver(target, jest.fn(), opts);

    expect(global.IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      opts,
    );
    expect(mockIntersectionObserver.observe).toHaveBeenCalledWith(target);
  });

  it('works without options', () => {
    const target = document.createElement('div');
    createIntersectionObserver(target, jest.fn());

    expect(global.IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      undefined,
    );
  });

  it('cleanup disconnects the observer', () => {
    const cleanup = createIntersectionObserver(
      document.createElement('div'),
      jest.fn(),
    );
    cleanup();
    expect(mockIntersectionObserver.disconnect).toHaveBeenCalledTimes(1);
  });

  it('double cleanup only disconnects once', () => {
    const cleanup = createIntersectionObserver(
      document.createElement('div'),
      jest.fn(),
    );
    cleanup();
    cleanup();
    expect(mockIntersectionObserver.disconnect).toHaveBeenCalledTimes(1);
  });
});

// --- querySlotted ---

describe('querySlotted', () => {
  function createMockSlot(elements: Element[]): HTMLSlotElement {
    const slot = document.createElement('slot') as HTMLSlotElement;
    slot.assignedElements = jest.fn(() => elements);
    return slot;
  }

  it('returns all assigned elements when no selector', () => {
    const div = document.createElement('div');
    const span = document.createElement('span');
    const slot = createMockSlot([div, span]);

    expect(querySlotted(slot)).toEqual([div, span]);
  });

  it('filters by selector', () => {
    const div = document.createElement('div');
    div.className = 'target';
    const span = document.createElement('span');
    const slot = createMockSlot([div, span]);

    const result = querySlotted(slot, '.target');
    expect(result).toEqual([div]);
  });

  it('returns empty array when no elements match selector', () => {
    const div = document.createElement('div');
    const slot = createMockSlot([div]);

    expect(querySlotted(slot, '.nonexistent')).toEqual([]);
  });

  it('returns empty array when slot has no assigned elements', () => {
    const slot = createMockSlot([]);
    expect(querySlotted(slot)).toEqual([]);
  });

  it('calls assignedElements with flatten: true', () => {
    const slot = createMockSlot([]);
    querySlotted(slot);
    expect(slot.assignedElements).toHaveBeenCalledWith({ flatten: true });
  });
});

// --- closestAcrossShadow ---

describe('closestAcrossShadow', () => {
  it('finds match in same DOM tree', () => {
    const parent = document.createElement('div');
    parent.className = 'wrapper';
    const child = document.createElement('span');
    parent.appendChild(child);
    document.body.appendChild(parent);

    expect(closestAcrossShadow(child, '.wrapper')).toBe(parent);
    document.body.removeChild(parent);
  });

  it('returns null when no match exists', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);

    expect(closestAcrossShadow(el, '.nonexistent')).toBeNull();
    document.body.removeChild(el);
  });

  it('traverses across shadow boundary to find match on host', () => {
    const host = document.createElement('div');
    host.className = 'shadow-host';
    const shadow = host.attachShadow({ mode: 'open' });
    const inner = document.createElement('span');
    shadow.appendChild(inner);
    document.body.appendChild(host);

    expect(closestAcrossShadow(inner, '.shadow-host')).toBe(host);
    document.body.removeChild(host);
  });

  it('traverses multiple shadow boundaries', () => {
    const outer = document.createElement('div');
    outer.className = 'outer';

    const mid = document.createElement('div');
    const midShadow = mid.attachShadow({ mode: 'open' });
    outer.appendChild(mid);

    const inner = document.createElement('div');
    const innerShadow = inner.attachShadow({ mode: 'open' });
    midShadow.appendChild(inner);

    const deepChild = document.createElement('span');
    innerShadow.appendChild(deepChild);

    document.body.appendChild(outer);

    expect(closestAcrossShadow(deepChild, '.outer')).toBe(outer);
    document.body.removeChild(outer);
  });
});

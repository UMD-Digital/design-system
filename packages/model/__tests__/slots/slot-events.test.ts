import {
  createSlotchangeHandler,
  SlotchangeController,
  type SlotchangeEvent,
  type ReactiveControllerHost,
  type ReactiveController,
} from '../../source/slots/slot-events';

function createHostWithSlots(
  slotNames: (string | undefined)[] = [undefined],
  assignedElements: Element[][] = [[]],
  assignedNodes: Node[][] = [[]],
): HTMLElement {
  const host = document.createElement('div');
  const shadow = host.attachShadow({ mode: 'open' });

  slotNames.forEach((name, i) => {
    const slot = document.createElement('slot');
    if (name) slot.setAttribute('name', name);

    slot.assignedElements = jest.fn(
      () => assignedElements[i] ?? [],
    ) as unknown as typeof slot.assignedElements;
    slot.assignedNodes = jest.fn(
      () => assignedNodes[i] ?? [],
    ) as unknown as typeof slot.assignedNodes;

    shadow.appendChild(slot);
  });

  return host;
}

function dispatchSlotchange(host: HTMLElement, slotName?: string): void {
  const selector = slotName
    ? `slot[name="${slotName}"]`
    : 'slot:not([name])';
  const slot = host.shadowRoot!.querySelector(selector)!;
  const event = new Event('slotchange', { bubbles: true });
  Object.defineProperty(event, 'target', { value: slot });
  slot.dispatchEvent(event);
}

// --- createSlotchangeHandler ---

describe('createSlotchangeHandler', () => {
  it('calls callback on slotchange event', () => {
    const div = document.createElement('div');
    const host = createHostWithSlots(['content'], [[div]]);
    const cb = jest.fn();

    const handler = createSlotchangeHandler(host, cb);
    handler.connect();
    dispatchSlotchange(host, 'content');

    expect(cb).toHaveBeenCalledTimes(1);
    const arg: SlotchangeEvent = cb.mock.calls[0][0];
    expect(arg.elements).toEqual([div]);
    expect(arg.slotName).toBe('content');
    expect(arg.slot).toBeInstanceOf(HTMLSlotElement);
  });

  it('provides nodes in the callback', () => {
    const text = document.createTextNode('hello');
    const host = createHostWithSlots(['content'], [[]], [[text]]);
    const cb = jest.fn();

    const handler = createSlotchangeHandler(host, cb);
    handler.connect();
    dispatchSlotchange(host, 'content');

    expect(cb.mock.calls[0][0].nodes).toEqual([text]);
  });

  it('filters by slotName option', () => {
    const host = createHostWithSlots(['header', 'footer']);
    const cb = jest.fn();

    const handler = createSlotchangeHandler(host, cb, { slotName: 'header' });
    handler.connect();

    dispatchSlotchange(host, 'footer');
    expect(cb).not.toHaveBeenCalled();

    dispatchSlotchange(host, 'header');
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('listens to all slots when slotName is not specified', () => {
    const host = createHostWithSlots(['header', 'footer']);
    const cb = jest.fn();

    const handler = createSlotchangeHandler(host, cb);
    handler.connect();

    dispatchSlotchange(host, 'header');
    dispatchSlotchange(host, 'footer');

    expect(cb).toHaveBeenCalledTimes(2);
  });

  it('respects flatten option', () => {
    const host = createHostWithSlots(['content']);
    const cb = jest.fn();

    const handler = createSlotchangeHandler(host, cb, { flatten: true });
    handler.connect();
    dispatchSlotchange(host, 'content');

    const slot = host.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="content"]')!;
    expect(slot.assignedElements).toHaveBeenCalledWith({ flatten: true });
    expect(slot.assignedNodes).toHaveBeenCalledWith({ flatten: true });
  });

  it('defaults flatten to false', () => {
    const host = createHostWithSlots(['content']);
    const cb = jest.fn();

    const handler = createSlotchangeHandler(host, cb);
    handler.connect();
    dispatchSlotchange(host, 'content');

    const slot = host.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="content"]')!;
    expect(slot.assignedElements).toHaveBeenCalledWith({ flatten: false });
  });

  it('handles default slot (no name)', () => {
    const host = createHostWithSlots([undefined]);
    const cb = jest.fn();

    const handler = createSlotchangeHandler(host, cb);
    handler.connect();
    dispatchSlotchange(host);

    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb.mock.calls[0][0].slotName).toBeUndefined();
  });

  it('filters default slot by empty-string slotName', () => {
    const host = createHostWithSlots([undefined, 'named']);
    const cb = jest.fn();

    const handler = createSlotchangeHandler(host, cb, { slotName: '' });
    handler.connect();

    dispatchSlotchange(host, 'named');
    expect(cb).not.toHaveBeenCalled();

    dispatchSlotchange(host);
    expect(cb).toHaveBeenCalledTimes(1);
  });

  describe('disconnect', () => {
    it('removes the event listener', () => {
      const host = createHostWithSlots(['content']);
      const cb = jest.fn();

      const handler = createSlotchangeHandler(host, cb);
      handler.connect();
      handler.disconnect();

      dispatchSlotchange(host, 'content');
      expect(cb).not.toHaveBeenCalled();
    });

    it('is safe to call without shadowRoot', () => {
      const host = document.createElement('div');
      const handler = createSlotchangeHandler(host, jest.fn());
      expect(() => handler.disconnect()).not.toThrow();
    });
  });

  describe('immediate option', () => {
    it('fires callback immediately with current content', () => {
      const div = document.createElement('div');
      const host = createHostWithSlots(['content'], [[div]]);
      const cb = jest.fn();

      const handler = createSlotchangeHandler(host, cb, { immediate: true });
      handler.connect();

      expect(cb).toHaveBeenCalledTimes(1);
      expect(cb.mock.calls[0][0].elements).toEqual([div]);
      expect(cb.mock.calls[0][0].slotName).toBe('content');
    });

    it('fires for all matching slots', () => {
      const host = createHostWithSlots(['header', 'footer']);
      const cb = jest.fn();

      const handler = createSlotchangeHandler(host, cb, { immediate: true });
      handler.connect();

      expect(cb).toHaveBeenCalledTimes(2);
    });

    it('filters by slotName for immediate fire', () => {
      const host = createHostWithSlots(['header', 'footer']);
      const cb = jest.fn();

      const handler = createSlotchangeHandler(host, cb, {
        immediate: true,
        slotName: 'header',
      });
      handler.connect();

      expect(cb).toHaveBeenCalledTimes(1);
      expect(cb.mock.calls[0][0].slotName).toBe('header');
    });

    it('is safe without shadowRoot', () => {
      const host = document.createElement('div');
      const handler = createSlotchangeHandler(host, jest.fn(), {
        immediate: true,
      });
      expect(() => handler.connect()).not.toThrow();
    });
  });

  describe('debounce', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    it('debounces rapid slotchange events', () => {
      const host = createHostWithSlots(['content']);
      const cb = jest.fn();

      const handler = createSlotchangeHandler(host, cb, { debounce: 100 });
      handler.connect();

      dispatchSlotchange(host, 'content');
      dispatchSlotchange(host, 'content');
      dispatchSlotchange(host, 'content');

      expect(cb).not.toHaveBeenCalled();

      jest.advanceTimersByTime(100);
      expect(cb).toHaveBeenCalledTimes(1);
    });

    it('resets debounce timer on subsequent events', () => {
      const host = createHostWithSlots(['content']);
      const cb = jest.fn();

      const handler = createSlotchangeHandler(host, cb, { debounce: 100 });
      handler.connect();

      dispatchSlotchange(host, 'content');
      jest.advanceTimersByTime(50);

      dispatchSlotchange(host, 'content');
      jest.advanceTimersByTime(50);

      expect(cb).not.toHaveBeenCalled();

      jest.advanceTimersByTime(50);
      expect(cb).toHaveBeenCalledTimes(1);
    });

    it('clears pending timeout on disconnect', () => {
      const host = createHostWithSlots(['content']);
      const cb = jest.fn();

      const handler = createSlotchangeHandler(host, cb, { debounce: 100 });
      handler.connect();

      dispatchSlotchange(host, 'content');
      handler.disconnect();

      jest.advanceTimersByTime(200);
      expect(cb).not.toHaveBeenCalled();
    });

    it('does not debounce with debounce: 0', () => {
      const host = createHostWithSlots(['content']);
      const cb = jest.fn();

      const handler = createSlotchangeHandler(host, cb, { debounce: 0 });
      handler.connect();

      dispatchSlotchange(host, 'content');
      expect(cb).toHaveBeenCalledTimes(1);
    });
  });
});

// --- SlotchangeController ---

describe('SlotchangeController', () => {
  function createMockHost(
    slotNames: (string | undefined)[] = [],
    assignedElements: Element[][] = [],
  ): ReactiveControllerHost {
    const host = createHostWithSlots(slotNames, assignedElements);
    const controllers: ReactiveController[] = [];

    (host as any).addController = jest.fn((c: ReactiveController) => {
      controllers.push(c);
    });
    (host as any)._controllers = controllers;

    return host as unknown as ReactiveControllerHost;
  }

  it('registers itself with the host', () => {
    const host = createMockHost();
    new SlotchangeController(host, []);
    expect(host.addController).toHaveBeenCalledTimes(1);
  });

  it('connects handlers on hostConnected', () => {
    const div = document.createElement('div');
    const host = createMockHost(['header'], [[div]]);
    const cb = jest.fn();

    const controller = new SlotchangeController(host, [
      { slotName: 'header', callback: cb },
    ]);

    controller.hostConnected!();
    dispatchSlotchange(host as unknown as HTMLElement, 'header');

    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb.mock.calls[0][0].elements).toEqual([div]);
  });

  it('disconnects all handlers on hostDisconnected', () => {
    const host = createMockHost(['header', 'footer']);
    const headerCb = jest.fn();
    const footerCb = jest.fn();

    const controller = new SlotchangeController(host, [
      { slotName: 'header', callback: headerCb },
      { slotName: 'footer', callback: footerCb },
    ]);

    controller.hostConnected!();
    controller.hostDisconnected!();

    const el = host as unknown as HTMLElement;
    dispatchSlotchange(el, 'header');
    dispatchSlotchange(el, 'footer');

    expect(headerCb).not.toHaveBeenCalled();
    expect(footerCb).not.toHaveBeenCalled();
  });

  it('passes options through to handlers', () => {
    const host = createMockHost(['items']);
    const cb = jest.fn();

    const controller = new SlotchangeController(host, [
      { slotName: 'items', callback: cb, options: { flatten: true } },
    ]);

    controller.hostConnected!();
    dispatchSlotchange(host as unknown as HTMLElement, 'items');

    const slot = (host as unknown as HTMLElement).shadowRoot!.querySelector<HTMLSlotElement>(
      'slot[name="items"]',
    )!;
    expect(slot.assignedElements).toHaveBeenCalledWith({ flatten: true });
  });

  it('supports immediate option', () => {
    const div = document.createElement('div');
    const host = createMockHost(['header'], [[div]]);
    const cb = jest.fn();

    const controller = new SlotchangeController(host, [
      { slotName: 'header', callback: cb, options: { immediate: true } },
    ]);

    controller.hostConnected!();
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('supports multiple configs', () => {
    const host = createMockHost(['header', 'footer']);
    const headerCb = jest.fn();
    const footerCb = jest.fn();

    const controller = new SlotchangeController(host, [
      { slotName: 'header', callback: headerCb },
      { slotName: 'footer', callback: footerCb },
    ]);

    controller.hostConnected!();

    const el = host as unknown as HTMLElement;
    dispatchSlotchange(el, 'header');
    expect(headerCb).toHaveBeenCalledTimes(1);
    expect(footerCb).not.toHaveBeenCalled();

    dispatchSlotchange(el, 'footer');
    expect(footerCb).toHaveBeenCalledTimes(1);
  });

  it('clears handlers array on disconnect', () => {
    const host = createMockHost(['header']);
    const cb = jest.fn();

    const controller = new SlotchangeController(host, [
      { slotName: 'header', callback: cb },
    ]);

    controller.hostConnected!();
    controller.hostDisconnected!();

    // Reconnect should create fresh handlers
    controller.hostConnected!();
    dispatchSlotchange(host as unknown as HTMLElement, 'header');
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('config slotName overrides options.slotName', () => {
    const host = createMockHost(['header', 'footer']);
    const cb = jest.fn();

    const controller = new SlotchangeController(host, [
      {
        slotName: 'header',
        callback: cb,
        options: { slotName: 'footer' },
      },
    ]);

    controller.hostConnected!();

    const el = host as unknown as HTMLElement;
    // The config.slotName ('header') is spread AFTER options, so it wins
    dispatchSlotchange(el, 'footer');
    expect(cb).not.toHaveBeenCalled();

    dispatchSlotchange(el, 'header');
    expect(cb).toHaveBeenCalledTimes(1);
  });
});

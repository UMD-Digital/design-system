import {
  createCustomEvent,
  dispatchCustomEvent,
  defineEvents,
  createEventListener,
  delegate,
} from '../../source/utilities/events';

describe('createCustomEvent', () => {
  it('creates event with correct type name', () => {
    const event = createCustomEvent('my-event');
    expect(event.type).toBe('my-event');
  });

  it('includes detail payload', () => {
    const event = createCustomEvent('data', { detail: { id: 1 } });
    expect(event.detail).toEqual({ id: 1 });
  });

  it('defaults to bubbles: true, cancelable: false, composed: true', () => {
    const event = createCustomEvent('test');
    expect(event.bubbles).toBe(true);
    expect(event.cancelable).toBe(false);
    expect(event.composed).toBe(true);
  });

  it('respects overridden options', () => {
    const event = createCustomEvent('test', {
      bubbles: false,
      cancelable: true,
      composed: false,
    });
    expect(event.bubbles).toBe(false);
    expect(event.cancelable).toBe(true);
    expect(event.composed).toBe(false);
  });

  it('works with no options (undefined detail)', () => {
    const event = createCustomEvent('empty');
    expect(event.detail).toBeNull();
  });
});

describe('dispatchCustomEvent', () => {
  it('dispatches event on element', () => {
    const el = document.createElement('div');
    const spy = jest.fn();
    el.addEventListener('ping', spy);

    dispatchCustomEvent(el, 'ping');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('returns dispatch result', () => {
    const el = document.createElement('div');
    const result = dispatchCustomEvent(el, 'test');
    expect(typeof result).toBe('boolean');
  });

  it('listeners receive correct detail', () => {
    const el = document.createElement('div');
    let received: unknown = null;

    el.addEventListener('msg', (e) => {
      received = (e as CustomEvent).detail;
    });

    dispatchCustomEvent(el, 'msg', { detail: { text: 'hello' } });
    expect(received).toEqual({ text: 'hello' });
  });

  it('passes options through to event', () => {
    const el = document.createElement('div');
    let event: CustomEvent | null = null;

    el.addEventListener('x', (e) => {
      event = e as CustomEvent;
    });

    dispatchCustomEvent(el, 'x', {
      bubbles: false,
      cancelable: true,
      composed: false,
    });

    expect(event!.bubbles).toBe(false);
    expect(event!.cancelable).toBe(true);
    expect(event!.composed).toBe(false);
  });
});

describe('defineEvents', () => {
  type TestEvents = {
    'item-added': { id: number };
    'item-removed': { id: number };
    reset: undefined;
  };

  it('types proxy returns key as string value', () => {
    const events = defineEvents<TestEvents>();
    expect(events.types['item-added']).toBe('item-added');
    expect(events.types['item-removed']).toBe('item-removed');
    expect(events.types.reset).toBe('reset');
  });

  it('dispatch dispatches event with correct type and detail', () => {
    const events = defineEvents<TestEvents>();
    const el = document.createElement('div');
    let received: CustomEvent | null = null;

    el.addEventListener('item-added', (e) => {
      received = e as CustomEvent;
    });

    events.dispatch(el, 'item-added', { id: 42 });

    expect(received).not.toBeNull();
    expect(received!.type).toBe('item-added');
    expect(received!.detail).toEqual({ id: 42 });
  });

  it('detail matches map definition (runtime check with listener)', () => {
    const events = defineEvents<TestEvents>();
    const el = document.createElement('div');
    let detail: unknown = null;

    el.addEventListener('item-removed', (e) => {
      detail = (e as CustomEvent).detail;
    });

    events.dispatch(el, 'item-removed', { id: 7 });
    expect(detail).toEqual({ id: 7 });
  });

  it('returns boolean from dispatch', () => {
    const events = defineEvents<TestEvents>();
    const el = document.createElement('div');
    const result = events.dispatch(el, 'reset');
    expect(typeof result).toBe('boolean');
  });

  it('works with empty detail', () => {
    const events = defineEvents<TestEvents>();
    const el = document.createElement('div');
    let fired = false;

    el.addEventListener('reset', () => {
      fired = true;
    });

    events.dispatch(el, 'reset');
    expect(fired).toBe(true);
  });
});

describe('createEventListener', () => {
  it('adds listener that receives events', () => {
    const el = document.createElement('div');
    const spy = jest.fn();

    createEventListener(el, 'click', spy);
    el.dispatchEvent(new Event('click'));

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('cleanup function removes the listener', () => {
    const el = document.createElement('div');
    const spy = jest.fn();

    const cleanup = createEventListener(el, 'click', spy);
    cleanup();

    el.dispatchEvent(new Event('click'));
    expect(spy).not.toHaveBeenCalled();
  });

  it('supports AddEventListenerOptions (once)', () => {
    const el = document.createElement('div');
    const spy = jest.fn();

    createEventListener(el, 'ping', spy, { once: true });

    el.dispatchEvent(new Event('ping'));
    el.dispatchEvent(new Event('ping'));

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('multiple cleanups are safe', () => {
    const el = document.createElement('div');
    const cleanup = createEventListener(el, 'test', jest.fn());

    expect(() => {
      cleanup();
      cleanup();
    }).not.toThrow();
  });
});

describe('delegate', () => {
  function buildContainer() {
    const container = document.createElement('div');
    const button = document.createElement('button');
    button.className = 'action';
    const span = document.createElement('span');
    span.className = 'label';
    button.appendChild(span);
    container.appendChild(button);
    document.body.appendChild(container);
    return { container, button, span };
  }

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('handler fires when matching descendant is clicked', () => {
    const { container, button } = buildContainer();
    const spy = jest.fn();

    delegate(container, '.action', 'click', spy);
    button.click();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('handler receives the matched element', () => {
    const { container, span, button } = buildContainer();
    let matched: HTMLElement | null = null;

    delegate(container, '.action', 'click', (_e, el) => {
      matched = el;
    });

    // Click the span inside button — closest('.action') should be the button
    span.click();
    expect(matched).toBe(button);
  });

  it('handler does NOT fire for non-matching elements', () => {
    const { container } = buildContainer();
    const spy = jest.fn();

    delegate(container, '.nonexistent', 'click', spy);
    container.click();

    expect(spy).not.toHaveBeenCalled();
  });

  it('cleanup removes delegation', () => {
    const { container, button } = buildContainer();
    const spy = jest.fn();

    const cleanup = delegate(container, '.action', 'click', spy);
    cleanup();

    button.click();
    expect(spy).not.toHaveBeenCalled();
  });

  it('does not match elements outside the container', () => {
    const { container } = buildContainer();
    const outside = document.createElement('button');
    outside.className = 'action';
    document.body.appendChild(outside);

    const spy = jest.fn();
    delegate(container, '.action', 'click', spy);

    outside.click();
    expect(spy).not.toHaveBeenCalled();
  });
});

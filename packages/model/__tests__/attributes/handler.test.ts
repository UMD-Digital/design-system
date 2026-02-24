import { handler } from '../../source/attributes/handler';
import type {
  AttributeElementRef,
  AttributeHandlerConfig,
} from '../../source/attributes/handler';

function createRef(overrides?: Partial<AttributeElementRef>): AttributeElementRef {
  return {
    element: document.createElement('div'),
    events: {},
    ...overrides,
  };
}

// ─── combine ────────────────────────────────────────────────────────

describe('handler.combine', () => {
  it('merges handlers for the same attribute name', () => {
    const spy1 = jest.fn();
    const spy2 = jest.fn();

    const combined = handler.combine(
      { name: 'resize', handler: spy1 },
      { name: 'resize', handler: spy2 },
    );

    expect(combined).toHaveLength(1);
    expect(combined[0].name).toBe('resize');
  });

  it('executes merged handlers sequentially', () => {
    const order: number[] = [];
    const combined = handler.combine(
      { name: 'resize', handler: () => order.push(1) },
      { name: 'resize', handler: () => order.push(2) },
    );

    const ref = createRef();
    combined[0].handler(ref, null, 'true');
    expect(order).toEqual([1, 2]);
  });

  it('keeps different attribute names separate', () => {
    const combined = handler.combine(
      { name: 'resize', handler: jest.fn() },
      { name: 'data-visual-open', handler: jest.fn() },
    );

    expect(combined).toHaveLength(2);
    expect(combined.map((c) => c.name)).toEqual(['resize', 'data-visual-open']);
  });

  it('returns empty array for no input', () => {
    expect(handler.combine()).toEqual([]);
  });
});

// ─── observe.resize ─────────────────────────────────────────────────

describe('handler.observe.resize', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('triggers callback when newValue is "true"', () => {
    const callback = jest.fn();
    const config = handler.observe.resize({ callback });
    const ref = createRef();

    config.handler(ref, null, 'true');
    expect(callback).toHaveBeenCalledWith(ref);
  });

  it('does not trigger callback for other values', () => {
    const callback = jest.fn();
    const config = handler.observe.resize({ callback });
    const ref = createRef();

    config.handler(ref, null, 'false');
    config.handler(ref, null, null);
    config.handler(ref, null, '');
    expect(callback).not.toHaveBeenCalled();
  });

  it('dispatches component:resize custom event', () => {
    const callback = jest.fn();
    const config = handler.observe.resize({ callback });
    const ref = createRef();
    const eventSpy = jest.fn();
    ref.element.addEventListener('component:resize', eventSpy);

    config.handler(ref, null, 'true');
    jest.runAllTimers();

    expect(eventSpy).toHaveBeenCalledTimes(1);
    const detail = eventSpy.mock.calls[0][0].detail;
    expect(detail).toHaveProperty('tagName');
    expect(detail).toHaveProperty('element', ref.element);
    expect(detail).toHaveProperty('source', 'attribute');
  });

  it('uses default attribute name "resize"', () => {
    const config = handler.observe.resize({ callback: jest.fn() });
    expect(config.name).toBe('resize');
  });

  it('respects custom name override', () => {
    const config = handler.observe.resize({
      callback: jest.fn(),
      name: 'custom-resize',
    });
    expect(config.name).toBe('custom-resize');
  });
});

// ─── observe.visuallyOpen ───────────────────────────────────────────

describe('handler.observe.visuallyOpen', () => {
  it('triggers on false → true transition', () => {
    const callback = jest.fn();
    const config = handler.observe.visuallyOpen({ callback });
    const ref = createRef();

    config.handler(ref, 'false', 'true');
    expect(callback).toHaveBeenCalledWith(ref);
  });

  it('does not trigger on other transitions', () => {
    const callback = jest.fn();
    const config = handler.observe.visuallyOpen({ callback });
    const ref = createRef();

    config.handler(ref, 'true', 'false');
    config.handler(ref, null, 'true');
    config.handler(ref, 'true', 'true');
    expect(callback).not.toHaveBeenCalled();
  });

  it('uses data-visual-open as default name', () => {
    const config = handler.observe.visuallyOpen({ callback: jest.fn() });
    expect(config.name).toBe('data-visual-open');
  });
});

// ─── observe.visuallyClosed ─────────────────────────────────────────

describe('handler.observe.visuallyClosed', () => {
  it('triggers on true → false transition', () => {
    const callback = jest.fn();
    const config = handler.observe.visuallyClosed({ callback });
    const ref = createRef();

    config.handler(ref, 'true', 'false');
    expect(callback).toHaveBeenCalledWith(ref);
  });

  it('does not trigger on other transitions', () => {
    const callback = jest.fn();
    const config = handler.observe.visuallyClosed({ callback });
    const ref = createRef();

    config.handler(ref, 'false', 'true');
    config.handler(ref, null, 'false');
    config.handler(ref, 'false', 'false');
    expect(callback).not.toHaveBeenCalled();
  });

  it('uses data-visual-open as default name', () => {
    const config = handler.observe.visuallyClosed({ callback: jest.fn() });
    expect(config.name).toBe('data-visual-open');
  });
});

// ─── observe.visuallyHide ───────────────────────────────────────────

describe('handler.observe.visuallyHide', () => {
  it('triggers on false → true transition', () => {
    const callback = jest.fn();
    const config = handler.observe.visuallyHide({ callback });
    const ref = createRef();

    config.handler(ref, 'false', 'true');
    expect(callback).toHaveBeenCalledWith(ref);
  });

  it('does not trigger on other transitions', () => {
    const callback = jest.fn();
    const config = handler.observe.visuallyHide({ callback });
    const ref = createRef();

    config.handler(ref, 'true', 'false');
    config.handler(ref, null, 'true');
    expect(callback).not.toHaveBeenCalled();
  });

  it('uses data-layout-hidden as default name', () => {
    const config = handler.observe.visuallyHide({ callback: jest.fn() });
    expect(config.name).toBe('data-layout-hidden');
  });
});

// ─── observe.visuallyShow ───────────────────────────────────────────

describe('handler.observe.visuallyShow', () => {
  it('triggers on true → false transition', () => {
    const callback = jest.fn();
    const config = handler.observe.visuallyShow({ callback });
    const ref = createRef();

    config.handler(ref, 'true', 'false');
    expect(callback).toHaveBeenCalledWith(ref);
  });

  it('does not trigger on other transitions', () => {
    const callback = jest.fn();
    const config = handler.observe.visuallyShow({ callback });
    const ref = createRef();

    config.handler(ref, 'false', 'true');
    config.handler(ref, null, 'false');
    expect(callback).not.toHaveBeenCalled();
  });

  it('uses data-layout-hidden as default name', () => {
    const config = handler.observe.visuallyShow({ callback: jest.fn() });
    expect(config.name).toBe('data-layout-hidden');
  });
});

// ─── observe.visuallyPosition ───────────────────────────────────────

describe('handler.observe.visuallyPosition', () => {
  it('parses numeric position and passes to callback', () => {
    const callback = jest.fn();
    const config = handler.observe.visuallyPosition({ callback });
    const ref = createRef();

    config.handler(ref, null, '100');
    expect(callback).toHaveBeenCalledWith(ref, 100);
  });

  it('calls callback without value when newValue is null', () => {
    const callback = jest.fn();
    const config = handler.observe.visuallyPosition({ callback });
    const ref = createRef();

    config.handler(ref, '100', null);
    expect(callback).toHaveBeenCalledWith(ref);
  });

  it('does not trigger when value unchanged', () => {
    const callback = jest.fn();
    const config = handler.observe.visuallyPosition({ callback });
    const ref = createRef();

    config.handler(ref, '50', '50');
    expect(callback).not.toHaveBeenCalled();
  });

  it('uses data-layout-position as default name', () => {
    const config = handler.observe.visuallyPosition({ callback: jest.fn() });
    expect(config.name).toBe('data-layout-position');
  });
});

// ─── observe.stateOpen ──────────────────────────────────────────────

describe('handler.observe.stateOpen', () => {
  it('triggers on closed → open transition', () => {
    const callback = jest.fn();
    const config = handler.observe.stateOpen({ callback });
    const ref = createRef();

    config.handler(ref, 'closed', 'open');
    expect(callback).toHaveBeenCalledWith(ref);
  });

  it('does not trigger on other transitions', () => {
    const callback = jest.fn();
    const config = handler.observe.stateOpen({ callback });
    const ref = createRef();

    config.handler(ref, 'open', 'closed');
    config.handler(ref, null, 'open');
    config.handler(ref, 'open', 'open');
    expect(callback).not.toHaveBeenCalled();
  });

  it('uses data-state as default name', () => {
    const config = handler.observe.stateOpen({ callback: jest.fn() });
    expect(config.name).toBe('data-state');
  });
});

// ─── observe.stateClosed ────────────────────────────────────────────

describe('handler.observe.stateClosed', () => {
  it('triggers on open → closed transition', () => {
    const callback = jest.fn();
    const config = handler.observe.stateClosed({ callback });
    const ref = createRef();

    config.handler(ref, 'open', 'closed');
    expect(callback).toHaveBeenCalledWith(ref);
  });

  it('does not trigger on other transitions', () => {
    const callback = jest.fn();
    const config = handler.observe.stateClosed({ callback });
    const ref = createRef();

    config.handler(ref, 'closed', 'open');
    config.handler(ref, null, 'closed');
    config.handler(ref, 'closed', 'closed');
    expect(callback).not.toHaveBeenCalled();
  });

  it('uses data-state as default name', () => {
    const config = handler.observe.stateClosed({ callback: jest.fn() });
    expect(config.name).toBe('data-state');
  });
});

// ─── common.resize ──────────────────────────────────────────────────

describe('handler.common.resize', () => {
  it('wraps observe.resize with simplified API', () => {
    const callback = jest.fn();
    const config = handler.common.resize(callback);
    const ref = createRef();

    config.handler(ref, null, 'true');
    expect(callback).toHaveBeenCalledWith(ref);
  });

  it('uses resize attribute name', () => {
    const config = handler.common.resize(jest.fn());
    expect(config.name).toBe('resize');
  });
});

// ─── common.visualShowHide ──────────────────────────────────────────

describe('handler.common.visualShowHide', () => {
  it('combines show and hide handlers', () => {
    const onShow = jest.fn();
    const onHide = jest.fn();
    const configs = handler.common.visualShowHide({ onShow, onHide });

    const ref = createRef();

    // Both use data-layout-hidden, so they should be combined into one entry
    expect(configs).toHaveLength(1);
    expect(configs[0].name).toBe('data-layout-hidden');

    // Show: true → false
    configs[0].handler(ref, 'true', 'false');
    expect(onShow).toHaveBeenCalled();

    // Hide: false → true
    configs[0].handler(ref, 'false', 'true');
    expect(onHide).toHaveBeenCalled();
  });

  it('handles missing onShow callback', () => {
    const onHide = jest.fn();
    const configs = handler.common.visualShowHide({ onHide });
    const ref = createRef();

    expect(configs).toHaveLength(1);
    configs[0].handler(ref, 'false', 'true');
    expect(onHide).toHaveBeenCalled();
  });

  it('handles missing onHide callback', () => {
    const onShow = jest.fn();
    const configs = handler.common.visualShowHide({ onShow });
    const ref = createRef();

    expect(configs).toHaveLength(1);
    configs[0].handler(ref, 'true', 'false');
    expect(onShow).toHaveBeenCalled();
  });

  it('returns empty when no callbacks provided', () => {
    const configs = handler.common.visualShowHide({});
    expect(configs).toEqual([]);
  });
});

// ─── common.visualToggle ────────────────────────────────────────────

describe('handler.common.visualToggle', () => {
  it('combines open and close handlers', () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();
    const configs = handler.common.visualToggle({ onOpen, onClose });

    const ref = createRef();

    // Both use data-visual-open, so combined into one entry
    expect(configs).toHaveLength(1);
    expect(configs[0].name).toBe('data-visual-open');

    // Open: false → true
    configs[0].handler(ref, 'false', 'true');
    expect(onOpen).toHaveBeenCalled();

    // Close: true → false
    configs[0].handler(ref, 'true', 'false');
    expect(onClose).toHaveBeenCalled();
  });

  it('handles missing onOpen callback', () => {
    const onClose = jest.fn();
    const configs = handler.common.visualToggle({ onClose });
    const ref = createRef();

    expect(configs).toHaveLength(1);
    configs[0].handler(ref, 'true', 'false');
    expect(onClose).toHaveBeenCalled();
  });

  it('returns empty when no callbacks provided', () => {
    const configs = handler.common.visualToggle({});
    expect(configs).toEqual([]);
  });
});

// ─── common.accordion ───────────────────────────────────────────────

describe('handler.common.accordion', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('returns combined handlers for resize, visual, and state attributes', () => {
    const configs = handler.common.accordion();

    const names = configs.map((c) => c.name);
    expect(names).toContain('resize');
    expect(names).toContain('data-visual-open');
    expect(names).toContain('data-state');
  });

  it('resize handler calls events.open with hasAnimation: false', () => {
    const openSpy = jest.fn();
    const configs = handler.common.accordion();
    const ref = createRef({ events: { open: openSpy } });

    const resizeHandler = configs.find((c) => c.name === 'resize')!;
    resizeHandler.handler(ref, null, 'true');

    expect(openSpy).toHaveBeenCalledWith({ hasAnimation: false });
  });

  it('visual open handler calls events.open with hasAnimation: true', () => {
    const openSpy = jest.fn();
    const closeSpy = jest.fn();
    const configs = handler.common.accordion();
    const ref = createRef({ events: { open: openSpy, close: closeSpy } });

    const visualHandler = configs.find((c) => c.name === 'data-visual-open')!;
    visualHandler.handler(ref, 'false', 'true');
    expect(openSpy).toHaveBeenCalledWith({ hasAnimation: true });
  });

  it('visual close handler calls events.close with hasAnimation: true', () => {
    const closeSpy = jest.fn();
    const configs = handler.common.accordion();
    const ref = createRef({ events: { close: closeSpy } });

    const visualHandler = configs.find((c) => c.name === 'data-visual-open')!;
    visualHandler.handler(ref, 'true', 'false');
    expect(closeSpy).toHaveBeenCalledWith({ hasAnimation: true });
  });

  it('deprecated state handlers are included', () => {
    const openSpy = jest.fn();
    const closeSpy = jest.fn();
    const configs = handler.common.accordion();
    const ref = createRef({ events: { open: openSpy, close: closeSpy } });

    const stateHandler = configs.find((c) => c.name === 'data-state')!;

    stateHandler.handler(ref, 'closed', 'open');
    expect(openSpy).toHaveBeenCalledWith({ hasAnimation: true });

    stateHandler.handler(ref, 'open', 'closed');
    expect(closeSpy).toHaveBeenCalledWith({ hasAnimation: true });
  });
});

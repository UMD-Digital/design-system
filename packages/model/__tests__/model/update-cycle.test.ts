import { Model } from '../../source';
import { UpdateScheduler } from '../../source/model/update-cycle';
import type { ComponentRef, ReactiveController, PropertyValues } from '../../source/_types';

// Save the mocked customElements from setup.ts
const mockedCustomElements = window.customElements;

let hasNativeCustomElements = false;

beforeAll(() => {
  delete (window as any).customElements;

  if (
    window.customElements &&
    typeof window.customElements.define === 'function'
  ) {
    hasNativeCustomElements = true;
  } else {
    Object.defineProperty(window, 'customElements', {
      value: mockedCustomElements,
      writable: true,
      configurable: true,
    });
  }
});

afterAll(() => {
  Object.defineProperty(window, 'customElements', {
    value: mockedCustomElements,
    writable: true,
    configurable: true,
  });
});

let tagCounter = 0;
function uniqueTag(prefix = 'test-uc') {
  return `${prefix}-${++tagCounter}`;
}

function createComponent(): ComponentRef {
  return {
    element: document.createElement('div'),
    styles: '.test { color: red; }',
  };
}

function defineAndCreate(
  config: Parameters<typeof Model.createCustomElement>[0],
) {
  const El = Model.createCustomElement(config);

  if (!hasNativeCustomElements) return { El, el: null as any };

  const tag = config.tagName;
  if (!customElements.get(tag)) {
    customElements.define(tag, El);
  }
  const el = document.createElement(tag) as any;
  return { El, el };
}

describe('UpdateScheduler (unit)', () => {
  it('single schedule produces one update', async () => {
    const spy = jest.fn(() => true);
    const scheduler = new UpdateScheduler(spy);

    scheduler.schedule();
    await scheduler.updateComplete;

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('multiple schedule calls before microtask produce one update', async () => {
    const spy = jest.fn(() => true);
    const scheduler = new UpdateScheduler(spy);

    scheduler.schedule();
    scheduler.schedule();
    scheduler.schedule();
    await scheduler.updateComplete;

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('updateComplete resolves after update', async () => {
    let updated = false;
    const scheduler = new UpdateScheduler(() => {
      updated = true;
      return true;
    });

    scheduler.schedule();
    const result = await scheduler.updateComplete;

    expect(updated).toBe(true);
    expect(result).toBe(true);
  });

  it('re-entrant schedule during performUpdate queues new microtask', async () => {
    let callCount = 0;
    const scheduler = new UpdateScheduler(() => {
      callCount++;
      if (callCount === 1) {
        scheduler.schedule();
      }
      return true;
    });

    scheduler.schedule();
    await scheduler.updateComplete;

    expect(callCount).toBe(2);
  });
});

describe('Update cycle integration', () => {
  const describeInstance = hasNativeCustomElements ? describe : describe.skip;

  describeInstance('batching', () => {
    it('sets two properties synchronously and batches into one update cycle', async () => {
      const willUpdateSpy = jest.fn();
      const updateSpy = jest.fn();
      const updatedSpy = jest.fn();

      const tag = uniqueTag();
      const { el } = defineAndCreate({
        tagName: tag,
        reactiveAttributes: {
          count: { type: 'number', defaultValue: 0 },
          theme: { type: 'string', defaultValue: 'light' },
        },
        willUpdate: willUpdateSpy,
        update: updateSpy,
        updated: updatedSpy,
        createComponent,
      });

      document.body.appendChild(el);

      // Reset spies after connection-time flush
      willUpdateSpy.mockClear();
      updateSpy.mockClear();
      updatedSpy.mockClear();

      el.count = 42;
      el.theme = 'dark';

      await el.updateComplete;

      expect(willUpdateSpy).toHaveBeenCalledTimes(1);
      expect(updateSpy).toHaveBeenCalledTimes(1);
      expect(updatedSpy).toHaveBeenCalledTimes(1);

      // Check changedProperties contains both
      const changedProps: PropertyValues = updatedSpy.mock.calls[0][1];
      expect(changedProps.has('count')).toBe(true);
      expect(changedProps.has('theme')).toBe(true);

      document.body.removeChild(el);
    });

    it('changedProperties contains correct old values (first old value per property)', async () => {
      const updatedSpy = jest.fn();

      const tag = uniqueTag();
      const { el } = defineAndCreate({
        tagName: tag,
        reactiveAttributes: {
          count: { type: 'number', defaultValue: 0 },
        },
        updated: updatedSpy,
        createComponent,
      });

      document.body.appendChild(el);
      updatedSpy.mockClear();

      el.count = 10;
      el.count = 20;

      await el.updateComplete;

      const changedProps: PropertyValues = updatedSpy.mock.calls[0][1];
      // First old value was 0 (before count changed to 10)
      expect(changedProps.get('count')).toBe(0);

      document.body.removeChild(el);
    });

    it('onChange fires synchronously per property, update cycle fires once', async () => {
      const onChangeSpy = jest.fn();
      const updatedSpy = jest.fn();

      const tag = uniqueTag();
      const { el } = defineAndCreate({
        tagName: tag,
        reactiveAttributes: {
          count: { type: 'number', defaultValue: 0, onChange: onChangeSpy },
        },
        updated: updatedSpy,
        createComponent,
      });

      document.body.appendChild(el);
      onChangeSpy.mockClear();
      updatedSpy.mockClear();

      el.count = 10;
      el.count = 20;

      // onChange fires synchronously — should have fired twice already
      expect(onChangeSpy).toHaveBeenCalledTimes(2);

      await el.updateComplete;

      // But updated fires only once (batched)
      expect(updatedSpy).toHaveBeenCalledTimes(1);

      document.body.removeChild(el);
    });
  });

  describeInstance('lifecycle order', () => {
    it('willUpdate → update → updated', async () => {
      const order: string[] = [];

      const tag = uniqueTag();
      const { el } = defineAndCreate({
        tagName: tag,
        reactiveAttributes: {
          count: { type: 'number', defaultValue: 0 },
        },
        willUpdate: () => order.push('willUpdate'),
        update: () => order.push('update'),
        updated: () => order.push('updated'),
        createComponent,
      });

      document.body.appendChild(el);
      order.length = 0;

      el.count = 1;
      await el.updateComplete;

      expect(order).toEqual(['willUpdate', 'update', 'updated']);

      document.body.removeChild(el);
    });

    it('controller hostUpdate before willUpdate, hostUpdated after updated', async () => {
      const order: string[] = [];

      const controller: ReactiveController = {
        hostUpdate: () => order.push('hostUpdate'),
        hostUpdated: () => order.push('hostUpdated'),
      };

      const tag = uniqueTag();
      const { el } = defineAndCreate({
        tagName: tag,
        reactiveAttributes: {
          count: { type: 'number', defaultValue: 0 },
        },
        willUpdate: () => order.push('willUpdate'),
        updated: () => order.push('updated'),
        createComponent,
      });

      document.body.appendChild(el);
      el.addController(controller);
      order.length = 0;

      el.count = 1;
      await el.updateComplete;

      expect(order).toEqual(['hostUpdate', 'willUpdate', 'updated', 'hostUpdated']);

      document.body.removeChild(el);
    });
  });

  describeInstance('config-based hooks', () => {
    it('config willUpdate/update/updated receive (host, changedProperties)', async () => {
      const willUpdateSpy = jest.fn();
      const updateSpy = jest.fn();
      const updatedSpy = jest.fn();

      const tag = uniqueTag();
      const { el } = defineAndCreate({
        tagName: tag,
        reactiveAttributes: {
          count: { type: 'number', defaultValue: 0 },
        },
        willUpdate: willUpdateSpy,
        update: updateSpy,
        updated: updatedSpy,
        createComponent,
      });

      document.body.appendChild(el);
      willUpdateSpy.mockClear();
      updateSpy.mockClear();
      updatedSpy.mockClear();

      el.count = 5;
      await el.updateComplete;

      expect(willUpdateSpy).toHaveBeenCalledWith(el, expect.any(Map));
      expect(updateSpy).toHaveBeenCalledWith(el, expect.any(Map));
      expect(updatedSpy).toHaveBeenCalledWith(el, expect.any(Map));

      // Verify the map content
      const props: PropertyValues = willUpdateSpy.mock.calls[0][1];
      expect(props.get('count')).toBe(0);

      document.body.removeChild(el);
    });
  });

  describeInstance('edge cases', () => {
    it('manual requestUpdate() with no args triggers cycle with empty changedProperties', async () => {
      const updatedSpy = jest.fn();

      const tag = uniqueTag();
      const { el } = defineAndCreate({
        tagName: tag,
        updated: updatedSpy,
        createComponent,
      });

      document.body.appendChild(el);
      updatedSpy.mockClear();

      el.requestUpdate();
      await el.updateComplete;

      expect(updatedSpy).toHaveBeenCalledTimes(1);
      const changedProps: PropertyValues = updatedSpy.mock.calls[0][1];
      expect(changedProps.size).toBe(0);

      document.body.removeChild(el);
    });

    it('updates before connection are deferred until connectedCallback', async () => {
      const updatedSpy = jest.fn();

      const tag = uniqueTag();
      const { el } = defineAndCreate({
        tagName: tag,
        reactiveAttributes: {
          count: { type: 'number', defaultValue: 0 },
        },
        updated: updatedSpy,
        createComponent,
      });

      // Set property before connecting
      el.count = 42;

      // Updated should NOT have fired yet
      expect(updatedSpy).not.toHaveBeenCalled();

      document.body.appendChild(el);
      await el.updateComplete;

      // Now the deferred update should have fired
      expect(updatedSpy).toHaveBeenCalled();
      const changedProps: PropertyValues = updatedSpy.mock.calls[0][1];
      expect(changedProps.has('count')).toBe(true);

      document.body.removeChild(el);
    });

    it('re-entrant update from updated() schedules a new cycle', async () => {
      let updateCount = 0;

      const tag = uniqueTag();
      const { el } = defineAndCreate({
        tagName: tag,
        reactiveAttributes: {
          count: { type: 'number', defaultValue: 0 },
        },
        updated: (host: HTMLElement) => {
          updateCount++;
          if (updateCount === 1) {
            (host as any).count = 99;
          }
        },
        createComponent,
      });

      document.body.appendChild(el);
      updateCount = 0;

      el.count = 1;
      await el.updateComplete;

      // Should have been called at least twice: once for count=1, once for count=99
      expect(updateCount).toBeGreaterThanOrEqual(2);
      expect(el.count).toBe(99);

      document.body.removeChild(el);
    });

    it('error in willUpdate is caught gracefully', async () => {
      const errorSpy = jest.spyOn(console, 'error').mockImplementation();

      const tag = uniqueTag();
      const { el } = defineAndCreate({
        tagName: tag,
        reactiveAttributes: {
          count: { type: 'number', defaultValue: 0 },
        },
        willUpdate: () => {
          throw new Error('willUpdate error');
        },
        createComponent,
      });

      document.body.appendChild(el);

      el.count = 1;

      // Should not throw
      const result = await el.updateComplete;
      expect(result).toBe(false);

      errorSpy.mockRestore();
      document.body.removeChild(el);
    });

    it('backwards compatibility: components without update hooks work unchanged', async () => {
      const tag = uniqueTag();
      const { el } = defineAndCreate({
        tagName: tag,
        createComponent,
      });

      expect(() => {
        document.body.appendChild(el);
      }).not.toThrow();

      expect(el.getRef()).not.toBeNull();

      document.body.removeChild(el);
    });
  });

  describeInstance('removeController', () => {
    it('removes controller so hostDisconnected is not called for removed controller', () => {
      const tag = uniqueTag();
      const controller: ReactiveController = {
        hostConnected: jest.fn(),
        hostDisconnected: jest.fn(),
      };

      const { el } = defineAndCreate({
        tagName: tag,
        createComponent,
      });

      document.body.appendChild(el);
      el.addController(controller);
      el.removeController(controller);

      document.body.removeChild(el);

      expect(controller.hostDisconnected).not.toHaveBeenCalled();
    });

    it('removed controller does not receive hostUpdate/hostUpdated', async () => {
      const tag = uniqueTag();
      const controller: ReactiveController = {
        hostUpdate: jest.fn(),
        hostUpdated: jest.fn(),
      };

      const { el } = defineAndCreate({
        tagName: tag,
        reactiveAttributes: {
          count: { type: 'number', defaultValue: 0 },
        },
        createComponent,
      });

      document.body.appendChild(el);
      el.addController(controller);
      el.removeController(controller);

      el.count = 1;
      await el.updateComplete;

      expect(controller.hostUpdate).not.toHaveBeenCalled();
      expect(controller.hostUpdated).not.toHaveBeenCalled();

      document.body.removeChild(el);
    });
  });
});

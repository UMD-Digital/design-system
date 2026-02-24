import { Model } from '../source';
import type { ComponentRef, ReactiveController } from '../source/_types';

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
function uniqueTag(prefix = 'test-model') {
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

  if (!hasNativeCustomElements) return { El, el: null };

  const tag = config.tagName;
  if (!customElements.get(tag)) {
    customElements.define(tag, El);
  }
  const el = document.createElement(tag) as any;
  return { El, el };
}

describe('Model', () => {
  describe('createCustomElement', () => {
    it('should create a custom element class', () => {
      const CustomElement = Model.createCustomElement({
        tagName: 'test-element',
        createComponent,
      });

      expect(CustomElement).toBeDefined();
      expect(CustomElement.prototype).toBeInstanceOf(HTMLElement);
    });

    it('should accept valid config', () => {
      const CustomElement = Model.createCustomElement({
        tagName: 'test-valid-element',
        createComponent,
      });

      expect(CustomElement).toBeDefined();
      expect(CustomElement.componentConfig).toBeDefined();
      expect(CustomElement.componentConfig.tagName).toBe('test-valid-element');
    });
  });

  describe('controller lifecycle', () => {
    it('should call hostConnected on controllers during initialization', () => {
      if (!hasNativeCustomElements) return;

      const tag = uniqueTag('test-ctrl');
      const controller: ReactiveController = {
        hostConnected: jest.fn(),
        hostDisconnected: jest.fn(),
      };

      const { el } = defineAndCreate({
        tagName: tag,
        createComponent,
        afterConnect: () => {
          el.addController(controller);
        },
      });

      document.body.appendChild(el);

      // Controller added in afterConnect — hostConnected called immediately
      // because the component is already connected at that point
      expect(controller.hostConnected).toHaveBeenCalled();

      document.body.removeChild(el);
    });

    it('should call hostDisconnected on cleanup', () => {
      if (!hasNativeCustomElements) return;

      const tag = uniqueTag('test-ctrl');
      const controller: ReactiveController = {
        hostConnected: jest.fn(),
        hostDisconnected: jest.fn(),
      };

      const { el } = defineAndCreate({
        tagName: tag,
        createComponent,
        afterConnect: () => {
          el.addController(controller);
        },
      });

      document.body.appendChild(el);
      document.body.removeChild(el);

      expect(controller.hostDisconnected).toHaveBeenCalled();
    });

    it('should call hostConnected immediately when adding to already-connected host', () => {
      if (!hasNativeCustomElements) return;

      const tag = uniqueTag('test-ctrl');
      const controller: ReactiveController = {
        hostConnected: jest.fn(),
      };

      const { el } = defineAndCreate({
        tagName: tag,
        createComponent,
      });

      document.body.appendChild(el);

      el.addController(controller);
      expect(controller.hostConnected).toHaveBeenCalled();

      document.body.removeChild(el);
    });

    it('should not duplicate controllers on repeated add', () => {
      if (!hasNativeCustomElements) return;

      const tag = uniqueTag('test-ctrl');
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
      el.addController(controller);

      document.body.removeChild(el);

      // hostDisconnected called only once since Set prevents duplicates
      expect(controller.hostDisconnected).toHaveBeenCalledTimes(1);
    });

    it('should catch errors thrown by controllers gracefully', () => {
      if (!hasNativeCustomElements) return;

      const tag = uniqueTag('test-ctrl');
      const badController: ReactiveController = {
        hostConnected: jest.fn(),
        hostDisconnected: () => {
          throw new Error('controller error');
        },
      };

      const { el } = defineAndCreate({
        tagName: tag,
        createComponent,
      });

      document.body.appendChild(el);
      el.addController(badController);

      expect(() => {
        document.body.removeChild(el);
      }).not.toThrow();
    });

    it('should have addController on the BaseComponent class', () => {
      const El = Model.createCustomElement({
        tagName: uniqueTag('test-ctrl'),
        createComponent,
      });

      expect(typeof El.prototype.addController).toBe('function');
    });
  });

  describe('slot query convenience methods', () => {
    it('should expose querySlot, querySlotElement, and hasSlotContent on the class', () => {
      const El = Model.createCustomElement({
        tagName: uniqueTag('test-slotq'),
        createComponent,
      });

      expect(typeof El.prototype.querySlot).toBe('function');
      expect(typeof El.prototype.querySlotElement).toBe('function');
      expect(typeof El.prototype.hasSlotContent).toBe('function');
    });

    it('should return results from querySlot on connected element', () => {
      if (!hasNativeCustomElements) return;

      const tag = uniqueTag('test-slotq');
      const { el } = defineAndCreate({
        tagName: tag,
        createComponent: () => {
          const wrapper = document.createElement('div');
          const slot = document.createElement('slot');
          wrapper.appendChild(slot);
          return { element: wrapper, styles: '' };
        },
      });

      document.body.appendChild(el);

      // querySlot should return an array (empty when no slotted content)
      expect(Array.isArray(el.querySlot())).toBe(true);
      expect(typeof el.hasSlotContent()).toBe('boolean');
      expect(el.querySlotElement()).toBeNull();

      document.body.removeChild(el);
    });
  });

  describe('migrated slot observers', () => {
    it('should set up slot observers using createSlotchangeHandler', () => {
      if (!hasNativeCustomElements) return;

      const tag = uniqueTag('test-slotobs');
      const { el } = defineAndCreate({
        tagName: tag,
        slots: {
          headline: { required: true, allowedElements: ['h2', 'h3'] },
        },
        createComponent: () => {
          const wrapper = document.createElement('div');
          const slot = document.createElement('slot');
          slot.setAttribute('name', 'headline');
          wrapper.appendChild(slot);
          return { element: wrapper, styles: '' };
        },
      });

      expect(() => {
        document.body.appendChild(el);
      }).not.toThrow();

      expect(() => {
        document.body.removeChild(el);
      }).not.toThrow();
    });

    it('should handle components with no slots config', () => {
      if (!hasNativeCustomElements) return;

      const tag = uniqueTag('test-slotobs');
      const { el } = defineAndCreate({
        tagName: tag,
        createComponent,
      });

      expect(() => {
        document.body.appendChild(el);
        document.body.removeChild(el);
      }).not.toThrow();
    });

    it('should accept slot config without errors (static check)', () => {
      const El = Model.createCustomElement({
        tagName: uniqueTag('test-slotobs'),
        slots: {
          headline: { required: true },
          subText: { allowedElements: ['span', 'p'] },
        },
        createComponent,
      });

      expect(El.componentConfig.slots).toBeDefined();
      expect(El.componentConfig.slots!.headline.required).toBe(true);
    });
  });

  describe('lifecycle hooks', () => {
    it('firstConnected called on first connection with (host, shadow) args', () => {
      if (!hasNativeCustomElements) return;

      const tag = uniqueTag('test-lc');
      const firstConnected = jest.fn();

      const { el } = defineAndCreate({
        tagName: tag,
        createComponent,
        firstConnected,
      });

      document.body.appendChild(el);

      expect(firstConnected).toHaveBeenCalledTimes(1);
      expect(firstConnected).toHaveBeenCalledWith(el, el.getShadowRoot());

      document.body.removeChild(el);
    });

    it('firstConnected NOT called on reconnection', () => {
      if (!hasNativeCustomElements) return;

      const tag = uniqueTag('test-lc');
      const firstConnected = jest.fn();

      const { el } = defineAndCreate({
        tagName: tag,
        createComponent,
        firstConnected,
      });

      document.body.appendChild(el);
      document.body.removeChild(el);
      document.body.appendChild(el);

      expect(firstConnected).toHaveBeenCalledTimes(1);

      document.body.removeChild(el);
    });

    it('firstConnected runs before createComponent', () => {
      if (!hasNativeCustomElements) return;

      const tag = uniqueTag('test-lc');
      const order: string[] = [];

      const { el } = defineAndCreate({
        tagName: tag,
        firstConnected: () => order.push('firstConnected'),
        createComponent: () => {
          order.push('createComponent');
          return createComponent();
        },
      });

      document.body.appendChild(el);

      expect(order[0]).toBe('firstConnected');
      expect(order[1]).toBe('createComponent');

      document.body.removeChild(el);
    });

    it('willFirstUpdate called before createComponent on first init', () => {
      if (!hasNativeCustomElements) return;

      const tag = uniqueTag('test-lc');
      const order: string[] = [];

      const { el } = defineAndCreate({
        tagName: tag,
        willFirstUpdate: () => order.push('willFirstUpdate'),
        createComponent: () => {
          order.push('createComponent');
          return createComponent();
        },
      });

      document.body.appendChild(el);

      expect(order.indexOf('willFirstUpdate')).toBeLessThan(
        order.indexOf('createComponent'),
      );

      document.body.removeChild(el);
    });

    it('willFirstUpdate NOT called on reconnection', () => {
      if (!hasNativeCustomElements) return;

      const tag = uniqueTag('test-lc');
      const willFirstUpdate = jest.fn();

      const { el } = defineAndCreate({
        tagName: tag,
        createComponent,
        willFirstUpdate,
      });

      document.body.appendChild(el);
      document.body.removeChild(el);
      document.body.appendChild(el);

      expect(willFirstUpdate).toHaveBeenCalledTimes(1);

      document.body.removeChild(el);
    });

    it('willFirstUpdate receives (host, shadow) args', () => {
      if (!hasNativeCustomElements) return;

      const tag = uniqueTag('test-lc');
      const willFirstUpdate = jest.fn();

      const { el } = defineAndCreate({
        tagName: tag,
        createComponent,
        willFirstUpdate,
      });

      document.body.appendChild(el);

      expect(willFirstUpdate).toHaveBeenCalledWith(el, el.getShadowRoot());

      document.body.removeChild(el);
    });

    it('full lifecycle order: firstConnected → willFirstUpdate → createComponent → beforeConnect → afterConnect → onReady', async () => {
      if (!hasNativeCustomElements) return;

      const tag = uniqueTag('test-lc');
      const order: string[] = [];

      const { el } = defineAndCreate({
        tagName: tag,
        firstConnected: () => order.push('firstConnected'),
        willFirstUpdate: () => order.push('willFirstUpdate'),
        createComponent: () => {
          order.push('createComponent');
          return createComponent();
        },
        beforeConnect: () => order.push('beforeConnect'),
        afterConnect: () => order.push('afterConnect'),
        onReady: () => order.push('onReady'),
      });

      document.body.appendChild(el);

      // Wait for async lifecycle callbacks
      await new Promise((r) => setTimeout(r, 0));

      expect(order).toEqual([
        'firstConnected',
        'willFirstUpdate',
        'createComponent',
        'beforeConnect',
        'afterConnect',
        'onReady',
      ]);

      document.body.removeChild(el);
    });

    it('error in firstConnected caught gracefully, does not prevent initialization', () => {
      if (!hasNativeCustomElements) return;

      const tag = uniqueTag('test-lc');
      const createComponentFn = jest.fn(createComponent);

      const { el } = defineAndCreate({
        tagName: tag,
        firstConnected: () => {
          throw new Error('firstConnected error');
        },
        createComponent: createComponentFn,
      });

      expect(() => {
        document.body.appendChild(el);
      }).not.toThrow();

      expect(createComponentFn).toHaveBeenCalled();

      document.body.removeChild(el);
    });

    it('error in willFirstUpdate caught gracefully, does not prevent component creation', () => {
      if (!hasNativeCustomElements) return;

      const tag = uniqueTag('test-lc');
      const createComponentFn = jest.fn(createComponent);

      const { el } = defineAndCreate({
        tagName: tag,
        willFirstUpdate: () => {
          throw new Error('willFirstUpdate error');
        },
        createComponent: createComponentFn,
      });

      expect(() => {
        document.body.appendChild(el);
      }).not.toThrow();

      expect(createComponentFn).toHaveBeenCalled();

      document.body.removeChild(el);
    });

    it('getShadowRoot() returns the shadow root', () => {
      if (!hasNativeCustomElements) return;

      const tag = uniqueTag('test-lc');
      const { el } = defineAndCreate({
        tagName: tag,
        createComponent,
      });

      document.body.appendChild(el);

      const sr = el.getShadowRoot();
      expect(sr).toBeInstanceOf(ShadowRoot);
      expect(sr).toBe(el.shadowRoot);

      document.body.removeChild(el);
    });

    it('getShadowRoot exists on class prototype', () => {
      const El = Model.createCustomElement({
        tagName: uniqueTag('test-lc'),
        createComponent,
      });

      expect(typeof El.prototype.getShadowRoot).toBe('function');
    });

    it('works without hooks (backwards compatibility)', () => {
      if (!hasNativeCustomElements) return;

      const tag = uniqueTag('test-lc');
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

    it('config stores hooks on componentConfig', () => {
      const firstConnected = jest.fn();
      const willFirstUpdate = jest.fn();

      const El = Model.createCustomElement({
        tagName: uniqueTag('test-lc'),
        createComponent,
        firstConnected,
        willFirstUpdate,
      });

      expect(El.componentConfig.firstConnected).toBe(firstConnected);
      expect(El.componentConfig.willFirstUpdate).toBe(willFirstUpdate);
    });
  });
});

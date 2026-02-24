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
});

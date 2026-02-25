import { Model } from '../../source';
import {
  IntersectionController,
  MediaQueryController,
} from '../../source/model/controllers';
import type { ReactiveController } from '../../source/_types';

// Saved by setup.ts before mock override
const nativeCustomElements = (window as any).__nativeCustomElements;

const savedMockCustomElements = window.customElements;

let counter = 0;
const uniqueTag = () => `test-ctrl-${counter++}`;

const defineAndCreate = (tagName: string) => {
  const CustomElement = Model.createCustomElement({
    tagName,
    createComponent: () => ({
      element: document.createElement('div'),
      styles: '',
    }),
  });
  window.customElements.define(tagName, CustomElement);
  const el = document.createElement(tagName);
  document.body.appendChild(el);
  return el;
};

describe('Controllers', () => {
  beforeAll(() => {
    // Restore native JSDOM customElements (saved by setup.ts before mock)
    Object.defineProperty(window, 'customElements', {
      value: nativeCustomElements,
      writable: true,
      configurable: true,
    });
  });

  afterAll(() => {
    // Restore mock for other test files
    Object.defineProperty(window, 'customElements', {
      value: savedMockCustomElements,
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('Controller lifecycle', () => {
    it('hostConnected is called during component initialization', () => {
      const tag = uniqueTag();
      const controller: ReactiveController = {
        hostConnected: jest.fn(),
        hostDisconnected: jest.fn(),
      };

      const CustomElement = Model.createCustomElement({
        tagName: tag,
        createComponent: (host) => {
          (host as any).addController(controller);
          return { element: document.createElement('div'), styles: '' };
        },
      });
      window.customElements.define(tag, CustomElement);
      const el = document.createElement(tag);
      document.body.appendChild(el);

      expect(controller.hostConnected).toHaveBeenCalledTimes(1);
    });

    it('hostDisconnected is called on cleanup', () => {
      const tag = uniqueTag();
      const controller: ReactiveController = {
        hostConnected: jest.fn(),
        hostDisconnected: jest.fn(),
      };

      const CustomElement = Model.createCustomElement({
        tagName: tag,
        createComponent: (host) => {
          (host as any).addController(controller);
          return { element: document.createElement('div'), styles: '' };
        },
      });
      window.customElements.define(tag, CustomElement);
      const el = document.createElement(tag);
      document.body.appendChild(el);
      el.remove();

      expect(controller.hostDisconnected).toHaveBeenCalledTimes(1);
    });

    it('hostConnected called immediately when adding to already-connected host', () => {
      const tag = uniqueTag();
      const el = defineAndCreate(tag);

      const controller: ReactiveController = {
        hostConnected: jest.fn(),
      };

      (el as any).addController(controller);
      expect(controller.hostConnected).toHaveBeenCalledTimes(1);
    });

    it('Set prevents duplicate controllers', () => {
      const tag = uniqueTag();
      const controller: ReactiveController = {
        hostConnected: jest.fn(),
        hostDisconnected: jest.fn(),
      };

      const CustomElement = Model.createCustomElement({
        tagName: tag,
        createComponent: (host) => {
          (host as any).addController(controller);
          (host as any).addController(controller);
          return { element: document.createElement('div'), styles: '' };
        },
      });
      window.customElements.define(tag, CustomElement);
      const el = document.createElement(tag);
      document.body.appendChild(el);

      expect(controller.hostConnected).toHaveBeenCalledTimes(1);
    });

    it('errors in controllers are caught gracefully', () => {
      const tag = uniqueTag();
      const errorSpy = jest.spyOn(console, 'error').mockImplementation();

      const badController: ReactiveController = {
        hostConnected: () => {
          throw new Error('controller error');
        },
      };
      const goodController: ReactiveController = {
        hostConnected: jest.fn(),
      };

      const CustomElement = Model.createCustomElement({
        tagName: tag,
        createComponent: (host) => {
          (host as any).addController(badController);
          (host as any).addController(goodController);
          return { element: document.createElement('div'), styles: '' };
        },
      });
      window.customElements.define(tag, CustomElement);
      const el = document.createElement(tag);
      document.body.appendChild(el);

      expect(goodController.hostConnected).toHaveBeenCalledTimes(1);
      errorSpy.mockRestore();
    });
  });

  describe('removeController', () => {
    it('removed controller does not receive hostDisconnected', () => {
      const tag = uniqueTag();
      const controller: ReactiveController = {
        hostConnected: jest.fn(),
        hostDisconnected: jest.fn(),
      };

      const CustomElement = Model.createCustomElement({
        tagName: tag,
        createComponent: (host) => {
          (host as any).addController(controller);
          return { element: document.createElement('div'), styles: '' };
        },
      });
      window.customElements.define(tag, CustomElement);
      const el = document.createElement(tag);
      document.body.appendChild(el);

      (el as any).removeController(controller);
      el.remove();

      expect(controller.hostDisconnected).not.toHaveBeenCalled();
    });
  });

  describe('requestUpdate / updateComplete stubs', () => {
    it('requestUpdate is callable without error', () => {
      const tag = uniqueTag();
      const el = defineAndCreate(tag);
      expect(() => (el as any).requestUpdate()).not.toThrow();
    });

    it('updateComplete resolves to true', async () => {
      const tag = uniqueTag();
      const el = defineAndCreate(tag);
      const result = await (el as any).updateComplete;
      expect(result).toBe(true);
    });
  });

  describe('IntersectionController', () => {
    let mockObserve: jest.Mock;
    let mockDisconnect: jest.Mock;
    let mockIntersectionObserver: jest.Mock;

    beforeAll(() => {
      mockObserve = jest.fn();
      mockDisconnect = jest.fn();
      mockIntersectionObserver = jest.fn(() => ({
        observe: mockObserve,
        disconnect: mockDisconnect,
        unobserve: jest.fn(),
      }));
      (window as any).IntersectionObserver = mockIntersectionObserver;
    });

    afterAll(() => {
      delete (window as any).IntersectionObserver;
    });

    beforeEach(() => {
      mockObserve.mockClear();
      mockDisconnect.mockClear();
      mockIntersectionObserver.mockClear();
    });

    it('creates observer on hostConnected', () => {
      const tag = uniqueTag();
      const CustomElement = Model.createCustomElement({
        tagName: tag,
        createComponent: (host) => {
          new IntersectionController(host as any);
          return { element: document.createElement('div'), styles: '' };
        },
      });
      window.customElements.define(tag, CustomElement);
      const el = document.createElement(tag);
      document.body.appendChild(el);

      expect(mockIntersectionObserver).toHaveBeenCalledTimes(1);
      expect(mockObserve).toHaveBeenCalledWith(el);
    });

    it('disconnects observer on hostDisconnected', () => {
      const tag = uniqueTag();
      const CustomElement = Model.createCustomElement({
        tagName: tag,
        createComponent: (host) => {
          new IntersectionController(host as any);
          return { element: document.createElement('div'), styles: '' };
        },
      });
      window.customElements.define(tag, CustomElement);
      const el = document.createElement(tag);
      document.body.appendChild(el);
      el.remove();

      expect(mockDisconnect).toHaveBeenCalledTimes(1);
    });

    it('initial isIntersecting is false', () => {
      const tag = uniqueTag();
      let ctrl!: IntersectionController;
      const CustomElement = Model.createCustomElement({
        tagName: tag,
        createComponent: (host) => {
          ctrl = new IntersectionController(host as any);
          return { element: document.createElement('div'), styles: '' };
        },
      });
      window.customElements.define(tag, CustomElement);
      const el = document.createElement(tag);
      document.body.appendChild(el);

      expect(ctrl.isIntersecting).toBe(false);
    });
  });

  describe('MediaQueryController', () => {
    let mockAddEventListener: jest.Mock;
    let mockRemoveEventListener: jest.Mock;

    beforeAll(() => {
      mockAddEventListener = jest.fn();
      mockRemoveEventListener = jest.fn();
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        configurable: true,
        value: jest.fn((query: string) => ({
          matches: false,
          media: query,
          addEventListener: mockAddEventListener,
          removeEventListener: mockRemoveEventListener,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          onchange: null,
          dispatchEvent: jest.fn(),
        })),
      });
    });

    beforeEach(() => {
      mockAddEventListener.mockClear();
      mockRemoveEventListener.mockClear();
      (window.matchMedia as jest.Mock).mockClear();
    });

    it('reads initial match state on hostConnected', () => {
      const tag = uniqueTag();
      let ctrl!: MediaQueryController;
      const CustomElement = Model.createCustomElement({
        tagName: tag,
        createComponent: (host) => {
          ctrl = new MediaQueryController(host as any, '(min-width: 768px)');
          return { element: document.createElement('div'), styles: '' };
        },
      });
      window.customElements.define(tag, CustomElement);
      const el = document.createElement(tag);
      document.body.appendChild(el);

      expect(window.matchMedia).toHaveBeenCalledWith('(min-width: 768px)');
      expect(ctrl.matches).toBe(false);
    });

    it('cleans up listener on hostDisconnected', () => {
      const tag = uniqueTag();
      const CustomElement = Model.createCustomElement({
        tagName: tag,
        createComponent: (host) => {
          new MediaQueryController(host as any, '(min-width: 768px)');
          return { element: document.createElement('div'), styles: '' };
        },
      });
      window.customElements.define(tag, CustomElement);
      const el = document.createElement(tag);
      document.body.appendChild(el);
      el.remove();

      expect(mockRemoveEventListener).toHaveBeenCalledWith(
        'change',
        expect.any(Function),
      );
    });
  });

  describe('Backwards compatibility', () => {
    it('components without controllers work unchanged', () => {
      const tag = uniqueTag();
      const createComponent = jest.fn(() => ({
        element: document.createElement('div'),
        styles: '.test { color: red; }',
      }));

      const CustomElement = Model.createCustomElement({
        tagName: tag,
        createComponent,
      });
      window.customElements.define(tag, CustomElement);
      const el = document.createElement(tag);
      document.body.appendChild(el);

      expect(createComponent).toHaveBeenCalledTimes(1);
      expect(el.shadowRoot).toBeTruthy();
    });
  });
});

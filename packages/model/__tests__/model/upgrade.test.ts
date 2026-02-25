import { Model } from '../../source';
import type { ReactiveAttributeMap } from '../../source/attributes/config';

// Saved by setup.ts before mock override
const nativeCustomElements = (window as any).__nativeCustomElements;
const savedMockCustomElements = window.customElements;

let counter = 0;
const uniqueTag = () => `test-upgrade-${counter++}-el`;

describe('Pre-upgrade property capture', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'customElements', {
      value: nativeCustomElements,
      writable: true,
      configurable: true,
    });
  });

  afterAll(() => {
    Object.defineProperty(window, 'customElements', {
      value: savedMockCustomElements,
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('preserves pre-upgrade property through reactive getter', () => {
    const tag = uniqueTag();
    const reactiveAttributes: ReactiveAttributeMap = {
      count: { type: 'number', defaultValue: 0 },
    };

    // Create element in DOM before defining the custom element
    const el = document.createElement(tag);
    (el as any).count = 42;
    document.body.appendChild(el);

    // Now define — upgrade runs, should capture pre-upgrade value
    const CustomElement = Model.createCustomElement({
      tagName: tag,
      reactiveAttributes,
      createComponent: () => ({
        element: document.createElement('div'),
        styles: '',
      }),
    });
    window.customElements.define(tag, CustomElement);

    expect((el as any).count).toBe(42);
  });

  it('pre-upgrade property triggers reactivity', async () => {
    const tag = uniqueTag();
    const willUpdateSpy = jest.fn();
    const reactiveAttributes: ReactiveAttributeMap = {
      label: { type: 'string', defaultValue: 'default' },
    };

    const el = document.createElement(tag);
    (el as any).label = 'pre-upgrade-value';
    document.body.appendChild(el);

    const CustomElement = Model.createCustomElement({
      tagName: tag,
      reactiveAttributes,
      willUpdate: willUpdateSpy,
      createComponent: () => ({
        element: document.createElement('div'),
        styles: '',
      }),
    });
    window.customElements.define(tag, CustomElement);

    // Wait for microtask-batched update
    await (el as any).updateComplete;

    expect((el as any).label).toBe('pre-upgrade-value');
    expect(willUpdateSpy).toHaveBeenCalled();
    const changedProps: Map<string, unknown> = willUpdateSpy.mock.calls[0][1];
    expect(changedProps.has('label')).toBe(true);
  });

  it('normal seeding works when no pre-upgrade property exists', () => {
    const tag = uniqueTag();
    const reactiveAttributes: ReactiveAttributeMap = {
      mode: { type: 'string', defaultValue: 'light' },
    };

    const CustomElement = Model.createCustomElement({
      tagName: tag,
      reactiveAttributes,
      createComponent: () => ({
        element: document.createElement('div'),
        styles: '',
      }),
    });
    window.customElements.define(tag, CustomElement);
    const el = document.createElement(tag);
    document.body.appendChild(el);

    expect((el as any).mode).toBe('light');
  });

  it('captures and re-applies multiple pre-upgrade properties', () => {
    const tag = uniqueTag();
    const reactiveAttributes: ReactiveAttributeMap = {
      width: { type: 'number', defaultValue: 100 },
      height: { type: 'number', defaultValue: 200 },
      title: { type: 'string', defaultValue: '' },
    };

    const el = document.createElement(tag);
    (el as any).width = 500;
    (el as any).height = 300;
    (el as any).title = 'Custom Title';
    document.body.appendChild(el);

    const CustomElement = Model.createCustomElement({
      tagName: tag,
      reactiveAttributes,
      createComponent: () => ({
        element: document.createElement('div'),
        styles: '',
      }),
    });
    window.customElements.define(tag, CustomElement);

    expect((el as any).width).toBe(500);
    expect((el as any).height).toBe(300);
    expect((el as any).title).toBe('Custom Title');
  });

  it('pre-upgrade property wins over attribute value', () => {
    const tag = uniqueTag();
    const reactiveAttributes: ReactiveAttributeMap = {
      count: { type: 'number', attribute: 'count', defaultValue: 0 },
    };

    const el = document.createElement(tag);
    el.setAttribute('count', '10');
    (el as any).count = 99;
    document.body.appendChild(el);

    const CustomElement = Model.createCustomElement({
      tagName: tag,
      reactiveAttributes,
      createComponent: () => ({
        element: document.createElement('div'),
        styles: '',
      }),
    });
    window.customElements.define(tag, CustomElement);

    // Property (99) should win over attribute (10)
    expect((el as any).count).toBe(99);
  });

  it('attribute value is used when no pre-upgrade property exists', () => {
    const tag = uniqueTag();
    const reactiveAttributes: ReactiveAttributeMap = {
      count: { type: 'number', attribute: 'count', defaultValue: 0 },
    };

    const el = document.createElement(tag);
    el.setAttribute('count', '10');
    document.body.appendChild(el);

    const CustomElement = Model.createCustomElement({
      tagName: tag,
      reactiveAttributes,
      createComponent: () => ({
        element: document.createElement('div'),
        styles: '',
      }),
    });
    window.customElements.define(tag, CustomElement);

    expect((el as any).count).toBe(10);
  });
});

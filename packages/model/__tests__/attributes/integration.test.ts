import { Model } from '../../source';
import { ChangeDetectors } from '../../source/attributes/change-detection';
import type { ComponentRef } from '../../source/_types';

// Unique tag counter to avoid collisions
let tagCounter = 0;
function uniqueTag() {
  return `test-reactive-${++tagCounter}`;
}

function createComponent(): ComponentRef {
  return {
    element: document.createElement('div'),
    styles: '.test { color: red; }',
  };
}

// Save the mocked customElements from setup.ts
const mockedCustomElements = window.customElements;

// Attempt to restore JSDOM's native custom elements for this test file.
// The setup.ts overrides window.customElements with jest.fn() stubs.
// Deleting the override exposes JSDOM's native implementation (if available).
let hasNativeCustomElements = false;

beforeAll(() => {
  // Remove the mock to reveal JSDOM's native custom elements
  delete (window as any).customElements;

  if (
    window.customElements &&
    typeof window.customElements.define === 'function'
  ) {
    hasNativeCustomElements = true;
  } else {
    // Restore mock if native not available — static tests still work
    Object.defineProperty(window, 'customElements', {
      value: mockedCustomElements,
      writable: true,
      configurable: true,
    });
  }
});

afterAll(() => {
  // Restore mock for other test files
  Object.defineProperty(window, 'customElements', {
    value: mockedCustomElements,
    writable: true,
    configurable: true,
  });
});

function defineAndCreate(config: Parameters<typeof Model.createCustomElement>[0]) {
  const El = Model.createCustomElement(config);

  if (!hasNativeCustomElements) return { El, el: null };

  const tag = config.tagName;
  if (!customElements.get(tag)) {
    customElements.define(tag, El);
  }
  const el = document.createElement(tag) as any;
  return { El, el };
}

describe('Reactive attributes integration', () => {
  describe('observedAttributes merging', () => {
    it('includes both handler and reactive attribute names', () => {
      const El = Model.createCustomElement({
        tagName: uniqueTag(),
        attributes: [{ name: 'resize', handler: jest.fn() }],
        reactiveAttributes: {
          theme: { type: 'string' },
          maxCount: { type: 'number' },
        },
        createComponent,
      });

      expect(El.observedAttributes).toContain('resize');
      expect(El.observedAttributes).toContain('theme');
      expect(El.observedAttributes).toContain('max-count');
    });

    it('deduplicates when same attr appears in both systems', () => {
      const El = Model.createCustomElement({
        tagName: uniqueTag(),
        attributes: [{ name: 'theme', handler: jest.fn() }],
        reactiveAttributes: {
          theme: { type: 'string' },
        },
        createComponent,
      });

      const observed = El.observedAttributes;
      const unique = [...new Set(observed)];
      expect(observed.length).toBe(unique.length);
    });

    it('excludes attribute: false entries', () => {
      const El = Model.createCustomElement({
        tagName: uniqueTag(),
        reactiveAttributes: {
          theme: { type: 'string' },
          internal: { attribute: false, defaultValue: 'x' },
        },
        createComponent,
      });

      expect(El.observedAttributes).toContain('theme');
      expect(El.observedAttributes).not.toContain('internal');
    });

    it('uses custom attribute name', () => {
      const El = Model.createCustomElement({
        tagName: uniqueTag(),
        reactiveAttributes: {
          theme: { attribute: 'data-theme', type: 'string' },
        },
        createComponent,
      });

      expect(El.observedAttributes).toContain('data-theme');
      expect(El.observedAttributes).not.toContain('theme');
    });

    it('returns only handler attrs when no reactiveAttributes', () => {
      const El = Model.createCustomElement({
        tagName: uniqueTag(),
        attributes: [{ name: 'resize', handler: jest.fn() }],
        createComponent,
      });

      expect(El.observedAttributes).toEqual(['resize']);
    });

    it('returns empty when no attributes of either kind', () => {
      const El = Model.createCustomElement({
        tagName: uniqueTag(),
        createComponent,
      });

      expect(El.observedAttributes).toEqual([]);
    });
  });

  describe('class creation', () => {
    it('stores reactiveAttributes in componentConfig', () => {
      const reactiveAttributes = {
        theme: { type: 'string' as const, defaultValue: 'light' },
      };

      const El = Model.createCustomElement({
        tagName: uniqueTag(),
        reactiveAttributes,
        createComponent,
      });

      expect(El.componentConfig.reactiveAttributes).toBe(reactiveAttributes);
    });

    it('creates valid class when reactiveAttributes is present', () => {
      const El = Model.createCustomElement({
        tagName: uniqueTag(),
        reactiveAttributes: {
          count: { type: 'number', defaultValue: 0 },
        },
        createComponent,
      });

      expect(El).toBeDefined();
      expect(El.prototype).toBeInstanceOf(HTMLElement);
    });

    it('works without reactiveAttributes (backwards compat)', () => {
      const El = Model.createCustomElement({
        tagName: uniqueTag(),
        attributes: [{ name: 'theme', handler: jest.fn() }],
        createComponent,
      });

      expect(El).toBeDefined();
      expect(El.componentConfig.reactiveAttributes).toBeUndefined();
    });
  });

  // Instance-level tests require JSDOM's native custom elements
  const describeInstance = hasNativeCustomElements ? describe : describe.skip;

  describeInstance('property accessors', () => {
    it('creates property accessors with default values', () => {
      const { el } = defineAndCreate({
        tagName: uniqueTag(),
        reactiveAttributes: {
          theme: { type: 'string', defaultValue: 'light' },
          count: { type: 'number', defaultValue: 0 },
        },
        createComponent,
      });

      expect(el.theme).toBe('light');
      expect(el.count).toBe(0);
    });

    it('setting a property updates the value', () => {
      const { el } = defineAndCreate({
        tagName: uniqueTag(),
        reactiveAttributes: {
          count: { type: 'number', defaultValue: 0 },
        },
        createComponent,
      });

      el.count = 42;
      expect(el.count).toBe(42);
    });

    it('property accessor is enumerable and configurable', () => {
      const { el } = defineAndCreate({
        tagName: uniqueTag(),
        reactiveAttributes: {
          theme: { type: 'string' },
        },
        createComponent,
      });

      const desc = Object.getOwnPropertyDescriptor(el, 'theme');
      expect(desc).toBeDefined();
      expect(desc!.enumerable).toBe(true);
      expect(desc!.configurable).toBe(true);
    });
  });

  describeInstance('type conversion via attributeChangedCallback', () => {
    it('converts string attribute to number property', () => {
      const { el } = defineAndCreate({
        tagName: uniqueTag(),
        reactiveAttributes: {
          size: { type: 'number' },
        },
        createComponent,
      });

      el.attributeChangedCallback('size', null, '42');
      expect(el.size).toBe(42);
    });

    it('converts boolean attribute', () => {
      const { el } = defineAndCreate({
        tagName: uniqueTag(),
        reactiveAttributes: {
          open: { type: 'boolean', defaultValue: false },
        },
        createComponent,
      });

      expect(el.open).toBe(false);
      el.attributeChangedCallback('open', null, '');
      expect(el.open).toBe(true);
    });

    it('applies defaultValue when attribute removed (null)', () => {
      const { el } = defineAndCreate({
        tagName: uniqueTag(),
        reactiveAttributes: {
          theme: { type: 'string', defaultValue: 'light' },
        },
        createComponent,
      });

      el.attributeChangedCallback('theme', 'dark', null);
      expect(el.theme).toBe('light');
    });
  });

  describeInstance('reflection', () => {
    it('reflects property to attribute when reflect: true', () => {
      const { el } = defineAndCreate({
        tagName: uniqueTag(),
        reactiveAttributes: {
          theme: { type: 'string', reflect: true, defaultValue: 'light' },
        },
        createComponent,
      });

      el.theme = 'dark';
      expect(el.getAttribute('theme')).toBe('dark');
    });

    it('does not reflect when reflect is false', () => {
      const { el } = defineAndCreate({
        tagName: uniqueTag(),
        reactiveAttributes: {
          theme: { type: 'string', defaultValue: 'light' },
        },
        createComponent,
      });

      el.theme = 'dark';
      expect(el.getAttribute('theme')).toBeNull();
    });

    it('removes attribute when boolean reflects false', () => {
      const { el } = defineAndCreate({
        tagName: uniqueTag(),
        reactiveAttributes: {
          open: { type: 'boolean', reflect: true, defaultValue: false },
        },
        createComponent,
      });

      el.open = true;
      expect(el.hasAttribute('open')).toBe(true);

      el.open = false;
      expect(el.hasAttribute('open')).toBe(false);
    });
  });

  describeInstance('validation', () => {
    it('throws when property set with invalid value', () => {
      const { el } = defineAndCreate({
        tagName: uniqueTag(),
        reactiveAttributes: {
          count: {
            type: 'number',
            validate: (v) =>
              (v as number) >= 0 ? undefined : 'must be >= 0',
          },
        },
        createComponent,
      });

      expect(() => {
        el.count = -1;
      }).toThrow('must be >= 0');
    });

    it('allows valid values', () => {
      const { el } = defineAndCreate({
        tagName: uniqueTag(),
        reactiveAttributes: {
          count: {
            type: 'number',
            validate: (v) =>
              (v as number) >= 0 ? undefined : 'must be >= 0',
          },
        },
        createComponent,
      });

      expect(() => {
        el.count = 5;
      }).not.toThrow();
      expect(el.count).toBe(5);
    });
  });

  describeInstance('custom attribute name', () => {
    it('maps custom attribute name to property', () => {
      const { el } = defineAndCreate({
        tagName: uniqueTag(),
        reactiveAttributes: {
          theme: { attribute: 'data-theme', type: 'string' },
        },
        createComponent,
      });

      el.attributeChangedCallback('data-theme', null, 'dark');
      expect(el.theme).toBe('dark');
    });
  });

  describeInstance('coexistence with handler system', () => {
    it('both handler and reactive attribute fire for same attr', () => {
      const handlerSpy = jest.fn();
      const tag = uniqueTag();
      const { el } = defineAndCreate({
        tagName: tag,
        attributes: [{ name: 'theme', handler: handlerSpy }],
        reactiveAttributes: {
          theme: { type: 'string', defaultValue: 'light' },
        },
        createComponent,
      });

      // Connect to DOM so elementRef is created for handler system
      document.body.appendChild(el);

      el.attributeChangedCallback('theme', 'light', 'dark');
      expect(el.theme).toBe('dark');
      expect(handlerSpy).toHaveBeenCalledWith(
        expect.anything(),
        'light',
        'dark',
      );

      document.body.removeChild(el);
    });
  });

  describeInstance('hasChanged callback', () => {
    it('uses custom hasChanged to determine change', () => {
      const onChangeSpy = jest.fn();
      const { el } = defineAndCreate({
        tagName: uniqueTag(),
        reactiveAttributes: {
          data: {
            attribute: false,
            defaultValue: { x: 1 },
            onChange: onChangeSpy,
            // Treat structurally equal objects as unchanged
            hasChanged: (newVal: unknown, oldVal: unknown) =>
              JSON.stringify(newVal) !== JSON.stringify(oldVal),
          },
        },
        createComponent,
      });

      // Same structure → hasChanged returns false → no update
      el.data = { x: 1 };
      expect(onChangeSpy).not.toHaveBeenCalled();
    });

    it('default Object.is when no hasChanged — different refs trigger update', () => {
      const onChangeSpy = jest.fn();
      const { el } = defineAndCreate({
        tagName: uniqueTag(),
        reactiveAttributes: {
          data: {
            attribute: false,
            defaultValue: { x: 1 },
            onChange: onChangeSpy,
          },
        },
        createComponent,
      });

      // New ref with same structure → Object.is sees them as different → update fires
      el.data = { x: 1 };
      expect(onChangeSpy).toHaveBeenCalledTimes(1);
    });

    it('ChangeDetectors.deep prevents update for equal objects', () => {
      const onChangeSpy = jest.fn();
      const { el } = defineAndCreate({
        tagName: uniqueTag(),
        reactiveAttributes: {
          config: {
            attribute: false,
            defaultValue: { a: 1, b: [2, 3] },
            onChange: onChangeSpy,
            hasChanged: ChangeDetectors.deep,
          },
        },
        createComponent,
      });

      el.config = { a: 1, b: [2, 3] };
      expect(onChangeSpy).not.toHaveBeenCalled();

      el.config = { a: 1, b: [2, 4] };
      expect(onChangeSpy).toHaveBeenCalledTimes(1);
    });

    it('ChangeDetectors.threshold ignores small changes', () => {
      const onChangeSpy = jest.fn();
      const { el } = defineAndCreate({
        tagName: uniqueTag(),
        reactiveAttributes: {
          position: {
            type: 'number',
            defaultValue: 0,
            onChange: onChangeSpy,
            hasChanged: ChangeDetectors.threshold(0.5),
          },
        },
        createComponent,
      });

      el.position = 0.3;
      expect(onChangeSpy).not.toHaveBeenCalled();

      el.position = 1.0;
      expect(onChangeSpy).toHaveBeenCalledTimes(1);
    });

    it('ChangeDetectors.always forces update on same value', () => {
      const onChangeSpy = jest.fn();
      const { el } = defineAndCreate({
        tagName: uniqueTag(),
        reactiveAttributes: {
          count: {
            type: 'number',
            defaultValue: 5,
            onChange: onChangeSpy,
            hasChanged: ChangeDetectors.always,
          },
        },
        createComponent,
      });

      el.count = 5;
      expect(onChangeSpy).toHaveBeenCalledTimes(1);
    });

    it('works via attributeChangedCallback', () => {
      const onChangeSpy = jest.fn();
      const { el } = defineAndCreate({
        tagName: uniqueTag(),
        reactiveAttributes: {
          theme: {
            type: 'string',
            defaultValue: 'light',
            onChange: onChangeSpy,
            // Only changed if values are truly different (same as default, but explicit)
            hasChanged: (newVal: unknown, oldVal: unknown) => newVal !== oldVal,
          },
        },
        createComponent,
      });

      // Same value via attribute → hasChanged returns false
      el.attributeChangedCallback('theme', null, 'light');
      expect(onChangeSpy).not.toHaveBeenCalled();

      // Different value → hasChanged returns true
      el.attributeChangedCallback('theme', 'light', 'dark');
      expect(onChangeSpy).toHaveBeenCalledTimes(1);
    });

    it('coexists with onChange and handler system', () => {
      const handlerSpy = jest.fn();
      const onChangeSpy = jest.fn();
      const tag = uniqueTag();
      const { el } = defineAndCreate({
        tagName: tag,
        attributes: [{ name: 'count', handler: handlerSpy }],
        reactiveAttributes: {
          count: {
            type: 'number',
            defaultValue: 0,
            onChange: onChangeSpy,
            hasChanged: ChangeDetectors.always,
          },
        },
        createComponent,
      });

      document.body.appendChild(el);

      el.attributeChangedCallback('count', '0', '42');
      expect(handlerSpy).toHaveBeenCalled();
      expect(onChangeSpy).toHaveBeenCalled();

      document.body.removeChild(el);
    });
  });

  describeInstance('onChange callback', () => {
    it('fires when property set programmatically', () => {
      const onChangeSpy = jest.fn();
      const { el } = defineAndCreate({
        tagName: uniqueTag(),
        reactiveAttributes: {
          count: { type: 'number', defaultValue: 0, onChange: onChangeSpy },
        },
        createComponent,
      });

      el.count = 42;
      expect(onChangeSpy).toHaveBeenCalledTimes(1);
    });

    it('fires when attribute changes externally', () => {
      const onChangeSpy = jest.fn();
      const { el } = defineAndCreate({
        tagName: uniqueTag(),
        reactiveAttributes: {
          theme: { type: 'string', defaultValue: 'light', onChange: onChangeSpy },
        },
        createComponent,
      });

      el.attributeChangedCallback('theme', 'light', 'dark');
      expect(onChangeSpy).toHaveBeenCalledTimes(1);
    });

    it('receives correct old and new values', () => {
      const onChangeSpy = jest.fn();
      const { el } = defineAndCreate({
        tagName: uniqueTag(),
        reactiveAttributes: {
          count: { type: 'number', defaultValue: 0, onChange: onChangeSpy },
        },
        createComponent,
      });

      el.count = 42;
      expect(onChangeSpy).toHaveBeenCalledWith(el, 42, 0);
    });

    it('receives host element as first argument', () => {
      const onChangeSpy = jest.fn();
      const { el } = defineAndCreate({
        tagName: uniqueTag(),
        reactiveAttributes: {
          count: { type: 'number', defaultValue: 0, onChange: onChangeSpy },
        },
        createComponent,
      });

      el.count = 1;
      expect(onChangeSpy.mock.calls[0][0]).toBe(el);
    });

    it('does NOT fire during initial seeding', () => {
      const onChangeSpy = jest.fn();
      defineAndCreate({
        tagName: uniqueTag(),
        reactiveAttributes: {
          theme: { type: 'string', defaultValue: 'light', onChange: onChangeSpy },
        },
        createComponent,
      });

      expect(onChangeSpy).not.toHaveBeenCalled();
    });

    it('does NOT fire when value unchanged', () => {
      const onChangeSpy = jest.fn();
      const { el } = defineAndCreate({
        tagName: uniqueTag(),
        reactiveAttributes: {
          count: { type: 'number', defaultValue: 0, onChange: onChangeSpy },
        },
        createComponent,
      });

      el.count = 0;
      expect(onChangeSpy).not.toHaveBeenCalled();
    });

    it('fires AFTER reflection', () => {
      let attrValueDuringCallback: string | null = null;
      const onChange = (host: HTMLElement) => {
        attrValueDuringCallback = host.getAttribute('theme');
      };
      const { el } = defineAndCreate({
        tagName: uniqueTag(),
        reactiveAttributes: {
          theme: { type: 'string', reflect: true, defaultValue: 'light', onChange },
        },
        createComponent,
      });

      el.theme = 'dark';
      expect(attrValueDuringCallback).toBe('dark');
    });

    it('coexists with handler system', () => {
      const handlerSpy = jest.fn();
      const onChangeSpy = jest.fn();
      const tag = uniqueTag();
      const { el } = defineAndCreate({
        tagName: tag,
        attributes: [{ name: 'theme', handler: handlerSpy }],
        reactiveAttributes: {
          theme: { type: 'string', defaultValue: 'light', onChange: onChangeSpy },
        },
        createComponent,
      });

      document.body.appendChild(el);

      el.attributeChangedCallback('theme', 'light', 'dark');
      expect(handlerSpy).toHaveBeenCalled();
      expect(onChangeSpy).toHaveBeenCalled();

      document.body.removeChild(el);
    });
  });
});

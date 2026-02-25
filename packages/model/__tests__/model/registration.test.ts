import {
  registerComponent,
  registerComponents,
  isComponentRegistered,
  whenComponentDefined,
  getComponentConstructor,
} from '../../source/model/registration';
import {
  ComponentRegistrationError,
  BatchRegistrationError,
} from '../../source/model/errors';

// Saved by setup.ts before mock override
const nativeCustomElements = (window as any).__nativeCustomElements;
const savedMockCustomElements = window.customElements;

let counter = 0;
const uniqueTag = () => `test-reg-${counter++}-el`;

const createConstructor = (): CustomElementConstructor => {
  return class extends HTMLElement {} as unknown as CustomElementConstructor;
};

describe('Registration', () => {
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

  describe('Tag name validation', () => {
    it('throws for empty tag name', () => {
      expect(() => registerComponent('', createConstructor())).toThrow(
        ComponentRegistrationError,
      );
      try {
        registerComponent('', createConstructor());
      } catch (e: any) {
        expect(e.reason).toBe('invalid-name');
      }
    });

    it('throws for tag name without hyphen', () => {
      expect(() => registerComponent('nohyphen', createConstructor())).toThrow(
        ComponentRegistrationError,
      );
      try {
        registerComponent('nohyphen', createConstructor());
      } catch (e: any) {
        expect(e.reason).toBe('invalid-name');
      }
    });

    it('throws for tag name starting with uppercase', () => {
      expect(() =>
        registerComponent('Upper-case', createConstructor()),
      ).toThrow(ComponentRegistrationError);
      try {
        registerComponent('Upper-case', createConstructor());
      } catch (e: any) {
        expect(e.reason).toBe('invalid-name');
      }
    });

    it('throws for tag name with invalid characters', () => {
      expect(() =>
        registerComponent('my-comp!', createConstructor()),
      ).toThrow(ComponentRegistrationError);
      try {
        registerComponent('my-comp!', createConstructor());
      } catch (e: any) {
        expect(e.reason).toBe('invalid-name');
      }
    });
  });

  describe('Successful registration', () => {
    it('returns true and defines the element', () => {
      const tag = uniqueTag();
      const ctor = createConstructor();
      const result = registerComponent(tag, ctor);
      expect(result).toBe(true);
      expect(window.customElements.get(tag)).toBe(ctor);
    });
  });

  describe('Idempotent same-constructor', () => {
    it('returns false without throwing', () => {
      const tag = uniqueTag();
      const ctor = createConstructor();
      registerComponent(tag, ctor);
      const result = registerComponent(tag, ctor);
      expect(result).toBe(false);
    });
  });

  describe('Conflict detection', () => {
    it('throws with reason conflict and existingConstructor', () => {
      const tag = uniqueTag();
      const ctor1 = createConstructor();
      const ctor2 = createConstructor();
      registerComponent(tag, ctor1);

      try {
        registerComponent(tag, ctor2);
        fail('Expected ComponentRegistrationError');
      } catch (e: any) {
        expect(e).toBeInstanceOf(ComponentRegistrationError);
        expect(e.reason).toBe('conflict');
        expect(e.tagName).toBe(tag);
        expect(e.existingConstructor).toBe(ctor1);
      }
    });
  });

  describe('Missing constructor', () => {
    it('throws for null constructor', () => {
      try {
        registerComponent('my-null-el', null as any);
        fail('Expected ComponentRegistrationError');
      } catch (e: any) {
        expect(e).toBeInstanceOf(ComponentRegistrationError);
        expect(e.reason).toBe('missing-constructor');
      }
    });

    it('throws for non-function constructor', () => {
      try {
        registerComponent('my-obj-el', {} as any);
        fail('Expected ComponentRegistrationError');
      } catch (e: any) {
        expect(e).toBeInstanceOf(ComponentRegistrationError);
        expect(e.reason).toBe('missing-constructor');
      }
    });
  });

  describe('Lazy mode (eager: false)', () => {
    it('skips when no DOM elements present', () => {
      const tag = uniqueTag();
      const ctor = createConstructor();
      const result = registerComponent(tag, ctor, { eager: false });
      expect(result).toBe(false);
      expect(window.customElements.get(tag)).toBeUndefined();
    });

    it('registers when DOM elements are present', () => {
      const tag = uniqueTag();
      const ctor = createConstructor();
      const el = document.createElement(tag);
      document.body.appendChild(el);

      const result = registerComponent(tag, ctor, { eager: false });
      expect(result).toBe(true);
      expect(window.customElements.get(tag)).toBe(ctor);
    });
  });

  describe('Check utilities', () => {
    it('isComponentRegistered returns true for registered tags', () => {
      const tag = uniqueTag();
      registerComponent(tag, createConstructor());
      expect(isComponentRegistered(tag)).toBe(true);
    });

    it('isComponentRegistered returns false for unregistered tags', () => {
      expect(isComponentRegistered('nonexistent-tag-el')).toBe(false);
    });

    it('getComponentConstructor returns the constructor', () => {
      const tag = uniqueTag();
      const ctor = createConstructor();
      registerComponent(tag, ctor);
      expect(getComponentConstructor(tag)).toBe(ctor);
    });

    it('getComponentConstructor returns undefined for unregistered tags', () => {
      expect(getComponentConstructor('nonexistent-tag-el')).toBeUndefined();
    });

    it('whenComponentDefined resolves for registered tags', async () => {
      const tag = uniqueTag();
      const ctor = createConstructor();
      registerComponent(tag, ctor);
      const resolved = await whenComponentDefined(tag);
      expect(resolved).toBe(ctor);
    });
  });

  describe('Batch registration', () => {
    it('registers all components when none fail', () => {
      const tags = [uniqueTag(), uniqueTag(), uniqueTag()];
      const components = tags.map((tagName) => ({
        tagName,
        element: createConstructor(),
      }));

      expect(() => registerComponents(components)).not.toThrow();

      for (const { tagName, element } of components) {
        expect(window.customElements.get(tagName)).toBe(element);
      }
    });

    it('throws BatchRegistrationError on partial failure', () => {
      const goodTag1 = uniqueTag();
      const goodTag2 = uniqueTag();
      const badTag = 'nohyphen';

      const components = [
        { tagName: goodTag1, element: createConstructor() },
        { tagName: badTag, element: createConstructor() },
        { tagName: goodTag2, element: createConstructor() },
      ];

      try {
        registerComponents(components);
        fail('Expected BatchRegistrationError');
      } catch (e: any) {
        expect(e).toBeInstanceOf(BatchRegistrationError);
        expect(e.errors).toHaveLength(1);
        expect(e.errors[0].tagName).toBe(badTag);
        expect(e.errors[0].reason).toBe('invalid-name');
        expect(e.succeeded).toContain(goodTag1);
        expect(e.succeeded).toContain(goodTag2);
      }
    });

    it('reports multiple failures', () => {
      const components = [
        { tagName: 'bad1', element: createConstructor() },
        { tagName: 'bad2', element: createConstructor() },
      ];

      try {
        registerComponents(components);
        fail('Expected BatchRegistrationError');
      } catch (e: any) {
        expect(e).toBeInstanceOf(BatchRegistrationError);
        expect(e.errors).toHaveLength(2);
        expect(e.succeeded).toHaveLength(0);
      }
    });
  });
});

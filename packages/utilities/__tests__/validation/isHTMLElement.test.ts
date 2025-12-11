import { isHTMLElement } from '../../source/validation/isHTMLElement';

describe('isHTMLElement', () => {
  describe('happy path', () => {
    it('should return true for HTMLElement', () => {
      const div = document.createElement('div');
      expect(isHTMLElement(div)).toBe(true);
    });

    it('should return true for various HTML element types', () => {
      expect(isHTMLElement(document.createElement('div'))).toBe(true);
      expect(isHTMLElement(document.createElement('span'))).toBe(true);
      expect(isHTMLElement(document.createElement('p'))).toBe(true);
      expect(isHTMLElement(document.createElement('a'))).toBe(true);
      expect(isHTMLElement(document.createElement('button'))).toBe(true);
      expect(isHTMLElement(document.createElement('input'))).toBe(true);
    });

    it('should return true for custom elements', () => {
      const custom = document.createElement('custom-element');
      expect(isHTMLElement(custom)).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('should return false for null', () => {
      expect(isHTMLElement(null)).toBe(false);
    });

    it('should return false for undefined', () => {
      expect(isHTMLElement(undefined)).toBe(false);
    });

    it('should return false for strings', () => {
      expect(isHTMLElement('div')).toBe(false);
    });

    it('should return false for numbers', () => {
      expect(isHTMLElement(42)).toBe(false);
    });

    it('should return false for booleans', () => {
      expect(isHTMLElement(true)).toBe(false);
      expect(isHTMLElement(false)).toBe(false);
    });

    it('should return false for plain objects', () => {
      expect(isHTMLElement({})).toBe(false);
      expect(isHTMLElement({ tagName: 'div' })).toBe(false);
    });

    it('should return false for arrays', () => {
      expect(isHTMLElement([])).toBe(false);
    });

    it('should return false for DocumentFragment', () => {
      const fragment = document.createDocumentFragment();
      expect(isHTMLElement(fragment)).toBe(false);
    });

    it('should return false for Text nodes', () => {
      const textNode = document.createTextNode('hello');
      expect(isHTMLElement(textNode)).toBe(false);
    });

    it('should return false for Comment nodes', () => {
      const comment = document.createComment('comment');
      expect(isHTMLElement(comment)).toBe(false);
    });
  });

  describe('type narrowing', () => {
    it('should narrow type in TypeScript', () => {
      const value: unknown = document.createElement('div');

      if (isHTMLElement(value)) {
        // TypeScript should know value is HTMLElement here
        const style: CSSStyleDeclaration = value.style;
        expect(style).toBeDefined();
      }
    });

    it('should work with querySelector result', () => {
      const container = document.createElement('div');
      container.innerHTML = '<span id="test">Test</span>';

      const element = container.querySelector('#test');

      if (isHTMLElement(element)) {
        expect(element.textContent).toBe('Test');
      } else {
        fail('Element should be HTMLElement');
      }
    });
  });
});

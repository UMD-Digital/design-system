/**
 * Tests for Shadow DOM Styles Helpers
 *
 * @group helpers/styles
 */

import { setShadowStyles, updateShadowStyles } from '../../../source/helpers/styles/shadow';

// Mock the styles library
jest.mock('@universityofmaryland/web-styles-library', () => ({
  utilities: {
    transform: {
      css: {
        removeDuplicates: jest.fn().mockImplementation((css) => Promise.resolve(css)),
      },
    },
  },
}));

describe('Shadow DOM Styles Utilities', () => {
  let shadowRoot: ShadowRoot;
  let hostElement: HTMLElement;

  beforeEach(() => {
    // Create a host element with shadow root
    hostElement = document.createElement('div');
    shadowRoot = hostElement.attachShadow({ mode: 'open' });
  });

  describe('setShadowStyles', () => {
    it('should inject styles into shadow root', async () => {
      const styles = '.test-class { color: red; }';

      await setShadowStyles({ shadowRoot, styles });

      const styleElement = shadowRoot.querySelector('style');
      expect(styleElement).toBeDefined();
      expect(styleElement?.textContent).toBe(styles);
    });

    it('should optimize CSS before injection', async () => {
      const styles = '.test { color: red; }';
      const Styles = require('@universityofmaryland/web-styles-library');

      await setShadowStyles({ shadowRoot, styles });

      expect(Styles.utilities.transform.css.removeDuplicates).toHaveBeenCalledWith(styles);
    });

    it('should append multiple style elements when called multiple times', async () => {
      await setShadowStyles({ shadowRoot, styles: '.class1 { color: red; }' });
      await setShadowStyles({ shadowRoot, styles: '.class2 { color: blue; }' });

      const styleElements = shadowRoot.querySelectorAll('style');
      expect(styleElements.length).toBe(2);
    });
  });

  describe('updateShadowStyles', () => {
    it('should append styles by default', async () => {
      await updateShadowStyles({
        shadowRoot,
        styles: '.class1 { color: red; }',
      });

      await updateShadowStyles({
        shadowRoot,
        styles: '.class2 { color: blue; }',
        replace: false,
      });

      const styleElements = shadowRoot.querySelectorAll('style');
      expect(styleElements.length).toBe(2);
    });

    it('should replace all styles when replace is true', async () => {
      // Add initial styles
      await updateShadowStyles({
        shadowRoot,
        styles: '.class1 { color: red; }',
      });

      await updateShadowStyles({
        shadowRoot,
        styles: '.class2 { color: blue; }',
      });

      // Should have 2 style elements
      expect(shadowRoot.querySelectorAll('style').length).toBe(2);

      // Replace all with new styles
      await updateShadowStyles({
        shadowRoot,
        styles: '.class3 { color: green; }',
        replace: true,
      });

      const styleElements = shadowRoot.querySelectorAll('style');
      expect(styleElements.length).toBe(1);
      expect(styleElements[0].textContent).toBe('.class3 { color: green; }');
    });

    it('should remove all existing styles when replace is true', async () => {
      // Add multiple style elements
      await updateShadowStyles({ shadowRoot, styles: '.class1 {}' });
      await updateShadowStyles({ shadowRoot, styles: '.class2 {}' });
      await updateShadowStyles({ shadowRoot, styles: '.class3 {}' });

      expect(shadowRoot.querySelectorAll('style').length).toBe(3);

      // Replace all
      await updateShadowStyles({
        shadowRoot,
        styles: '.new-class {}',
        replace: true,
      });

      const styleElements = shadowRoot.querySelectorAll('style');
      expect(styleElements.length).toBe(1);
      expect(styleElements[0].textContent).toBe('.new-class {}');
    });
  });

  describe('Integration with Shadow DOM', () => {
    it('should work with custom elements', async () => {
      class TestElement extends HTMLElement {
        private _shadowRoot: ShadowRoot;

        constructor() {
          super();
          this._shadowRoot = this.attachShadow({ mode: 'open' });
        }

        getShadowRoot() {
          return this._shadowRoot;
        }
      }

      customElements.define('test-shadow-element', TestElement);
      const element = new TestElement();
      const elementShadowRoot = element.getShadowRoot();

      await setShadowStyles({
        shadowRoot: elementShadowRoot,
        styles: '.custom { color: purple; }',
      });

      const styleElement = elementShadowRoot.querySelector('style');
      expect(styleElement).toBeDefined();
      expect(styleElement?.textContent).toBe('.custom { color: purple; }');
    });
  });
});

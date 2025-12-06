import { Model } from '../source';
import type { ComponentRef } from '../source/_types';

describe('Model', () => {
  describe('createCustomElement', () => {
    it('should create a custom element class', () => {
      const createComponent = (host: HTMLElement): ComponentRef => ({
        element: document.createElement('div'),
        styles: '.test { color: red; }',
      });

      const CustomElement = Model.createCustomElement({
        tagName: 'test-element',
        createComponent,
      });

      expect(CustomElement).toBeDefined();
      expect(CustomElement.prototype).toBeInstanceOf(HTMLElement);
    });

    it('should accept valid config', () => {
      const createComponent = (host: HTMLElement): ComponentRef => ({
        element: document.createElement('div'),
        styles: '.test { color: red; }',
      });

      const CustomElement = Model.createCustomElement({
        tagName: 'test-valid-element',
        createComponent,
      });

      expect(CustomElement).toBeDefined();
      expect(CustomElement.componentConfig).toBeDefined();
      expect(CustomElement.componentConfig.tagName).toBe('test-valid-element');
    });
  });
});

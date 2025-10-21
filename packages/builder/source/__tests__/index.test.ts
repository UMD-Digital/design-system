/**
 * @jest-environment jsdom
 */

import { ElementBuilder, createStyledElement } from '../index';
import {
  ElementProps,
  ElementStyles,
  StyleOptions,
  CompositeChild,
} from '../index';

describe('Package Main Exports', () => {
  describe('ElementBuilder class export', () => {
    it('should export ElementBuilder class', () => {
      expect(ElementBuilder).toBeDefined();
      expect(typeof ElementBuilder).toBe('function');
    });

    it('should allow creating ElementBuilder instances', () => {
      const element = document.createElement('div');
      const builder = new ElementBuilder('test-class', element);

      expect(builder).toBeInstanceOf(ElementBuilder);
    });

    it('should create elements with ElementBuilder', () => {
      const element = document.createElement('div');
      const builder = new ElementBuilder('test-class', element);

      const result = builder.createElement({
        config: {
          styleModifiers: () => '.test-class { color: red; }',
        },
      });

      expect(result.element).toBe(element);
      expect(result.className).toBe('test-class');
      expect(result.styles).toBeTruthy();
    });
  });

  describe('createStyledElement export', () => {
    it('should export createStyledElement function', () => {
      expect(createStyledElement).toBeDefined();
      expect(typeof createStyledElement).toBe('function');
    });

    it('should create styled elements', () => {
      const element = document.createElement('div');
      const result = createStyledElement({ element }, { className: 'test' });

      expect(result.element).toBe(element);
      expect(result.className).toBe('test');
      expect(result.styles).toBeTruthy();
    });

    it('should have builder variant methods', () => {
      expect(typeof createStyledElement.base).toBe('function');
      expect(typeof createStyledElement.action).toBe('function');
      expect(typeof createStyledElement.animationLine).toBe('function');
      expect(typeof createStyledElement.childLink).toBe('function');
      expect(typeof createStyledElement.default).toBe('function');
    });
  });

  describe('Type exports', () => {
    it('should export ElementProps type', () => {
      const element = document.createElement('div');
      const props: ElementProps = { element };

      expect(props.element).toBe(element);
    });

    it('should export ElementStyles type', () => {
      const styles: ElementStyles = {
        element: { color: 'red' },
      };

      expect(styles.element).toBeDefined();
    });

    it('should export StyleOptions type', () => {
      const options: StyleOptions = {
        className: 'test',
      };

      expect(options.className).toBe('test');
    });

    it('should export CompositeChild type', () => {
      const child: CompositeChild = {
        element: document.createElement('span'),
        styles: '.child { }',
      };

      expect(child.element).toBeDefined();
      expect(child.styles).toBeDefined();
    });
  });

  describe('Package integration', () => {
    it('should work end-to-end with all exported functionality', () => {
      // Create element
      const element = document.createElement('div');

      // Use ElementBuilder
      const builder = new ElementBuilder('integration-test', element);

      // Create with config
      const result = builder.createElement({
        config: {
          styleModifiers: (props) => `.${props.className} { display: flex; }`,
        },
      });

      expect(result.element).toBe(element);
      expect(result.className).toBe('integration-test');
      expect(result.styles).toContain('integration-test');
      expect(result.styles).toContain('display');
      expect(result.styles).toContain('flex');
    });

    it('should work with createStyledElement', () => {
      const element = document.createElement('div');

      const result = createStyledElement(
        {
          element,
          elementStyles: {
            element: { padding: '10px' },
          },
        },
        { className: 'styled-test' }
      );

      expect(result.element).toBe(element);
      expect(result.styles).toContain('padding');
    });
  });
});

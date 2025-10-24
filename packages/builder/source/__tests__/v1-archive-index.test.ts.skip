/**
 * @jest-environment jsdom
 */

import ElementBuilder from '../index';
import {
  ElementProps,
  ElementStyles,
  StyleOptions,
  CompositeChild,
} from '../index';

describe('Package Main Exports', () => {
  describe('ElementBuilder default export', () => {
    it('should export ElementBuilder object', () => {
      expect(ElementBuilder).toBeDefined();
      expect(typeof ElementBuilder).toBe('object');
    });

    it('should have styled property with categories', () => {
      expect(ElementBuilder.styled).toBeDefined();
      expect(ElementBuilder.styled.actions).toBeDefined();
      expect(ElementBuilder.styled.buttons).toBeDefined();
      expect(ElementBuilder.styled.text).toBeDefined();
      expect(ElementBuilder.styled.assets).toBeDefined();
      expect(ElementBuilder.styled.event).toBeDefined();
      expect(ElementBuilder.styled.headline).toBeDefined();
      expect(ElementBuilder.styled.layout).toBeDefined();
      expect(ElementBuilder.styled.richText).toBeDefined();
    });

    it('should have create property with utilities', () => {
      expect(ElementBuilder.create).toBeDefined();
      expect(typeof ElementBuilder.create.element).toBe('function');
      expect(typeof ElementBuilder.create.div).toBe('function');
      expect(typeof ElementBuilder.create.paragraph).toBe('function');
      expect(typeof ElementBuilder.create.span).toBe('function');
      expect(typeof ElementBuilder.create.advanced).toBe('function');
    });

    it('should have ElementBuilder class for advanced usage', () => {
      expect(ElementBuilder.ElementBuilder).toBeDefined();
      expect(typeof ElementBuilder.ElementBuilder).toBe('function');

      const element = document.createElement('div');
      const builder = new ElementBuilder.ElementBuilder('test-class', element);
      expect(builder).toBeInstanceOf(ElementBuilder.ElementBuilder);
    });
  });

  describe('styled elements', () => {
    it('should create styled elements from pre-configured categories', () => {
      const element = document.createElement('a');
      const result = ElementBuilder.styled.actions.primary({ element });

      expect(result.element).toBe(element);
      expect(result.className).toBeTruthy();
      expect(result.styles).toBeTruthy();
    });

    it('should have all styled element categories', () => {
      const categories = [
        'actions',
        'assets',
        'buttons',
        'event',
        'headline',
        'layout',
        'richText',
        'text',
      ];

      categories.forEach((category) => {
        expect(ElementBuilder.styled[category as keyof typeof ElementBuilder.styled]).toBeDefined();
      });
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

  describe('create utilities', () => {
    it('should create custom styled div', () => {
      const result = ElementBuilder.create.div({ className: 'custom-div' });

      expect(result.element.tagName).toBe('DIV');
      expect(result.className).toBe('custom-div');
      expect(result.styles).toBeTruthy();
    });

    it('should create custom styled paragraph', () => {
      const result = ElementBuilder.create.paragraph({ className: 'custom-p' });

      expect(result.element.tagName).toBe('P');
      expect(result.className).toBe('custom-p');
      expect(result.styles).toBeTruthy();
    });

    it('should create custom styled span', () => {
      const result = ElementBuilder.create.span({ className: 'custom-span' });

      expect(result.element.tagName).toBe('SPAN');
      expect(result.className).toBe('custom-span');
      expect(result.styles).toBeTruthy();
    });

    it('should create custom element with element utility', () => {
      const element = document.createElement('section');
      const result = ElementBuilder.create.element({ element, className: 'custom-section' });

      expect(result.element).toBe(element);
      expect(result.className).toBe('custom-section');
      expect(result.styles).toBeTruthy();
    });
  });

  describe('Package integration', () => {
    it('should work end-to-end with styled elements', () => {
      const element = document.createElement('a');
      const result = ElementBuilder.styled.actions.primary({ element });

      expect(result.element).toBe(element);
      expect(result.className).toBeTruthy();
      expect(result.styles).toBeTruthy();
    });

    it('should work end-to-end with create utilities', () => {
      const result = ElementBuilder.create.div({
        className: 'integration-test',
        elementStyles: {
          element: { display: 'flex', padding: '10px' },
        },
      });

      expect(result.element.tagName).toBe('DIV');
      expect(result.styles).toContain('display');
      expect(result.styles).toContain('padding');
    });

    it('should work with advanced createStyledElement', () => {
      const element = document.createElement('div');
      const result = ElementBuilder.create.advanced(
        {
          element,
          elementStyles: {
            element: { margin: '5px' },
          },
        },
        { className: 'advanced-test' }
      );

      expect(result.element).toBe(element);
      expect(result.styles).toContain('margin');
    });
  });
});

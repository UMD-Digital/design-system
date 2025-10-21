/**
 * @jest-environment jsdom
 */

import { ElementBuilder, createStyledElement } from '../core';
import { ElementProps } from '../core/_types';

describe('ElementBuilder', () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement('div');
  });

  describe('constructor', () => {
    it('should create an instance with className and element', () => {
      const builder = new ElementBuilder('test-class', element);
      expect(builder).toBeInstanceOf(ElementBuilder);
    });
  });

  describe('createElement', () => {
    it('should create element with className', () => {
      const builder = new ElementBuilder('test-class', element);
      const result = builder.createElement({
        config: {
          styleModifiers: () => '.test-class { color: red; }',
        },
      });

      expect(result.element).toBe(element);
      expect(result.className).toBe('test-class');
      expect(result.element.classList.contains('test-class')).toBe(true);
    });

    it('should include generated styles', () => {
      const builder = new ElementBuilder('test-class', element);
      const mockStyles = '.test-class { color: blue; }';

      const result = builder.createElement({
        config: {
          styleModifiers: () => mockStyles,
        },
      });

      expect(result.styles).toBe(mockStyles);
    });

    it('should apply element modifiers', () => {
      const builder = new ElementBuilder('test-class', element);
      const modifierSpy = jest.fn();

      builder.createElement({
        config: {
          styleModifiers: () => '',
          elementModifiers: [modifierSpy],
        },
      });

      expect(modifierSpy).toHaveBeenCalledWith(element);
    });

    it('should apply multiple element modifiers in order', () => {
      const builder = new ElementBuilder('test-class', element);
      const callOrder: number[] = [];

      const modifier1 = jest.fn(() => callOrder.push(1));
      const modifier2 = jest.fn(() => callOrder.push(2));

      builder.createElement({
        config: {
          styleModifiers: () => '',
          elementModifiers: [modifier1, modifier2],
        },
      });

      expect(callOrder).toEqual([1, 2]);
    });

    it('should apply attributes when provided', () => {
      const builder = new ElementBuilder('test-class', element);

      builder.createElement({
        config: {
          styleModifiers: () => '',
        },
        attributes: [
          { 'data-test': 'value1', 'aria-label': 'Test Label' },
          { 'data-other': 'value2' },
        ],
      });

      expect(element.getAttribute('data-test')).toBe('value1');
      expect(element.getAttribute('aria-label')).toBe('Test Label');
      expect(element.getAttribute('data-other')).toBe('value2');
    });

    it('should append children when provided', () => {
      const builder = new ElementBuilder('parent-class', element);
      const child1 = document.createElement('span');
      const child2 = document.createElement('div');

      const result = builder.createElement({
        config: {
          styleModifiers: () => '.parent { }',
        },
        children: [
          { element: child1, styles: '.child1 { }' },
          { element: child2, styles: '.child2 { }' },
        ],
      });

      expect(element.children.length).toBe(2);
      expect(element.children[0]).toBe(child1);
      expect(element.children[1]).toBe(child2);
      expect(result.styles).toContain('.parent');
      expect(result.styles).toContain('.child1');
      expect(result.styles).toContain('.child2');
    });

    it('should throw error when className is missing', () => {
      const builder = new ElementBuilder('', element);

      expect(() => {
        builder.createElement({
          config: {
            styleModifiers: () => '',
          },
        });
      }).toThrow('element & className is required for Element Builder');
    });

    it('should throw error when element is missing', () => {
      // @ts-expect-error - Testing invalid input
      const builder = new ElementBuilder('test-class', null);

      expect(() => {
        builder.createElement({
          config: {
            styleModifiers: () => '',
          },
        });
      }).toThrow('element & className is required for Element Builder');
    });
  });
});

describe('createStyledElement', () => {
  let element: HTMLElement;
  let props: ElementProps;

  beforeEach(() => {
    element = document.createElement('div');
    props = { element };
  });

  describe('default builder', () => {
    it('should create styled element with default configuration', () => {
      const result = createStyledElement(props, { className: 'test-class' });

      expect(result.element).toBe(element);
      expect(result.className).toBe('test-class');
      expect(result.element.classList.contains('test-class')).toBe(true);
      expect(result.styles).toBeTruthy();
    });

    it('should handle array className by using first value', () => {
      const result = createStyledElement(props, {
        className: ['first-class', 'second-class']
      });

      expect(result.className).toBe('first-class');
      expect(result.element.classList.contains('first-class')).toBe(true);
    });
  });

  describe('base builder', () => {
    it('should create element with base configuration', () => {
      const result = createStyledElement.base(props, { className: 'base-class' });

      expect(result.element).toBe(element);
      expect(result.className).toBe('base-class');
      expect(result.styles).toBeTruthy();
    });
  });

  describe('action builder', () => {
    it('should create element with action configuration', () => {
      const result = createStyledElement.action(props, { className: 'action-class' });

      expect(result.element).toBe(element);
      expect(result.className).toBe('action-class');
      expect(result.styles).toBeTruthy();
    });
  });

  describe('animationLine builder', () => {
    it('should create element with animation configuration', () => {
      const span = document.createElement('span');
      span.textContent = 'Test Text';

      const result = createStyledElement.animationLine(
        { element: span },
        { className: 'animation-class' }
      );

      expect(result.element).toBe(span);
      expect(result.className).toBe('animation-class');
      expect(result.styles).toBeTruthy();
    });

    it('should wrap text nodes in span', () => {
      const link = document.createElement('a');
      link.textContent = 'Click me';

      createStyledElement.animationLine(
        { element: link },
        { className: 'animation-class' }
      );

      // Text should be wrapped in a span
      expect(link.children.length).toBeGreaterThan(0);
    });
  });

  describe('childLink builder', () => {
    it('should create element with childLink configuration', () => {
      const result = createStyledElement.childLink(props, { className: 'link-class' });

      expect(result.element).toBe(element);
      expect(result.className).toBe('link-class');
      expect(result.styles).toBeTruthy();
    });
  });

  describe('theme support', () => {
    it('should apply dark theme styles', () => {
      const result = createStyledElement(
        { element, isThemeDark: true },
        { className: 'themed-class' }
      );

      expect(result.styles).toContain('white');
    });

    it('should apply white text color', () => {
      const result = createStyledElement(
        { element, isTextColorWhite: true },
        { className: 'text-white-class' }
      );

      expect(result.styles).toContain('white');
    });

    it('should apply red animation line', () => {
      const span = document.createElement('span');
      const result = createStyledElement.animationLine(
        { element: span, isAnimationLineRed: true },
        { className: 'red-animation' }
      );

      expect(result.styles).toBeTruthy();
    });
  });

  describe('custom styles', () => {
    it('should apply element styles', () => {
      const result = createStyledElement(
        {
          element,
          elementStyles: {
            element: { color: 'red', fontSize: '16px' },
          },
        },
        { className: 'custom-element' }
      );

      expect(result.styles).toContain('color');
    });

    it('should apply pseudoBefore styles', () => {
      const result = createStyledElement(
        {
          element,
          elementStyles: {
            pseudoBefore: { content: '""', display: 'block' },
          },
        },
        { className: 'before-element' }
      );

      expect(result.styles).toContain(':before');
    });

    it('should apply sibling after styles', () => {
      const result = createStyledElement(
        {
          element,
          elementStyles: {
            siblingAfter: { marginTop: '10px' },
          },
        },
        { className: 'sibling-element' }
      );

      expect(result.styles).toContain('+');
    });

    it('should apply subElement styles', () => {
      const result = createStyledElement(
        {
          element,
          elementStyles: {
            subElement: { padding: '5px' },
          },
        },
        { className: 'parent-element' }
      );

      expect(result.styles).toContain('*');
    });
  });

  describe('children composition', () => {
    it('should compose children with their styles', () => {
      const child1 = document.createElement('span');
      const child2 = document.createElement('div');

      const result = createStyledElement(
        {
          element,
          children: [
            { element: child1, styles: '.child1 { color: blue; }' },
            { element: child2, styles: '.child2 { color: green; }' },
          ],
        },
        { className: 'parent' }
      );

      expect(element.children.length).toBe(2);
      expect(result.styles).toContain('.child1');
      expect(result.styles).toContain('.child2');
    });
  });
});

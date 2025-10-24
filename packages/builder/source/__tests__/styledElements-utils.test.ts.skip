/**
 * @jest-environment jsdom
 */

import { create, createDiv, createParagraph, createSpan } from '../styledElements';

describe('Styled Elements - Utility Functions', () => {
  describe('create', () => {
    it('should create styled element with className', () => {
      const element = document.createElement('div');
      const result = create({ element, className: 'test-class' });

      expect(result.element).toBe(element);
      expect(result.className).toBe('test-class');
      expect(result.element.classList.contains('test-class')).toBe(true);
      expect(result.styles).toBeTruthy();
    });

    it('should work with different element types', () => {
      const span = document.createElement('span');
      const result = create({ element: span, className: 'span-class' });

      expect(result.element).toBe(span);
      expect(result.className).toBe('span-class');
    });

    it('should support theme options', () => {
      const element = document.createElement('div');
      const result = create({
        element,
        className: 'themed-class',
        isThemeDark: true,
      });

      expect(result.styles).toBeTruthy();
    });

    it('should support custom element styles', () => {
      const element = document.createElement('div');
      const result = create({
        element,
        className: 'custom-class',
        elementStyles: {
          element: { padding: '10px', margin: '5px' },
        },
      });

      expect(result.styles).toContain('padding');
    });
  });

  describe('createDiv', () => {
    it('should create a div element with className', () => {
      const result = createDiv({ className: 'div-class' });

      expect(result.element.tagName).toBe('DIV');
      expect(result.className).toBe('div-class');
      expect(result.element.classList.contains('div-class')).toBe(true);
      expect(result.styles).toBeTruthy();
    });

    it('should support theme options', () => {
      const result = createDiv({
        className: 'themed-div',
        isThemeDark: true,
      });

      expect(result.element.tagName).toBe('DIV');
      expect(result.styles).toBeTruthy();
    });

    it('should support custom element styles', () => {
      const result = createDiv({
        className: 'custom-div',
        elementStyles: {
          element: { display: 'flex', gap: '10px' },
        },
      });

      expect(result.styles).toContain('display');
    });
  });

  describe('createParagraph', () => {
    it('should create a p element with className', () => {
      const result = createParagraph({ className: 'p-class' });

      expect(result.element.tagName).toBe('P');
      expect(result.className).toBe('p-class');
      expect(result.element.classList.contains('p-class')).toBe(true);
      expect(result.styles).toBeTruthy();
    });

    it('should support theme options', () => {
      const result = createParagraph({
        className: 'themed-p',
        isTextColorWhite: true,
      });

      expect(result.element.tagName).toBe('P');
      expect(result.styles).toContain('white');
    });

    it('should support custom element styles', () => {
      const result = createParagraph({
        className: 'custom-p',
        elementStyles: {
          element: { fontSize: '16px', lineHeight: '1.5' },
        },
      });

      expect(result.styles).toContain('font-size');
    });
  });

  describe('createSpan', () => {
    it('should create a span element with className', () => {
      const result = createSpan({ className: 'span-class' });

      expect(result.element.tagName).toBe('SPAN');
      expect(result.className).toBe('span-class');
      expect(result.element.classList.contains('span-class')).toBe(true);
      expect(result.styles).toBeTruthy();
    });

    it('should support theme options', () => {
      const result = createSpan({
        className: 'themed-span',
        isThemeDark: true,
      });

      expect(result.element.tagName).toBe('SPAN');
      expect(result.styles).toBeTruthy();
    });

    it('should support custom element styles', () => {
      const result = createSpan({
        className: 'custom-span',
        elementStyles: {
          element: { fontWeight: 'bold', color: 'blue' },
        },
      });

      expect(result.styles).toContain('font-weight');
    });
  });

  describe('consistency across utility functions', () => {
    it('should all return the same interface structure', () => {
      const divResult = createDiv({ className: 'test-div' });
      const pResult = createParagraph({ className: 'test-p' });
      const spanResult = createSpan({ className: 'test-span' });

      [divResult, pResult, spanResult].forEach((result) => {
        expect(result).toHaveProperty('element');
        expect(result).toHaveProperty('className');
        expect(result).toHaveProperty('styles');
        expect(result.element).toBeInstanceOf(HTMLElement);
        expect(typeof result.className).toBe('string');
        expect(typeof result.styles).toBe('string');
      });
    });
  });
});

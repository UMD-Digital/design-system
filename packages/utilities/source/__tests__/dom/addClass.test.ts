import { addClass } from '../../dom/addClass';

describe('addClass', () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement('div');
  });

  describe('happy path', () => {
    it('should add a single class to an element', () => {
      addClass(element, 'test-class');
      expect(element.classList.contains('test-class')).toBe(true);
    });

    it('should add multiple classes from space-separated string', () => {
      addClass(element, 'class-one class-two class-three');
      expect(element.classList.contains('class-one')).toBe(true);
      expect(element.classList.contains('class-two')).toBe(true);
      expect(element.classList.contains('class-three')).toBe(true);
    });

    it('should add multiple classes from array', () => {
      addClass(element, ['class-one', 'class-two', 'class-three']);
      expect(element.classList.contains('class-one')).toBe(true);
      expect(element.classList.contains('class-two')).toBe(true);
      expect(element.classList.contains('class-three')).toBe(true);
    });

    it('should not add duplicate classes', () => {
      element.classList.add('existing-class');
      addClass(element, 'existing-class');
      expect(element.classList.length).toBe(1);
    });

    it('should handle empty strings in class list', () => {
      addClass(element, 'class-one  class-two'); // double space
      expect(element.classList.contains('class-one')).toBe(true);
      expect(element.classList.contains('class-two')).toBe(true);
      expect(element.classList.length).toBe(2);
    });
  });

  describe('edge cases', () => {
    it('should handle empty string', () => {
      addClass(element, '');
      expect(element.classList.length).toBe(0);
    });

    it('should handle empty array', () => {
      addClass(element, []);
      expect(element.classList.length).toBe(0);
    });

    it('should filter out empty strings from array', () => {
      // DOM API throws error for empty class names, so our utility filters them out
      expect(() => addClass(element, ['', 'valid-class', ''])).not.toThrow();
      expect(element.classList.contains('valid-class')).toBe(true);
    });

    it('should filter out whitespace-only strings', () => {
      addClass(element, '   ');
      expect(element.classList.length).toBe(0);
    });
  });

  describe('error conditions', () => {
    it('should throw error when element is null', () => {
      expect(() => addClass(null as any, 'test-class')).toThrow('Element is required');
    });

    it('should throw error when element is undefined', () => {
      expect(() => addClass(undefined as any, 'test-class')).toThrow('Element is required');
    });
  });
});
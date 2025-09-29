import { removeClass } from '../../dom/removeClass';

describe('removeClass', () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement('div');
  });

  describe('happy path', () => {
    it('should remove a single class from an element', () => {
      element.classList.add('test-class');
      removeClass(element, 'test-class');
      expect(element.classList.contains('test-class')).toBe(false);
    });

    it('should remove multiple classes from space-separated string', () => {
      element.classList.add('class-one', 'class-two', 'class-three');
      removeClass(element, 'class-one class-two');
      expect(element.classList.contains('class-one')).toBe(false);
      expect(element.classList.contains('class-two')).toBe(false);
      expect(element.classList.contains('class-three')).toBe(true);
    });

    it('should remove multiple classes from array', () => {
      element.classList.add('class-one', 'class-two', 'class-three');
      removeClass(element, ['class-one', 'class-two']);
      expect(element.classList.contains('class-one')).toBe(false);
      expect(element.classList.contains('class-two')).toBe(false);
      expect(element.classList.contains('class-three')).toBe(true);
    });

    it('should not throw when removing non-existent class', () => {
      expect(() => removeClass(element, 'non-existent')).not.toThrow();
      expect(element.classList.length).toBe(0);
    });

    it('should handle empty strings in class list', () => {
      element.classList.add('class-one', 'class-two');
      removeClass(element, 'class-one  class-two'); // double space
      expect(element.classList.length).toBe(0);
    });
  });

  describe('edge cases', () => {
    it('should handle empty string', () => {
      element.classList.add('test-class');
      removeClass(element, '');
      expect(element.classList.contains('test-class')).toBe(true);
    });

    it('should handle empty array', () => {
      element.classList.add('test-class');
      removeClass(element, []);
      expect(element.classList.contains('test-class')).toBe(true);
    });

    it('should filter out empty strings from array', () => {
      element.classList.add('valid-class', 'another-class');
      // DOM API throws error for empty class names, so our utility filters them out
      expect(() => removeClass(element, ['', 'valid-class', ''])).not.toThrow();
      expect(element.classList.contains('valid-class')).toBe(false);
      expect(element.classList.contains('another-class')).toBe(true);
    });

    it('should filter out whitespace-only strings', () => {
      element.classList.add('test-class');
      removeClass(element, '   ');
      expect(element.classList.contains('test-class')).toBe(true);
    });
  });

  describe('error conditions', () => {
    it('should throw error when element is null', () => {
      expect(() => removeClass(null as any, 'test-class')).toThrow('Element is required');
    });

    it('should throw error when element is undefined', () => {
      expect(() => removeClass(undefined as any, 'test-class')).toThrow('Element is required');
    });
  });
});
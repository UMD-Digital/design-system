import { toElementVisual, ComponentRef } from '../../source/adapters/toElementVisual';

describe('toElementVisual', () => {
  describe('happy path', () => {
    it('should convert ComponentRef with HTMLElement to ElementVisual', () => {
      const element = document.createElement('div');
      const ref: ComponentRef = {
        element,
        styles: 'test-class',
      };

      const result = toElementVisual(ref);

      expect(result).toBeDefined();
      expect(result?.element).toBe(element);
      expect(result?.className).toBe('test-class');
    });

    it('should use styles as className property', () => {
      const element = document.createElement('span');
      const ref: ComponentRef = {
        element,
        styles: 'custom-style-class',
      };

      const result = toElementVisual(ref);

      expect(result?.className).toBe('custom-style-class');
    });

    it('should include all properties from ComponentRef', () => {
      const element = document.createElement('div');
      const events = {
        load: jest.fn(),
        destroy: jest.fn(),
      };
      const ref: ComponentRef = {
        element,
        styles: 'test-class',
        events,
      };

      const result = toElementVisual(ref);

      expect(result?.element).toBe(element);
      expect(result?.styles).toBe('test-class');
      expect(result?.events).toBe(events);
      expect(result?.className).toBe('test-class');
    });

    it('should handle ComponentRef with empty styles', () => {
      const element = document.createElement('div');
      const ref: ComponentRef = {
        element,
        styles: '',
      };

      const result = toElementVisual(ref);

      expect(result).toBeDefined();
      expect(result?.className).toBe('');
    });

    it('should handle ComponentRef without styles property', () => {
      const element = document.createElement('div');
      const ref: ComponentRef = {
        element,
      };

      const result = toElementVisual(ref);

      expect(result).toBeDefined();
      expect(result?.className).toBe('');
    });

    it('should preserve all event handlers', () => {
      const element = document.createElement('div');
      const load = jest.fn();
      const destroy = jest.fn();
      const recalculate = jest.fn();
      const resize = jest.fn();
      const custom = jest.fn();

      const ref: ComponentRef = {
        element,
        styles: 'test',
        events: {
          load,
          destroy,
          recalculate,
          resize,
          custom,
        },
      };

      const result = toElementVisual(ref);

      expect(result?.events?.load).toBe(load);
      expect(result?.events?.destroy).toBe(destroy);
      expect(result?.events?.recalculate).toBe(recalculate);
      expect(result?.events?.resize).toBe(resize);
      expect(result?.events?.custom).toBe(custom);
    });
  });

  describe('edge cases', () => {
    it('should return undefined for undefined input', () => {
      const result = toElementVisual(undefined);

      expect(result).toBeUndefined();
    });

    it('should return undefined for ComponentRef with DocumentFragment', () => {
      const fragment = document.createDocumentFragment();
      const ref: ComponentRef = {
        element: fragment,
        styles: 'test-class',
      };

      const result = toElementVisual(ref);

      expect(result).toBeUndefined();
    });

    it('should handle different HTML element types', () => {
      const elementTypes = [
        document.createElement('div'),
        document.createElement('span'),
        document.createElement('section'),
        document.createElement('article'),
        document.createElement('button'),
      ];

      elementTypes.forEach((element) => {
        const ref: ComponentRef = {
          element,
          styles: 'test',
        };

        const result = toElementVisual(ref);

        expect(result).toBeDefined();
        expect(result?.element).toBe(element);
      });
    });

    it('should handle ComponentRef with only element property', () => {
      const element = document.createElement('div');
      const ref: ComponentRef = {
        element,
      };

      const result = toElementVisual(ref);

      expect(result).toBeDefined();
      expect(result?.element).toBe(element);
      expect(result?.className).toBe('');
    });

    it('should handle ComponentRef with events but no styles', () => {
      const element = document.createElement('div');
      const ref: ComponentRef = {
        element,
        events: {
          load: jest.fn(),
        },
      };

      const result = toElementVisual(ref);

      expect(result).toBeDefined();
      expect(result?.className).toBe('');
      expect(result?.events).toBeDefined();
    });

    it('should handle multiple whitespace-separated classes in styles', () => {
      const element = document.createElement('div');
      const ref: ComponentRef = {
        element,
        styles: 'class-one class-two class-three',
      };

      const result = toElementVisual(ref);

      expect(result?.className).toBe('class-one class-two class-three');
    });

    it('should handle styles with special characters', () => {
      const element = document.createElement('div');
      const ref: ComponentRef = {
        element,
        styles: 'test-class_123 test:hover',
      };

      const result = toElementVisual(ref);

      expect(result?.className).toBe('test-class_123 test:hover');
    });
  });

  describe('error conditions', () => {
    it('should return undefined for null input', () => {
      const result = toElementVisual(null as any);

      expect(result).toBeUndefined();
    });

    it('should return undefined when element is not HTMLElement', () => {
      const fragment = document.createDocumentFragment();
      const ref: ComponentRef = {
        element: fragment,
        styles: 'test',
        events: {
          load: jest.fn(),
        },
      };

      const result = toElementVisual(ref);

      expect(result).toBeUndefined();
    });

    it('should handle ComponentRef with text node (invalid)', () => {
      const textNode = document.createTextNode('test');
      const ref = {
        element: textNode as any,
        styles: 'test',
      };

      const result = toElementVisual(ref);

      expect(result).toBeUndefined();
    });
  });

  describe('consistency', () => {
    it('should produce consistent results for same input', () => {
      const element = document.createElement('div');
      const ref: ComponentRef = {
        element,
        styles: 'test-class',
      };

      const result1 = toElementVisual(ref);
      const result2 = toElementVisual(ref);

      expect(result1?.className).toBe(result2?.className);
      expect(result1?.element).toBe(result2?.element);
    });

    it('should always set className property when element is HTMLElement', () => {
      const element = document.createElement('div');
      const ref: ComponentRef = {
        element,
        styles: 'test',
      };

      const result = toElementVisual(ref);

      expect(result).toHaveProperty('className');
    });

    it('should not modify original ComponentRef', () => {
      const element = document.createElement('div');
      const ref: ComponentRef = {
        element,
        styles: 'original-class',
      };

      const originalStyles = ref.styles;
      toElementVisual(ref);

      expect(ref.styles).toBe(originalStyles);
    });

    it('should return undefined consistently for non-HTMLElement', () => {
      const fragment = document.createDocumentFragment();
      const ref: ComponentRef = {
        element: fragment,
        styles: 'test',
      };

      const result1 = toElementVisual(ref);
      const result2 = toElementVisual(ref);

      expect(result1).toBeUndefined();
      expect(result2).toBeUndefined();
    });
  });

  describe('type checking', () => {
    it('should correctly identify HTMLElement', () => {
      const element = document.createElement('div');
      const ref: ComponentRef = {
        element,
      };

      const result = toElementVisual(ref);

      expect(result?.element).toBeInstanceOf(HTMLElement);
    });

    it('should correctly reject DocumentFragment', () => {
      const fragment = document.createDocumentFragment();
      const ref: ComponentRef = {
        element: fragment,
      };

      const result = toElementVisual(ref);

      expect(result).toBeUndefined();
    });

    it('should handle custom HTML elements', () => {
      const element = document.createElement('custom-element');
      const ref: ComponentRef = {
        element,
        styles: 'custom',
      };

      const result = toElementVisual(ref);

      expect(result).toBeDefined();
      expect(result?.element).toBe(element);
    });
  });
});

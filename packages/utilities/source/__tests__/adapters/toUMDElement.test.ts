import { toUMDElement, ComponentRef } from '../../adapters/toUMDElement';

describe('toUMDElement', () => {
  describe('happy path', () => {
    it('should convert ComponentRef with HTMLElement to UMDElement', () => {
      const element = document.createElement('div');
      const ref: ComponentRef = {
        element,
        styles: 'test-class',
      };

      const result = toUMDElement(ref);

      expect(result).toBeDefined();
      expect(result?.element).toBe(element);
      expect(result?.styles).toBe('test-class');
    });

    it('should preserve all ComponentRef properties', () => {
      const element = document.createElement('div');
      const events = {
        load: jest.fn(),
        destroy: jest.fn(),
        recalculate: jest.fn(),
      };
      const ref: ComponentRef = {
        element,
        styles: 'test-class',
        events,
      };

      const result = toUMDElement(ref);

      expect(result?.element).toBe(element);
      expect(result?.styles).toBe('test-class');
      expect(result?.events).toBe(events);
    });

    it('should handle ComponentRef with minimal properties', () => {
      const element = document.createElement('div');
      const ref: ComponentRef = {
        element,
      };

      const result = toUMDElement(ref);

      expect(result).toBeDefined();
      expect(result?.element).toBe(element);
    });

    it('should handle ComponentRef with all event types', () => {
      const element = document.createElement('div');
      const load = jest.fn();
      const destroy = jest.fn();
      const recalculate = jest.fn();
      const resize = jest.fn();
      const custom = jest.fn();

      const ref: ComponentRef = {
        element,
        events: {
          load,
          destroy,
          recalculate,
          resize,
          custom,
        },
      };

      const result = toUMDElement(ref);

      expect(result?.events?.load).toBe(load);
      expect(result?.events?.destroy).toBe(destroy);
      expect(result?.events?.recalculate).toBe(recalculate);
      expect(result?.events?.resize).toBe(resize);
      expect(result?.events?.custom).toBe(custom);
    });

    it('should handle different HTML element types', () => {
      const elementTypes = [
        document.createElement('div'),
        document.createElement('span'),
        document.createElement('section'),
        document.createElement('nav'),
        document.createElement('header'),
      ];

      elementTypes.forEach((element) => {
        const ref: ComponentRef = {
          element,
          styles: 'test',
        };

        const result = toUMDElement(ref);

        expect(result).toBeDefined();
        expect(result?.element).toBe(element);
      });
    });

    it('should return ComponentRef as-is when element is HTMLElement', () => {
      const element = document.createElement('div');
      const ref: ComponentRef = {
        element,
        styles: 'test-class',
      };

      const result = toUMDElement(ref);

      // Result should have same structure as input
      expect(result?.element).toBe(ref.element);
      expect(result?.styles).toBe(ref.styles);
    });
  });

  describe('edge cases', () => {
    it('should return undefined for undefined input', () => {
      const result = toUMDElement(undefined);

      expect(result).toBeUndefined();
    });

    it('should return undefined for ComponentRef with DocumentFragment', () => {
      const fragment = document.createDocumentFragment();
      const ref: ComponentRef = {
        element: fragment,
        styles: 'test-class',
      };

      const result = toUMDElement(ref);

      expect(result).toBeUndefined();
    });

    it('should handle ComponentRef with empty styles', () => {
      const element = document.createElement('div');
      const ref: ComponentRef = {
        element,
        styles: '',
      };

      const result = toUMDElement(ref);

      expect(result).toBeDefined();
      expect(result?.styles).toBe('');
    });

    it('should handle ComponentRef without styles property', () => {
      const element = document.createElement('div');
      const ref: ComponentRef = {
        element,
      };

      const result = toUMDElement(ref);

      expect(result).toBeDefined();
      expect(result?.styles).toBeUndefined();
    });

    it('should handle ComponentRef with events but no styles', () => {
      const element = document.createElement('div');
      const ref: ComponentRef = {
        element,
        events: {
          load: jest.fn(),
        },
      };

      const result = toUMDElement(ref);

      expect(result).toBeDefined();
      expect(result?.events).toBeDefined();
    });

    it('should handle custom HTML elements', () => {
      const element = document.createElement('umd-custom-element');
      const ref: ComponentRef = {
        element,
        styles: 'custom',
      };

      const result = toUMDElement(ref);

      expect(result).toBeDefined();
      expect(result?.element).toBe(element);
    });

    it('should handle styles with multiple classes', () => {
      const element = document.createElement('div');
      const ref: ComponentRef = {
        element,
        styles: 'class-one class-two class-three',
      };

      const result = toUMDElement(ref);

      expect(result?.styles).toBe('class-one class-two class-three');
    });
  });

  describe('error conditions', () => {
    it('should return undefined for null input', () => {
      const result = toUMDElement(null as any);

      expect(result).toBeUndefined();
    });

    it('should return undefined when element is DocumentFragment', () => {
      const fragment = document.createDocumentFragment();
      const ref: ComponentRef = {
        element: fragment,
        styles: 'test',
        events: {
          load: jest.fn(),
        },
      };

      const result = toUMDElement(ref);

      expect(result).toBeUndefined();
    });

    it('should handle ComponentRef with text node (invalid)', () => {
      const textNode = document.createTextNode('test');
      const ref = {
        element: textNode as any,
        styles: 'test',
      };

      const result = toUMDElement(ref);

      expect(result).toBeUndefined();
    });

    it('should handle ComponentRef with comment node (invalid)', () => {
      const commentNode = document.createComment('test');
      const ref = {
        element: commentNode as any,
        styles: 'test',
      };

      const result = toUMDElement(ref);

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

      const result1 = toUMDElement(ref);
      const result2 = toUMDElement(ref);

      expect(result1?.element).toBe(result2?.element);
      expect(result1?.styles).toBe(result2?.styles);
    });

    it('should not modify original ComponentRef', () => {
      const element = document.createElement('div');
      const events = { load: jest.fn() };
      const ref: ComponentRef = {
        element,
        styles: 'original-class',
        events,
      };

      const originalStyles = ref.styles;
      const originalElement = ref.element;
      toUMDElement(ref);

      expect(ref.styles).toBe(originalStyles);
      expect(ref.element).toBe(originalElement);
    });

    it('should return undefined consistently for non-HTMLElement', () => {
      const fragment = document.createDocumentFragment();
      const ref: ComponentRef = {
        element: fragment,
        styles: 'test',
      };

      const result1 = toUMDElement(ref);
      const result2 = toUMDElement(ref);

      expect(result1).toBeUndefined();
      expect(result2).toBeUndefined();
    });

    it('should preserve reference equality for events object', () => {
      const element = document.createElement('div');
      const events = {
        load: jest.fn(),
        destroy: jest.fn(),
      };
      const ref: ComponentRef = {
        element,
        events,
      };

      const result = toUMDElement(ref);

      expect(result?.events).toBe(events);
    });
  });

  describe('type checking', () => {
    it('should correctly identify HTMLElement', () => {
      const element = document.createElement('div');
      const ref: ComponentRef = {
        element,
      };

      const result = toUMDElement(ref);

      expect(result?.element).toBeInstanceOf(HTMLElement);
    });

    it('should correctly reject DocumentFragment', () => {
      const fragment = document.createDocumentFragment();
      const ref: ComponentRef = {
        element: fragment,
      };

      const result = toUMDElement(ref);

      expect(result).toBeUndefined();
    });

    it('should handle SVG elements as HTMLElements', () => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const ref: ComponentRef = {
        element: svg as any,
        styles: 'svg-style',
      };

      const result = toUMDElement(ref);

      // SVG elements are not HTMLElements, so should return undefined
      expect(result).toBeUndefined();
    });
  });

  describe('comparison with toElementVisual', () => {
    it('should not add className property like toElementVisual', () => {
      const element = document.createElement('div');
      const ref: ComponentRef = {
        element,
        styles: 'test-class',
      };

      const result = toUMDElement(ref);

      // Should keep original structure without className transformation
      expect(result).toHaveProperty('styles');
      expect(result?.styles).toBe('test-class');
    });

    it('should return undefined for DocumentFragment like toElementVisual', () => {
      const fragment = document.createDocumentFragment();
      const ref: ComponentRef = {
        element: fragment,
      };

      const result = toUMDElement(ref);

      expect(result).toBeUndefined();
    });
  });
});

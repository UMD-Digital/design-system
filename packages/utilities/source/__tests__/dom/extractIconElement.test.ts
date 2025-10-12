import { extractIconElement } from '../../dom/extractIconElement';

describe('extractIconElement', () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement('div');
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('happy path', () => {
    it('should return SVG element when found', () => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      element.appendChild(svg);

      const result = extractIconElement({ element });

      expect(result).toBe(svg);
      expect(result).toBeInstanceOf(SVGElement);
    });

    it('should return IMG element when found and no SVG', () => {
      const img = document.createElement('img');
      img.src = 'icon.png';
      element.appendChild(img);

      const result = extractIconElement({ element });

      expect(result).toBe(img);
      expect(result).toBeInstanceOf(HTMLImageElement);
    });

    it('should prefer SVG over IMG', () => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const img = document.createElement('img');

      element.appendChild(img);
      element.appendChild(svg);

      const result = extractIconElement({ element });

      expect(result).toBe(svg);
    });

    it('should apply color to SVG path when color attribute is set', () => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const path = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path',
      );
      svg.setAttribute('color', '#ff0000');
      svg.appendChild(path);
      element.appendChild(svg);

      const result = extractIconElement({ element }) as SVGElement;

      const resultPath = result.querySelector('path') as SVGPathElement;
      expect(resultPath.style.fill).toBe('#ff0000');
    });

    it('should not apply color when color attribute is missing', () => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const path = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path',
      );
      svg.appendChild(path);
      element.appendChild(svg);

      const result = extractIconElement({ element });

      const resultPath = (result as SVGElement).querySelector(
        'path',
      ) as SVGPathElement;
      expect(resultPath.style.fill).toBe('');
    });

    it('should handle SVG with multiple paths (only colors first)', () => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const path1 = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path',
      );
      const path2 = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path',
      );
      svg.setAttribute('color', '#00ff00');
      svg.appendChild(path1);
      svg.appendChild(path2);
      element.appendChild(svg);

      extractIconElement({ element });

      // querySelector returns first match
      expect(path1.style.fill).toBe('#00ff00');
      expect(path2.style.fill).toBe('');
    });
  });

  describe('edge cases', () => {
    it('should return null when no icon found', () => {
      const div = document.createElement('div');
      element.appendChild(div);

      const result = extractIconElement({ element });

      expect(result).toBeNull();
    });

    it('should return null for empty element', () => {
      const result = extractIconElement({ element });

      expect(result).toBeNull();
    });

    it('should handle SVG without path', () => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('color', '#ff0000');
      element.appendChild(svg);

      const result = extractIconElement({ element });

      expect(result).toBe(svg);
      // Should not throw error
    });

    it('should handle SVG with color but no path', () => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const circle = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'circle',
      );
      svg.setAttribute('color', '#ff0000');
      svg.appendChild(circle);
      element.appendChild(svg);

      expect(() => extractIconElement({ element })).not.toThrow();
    });

    it('should handle nested SVG', () => {
      const container = document.createElement('div');
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      container.appendChild(svg);
      element.appendChild(container);

      const result = extractIconElement({ element });

      expect(result).toBe(svg);
    });

    it('should handle nested IMG', () => {
      const container = document.createElement('div');
      const img = document.createElement('img');
      container.appendChild(img);
      element.appendChild(container);

      const result = extractIconElement({ element });

      expect(result).toBe(img);
    });

    it('should handle empty color attribute', () => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const path = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path',
      );
      svg.setAttribute('color', '');
      svg.appendChild(path);
      element.appendChild(svg);

      const result = extractIconElement({ element });

      expect(result).toBe(svg);
      expect(path.style.fill).toBe('');
    });

    it('should handle various color formats', () => {
      const testCases = [
        { input: '#ff0000', expected: '#ff0000' },
        { input: 'red', expected: 'red' },
        { input: 'rgb(0, 255, 0)', expected: 'rgb(0, 255, 0)' },
        { input: 'rgba(0, 0, 255, 0.5)', expected: 'rgba(0, 0, 255, 0.5)' },
      ];

      testCases.forEach(({ input, expected }) => {
        element.innerHTML = '';
        const svg = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'svg',
        );
        const path = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'path',
        );
        svg.setAttribute('color', input);
        svg.appendChild(path);
        element.appendChild(svg);

        extractIconElement({ element });

        expect(path.style.fill).toBe(expected);
      });
    });

    it('should handle SVG with path but null color', () => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const path = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path',
      );
      svg.appendChild(path);
      element.appendChild(svg);

      const result = extractIconElement({ element });

      expect(result).toBe(svg);
      expect(path.style.fill).toBe('');
    });

    it('should handle IMG without src', () => {
      const img = document.createElement('img');
      element.appendChild(img);

      const result = extractIconElement({ element });

      expect(result).toBe(img);
    });

    it('should find first SVG when multiple exist', () => {
      const svg1 = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg',
      );
      const svg2 = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg',
      );
      svg1.id = 'first';
      svg2.id = 'second';

      element.appendChild(svg1);
      element.appendChild(svg2);

      const result = extractIconElement({ element }) as SVGElement;

      expect(result.id).toBe('first');
    });

    it('should find first IMG when multiple exist', () => {
      const img1 = document.createElement('img');
      const img2 = document.createElement('img');
      img1.alt = 'first';
      img2.alt = 'second';

      element.appendChild(img1);
      element.appendChild(img2);

      const result = extractIconElement({ element }) as HTMLImageElement;

      expect(result.alt).toBe('first');
    });
  });

  describe('error conditions', () => {
    it('should handle null element', () => {
      expect(() => extractIconElement({ element: null as any })).toThrow();
    });

    it('should handle undefined element', () => {
      expect(() => extractIconElement({ element: undefined as any })).toThrow();
    });

    it('should handle element not in DOM', () => {
      const detached = document.createElement('div');
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      detached.appendChild(svg);

      const result = extractIconElement({ element: detached });

      expect(result).toBe(svg);
    });
  });

  describe('color application', () => {
    it('should modify SVG path fill style', () => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const path = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path',
      );
      path.style.fill = 'blue';
      svg.setAttribute('color', 'red');
      svg.appendChild(path);
      element.appendChild(svg);

      extractIconElement({ element });

      expect(path.style.fill).toBe('red');
    });

    it('should only apply color if both color attribute and path exist', () => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('color', 'red');
      element.appendChild(svg);

      expect(() => extractIconElement({ element })).not.toThrow();
    });

    it('should not modify IMG elements', () => {
      const img = document.createElement('img');
      img.src = 'icon.png';
      element.appendChild(img);

      const originalSrc = img.src;
      extractIconElement({ element });

      expect(img.src).toBe(originalSrc);
    });
  });

  describe('return type', () => {
    it('should return SVGElement type for SVG', () => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      element.appendChild(svg);

      const result = extractIconElement({ element });

      expect(result).toBeInstanceOf(SVGElement);
    });

    it('should return HTMLImageElement type for IMG', () => {
      const img = document.createElement('img');
      element.appendChild(img);

      const result = extractIconElement({ element });

      expect(result).toBeInstanceOf(HTMLImageElement);
    });

    it('should return null type when no icon', () => {
      const result = extractIconElement({ element });

      expect(result).toBeNull();
    });
  });
});

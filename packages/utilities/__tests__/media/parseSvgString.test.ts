import { parseSvgString } from '../../source/media/parseSvgString';

describe('parseSvgString', () => {
  describe('happy path', () => {
    it('should parse SVG string and return element', () => {
      const svg = '<svg xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40"/></svg>';

      const result = parseSvgString(svg);

      expect(result).not.toBeNull();
      expect(result?.nodeName).toBe('svg');
    });

    it('should return SVGElement', () => {
      const svg = '<svg><rect width="100" height="100"/></svg>';

      const result = parseSvgString(svg);

      expect(result).toBeInstanceOf(SVGElement);
    });

    it('should preserve SVG attributes', () => {
      const svg = '<svg width="100" height="200" viewBox="0 0 100 200"></svg>';

      const result = parseSvgString(svg) as SVGElement;

      expect(result.getAttribute('width')).toBe('100');
      expect(result.getAttribute('height')).toBe('200');
      expect(result.getAttribute('viewBox')).toBe('0 0 100 200');
    });

    it('should preserve child elements', () => {
      const svg = '<svg><circle cx="50" cy="50" r="40"/></svg>';

      const result = parseSvgString(svg) as SVGElement;

      expect(result.children.length).toBe(1);
      expect(result.children[0].tagName).toBe('circle');
    });

    it('should preserve multiple child elements', () => {
      const svg = '<svg><circle/><rect/><path/></svg>';

      const result = parseSvgString(svg) as SVGElement;

      expect(result.children.length).toBe(3);
    });
  });

  describe('edge cases', () => {
    it('should trim whitespace from string', () => {
      const svg = '   <svg></svg>   ';

      const result = parseSvgString(svg);

      expect(result).not.toBeNull();
      expect(result?.nodeName).toBe('svg');
    });

    it('should handle newlines and tabs', () => {
      const svg = `
        <svg>
          <circle cx="50" cy="50" r="40"/>
        </svg>
      `;

      const result = parseSvgString(svg);

      expect(result).not.toBeNull();
      expect(result?.nodeName).toBe('svg');
    });

    it('should handle minimal SVG', () => {
      const svg = '<svg/>';

      const result = parseSvgString(svg);

      expect(result).not.toBeNull();
      expect(result?.nodeName).toBe('svg');
    });

    it('should handle SVG with xmlns', () => {
      const svg = '<svg xmlns="http://www.w3.org/2000/svg"></svg>';

      const result = parseSvgString(svg) as SVGElement;

      expect(result.getAttribute('xmlns')).toBe('http://www.w3.org/2000/svg');
    });

    it('should handle SVG with inline styles', () => {
      const svg = '<svg><circle style="fill:red" cx="50" cy="50" r="40"/></svg>';

      const result = parseSvgString(svg) as SVGElement;

      const circle = result.querySelector('circle');
      expect(circle?.getAttribute('style')).toBe('fill:red');
    });

    it('should handle SVG with special characters in text', () => {
      const svg = '<svg><text>Hello & "World"</text></svg>';

      const result = parseSvgString(svg) as SVGElement;

      expect(result).not.toBeNull();
    });

    it('should handle SVG with nested groups', () => {
      const svg = '<svg><g><g><circle cx="50" cy="50" r="40"/></g></g></svg>';

      const result = parseSvgString(svg) as SVGElement;

      expect(result.querySelector('circle')).not.toBeNull();
    });

    it('should handle SVG with defs', () => {
      const svg = '<svg><defs><linearGradient id="grad1"></linearGradient></defs></svg>';

      const result = parseSvgString(svg) as SVGElement;

      expect(result.querySelector('defs')).not.toBeNull();
    });

    it('should handle SVG with comments', () => {
      const svg = '<svg><!-- Comment --></svg>';

      const result = parseSvgString(svg);

      expect(result).not.toBeNull();
      expect(result?.nodeName).toBe('svg');
    });

    it('should handle empty SVG', () => {
      const svg = '<svg></svg>';

      const result = parseSvgString(svg);

      expect(result).not.toBeNull();
      expect(result?.nodeName).toBe('svg');
    });
  });

  describe('return value', () => {
    it('should return first child of parsed HTML', () => {
      const svg = '<svg></svg><div></div>';

      const result = parseSvgString(svg);

      // Should only return the SVG (first child)
      expect(result?.nodeName).toBe('svg');
    });

    it('should return null for empty string', () => {
      const result = parseSvgString('');

      expect(result).toBeNull();
    });

    it('should return null for whitespace only', () => {
      const result = parseSvgString('   ');

      expect(result).toBeNull();
    });

    it('should return element with parent (the temporary div)', () => {
      const svg = '<svg></svg>';

      const result = parseSvgString(svg);

      // The function creates a div, sets innerHTML, and returns div.firstChild
      // So the result's parentElement is the div, not null
      expect(result?.parentElement).toBeInstanceOf(HTMLDivElement);
    });

    it('should return element that can be appended', () => {
      const svg = '<svg></svg>';

      const result = parseSvgString(svg) as Element;
      document.body.appendChild(result);

      expect(result.parentElement).toBe(document.body);

      document.body.removeChild(result);
    });
  });

  describe('different element types', () => {
    it('should handle non-SVG elements', () => {
      const html = '<div>Test</div>';

      const result = parseSvgString(html);

      expect(result?.nodeName).toBe('DIV');
    });

    it('should handle paragraph elements', () => {
      const html = '<p>Text</p>';

      const result = parseSvgString(html);

      expect(result?.nodeName).toBe('P');
    });

    it('should handle span elements', () => {
      const html = '<span>Text</span>';

      const result = parseSvgString(html);

      expect(result?.nodeName).toBe('SPAN');
    });
  });

  describe('error conditions', () => {
    it('should handle null input', () => {
      expect(() => parseSvgString(null as any)).toThrow();
    });

    it('should handle undefined input', () => {
      expect(() => parseSvgString(undefined as any)).toThrow();
    });

    it('should handle malformed SVG', () => {
      const malformed = '<svg><unclosed';

      const result = parseSvgString(malformed);

      // Browser will attempt to parse and fix
      expect(result).not.toBeNull();
    });

    it('should handle invalid XML', () => {
      const invalid = '<svg><invalid><</svg>';

      const result = parseSvgString(invalid);

      // Browser parsing will handle this
      expect(result).not.toBeNull();
    });
  });

  describe('parsing behavior', () => {
    it('should use innerHTML for parsing', () => {
      const svg = '<svg id="test-svg"></svg>';

      const result = parseSvgString(svg) as SVGElement;

      expect(result.id).toBe('test-svg');
    });

    it('should handle complex SVG paths', () => {
      const svg = '<svg><path d="M10 10 L 20 20"/></svg>';

      const result = parseSvgString(svg) as SVGElement;

      const path = result.querySelector('path');
      expect(path?.getAttribute('d')).toBe('M10 10 L 20 20');
    });

    it('should handle SVG with multiple attributes', () => {
      const svg = '<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"></svg>';

      const result = parseSvgString(svg) as SVGElement;

      expect(result.hasAttribute('width')).toBe(true);
      expect(result.hasAttribute('height')).toBe(true);
      expect(result.hasAttribute('viewBox')).toBe(true);
      expect(result.hasAttribute('xmlns')).toBe(true);
    });
  });
});
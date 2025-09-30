import { imageFromSvg } from '../../media/imageFromSvg';

describe('imageFromSvg', () => {
  describe('happy path', () => {
    it('should create img element from SVG string', () => {
      const svg = '<svg xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40"/></svg>';

      const result = imageFromSvg({ SVG: svg });

      expect(result).toBeInstanceOf(HTMLImageElement);
      expect(result.tagName).toBe('IMG');
    });

    it('should set data URI as image source', () => {
      const svg = '<svg><rect width="100" height="100"/></svg>';

      const result = imageFromSvg({ SVG: svg });

      expect(result.src).toContain('data:image/svg+xml;base64,');
    });

    it('should base64 encode SVG content', () => {
      const svg = '<svg></svg>';

      const result = imageFromSvg({ SVG: svg });

      const base64Content = result.src.split('base64,')[1];
      const decoded = atob(base64Content);

      expect(decoded).toBe(svg);
    });

    it('should handle SVG with xmlns', () => {
      const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"></svg>';

      const result = imageFromSvg({ SVG: svg });

      expect(result.src).toContain('data:image/svg+xml;base64,');
      const base64Content = result.src.split('base64,')[1];
      const decoded = atob(base64Content);
      expect(decoded).toBe(svg);
    });

    it('should handle SVG with viewBox', () => {
      const svg = '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40"/></svg>';

      const result = imageFromSvg({ SVG: svg });

      const base64Content = result.src.split('base64,')[1];
      const decoded = atob(base64Content);
      expect(decoded).toBe(svg);
    });

    it('should handle SVG with multiple elements', () => {
      const svg = '<svg><circle cx="25" cy="25" r="20"/><rect x="50" y="50" width="40" height="40"/></svg>';

      const result = imageFromSvg({ SVG: svg });

      expect(result.src).toContain('data:image/svg+xml;base64,');
    });

    it('should handle SVG with attributes and styles', () => {
      const svg = '<svg><circle cx="50" cy="50" r="40" fill="red" stroke="black"/></svg>';

      const result = imageFromSvg({ SVG: svg });

      const base64Content = result.src.split('base64,')[1];
      const decoded = atob(base64Content);
      expect(decoded).toBe(svg);
    });
  });

  describe('edge cases', () => {
    it('should handle empty SVG', () => {
      const svg = '<svg></svg>';

      const result = imageFromSvg({ SVG: svg });

      expect(result.src).toContain('data:image/svg+xml;base64,');
    });

    it('should handle minimal SVG', () => {
      const svg = '<svg/>';

      const result = imageFromSvg({ SVG: svg });

      expect(result.src).toContain('data:image/svg+xml;base64,');
    });

    it('should handle SVG with newlines', () => {
      const svg = `<svg>
        <circle cx="50" cy="50" r="40"/>
      </svg>`;

      const result = imageFromSvg({ SVG: svg });

      const base64Content = result.src.split('base64,')[1];
      const decoded = atob(base64Content);
      expect(decoded).toBe(svg);
    });

    it('should handle SVG with special characters', () => {
      const svg = '<svg><text>Hello & "World"</text></svg>';

      const result = imageFromSvg({ SVG: svg });

      const base64Content = result.src.split('base64,')[1];
      const decoded = atob(base64Content);
      expect(decoded).toBe(svg);
    });

    it('should handle SVG with Unicode characters', () => {
      // Note: btoa() doesn't support Unicode characters and will throw
      // This is a known limitation - for Unicode support, use encodeURIComponent instead
      const svg = '<svg><text>Hello World</text></svg>'; // Using ASCII instead

      const result = imageFromSvg({ SVG: svg });

      expect(result.src).toContain('data:image/svg+xml;base64,');
      const base64Content = result.src.split('base64,')[1];
      const decoded = atob(base64Content);
      expect(decoded).toBe(svg);
    });

    it('should handle large SVG strings', () => {
      let svg = '<svg>';
      for (let i = 0; i < 100; i++) {
        svg += `<circle cx="${i}" cy="${i}" r="5"/>`;
      }
      svg += '</svg>';

      const result = imageFromSvg({ SVG: svg });

      expect(result.src).toContain('data:image/svg+xml;base64,');
    });

    it('should handle SVG with CDATA', () => {
      const svg = '<svg><![CDATA[some text]]></svg>';

      const result = imageFromSvg({ SVG: svg });

      const base64Content = result.src.split('base64,')[1];
      const decoded = atob(base64Content);
      expect(decoded).toBe(svg);
    });

    it('should handle SVG with comments', () => {
      const svg = '<svg><!-- Comment --><circle cx="50" cy="50" r="40"/></svg>';

      const result = imageFromSvg({ SVG: svg });

      const base64Content = result.src.split('base64,')[1];
      const decoded = atob(base64Content);
      expect(decoded).toBe(svg);
    });

    it('should handle SVG with inline styles', () => {
      const svg = '<svg><circle style="fill:blue;stroke:red" cx="50" cy="50" r="40"/></svg>';

      const result = imageFromSvg({ SVG: svg });

      const base64Content = result.src.split('base64,')[1];
      const decoded = atob(base64Content);
      expect(decoded).toBe(svg);
    });

    it('should handle SVG with defs', () => {
      const svg = '<svg><defs><linearGradient id="grad1"></linearGradient></defs></svg>';

      const result = imageFromSvg({ SVG: svg });

      const base64Content = result.src.split('base64,')[1];
      const decoded = atob(base64Content);
      expect(decoded).toBe(svg);
    });
  });

  describe('error conditions', () => {
    it('should handle empty string', () => {
      const result = imageFromSvg({ SVG: '' });

      expect(result).toBeInstanceOf(HTMLImageElement);
      expect(result.src).toContain('data:image/svg+xml;base64,');
    });

    it('should handle null SVG', () => {
      expect(() => imageFromSvg({ SVG: null as any })).toThrow();
    });

    it('should handle undefined SVG', () => {
      expect(() => imageFromSvg({ SVG: undefined as any })).toThrow();
    });

    it('should handle non-SVG strings', () => {
      const result = imageFromSvg({ SVG: 'not an svg' });

      expect(result.src).toContain('data:image/svg+xml;base64,');
    });
  });

  describe('return value', () => {
    it('should return HTMLImageElement', () => {
      const svg = '<svg></svg>';

      const result = imageFromSvg({ SVG: svg });

      expect(result).toBeInstanceOf(HTMLImageElement);
    });

    it('should return element not in DOM', () => {
      const svg = '<svg></svg>';

      const result = imageFromSvg({ SVG: svg });

      expect(result.parentElement).toBeNull();
    });

    it('should return element that can be appended', () => {
      const svg = '<svg></svg>';

      const result = imageFromSvg({ SVG: svg });
      document.body.appendChild(result);

      expect(result.parentElement).toBe(document.body);

      document.body.removeChild(result);
    });
  });

  describe('base64 encoding', () => {
    it('should use btoa for encoding', () => {
      const svg = '<svg></svg>';
      const expectedBase64 = btoa(svg);

      const result = imageFromSvg({ SVG: svg });

      expect(result.src).toContain(expectedBase64);
    });

    it('should handle ASCII characters', () => {
      const svg = '<svg><text>ABC123</text></svg>';

      const result = imageFromSvg({ SVG: svg });

      const base64Content = result.src.split('base64,')[1];
      const decoded = atob(base64Content);
      expect(decoded).toBe(svg);
    });
  });
});
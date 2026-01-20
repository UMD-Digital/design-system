/**
 * @jest-environment node
 */

import {
  generateCSSStrings,
  generateTokensCSS,
  generateBaseCSS,
  processNestedJssObjects,
  processWebComponentStyles,
  minifyCSS,
  removeDuplicates,
  type GenerateCSSStringsResult,
} from '../../source/exports/generate';

describe('exports/generate', () => {
  describe('generateCSSStrings', () => {
    let cssStrings: GenerateCSSStringsResult;

    beforeAll(async () => {
      // Generate all CSS strings once for all tests
      cssStrings = await generateCSSStrings();
    });

    it('should generate all CSS string categories', () => {
      expect(cssStrings.tokens).toBeDefined();
      expect(cssStrings.typography).toBeDefined();
      expect(cssStrings.layout).toBeDefined();
      expect(cssStrings.element).toBeDefined();
      expect(cssStrings.animation).toBeDefined();
      expect(cssStrings.accessibility).toBeDefined();
      expect(cssStrings.webComponents).toBeDefined();
      expect(cssStrings.base).toBeDefined();
      expect(cssStrings.styles).toBeDefined();
    });

    it('should generate valid tokens CSS', () => {
      // Check tokens contains CSS variables
      expect(cssStrings.tokens).toContain(':root');
      expect(cssStrings.tokens).toContain('--umd-');
    });

    it('should generate valid styles bundle', () => {
      // Styles should be the full bundle (larger than tokens)
      expect(cssStrings.styles.length).toBeGreaterThan(cssStrings.tokens.length);
    });

    it('should generate minified CSS', () => {
      // Minified CSS should not have excessive whitespace
      expect(cssStrings.tokens).not.toMatch(/\n\s+\n/);
      // Should have minimal formatting (no pretty-printing)
      expect(cssStrings.tokens).not.toMatch(/:\s{2,}/);
    });
  });

  describe('utility re-exports', () => {
    it('should export generateTokensCSS', () => {
      expect(typeof generateTokensCSS).toBe('function');
    });

    it('should export generateBaseCSS', () => {
      expect(typeof generateBaseCSS).toBe('function');
    });

    it('should export processNestedJssObjects', () => {
      expect(typeof processNestedJssObjects).toBe('function');
    });

    it('should export processWebComponentStyles', () => {
      expect(typeof processWebComponentStyles).toBe('function');
    });

    it('should export minifyCSS', () => {
      expect(typeof minifyCSS).toBe('function');

      const css = `.test { color: red; }`;
      const minified = minifyCSS(css);
      expect(minified).toBe('.test{color:red;}');
    });

    it('should export removeDuplicates', () => {
      expect(typeof removeDuplicates).toBe('function');
    });
  });

  describe('generateTokensCSS', () => {
    it('should generate CSS custom properties from tokens', () => {
      const mockColor = {
        red: '#E21833',
        gold: '#FFD200',
      };
      const mockSpacing = {
        sm: '16px',
        md: '24px',
      };
      const mockFont = {
        family: { sans: 'Interstate, sans-serif' },
        size: { base: '16px' },
      };
      const mockMedia = {
        conditionals: {},
      };

      const css = generateTokensCSS(
        mockColor,
        mockSpacing,
        mockFont,
        mockMedia,
      );

      expect(css).toContain(':root');
      expect(css).toContain('--umd-color-red');
      expect(css).toContain('#E21833');
      expect(css).toContain('--umd-space-sm');
      expect(css).toContain('16px');
    });
  });
});

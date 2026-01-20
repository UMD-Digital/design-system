/**
 * @jest-environment node
 */

import {
  generateTailwindStrings,
  generateTailwind4CSS,
  generateTailwind4Theme,
  generateTailwind4Utilities,
  generateThemeOnlyCSS,
  type GenerateTailwindStringsResult,
} from '../../source/exports/tailwind';

describe('exports/tailwind', () => {
  describe('generateTailwindStrings', () => {
    let tailwindStrings: GenerateTailwindStringsResult;

    beforeAll(() => {
      tailwindStrings = generateTailwindStrings();
    });

    it('should generate all Tailwind string categories', () => {
      expect(tailwindStrings.tailwind).toBeDefined();
      expect(tailwindStrings.themeOnly).toBeDefined();
    });

    it('should generate valid Tailwind CSS content', () => {
      // Check tailwind.css contains Tailwind import
      expect(tailwindStrings.tailwind).toContain('@import');
      expect(tailwindStrings.tailwind).toContain('@theme');
    });

    it('should generate theme-only CSS without Tailwind import', () => {
      // Theme-only should have variables but no @import "tailwindcss"
      expect(tailwindStrings.themeOnly).toContain('--');
      expect(tailwindStrings.themeOnly).not.toContain('@import "tailwindcss"');
    });
  });

  describe('utility re-exports', () => {
    it('should export generateTailwind4CSS', () => {
      expect(typeof generateTailwind4CSS).toBe('function');

      const css = generateTailwind4CSS();
      expect(css).toContain('@import');
      expect(css).toContain('@theme');
    });

    it('should export generateTailwind4Theme', () => {
      expect(typeof generateTailwind4Theme).toBe('function');

      const theme = generateTailwind4Theme();
      expect(theme).toContain('--color-');
      expect(theme).toContain('--spacing-');
    });

    it('should export generateTailwind4Utilities', () => {
      expect(typeof generateTailwind4Utilities).toBe('function');

      const utilities = generateTailwind4Utilities();
      expect(utilities).toContain('@utility');
    });

    it('should export generateThemeOnlyCSS', () => {
      expect(typeof generateThemeOnlyCSS).toBe('function');

      const css = generateThemeOnlyCSS();
      // Should have theme variables
      expect(css).toContain('--');
      // Should not have Tailwind import
      expect(css).not.toContain('@import "tailwindcss"');
    });
  });

  describe('generateTailwind4CSS', () => {
    it('should generate complete Tailwind 4 CSS', () => {
      const css = generateTailwind4CSS();

      // Should have Tailwind import
      expect(css).toContain('@import');

      // Should have @theme block
      expect(css).toContain('@theme');

      // Should have color variables
      expect(css).toContain('--color-');

      // Should have spacing variables
      expect(css).toContain('--spacing-');
    });

    it('should include UMD design token values', () => {
      const css = generateTailwind4CSS();

      // Should include UMD brand colors
      expect(css).toContain('red');
      expect(css).toContain('gold');

      // Should include typography
      expect(css).toContain('font');
    });
  });

  describe('generateThemeOnlyCSS', () => {
    it('should generate CSS without Tailwind dependency', () => {
      const css = generateThemeOnlyCSS();

      // Should have CSS variables
      expect(css).toContain(':root');
      expect(css).toContain('--');

      // Should NOT have @import "tailwindcss"
      expect(css).not.toContain('@import "tailwindcss"');
    });
  });
});

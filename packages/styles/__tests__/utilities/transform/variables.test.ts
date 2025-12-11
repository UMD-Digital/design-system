import { fromTokens, toString, toCssObject, formatTokenKey } from '../../../source/utilities/variables';

describe('transform/variables utilities', () => {
  describe('formatTokenKey', () => {
    it('should keep numeric keys as-is', () => {
      expect(formatTokenKey('100', false)).toBe('100');
      expect(formatTokenKey('2xl', false)).toBe('2xl');
    });

    it('should convert to kebab-case when requested', () => {
      expect(formatTokenKey('primaryColor', true)).toBe('primary-color');
      expect(formatTokenKey('fontFamily', true)).toBe('font-family');
    });
  });

  describe('fromTokens', () => {
    it('should convert flat token object to CSS variables', () => {
      const tokens = {
        primary: '#ff0000',
        secondary: '#00ff00',
        tertiary: '#0000ff',
      };

      const result = fromTokens(tokens, 'color-');

      expect(result).toEqual({
        '--color-primary': '#ff0000',
        '--color-secondary': '#00ff00',
        '--color-tertiary': '#0000ff',
      });
    });

    it('should handle nested objects', () => {
      const tokens = {
        primary: '#ff0000',
        neutral: {
          100: '#ffffff',
          900: '#000000',
        },
      };

      const result = fromTokens(tokens, 'color-');

      expect(result).toEqual({
        '--color-primary': '#ff0000',
        '--color-neutral-100': '#ffffff',
        '--color-neutral-900': '#000000',
      });
    });

    it('should apply kebab-case when specified', () => {
      const tokens = {
        primaryColor: '#ff0000',
        secondaryColor: '#00ff00',
        textColor: {
          dark: '#333333',
          light: '#eeeeee',
        },
      };

      const result = fromTokens(tokens, 'color-', { kebabCase: true });

      expect(result).toEqual({
        '--color-primary-color': '#ff0000',
        '--color-secondary-color': '#00ff00',
        '--color-text-color-dark': '#333333',
        '--color-text-color-light': '#eeeeee',
      });
    });

    it('should accept custom key formatter', () => {
      const tokens = {
        primary: '#ff0000',
        secondary: '#00ff00',
      };

      const customFormatter = (key: string) => key.toUpperCase();

      const result = fromTokens(tokens, 'color-', {
        formatKey: customFormatter,
      });

      expect(result).toEqual({
        '--color-PRIMARY': '#ff0000',
        '--color-SECONDARY': '#00ff00',
      });
    });
  });

  describe('toCssObject', () => {
    it('should convert CSS variables object to CSS Object', () => {
      const cssVars = {
        '--color-primary': '#ff0000',
        '--color-secondary': '#00ff00',
        '--spacing-sm': '8px',
      };

      const result = toCssObject(cssVars);

      expect(result).toBe(`{
  '--color-primary': '#ff0000',
  '--color-secondary': '#00ff00',
  '--spacing-sm': '8px',
};`);
    });
  });

  describe('toString', () => {
    it('should convert CSS variables object to CSS string', () => {
      const cssVars = {
        '--color-primary': '#ff0000',
        '--color-secondary': '#00ff00',
      };

      const result = toString(cssVars);

      expect(result).toBe(`  '--color-primary': '#ff0000';
  '--color-secondary': '#00ff00';`);
    });
  });
});

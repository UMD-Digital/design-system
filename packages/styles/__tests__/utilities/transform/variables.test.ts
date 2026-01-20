import { fromTokens, toString, toCssObject, formatTokenKey, generateTokensCSS } from '../../../source/utilities/transform/variables';

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

  describe('generateTokensCSS', () => {
    it('should generate :root block with color tokens', () => {
      const color = {
        red: '#E21833',
        gold: '#FFD200',
        gray: {
          light: '#f5f5f5',
          dark: '#333333',
        },
      };
      const spacing = {};
      const font = { size: {}, family: { serif: '', sans: '', campaign: '', mono: '' } };
      const media = { conditionals: {} };

      const result = generateTokensCSS(color, spacing, font, media);

      expect(result).toContain(':root {');
      expect(result).toContain('/* Color Tokens */');
      expect(result).toContain('--umd-color-red: #E21833;');
      expect(result).toContain('--umd-color-gold: #FFD200;');
      expect(result).toContain('--umd-color-gray-light: #f5f5f5;');
      expect(result).toContain('--umd-color-gray-dark: #333333;');
    });

    it('should generate spacing tokens', () => {
      const color = {};
      const spacing = {
        sm: '8px',
        md: '16px',
        lg: '24px',
        maxWidth: {
          small: '640px',
          large: '1280px',
        },
      };
      const font = { size: {}, family: { serif: '', sans: '', campaign: '', mono: '' } };
      const media = { conditionals: {} };

      const result = generateTokensCSS(color, spacing, font, media);

      expect(result).toContain('/* Spacing Tokens */');
      expect(result).toContain('--umd-space-sm: 8px;');
      expect(result).toContain('--umd-space-md: 16px;');
      expect(result).toContain('--umd-space-lg: 24px;');
      expect(result).toContain('--umd-space-max-width-small: 640px;');
      expect(result).toContain('--umd-space-max-width-large: 1280px;');
    });

    it('should generate font tokens', () => {
      const color = {};
      const spacing = {};
      const font = {
        size: {
          sm: '14px',
          base: '16px',
          lg: '20px',
        },
        family: {
          serif: 'Georgia, serif',
          sans: 'Arial, sans-serif',
          campaign: '"Crimson Pro", Georgia, serif',
          mono: 'monospace',
        },
      };
      const media = { conditionals: {} };

      const result = generateTokensCSS(color, spacing, font, media);

      expect(result).toContain('/* Font Size Tokens */');
      expect(result).toContain('--umd-font-size-sm: 14px;');
      expect(result).toContain('--umd-font-size-base: 16px;');
      expect(result).toContain('--umd-font-size-lg: 20px;');
      expect(result).toContain('/* Font Family Tokens */');
      expect(result).toContain('--umd-font-serif: Georgia, serif;');
      expect(result).toContain('--umd-font-sans: Arial, sans-serif;');
      expect(result).toContain('--umd-font-campaign: "Crimson Pro", Georgia, serif;');
      expect(result).toContain('--umd-font-mono: monospace;');
    });

    it('should generate media query blocks', () => {
      const color = {};
      const spacing = {};
      const font = { size: {}, family: { serif: '', sans: '', campaign: '', mono: '' } };
      const media = {
        conditionals: {
          '@media (min-width: 768px)': {
            '--spacing-md': '24px',
          },
          '@media (min-width: 1024px)': {
            '--spacing-lg': '32px',
          },
          notAMediaQuery: 'ignored',
        },
      };

      const result = generateTokensCSS(color, spacing, font, media);

      expect(result).toContain('@media (min-width: 768px) { :root { --spacing-md: 24px; } }');
      expect(result).toContain('@media (min-width: 1024px) { :root { --spacing-lg: 32px; } }');
      expect(result).not.toContain('notAMediaQuery');
    });

    it('should combine all token types in single output', () => {
      const color = { primary: '#E21833' };
      const spacing = { md: '16px' };
      const font = {
        size: { base: '16px' },
        family: { serif: 'Georgia', sans: 'Arial', campaign: 'Crimson', mono: 'mono' },
      };
      const media = { conditionals: {} };

      const result = generateTokensCSS(color, spacing, font, media);

      expect(result).toContain(':root {');
      expect(result).toContain('/* Color Tokens */');
      expect(result).toContain('/* Spacing Tokens */');
      expect(result).toContain('/* Font Size Tokens */');
      expect(result).toContain('/* Font Family Tokens */');
    });
  });
});

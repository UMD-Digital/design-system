import { combineStyles } from '../../styles/combineStyles';

describe('combineStyles', () => {
  describe('happy path', () => {
    it('should combine multiple style strings', () => {
      const style1 = '.class1 { color: red; }';
      const style2 = '.class2 { color: blue; }';

      const result = combineStyles(style1, style2);

      expect(result).toBe('.class1 { color: red; }.class2 { color: blue; }');
    });

    it('should combine three or more styles', () => {
      const style1 = '.a { }';
      const style2 = '.b { }';
      const style3 = '.c { }';

      const result = combineStyles(style1, style2, style3);

      expect(result).toBe('.a { }.b { }.c { }');
    });

    it('should handle empty strings', () => {
      const style1 = '.class { }';
      const style2 = '';
      const style3 = '.other { }';

      const result = combineStyles(style1, style2, style3);

      // Empty strings are falsy, so they get filtered out
      expect(result).toBe('.class { }.other { }');
    });

    it('should combine single style', () => {
      const style = '.class { color: red; }';

      const result = combineStyles(style);

      expect(result).toBe('.class { color: red; }');
    });

    it('should handle no arguments', () => {
      const result = combineStyles();

      expect(result).toBe('');
    });
  });

  describe('edge cases', () => {
    it('should filter out null values', () => {
      const style1 = '.class1 { }';
      const style2 = null;
      const style3 = '.class2 { }';

      const result = combineStyles(style1, style2, style3);

      expect(result).toBe('.class1 { }.class2 { }');
    });

    it('should filter out undefined values', () => {
      const style1 = '.class1 { }';
      const style2 = undefined;
      const style3 = '.class2 { }';

      const result = combineStyles(style1, style2, style3);

      expect(result).toBe('.class1 { }.class2 { }');
    });

    it('should filter out all null and undefined', () => {
      const result = combineStyles(null, undefined, null);

      expect(result).toBe('');
    });

    it('should handle mix of valid and invalid values', () => {
      const result = combineStyles(
        '.a { }',
        null,
        '.b { }',
        undefined,
        '.c { }',
        '',
      );

      expect(result).toBe('.a { }.b { }.c { }');
    });

    it('should handle whitespace-only strings', () => {
      const result = combineStyles('.a { }', '   ', '.b { }');

      // Whitespace strings are truthy, so they're kept
      expect(result).toBe('.a { }   .b { }');
    });

    it('should handle long style strings', () => {
      const longStyle = '.class { ' + 'property: value; '.repeat(100) + '}';

      const result = combineStyles(longStyle, '.other { }');

      expect(result).toContain(longStyle);
      expect(result).toContain('.other { }');
    });

    it('should preserve order of styles', () => {
      const style1 = '.first { }';
      const style2 = '.second { }';
      const style3 = '.third { }';

      const result = combineStyles(style1, style2, style3);

      expect(result.indexOf('.first')).toBeLessThan(result.indexOf('.second'));
      expect(result.indexOf('.second')).toBeLessThan(result.indexOf('.third'));
    });

    it('should handle special CSS characters', () => {
      const style1 = '.class { content: "\\n"; }';
      const style2 = '.other { content: "\'"; }';

      const result = combineStyles(style1, style2);

      expect(result).toContain('\\n');
      expect(result).toContain("'");
    });

    it('should handle media queries', () => {
      const style1 = '@media (min-width: 768px) { .class { } }';
      const style2 = '.other { }';

      const result = combineStyles(style1, style2);

      expect(result).toContain('@media');
      expect(result).toContain('.other');
    });

    it('should handle CSS variables', () => {
      const style1 = ':root { --color: red; }';
      const style2 = '.class { color: var(--color); }';

      const result = combineStyles(style1, style2);

      expect(result).toContain('--color');
      expect(result).toContain('var(--color)');
    });

    it('should handle keyframes', () => {
      const style1 = '@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }';
      const style2 = '.class { animation: fadeIn 1s; }';

      const result = combineStyles(style1, style2);

      expect(result).toContain('@keyframes');
      expect(result).toContain('animation');
    });

    it('should handle pseudo-classes', () => {
      const style1 = '.class:hover { }';
      const style2 = '.class:focus { }';

      const result = combineStyles(style1, style2);

      expect(result).toContain(':hover');
      expect(result).toContain(':focus');
    });

    it('should handle pseudo-elements', () => {
      const style1 = '.class::before { }';
      const style2 = '.class::after { }';

      const result = combineStyles(style1, style2);

      expect(result).toContain('::before');
      expect(result).toContain('::after');
    });
  });

  describe('conditional styles', () => {
    it('should support conditional style inclusion', () => {
      const isDark = true;
      const baseStyles = '.container { }';
      const darkStyles = isDark ? '.dark { }' : null;

      const result = combineStyles(baseStyles, darkStyles);

      expect(result).toContain('.container');
      expect(result).toContain('.dark');
    });

    it('should exclude styles when condition is false', () => {
      const isDark = false;
      const baseStyles = '.container { }';
      const darkStyles = isDark ? '.dark { }' : null;

      const result = combineStyles(baseStyles, darkStyles);

      expect(result).toContain('.container');
      expect(result).not.toContain('.dark');
    });

    it('should support multiple conditional styles', () => {
      const isLarge = true;
      const isDark = false;
      const isAnimated = true;

      const result = combineStyles(
        '.base { }',
        isLarge ? '.large { }' : null,
        isDark ? '.dark { }' : null,
        isAnimated ? '.animated { }' : null,
      );

      expect(result).toContain('.base');
      expect(result).toContain('.large');
      expect(result).not.toContain('.dark');
      expect(result).toContain('.animated');
    });
  });

  describe('return type', () => {
    it('should return a string', () => {
      const result = combineStyles('.class { }');

      expect(typeof result).toBe('string');
    });

    it('should return empty string when no valid styles', () => {
      const result = combineStyles(null, undefined, '');

      expect(result).toBe('');
      expect(typeof result).toBe('string');
    });

    it('should not return array', () => {
      const result = combineStyles('.a { }', '.b { }');

      expect(Array.isArray(result)).toBe(false);
    });
  });

  describe('performance', () => {
    it('should handle large number of styles', () => {
      const styles = Array.from({ length: 1000 }, (_, i) => `.class${i} { }`);

      const result = combineStyles(...styles);

      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should handle mix of many valid and null values', () => {
      const styles: (string | null)[] = [];
      for (let i = 0; i < 100; i++) {
        styles.push(i % 2 === 0 ? `.class${i} { }` : null);
      }

      const result = combineStyles(...styles);

      expect(typeof result).toBe('string');
    });
  });

  describe('usage patterns', () => {
    it('should work with template literals', () => {
      const color = 'red';
      const style = `.class { color: ${color}; }`;

      const result = combineStyles(style, '.other { }');

      expect(result).toContain('color: red');
    });

    it('should work with functions returning styles', () => {
      const getStyle = (color: string) => `.class { color: ${color}; }`;

      const result = combineStyles(getStyle('blue'), '.other { }');

      expect(result).toContain('color: blue');
    });

    it('should work with array spreading', () => {
      const styles = ['.a { }', '.b { }', '.c { }'];

      const result = combineStyles(...styles);

      expect(result).toBe('.a { }.b { }.c { }');
    });
  });
});
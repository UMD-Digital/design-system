/**
 * @file theme.test.ts
 * @description Tests for theme utility functions
 */

import { theme } from '../index';

describe('Theme Utilities', () => {
  describe('theme.variant()', () => {
    test('should return "dark" when passed true', () => {
      expect(theme.variant(true)).toBe('dark');
    });

    test('should return "light" when passed false', () => {
      expect(theme.variant(false)).toBe('light');
    });

    test('should return "light" when passed undefined', () => {
      expect(theme.variant(undefined)).toBe('light');
    });

    test('should return "light" when called with no arguments', () => {
      expect(theme.variant()).toBe('light');
    });

    test('should return type-safe literal types', () => {
      const result: 'light' | 'dark' = theme.variant(true);
      expect(result).toBe('dark');
    });
  });

  describe('theme.foreground()', () => {
    test('should return "white" when passed true', () => {
      expect(theme.foreground(true)).toBe('white');
    });

    test('should return "black" when passed false', () => {
      expect(theme.foreground(false)).toBe('black');
    });

    test('should return "black" when passed undefined', () => {
      expect(theme.foreground(undefined)).toBe('black');
    });

    test('should return "black" when called with no arguments', () => {
      expect(theme.foreground()).toBe('black');
    });

    test('should return type-safe literal types', () => {
      const result: 'white' | 'black' = theme.foreground(false);
      expect(result).toBe('black');
    });
  });

  describe('theme.background()', () => {
    test('should return dark gray token when passed true', () => {
      const result = theme.background(true);
      expect(typeof result).toBe('string');
      expect(result).toMatch(/^#[0-9a-f]{6}$/i); // Should be a hex color
    });

    test('should return undefined when passed false', () => {
      expect(theme.background(false)).toBeUndefined();
    });

    test('should return undefined when passed undefined', () => {
      expect(theme.background(undefined)).toBeUndefined();
    });

    test('should return undefined when called with no arguments', () => {
      expect(theme.background()).toBeUndefined();
    });

  });

  describe('theme.border()', () => {
    test('should return dark gray token when passed true', () => {
      const result = theme.border(true);
      expect(typeof result).toBe('string');
      expect(result).toMatch(/^#[0-9a-f]{6}$/i);
    });

    test('should return light gray token when passed false', () => {
      const result = theme.border(false);
      expect(typeof result).toBe('string');
      expect(result).toMatch(/^#[0-9a-f]{6}$/i);
    });

    test('should return light gray token when passed undefined', () => {
      const result = theme.border(undefined);
      expect(typeof result).toBe('string');
      expect(result).toMatch(/^#[0-9a-f]{6}$/i);
    });

    test('should return light gray token when called with no arguments', () => {
      const result = theme.border();
      expect(typeof result).toBe('string');
      expect(result).toMatch(/^#[0-9a-f]{6}$/i);
    });

    test('should return valid color tokens', () => {
      const darkResult = theme.border(true);
      const lightResult = theme.border(false);

      expect(typeof darkResult).toBe('string');
      expect(typeof lightResult).toBe('string');
      expect(darkResult).toMatch(/^#[0-9a-f]{6}$/i);
      expect(lightResult).toMatch(/^#[0-9a-f]{6}$/i);
      // Dark and light should be different colors
      expect(darkResult).not.toBe(lightResult);
    });
  });

  describe('theme.inverse()', () => {
    test('should return "black" when passed true (inverse of white)', () => {
      expect(theme.inverse(true)).toBe('black');
    });

    test('should return "white" when passed false (inverse of black)', () => {
      expect(theme.inverse(false)).toBe('white');
    });

    test('should return "white" when passed undefined', () => {
      expect(theme.inverse(undefined)).toBe('white');
    });

    test('should return "white" when called with no arguments', () => {
      expect(theme.inverse()).toBe('white');
    });

    test('should return opposite of theme.foreground()', () => {
      expect(theme.inverse(true)).toBe(theme.foreground(false));
      expect(theme.inverse(false)).toBe(theme.foreground(true));
    });
  });

  describe('theme.fontColor()', () => {
    test('should be an alias for theme.variant()', () => {
      expect(theme.fontColor(true)).toBe(theme.variant(true));
      expect(theme.fontColor(false)).toBe(theme.variant(false));
      expect(theme.fontColor(undefined)).toBe(theme.variant(undefined));
      expect(theme.fontColor()).toBe(theme.variant());
    });

    test('should return "dark" when passed true', () => {
      expect(theme.fontColor(true)).toBe('dark');
    });

    test('should return "light" when passed false', () => {
      expect(theme.fontColor(false)).toBe('light');
    });

    test('should return "light" when passed undefined', () => {
      expect(theme.fontColor(undefined)).toBe('light');
    });

    test('should return "light" when called with no arguments', () => {
      expect(theme.fontColor()).toBe('light');
    });

    test('should return type-safe literal types', () => {
      const result: 'light' | 'dark' = theme.fontColor(true);
      expect(result).toBe('dark');
    });
  });

  describe('Integration Tests', () => {
    test('should provide consistent theme values for light theme', () => {
      const isDark = false;

      expect(theme.variant(isDark)).toBe('light');
      expect(theme.foreground(isDark)).toBe('black');
      expect(theme.background(isDark)).toBeUndefined();
      expect(typeof theme.border(isDark)).toBe('string');
      expect(theme.inverse(isDark)).toBe('white');
    });

    test('should provide consistent theme values for dark theme', () => {
      const isDark = true;

      expect(theme.variant(isDark)).toBe('dark');
      expect(theme.foreground(isDark)).toBe('white');
      expect(typeof theme.background(isDark)).toBe('string');
      expect(typeof theme.border(isDark)).toBe('string');
      expect(theme.inverse(isDark)).toBe('black');
    });

    test('should work with typical component prop pattern', () => {
      interface ComponentProps {
        isThemeDark?: boolean;
      }

      const lightProps: ComponentProps = { isThemeDark: false };
      const darkProps: ComponentProps = { isThemeDark: true };

      // Light theme
      expect(theme.variant(lightProps.isThemeDark)).toBe('light');
      expect(theme.foreground(lightProps.isThemeDark)).toBe('black');

      // Dark theme
      expect(theme.variant(darkProps.isThemeDark)).toBe('dark');
      expect(theme.foreground(darkProps.isThemeDark)).toBe('white');
    });

    test('should work in style object construction', () => {
      const isThemeDark = true;

      const styleObject = {
        color: theme.foreground(isThemeDark),
        backgroundColor: theme.background(isThemeDark),
        borderColor: theme.border(isThemeDark),
      };

      expect(styleObject.color).toBe('white');
      expect(typeof styleObject.backgroundColor).toBe('string');
      expect(typeof styleObject.borderColor).toBe('string');
      expect(styleObject.backgroundColor).toMatch(/^#[0-9a-f]{6}$/i);
      expect(styleObject.borderColor).toMatch(/^#[0-9a-f]{6}$/i);
    });
  });

  describe('Type Safety', () => {
    test('variant should enforce literal union type', () => {
      const result = theme.variant(true);
      // TypeScript compilation would fail if this weren't 'light' | 'dark'
      const assertType: 'light' | 'dark' = result;
      expect(assertType).toBe('dark');
    });

    test('foreground should enforce literal union type', () => {
      const result = theme.foreground(true);
      // TypeScript compilation would fail if this weren't 'white' | 'black'
      const assertType: 'white' | 'black' = result;
      expect(assertType).toBe('white');
    });

    test('background should allow string | undefined', () => {
      const darkResult = theme.background(true);
      const lightResult = theme.background(false);

      // Should accept both string and undefined
      const darkAssert: string | undefined = darkResult;
      const lightAssert: string | undefined = lightResult;

      expect(darkAssert).toBeDefined();
      expect(lightAssert).toBeUndefined();
    });
  });

  describe('Edge Cases', () => {
    test('should handle rapid alternation', () => {
      for (let i = 0; i < 100; i++) {
        const isDark = i % 2 === 0;
        expect(theme.variant(isDark)).toBe(isDark ? 'dark' : 'light');
        expect(theme.foreground(isDark)).toBe(isDark ? 'white' : 'black');
      }
    });

    test('should be pure functions (no side effects)', () => {
      const result1 = theme.variant(true);
      const result2 = theme.variant(true);
      const result3 = theme.variant(true);

      expect(result1).toBe(result2);
      expect(result2).toBe(result3);
    });

    test('all functions should handle falsy values consistently', () => {
      const falsyValues = [false, undefined, null as any, 0 as any, '' as any];

      falsyValues.forEach((falsy) => {
        // All falsy values should be treated as light theme
        expect(theme.variant(falsy as boolean | undefined)).toBe('light');
        expect(theme.foreground(falsy as boolean | undefined)).toBe('black');
        expect(theme.background(falsy as boolean | undefined)).toBeUndefined();
      });
    });
  });
});

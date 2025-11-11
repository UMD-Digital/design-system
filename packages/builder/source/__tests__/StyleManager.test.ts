/**
 * @file StyleManager.test.ts
 * @description Unit tests for StyleManager
 */

import { StyleManager } from '../core/StyleManager';
import type { StyleDefinition, ElementStyles } from '../core/types';

describe('StyleManager', () => {
  let manager: StyleManager;

  beforeEach(() => {
    manager = new StyleManager();
  });

  describe('Style Addition', () => {
    test('should add ElementStyles and compile', () => {
      const styles: ElementStyles = {
        element: {
          color: 'red',
          fontSize: '16px',
        },
      };

      manager.add(styles, 'test-class');
      const compiled = manager.compile();

      expect(compiled).toBeTruthy();
      expect(typeof compiled).toBe('string');
    });

    test('should add plain JSS object', () => {
      const styles = {
        color: 'blue',
        backgroundColor: 'white',
      };

      manager.add(styles, 'plain-class');
      const compiled = manager.compile();

      expect(compiled).toBeTruthy();
    });
  });

  describe('Style Priority', () => {
    test('should order styles by priority', () => {
      manager.add({ element: { color: 'red' } }, 'low', 1);
      manager.add({ element: { color: 'blue' } }, 'high', 10);
      manager.add({ element: { color: 'green' } }, 'medium', 5);

      const compiled = manager.compile();

      const lowIndex = compiled.indexOf('.low');
      const mediumIndex = compiled.indexOf('.medium');
      const highIndex = compiled.indexOf('.high');

      expect(lowIndex).toBeLessThan(mediumIndex);
      expect(mediumIndex).toBeLessThan(highIndex);
    });

    test('should use priority 0 as default', () => {
      manager.add({ element: { color: 'red' } }, 'default');
      manager.add({ element: { color: 'blue' } }, 'explicit', 0);

      const compiled = manager.compile();

      // Both should compile successfully
      expect(compiled).toBeTruthy();
    });
  });

  describe('Style Deduplication', () => {
    test('should deduplicate identical styles', () => {
      const styles = { element: { color: 'red', padding: '10px' } };

      manager.add(styles, 'class1');
      manager.add(styles, 'class2');
      manager.add(styles, 'class3');

      const compiled = manager.compile();

      // Deduplication should result in shorter output
      expect(compiled.length).toBeLessThan(300); // Reasonable size for 3 deduplicated classes
    });

    test('should handle multiple different styles', () => {
      manager.add({ element: { color: 'red' } }, 'red-class');
      manager.add({ element: { color: 'blue' } }, 'blue-class');

      const compiled = manager.compile();

      expect(compiled).toBeTruthy();
    });
  });

  describe('Complex Styles', () => {
    test('should handle pseudo-element styles', () => {
      const styles = {
        element: {
          '&::before': {
            content: '""',
            display: 'block',
          },
        },
      };

      manager.add(styles, 'with-before');
      const compiled = manager.compile();

      expect(compiled).toBeTruthy();
    });

    test('should handle complex nested selectors', () => {
      const styles = {
        element: {
          padding: '10px',
          '& > div': {
            margin: '5px',
          },
        },
      };

      manager.add(styles, 'complex');
      const compiled = manager.compile();

      expect(compiled).toBeTruthy();
    });
  });

  describe('Style Merging', () => {
    test('should merge styles for same selector', () => {
      manager.add({ element: { color: 'red' } }, 'merged');
      manager.add({ element: { padding: '10px' } }, 'merged');

      const compiled = manager.compile();

      expect(compiled).toBeTruthy();
    });
  });

  describe('Empty and Invalid Styles', () => {
    test('should handle empty style object', () => {
      manager.add({}, 'empty');
      const compiled = manager.compile();

      expect(compiled).toBeDefined();
    });

    test('should return empty string when no styles added', () => {
      const compiled = manager.compile();
      expect(compiled).toBe('');
    });
  });

  describe('CSS Cascade Order', () => {
    test('should output styles in cascade order with separate blocks per priority', () => {
      // Priority 1 - base styles (output first)
      const baseStyles = {
        element: {
          textTransform: 'uppercase',
          '@media (min-width: 1024px)': {
            maxWidth: '816px',
            fontSize: '80px',
          },
        },
      };

      // Priority 2 - override styles (output last, wins via cascade)
      const overrideStyles = {
        element: {
          fontSize: '16px',
          '@media (min-width: 1024px)': {
            fontSize: '96px',
            lineHeight: '0.91em',
          },
        },
      };

      manager.add(baseStyles, 'test-class', 1);
      manager.add(overrideStyles, 'test-class', 2);
      const compiled = manager.compile();

      // Should contain all properties from both priority levels
      expect(compiled).toContain('text-transform: uppercase');
      expect(compiled).toContain('max-width: 816px');
      expect(compiled).toContain('line-height: 0.91em');

      // Both font-size values appear (CSS cascade determines winner)
      expect(compiled).toContain('font-size: 96px'); // Priority 2 (wins)
      expect(compiled).toContain('font-size: 80px'); // Priority 1 (appears first)
    });

    test('should output container queries in cascade order', () => {
      const baseStyles = {
        element: {
          '@container (min-width: 768px)': {
            padding: '20px',
            display: 'flex',
          },
        },
      };

      const overrideStyles = {
        element: {
          '@container (min-width: 768px)': {
            gap: '10px',
            display: 'grid', // Wins via cascade
          },
        },
      };

      manager.add(baseStyles, 'test-class', 1);
      manager.add(overrideStyles, 'test-class', 2);
      const compiled = manager.compile();

      expect(compiled).toContain('padding: 20px');
      expect(compiled).toContain('gap: 10px');

      // Both display values appear (CSS cascade determines winner)
      expect(compiled).toContain('display: grid'); // Priority 2 (wins)
      expect(compiled).toContain('display: flex'); // Priority 1 (appears first)
    });

    test('should handle multiple different media queries', () => {
      const presetStyles = {
        element: {
          '@media (min-width: 768px)': {
            fontSize: '20px',
          },
          '@media (min-width: 1024px)': {
            fontSize: '24px',
          },
        },
      };

      const inlineStyles = {
        element: {
          '@media (min-width: 768px)': {
            color: 'blue',
          },
          '@media (min-width: 1280px)': {
            color: 'red',
          },
        },
      };

      manager.add(presetStyles, 'test-class', 1);
      manager.add(inlineStyles, 'test-class', 2);
      const compiled = manager.compile();

      // All queries should be present
      expect(compiled).toContain('min-width: 768px');
      expect(compiled).toContain('min-width: 1024px');
      expect(compiled).toContain('min-width: 1280px');
      expect(compiled).toContain('color: blue');
      expect(compiled).toContain('color: red');
    });

    test('should merge nested pseudo-selectors within media queries', () => {
      const presetStyles = {
        element: {
          '@media (min-width: 1024px)': {
            '&:hover': {
              color: 'blue',
            },
          },
        },
      };

      const inlineStyles = {
        element: {
          '@media (min-width: 1024px)': {
            '&:hover': {
              backgroundColor: 'white',
            },
          },
        },
      };

      manager.add(presetStyles, 'test-class', 1);
      manager.add(inlineStyles, 'test-class', 2);
      const compiled = manager.compile();

      // Both hover properties should be present
      expect(compiled).toContain('color: blue');
      expect(compiled).toContain('background-color: white');
    });

    test('should handle @supports queries', () => {
      const presetStyles = {
        element: {
          '@supports (display: grid)': {
            display: 'grid',
          },
        },
      };

      const inlineStyles = {
        element: {
          '@supports (display: grid)': {
            gap: '20px',
          },
        },
      };

      manager.add(presetStyles, 'test-class', 1);
      manager.add(inlineStyles, 'test-class', 2);
      const compiled = manager.compile();

      expect(compiled).toContain('display: grid');
      expect(compiled).toContain('gap: 20px');
    });

    test('should respect priority order in CSS cascade', () => {
      manager.add(
        {
          element: {
            '@media (min-width: 1024px)': { color: 'red' },
          },
        },
        'test',
        1,
      );

      manager.add(
        {
          element: {
            '@media (min-width: 1024px)': { color: 'blue' },
          },
        },
        'test',
        2,
      );

      const compiled = manager.compile();

      // Both colors appear in separate blocks
      // Priority 2 (blue) appears last and wins via CSS cascade
      expect(compiled).toContain('color: blue');
      expect(compiled).toContain('color: red');

      // Verify blue comes after red in the output
      const redIndex = compiled.indexOf('color: red');
      const blueIndex = compiled.indexOf('color: blue');
      expect(blueIndex).toBeGreaterThan(redIndex);
    });

    test('should handle deeply nested structures', () => {
      const presetStyles = {
        element: {
          '@media (min-width: 1024px)': {
            '& > div': {
              padding: '10px',
            },
          },
        },
      };

      const inlineStyles = {
        element: {
          '@media (min-width: 1024px)': {
            '& > div': {
              margin: '5px',
            },
          },
        },
      };

      manager.add(presetStyles, 'test-class', 1);
      manager.add(inlineStyles, 'test-class', 2);
      const compiled = manager.compile();

      // Both nested properties should be merged
      expect(compiled).toContain('padding: 10px');
      expect(compiled).toContain('margin: 5px');
    });
  });

  describe('Performance', () => {
    test('should handle large number of styles efficiently', () => {
      const start = performance.now();

      for (let i = 0; i < 1000; i++) {
        manager.add(
          { element: { color: `rgb(${i}, 0, 0)` } },
          `class-${i}`
        );
      }

      const compiled = manager.compile();
      const end = performance.now();

      expect(compiled).toBeDefined();
      expect(end - start).toBeLessThan(1000); // Should complete in under 1 second
    });

    test('should benefit from deduplication with repeated styles', () => {
      const sharedStyle = { element: { padding: '20px', margin: '10px' } };

      for (let i = 0; i < 100; i++) {
        manager.add(sharedStyle, `repeated-${i}`);
      }

      const compiled = manager.compile();

      // Deduplication should result in reasonable output size (adjusted threshold)
      expect(compiled.length).toBeLessThan(6000);
    });
  });
});

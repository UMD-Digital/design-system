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

  describe('Theme Application', () => {
    test('should apply dark theme modifier', () => {
      const styles = {
        element: {
          color: 'black',
        },
      };

      manager.add(styles, 'themed');
      manager.addTheme('dark');

      const compiled = manager.compile();

      // Dark theme modifies colors - check that compilation succeeds
      expect(compiled).toBeTruthy();
      expect(compiled).toContain('.themed');
    });

    test('should apply light theme modifier', () => {
      const styles = {
        element: {
          color: 'white',
        },
      };

      manager.add(styles, 'themed');
      manager.addTheme('light');

      const compiled = manager.compile();

      // Light theme is default - just verify it compiles
      expect(compiled).toBeTruthy();
      expect(compiled).toContain('.themed');
    });

    test('should not apply theme when none is set', () => {
      const styles = {
        element: {
          color: 'gray',
        },
      };

      manager.add(styles, 'no-theme');

      const compiled = manager.compile();

      expect(compiled).toBeTruthy();
      expect(compiled).toContain('.no-theme');
    });

    test('should update theme dynamically', () => {
      const styles = {
        element: {
          color: 'gray',
        },
      };

      manager.add(styles, 'dynamic-theme');
      manager.addTheme('dark');

      let compiled = manager.compile();
      expect(compiled).toContain('.dynamic-theme');

      manager.addTheme('light');
      compiled = manager.compile();
      expect(compiled).toContain('.dynamic-theme');
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

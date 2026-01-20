import {
  formatWithClassSelector,
  formatNestedObjects,
  convertToSelectorCSS,
  convertToClassSelectorCss,
  convertToCss,
  processNestedJssObjects,
  processWebComponentStyles,
  generateBaseCSS,
} from '../../../source/utilities/transform/jss';
import type { JssInputFormat, JssObject } from '../../../source/_types';

describe('transform/jss utilities', () => {
  describe('objectWithClassSelector', () => {
    it('should transform object with string className', () => {
      const input: JssInputFormat = {
        key: { className: 'my-class', color: 'red', fontSize: 16 },
      };

      const expected = {
        '.my-class': { color: 'red', fontSize: 16 },
      };

      const result = formatWithClassSelector(input);
      expect(result).toEqual(expected);
    });

    it('should transform object with array classNames', () => {
      const input: JssInputFormat = {
        key: { className: ['class1', 'class2'], color: 'blue' },
      };

      const expected = {
        '.class1': { color: 'blue' },
        '.class2': { color: 'blue' },
      };

      const result = formatWithClassSelector(input);
      expect(result).toEqual(expected);
    });

    it('should handle multiple entries', () => {
      const input: JssInputFormat = {
        first: { className: 'first-class', color: 'red' },
        second: { className: 'second-class', margin: '10px' },
      };

      const expected = {
        '.first-class': { color: 'red' },
        '.second-class': { margin: '10px' },
      };

      const result = formatWithClassSelector(input);
      expect(result).toEqual(expected);
    });
  });

  describe('processNestedObjects', () => {
    it('should process flat objects with className', () => {
      const input = {
        component: { className: 'test-class', color: 'blue' },
      };

      const expected = {
        '.test-class': { color: 'blue' },
      };

      const result = formatNestedObjects(input);
      expect(result).toEqual(expected);
    });

    it('should process flat objects with selector', () => {
      const input = {
        component: {
          selector: ':root',
          '--primary-color': 'red',
          '--secondary-color': 'blue',
        },
      };

      const expected = {
        ':root': { '--primary-color': 'red', '--secondary-color': 'blue' },
      };

      const result = formatNestedObjects(input);
      expect(result).toEqual(expected);
    });

    it('should process deeply nested objects', () => {
      const input = {
        level1: {
          level2: {
            component: { className: 'nested-class', fontSize: 14 },
          },
          sibling: { className: 'sibling-class', margin: '5px' },
        },
      };

      const expected = {
        '.nested-class': { fontSize: 14 },
        '.sibling-class': { margin: '5px' },
      };

      const result = formatNestedObjects(input);
      expect(result).toEqual(expected);
    });

    it('should process nested objects with mixed className and selector', () => {
      const input = {
        global: {
          variables: {
            selector: ':root',
            '--spacing': '8px',
            '--font-size': '16px',
          },
          headings: {
            selector: 'h1, h2, h3',
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
          },
        },
        components: {
          button: {
            className: 'btn',
            padding: '8px 16px',
            backgroundColor: 'blue',
          },
        },
      };

      const expected = {
        ':root': { '--spacing': '8px', '--font-size': '16px' },
        'h1, h2, h3': { fontFamily: 'sans-serif', fontWeight: 'bold' },
        '.btn': { padding: '8px 16px', backgroundColor: 'blue' },
      };

      const result = formatNestedObjects(input);
      expect(result).toEqual(expected);
    });

    it('should handle empty or non-object inputs', () => {
      expect(formatNestedObjects({})).toEqual({});

      const result = formatNestedObjects({
        nullValue: null,
        numberValue: 123,
        stringValue: 'test',
      });

      expect(result).toEqual({});
    });

    it('should handle array classNames in nested objects', () => {
      const input = {
        component: {
          subComponent: {
            className: ['class1', 'class2'],
            display: 'flex',
          },
        },
      };

      const expected = {
        '.class1': { display: 'flex' },
        '.class2': { display: 'flex' },
      };

      const result = formatNestedObjects(input);
      expect(result).toEqual(expected);
    });
  });

  describe('parseToCss', () => {
    it('should convert style properties to CSS string with selector', () => {
      const styles = {
        color: 'red',
        fontSize: 16,
        marginTop: 8,
      };
      const selector = '.test-class';

      const result = convertToCss(styles, selector);

      // Test content rather than exact formatting
      expect(result).toContain('.test-class');
      expect(result).toContain('color: red');
      expect(result).toContain('font-size: 16');
      expect(result).toContain('margin-top: 8');
    });

    it('should handle pseudo-selectors and nested rules', () => {
      const styles = {
        display: 'inline-block',
        padding: '8px 16px',
        backgroundColor: '#0078d4',
        ':hover': {
          backgroundColor: '#106ebe',
        },
      };
      const selector = '.button';

      const result = convertToCss(styles, selector);

      expect(result).toContain('.button');
      expect(result).toContain('display: inline-block');
      expect(result).toContain('padding: 8px 16px');
      expect(result).toContain('background-color: #0078d4');
      expect(result).toContain('background-color: #106ebe');

      // Instead of testing the exact selector format, just check that both hover and color are present
      expect(result).toContain('hover');
    });
  });

  describe('convertToSelectorCSS', () => {
    it('should convert style properties to CSS string with custom selector', () => {
      const styles = {
        color: 'red',
        fontSize: 16,
        marginTop: 8,
      };
      const selector = '#custom-element';

      const result = convertToSelectorCSS(styles, selector);

      // Test content rather than exact formatting
      expect(result).toContain('#custom-element');
      expect(result).toContain('color: red');
      expect(result).toContain('font-size: 16');
      expect(result).toContain('margin-top: 8');
    });

    it('should handle media queries', () => {
      const styles = {
        width: '100%',
        '@media (min-width: 768px)': {
          self: {
            width: '50%',
          },
        },
      };
      const selector = '.responsive';

      const result = convertToSelectorCSS(styles, selector);

      expect(result).toContain('.responsive {');
      expect(result).toContain('width: 100%;');
      expect(result).toContain('@media (min-width: 768px)');
      expect(result).toMatch(/\.responsive\s*{(?:\s|.)*?width:\s*50%;/);
    });

    it('should handle null and undefined values', () => {
      const styles = {
        color: 'blue',
        margin: null,
        padding: undefined,
      };
      const selector = '.test';

      const result = convertToSelectorCSS(styles, selector);

      // Test content rather than exact formatting
      expect(result).toContain('.test');
      expect(result).toContain('color: blue');
      expect(result).not.toContain('margin');
      expect(result).not.toContain('padding');
    });

    it('should handle empty or invalid inputs', () => {
      expect(convertToSelectorCSS(null as any, '.test')).toEqual('');
      expect(convertToSelectorCSS(undefined as any, '.test')).toEqual('');
    });

    it('should handle nested selectors with &', () => {
      const styles = {
        color: 'black',
        '& > div': {
          margin: '10px',
        },
        '&:hover, &:focus': {
          color: 'blue',
          '& svg': {
            fill: 'blue',
          },
        },
      };
      const selector = '.parent';

      const result = convertToSelectorCSS(styles, selector);

      expect(result).toContain('.parent {');
      expect(result).toContain('color: black;');
      expect(result).toContain('.parent > div {');
      expect(result).toContain('margin: 10px;');
      expect(result).toMatch(/\.parent:hover,\s*\.parent:focus\s*{/);
      expect(result).toContain('color: blue;');

      // Accept either the legacy format or the new :is() format
      const legacyPattern = /\.parent(?::hover|:focus)(?:\s*,\s*\.parent(?::hover|:focus))?\s+svg\s*{/;
      const isPattern = /:is\(\.parent:hover,\.parent:focus\)\s+svg\s*{/;

      expect(result).toMatch(new RegExp(`${legacyPattern.source}|${isPattern.source}`));
      expect(result).toContain('fill: blue;');
    });
  });

  describe('convertToClassSelectorCss', () => {
    it('should convert basic JSS object to CSS string', () => {
      const input: JssObject = {
        className: 'test-class',
        color: 'red',
        fontSize: 16,
        marginTop: 8,
      };

      const result = convertToClassSelectorCss(input);

      // Test content rather than exact formatting
      expect(result).toContain('.test-class');
      expect(result).toContain('color: red');
      expect(result).toContain('font-size: 16');
      expect(result).toContain('margin-top: 8');
    });

    it('should handle array classNames', () => {
      const input: JssObject = {
        className: ['class1', 'class2'],
        display: 'flex',
        padding: '10px',
      };

      const result = convertToClassSelectorCss(input);

      // Test content rather than exact formatting
      expect(result).toContain('.class1, .class2');
      expect(result).toContain('display: flex');
      expect(result).toContain('padding: 10px');
    });

    it('should handle array classNames with nested selectors', () => {
      const input: JssObject = {
        className: ['class1', 'class2'],
        display: 'flex',
        padding: '10px',
        '& a': {
          color: 'blue',
          textDecoration: 'none'
        },
        '&:hover': {
          backgroundColor: '#f5f5f5'
        }
      };

      const result = convertToClassSelectorCss(input);

      expect(result).toContain('.class1, .class2 {');
      expect(result).toContain('display: flex;');
      expect(result).toContain('padding: 10px;');

      // Accept either format for nested selectors
      const hasLegacyFormat = result.includes('.class1 a, .class2 a {');
      const hasIsFormat = result.includes(':is(.class1,.class2) a {');
      expect(hasLegacyFormat || hasIsFormat).toBe(true);

      expect(result).toContain('color: blue;');
      expect(result).toContain('text-decoration: none;');

      const hasLegacyHover = result.includes('.class1:hover, .class2:hover {');
      const hasIsHover = result.includes(':is(.class1,.class2):hover {');
      expect(hasLegacyHover || hasIsHover).toBe(true);

      expect(result).toContain('background-color: #f5f5f5;');
    });

    it('should handle media queries with self', () => {
      const input: JssObject = {
        className: 'grid-two',
        display: 'grid',
        '@media (min-width: 1024px)': {
          self: {
            gridTemplateColumns: 'repeat(2, 1fr)',
            gridGap: '24px',
          },
        },
        '@media (min-width: 1280px)': {
          self: {
            gridGap: '32px',
          },
        },
      };

      const result = convertToClassSelectorCss(input);

      expect(result).toContain('.grid-two');
      expect(result).toContain('display: grid');

      const resultStr = result.replace(/\s+/g, ' ');
      expect(resultStr).toMatch(/media.*1024px/);
      expect(resultStr).toMatch(/grid-template-columns/);
      expect(resultStr).toMatch(/grid-gap.*24px/);

      expect(resultStr).toMatch(/media.*1280px/);
      expect(resultStr).toMatch(/grid-gap.*32px/);
    });

    it('should handle array classNames with media queries', () => {
      const input: JssObject = {
        className: ['class1', 'class2'],
        display: 'flex',
        '@media (min-width: 768px)': {
          self: {
            flexDirection: 'row'
          },
          '& a': {
            color: 'blue'
          }
        },
        '@media (max-width: 767px)': {
          self: {
            flexDirection: 'column'
          }
        }
      };

      const result = convertToClassSelectorCss(input);

      // Base styles
      expect(result).toContain('.class1, .class2 {');
      expect(result).toContain('display: flex;');

      // Check media queries
      expect(result).toContain('@media (min-width: 768px)');
      expect(result).toMatch(/\.class1,\s*\.class2|:is\(\.class1,\.class2\)/);
      expect(result).toContain('flex-direction: row;');

      // Accept either format for nested selectors
      const hasLegacyFormat = result.includes('.class1 a, .class2 a {') ||
                              result.includes('.class1 a,');
      const hasIsFormat = result.includes(':is(.class1,.class2) a {');
      expect(hasLegacyFormat || hasIsFormat).toBe(true);

      expect(result).toContain('color: blue;');

      expect(result).toContain('@media (max-width: 767px)');
      expect(result).toContain('flex-direction: column;');
    });

    it('should handle empty or invalid inputs', () => {
      expect(convertToClassSelectorCss(null as any)).toEqual('');
      expect(convertToClassSelectorCss(undefined as any)).toEqual('');
      expect(convertToClassSelectorCss({} as any)).toEqual('');
      expect(convertToClassSelectorCss({ color: 'red' } as any)).toEqual('');
    });

    it('should handle complex nested structures with multiple levels', () => {
      const input: JssObject = {
        className: 'nav',
        display: 'flex',
        '& ul': {
          listStyle: 'none',
          padding: 0,
          '& li': {
            margin: '5px 0',
            '&:hover': {
              backgroundColor: '#f5f5f5',
              '& a': {
                color: 'blue',
              },
            },
          },
        },
      };

      const result = convertToClassSelectorCss(input);

      expect(result).toContain('.nav {');
      expect(result).toContain('display: flex;');

      // Check for either format of the nested ul selector
      const hasNavUl = result.includes('.nav ul {');
      const hasIsNavUl = result.includes(':is(.nav) ul {');
      expect(hasNavUl || hasIsNavUl).toBe(true);

      expect(result).toContain('list-style: none;');
      expect(result).toContain('padding: 0;');

      // Check for either traditional format or :is() format for nested selectors
      const hasLegacyLi = result.includes('.nav ul li {');
      const hasIsLi = result.includes(':is(.nav ul) li {');
      expect(hasLegacyLi || hasIsLi).toBe(true);

      expect(result).toContain('margin: 5px 0;');

      // Check for either hover format
      const hasLegacyHover = result.includes('.nav ul li:hover {');
      const hasIsHover = result.includes(':is(:is(.nav ul) li):hover {');
      expect(hasLegacyHover || hasIsHover).toBe(true);

      expect(result).toContain('background-color: #f5f5f5;');

      // Check for nested a element
      const hasLegacyA = result.includes('.nav ul li:hover a {');
      const hasIsA = result.includes(':is(:is(.nav ul) li):hover a {') ||
                     result.includes(':is(:is(:is(.nav ul) li):hover) a {');
      expect(hasLegacyA || hasIsA).toBe(true);

      expect(result).toContain('color: blue;');
    });
  });

  describe('processNestedJssObjects', () => {
    it('should process flat objects with className', () => {
      const input = {
        button: { className: 'btn', color: 'red', padding: '8px' },
      };

      const result = processNestedJssObjects(input);

      expect(result).toContain('.btn');
      expect(result).toContain('color: red');
      expect(result).toContain('padding: 8px');
    });

    it('should process deeply nested objects with className', () => {
      const input = {
        buttons: {
          primary: { className: 'btn-primary', color: 'blue' },
          secondary: { className: 'btn-secondary', color: 'gray' },
        },
      };

      const result = processNestedJssObjects(input);

      expect(result).toContain('.btn-primary');
      expect(result).toContain('color: blue');
      expect(result).toContain('.btn-secondary');
      expect(result).toContain('color: gray');
    });

    it('should process objects with selector property', () => {
      const input = {
        root: {
          selector: ':root',
          '--primary-color': 'red',
          '--spacing': '8px',
        },
      };

      const result = processNestedJssObjects(input);

      expect(result).toContain(':root');
      expect(result).toContain('--primary-color: red');
      expect(result).toContain('--spacing: 8px');
    });

    it('should process mixed className and selector objects', () => {
      const input = {
        variables: {
          selector: ':root',
          '--color': 'blue',
        },
        components: {
          button: { className: 'btn', display: 'inline-block' },
        },
      };

      const result = processNestedJssObjects(input);

      expect(result).toContain(':root');
      expect(result).toContain('--color: blue');
      expect(result).toContain('.btn');
      expect(result).toContain('display: inline-block');
    });

    it('should handle empty or invalid inputs', () => {
      expect(processNestedJssObjects({})).toBe('');
      expect(processNestedJssObjects(null)).toBe('');
      expect(processNestedJssObjects(undefined)).toBe('');
      expect(processNestedJssObjects({ foo: 'bar' })).toBe('');
    });

    it('should join multiple CSS blocks with double newlines', () => {
      const input = {
        first: { className: 'first', color: 'red' },
        second: { className: 'second', color: 'blue' },
      };

      const result = processNestedJssObjects(input);

      expect(result).toContain('\n\n');
    });
  });

  describe('processWebComponentStyles', () => {
    it('should process styles with CSS selectors as keys', () => {
      const input = {
        ':host': { display: 'block', padding: '16px' },
        '.container': { maxWidth: '1200px', margin: '0 auto' },
      };

      const result = processWebComponentStyles(input);

      expect(result).toContain(':host');
      expect(result).toContain('display: block');
      expect(result).toContain('padding: 16px');
      expect(result).toContain('.container');
      expect(result).toContain('max-width: 1200px');
      expect(result).toContain('margin: 0 auto');
    });

    it('should handle pseudo-selectors', () => {
      const input = {
        ':host': { color: 'black' },
        ':host(:hover)': { color: 'blue' },
        '::slotted(*)': { margin: '0' },
      };

      const result = processWebComponentStyles(input);

      expect(result).toContain(':host');
      expect(result).toContain(':host(:hover)');
      expect(result).toContain('::slotted(*)');
    });

    it('should handle complex selectors', () => {
      const input = {
        '.card': { borderRadius: '8px' },
        '.card:hover .title': { color: 'blue' },
      };

      const result = processWebComponentStyles(input);

      expect(result).toContain('.card');
      expect(result).toContain('border-radius: 8px');
      expect(result).toContain('.card:hover .title');
    });

    it('should skip non-object values', () => {
      const input = {
        '.valid': { color: 'red' },
        invalidString: 'not an object' as any,
        invalidNull: null as any,
      };

      const result = processWebComponentStyles(input);

      expect(result).toContain('.valid');
      expect(result).toContain('color: red');
      expect(result).not.toContain('invalidString');
    });

    it('should handle empty input', () => {
      expect(processWebComponentStyles({})).toBe('');
    });

    it('should join multiple CSS blocks with double newlines', () => {
      const input = {
        '.first': { color: 'red' },
        '.second': { color: 'blue' },
      };

      const result = processWebComponentStyles(input);

      expect(result).toContain('\n\n');
    });
  });

  describe('generateBaseCSS', () => {
    it('should generate CSS from :root styles with CSS variables', () => {
      const root = {
        ':root': {
          '--color-primary': '#E21833',
          '--color-secondary': '#FFD200',
        },
      };
      const reset = {};

      const result = generateBaseCSS(root, reset);

      expect(result).toContain(':root {');
      expect(result).toContain('--color-primary: #E21833;');
      expect(result).toContain('--color-secondary: #FFD200;');
    });

    it('should generate CSS from :root styles with font properties', () => {
      const root = {
        ':root': {
          'font-family': 'sans-serif',
          'font-size': '16px',
          'line-height': '1.5',
        },
      };
      const reset = {};

      const result = generateBaseCSS(root, reset);

      expect(result).toContain(':root {');
      expect(result).toContain('font-family: sans-serif;');
      expect(result).toContain('font-size: 16px;');
      expect(result).toContain('line-height: 1.5;');
    });

    it('should generate CSS from reset styles', () => {
      const root = {};
      const reset = {
        '*': { boxSizing: 'border-box' },
        body: { margin: 0, padding: 0 },
      };

      const result = generateBaseCSS(root, reset);

      expect(result).toContain('* {');
      expect(result).toContain('box-sizing: border-box');
      expect(result).toContain('body {');
      expect(result).toContain('margin: 0');
      expect(result).toContain('padding: 0');
    });

    it('should combine :root and reset styles', () => {
      const root = {
        ':root': {
          '--spacing': '8px',
          'font-family': 'Arial, sans-serif',
        },
      };
      const reset = {
        '*': { boxSizing: 'border-box' },
        'h1, h2, h3': { marginTop: 0 },
      };

      const result = generateBaseCSS(root, reset);

      expect(result).toContain(':root {');
      expect(result).toContain('--spacing: 8px;');
      expect(result).toContain('font-family: Arial, sans-serif;');
      expect(result).toContain('* {');
      expect(result).toContain('box-sizing: border-box');
      expect(result).toContain('h1, h2, h3 {');
      expect(result).toContain('margin-top: 0');
    });

    it('should skip @media queries in :root (object values)', () => {
      const root = {
        ':root': {
          '--color': 'red',
          '@media (min-width: 768px)': {
            '--color': 'blue',
          },
        },
      };
      const reset = {};

      const result = generateBaseCSS(root, reset);

      expect(result).toContain('--color: red;');
      // Should not contain the media query object
      expect(result).not.toContain('@media');
    });

    it('should handle empty inputs', () => {
      const result = generateBaseCSS({}, {});

      expect(result).toBe('');
    });

    it('should handle missing :root key', () => {
      const root = {
        someOtherKey: {
          '--color': 'red',
        },
      };
      const reset = {
        body: { margin: 0 },
      };

      const result = generateBaseCSS(root, reset);

      // Should not have :root block, but should have reset styles
      expect(result).not.toContain(':root {');
      expect(result).toContain('body {');
      expect(result).toContain('margin: 0');
    });

    it('should skip non-object values in reset', () => {
      const root = {};
      const reset = {
        'div': { color: 'blue' },
        'invalidString': 'not an object' as any,
        'invalidNull': null as any,
      };

      const result = generateBaseCSS(root, reset);

      expect(result).toContain('div {');
      expect(result).toContain('color: blue');
      expect(result).not.toContain('invalidString');
    });

    it('should join multiple CSS blocks with double newlines', () => {
      const root = {
        ':root': {
          '--color': 'red',
        },
      };
      const reset = {
        body: { margin: 0 },
        html: { padding: 0 },
      };

      const result = generateBaseCSS(root, reset);

      expect(result).toContain('\n\n');
    });
  });
});

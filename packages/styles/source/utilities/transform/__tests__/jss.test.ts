import {
  formatWithClassSelector,
  formatNestedObjects,
  convertToSelectorCSS,
  convertToClassSelectorCss,
  convertToCss,
} from '../jss';
import type { JssInputFormat, JssObject } from '../../../_types';

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

      const expected = `.test-class {
  color: red;
  font-size: 16px;
  margin-top: 8px;
}`;

      const result = convertToCss(styles, selector);
      expect(result).toEqual(expected);
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

      expect(result).toContain('.button {');
      expect(result).toContain('display: inline-block;');
      expect(result).toContain('padding: 8px 16px;');
      expect(result).toContain('background-color: #0078d4;');

      expect(result).toMatch(/\.button:hover\s*{/);
      expect(result).toContain('background-color: #106ebe;');
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

      const expected = `#custom-element {
  color: red;
  font-size: 16px;
  margin-top: 8px;
}`;

      const result = convertToSelectorCSS(styles, selector);
      expect(result).toEqual(expected);
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

      const expected = `.test {
  color: blue;
}`;

      const result = convertToSelectorCSS(styles, selector);
      expect(result).toEqual(expected);
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

      expect(result).toMatch(
        /\.parent(?::hover|:focus)(?:\s*,\s*\.parent(?::hover|:focus))?\s+svg\s*{/,
      );
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

      const expected = `.test-class {
  color: red;
  font-size: 16px;
  margin-top: 8px;
}`;

      const result = convertToClassSelectorCss(input);
      expect(result).toEqual(expected);
    });

    it('should handle array classNames', () => {
      const input: JssObject = {
        className: ['class1', 'class2'],
        display: 'flex',
        padding: '10px',
      };

      const expected = `.class1, .class2 {
  display: flex;
  padding: 10px;
}`;

      const result = convertToClassSelectorCss(input);
      expect(result).toEqual(expected);
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

      expect(result).toContain('.class1 a, .class2 a {');
      expect(result).toContain('color: blue;');
      expect(result).toContain('text-decoration: none;');

      expect(result).toContain('.class1:hover, .class2:hover {');
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
      expect(result).toContain('.class1, .class2 {');
      expect(result).toContain('flex-direction: row;');

      expect(result).toContain('.class1 a, .class2 a {');
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
      expect(result).toContain('.nav ul {');
      expect(result).toContain('list-style: none;');
      expect(result).toContain('padding: 0;');
      expect(result).toContain('.nav ul li {');
      expect(result).toContain('margin: 5px 0;');
      expect(result).toContain('.nav ul li:hover {');
      expect(result).toContain('background-color: #f5f5f5;');
      expect(result).toContain('.nav ul li:hover a {');
      expect(result).toContain('color: blue;');
    });
  });
});

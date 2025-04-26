import {
  objectWithName,
  processNestedObjects,
  convertToCSS,
  isPlainObject,
  toKebabCase,
  createClassSelector,
  combineSelectorWithParent,
} from '../transform';
import type { JssInputFormat, JssObject } from '../../_types';

describe('transform utilities', () => {
  describe('helper functions', () => {
    describe('isPlainObject', () => {
      it('should identify plain objects correctly', () => {
        expect(isPlainObject({})).toBe(true);
        expect(isPlainObject({ a: 1 })).toBe(true);
        expect(isPlainObject([])).toBe(false);
        expect(isPlainObject(null)).toBe(false);
        expect(isPlainObject(undefined)).toBe(false);
        expect(isPlainObject(42)).toBe(false);
        expect(isPlainObject('string')).toBe(false);
      });
    });

    describe('toKebabCase', () => {
      it('should convert camelCase to kebab-case', () => {
        expect(toKebabCase('backgroundColor')).toBe('background-color');
        expect(toKebabCase('marginTop')).toBe('margin-top');
        expect(toKebabCase('WebkitTransform')).toBe('webkit-transform');
        expect(toKebabCase('color')).toBe('color');
      });
    });

    describe('createClassSelector', () => {
      it('should create CSS selectors from class names', () => {
        expect(createClassSelector('my-class')).toBe('.my-class');
        expect(createClassSelector(['class1', 'class2'])).toBe(
          '.class1, .class2',
        );
      });
    });

    describe('combineSelectorWithParent', () => {
      it('should combine parent and child selectors correctly', () => {
        expect(combineSelectorWithParent('.parent', '&:hover')).toBe(
          '.parent:hover',
        );
        expect(combineSelectorWithParent('.parent', '& > div')).toBe(
          '.parent > div',
        );
        expect(combineSelectorWithParent('.parent', 'div')).toBe('.parent div');
        expect(combineSelectorWithParent('.parent', '&:hover, &:focus')).toBe(
          '.parent:hover, .parent:focus',
        );
      });
    });
  });

  describe('objectWithName', () => {
    it('should transform object with string className', () => {
      const input: JssInputFormat = {
        key: { className: 'my-class', color: 'red', fontSize: 16 },
      };

      const expected = {
        '.my-class': { color: 'red', fontSize: 16 },
      };

      const result = objectWithName(input);
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

      const result = objectWithName(input);
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

      const result = objectWithName(input);
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

      const result = processNestedObjects(input);
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

      const result = processNestedObjects(input);
      expect(result).toEqual(expected);
    });

    it('should handle empty or non-object inputs', () => {
      expect(processNestedObjects({})).toEqual({});

      const result = processNestedObjects({
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

      const result = processNestedObjects(input);
      expect(result).toEqual(expected);
    });
  });

  describe('convertToCSS', () => {
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

      const result = convertToCSS(input);
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

      const result = convertToCSS(input);
      expect(result).toEqual(expected);
    });

    it('should handle pseudo-selectors and nested rules', () => {
      const input: JssObject = {
        className: 'button',
        display: 'inline-block',
        padding: '8px 16px',
        backgroundColor: '#0078d4',
        ':hover': {
          backgroundColor: '#106ebe',
        },
      };

      const result = convertToCSS(input);

      expect(result).toContain('.button {');
      expect(result).toContain('display: inline-block;');
      expect(result).toContain('padding: 8px 16px;');
      expect(result).toContain('background-color: #0078d4;');

      expect(result).toMatch(/\.button:hover\s*{/);
      expect(result).toContain('background-color: #106ebe;');
    });

    it('should handle media queries', () => {
      const input: JssObject = {
        className: 'responsive',
        width: '100%',
        '@media (min-width: 768px)': {
          '.responsive': {
            width: '50%',
          },
        },
      };

      const result = convertToCSS(input);

      expect(result).toContain('.responsive {');
      expect(result).toContain('width: 100%;');
      expect(result).toContain('@media (min-width: 768px)');
      expect(result).toMatch(/\.responsive\s*{(?:\s|.)*?width:\s*50%;/);
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

      const result = convertToCSS(input);

      expect(result).toContain('.grid-two');
      expect(result).toContain('display: grid');

      const resultStr = result.replace(/\s+/g, ' ');
      expect(resultStr).toMatch(/media.*1024px/);
      expect(resultStr).toMatch(/grid-template-columns/);
      expect(resultStr).toMatch(/grid-gap.*24px/);

      expect(resultStr).toMatch(/media.*1280px/);
      expect(resultStr).toMatch(/grid-gap.*32px/);
    });

    it('should handle media queries with template literals', () => {
      const media = {
        queries: {
          large: { min: 'min-width: 1024px' },
          desktop: { min: 'min-width: 1280px' },
        },
      };
      const spacing = { lg: '24px', xl: '32px' };

      const input: JssObject = {
        className: ['grid-two', 'umd-grid-gap'],
        display: 'grid',
        [`@media (${media.queries.large.min})`]: {
          self: {
            gridTemplateColumns: 'repeat(2, 1fr)',
            gridGap: spacing.lg,
          },
        },
        [`@media (${media.queries.desktop.min})`]: {
          self: {
            gridGap: spacing.xl,
          },
        },
      };

      const result = convertToCSS(input);

      expect(result).toContain('.grid-two, .umd-grid-gap');
      expect(result).toContain('display: grid');

      expect(result).toContain('@media (min-width: 1024px)');
      expect(result).toContain('grid-template-columns: repeat(2, 1fr)');
      expect(result).toContain('grid-gap: 24px');

      expect(result).toContain('@media (min-width: 1280px)');
      expect(result).toContain('grid-gap: 32px');
    });

    it('should handle null and undefined values', () => {
      const input: JssObject = {
        className: 'test',
        color: 'blue',
        margin: null,
        padding: undefined,
      };

      const expected = `.test {
  color: blue;
}`;

      const result = convertToCSS(input);
      expect(result).toEqual(expected);
    });

    it('should handle empty or invalid inputs', () => {
      expect(convertToCSS(null as any)).toEqual('');
      expect(convertToCSS(undefined as any)).toEqual('');
      expect(convertToCSS({} as any)).toEqual('');
      expect(convertToCSS({ color: 'red' } as any)).toEqual('');
    });

    it('should handle nested selectors with &', () => {
      const input: JssObject = {
        className: 'parent',
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

      const result = convertToCSS(input);

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

      const result = convertToCSS(input);

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

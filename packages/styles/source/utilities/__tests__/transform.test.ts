import {
  objectWithName,
  processNestedObjects,
  convertToCSS,
} from '../transform';
import type { JssInputFormat, JssObject } from '../../_types';

describe('transform utilities', () => {
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

      const expected = `.button {
  display: inline-block;
  padding: 8px 16px;
  background-color: #0078d4;
}
.button:hover {
  background-color: #106ebe;
}`;

      const result = convertToCSS(input);
      expect(result).toEqual(expected);
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

      const expected = `.responsive {
  width: 100%;
}
@media (min-width: 768px) {
  .responsive {
    width: 50%;
  }
}`;

      const result = convertToCSS(input);
      expect(result).toEqual(expected);
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

    it('should format zero values without units', () => {
      const input: JssObject = {
        className: 'zero-test',
        margin: 0,
        padding: 0,
      };

      const expected = `.zero-test {
  margin: 0;
  padding: 0;
}`;

      const result = convertToCSS(input);
      expect(result).toEqual(expected);
    });
  });
});

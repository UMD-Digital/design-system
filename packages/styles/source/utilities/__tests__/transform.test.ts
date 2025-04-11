import { objectWithName, processNestedObjects } from '../transform';
import type { JssInputFormat } from '../../_types';

describe('transform utilities', () => {
  describe('objectWithName', () => {
    it('should transform object with string className', () => {
      const input: JssInputFormat = {
        key: { className: 'my-class', color: 'red', fontSize: 16 }
      };
      
      const expected = {
        '.my-class': { color: 'red', fontSize: 16 }
      };
      
      const result = objectWithName(input);
      expect(result).toEqual(expected);
    });

    it('should transform object with array classNames', () => {
      const input: JssInputFormat = {
        key: { className: ['class1', 'class2'], color: 'blue' }
      };
      
      const expected = {
        '.class1': { color: 'blue' },
        '.class2': { color: 'blue' }
      };
      
      const result = objectWithName(input);
      expect(result).toEqual(expected);
    });

    it('should handle multiple entries', () => {
      const input: JssInputFormat = {
        first: { className: 'first-class', color: 'red' },
        second: { className: 'second-class', margin: '10px' }
      };
      
      const expected = {
        '.first-class': { color: 'red' },
        '.second-class': { margin: '10px' }
      };
      
      const result = objectWithName(input);
      expect(result).toEqual(expected);
    });
  });

  describe('processNestedObjects', () => {
    it('should process flat objects with className', () => {
      const input = {
        component: { className: 'test-class', color: 'blue' }
      };
      
      const expected = {
        '.test-class': { color: 'blue' }
      };
      
      const result = processNestedObjects(input);
      expect(result).toEqual(expected);
    });

    it('should process deeply nested objects', () => {
      const input = {
        level1: {
          level2: {
            component: { className: 'nested-class', fontSize: 14 }
          },
          sibling: { className: 'sibling-class', margin: '5px' }
        }
      };
      
      const expected = {
        '.nested-class': { fontSize: 14 },
        '.sibling-class': { margin: '5px' }
      };
      
      const result = processNestedObjects(input);
      expect(result).toEqual(expected);
    });

    it('should handle empty or non-object inputs', () => {
      expect(processNestedObjects({})).toEqual({});
      
      const result = processNestedObjects({
        nullValue: null,
        numberValue: 123,
        stringValue: 'test'
      });
      
      expect(result).toEqual({});
    });

    it('should handle array classNames in nested objects', () => {
      const input = {
        component: {
          subComponent: { 
            className: ['class1', 'class2'], 
            display: 'flex' 
          }
        }
      };
      
      const expected = {
        '.class1': { display: 'flex' },
        '.class2': { display: 'flex' }
      };
      
      const result = processNestedObjects(input);
      expect(result).toEqual(expected);
    });
  });
});
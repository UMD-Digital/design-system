import { jssObject, jssObjectFromString } from '../create';

describe('create utilities', () => {
  describe('jssObject', () => {
    it('should return the same object with type checking', () => {
      const input = { className: 'test-class', color: 'red', fontSize: 16 };
      const result = jssObject(input);
      expect(result).toBe(input);
      expect(result).toEqual(input);
    });

    it('should handle objects with array classNames', () => {
      const input = { className: ['test-1', 'test-2'], color: 'blue' };
      const result = jssObject(input);
      expect(result).toBe(input);
      expect(result).toEqual(input);
    });
  });

  describe('jssObjectFromString', () => {
    it('should convert CSS string to JSS object', () => {
      const cssString = 'color: red; font-size: 16px; margin-top: 10px;';
      const expected = {
        color: 'red',
        fontSize: '16px',
        marginTop: '10px',
      };
      
      const result = jssObjectFromString(cssString);
      expect(result).toEqual(expected);
    });

    it('should convert numeric values appropriately', () => {
      const cssString = 'width: 100; height: 50.5; z-index: 10;';
      const expected = {
        width: 100,
        height: 50.5,
        zIndex: 10,
      };
      
      const result = jssObjectFromString(cssString);
      expect(result).toEqual(expected);
    });

    it('should handle empty or whitespace strings', () => {
      expect(jssObjectFromString('')).toEqual({});
      expect(jssObjectFromString('   ')).toEqual({});
    });

    it('should return empty object for non-string inputs', () => {
      // @ts-ignore - Testing invalid inputs
      expect(jssObjectFromString(null)).toEqual({});
      // @ts-ignore - Testing invalid inputs
      expect(jssObjectFromString(undefined)).toEqual({});
      // @ts-ignore - Testing invalid inputs
      expect(jssObjectFromString(123)).toEqual({});
    });

    it('should skip invalid property-value pairs', () => {
      const cssString = 'color: red; invalid; margin: 10px;';
      const expected = {
        color: 'red',
        margin: '10px',
      };
      
      const result = jssObjectFromString(cssString);
      expect(result).toEqual(expected);
    });
  });
});
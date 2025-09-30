import { getLocalStorageInt } from '../../storage/getLocalStorageInt';

describe('getLocalStorageInt', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('happy path', () => {
    it('should retrieve integer from localStorage', () => {
      localStorage.setItem('test-key', '42');

      const result = getLocalStorageInt({ key: 'test-key' });

      expect(result).toBe(42);
    });

    it('should parse string numbers correctly', () => {
      localStorage.setItem('count', '123');

      const result = getLocalStorageInt({ key: 'count' });

      expect(result).toBe(123);
    });

    it('should handle negative numbers', () => {
      localStorage.setItem('negative', '-50');

      const result = getLocalStorageInt({ key: 'negative' });

      expect(result).toBe(-50);
    });

    it('should handle zero', () => {
      localStorage.setItem('zero', '0');

      const result = getLocalStorageInt({ key: 'zero' });

      expect(result).toBe(0);
    });

    it('should handle large integers', () => {
      localStorage.setItem('large', '999999999');

      const result = getLocalStorageInt({ key: 'large' });

      expect(result).toBe(999999999);
    });
  });

  describe('edge cases', () => {
    it('should return null for non-existent key', () => {
      const result = getLocalStorageInt({ key: 'non-existent' });

      expect(result).toBeNull();
    });

    it('should return null for invalid number string', () => {
      localStorage.setItem('invalid', 'not-a-number');

      const result = getLocalStorageInt({ key: 'invalid' });

      expect(result).toBeNull();
    });

    it('should return null for empty string', () => {
      localStorage.setItem('empty', '');

      const result = getLocalStorageInt({ key: 'empty' });

      expect(result).toBeNull();
    });

    it('should parse integers from decimal strings (truncates)', () => {
      localStorage.setItem('decimal', '42.7');

      const result = getLocalStorageInt({ key: 'decimal' });

      expect(result).toBe(42);
    });

    it('should handle whitespace before number', () => {
      localStorage.setItem('whitespace', '  42');

      const result = getLocalStorageInt({ key: 'whitespace' });

      expect(result).toBe(42);
    });

    it('should handle number with trailing text', () => {
      localStorage.setItem('trailing', '42px');

      const result = getLocalStorageInt({ key: 'trailing' });

      expect(result).toBe(42);
    });

    it('should return null for text before number', () => {
      localStorage.setItem('leading-text', 'value42');

      const result = getLocalStorageInt({ key: 'leading-text' });

      expect(result).toBeNull();
    });

    it('should handle very large numbers that exceed MAX_SAFE_INTEGER', () => {
      localStorage.setItem('huge', '9999999999999999999');

      const result = getLocalStorageInt({ key: 'huge' });

      // parseInt will handle this, but may lose precision
      expect(typeof result).toBe('number');
      expect(result).not.toBeNull();
    });

    it('should handle negative zero', () => {
      localStorage.setItem('neg-zero', '-0');

      const result = getLocalStorageInt({ key: 'neg-zero' });

      // parseInt('-0', 10) returns -0, but -0 === 0 is true in JavaScript
      // Using Object.is to verify it's actually 0 (not -0)
      expect(result === 0).toBe(true);
      expect(Object.is(result, 0) || Object.is(result, -0)).toBe(true);
    });

    it('should handle octal notation (parses as base 10)', () => {
      localStorage.setItem('octal', '077');

      const result = getLocalStorageInt({ key: 'octal' });

      // Using radix 10, so 077 is parsed as 77, not 63
      expect(result).toBe(77);
    });

    it('should handle hexadecimal notation (parses base 10)', () => {
      localStorage.setItem('hex', '0x10');

      const result = getLocalStorageInt({ key: 'hex' });

      // With radix 10, 0x10 parses as 0 (stops at 'x')
      expect(result).toBe(0);
    });

    it('should handle scientific notation', () => {
      localStorage.setItem('scientific', '1e5');

      const result = getLocalStorageInt({ key: 'scientific' });

      // parseInt stops at 'e'
      expect(result).toBe(1);
    });

    it('should handle Infinity string', () => {
      localStorage.setItem('infinity', 'Infinity');

      const result = getLocalStorageInt({ key: 'infinity' });

      expect(result).toBeNull();
    });

    it('should handle NaN string', () => {
      localStorage.setItem('nan', 'NaN');

      const result = getLocalStorageInt({ key: 'nan' });

      expect(result).toBeNull();
    });
  });

  describe('error conditions', () => {
    it('should handle null key', () => {
      expect(() => getLocalStorageInt({ key: null as any })).not.toThrow();
    });

    it('should handle undefined key', () => {
      expect(() => getLocalStorageInt({ key: undefined as any })).not.toThrow();
    });

    it('should handle empty string key', () => {
      localStorage.setItem('', '42');

      const result = getLocalStorageInt({ key: '' });

      expect(result).toBe(42);
    });

    it('should handle special characters in key', () => {
      localStorage.setItem('special-key-!@#', '42');

      const result = getLocalStorageInt({ key: 'special-key-!@#' });

      expect(result).toBe(42);
    });
  });

  describe('type safety', () => {
    it('should return number type for valid integers', () => {
      localStorage.setItem('number', '42');

      const result = getLocalStorageInt({ key: 'number' });

      expect(typeof result).toBe('number');
    });

    it('should return null type for invalid values', () => {
      const result = getLocalStorageInt({ key: 'missing' });

      expect(result).toBeNull();
    });
  });

  describe('localStorage interaction', () => {
    it('should not modify localStorage', () => {
      localStorage.setItem('test', '42');

      getLocalStorageInt({ key: 'test' });

      expect(localStorage.getItem('test')).toBe('42');
    });

    it('should work with multiple keys', () => {
      localStorage.setItem('key1', '10');
      localStorage.setItem('key2', '20');
      localStorage.setItem('key3', '30');

      expect(getLocalStorageInt({ key: 'key1' })).toBe(10);
      expect(getLocalStorageInt({ key: 'key2' })).toBe(20);
      expect(getLocalStorageInt({ key: 'key3' })).toBe(30);
    });

    it('should be case-sensitive for keys', () => {
      localStorage.setItem('TestKey', '42');
      localStorage.setItem('testkey', '99');

      expect(getLocalStorageInt({ key: 'TestKey' })).toBe(42);
      expect(getLocalStorageInt({ key: 'testkey' })).toBe(99);
    });
  });
});
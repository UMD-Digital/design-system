import { capitalize } from '../../string/capitalize';

describe('capitalize', () => {
  describe('happy path', () => {
    it('should capitalize first letter of a lowercase word', () => {
      expect(capitalize('hello')).toBe('Hello');
    });

    it('should capitalize first letter but leave rest unchanged', () => {
      expect(capitalize('hello world')).toBe('Hello world');
    });

    it('should handle already capitalized strings', () => {
      expect(capitalize('Hello')).toBe('Hello');
    });

    it('should handle single character', () => {
      expect(capitalize('a')).toBe('A');
    });

    it('should handle strings with numbers', () => {
      expect(capitalize('123abc')).toBe('123abc');
    });
  });

  describe('edge cases', () => {
    it('should return empty string for empty input', () => {
      expect(capitalize('')).toBe('');
    });

    it('should return empty string for null', () => {
      expect(capitalize(null as any)).toBe('');
    });

    it('should return empty string for undefined', () => {
      expect(capitalize(undefined as any)).toBe('');
    });

    it('should handle whitespace at start', () => {
      expect(capitalize(' hello')).toBe(' hello');
    });

    it('should handle single space', () => {
      expect(capitalize(' ')).toBe(' ');
    });

    it('should handle strings starting with special characters', () => {
      expect(capitalize('!hello')).toBe('!hello');
      expect(capitalize('@test')).toBe('@test');
    });

    it('should return empty string for non-string input', () => {
      // Non-string inputs return empty string
      expect(capitalize(123 as any)).toBe('');
      expect(capitalize({} as any)).toBe('');
      expect(capitalize([] as any)).toBe('');
      expect(capitalize(true as any)).toBe('');
    });
  });

  describe('unicode and special cases', () => {
    it('should handle unicode characters', () => {
      expect(capitalize('über')).toBe('Über');
    });

    it('should handle emoji', () => {
      expect(capitalize('😀hello')).toBe('😀hello');
    });
  });
});
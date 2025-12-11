import { truncate } from '../../source/string/truncate';

describe('truncate', () => {
  describe('happy path', () => {
    it('should truncate string longer than maxLength', () => {
      expect(truncate('Hello World', 8)).toBe('Hello...');
    });

    it('should return original string if shorter than maxLength', () => {
      expect(truncate('Hello', 10)).toBe('Hello');
    });

    it('should return original string if equal to maxLength', () => {
      expect(truncate('Hello', 5)).toBe('Hello');
    });

    it('should use default ellipsis "..."', () => {
      const result = truncate('Hello World', 8);
      expect(result).toContain('...');
      expect(result.length).toBe(8);
    });

    it('should use custom ellipsis', () => {
      expect(truncate('Hello World', 8, '…')).toBe('Hello W…');
    });

    it('should account for ellipsis length in truncation', () => {
      const result = truncate('Hello World', 10);
      expect(result.length).toBe(10);
    });
  });

  describe('edge cases', () => {
    it('should handle empty string', () => {
      expect(truncate('', 5)).toBe('');
    });

    it('should handle null', () => {
      expect(truncate(null as any, 5)).toBe('');
    });

    it('should handle undefined', () => {
      expect(truncate(undefined as any, 5)).toBe('');
    });

    it('should handle maxLength shorter than ellipsis', () => {
      // When maxLength is less than ellipsis length, return full ellipsis
      // This is a reasonable compromise for an edge case
      const result = truncate('Hello World', 2);
      expect(result).toBe('...');
      expect(result.length).toBe(3);
    });

    it('should handle maxLength of 0', () => {
      expect(truncate('Hello', 0)).toBe('...');
    });

    it('should handle single character strings', () => {
      expect(truncate('A', 1)).toBe('A');
      // When truncating 'AB' with maxLength=1, since 1 < ellipsis length (3),
      // return full ellipsis as a reasonable edge case behavior
      expect(truncate('AB', 1)).toBe('...');
    });

    it('should handle empty ellipsis', () => {
      expect(truncate('Hello World', 5, '')).toBe('Hello');
    });

    it('should handle very long ellipsis', () => {
      const result = truncate('Hello World', 10, '[...]');
      expect(result.length).toBe(10);
    });

    it('should return empty string for non-string input', () => {
      // Non-string inputs return empty string
      expect(truncate(123 as any, 5)).toBe('');
      expect(truncate({} as any, 5)).toBe('');
      expect(truncate([] as any, 5)).toBe('');
      expect(truncate(true as any, 5)).toBe('');
    });
  });

  describe('unicode and special characters', () => {
    it('should handle unicode characters', () => {
      expect(truncate('Hello Wörld', 8)).toBe('Hello...');
    });

    it('should handle emoji', () => {
      // Emoji characters may be counted as 2 chars in JS (surrogate pairs)
      // 'Hello 😀 World' - the emoji is at position 6-7 (2 char positions)
      // maxLength=10, ellipsis='...' (3 chars), so truncate at 7 chars
      // Result: 'Hello �...' (the emoji gets cut in half) = 10 chars
      const result = truncate('Hello 😀 World', 10);
      expect(result.length).toBe(10);
      expect(result).toContain('...');
    });

    it('should handle strings with newlines', () => {
      expect(truncate('Hello\nWorld', 8)).toBe('Hello...');
    });
  });

  describe('word boundaries', () => {
    it('should not care about word boundaries', () => {
      // This utility does character-based truncation, not word-based
      // maxLength=12, ellipsis='...' (3 chars), so truncate at 9 chars
      // Result: 'Hello Wor...' = 12 chars total
      const result = truncate('Hello World Test', 12);
      expect(result).toBe('Hello Wor...');
      expect(result.length).toBe(12);
    });
  });
});
import { parsePixelValue } from '../../source/styles/parsePixelValue';

describe('parsePixelValue', () => {
  describe('happy path', () => {
    it('should convert "16px" to 16', () => {
      const result = parsePixelValue('16px');

      expect(result).toBe(16);
    });

    it('should convert "24px" to 24', () => {
      const result = parsePixelValue('24px');

      expect(result).toBe(24);
    });

    it('should convert "100px" to 100', () => {
      const result = parsePixelValue('100px');

      expect(result).toBe(100);
    });

    it('should convert "0px" to 0', () => {
      const result = parsePixelValue('0px');

      expect(result).toBe(0);
    });

    it('should convert negative pixel values', () => {
      const result = parsePixelValue('-10px');

      expect(result).toBe(-10);
    });

    it('should convert large pixel values', () => {
      const result = parsePixelValue('9999px');

      expect(result).toBe(9999);
    });

    it('should handle single digit pixels', () => {
      const result = parsePixelValue('5px');

      expect(result).toBe(5);
    });

    it('should handle double digit pixels', () => {
      const result = parsePixelValue('42px');

      expect(result).toBe(42);
    });

    it('should handle triple digit pixels', () => {
      const result = parsePixelValue('256px');

      expect(result).toBe(256);
    });
  });

  describe('edge cases', () => {
    it('should handle string without "px" suffix', () => {
      const result = parsePixelValue('16');

      expect(result).toBe(16);
    });

    it('should handle decimal values (truncates)', () => {
      const result = parsePixelValue('16.5px');

      expect(result).toBe(16);
    });

    it('should handle whitespace before number', () => {
      const result = parsePixelValue('  16px');

      expect(result).toBe(16);
    });

    it('should handle whitespace after px', () => {
      const result = parsePixelValue('16px  ');

      expect(result).toBe(16);
    });

    it('should handle zero without px', () => {
      const result = parsePixelValue('0');

      expect(result).toBe(0);
    });

    it('should handle very large numbers', () => {
      const result = parsePixelValue('999999px');

      expect(result).toBe(999999);
    });

    it('should handle negative zero', () => {
      const result = parsePixelValue('-0px');

      expect(result === 0).toBe(true);
    });

    it('should handle fractional pixels', () => {
      const result = parsePixelValue('16.75px');

      expect(result).toBe(16);
    });

    it('should handle "PX" in uppercase', () => {
      // Note: replace is case-sensitive, so this won't remove 'PX'
      const result = parsePixelValue('16PX');

      // parseInt will parse until it hits non-numeric
      expect(result).toBe(16);
    });

    it('should handle mixed case "pX"', () => {
      const result = parsePixelValue('16pX');

      // Only 'px' lowercase is removed
      expect(result).toBe(16);
    });

    it('should handle "px" in the middle of string', () => {
      const result = parsePixelValue('16px24');

      // replace only replaces first 'px', parseInt parses '1624'
      expect(result).toBe(1624);
    });

    it('should handle empty string', () => {
      const result = parsePixelValue('');

      expect(isNaN(result)).toBe(true);
    });

    it('should handle "px" only', () => {
      const result = parsePixelValue('px');

      expect(isNaN(result)).toBe(true);
    });

    it('should handle leading zeros', () => {
      const result = parsePixelValue('0016px');

      expect(result).toBe(16);
    });

    it('should handle scientific notation', () => {
      const result = parsePixelValue('1e2px');

      // parseInt parses '1e2' as 1 (stops at 'e')
      expect(result).toBe(1);
    });

    it('should handle hex notation', () => {
      const result = parsePixelValue('0x10px');

      // parseInt parses '0x10' as 16 (hex notation)
      expect(result).toBe(16);
    });
  });

  describe('error conditions', () => {
    it('should return NaN for non-numeric strings', () => {
      const result = parsePixelValue('notanumber');

      expect(isNaN(result)).toBe(true);
    });

    it('should handle string with no digits', () => {
      const result = parsePixelValue('abcpx');

      expect(isNaN(result)).toBe(true);
    });

    it('should handle string with only whitespace', () => {
      const result = parsePixelValue('   ');

      expect(isNaN(result)).toBe(true);
    });
  });

  describe('return type', () => {
    it('should return a number type', () => {
      const result = parsePixelValue('16px');

      expect(typeof result).toBe('number');
    });

    it('should return integer for whole numbers', () => {
      const result = parsePixelValue('16px');

      expect(Number.isInteger(result)).toBe(true);
    });

    it('should not return a string', () => {
      const result = parsePixelValue('16px');

      expect(typeof result).not.toBe('string');
    });
  });

  describe('mathematical operations', () => {
    it('should be usable in addition', () => {
      const result = parsePixelValue('10px') + parsePixelValue('5px');

      expect(result).toBe(15);
    });

    it('should be usable in subtraction', () => {
      const result = parsePixelValue('20px') - parsePixelValue('8px');

      expect(result).toBe(12);
    });

    it('should be usable in multiplication', () => {
      const result = parsePixelValue('12px') * 2;

      expect(result).toBe(24);
    });

    it('should be usable in division', () => {
      const result = parsePixelValue('24px') / 2;

      expect(result).toBe(12);
    });

    it('should be comparable', () => {
      const val1 = parsePixelValue('16px');
      const val2 = parsePixelValue('24px');

      expect(val1 < val2).toBe(true);
      expect(val2 > val1).toBe(true);
    });
  });

  describe('common CSS values', () => {
    it('should handle typical font sizes', () => {
      expect(parsePixelValue('12px')).toBe(12);
      expect(parsePixelValue('14px')).toBe(14);
      expect(parsePixelValue('16px')).toBe(16);
      expect(parsePixelValue('18px')).toBe(18);
      expect(parsePixelValue('20px')).toBe(20);
      expect(parsePixelValue('24px')).toBe(24);
    });

    it('should handle typical padding/margin values', () => {
      expect(parsePixelValue('0px')).toBe(0);
      expect(parsePixelValue('4px')).toBe(4);
      expect(parsePixelValue('8px')).toBe(8);
      expect(parsePixelValue('16px')).toBe(16);
      expect(parsePixelValue('32px')).toBe(32);
    });

    it('should handle typical width/height values', () => {
      expect(parsePixelValue('100px')).toBe(100);
      expect(parsePixelValue('200px')).toBe(200);
      expect(parsePixelValue('300px')).toBe(300);
      expect(parsePixelValue('400px')).toBe(400);
    });
  });

  describe('consistency', () => {
    it('should return same value for multiple calls', () => {
      const value = '16px';
      const result1 = parsePixelValue(value);
      const result2 = parsePixelValue(value);

      expect(result1).toBe(result2);
    });

    it('should be deterministic', () => {
      const values = ['10px', '20px', '30px'];

      values.forEach((value) => {
        const result1 = parsePixelValue(value);
        const result2 = parsePixelValue(value);
        expect(result1).toBe(result2);
      });
    });
  });
});

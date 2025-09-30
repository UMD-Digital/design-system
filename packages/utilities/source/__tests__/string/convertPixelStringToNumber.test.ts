import { convertPixelStringToNumber } from '../../string/convertPixelStringToNumber';

describe('convertPixelStringToNumber', () => {
  describe('happy path', () => {
    it('should convert "16px" to 16', () => {
      const result = convertPixelStringToNumber('16px');

      expect(result).toBe(16);
    });

    it('should convert "24px" to 24', () => {
      const result = convertPixelStringToNumber('24px');

      expect(result).toBe(24);
    });

    it('should convert "100px" to 100', () => {
      const result = convertPixelStringToNumber('100px');

      expect(result).toBe(100);
    });

    it('should convert "0px" to 0', () => {
      const result = convertPixelStringToNumber('0px');

      expect(result).toBe(0);
    });

    it('should convert negative pixel values', () => {
      const result = convertPixelStringToNumber('-10px');

      expect(result).toBe(-10);
    });

    it('should convert large pixel values', () => {
      const result = convertPixelStringToNumber('9999px');

      expect(result).toBe(9999);
    });

    it('should handle single digit pixels', () => {
      const result = convertPixelStringToNumber('5px');

      expect(result).toBe(5);
    });

    it('should handle double digit pixels', () => {
      const result = convertPixelStringToNumber('42px');

      expect(result).toBe(42);
    });

    it('should handle triple digit pixels', () => {
      const result = convertPixelStringToNumber('256px');

      expect(result).toBe(256);
    });
  });

  describe('edge cases', () => {
    it('should handle string without "px" suffix', () => {
      const result = convertPixelStringToNumber('16');

      expect(result).toBe(16);
    });

    it('should handle decimal values (truncates)', () => {
      const result = convertPixelStringToNumber('16.5px');

      expect(result).toBe(16);
    });

    it('should handle whitespace before number', () => {
      const result = convertPixelStringToNumber('  16px');

      expect(result).toBe(16);
    });

    it('should handle whitespace after px', () => {
      const result = convertPixelStringToNumber('16px  ');

      expect(result).toBe(16);
    });

    it('should handle zero without px', () => {
      const result = convertPixelStringToNumber('0');

      expect(result).toBe(0);
    });

    it('should handle very large numbers', () => {
      const result = convertPixelStringToNumber('999999px');

      expect(result).toBe(999999);
    });

    it('should handle negative zero', () => {
      const result = convertPixelStringToNumber('-0px');

      expect(result).toBe(0);
    });

    it('should handle fractional pixels', () => {
      const result = convertPixelStringToNumber('16.75px');

      expect(result).toBe(16);
    });

    it('should handle "PX" in uppercase', () => {
      // Note: replace is case-sensitive, so this won't remove 'PX'
      const result = convertPixelStringToNumber('16PX');

      // parseInt will parse until it hits non-numeric
      expect(result).toBe(16);
    });

    it('should handle mixed case "pX"', () => {
      const result = convertPixelStringToNumber('16pX');

      // Only 'px' lowercase is removed
      expect(result).toBe(16);
    });

    it('should handle "px" in the middle of string', () => {
      const result = convertPixelStringToNumber('16px24');

      // parseInt stops at first non-numeric after initial number
      expect(result).toBe(16);
    });

    it('should handle empty string', () => {
      const result = convertPixelStringToNumber('');

      expect(isNaN(result)).toBe(true);
    });

    it('should handle "px" only', () => {
      const result = convertPixelStringToNumber('px');

      expect(isNaN(result)).toBe(true);
    });

    it('should handle leading zeros', () => {
      const result = convertPixelStringToNumber('0016px');

      expect(result).toBe(16);
    });

    it('should handle scientific notation', () => {
      const result = convertPixelStringToNumber('1e2px');

      // parseInt parses '1e2' as 1 (stops at 'e')
      expect(result).toBe(1);
    });

    it('should handle hex notation', () => {
      const result = convertPixelStringToNumber('0x10px');

      // parseInt with no radix will parse '010' as 10 (after removing 'px')
      expect(result).toBe(0);
    });
  });

  describe('error conditions', () => {
    it('should return NaN for non-numeric strings', () => {
      const result = convertPixelStringToNumber('notanumber');

      expect(isNaN(result)).toBe(true);
    });

    it('should return NaN for null', () => {
      const result = convertPixelStringToNumber(null as any);

      expect(isNaN(result)).toBe(true);
    });

    it('should return NaN for undefined', () => {
      const result = convertPixelStringToNumber(undefined as any);

      expect(isNaN(result)).toBe(true);
    });

    it('should handle string with no digits', () => {
      const result = convertPixelStringToNumber('abcpx');

      expect(isNaN(result)).toBe(true);
    });

    it('should handle string with only whitespace', () => {
      const result = convertPixelStringToNumber('   ');

      expect(isNaN(result)).toBe(true);
    });
  });

  describe('return type', () => {
    it('should return a number type', () => {
      const result = convertPixelStringToNumber('16px');

      expect(typeof result).toBe('number');
    });

    it('should return integer for whole numbers', () => {
      const result = convertPixelStringToNumber('16px');

      expect(Number.isInteger(result)).toBe(true);
    });

    it('should not return a string', () => {
      const result = convertPixelStringToNumber('16px');

      expect(typeof result).not.toBe('string');
    });
  });

  describe('mathematical operations', () => {
    it('should be usable in addition', () => {
      const result = convertPixelStringToNumber('10px') + convertPixelStringToNumber('5px');

      expect(result).toBe(15);
    });

    it('should be usable in subtraction', () => {
      const result = convertPixelStringToNumber('20px') - convertPixelStringToNumber('8px');

      expect(result).toBe(12);
    });

    it('should be usable in multiplication', () => {
      const result = convertPixelStringToNumber('12px') * 2;

      expect(result).toBe(24);
    });

    it('should be usable in division', () => {
      const result = convertPixelStringToNumber('24px') / 2;

      expect(result).toBe(12);
    });

    it('should be comparable', () => {
      const val1 = convertPixelStringToNumber('16px');
      const val2 = convertPixelStringToNumber('24px');

      expect(val1 < val2).toBe(true);
      expect(val2 > val1).toBe(true);
    });
  });

  describe('common CSS values', () => {
    it('should handle typical font sizes', () => {
      expect(convertPixelStringToNumber('12px')).toBe(12);
      expect(convertPixelStringToNumber('14px')).toBe(14);
      expect(convertPixelStringToNumber('16px')).toBe(16);
      expect(convertPixelStringToNumber('18px')).toBe(18);
      expect(convertPixelStringToNumber('20px')).toBe(20);
      expect(convertPixelStringToNumber('24px')).toBe(24);
    });

    it('should handle typical padding/margin values', () => {
      expect(convertPixelStringToNumber('0px')).toBe(0);
      expect(convertPixelStringToNumber('4px')).toBe(4);
      expect(convertPixelStringToNumber('8px')).toBe(8);
      expect(convertPixelStringToNumber('16px')).toBe(16);
      expect(convertPixelStringToNumber('32px')).toBe(32);
    });

    it('should handle typical width/height values', () => {
      expect(convertPixelStringToNumber('100px')).toBe(100);
      expect(convertPixelStringToNumber('200px')).toBe(200);
      expect(convertPixelStringToNumber('300px')).toBe(300);
      expect(convertPixelStringToNumber('400px')).toBe(400);
    });
  });

  describe('consistency', () => {
    it('should return same value for multiple calls', () => {
      const value = '16px';
      const result1 = convertPixelStringToNumber(value);
      const result2 = convertPixelStringToNumber(value);

      expect(result1).toBe(result2);
    });

    it('should be deterministic', () => {
      const values = ['10px', '20px', '30px'];

      values.forEach((value) => {
        const result1 = convertPixelStringToNumber(value);
        const result2 = convertPixelStringToNumber(value);
        expect(result1).toBe(result2);
      });
    });
  });
});
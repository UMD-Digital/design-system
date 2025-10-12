import { parseDateFromElement } from '../../date/parseDateFromElement';

describe('parseDateFromElement', () => {
  describe('happy path', () => {
    it('should parse ISO date string from element', () => {
      const element = document.createElement('time');
      element.textContent = '2025-09-29T14:30:00';

      const result = parseDateFromElement({ element });

      expect(result).toBeDefined();
      expect(result).toHaveProperty('dayOfWeek');
      expect(result).toHaveProperty('month');
      expect(result).toHaveProperty('day');
      expect(result).toHaveProperty('time');
    });

    it('should parse date and return formatted components', () => {
      const element = document.createElement('time');
      element.textContent = '2025-09-29T14:30:00';

      const result = parseDateFromElement({ element });

      expect(result?.month).toBe('Sep');
      expect(result?.day).toBe('29');
      expect(typeof result?.dayOfWeek).toBe('string');
      expect(typeof result?.time).toBe('string');
    });

    it('should handle morning times', () => {
      const element = document.createElement('time');
      element.textContent = '2025-09-29T09:15:00';

      const result = parseDateFromElement({ element });

      expect(result?.time).toMatch(/am$/);
    });

    it('should handle afternoon times', () => {
      const element = document.createElement('time');
      element.textContent = '2025-09-29T15:45:00';

      const result = parseDateFromElement({ element });

      expect(result?.time).toMatch(/pm$/);
    });

    it('should handle midnight', () => {
      const element = document.createElement('time');
      element.textContent = '2025-09-29T00:00:00';

      const result = parseDateFromElement({ element });

      expect(result).toBeDefined();
      expect(result?.day).toBe('29');
    });

    it('should handle noon', () => {
      const element = document.createElement('time');
      element.textContent = '2025-09-29T12:00:00';

      const result = parseDateFromElement({ element });

      expect(result).toBeDefined();
      expect(result?.time).toMatch(/pm$/);
    });

    it('should parse dates with timezone information', () => {
      const element = document.createElement('time');
      element.textContent = '2025-09-29T14:30:00-04:00';

      const result = parseDateFromElement({ element });

      expect(result).toBeDefined();
      expect(result).toHaveProperty('dayOfWeek');
      expect(result).toHaveProperty('month');
    });

    it('should handle various date formats', () => {
      const formats = [
        '2025-09-29T14:30:00',
        '2025-09-29T14:30:00Z',
        '2025-09-29T14:30:00-05:00',
        '2025-09-29T14:30:00.000Z',
      ];

      formats.forEach((dateStr) => {
        const element = document.createElement('time');
        element.textContent = dateStr;

        const result = parseDateFromElement({ element });

        expect(result).toBeDefined();
        expect(result).toHaveProperty('month');
      });
    });
  });

  describe('edge cases', () => {
    it('should return null for null element', () => {
      const result = parseDateFromElement({ element: null });

      expect(result).toBeNull();
    });

    it('should return null for undefined element', () => {
      const result = parseDateFromElement({ element: undefined as any });

      expect(result).toBeNull();
    });

    it('should return null for element with no textContent', () => {
      const element = document.createElement('time');

      const result = parseDateFromElement({ element });

      expect(result).toBeNull();
    });

    it('should return null for element with empty textContent', () => {
      const element = document.createElement('time');
      element.textContent = '';

      const result = parseDateFromElement({ element });

      expect(result).toBeNull();
    });

    it('should return object with "Invalid Date" for element with whitespace only', () => {
      const element = document.createElement('time');
      element.textContent = '   ';

      const result = parseDateFromElement({ element });

      // Empty/whitespace string results in Invalid Date from Date.parse()
      expect(result).toBeDefined();
      expect(result?.month).toBe('Invalid Date');
    });

    it('should handle dates at year boundaries', () => {
      const element = document.createElement('time');
      element.textContent = '2025-01-01T00:00:00';

      const result = parseDateFromElement({ element });

      expect(result?.month).toBe('Jan');
      expect(result?.day).toBe('1');
    });

    it('should handle December 31st', () => {
      const element = document.createElement('time');
      element.textContent = '2025-12-31T23:59:59';

      const result = parseDateFromElement({ element });

      expect(result?.month).toBe('Dec');
      expect(result?.day).toBe('31');
    });

    it('should handle leap year dates', () => {
      const element = document.createElement('time');
      element.textContent = '2024-02-29T12:00:00';

      const result = parseDateFromElement({ element });

      expect(result?.month).toBe('Feb');
      expect(result?.day).toBe('29');
    });

    it('should trim whitespace from textContent', () => {
      const element = document.createElement('time');
      element.textContent = '  2025-09-29T14:30:00  ';

      const result = parseDateFromElement({ element });

      expect(result).toBeDefined();
      expect(result?.month).toBe('Sep');
    });

    it('should handle dates far in the past', () => {
      const element = document.createElement('time');
      element.textContent = '1990-05-20T12:00:00';

      const result = parseDateFromElement({ element });

      expect(result).toBeDefined();
      expect(result?.month).toBe('May');
      expect(result?.day).toBe('20');
    });

    it('should handle dates far in the future', () => {
      const element = document.createElement('time');
      element.textContent = '2099-12-25T12:00:00';

      const result = parseDateFromElement({ element });

      expect(result).toBeDefined();
      expect(result?.month).toBe('Dec');
      expect(result?.day).toBe('25');
    });

    it('should work with any element type, not just time', () => {
      const div = document.createElement('div');
      div.textContent = '2025-09-29T14:30:00';

      const result = parseDateFromElement({ element: div });

      expect(result).toBeDefined();
      expect(result?.month).toBe('Sep');
    });

    it('should handle single digit months', () => {
      const element = document.createElement('time');
      element.textContent = '2025-01-15T12:00:00';

      const result = parseDateFromElement({ element });

      expect(result?.month).toBe('Jan');
    });

    it('should handle single digit days', () => {
      const element = document.createElement('time');
      element.textContent = '2025-09-05T12:00:00';

      const result = parseDateFromElement({ element });

      expect(result?.day).toBe('5');
    });
  });

  describe('error conditions', () => {
    it('should return object with "Invalid Date" for invalid date string', () => {
      const element = document.createElement('time');
      element.textContent = 'not a date';

      const result = parseDateFromElement({ element });

      // Invalid dates return "Invalid Date" string from toLocaleString
      expect(result).toBeDefined();
      expect(result?.month).toBe('Invalid Date');
    });

    it('should return object with "Invalid Date" for partially valid date', () => {
      const element = document.createElement('time');
      element.textContent = '2025-13-45'; // Invalid month and day

      const result = parseDateFromElement({ element });

      expect(result).toBeDefined();
      expect(result?.month).toBe('Invalid Date');
    });

    it('should parse date in alternative format successfully', () => {
      const element = document.createElement('time');
      element.textContent = '2025/09/29 14:30:00';

      const result = parseDateFromElement({ element });

      // Date.parse can handle this format
      expect(result).toBeDefined();
      expect(result?.month).toBe('Sep');
    });

    it('should return object with "Invalid Date" for random text', () => {
      const element = document.createElement('time');
      element.textContent = 'Tomorrow at 3pm';

      const result = parseDateFromElement({ element });

      expect(result).toBeDefined();
      expect(result?.month).toBe('Invalid Date');
    });

    it('should parse timestamp successfully', () => {
      const element = document.createElement('time');
      element.textContent = '12345';

      const result = parseDateFromElement({ element });

      // Numeric strings are treated as timestamps
      expect(result).toBeDefined();
      expect(result?.month).not.toBe('Invalid Date');
    });
  });

  describe('consistency', () => {
    it('should produce consistent results for same date', () => {
      const element = document.createElement('time');
      element.textContent = '2025-09-29T14:30:00';

      const result1 = parseDateFromElement({ element });
      const result2 = parseDateFromElement({ element });

      expect(result1).toEqual(result2);
    });

    it('should always return object with four properties when valid', () => {
      const element = document.createElement('time');
      element.textContent = '2025-09-29T14:30:00';

      const result = parseDateFromElement({ element });

      expect(result).toHaveProperty('dayOfWeek');
      expect(result).toHaveProperty('month');
      expect(result).toHaveProperty('day');
      expect(result).toHaveProperty('time');
      expect(Object.keys(result as any).length).toBe(4);
    });

    it('should always return same result for invalid input', () => {
      const element = document.createElement('time');
      element.textContent = 'invalid';

      const result1 = parseDateFromElement({ element });
      const result2 = parseDateFromElement({ element });

      expect(result1).toEqual(result2);
      expect(result1?.month).toBe('Invalid Date');
    });

    it('should not modify the element', () => {
      const element = document.createElement('time');
      const originalContent = '2025-09-29T14:30:00';
      element.textContent = originalContent;

      parseDateFromElement({ element });

      expect(element.textContent).toBe(originalContent);
    });
  });

  describe('date format validation', () => {
    it('should return valid month abbreviation', () => {
      const element = document.createElement('time');
      element.textContent = '2025-09-29T14:30:00';

      const result = parseDateFromElement({ element });

      const validMonths = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      expect(validMonths).toContain(result?.month);
    });

    it('should return valid day of week abbreviation', () => {
      const element = document.createElement('time');
      element.textContent = '2025-09-29T14:30:00';

      const result = parseDateFromElement({ element });

      const validDaysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      expect(validDaysOfWeek).toContain(result?.dayOfWeek);
    });

    it('should return day as string number', () => {
      const element = document.createElement('time');
      element.textContent = '2025-09-29T14:30:00';

      const result = parseDateFromElement({ element });

      expect(typeof result?.day).toBe('string');
      expect(parseInt(result?.day as string, 10)).toBeGreaterThan(0);
      expect(parseInt(result?.day as string, 10)).toBeLessThanOrEqual(31);
    });

    it('should return time with am/pm suffix', () => {
      const element = document.createElement('time');
      element.textContent = '2025-09-29T14:30:00';

      const result = parseDateFromElement({ element });

      expect(result?.time).toMatch(/(am|pm)$/);
    });
  });
});

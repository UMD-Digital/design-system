import { formatDateForDisplay } from '../../source/date/formatDateForDisplay';

describe('formatDateForDisplay', () => {
  describe('happy path', () => {
    it('should format date with all properties', () => {
      const date = new Date('2025-09-29T14:30:00');
      const result = formatDateForDisplay(date);

      expect(result).toHaveProperty('full');
      expect(result).toHaveProperty('dayOfWeekLong');
      expect(result).toHaveProperty('dayOfWeek');
      expect(result).toHaveProperty('month');
      expect(result).toHaveProperty('day');
      expect(result).toHaveProperty('time');
    });

    it('should format full date correctly', () => {
      const date = new Date('2025-09-29T14:30:00');
      const result = formatDateForDisplay(date);

      expect(result.full).toBe('Sep 29, 2025');
    });

    it('should format day of week long correctly', () => {
      const date = new Date('2025-09-29T14:30:00'); // Monday
      const result = formatDateForDisplay(date);

      expect(result.dayOfWeekLong).toBe('Monday');
    });

    it('should format day of week short correctly', () => {
      const date = new Date('2025-09-29T14:30:00'); // Monday
      const result = formatDateForDisplay(date);

      expect(result.dayOfWeek).toBe('Mon');
    });

    it('should format month correctly', () => {
      const date = new Date('2025-09-29T14:30:00');
      const result = formatDateForDisplay(date);

      expect(result.month).toBe('Sep');
    });

    it('should format day correctly', () => {
      const date = new Date('2025-09-29T14:30:00');
      const result = formatDateForDisplay(date);

      expect(result.day).toBe('29');
    });

    it('should format time correctly with PM', () => {
      const date = new Date('2025-09-29T14:30:00');
      const result = formatDateForDisplay(date);

      expect(result.time).toBe('2:30pm');
    });

    it('should format time correctly with AM', () => {
      const date = new Date('2025-09-29T09:15:00');
      const result = formatDateForDisplay(date);

      expect(result.time).toBe('9:15am');
    });

    it('should convert AM to lowercase', () => {
      const date = new Date('2025-09-29T08:00:00');
      const result = formatDateForDisplay(date);

      expect(result.time).toContain('am');
      expect(result.time).not.toContain('AM');
    });

    it('should convert PM to lowercase', () => {
      const date = new Date('2025-09-29T16:00:00');
      const result = formatDateForDisplay(date);

      expect(result.time).toContain('pm');
      expect(result.time).not.toContain('PM');
    });
  });

  describe('edge cases', () => {
    it('should handle midnight', () => {
      const date = new Date('2025-09-29T00:00:00');
      const result = formatDateForDisplay(date);

      expect(result.time).toBe('12:00am');
    });

    it('should handle noon', () => {
      const date = new Date('2025-09-29T12:00:00');
      const result = formatDateForDisplay(date);

      expect(result.time).toBe('12:00pm');
    });

    it('should handle January 1st', () => {
      const date = new Date('2025-01-01T12:00:00');
      const result = formatDateForDisplay(date);

      expect(result.full).toBe('Jan 1, 2025');
      expect(result.month).toBe('Jan');
      expect(result.day).toBe('1');
    });

    it('should handle December 31st', () => {
      const date = new Date('2025-12-31T23:59:00');
      const result = formatDateForDisplay(date);

      expect(result.full).toBe('Dec 31, 2025');
      expect(result.month).toBe('Dec');
      expect(result.day).toBe('31');
    });

    it('should handle leap year date', () => {
      const date = new Date('2024-02-29T12:00:00');
      const result = formatDateForDisplay(date);

      expect(result.full).toBe('Feb 29, 2024');
      expect(result.day).toBe('29');
    });

    it('should handle different years', () => {
      const date1 = new Date('2020-06-15T12:00:00');
      const date2 = new Date('2030-06-15T12:00:00');

      const result1 = formatDateForDisplay(date1);
      const result2 = formatDateForDisplay(date2);

      expect(result1.full).toBe('Jun 15, 2020');
      expect(result2.full).toBe('Jun 15, 2030');
    });

    it('should handle single digit day', () => {
      const date = new Date('2025-09-05T12:00:00');
      const result = formatDateForDisplay(date);

      expect(result.day).toBe('5');
    });

    it('should handle double digit day', () => {
      const date = new Date('2025-09-15T12:00:00');
      const result = formatDateForDisplay(date);

      expect(result.day).toBe('15');
    });

    it('should handle different weekdays', () => {
      const sunday = new Date('2025-09-28T12:00:00');
      const monday = new Date('2025-09-29T12:00:00');

      const resultSunday = formatDateForDisplay(sunday);
      const resultMonday = formatDateForDisplay(monday);

      expect(resultSunday.dayOfWeekLong).toBe('Sunday');
      expect(resultMonday.dayOfWeekLong).toBe('Monday');
    });

    it('should handle time with zero minutes', () => {
      const date = new Date('2025-09-29T14:00:00');
      const result = formatDateForDisplay(date);

      expect(result.time).toBe('2:00pm');
    });

    it('should handle time close to midnight', () => {
      const date = new Date('2025-09-29T23:59:00');
      const result = formatDateForDisplay(date);

      expect(result.time).toBe('11:59pm');
    });

    it('should handle time close to noon', () => {
      const date = new Date('2025-09-29T11:59:00');
      const result = formatDateForDisplay(date);

      expect(result.time).toBe('11:59am');
    });
  });

  describe('error conditions', () => {
    it('should handle invalid date', () => {
      const invalidDate = new Date('invalid');
      const result = formatDateForDisplay(invalidDate);

      // Invalid dates return "Invalid Date" strings in most browsers
      expect(result.full).toContain('Invalid');
    });

    it('should handle null date', () => {
      expect(() => formatDateForDisplay(null as any)).toThrow();
    });

    it('should handle undefined date', () => {
      expect(() => formatDateForDisplay(undefined as any)).toThrow();
    });
  });

  describe('consistency', () => {
    it('should be consistent across multiple calls', () => {
      const date = new Date('2025-09-29T14:30:00');
      const result1 = formatDateForDisplay(date);
      const result2 = formatDateForDisplay(date);

      expect(result1).toEqual(result2);
    });

    it('should maintain en-US locale formatting', () => {
      const date = new Date('2025-09-29T14:30:00');
      const result = formatDateForDisplay(date);

      // Verify en-US formatting
      expect(result.month).toBe('Sep'); // Not "Sept" or other variations
      expect(result.dayOfWeek).toBe('Mon'); // Not "Mo" or other variations
    });
  });
});
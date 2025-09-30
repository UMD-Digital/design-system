import { createDateCompareString } from '../../date/createDateCompareString';

describe('createDateCompareString', () => {
  describe('happy path', () => {
    it('should return object with palindromeTruncated property', () => {
      const date = new Date('2025-09-29T14:30:00');
      const result = createDateCompareString(date);

      expect(result).toHaveProperty('palindromeTruncated');
    });

    it('should format date as YYYY-MM-DD', () => {
      const date = new Date('2025-09-29T14:30:00');
      const result = createDateCompareString(date);

      expect(result.palindromeTruncated).toBe('2025-09-29');
    });

    it('should ignore time component', () => {
      const date1 = new Date(Date.UTC(2025, 8, 29, 0, 0, 0));
      const date2 = new Date(Date.UTC(2025, 8, 29, 23, 59, 59));

      const result1 = createDateCompareString(date1);
      const result2 = createDateCompareString(date2);

      expect(result1.palindromeTruncated).toBe(result2.palindromeTruncated);
    });

    it('should format single digit month with leading zero', () => {
      const date = new Date('2025-01-15T12:00:00');
      const result = createDateCompareString(date);

      expect(result.palindromeTruncated).toBe('2025-01-15');
    });

    it('should format single digit day with leading zero', () => {
      const date = new Date('2025-09-05T12:00:00');
      const result = createDateCompareString(date);

      expect(result.palindromeTruncated).toBe('2025-09-05');
    });

    it('should handle different years', () => {
      const date2020 = new Date('2020-06-15T12:00:00');
      const date2030 = new Date('2030-06-15T12:00:00');

      const result2020 = createDateCompareString(date2020);
      const result2030 = createDateCompareString(date2030);

      expect(result2020.palindromeTruncated).toBe('2020-06-15');
      expect(result2030.palindromeTruncated).toBe('2030-06-15');
    });
  });

  describe('edge cases', () => {
    it('should handle January 1st', () => {
      const date = new Date('2025-01-01T12:00:00');
      const result = createDateCompareString(date);

      expect(result.palindromeTruncated).toBe('2025-01-01');
    });

    it('should handle December 31st', () => {
      const date = new Date(Date.UTC(2025, 11, 31, 23, 59, 59));
      const result = createDateCompareString(date);

      expect(result.palindromeTruncated).toBe('2025-12-31');
    });

    it('should handle leap year date', () => {
      const date = new Date('2024-02-29T12:00:00');
      const result = createDateCompareString(date);

      expect(result.palindromeTruncated).toBe('2024-02-29');
    });

    it('should handle dates in the past', () => {
      const date = new Date('1990-05-20T12:00:00');
      const result = createDateCompareString(date);

      expect(result.palindromeTruncated).toBe('1990-05-20');
    });

    it('should handle dates far in the future', () => {
      const date = new Date('2099-12-25T12:00:00');
      const result = createDateCompareString(date);

      expect(result.palindromeTruncated).toBe('2099-12-25');
    });

    it('should handle midnight UTC', () => {
      const date = new Date('2025-09-29T00:00:00Z');
      const result = createDateCompareString(date);

      // Should return the date in UTC (2025-09-29)
      expect(result.palindromeTruncated).toBe('2025-09-29');
    });

    it('should handle dates with timezone information', () => {
      const date = new Date('2025-09-29T14:30:00-04:00');
      const result = createDateCompareString(date);

      // toISOString() converts to UTC
      expect(result.palindromeTruncated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  describe('comparison functionality', () => {
    it('should allow string comparison for earlier dates', () => {
      const date1 = new Date('2025-09-28T12:00:00');
      const date2 = new Date('2025-09-29T12:00:00');

      const result1 = createDateCompareString(date1);
      const result2 = createDateCompareString(date2);

      expect(result1.palindromeTruncated < result2.palindromeTruncated).toBe(
        true,
      );
    });

    it('should allow string comparison for later dates', () => {
      const date1 = new Date('2025-09-30T12:00:00');
      const date2 = new Date('2025-09-29T12:00:00');

      const result1 = createDateCompareString(date1);
      const result2 = createDateCompareString(date2);

      expect(result1.palindromeTruncated > result2.palindromeTruncated).toBe(
        true,
      );
    });

    it('should allow string comparison for equal dates', () => {
      const date1 = new Date(Date.UTC(2025, 8, 29, 10, 0, 0));
      const date2 = new Date(Date.UTC(2025, 8, 29, 20, 0, 0));

      const result1 = createDateCompareString(date1);
      const result2 = createDateCompareString(date2);

      expect(result1.palindromeTruncated === result2.palindromeTruncated).toBe(
        true,
      );
    });

    it('should be sortable', () => {
      const dates = [
        new Date('2025-09-30T12:00:00'),
        new Date('2025-09-28T12:00:00'),
        new Date('2025-09-29T12:00:00'),
      ];

      const sorted = dates
        .map((d) => createDateCompareString(d))
        .map((r) => r.palindromeTruncated)
        .sort();

      expect(sorted).toEqual(['2025-09-28', '2025-09-29', '2025-09-30']);
    });
  });

  describe('error conditions', () => {
    it('should handle invalid date', () => {
      const invalidDate = new Date('invalid');

      // Invalid dates throw when toISOString() is called
      expect(() => createDateCompareString(invalidDate)).toThrow();
    });

    it('should throw for null date', () => {
      expect(() => createDateCompareString(null as any)).toThrow();
    });

    it('should throw for undefined date', () => {
      expect(() => createDateCompareString(undefined as any)).toThrow();
    });
  });

  describe('consistency', () => {
    it('should be consistent across multiple calls', () => {
      const date = new Date('2025-09-29T14:30:00');
      const result1 = createDateCompareString(date);
      const result2 = createDateCompareString(date);

      expect(result1.palindromeTruncated).toBe(result2.palindromeTruncated);
    });

    it('should always return 10 character string for valid dates', () => {
      const date = new Date('2025-09-29T14:30:00');
      const result = createDateCompareString(date);

      expect(result.palindromeTruncated.length).toBe(10);
    });

    it('should always include dashes in correct positions', () => {
      const date = new Date('2025-09-29T14:30:00');
      const result = createDateCompareString(date);

      expect(result.palindromeTruncated[4]).toBe('-');
      expect(result.palindromeTruncated[7]).toBe('-');
    });
  });
});
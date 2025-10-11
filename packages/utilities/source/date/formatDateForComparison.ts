/**
 * Creates a standardized date string for comparison purposes
 *
 * Converts a Date object to an ISO 8601 date string (YYYY-MM-DD format)
 * suitable for string-based date comparisons and sorting.
 *
 * @param date - The Date object to convert
 * @returns Object with palindromeTruncated property containing YYYY-MM-DD string
 *
 * @example
 * ```typescript
 * const dateString = formatDateForComparison(new Date('2025-09-29T14:30:00'));
 * // { palindromeTruncated: '2025-09-29' }
 *
 * // Useful for comparisons
 * const date1 = formatDateForComparison(new Date('2025-09-29'));
 * const date2 = formatDateForComparison(new Date('2025-09-30'));
 * if (date1.palindromeTruncated < date2.palindromeTruncated) {
 *   console.log('date1 is earlier');
 * }
 * ```
 */
export const formatDateForComparison = (date: Date) => {
  return {
    palindromeTruncated: date.toISOString().slice(0, 10),
  };
};

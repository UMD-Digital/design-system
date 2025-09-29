/**
 * Creates a formatted date object with multiple presentation formats
 *
 * Converts a Date object into various human-readable string formats
 * for displaying in different contexts (full date, day of week, time, etc.).
 *
 * @param date - The Date object to format
 * @returns Object with formatted date strings
 *
 * @example
 * ```typescript
 * const formatted = createVisualFormattedDate(new Date('2025-09-29T14:30:00'));
 * // {
 * //   full: 'Sep 29, 2025',
 * //   dayOfWeekLong: 'Monday',
 * //   dayOfWeek: 'Mon',
 * //   month: 'Sep',
 * //   day: '29',
 * //   time: '2:30pm'
 * // }
 * ```
 */
export const createVisualFormattedDate = (date: Date) => {
  return {
    full: date.toLocaleString('en-US', {
      month: 'short',
      year: 'numeric',
      day: 'numeric',
    }),
    dayOfWeekLong: date.toLocaleString('en-US', {
      weekday: 'long',
    }),
    dayOfWeek: date.toLocaleString('en-US', {
      weekday: 'short',
    }),
    month: date.toLocaleString('en-US', {
      month: 'short',
    }),
    day: date.toLocaleString('en-US', {
      day: 'numeric',
    }),
    time: date
      .toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
      })
      .replace(' AM', 'am')
      .replace(' PM', 'pm'),
  };
};
import { formatDateForDisplay } from './formatDateForDisplay';

/**
 * Parses a date from an element's text content and returns formatted date parts
 *
 * Extracts date string from element text, parses it, and returns commonly used
 * date components formatted for display in event UI.
 *
 * @param element - The element containing the date string
 * @returns Object with formatted date parts or null if parsing fails
 *
 * @example
 * ```typescript
 * const dateElement = document.createElement('time');
 * dateElement.textContent = '2025-09-29T14:30:00';
 *
 * const result = parseDateFromElement({ element: dateElement });
 * // {
 * //   dayOfWeek: 'Mon',
 * //   month: 'Sep',
 * //   day: '29',
 * //   time: '2:30pm'
 * // }
 * ```
 */
export const parseDateFromElement = ({
  element,
}: {
  element: HTMLElement | Element | null;
}) => {
  if (element && element.textContent) {
    const dateString = element.textContent.trim();
    const parsedDate = Date.parse(dateString);
    const date = new Date(parsedDate);
    const formattedDate = formatDateForDisplay(date);

    return {
      dayOfWeek: formattedDate.dayOfWeek,
      month: formattedDate.month,
      day: formattedDate.day,
      time: formattedDate.time,
    };
  }

  return null;
};

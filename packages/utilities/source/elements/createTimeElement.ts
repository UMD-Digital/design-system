/**
 * Creates an HTML time element with formatted display text and machine-readable datetime
 *
 * The time element provides semantic meaning to dates and times, improving accessibility
 * and enabling browser features like calendar integration. The datetime attribute should
 * use a valid datetime string (ISO 8601 format recommended).
 *
 * @param datetime - Machine-readable datetime string (ISO 8601 format, e.g., "2024-01-15" or "2024-01-15T14:30:00Z")
 * @param displayText - Human-readable date/time text to display
 * @param allowHTML - If true, uses innerHTML instead of textContent (use with caution)
 * @returns HTMLTimeElement with datetime attribute and display text, or null if required params are missing
 *
 * @example
 * ```typescript
 * // Simple date
 * const dateElement = createTimeElement({
 *   datetime: '2024-01-15',
 *   displayText: 'January 15, 2024'
 * });
 *
 * // Date with time
 * const dateTimeElement = createTimeElement({
 *   datetime: '2024-01-15T14:30:00Z',
 *   displayText: 'Jan 15, 2024 at 2:30 PM'
 * });
 *
 * // Relative time
 * const relativeElement = createTimeElement({
 *   datetime: '2024-01-15',
 *   displayText: '3 days ago'
 * });
 * ```
 *
 * @category elements
 */
export const createTimeElement = ({
  datetime,
  displayText,
  allowHTML = false,
}: {
  datetime: string;
  displayText: string;
  allowHTML?: boolean;
}): HTMLTimeElement | null => {
  if (!datetime || !displayText) {
    return null;
  }

  const timeElement = document.createElement('time');
  timeElement.setAttribute('datetime', datetime);

  if (allowHTML) {
    timeElement.innerHTML = displayText;
  } else {
    timeElement.textContent = displayText;
  }

  return timeElement;
};

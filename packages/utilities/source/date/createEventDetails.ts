/**
 * Creates a structured event details object from date and location information
 *
 * Combines start date, optional end date, and location information into a unified
 * event details object. Useful for creating calendar events, event listings, etc.
 *
 * @param locationElement - Optional element containing location text
 * @param startDate - Start date object with dayOfWeek, month, day, time properties
 * @param endDate - Optional end date object with same structure as startDate
 * @returns Event details object with formatted date and location information
 *
 * @example
 * ```typescript
 * const details = createEventDetails({
 *   locationElement: document.querySelector('.location'),
 *   startDate: {
 *     dayOfWeek: 'Mon',
 *     month: 'Sep',
 *     day: '29',
 *     time: '2:30pm'
 *   },
 *   endDate: {
 *     dayOfWeek: 'Mon',
 *     month: 'Sep',
 *     day: '29',
 *     time: '4:30pm'
 *   }
 * });
 * // Returns object with startDayOfWeek, startMonth, startDay, startTime,
 * // endDayOfWeek, endMonth, endDay, endTime, and location properties
 * ```
 *
 * @category date
 */
export const createEventDetails = ({
  locationElement,
  startDate,
  endDate,
}: {
  locationElement?: HTMLElement | Element | null;
  startDate: Record<string, string>;
  endDate?: Record<string, string> | null;
}) => {
  const obj: any = {
    startDayOfWeek: startDate.dayOfWeek,
    startMonth: startDate.month,
    startDay: startDate.day,
    startTime: startDate.time,
  };

  if (locationElement && locationElement.textContent) {
    obj.location = [{ title: locationElement.textContent }];
  }

  if (endDate) {
    obj.endDayOfWeek = endDate.dayOfWeek;
    obj.endMonth = endDate.month;
    obj.endDay = endDate.day;
    obj.endTime = endDate.time;
  }

  return obj;
};

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

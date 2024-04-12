const CreateDate = ({ element }: { element: HTMLElement | Element | null }) => {
  if (element && element.textContent) {
    const dateString = element.textContent.trim();
    const parsedDate = Date.parse(dateString);
    const date = new Date(parsedDate);
    const dayOfWeek = date.toLocaleString('en-US', {
      weekday: 'short',
    });
    const month = date.toLocaleString('en-US', {
      month: 'short',
    });
    const day = date.toLocaleString('en-US', {
      day: 'numeric',
    });
    const time = date
      .toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'America/New_York',
      })
      .replace(' AM', 'am')
      .replace(' PM', 'pm');

    return {
      dayOfWeek,
      month,
      day,
      time,
    };
  }

  return null;
};

const CreateDetailsData = ({
  locationElement,
  startDate,
  endDate,
}: {
  locationElement: HTMLElement | Element | null;
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

export default {
  CreateDate,
  CreateDetailsData,
};

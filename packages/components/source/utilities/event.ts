const createVisualFormattedDate = (date: Date) => {
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

const createDate = ({ element }: { element: HTMLElement | Element | null }) => {
  if (element && element.textContent) {
    const dateString = element.textContent.trim();
    const parsedDate = Date.parse(dateString);
    const date = new Date(parsedDate);
    const formattedDate = createVisualFormattedDate(date);

    return {
      dayOfWeek: formattedDate.dayOfWeek,
      month: formattedDate.month,
      day: formattedDate.day,
      time: formattedDate.time,
    };
  }

  return null;
};

const createDetailsData = ({
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

export default {
  createDate,
  createDetailsData,
};

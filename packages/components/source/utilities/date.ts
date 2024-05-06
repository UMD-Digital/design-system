const CreateVisualFormattedDate = (date: Date) => {
  return {
    full: date.toLocaleString('en-US', {
      timeZone: 'UTC',
      month: 'short',
      year: 'numeric',
      day: 'numeric',
    }),
    dayOfWeekLong: date.toLocaleString('en-US', {
      timeZone: 'UTC',
      weekday: 'long',
    }),
    dayOfWeek: date.toLocaleString('en-US', {
      timeZone: 'UTC',
      weekday: 'short',
    }),
    month: date.toLocaleString('en-US', {
      timeZone: 'UTC',
      month: 'short',
    }),
    day: date.toLocaleString('en-US', {
      timeZone: 'UTC',
      day: 'numeric',
    }),
    time: date
      .toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'America/New_York',
      })
      .replace(' AM', 'am')
      .replace(' PM', 'pm'),
  };
};

const CreateDateCompareString = (date: Date) => {
  return {
    // format date as "2021-09-01"
    palindromeTruncated: date.toISOString().slice(0, 10),
  };
};

export default {
  CreateVisualFormattedDate,
  CreateDateCompareString,
};

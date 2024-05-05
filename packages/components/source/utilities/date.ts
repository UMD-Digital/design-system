const CreateVisualFormattedDate = (date: Date) => {
  return {
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
        timeZone: 'America/New_York',
      })
      .replace(' AM', 'am')
      .replace(' PM', 'pm'),
  };
};

export default {
  CreateVisualFormattedDate,
};

import { createVisualFormattedDate } from './createVisualFormattedDate';

export const createEventDate = ({
  element,
}: {
  element: HTMLElement | Element | null;
}) => {
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

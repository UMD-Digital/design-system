/**
 * Event Grouping Utilities
 *
 * Utilities for grouping and sorting events by date.
 * Used by the grouped events feed.
 *
 * @module utilities/grouping/events
 */

import { EventEntry } from 'types/data';

export interface GroupedEvent {
  date: string;
  events: EventEntry[];
}

const MONTH_MAP: Record<string, string> = {
  Jan: '01',
  Feb: '02',
  Mar: '03',
  Apr: '04',
  May: '05',
  Jun: '06',
  Jul: '07',
  Aug: '08',
  Sep: '09',
  Oct: '10',
  Nov: '11',
  Dec: '12',
};

/**
 * Get a human-readable date banner
 *
 * Returns "Today", day name (within 7 days), or formatted date
 */
export const getDateBanner = (dateStamp: string): string => {
  // Parse the date string more reliably
  const dateParts = dateStamp.split('T')[0].split('-');
  const year = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1; // Month is 0-indexed
  const day = parseInt(dateParts[2], 10);

  // Create dates using local timezone
  const eventDate = new Date(year, month, day);
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const weekFromNow = new Date();
  weekFromNow.setDate(currentDate.getDate() + 7);
  weekFromNow.setHours(0, 0, 0, 0);

  // Check if it's today
  if (
    eventDate.getFullYear() === currentDate.getFullYear() &&
    eventDate.getMonth() === currentDate.getMonth() &&
    eventDate.getDate() === currentDate.getDate()
  ) {
    return 'Today';
  }

  // Check if it's within the next 7 days
  if (
    eventDate.getTime() > currentDate.getTime() &&
    eventDate.getTime() <= weekFromNow.getTime()
  ) {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    return days[eventDate.getDay()];
  }

  // Otherwise return day of week, month and day
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return `${days[eventDate.getDay()]}, ${
    months[eventDate.getMonth()]
  } ${eventDate.getDate()}`;
};

/**
 * Parse a date string to local Date object
 */
export const parseLocalDate = (dateString: string): Date => {
  const parts = dateString.split('-');
  const date = new Date(
    parseInt(parts[0], 10),
    parseInt(parts[1], 10) - 1,
    parseInt(parts[2], 10),
  );
  date.setHours(0, 0, 0, 0);
  return date;
};

/**
 * Get the start date of an event
 */
export const getEventStartDate = (event: EventEntry): Date => {
  return parseLocalDate(event.startStamp.split('T')[0]);
};

/**
 * Check if an event spans multiple days
 */
export const isMultiDayEvent = (event: EventEntry): boolean => {
  const startParts = event.startStamp.split('T')[0].split('-');
  const startMonth = startParts[1];
  const startDay = startParts[2];
  const endMonth = MONTH_MAP[event.endMonth || ''];
  const endDay = (event.endDay || '').padStart(2, '0');

  return !(startMonth === endMonth && startDay === endDay);
};

/**
 * Check if an event starts on a specific date
 */
export const eventStartsOnDate = (event: EventEntry, targetDate: Date): boolean => {
  const eventStartDate = getEventStartDate(event);
  return eventStartDate.getTime() === targetDate.getTime();
};

/**
 * Get event priority for sorting within a date group
 *
 * Priority:
 * 1. Multi-day events that start on this date
 * 2. Single-day events
 * 3. Multi-day events that don't start on this date
 */
export const getEventPriority = (event: EventEntry, groupDate: Date): number => {
  const isMulti = isMultiDayEvent(event);
  const startsOnDate = eventStartsOnDate(event, groupDate);

  if (isMulti && startsOnDate) return 1;
  if (!isMulti) return 2;
  return 3;
};

/**
 * Sort events by priority within a date group
 */
export const sortEventsByPriority = (
  events: EventEntry[],
  groupDate: Date,
): EventEntry[] => {
  return [...events].sort((a, b) => {
    const aPriority = getEventPriority(a, groupDate);
    const bPriority = getEventPriority(b, groupDate);
    return aPriority - bPriority;
  });
};

/**
 * Group events by date
 *
 * Groups events by their start date, with past events grouped under today.
 * Each group is sorted by priority (multi-day events starting today first).
 */
export const groupEventsByDate = (events: EventEntry[]): GroupedEvent[] => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const grouped = events.reduce((acc, event) => {
    const eventDate = getEventStartDate(event);
    const dateKey =
      eventDate < currentDate
        ? currentDate.toISOString().split('T')[0]
        : event.startStamp;

    if (!acc[dateKey]) {
      acc[dateKey] = {
        date: getDateBanner(dateKey),
        events: [],
      };
    }
    acc[dateKey].events.push(event);
    return acc;
  }, {} as Record<string, GroupedEvent>);

  // Sort events within each group by priority
  Object.keys(grouped).forEach((dateKey) => {
    const groupDate = parseLocalDate(dateKey);
    grouped[dateKey].events = sortEventsByPriority(
      grouped[dateKey].events,
      groupDate,
    );
  });

  // Return groups sorted by date
  return Object.values(grouped).sort((a, b) => {
    const dateA = new Date(
      Object.keys(grouped).find((key) => grouped[key] === a) || '',
    );
    const dateB = new Date(
      Object.keys(grouped).find((key) => grouped[key] === b) || '',
    );
    return dateA.getTime() - dateB.getTime();
  });
};

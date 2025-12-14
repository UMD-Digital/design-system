/**
 * Event Data Types
 *
 * Type definitions for event entries from the UMD Calendar API.
 *
 * @module types/data/events
 */

import { ContentEntry } from '../core';

/**
 * Event date and time information
 *
 * Comprehensive date/time data for event scheduling.
 */
export interface EventDateInfo {
  /** Day of week for event start (e.g., "Monday") */
  startDayOfWeek: string;
  /** Unix timestamp for event start */
  startStamp: string;
  /** Month abbreviation for event start (e.g., "Jan") */
  startMonth: string;
  /** Day of month for event start (e.g., "15") */
  startDay: string;
  /** Time of day for event start (e.g., "2:00 PM") */
  startTime: string;
  /** Day of week for event end */
  endDayOfWeek: string;
  /** Month abbreviation for event end */
  endMonth: string;
  /** Day of month for event end */
  endDay: string;
  /** Time of day for event end */
  endTime: string;
  /** Whether this is an all-day event */
  allDay: boolean;
}

/**
 * Event location information
 *
 * Physical or virtual location where event takes place.
 */
export interface EventLocation {
  /** Name/title of the location */
  title: string;
}

/**
 * Event entry
 *
 * Complete data structure for an event from the calendar API.
 * Extends ContentEntry with event-specific fields.
 */
export interface EventEntry extends ContentEntry, EventDateInfo {
  /** Array of locations where event takes place */
  location: EventLocation[];
  /** Event summary/description (required for events) */
  summary: string;
}

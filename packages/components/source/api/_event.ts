import { Atomic } from '@universityofmaryland/web-elements-library';
import { Attributes, Slots } from 'model';
import { Markup } from 'utilities';
import { ComponentRef } from '../_types';

/**
 * Configuration options for creating event components
 */
interface EventComponentOptions {
  /** Whether to use dark theme for event details */
  isThemeDark?: boolean;
  /** Whether to show time in event details */
  showTime?: boolean;
  /** Whether to use large size for date sign */
  isLargeSize?: boolean;
  /** Whether to use dark theme for date sign (separate from event details) */
  isDateSignDark?: boolean;
}

/**
 * Parsed event data ready for component creation
 */
interface ParsedEventData {
  /** Processed date and location data from Markup.event.createDetailsData */
  detailsData: ReturnType<typeof Markup.event.createDetailsData>;
  /** Parsed start date object */
  startDate: ReturnType<typeof Markup.event.createDate>;
  /** Parsed end date object (optional) */
  endDate: ReturnType<typeof Markup.event.createDate>;
  /** Location element (optional) */
  locationElement: Element | null;
}

/**
 * Result containing created event components
 */
interface EventComponents {
  /** Event details/meta component */
  eventMeta: ComponentRef;
  /** Date sign component */
  dateSign: ComponentRef;
}

/**
 * Raw event slot elements extracted from the host element
 */
interface EventSlots {
  startDate: Element | null;
  endDate: Element | null;
  location: Element | null;
}

/**
 * Extracts event-related slot elements from the host element
 *
 * @param element - The host HTML element containing slotted content
 * @returns Object containing the extracted slot elements
 */
const extractEventSlots = (element: HTMLElement): EventSlots => ({
  startDate: element.querySelector(`[slot="${Slots.name.DATE_START_ISO}"]`),
  endDate: element.querySelector(`[slot="${Slots.name.DATE_END_ISO}"]`),
  location: element.querySelector(`[slot="${Slots.name.contact.location}"]`),
});

/**
 * Parses event data from slot elements
 *
 * @param slots - The extracted slot elements
 * @returns Parsed event data or null if start date is missing
 */
const parseEventData = (slots: EventSlots): ParsedEventData | null => {
  const startDate = Markup.event.createDate({ element: slots.startDate });

  if (!startDate) {
    return null;
  }

  const endDate = Markup.event.createDate({ element: slots.endDate });

  const detailsData = Markup.event.createDetailsData({
    locationElement: slots.location,
    startDate,
    endDate,
  });

  return {
    detailsData,
    startDate,
    endDate,
    locationElement: slots.location,
  };
};

/**
 * Extracts event configuration from element attributes
 *
 * @param element - The host HTML element
 * @returns Configuration options for event components
 */
const extractEventConfig = (element: HTMLElement): EventComponentOptions => ({
  isThemeDark:
    Attributes.isTheme.dark({ element }) ||
    Attributes.isTheme.maryland({ element }),
  showTime: Attributes.isVisual.showTime({ element }),
});

/**
 * Creates event meta and date sign components
 *
 * @param eventData - Parsed event data
 * @param options - Configuration options for the components
 * @returns Object containing the created components
 */
export const createEventComponents = (
  eventData: ParsedEventData,
  options: EventComponentOptions = {},
): EventComponents => {
  const {
    isThemeDark = false,
    showTime = false,
    isLargeSize = false,
    isDateSignDark,
  } = options;

  return {
    eventMeta: Atomic.events.meta({
      ...eventData.detailsData,
      isThemeDark,
      showTime,
    }),
    dateSign: Atomic.events.sign({
      ...eventData.detailsData,
      isThemeDark: isDateSignDark ?? isThemeDark,
      isLargeSize,
    }),
  };
};

/**
 * Main function to extract and process event data from an element
 *
 * This is the primary API for working with event components. It:
 * 1. Extracts event slots from the element
 * 2. Parses the event data
 * 3. Creates configured event components
 *
 * @param element - The host HTML element containing event data
 * @param options - Optional configuration overrides
 * @returns Event components or null if required data is missing
 *
 * @example
 * ```typescript
 * // Basic usage - extracts everything from element
 * const eventData = extractEventData(element);
 * if (eventData) {
 *   const { eventMeta, dateSign } = eventData;
 *   // Use components...
 * }
 *
 * // With custom options
 * const eventData = extractEventData(element, {
 *   isLargeSize: true,
 *   isDateSignDark: false
 * });
 * ```
 */
export const extractEventData = (
  element: HTMLElement,
  options?: Partial<EventComponentOptions>,
): EventComponents | null => {
  const slots = extractEventSlots(element);
  const eventData = parseEventData(slots);

  if (!eventData) {
    return null;
  }

  const config = {
    ...extractEventConfig(element),
    ...options,
  };

  return createEventComponents(eventData, config);
};

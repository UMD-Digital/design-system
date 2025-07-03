import { Atomic } from '@universityofmaryland/web-elements-library';
import { Attributes, Slots } from 'model';
import { Markup } from 'utilities';

const { SlotWithDefaultStyling } = Markup.create;

interface EventDataProps {
  element: HTMLElement;
}

interface EventDataResult {
  stats: HTMLElement | null;
  image: HTMLElement | null;
  video: HTMLElement | null;
  eventDetails: HTMLElement | null;
  eventSign: HTMLElement | null;
  includedStyles: string;
}

interface EventSlots {
  startDate: Element | null;
  endDate: Element | null;
  location: Element | null;
}

/**
 * Extracts event-related slots from the element
 */
const extractEventSlots = (element: HTMLElement): EventSlots => ({
  startDate: element.querySelector(`[slot="${Slots.name.DATE_START_ISO}"]`),
  endDate: element.querySelector(`[slot="${Slots.name.DATE_END_ISO}"]`),
  location: element.querySelector(`[slot="${Slots.name.contact.location}"]`),
});

/**
 * Determines the theme state for event components
 */
const shouldUseAlternateTheme = (element: HTMLElement): boolean => {
  return (
    Attributes.isTheme.dark({ element }) ||
    Attributes.isTheme.maryland({ element })
  );
};

/**
 * Extracts the show time attribute value
 */
const getShowTimeValue = (element: HTMLElement): boolean => {
  return Attributes.isVisual.showTime({
    element,
  });
};

/**
 * Creates event components (meta and sign) from event data
 */
const createEventComponents = (
  eventData: ReturnType<typeof Markup.event.createDetailsData>,
  themeToggle: boolean,
  showTime: boolean,
) => {
  const eventMeta = Atomic.events.meta({
    ...eventData,
    isThemeDark: themeToggle,
    showTime,
  });

  const eventSign = Atomic.events.sign({
    ...eventData,
  });

  return {
    eventDetails: eventMeta.element,
    eventSign: eventSign.element,
    styles: eventMeta.styles + eventSign.styles,
  };
};

/**
 * Creates event data object from an HTML element containing event information
 *
 * This function extracts event-related data from slotted content including:
 * - Start and end dates
 * - Location information
 * - Associated media (image/video)
 * - Statistics content
 *
 * @param props - Object containing the element to extract data from
 * @returns Event data object with extracted information and generated event components
 */
export const createEventData = ({
  element,
}: EventDataProps): EventDataResult => {
  const slots = extractEventSlots(element);
  const startDate = Markup.event.createDate({ element: slots.startDate });
  const endDate = Markup.event.createDate({ element: slots.endDate });

  const result: EventDataResult = {
    stats: SlotWithDefaultStyling({ element, slotRef: Slots.name.STATS }),
    image: Markup.validate.ImageSlot({
      element,
      ImageSlot: Slots.name.assets.image,
    }),
    video: Slots.assets.video({ element }),
    eventDetails: null,
    eventSign: null,
    includedStyles: '',
  };

  // Only create event components if we have a valid start date
  if (startDate) {
    const eventData = Markup.event.createDetailsData({
      locationElement: slots.location,
      startDate,
      endDate,
    });

    const themeToggle = shouldUseAlternateTheme(element);
    const showTime = getShowTimeValue(element);

    const components = createEventComponents(eventData, themeToggle, showTime);

    result.eventDetails = components.eventDetails;
    result.eventSign = components.eventSign;
    result.includedStyles = components.styles;
  }

  return result;
};

/**
 * Events Display Strategy
 *
 * Strategy for displaying event entries as cards.
 * Maps event data to card elements with event-specific metadata.
 *
 * @module strategies/display/events
 */

import { card } from '@universityofmaryland/web-elements-library/composite';
import { events as eventElements } from '@universityofmaryland/web-elements-library/atomic';
import {
  createTextWithLink,
  createTextContainer,
  createImageOrLinkedImage,
} from '@universityofmaryland/web-utilities-library/elements';
import { DisplayStrategy, CardMappingOptions } from '../../factory/core/types';
import { ElementModel } from '../../_types';

/**
 * Event entry type
 */
export interface EventType {
  id: number | string;
  title: string;
  url: string;
  summary: string;
  image: Array<{ url: string; altText?: string }>;
  startMonth: string;
  startDay: string;
  endMonth?: string;
  endDay?: string;
  startStamp: string;
  // Fields required for eventMeta
  startDayOfWeek?: string;
  startTime?: string;
  endDayOfWeek?: string;
  endTime?: string;
  location?: Array<{ title: string }>;
  allDay?: boolean;
}

/**
 * Events display strategy
 *
 * Maps event entries to card elements with event metadata.
 * Supports both block and list card layouts.
 *
 * @example
 * ```typescript
 * const feed = createBaseFeed({
 *   displayStrategy: eventsDisplayStrategy,
 *   imageConfig: (entry) => ({
 *     imageUrl: entry.image[0].url,
 *     altText: entry.image[0].altText || 'Event Image',
 *     linkUrl: entry.url,
 *   }),
 *   // ...
 * });
 * ```
 */
export const eventsDisplayStrategy: DisplayStrategy<EventType> = {
  layoutType: 'grid',

  mapEntryToCard: (
    entry: EventType,
    options: CardMappingOptions,
  ): ElementModel => {
    const {
      isThemeDark = false,
      isTransparent = false,
      isAligned = false,
      imageConfig,
      cardType = 'block',
    } = options;

    // Create headline
    const headline = createTextWithLink({
      text: entry.title,
      url: entry.url,
    });

    // Create summary text
    const text = createTextContainer({
      text: entry.summary,
      allowHTML: true,
    });

    // Create event metadata
    // Pass all entry data to events.meta() - it will handle missing fields gracefully
    const eventMeta = eventElements.meta({
      ...entry,
      isThemeDark,
    } as any);

    // Create image (if imageConfig provided)
    const image = imageConfig
      ? createImageOrLinkedImage(imageConfig(entry))
      : undefined;

    // Create date sign for list layout
    const dateSign =
      cardType === 'list'
        ? eventElements.sign({
            startMonth: entry.startMonth,
            startDay: entry.startDay,
            endMonth: entry.endMonth,
            endDay: entry.endDay,
            isThemeDark,
            isLargeSize: true,
          })
        : undefined;

    // Create card based on type
    if (cardType === 'list') {
      return card.list({
        headline,
        text,
        eventMeta,
        dateSign,
        image,
        isAligned,
        isThemeDark,
      });
    }

    // Default to block card
    return card.block({
      headline,
      text,
      eventMeta,
      image,
      isAligned,
      isTransparent,
      isThemeDark,
    });
  },
};

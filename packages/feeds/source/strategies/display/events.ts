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
import { isExternalUrl } from '@universityofmaryland/web-utilities-library/network';
import { DisplayStrategy, CardMappingOptions } from '../../factory/core/types';
import { ElementModel } from '../../_types';
import { EventEntry } from 'types/data';

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
 *   imageConfig: (entry) => {
 *     const imageUrl = entry.image?.[0]?.url;
 *     const altText = entry.image?.[0]?.altText;
 *
 *     if (!imageUrl || !altText) return null;
 *
 *     return {
 *       imageUrl: imageUrl,
 *       altText: altText,
 *       linkUrl: entry.url,
 *     };
 *   },
 *   // ...
 * });
 * ```
 */
export const eventsDisplayStrategy: DisplayStrategy<EventEntry> = {
  layoutType: 'grid',

  mapEntryToCard: (
    entry: EventEntry,
    options: CardMappingOptions,
  ): ElementModel => {
    const {
      isThemeDark = false,
      isTransparent = false,
      isAligned = false,
      imageConfig,
      cardType = 'block',
    } = options;

    const openInNewTab = isExternalUrl(entry.url);

    const headline = createTextWithLink({
      text: entry.title,
      url: entry.url,
      openInNewTab,
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
    const imageData = imageConfig ? imageConfig(entry) : null;
    const image =
      imageData && imageData.imageUrl && imageData.altText
        ? createImageOrLinkedImage({ ...imageData, openInNewTab })
        : null;

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

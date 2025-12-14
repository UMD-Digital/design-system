/**
 * News Display Strategy
 *
 * Strategy for displaying news article entries as cards.
 * Maps news data to card elements with date information.
 *
 * @module strategies/display/news
 */

import { card } from '@universityofmaryland/web-elements-library/composite';
import {
  createTextWithLink,
  createTextContainer,
  createTimeElement,
  createImageOrLinkedImage,
} from '@universityofmaryland/web-utilities-library/elements';
import { DisplayStrategy, CardMappingOptions } from '../../factory/core/types';
import { ElementModel } from '../../_types';
import { NewsEntry } from 'types/data';

/**
 * News display strategy
 *
 * Maps news article entries to card elements with date metadata.
 * Supports block, overlay, and list card layouts.
 *
 * @example
 * ```typescript
 * const feed = createBaseFeed({
 *   displayStrategy: newsDisplayStrategy,
 *   imageConfig: (entry) => ({
 *     imageUrl: entry.image[0].url,
 *     altText: entry.image[0].altText || 'News Article Image',
 *     linkUrl: entry.url,
 *   }),
 *   // ...
 * });
 * ```
 */
export const newsDisplayStrategy: DisplayStrategy<NewsEntry> = {
  layoutType: 'grid',

  mapEntryToCard: (
    entry: NewsEntry,
    options: CardMappingOptions
  ): ElementModel => {
    const {
      isThemeDark = false,
      isTransparent = false,
      isAligned = true,
      imageConfig,
      isOverlay = false,
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
    });

    // Create date element
    const date = createTimeElement({
      datetime: entry.date,
      displayText: entry.dateFormatted,
    });

    // Common card properties
    const commonProps = {
      newsId: entry.id.toString(),
      headline,
      text,
      date,
      isThemeDark,
    };

    // Handle overlay card type
    if (isOverlay && imageConfig) {
      const backgroundImage = createImageOrLinkedImage(imageConfig(entry));
      return card.overlay.image({
        ...commonProps,
        backgroundImage,
      });
    }

    // Create image (if imageConfig provided)
    const image = imageConfig
      ? createImageOrLinkedImage(imageConfig(entry))
      : undefined;

    // Handle list card type
    if (cardType === 'list') {
      return card.list({
        ...commonProps,
        image,
        isAligned: false,
      });
    }

    // Default to block card
    return card.block({
      ...commonProps,
      image,
      isAligned,
      isTransparent,
    });
  },
};

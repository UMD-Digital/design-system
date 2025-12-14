/**
 * Experts Display Strategy
 *
 * Strategy for displaying expert entries as cards.
 * Maps expert data to card elements with expertise information.
 *
 * @module strategies/display/experts
 */

import { card } from '@universityofmaryland/web-elements-library/composite';
import {
  createTextWithLink,
  createTextContainer,
  createImageOrLinkedImage,
} from '@universityofmaryland/web-utilities-library/elements';
import { DisplayStrategy, CardMappingOptions } from '../../factory/core/types';
import { ElementModel } from '../../_types';

/**
 * Expert entry type
 */
export interface ExpertType {
  id: number | string;
  name: string;
  url: string;
  title?: string;
  department?: string;
  expertise: string;
  image: Array<{ url: string; altText?: string }>;
}

/**
 * Experts display strategy
 *
 * Maps expert entries to card elements with expertise metadata.
 * Optimized for displaying faculty and expert profiles.
 *
 * @example
 * ```typescript
 * const feed = createBaseFeed({
 *   displayStrategy: expertsDisplayStrategy,
 *   imageConfig: (entry) => ({
 *     imageUrl: entry.image[0].url,
 *     altText: entry.image[0].altText || entry.name,
 *     linkUrl: entry.url,
 *   }),
 *   // ...
 * });
 * ```
 */
export const expertsDisplayStrategy: DisplayStrategy<ExpertType> = {
  layoutType: 'grid',

  mapEntryToCard: (
    entry: ExpertType,
    options: CardMappingOptions
  ): ElementModel => {
    const {
      isThemeDark = false,
      isTransparent = false,
      isAligned = true,
      imageConfig,
    } = options;

    // Create headline (expert name)
    const headline = createTextWithLink({
      text: entry.name,
      url: entry.url,
    });

    // Create subtitle (title and department)
    const subtitle = entry.title
      ? createTextContainer({
          text: entry.department
            ? `${entry.title}, ${entry.department}`
            : entry.title,
        })
      : entry.department
      ? createTextContainer({ text: entry.department })
      : undefined;

    // Create expertise text
    const text = createTextContainer({
      text: entry.expertise,
    });

    // Create image (if imageConfig provided)
    const image = imageConfig
      ? createImageOrLinkedImage(imageConfig(entry))
      : undefined;

    // Create card
    return card.block({
      headline,
      eyebrow: subtitle,
      text,
      image,
      isAligned,
      isTransparent,
      isThemeDark,
    });
  },
};

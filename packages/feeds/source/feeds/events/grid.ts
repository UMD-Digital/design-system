/**
 * Events Grid Feed (Factory Pattern)
 *
 * Grid layout for event entries using the feed factory pattern.
 * This is the NEW implementation using factory + strategies.
 *
 * @module composite/events/grid-new
 */

import { createBaseFeed } from 'factory';
import {
  eventsFetchStrategy,
  eventsDisplayStrategy,
  gridGapLayout,
} from 'strategies';
import { type BlockProps } from './_types';
import { type ElementModel } from '../../_types';

/**
 * Create an events grid feed
 *
 * @param props - Feed configuration
 * @returns ElementModel with feed element and styles
 *
 * @example
 * ```typescript
 * const feed = eventsGrid({
 *   token: 'my-token',
 *   numberOfColumnsToShow: 3,
 *   numberOfRowsToStart: 2,
 *   isLazyLoad: true,
 *   categories: ['sports', 'arts'],
 * });
 *
 * document.body.appendChild(feed.element);
 * ```
 */
export const eventsGrid = (props: BlockProps): ElementModel =>
  createBaseFeed({
    ...props,
    enableCategoryFallback: true,
    fetchStrategy: eventsFetchStrategy,
    displayStrategy: eventsDisplayStrategy,
    layoutStrategy: gridGapLayout,
    imageConfig: (entry) => ({
      imageUrl: entry.image[0].url,
      altText: entry.image[0].altText || 'Event Image',
      linkUrl: entry.url,
      linkLabel: 'University of Maryland Event',
    }),
  });

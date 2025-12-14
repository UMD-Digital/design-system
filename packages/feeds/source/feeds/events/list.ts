/**
 * Events List Feed (Factory Pattern)
 *
 * List layout for event entries using the feed factory pattern.
 * This is the NEW implementation using factory + strategies.
 *
 * @module composite/events/list-new
 */

import { createBaseFeed } from 'factory';
import {
  eventsFetchStrategy,
  eventsDisplayStrategy,
  stackedLayout,
} from 'strategies';
import { type ListProps } from './_types';
import { type ElementModel } from '../../_types';

/**
 * Create an events list feed
 *
 * @param props - Feed configuration
 * @returns ElementModel with feed element and styles
 *
 * @example
 * ```typescript
 * const feed = eventsList({
 *   token: 'my-token',
 *   numberOfRowsToStart: 5,
 *   isLazyLoad: true,
 *   categories: ['sports', 'arts'],
 * });
 *
 * document.body.appendChild(feed.element);
 * ```
 */
export default (props: ListProps): ElementModel =>
  createBaseFeed({
    ...props,
    cardType: 'list',
    fetchStrategy: eventsFetchStrategy,
    displayStrategy: eventsDisplayStrategy,
    layoutStrategy: stackedLayout,
    imageConfig: (entry) => ({
      imageUrl: entry.image[0].url,
      altText: entry.image[0].altText || 'Event Image',
      linkUrl: entry.url,
      linkLabel: 'University of Maryland Event',
    }),
  });

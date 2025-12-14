/**
 * News List Feed (Factory Pattern)
 *
 * List layout for news article entries using the feed factory pattern.
 * This is the NEW implementation using factory + strategies.
 *
 * @module composite/news/list-new
 */

import { createBaseFeed } from 'factory';
import {
  newsFetchStrategy,
  newsDisplayStrategy,
  stackedLayout,
} from 'strategies';
import { type ListProps } from './_types';
import { type ElementModel } from '../../_types';

/**
 * Create a news list feed
 *
 * @param props - Feed configuration
 * @returns ElementModel with feed element and styles
 *
 * @example
 * ```typescript
 * const feed = newsList({
 *   token: 'my-token',
 *   numberOfRowsToStart: 5,
 *   isLazyLoad: true,
 *   categories: ['research', 'campus-life'],
 * });
 *
 * document.body.appendChild(feed.element);
 * ```
 */
export default (props: ListProps): ElementModel =>
  createBaseFeed({
    ...props,

    // Use list card type for news
    cardType: 'list',
    // News list uses non-aligned cards
    isAligned: false,

    // Use news fetch strategy
    fetchStrategy: newsFetchStrategy,

    // Use news display strategy
    displayStrategy: newsDisplayStrategy,

    // Use stacked layout for list view
    layoutStrategy: stackedLayout,

    // Configure images
    imageConfig: (entry) => ({
      imageUrl: entry.image[0].url,
      altText: entry.image[0].altText || 'News Article Image',
      linkUrl: entry.url,
      linkLabel: 'Maryland Today Article with image',
    }),
  });

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
export const newsList = (props: ListProps): ElementModel =>
  createBaseFeed({
    ...props,
    cardType: 'list',
    isAligned: false,
    fetchStrategy: newsFetchStrategy,
    displayStrategy: newsDisplayStrategy,
    layoutStrategy: stackedLayout,
    imageConfig: (entry) => {
      const imageUrl = entry.image?.[0]?.url;
      const altText = entry.image?.[0]?.altText;

      if (!imageUrl || !altText) {
        return null;
      }

      return {
        imageUrl: imageUrl,
        altText: altText,
        linkUrl: entry.url,
        linkLabel: 'Maryland Today Article with image',
      };
    },
  });

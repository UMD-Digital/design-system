/**
 * News Grid Feed (Factory Pattern)
 *
 * Grid layout for news article entries using the feed factory pattern.
 * This is the NEW implementation using factory + strategies.
 *
 * @module composite/news/grid-new
 */

import { createBaseFeed } from 'factory';
import {
  newsFetchStrategy,
  newsDisplayStrategy,
  gridLayout,
  gridGapLayout,
} from 'strategies';
import { type BlockProps } from './_types';
import { type ElementModel } from '../../_types';

/**
 * Create a news grid feed
 *
 * @param props - Feed configuration
 * @returns ElementModel with feed element and styles
 *
 * @example
 * ```typescript
 * // Standard grid with gap
 * const feed = newsGrid({
 *   token: 'my-token',
 *   numberOfColumnsToShow: 3,
 *   numberOfRowsToStart: 2,
 *   isLazyLoad: true,
 * });
 *
 * // Overlay grid
 * const overlayFeed = newsGrid({
 *   token: 'my-token',
 *   numberOfColumnsToShow: 3,
 *   numberOfRowsToStart: 2,
 *   isTypeOverlay: true,
 * });
 *
 * document.body.appendChild(feed.element);
 * ```
 */
export default (props: BlockProps): ElementModel => {
  const { isTypeOverlay = false } = props;

  return createBaseFeed({
    ...props,

    // Use overlay mode if requested
    isOverlay: isTypeOverlay,
    // News grid uses aligned cards for block style
    isAligned: !isTypeOverlay,

    // Use news fetch strategy
    fetchStrategy: newsFetchStrategy,

    // Use news display strategy
    displayStrategy: newsDisplayStrategy,

    // Use grid layout for overlay, gridGap for standard
    layoutStrategy: isTypeOverlay ? gridLayout : gridGapLayout,

    // Configure images
    imageConfig: (entry) => ({
      imageUrl: entry.image[0].url,
      altText: entry.image[0].altText || 'News Article Image',
      linkUrl: entry.url,
      linkLabel: 'Maryland Today Article with image',
    }),
  });
};

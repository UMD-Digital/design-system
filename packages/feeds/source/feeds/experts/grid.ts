/**
 * Experts Grid Feed (Factory Pattern)
 *
 * Grid layout for expert profile entries using the feed factory pattern.
 * Uses person elements for displaying expert profiles in a multi-column grid.
 * Supports overlay cards with gridLayout or standard cards with gridGapLayout.
 *
 * @module feeds/experts/grid
 */

import { createBaseFeed } from 'factory';
import {
  expertsFetchStrategy,
  expertsDisplayStrategy,
  gridLayout,
  gridBorderLayout,
} from 'strategies';
import { type GridProps } from './_types';
import { type ElementModel } from '../../_types';

/**
 * Create an experts grid feed
 *
 * @param props - Feed configuration
 * @returns ElementModel with feed element and styles
 *
 * @example
 * ```typescript
 * // Standard grid with borders
 * const feed = expertsGrid({
 *   token: 'my-token',
 *   numberOfColumnsToShow: 3,
 *   numberOfRowsToStart: 2,
 *   isLazyLoad: true,
 *   categories: ['computer-science', 'engineering'],
 * });
 *
 * // Overlay grid
 * const overlayFeed = expertsGrid({
 *   token: 'my-token',
 *   numberOfColumnsToShow: 4,
 *   numberOfRowsToStart: 2,
 *   isOverlay: true,
 * });
 *
 * document.body.appendChild(feed.element);
 * ```
 */
export default (props: GridProps): ElementModel => {
  const { isOverlay = false } = props;

  return createBaseFeed({
    ...props,
    isOverlay,
    isAligned: !isOverlay,
    fetchStrategy: expertsFetchStrategy,
    displayStrategy: expertsDisplayStrategy,
    layoutStrategy: isOverlay ? gridLayout : gridBorderLayout,
    imageConfig: (entry) => ({
      imageUrl: entry.headshot?.[0]?.url || '',
      altText: entry.middleName
        ? `${entry.firstName} ${entry.middleName} ${entry.lastName}`
        : `${entry.firstName} ${entry.lastName}`,
      linkUrl: `https://umdrightnow.umd.edu/expert/${entry.slug}`,
      linkLabel: `View profile for ${entry.firstName} ${entry.lastName}`,
    }),
  });
};

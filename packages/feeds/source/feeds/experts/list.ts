/**
 * Experts List Feed (Factory Pattern)
 *
 * List layout for expert profile entries using the feed factory pattern.
 * Uses person elements for displaying expert profiles.
 *
 * @module feeds/experts/list
 */

import { createBaseFeed } from 'factory';
import {
  expertsFetchStrategy,
  expertsDisplayStrategy,
  stackedLayout,
} from 'strategies';
import { type ListProps } from './_types';
import { type ElementModel } from '../../_types';

/**
 * Create an experts list feed
 *
 * @param props - Feed configuration
 * @returns ElementModel with feed element and styles
 *
 * @example
 * ```typescript
 * const feed = expertsList({
 *   token: 'my-token',
 *   numberOfRowsToStart: 10,
 *   isLazyLoad: true,
 *   categories: ['computer-science', 'engineering'],
 * });
 *
 * document.body.appendChild(feed.element);
 * ```
 */
export default (props: ListProps): ElementModel =>
  createBaseFeed({
    ...props,
    cardType: 'list',
    fetchStrategy: expertsFetchStrategy,
    displayStrategy: expertsDisplayStrategy,
    layoutStrategy: stackedLayout,
  });

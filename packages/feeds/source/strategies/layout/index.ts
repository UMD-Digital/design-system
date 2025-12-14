/**
 * Layout Strategies
 *
 * Strategies for creating feed layout containers.
 * Each strategy defines how to arrange feed entries.
 *
 * @module strategies/layout
 */

export {
  gridLayout,
  gridGapLayout,
  stackedLayout,
  gridOffsetLayout,
} from './grid';

export { createFeaturedLayoutStrategy } from './featured';
export type { FeaturedLayoutConfig } from './featured';

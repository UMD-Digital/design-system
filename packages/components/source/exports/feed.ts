/**
 * Feed Components Bundle
 *
 * Components for displaying dynamic content feeds and data-driven displays.
 * These components typically load content from external sources or display collections.
 */

export * as feed from '../api/feed';
export * as slider from '../api/slider';

// Also export the registration function for all feed components
import { feed, slider } from '../api';
import { loadComponentClass, ComponentMap } from './loader';

const feedComponents: ComponentMap = {
  feed,
  slider,
};

export const LoadFeedComponents = () => {
  loadComponentClass(feedComponents);
};

export default LoadFeedComponents;

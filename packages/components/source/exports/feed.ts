/**
 * Feed Components Bundle
 *
 * Components for displaying dynamic content feeds and data-driven displays.
 * These components typically load content from external sources or display collections.
 */

import { alert, feed, slider } from '../api';
import { loadComponentClass, ComponentMap } from './loader';

export const feedComponents: ComponentMap = {
  alert,
  feed,
  slider,
};

export const LoadFeedComponents = () => {
  loadComponentClass(feedComponents);
};

export default LoadFeedComponents;

/**
 * Feed Components Bundle
 *
 * Components for displaying dynamic content feeds and data-driven displays.
 * These components typically load content from external sources or display collections.
 */

import * as alert from '../web-components/alert';
import * as feed from '../web-components/feed';
import * as slider from '../web-components/slider';
import { loadComponentClass, ComponentMap } from './loader';

export const feedComponents: ComponentMap = {
  alert,
  feed,
  slider,
};

export const LoadFeedComponents = () => {
  loadComponentClass(feedComponents);
};

export { alert, feed, slider };

/**
 * Interactive Components Bundle
 *
 * Components that provide user interaction including accordions, carousels, tabs, etc.
 * These components add interactivity and dynamic behavior to the page.
 */

export * as accordion from '../api/accordion';
export * as carousel from '../api/carousel';
export * as social from '../api/social';
export * as tab from '../api/tab';

import { accordion, carousel, social, tab } from '../api';
import { loadComponentClass, ComponentMap } from './loader';

export const interactiveComponents: ComponentMap = {
  accordion,
  carousel,
  social,
  tab,
};

export const LoadInteractiveComponents = () => {
  loadComponentClass(interactiveComponents);
};

export default LoadInteractiveComponents;

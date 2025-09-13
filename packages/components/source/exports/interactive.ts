/**
 * Interactive Components Bundle
 *
 * Components that provide user interaction including accordions, carousels, tabs, etc.
 * These components add interactivity and dynamic behavior to the page.
 */

import { accordion, carousel, footer, social, tab } from '../api';
import { loadComponentClass, ComponentMap } from './loader';

export const interactiveComponents: ComponentMap = {
  accordion,
  carousel,
  footer,
  social,
  tab,
};

export const LoadInteractiveComponents = () => {
  loadComponentClass(interactiveComponents);
};

export default LoadInteractiveComponents;

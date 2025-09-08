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
export * as actions from '../api/actions';
export * as alert from '../api/alert';

// Also export the registration function for all interactive components
import { accordion, carousel, social, tab, actions, alert } from '../api';
import { loadComponentClass, ComponentMap } from './loader';

const interactiveComponents: ComponentMap = {
  accordion,
  carousel,
  social,
  tab,
  actions,
  alert,
};

export const LoadInteractiveComponents = () => {
  loadComponentClass(interactiveComponents);
};

export default LoadInteractiveComponents;
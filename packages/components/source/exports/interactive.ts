/**
 * Interactive Components Bundle
 *
 * Components that provide user interaction including accordions, carousels, tabs, etc.
 * These components add interactivity and dynamic behavior to the page.
 */

import * as accordion from '../web-components/accordion';
import * as carousel from '../web-components/carousel';
import * as footer from '../web-components/footer';
import * as social from '../web-components/social';
import * as tab from '../web-components/tab';
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

export { accordion, carousel, footer, social, tab };

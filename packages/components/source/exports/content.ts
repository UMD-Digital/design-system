/**
 * Content Components Bundle
 *
 * Components for displaying various types of content including cards, media, text, etc.
 * These are the most commonly used components for presenting information.
 *
 * This bundle includes all components that are not categorized as:
 * - Feed components (dynamic content feeds)
 * - Interactive components (user interaction)
 * - Structural components (page structure/layout)
 */

import * as brand from '../web-components/brand';
import * as card from '../web-components/card';
import * as layout from '../web-components/layout';
import * as media from '../web-components/media';
import * as person from '../web-components/person';
import * as quote from '../web-components/quote';
import * as stat from '../web-components/stat';
import * as text from '../web-components/text';
import { loadComponentClass, ComponentMap } from './loader';

export const contentComponents: ComponentMap = {
  brand,
  card,
  layout,
  media,
  person,
  quote,
  stat,
  text,
};

export const LoadContentComponents = () => {
  loadComponentClass(contentComponents);
};

export { brand, card, layout, media, person, quote, stat, text };

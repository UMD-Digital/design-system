/**
 * Content Components Bundle
 * 
 * Components for displaying various types of content including cards, media, text, etc.
 * These are the most commonly used components for presenting information.
 */

export * as card from '../api/card';
export * as media from '../api/media';
export * as text from '../api/text';
export * as quote from '../api/quote';
export * as person from '../api/person';
export * as stat from '../api/stat';
export * as pathway from '../api/pathway';
export * as brand from '../api/brand';

// Also export the registration function for all content components
import { card, media, text, quote, person, stat, pathway, brand } from '../api';
import { loadComponentClass, ComponentMap } from './loader';

const contentComponents: ComponentMap = {
  card,
  media,
  text,
  quote,
  person,
  stat,
  pathway,
  brand,
};

export const LoadContentComponents = () => {
  loadComponentClass(contentComponents);
};

export default LoadContentComponents;
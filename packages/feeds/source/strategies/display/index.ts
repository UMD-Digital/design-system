/**
 * Display Strategies
 *
 * Strategies for mapping feed entries to card elements.
 * Each strategy defines how to display a specific type of content.
 *
 * @module strategies/display
 */

export { eventsDisplayStrategy } from './events';
export { newsDisplayStrategy } from './news';
export { expertsDisplayStrategy } from './experts';

// Export centralized types (from types/data)
export type { EventEntry, NewsEntry, ExpertEntry } from 'types/data';

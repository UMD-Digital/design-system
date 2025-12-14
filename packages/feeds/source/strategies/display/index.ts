/**
 * Display Strategies
 *
 * Strategies for mapping feed entries to card elements.
 * Each strategy defines how to display a specific type of content.
 *
 * @module strategies/display
 */

export { eventsDisplayStrategy } from './events';
export type { EventType } from './events';

export { newsDisplayStrategy } from './news';
export type { NewsEntryType } from './news';

export { expertsDisplayStrategy } from './experts';
export type { ExpertType } from './experts';

/**
 * Component Registration Functions
 *
 * All web component registration functions organized by category.
 * Each function must be called to register its component with the browser.
 *
 * @example
 * ```typescript
 * import { accordion, card, hero } from '@universityofmaryland/web-components-library/components';
 *
 * // Register specific components
 * accordion.item();
 * card.standard();
 * hero.base();
 * ```
 */

// Barrel exports for all component modules
export * as accordion from './api/accordion';
export * as actions from './api/actions';
export * as alert from './api/alert';
export * as brand from './api/brand';
export * as card from './api/card';
export * as carousel from './api/carousel';
export * as feed from './api/feed';
export * as footer from './api/footer';
export * as hero from './api/hero';
export * as layout from './api/layout';
export * as media from './api/media';
export * as navigation from './api/navigation';
export * as pathway from './api/pathway';
export * as person from './api/person';
export * as quote from './api/quote';
export * as social from './api/social';
export * as stat from './api/stat';
export * as slider from './api/slider';
export * as tab from './api/tab';
export * as text from './api/text';

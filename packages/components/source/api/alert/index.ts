/**
 * @module Alert
 * @category Components
 * Alert and banner components for displaying important messages and promotions
 */

/**
 * Page-level alert component with theme and icon options
 * @see {@link page} for the page alert implementation
 */
export { default as page } from './page';

/**
 * Promotional banner component with optional university seal
 * @see {@link promo} for the promo banner implementation
 */
export { default as promo } from './promo';

/**
 * Site-wide alert component with dismissal memory
 * @see {@link site} for the site alert implementation
 */
export { default as site } from './site';

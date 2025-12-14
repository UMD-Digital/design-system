/**
 * Creates a grid layout component for displaying events.
 *
 * @param {BlockProps} props - Configuration options for the grid, including token, categories, row count, lazy load options and theme preference.
 * @returns {ElementModel} An object containing the grid element, associated events, and styles.
 * @example
 * ```typescript
 * import * as Feeds from '@universityofmaryland/web-feeds-library';
 * const grid = Feeds.events.grid({
 *   token: 'your-token',
 *   numberOfColumnsToShow: 2
 * });
 * document.querySelector('.container').appendChild(grid.element);
 * ```
 * @since 1.9.0
 */
export { default as grid } from './grid';

/**
 * Creates a list layout component for displaying events.
 *
 * @param {EventSliderProps} props - Configuration options for the slider, including token, categories, and theme preference.
 * @returns {ElementModel} An object containing the list element, associated events, and styles.
 * @example
 * ```typescript
 * import * as Feeds from '@universityofmaryland/web-feeds-library';
 * const list = Feeds.events.list({
 *   token: 'your-token',
 *   isTransparent: true
 * });
 * document.querySelector('.container').appendChild(list.element);
 * ```
 * @since 1.9.0
 */
export { default as list } from './list';

/**
 * Creates a slider component for displaying calendar events.
 *
 * @param {ListProps} props - Configuration options for the list, including token, categories, row count, lazy load options and theme preference.
 * @returns {ElementModel} An object containing the slider element, associated events, and styles.
 * @example
 * ```typescript
 * import * as Feeds from '@universityofmaryland/web-feeds-library';
 * const slider = Feeds.events.slider({
 *   token: 'your-token'
 * });
 * document.querySelector('.container').appendChild(slider.element);
 * ```
 * @since 1.9.0
 */
export { default as slider } from './slider';

/**
 * Creates a grouped layout component for displaying events organized by date.
 *
 * @param {ListProps} props - Configuration options for the grouped layout, including token, categories, row count, lazy load options and theme preference.
 * @returns {ElementModel} An object containing the grouped element, associated events, and styles.
 * @example
 * ```typescript
 * import * as Feeds from '@universityofmaryland/web-feeds-library';
 * const grouped = Feeds.events.grouped({
 *   token: 'your-token',
 *   numberOfRowsToStart: 10
 * });
 * document.querySelector('.container').appendChild(grouped.element);
 * ```
 * @since 1.13.0
 */
export { default as grouped } from './grouped';

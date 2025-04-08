/**
 * Creates a grid layout component for displaying events.
 * @param {Object} props - Configuration options
 * @param {string} props.token - API token for authentication
 * @param {number} [props.numberOfColumnsToShow=3] - Number of columns in the grid
 * @param {boolean} [props.isThemeDark] - Whether to use dark theme styling
 * @param {boolean} [props.isTransparent] - Whether cards should have transparent background
 * @returns {Object} Grid component with element, styles and event handlers
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
 * @param {Object} props - Configuration options
 * @param {string} props.token - API token for authentication
 * @param {boolean} [props.isThemeDark] - Whether to use dark theme styling
 * @param {boolean} [props.isTransparent] - Whether cards should have transparent background
 * @returns {Object} List component with element, styles and event handlers
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
 * Creates a slider component for displaying events.
 * @param {Object} props - Configuration options
 * @param {string} props.token - API token for authentication
 * @param {boolean} [props.isThemeDark] - Whether to use dark theme styling
 * @returns {Object} Slider component with element, styles and event handlers
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
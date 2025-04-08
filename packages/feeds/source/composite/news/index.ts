/**
 * Creates a featured news layout with a prominent featured article and supporting articles.
 * @param {Object} props - Configuration options
 * @param {string} props.token - API token for authentication
 * @param {boolean} [props.isThemeDark] - Whether to use dark theme styling
 * @param {boolean} [props.isLazyLoad] - Whether to enable lazy loading of additional content
 * @param {boolean} [props.isLayoutReversed] - Whether to reverse the layout order
 * @param {boolean} [props.isTransparent] - Whether cards should have transparent background
 * @param {number} [props.overwriteStickyPosition] - Custom sticky position value
 * @returns {Object} Featured component with element, styles and event handlers
 * @example
 * ```typescript
 * import * as Feeds from '@universityofmaryland/web-feeds-library';
 * const featured = Feeds.news.featured({ 
 *   token: 'your-token',
 *   isLazyLoad: true
 * });
 * document.querySelector('.container').appendChild(featured.element);
 * ```
 * @since 1.9.0
 */
export { default as featured } from './featured';

/**
 * Creates a grid layout component for displaying news articles.
 * @param {Object} props - Configuration options
 * @param {string} props.token - API token for authentication
 * @param {number} [props.numberOfColumnsToShow=3] - Number of columns in the grid
 * @param {boolean} [props.isThemeDark] - Whether to use dark theme styling
 * @param {boolean} [props.isTransparent] - Whether cards should have transparent background
 * @returns {Object} Grid component with element, styles and event handlers
 * @example
 * ```typescript
 * import * as Feeds from '@universityofmaryland/web-feeds-library';
 * const grid = Feeds.news.grid({ 
 *   token: 'your-token',
 *   numberOfColumnsToShow: 2
 * });
 * document.querySelector('.container').appendChild(grid.element);
 * ```
 * @since 1.9.0
 */
export { default as grid } from './grid';

/**
 * Creates a list layout component for displaying news articles.
 * @param {Object} props - Configuration options
 * @param {string} props.token - API token for authentication
 * @param {boolean} [props.isThemeDark] - Whether to use dark theme styling
 * @param {boolean} [props.isTransparent] - Whether cards should have transparent background
 * @returns {Object} List component with element, styles and event handlers
 * @example
 * ```typescript
 * import * as Feeds from '@universityofmaryland/web-feeds-library';
 * const list = Feeds.news.list({ 
 *   token: 'your-token',
 *   isTransparent: true
 * });
 * document.querySelector('.container').appendChild(list.element);
 * ```
 * @since 1.9.0
 */
export { default as list } from './list';
/**
 * Creates a list layout component for displaying expert profiles.
 * @param {Object} props - Configuration options
 * @param {string} props.token - API token for authentication
 * @param {number} props.numberOfRowsToStart - Number of rows to display initially
 * @param {boolean} props.isLazyLoad - Enable lazy loading with "Load more" button
 * @param {string[]} [props.categories] - Category IDs to filter by (areas of expertise, campus units, etc.)
 * @param {boolean} [props.isThemeDark] - Whether to use dark theme styling
 * @param {string[]} [props.entriesToRemove] - IDs of entries to exclude from results
 * @returns {Object} List component with element, styles and event handlers
 * @example
 * ```typescript
 * import * as Feeds from '@universityofmaryland/web-feeds-library';
 * const list = Feeds.experts.list({
 *   token: 'your-token',
 *   numberOfRowsToStart: 10,
 *   isLazyLoad: true,
 *   categories: ['computer-science', 'engineering']
 * });
 * document.querySelector('.container').appendChild(list.element);
 * ```
 * @since 1.17.0
 */
export { default as list } from './list';

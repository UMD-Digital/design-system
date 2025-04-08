/**
 * Creates a slider component for displaying academic events.
 * @param {Object} props - Configuration options
 * @param {string} props.token - API token for authentication
 * @param {string|null} [props.categories] - Optional categories to filter events
 * @param {boolean} [props.isThemeDark] - Whether to use dark theme styling
 * @returns {Object} Slider component with element and styles
 * @example
 * ```typescript
 * import * as Feeds from '@universityofmaryland/web-feeds-library';
 * const slider = Feeds.academic.slider({ 
 *   token: 'your-token',
 *   isThemeDark: true
 * });
 * document.querySelector('.container').appendChild(slider.element);
 * ```
 * @since 1.9.0
 */
export { default as slider } from './slider';
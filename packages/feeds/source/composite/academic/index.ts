import { type ElementModel } from '../../_types';
import { type AcademicSliderProps } from './_types';

/**
 * Creates a slider component for displaying academic events.
 *
 * @param {AcademicSliderProps} props - Configuration options for the slider, including token, categories, and theme preference.
 * @returns {ElementModel} An object containing the slider element, associated events, and styles.
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

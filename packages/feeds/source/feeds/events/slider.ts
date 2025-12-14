/**
 * Events Slider Feed (Migrated)
 *
 * Displays events in a horizontal carousel layout.
 * Uses strategy pattern for GraphQL queries.
 *
 * @module composite/events/slider-new
 */

import { slider } from '../../widgets';
import { EVENTS_SLIDER_QUERY } from '../../strategies/fetch/events';
import { type SliderProps } from './_types';
import { type ElementModel } from '../../_types';

/**
 * Creates an events slider feed
 *
 * @param props - Slider configuration options
 * @returns ElementModel with slider element and styles
 *
 * @example
 * ```typescript
 * const eventsSlider = slider({
 *   token: 'your-token',
 *   categories: 'sports,arts',
 *   isThemeDark: false,
 * });
 * ```
 */
export default (props: SliderProps): ElementModel =>
  slider({
    ...props,
    query: EVENTS_SLIDER_QUERY,
    url: 'https://calendar.umd.edu/graphql',
  });

/**
 * Academic Slider Feed (Migrated)
 *
 * Displays academic events in a horizontal carousel layout.
 * Uses strategy pattern for GraphQL queries.
 *
 * @module composite/academic/slider-new
 */

import { slider } from '../../widgets';
import { ACADEMIC_SLIDER_QUERY } from '../../strategies/fetch/academic';
import { type AcademicSliderProps } from './_types';
import { type ElementModel } from '../../_types';

/**
 * Creates an academic events slider feed
 *
 * @param props - Slider configuration options
 * @returns ElementModel with slider element and styles
 *
 * @example
 * ```typescript
 * const academicSlider = slider({
 *   token: 'your-token',
 *   categories: 'engineering,science',
 *   isThemeDark: false,
 * });
 * ```
 */
export default (props: AcademicSliderProps): ElementModel =>
  slider({
    ...props,
    query: ACADEMIC_SLIDER_QUERY,
    url: 'https://provost.umd.edu/graphql',
  });

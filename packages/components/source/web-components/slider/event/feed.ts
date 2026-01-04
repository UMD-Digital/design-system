import { slider as academicSlider } from '@universityofmaryland/web-feeds-library/academic';
import { slider as eventSlider } from '@universityofmaryland/web-feeds-library/events';
import { Attributes, Register, Slots } from '@universityofmaryland/web-model-library';
import {
  CreateComponentFunction,
  ComponentRegistration,
  TypedComponentRef,
} from '../../../_types';

const tagName = 'umd-element-slider-events-feed';

/**
 * Event Slider Feed
 *
 * A dynamic slider component that automatically fetches and displays events from a feed.
 * Supports both general events and academic calendar feeds with category filtering.
 * Provides real-time event updates with automatic date formatting and responsive layout.
 *
 * ## Custom Element
 * `<umd-element-slider-events-feed>`
 *
 * ## Slots
 * - `headline` - Section headline (optional, accepts: heading elements)
 * - `actions` - Call-to-action links (optional, accepts: a, button)
 *
 * ## Attributes
 * - `data-theme` - Color theme of the component:
 *   - `dark` - Dark background with light text
 * - `data-token` - API token for fetching events (required)
 * - `data-feed-type` - Feed type:
 *   - `academic` - Academic calendar events
 *   - Default - General events feed
 * - `data-filter-group-ids` - Comma-separated list of event categories to filter
 *
 * ## Observed Attributes
 * - `resize` - Triggers recalculation of date element sizes
 *
 * @example
 * ```html
 * <!-- Basic events feed slider -->
 * <umd-element-slider-events-feed data-token="events-api-key">
 *   <h2 slot="headline">Upcoming Events</h2>
 *   <a slot="actions" href="/events">All Events</a>
 * </umd-element-slider-events-feed>
 * ```
 *
 * @example
 * ```html
 * <!-- Academic calendar feed -->
 * <umd-element-slider-events-feed
 *   data-token="academic-api-key"
 *   data-feed-type="academic">
 *   <h2 slot="headline">Academic Calendar</h2>
 *   <div slot="actions">
 *     <a href="/academic-calendar">Full Calendar</a>
 *     <a href="/academic-calendar/deadlines">Important Deadlines</a>
 *   </div>
 * </umd-element-slider-events-feed>
 * ```
 *
 * @example
 * ```html
 * <!-- Filtered events with dark theme -->
 * <umd-element-slider-events-feed
 *   data-token="events-api-key"
 *   data-theme="dark"
 *   data-filter-group-ids="athletics,recreation">
 *   <h2 slot="headline">Sports & Recreation</h2>
 *   <a slot="actions" href="/athletics">Athletics Home</a>
 * </umd-element-slider-events-feed>
 * ```
 *
 * @example
 * ```html
 * <!-- Multiple category filters -->
 * <umd-element-slider-events-feed
 *   data-token="events-api-key"
 *   data-filter-group-ids="workshop,seminar,lecture">
 *   <h2 slot="headline">Learning Opportunities</h2>
 *   <div slot="actions">
 *     <a href="/workshops">All Workshops</a>
 *     <a href="/seminars">Seminar Series</a>
 *   </div>
 * </umd-element-slider-events-feed>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
const attributes = Attributes.handler.common.resize((element) =>
  element.events?.size(),
);

const createComponent: CreateComponentFunction = (element) => {
  const isThemeDark = Attributes.isTheme.dark({ element });
  const token = Attributes.getValue.feedToken({ element });
  const categories = Attributes.getValue.feedFilterIds({ element });
  const isTypeAcademic = Attributes.isData.type.academic({
    element,
  });

  if (!token) {
    console.error('Token is required for this component');
    return { element: document.createElement('div'), styles: '' };
  }

  const sliderProps = {
    token,
    categories,
    isThemeDark,
    headline: Slots.headline.default({ element }),
    actions: Slots.actions.default({ element }),
  };

  if (isTypeAcademic) return academicSlider(sliderProps);

  return eventSlider(sliderProps);
};

/**
 * Event Slider Feed
 *
 * A dynamic slider component that automatically fetches and displays events from a feed.
 * Supports both general events and academic calendar feeds with category filtering.
 * Provides real-time event updates with automatic date formatting and responsive layout.
 *
 * ## Custom Element
 * `<umd-element-slider-events-feed>`
 *
 * ## Slots
 * - `headline` - Section headline (optional, accepts: heading elements)
 * - `actions` - Call-to-action links (optional, accepts: a, button)
 *
 * ## Attributes
 * - `data-theme` - Color theme of the component:
 *   - `dark` - Dark background with light text
 * - `data-token` - API token for fetching events (required)
 * - `data-feed-type` - Feed type:
 *   - `academic` - Academic calendar events
 *   - Default - General events feed
 * - `data-filter-group-ids` - Comma-separated list of event categories to filter
 *
 * ## Observed Attributes
 * - `resize` - Triggers recalculation of date element sizes
 *
 * @example
 * ```html
 * <!-- Basic events feed slider -->
 * <umd-element-slider-events-feed data-token="events-api-key">
 *   <h2 slot="headline">Upcoming Events</h2>
 *   <a slot="actions" href="/events">All Events</a>
 * </umd-element-slider-events-feed>
 * ```
 *
 * @example
 * ```html
 * <!-- Academic calendar feed -->
 * <umd-element-slider-events-feed
 *   data-token="academic-api-key"
 *   data-feed-type="academic">
 *   <h2 slot="headline">Academic Calendar</h2>
 *   <div slot="actions">
 *     <a href="/academic-calendar">Full Calendar</a>
 *     <a href="/academic-calendar/deadlines">Important Deadlines</a>
 *   </div>
 * </umd-element-slider-events-feed>
 * ```
 *
 * @example
 * ```html
 * <!-- Filtered events with dark theme -->
 * <umd-element-slider-events-feed
 *   data-token="events-api-key"
 *   data-theme="dark"
 *   data-filter-group-ids="athletics,recreation">
 *   <h2 slot="headline">Sports & Recreation</h2>
 *   <a slot="actions" href="/athletics">Athletics Home</a>
 * </umd-element-slider-events-feed>
 * ```
 *
 * @example
 * ```html
 * <!-- Multiple category filters -->
 * <umd-element-slider-events-feed
 *   data-token="events-api-key"
 *   data-filter-group-ids="workshop,seminar,lecture">
 *   <h2 slot="headline">Learning Opportunities</h2>
 *   <div slot="actions">
 *     <a href="/workshops">All Workshops</a>
 *     <a href="/seminars">Seminar Series</a>
 *   </div>
 * </umd-element-slider-events-feed>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
export const SliderEventFeed: ComponentRegistration = Register.webComponent({
  tagName,
  createComponent,
  attributes: [attributes],
  afterConnect: (ref: TypedComponentRef, shadow?: ShadowRoot) =>
    ref?.events?.callback?.(shadow),
});

/** Backwards compatibility alias for grouped exports */
export { SliderEventFeed as eventFeed };

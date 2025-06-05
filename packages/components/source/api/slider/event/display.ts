import { Composite } from '@universityofmaryland/web-elements-library';
import {
  CreateComponentFunction,
  ComponentRegistration,
  CommonLifecycleHooks,
} from '../../../_types';
import { Attributes, Model, Register, Slots } from 'model';
import { createComponentRegistration } from 'model/utilities/register';

const tagName = 'umd-element-slider-events';

/**
 * Event Slider Display
 *
 * A slider component for displaying a collection of events in a horizontal scrollable format.
 * Ideal for showcasing upcoming events, workshops, or activities with interactive navigation.
 * Automatically adjusts date element sizes based on viewport.
 *
 * ## Custom Element
 * `<umd-element-slider-events>`
 *
 * ## Slots
 * - `event-list` - Container with event items (required, accepts: div with event markup)
 * - `headline` - Section headline (optional, accepts: heading elements)
 * - `actions` - Call-to-action links (optional, accepts: a, button)
 *
 * ## Attributes
 * - `data-theme` - Color theme of the component:
 *   - `dark` - Dark background with light text
 *
 * ## Observed Attributes
 * - `resize` - Triggers recalculation of date element sizes
 *
 * @example
 * ```html
 * <!-- Basic event slider -->
 * <umd-element-slider-events>
 *   <h2 slot="headline">Upcoming Events</h2>
 *   <div slot="event-list">
 *     <div class="event">
 *       <time datetime="2024-04-15">April 15</time>
 *       <h3>Spring Concert</h3>
 *       <p>Annual spring concert featuring student performances</p>
 *     </div>
 *     <div class="event">
 *       <time datetime="2024-04-20">April 20</time>
 *       <h3>Research Symposium</h3>
 *       <p>Undergraduate research presentations</p>
 *     </div>
 *     <div class="event">
 *       <time datetime="2024-04-25">April 25</time>
 *       <h3>Career Fair</h3>
 *       <p>Connect with employers and explore opportunities</p>
 *     </div>
 *   </div>
 *   <a slot="actions" href="/events">View All Events</a>
 * </umd-element-slider-events>
 * ```
 *
 * @example
 * ```html
 * <!-- Dark theme with multiple actions -->
 * <umd-element-slider-events data-theme="dark">
 *   <h2 slot="headline">This Week on Campus</h2>
 *   <div slot="event-list">
 *     <div class="event">
 *       <time datetime="2024-03-10T14:00">Mar 10, 2:00 PM</time>
 *       <h3>Guest Lecture: AI Ethics</h3>
 *       <p>Dr. Smith discusses ethical considerations in AI</p>
 *       <a href="/event/ai-ethics">Learn More</a>
 *     </div>
 *     <div class="event">
 *       <time datetime="2024-03-12T18:00">Mar 12, 6:00 PM</time>
 *       <h3>Film Screening</h3>
 *       <p>Documentary screening and discussion</p>
 *       <a href="/event/film">RSVP</a>
 *     </div>
 *   </div>
 *   <div slot="actions">
 *     <a href="/events/calendar">Full Calendar</a>
 *     <a href="/events/subscribe">Subscribe</a>
 *   </div>
 * </umd-element-slider-events>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
const attributes = Attributes.handler.common.resize((element) => element.events?.SetDateElementsSizes());

const createComponent: CreateComponentFunction = (element) => {
  const dataSlider = document.createElement('div');
  const dataSliderSlot = element.querySelector(
    `[slot=${Slots.name.EVENT_LIST}]`,
  );

  if (!dataSliderSlot) {
    console.error(`Slot ${Slots.name.EVENT_LIST} is required`);
    return { element: dataSlider, styles: '' };
  }

  dataSlider.innerHTML = dataSliderSlot.innerHTML;

  return Composite.slider.events({
    isThemeDark: Attributes.isTheme.dark({ element }),
    dataSlider,
    headline: Slots.headline.default({ element }),
    actions: Slots.actions.default({ element }),
  });
};

/**
 * Event Slider Display
 *
 * A slider component for displaying a collection of events in a horizontal scrollable format.
 * Ideal for showcasing upcoming events, workshops, or activities with interactive navigation.
 * Automatically adjusts date element sizes based on viewport.
 *
 * ## Custom Element
 * `<umd-element-slider-events>`
 *
 * ## Slots
 * - `event-list` - Container with event items (required, accepts: div with event markup)
 * - `headline` - Section headline (optional, accepts: heading elements)
 * - `actions` - Call-to-action links (optional, accepts: a, button)
 *
 * ## Attributes
 * - `data-theme` - Color theme of the component:
 *   - `dark` - Dark background with light text
 *
 * ## Observed Attributes
 * - `resize` - Triggers recalculation of date element sizes
 *
 * @example
 * ```html
 * <!-- Basic event slider -->
 * <umd-element-slider-events>
 *   <h2 slot="headline">Upcoming Events</h2>
 *   <div slot="event-list">
 *     <div class="event">
 *       <time datetime="2024-04-15">April 15</time>
 *       <h3>Spring Concert</h3>
 *       <p>Annual spring concert featuring student performances</p>
 *     </div>
 *     <div class="event">
 *       <time datetime="2024-04-20">April 20</time>
 *       <h3>Research Symposium</h3>
 *       <p>Undergraduate research presentations</p>
 *     </div>
 *     <div class="event">
 *       <time datetime="2024-04-25">April 25</time>
 *       <h3>Career Fair</h3>
 *       <p>Connect with employers and explore opportunities</p>
 *     </div>
 *   </div>
 *   <a slot="actions" href="/events">View All Events</a>
 * </umd-element-slider-events>
 * ```
 *
 * @example
 * ```html
 * <!-- Dark theme with multiple actions -->
 * <umd-element-slider-events data-theme="dark">
 *   <h2 slot="headline">This Week on Campus</h2>
 *   <div slot="event-list">
 *     <div class="event">
 *       <time datetime="2024-03-10T14:00">Mar 10, 2:00 PM</time>
 *       <h3>Guest Lecture: AI Ethics</h3>
 *       <p>Dr. Smith discusses ethical considerations in AI</p>
 *       <a href="/event/ai-ethics">Learn More</a>
 *     </div>
 *     <div class="event">
 *       <time datetime="2024-03-12T18:00">Mar 12, 6:00 PM</time>
 *       <h3>Film Screening</h3>
 *       <p>Documentary screening and discussion</p>
 *       <a href="/event/film">RSVP</a>
 *     </div>
 *   </div>
 *   <div slot="actions">
 *     <a href="/events/calendar">Full Calendar</a>
 *     <a href="/events/subscribe">Subscribe</a>
 *   </div>
 * </umd-element-slider-events>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
const registration: ComponentRegistration = createComponentRegistration({
  tagName,
  createComponent,
  attributes: [attributes],
  afterConnect: CommonLifecycleHooks.loadOnConnect,
});

export default registration;

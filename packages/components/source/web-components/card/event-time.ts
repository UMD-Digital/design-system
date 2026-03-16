import { card } from '@universityofmaryland/web-elements-library/composite';
import { Attributes, Model, Slots } from '@universityofmaryland/web-model-library';
import type {
  CreateComponentFunction,
  ComponentRegistration,
  SlotConfiguration,
} from '../../_types';

const tagName = 'umd-element-event-time';

const slots: SlotConfiguration = {
  headline: Slots.element.allowed.headline,
  'start-time': {
    ...Slots.element.allowed.time,
    required: true,
  },
  'end-time': Slots.element.allowed.time,
  location: Slots.element.allowed.text,
  information: Slots.element.allowed.text,
  text: Slots.element.allowed.text,
  actions: Slots.element.allowed.actions,
  image: Slots.element.allowed.imageLink,
};

/**
 * Creates an event time card component with time range, location, and info
 * @param element - The host HTML element
 * @returns Configured event time card component
 * @internal
 */
const createComponent: CreateComponentFunction = (element) => {
  const startTime = element.querySelector('[slot="start-time"]') as HTMLElement | null;

  if (!startTime) {
    return { element: document.createElement('div'), styles: '' };
  }

  return card.eventTime({
    headline: Slots.headline.default({ element }),
    startTime,
    endTime: element.querySelector('[slot="end-time"]') as HTMLElement | null,
    location: element.querySelector('[slot="location"]') as HTMLElement | null,
    information: element.querySelector('[slot="information"]') as HTMLElement | null,
    text: Slots.text.default({ element }),
    actions: Slots.actions.default({ element }),
    image: Slots.assets.image({ element }) as HTMLImageElement,
    isThemeDark: Attributes.isTheme.dark({ element }),
  });
};

/**
 * Event Time Card
 *
 * A card component for displaying event time information in a two-column layout
 * (content + image). Emphasizes time range display with optional location,
 * information, description, and CTA slots. Supports dark mode.
 *
 * ## Custom Element
 * `<umd-element-event-time>`
 *
 * ## Slots
 * - `headline` - Event title (accepts: h2-h6, p)
 * - `start-time` - Event start time (required, time element)
 * - `end-time` - Event end time (optional, time element)
 * - `location` - Event location
 * - `information` - Additional info text
 * - `text` - Event description
 * - `actions` - CTA links
 * - `image` - Event image
 *
 * ## Attributes
 * - `data-theme` - Theme styling options:
 *   - `dark` - Dark theme styling
 *
 * @example
 * ```html
 * <umd-element-event-time>
 *   <h3 slot="headline">Event Title</h3>
 *   <time slot="start-time" datetime="2024-03-15T10:30:00">2024-03-15T10:30:00</time>
 *   <time slot="end-time" datetime="2024-03-15T12:00:00">2024-03-15T12:00:00</time>
 *   <p slot="location">Oak Creek Golf Club</p>
 *   <p slot="information">Info text</p>
 *   <p slot="text">Event description.</p>
 *   <a slot="actions" href="#">Contact for questions</a>
 *   <img slot="image" src="event.jpg" alt="Event">
 * </umd-element-event-time>
 * ```
 *
 * @category Components
 * @since 1.18.0
 */
export const CardEventTime: ComponentRegistration = Model.defineComponent({
  tagName,
  slots,
  createComponent,
}, { eager: false });

/** Backwards compatibility alias for grouped exports */
export { CardEventTime as eventTime };

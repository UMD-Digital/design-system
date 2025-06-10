import { Atomic, Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Slots, Register } from 'model';
import { Markup } from 'utilities';
import type {
  CreateComponentFunction,
  ComponentRegistration,
  SlotConfiguration,
} from '../_types';

// Tag name for the event card component
const tagName = 'umd-element-event';

/**
 * Extracts common data from event element slots
 * @internal
 */
const MakeCommonData = ({ element }: { element: HTMLElement }) => ({
  headline: Slots.headline.default({ element }),
  text: Slots.text.default({ element }),
  actions: Slots.actions.default({ element }),
  isTransparent: Attributes.isVisual.transparent({ element }),
  isThemeDark: Attributes.isTheme.dark({ element }),
});

// Slot configuration for the event card component
const slots: SlotConfiguration = {
  headline: {
    ...Slots.element.allowed.headline,
    required: true,
  },
  text: Slots.element.allowed.text,
  'date-start-iso': Slots.element.allowed.time,
  'date-end-iso': Slots.element.allowed.time,
  location: Slots.element.allowed.text,
  image: Slots.element.allowed.image,
  eyebrow: Slots.element.allowed.eyebrow,
  actions: Slots.element.allowed.actions,
};

/**
 * Creates an event card component with date, time, and location information
 * @param element - The host HTML element
 * @returns Configured event card component
 * @internal
 */
const createComponent: CreateComponentFunction = (element) => {
  const isThemeDark = Attributes.isTheme.dark({ element });
  const showTime = Attributes.includesFeature.visualTime({ element });

  const startDateSlot = element.querySelector(
    `[slot="${Slots.name.DATE_START_ISO}"]`,
  );
  const endDateSlot = element.querySelector(
    `[slot="${Slots.name.DATE_END_ISO}"]`,
  );
  const locationSlot = element.querySelector(
    `[slot="${Slots.name.contact.location}"]`,
  );
  const startDate = Markup.event.createDate({ element: startDateSlot });
  const endDate = Markup.event.createDate({ element: endDateSlot });

  if (!startDate) {
    console.error('Missing start date for event web component');
    return { element: document.createElement('div'), styles: '' };
  }

  // construct events meta

  const EventDetailsData = Markup.event.createDetailsData({
    locationElement: locationSlot,
    startDate,
    endDate,
  });

  const EventDetailMeta = { ...EventDetailsData, showTime };

  // construct event sign

  const EventSignData = Markup.event.createDetailsData({
    locationElement: locationSlot,
    startDate,
    endDate,
  });

  // Display options

  if (Attributes.isDisplay.feature({ element })) {
    return Composite.card.block({
      ...MakeCommonData({ element }),
      image: Slots.assets.image({ element }) as HTMLImageElement,
      eyebrow: Slots.eyebrow.default({ element }),
      hasEyebrowRibbon: true,
      eventMeta: Atomic.events.meta({
        ...EventDetailMeta,
        isThemeDark,
      }),
      dateSign: Atomic.events.sign({
        ...EventSignData,
        isThemeDark: false,
        isLargeSize: true,
      }),
    });
  }

  if (Attributes.isDisplay.promo({ element })) {
    return Composite.card.overlay.image({
      ...MakeCommonData({ element }),
      backgroundImage: Slots.assets.image({ element }) as HTMLImageElement,
      eventMeta: Atomic.events.meta({
        ...EventDetailMeta,
        isThemeDark: true,
      }),
      dateSign: Atomic.events.sign({
        ...EventSignData,
        isThemeDark: false,
      }),
    });
  }

  if (Attributes.isDisplay.list({ element })) {
    return Composite.card.list({
      ...MakeCommonData({ element }),
      image: Slots.assets.image({ element }) as HTMLImageElement,
      eventMeta: Atomic.events.meta({
        ...EventDetailMeta,
        isThemeDark,
      }),
      dateSign: Atomic.events.sign({
        ...EventSignData,
        isThemeDark,
        isLargeSize: true,
      }),
    });
  }

  return Composite.card.block({
    ...MakeCommonData({ element }),
    image: Slots.assets.image({ element }) as HTMLImageElement,
    eventMeta: Atomic.events.meta({
      ...EventDetailMeta,
      isThemeDark,
    }),
  });
};

/**
 * Event Card
 *
 * A specialized card for displaying event information with date, time, and location.
 * Supports multiple display formats including feature, promo, and list layouts.
 *
 * ## Custom Element
 * `<umd-element-event>`
 *
 * ## Slots
 * - `headline` - Event title (required, accepts: h2-h6, p)
 * - `text` - Event description (accepts: p)
 * - `date-start-iso` - Event start date/time (required, time element)
 * - `date-end-iso` - Event end date/time (optional, time element)
 * - `location` - Event location
 * - `image` - Event image
 * - `eyebrow` - Category or type label
 * - `actions` - Registration or info links
 *
 * ## Attributes
 * - `data-display` - Display layout options:
 *   - `feature` - Featured event layout with prominent date
 *   - `promo` - Promotional layout with image overlay
 *   - `list` - Compact list layout
 * - `data-feature` - Feature options:
 *   - `visual-time` - Show time in event details
 * - `data-theme` - Theme styling options:
 *   - `dark` - Dark theme styling
 * - `data-visual` - Visual display options:
 *   - `transparent` - Transparent background
 *
 * @example
 * ```html
 * <!-- Basic event card -->
 * <umd-element-event>
 *   <h3 slot="headline">Annual Research Symposium</h3>
 *   <p slot="text">Join us for presentations from leading researchers.</p>
 *   <time slot="date-start-iso" datetime="2024-03-15T09:00:00">March 15, 2024 at 9:00 AM</time>
 *   <time slot="date-end-iso" datetime="2024-03-15T17:00:00">March 15, 2024 at 5:00 PM</time>
 *   <p slot="location">Stamp Student Union</p>
 * </umd-element-event>
 * ```
 *
 * @example
 * ```html
 * <!-- Featured event with image -->
 * <umd-element-event data-display="feature" data-feature="visual-time">
 *   <img slot="image" src="symposium.jpg" alt="Research symposium">
 *   <p slot="eyebrow">Featured Event</p>
 *   <h2 slot="headline">Maryland Day 2024</h2>
 *   <p slot="text">Experience the university through hands-on activities and demonstrations.</p>
 *   <time slot="date-start-iso" datetime="2024-04-27T10:00:00">April 27, 2024</time>
 *   <p slot="location">Campus-wide</p>
 *   <div slot="actions">
 *     <a href="/register">Register Now</a>
 *   </div>
 * </umd-element-event>
 * ```
 *
 * @example
 * ```html
 * <!-- Promo event with overlay -->
 * <umd-element-event data-display="promo">
 *   <img slot="image" src="concert.jpg" alt="Concert venue">
 *   <h3 slot="headline">Spring Concert Series</h3>
 *   <p slot="text">Featuring the UMD Symphony Orchestra</p>
 *   <time slot="date-start-iso" datetime="2024-05-10T19:30:00">May 10, 2024 at 7:30 PM</time>
 *   <p slot="location">Clarice Smith Performing Arts Center</p>
 * </umd-element-event>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
const registration: ComponentRegistration = Register.webComponent({
  tagName,
  slots,
  createComponent,
});

export default registration;

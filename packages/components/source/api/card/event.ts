import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Slots, Register } from 'model';
import { extractEventData } from '../_event';
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
  image: Slots.element.allowed.imageLink,
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
  // Extract event data with automatic configuration from element attributes
  const eventComponents = extractEventData(element);

  if (!eventComponents) {
    // Start date is missing - required field
    return { element: document.createElement('div'), styles: '' };
  }

  const { eventMeta, dateSign } = eventComponents;
  const commonData = MakeCommonData({ element });
  const image = Slots.assets.image({ element }) as HTMLImageElement;

  // Display options with specific overrides for each layout

  if (Attributes.isDisplay.feature({ element })) {
    // Feature layout: large date sign, eyebrow ribbon
    const featureEvents = extractEventData(element, {
      isLargeSize: true,
      isDateSignDark: false,
    });

    return Composite.card.block({
      ...commonData,
      image,
      eyebrow: Slots.eyebrow.default({ element }),
      hasEyebrowRibbon: true,
      eventMeta: featureEvents?.eventMeta,
      dateSign: featureEvents?.dateSign,
    });
  }

  if (Attributes.isDisplay.promo({ element })) {
    // Promo layout: overlay style with forced dark theme for meta
    const promoEvents = extractEventData(element, {
      isThemeDark: true, // Force dark theme for meta in overlay
      isDateSignDark: false,
    });

    return Composite.card.overlay.image({
      ...commonData,
      backgroundImage: image,
      eventMeta: promoEvents?.eventMeta,
      dateSign: promoEvents?.dateSign,
    });
  }

  if (Attributes.isDisplay.list({ element })) {
    // List layout: large date sign, uses element's theme
    const listEvents = extractEventData(element, {
      isLargeSize: true,
    });

    return Composite.card.list({
      ...commonData,
      image,
      eventMeta: listEvents?.eventMeta,
      dateSign: listEvents?.dateSign,
    });
  }

  // Default: block layout with standard configuration
  return Composite.card.block({
    ...commonData,
    image,
    eventMeta,
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
 * - `data-visual-time` - Time display options:
 *   - `true` - Show time in event details
 * - `data-theme` - Theme styling options:
 *   - `dark` - Dark theme styling
 * - `data-visual-transparent` - Visual display options:
 *   - `true` - Transparent background
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

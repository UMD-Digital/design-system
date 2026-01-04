import { card } from '@universityofmaryland/web-elements-library/composite';
import { toUMDElement } from '@universityofmaryland/web-utilities-library/adapters';
import { Attributes, Slots, Register } from '@universityofmaryland/web-model-library';
import { extractEventData } from '../_event';
import type {
  CreateComponentFunction,
  ComponentRegistration,
  SlotConfiguration,
} from '../../_types';

const tagName = 'umd-element-event';

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
  const eventComponents = extractEventData(element);

  // Start date is missing - required field
  if (!eventComponents) {
    return { element: document.createElement('div'), styles: '' };
  }

  // Feature layout: large date sign, eyebrow ribbon

  if (Attributes.isDisplay.feature({ element })) {
    const featureEvents = extractEventData(element, {
      isLargeSize: true,
      isDateSignDark: false,
    });

    return card.block({
      actions: Slots.actions.default({ element }),
      dateSign: toUMDElement(featureEvents?.dateSign),
      eventMeta: toUMDElement(featureEvents?.eventMeta),
      eyebrow: Slots.eyebrow.default({ element }),
      hasEyebrowRibbon: true,
      headline: Slots.headline.default({ element }),
      image: Slots.assets.image({ element }) as HTMLImageElement,
      isThemeDark: Attributes.isTheme.dark({ element }),
      isTransparent: Attributes.isVisual.transparent({ element }),
      text: Slots.text.default({ element }),
    });
  }

  // Promo layout: overlay style with forced dark theme for meta

  if (Attributes.isDisplay.promo({ element })) {
    const promoEvents = extractEventData(element, {
      isThemeDark: true, // Force dark theme for meta in overlay
      isDateSignDark: false,
    });

    return card.overlay.image({
      actions: Slots.actions.default({ element }),
      backgroundImage: Slots.assets.image({ element }) as HTMLImageElement,
      dateSign: toUMDElement(promoEvents?.dateSign),
      eventMeta: toUMDElement(promoEvents?.eventMeta),
      headline: Slots.headline.default({ element }),
      isThemeDark: Attributes.isTheme.dark({ element }),
      text: Slots.text.default({ element }),
    });
  }

  // List layout: large date sign, uses element's theme

  if (Attributes.isDisplay.list({ element })) {
    const listEvents = extractEventData(element, {
      isLargeSize: true,
    });

    return card.list({
      actions: Slots.actions.default({ element }),
      dateSign: toUMDElement(listEvents?.dateSign),
      eventMeta: toUMDElement(listEvents?.eventMeta),
      headline: Slots.headline.default({ element }),
      image: Slots.assets.image({ element }) as HTMLImageElement,
      isThemeDark: Attributes.isTheme.dark({ element }),
      text: Slots.text.default({ element }),
    });
  }

  // Default: block layout with standard configuration

  const { eventMeta } = eventComponents;
  return card.block({
    actions: Slots.actions.default({ element }),
    eventMeta: toUMDElement(eventMeta) as any,
    headline: Slots.headline.default({ element }),
    image: Slots.assets.image({ element }) as HTMLImageElement,
    isThemeDark: Attributes.isTheme.dark({ element }),
    isTransparent: Attributes.isVisual.transparent({ element }),
    text: Slots.text.default({ element }),
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
export const CardEvent: ComponentRegistration = Register.webComponent({
  tagName,
  slots,
  createComponent,
});

/** Backwards compatibility alias for grouped exports */
export { CardEvent as event };

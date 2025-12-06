import {
  events,
  textLockup,
} from '@universityofmaryland/web-elements-library/atomic';
import {
  parseDateFromElement,
  createEventDetails,
} from '@universityofmaryland/web-utilities-library/date';
import { Attributes, Register, Slots, Lifecycle } from '@universityofmaryland/web-model-library';
import { CreateComponentFunction, ComponentRegistration } from '../../_types';

const tagName = 'umd-element-events-date';

const attributes = Attributes.handler.common.resize((element) =>
  element.events?.size(),
);

const createComponent: CreateComponentFunction = (element) => {
  const isThemeDark = Attributes.isTheme.dark({ element });

  const headline = Slots.headline.default({ element });
  const startDateSlot = element.querySelector(
    `[slot="${Slots.name.DATE_START_ISO}"]`,
  );
  const endDateSlot = element.querySelector(
    `[slot="${Slots.name.DATE_END_ISO}"]`,
  );
  const startDate = parseDateFromElement({
    element: startDateSlot,
  });
  const endDate = parseDateFromElement({ element: endDateSlot });

  if (!startDate) {
    return textLockup.date({
      headline,
      isThemeDark,
    });
  }

  const EventSignData = createEventDetails({
    startDate,
    endDate,
  });
  const dateSign = events.sign({
    ...EventSignData,
    isThemeDark,
  });

  return textLockup.date({
    headline,
    dateSign,
    isThemeDark,
  });
};

/**
 * Event Date Lockup
 *
 * A text component that displays event information with a formatted date sign.
 * Automatically creates a visual date display from ISO date strings and pairs it
 * with event headlines. Responsive sizing adjusts based on viewport.
 *
 * ## Custom Element
 * `<umd-element-events-date>`
 *
 * ## Slots
 * - `headline` - Event title or headline (optional, accepts: heading elements)
 * - `date-start-iso` - Event start date in ISO format (optional, accepts: time element)
 * - `date-end-iso` - Event end date in ISO format (optional, accepts: time element)
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
 * <!-- Basic event with date -->
 * <umd-element-events-date>
 *   <h3 slot="headline">Spring Commencement</h3>
 *   <time slot="date-start-iso" datetime="2024-05-22">May 22, 2024</time>
 * </umd-element-events-date>
 * ```
 *
 * @example
 * ```html
 * <!-- Multi-day event -->
 * <umd-element-events-date>
 *   <h2 slot="headline">Orientation Week</h2>
 *   <time slot="date-start-iso" datetime="2024-08-26">August 26, 2024</time>
 *   <time slot="date-end-iso" datetime="2024-08-30">August 30, 2024</time>
 * </umd-element-events-date>
 * ```
 *
 * @example
 * ```html
 * <!-- Dark theme event -->
 * <umd-element-events-date data-theme="dark">
 *   <h3 slot="headline">Guest Lecture: Future of AI</h3>
 *   <time slot="date-start-iso" datetime="2024-04-15T18:00:00">April 15, 2024 6:00 PM</time>
 *   <time slot="date-end-iso" datetime="2024-04-15T20:00:00">April 15, 2024 8:00 PM</time>
 * </umd-element-events-date>
 * ```
 *
 * @example
 * ```html
 * <!-- Event without date (text only) -->
 * <umd-element-events-date>
 *   <h3 slot="headline">Ongoing Exhibition: Art of the Americas</h3>
 * </umd-element-events-date>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
const registration: ComponentRegistration = Register.webComponent({
  tagName,
  createComponent,
  attributes: [attributes],
  afterConnect: Lifecycle.hooks.loadOnConnect,
});

export default registration;

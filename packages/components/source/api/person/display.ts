import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Model, Register } from 'model';
import {
  CreateComponentFunction,
  ComponentRegistration,
  SlotConfiguration,
} from '../../_types';
import { createComponentRegistration } from '../../model/utilities/register';
import { CommonPersonData } from './common';

const tagName = 'umd-element-person';

const slots: SlotConfiguration = {
  name: {},
  pronouns: {},
  'job-title': {},
  association: {},
  email: { allowedElements: ['a'] },
  phone: { allowedElements: ['a'] },
  address: {},
  linkedin: { allowedElements: ['a'] },
  'additional-contact': {},
  image: { allowedElements: ['img'] },
  'sub-text': {},
  actions: { allowedElements: ['a', 'button'] },
};

const createComponent: CreateComponentFunction = (element) => {
  const isDisplayList = Attributes.isDisplay.list({ element });
  const isDisplayTabular = Attributes.isDisplay.tabular({ element });
  const isThemeDark = Attributes.isTheme.dark({ element });

  if (isDisplayList) {
    return Composite.person.list(CommonPersonData({ element, isThemeDark }));
  }

  if (isDisplayTabular) {
    return Composite.person.tabular(CommonPersonData({ element, isThemeDark }));
  }

  return Composite.person.block(CommonPersonData({ element, isThemeDark }));
};

/**
 * Person Display
 *
 * A flexible component for displaying person information in various layouts.
 * Ideal for staff directories, team pages, and contact lists. Supports block,
 * list, and tabular display formats.
 *
 * ## Custom Element
 * `<umd-element-person>`
 *
 * ## Slots
 * - `name` - Person's full name (optional, accepts: text elements)
 * - `pronouns` - Preferred pronouns (optional, accepts: text elements)
 * - `job-title` - Professional title or position (optional, accepts: text elements)
 * - `association` - Department, school, or affiliation (optional, accepts: text elements)
 * - `email` - Email address (optional, accepts: a[href^="mailto:"])
 * - `phone` - Phone number (optional, accepts: a[href^="tel:"])
 * - `address` - Physical address (optional, accepts: text elements)
 * - `linkedin` - LinkedIn profile link (optional, accepts: a)
 * - `additional-contact` - Other contact methods (optional, accepts: any elements)
 * - `image` - Portrait photo (optional, accepts: img)
 * - `sub-text` - Additional information (optional, accepts: text elements)
 * - `actions` - Call-to-action links (optional, accepts: a, button)
 *
 * ## Attributes
 * - `data-theme` - Color theme of the component:
 *   - `dark` - Dark background with light text
 * - `data-display` - Layout style:
 *   - `list` - Horizontal list layout
 *   - `tabular` - Table-like layout
 *   - Default - Block/card layout
 *
 * @example
 * ```html
 * <!-- Basic block display -->
 * <umd-element-person>
 *   <img slot="image" src="staff-photo.jpg" alt="John Doe" />
 *   <p slot="name">John Doe</p>
 *   <p slot="job-title">Program Coordinator</p>
 *   <a slot="email" href="mailto:jdoe@umd.edu">jdoe@umd.edu</a>
 *   <a slot="phone" href="tel:301-405-1234">301-405-1234</a>
 * </umd-element-person>
 * ```
 *
 * @example
 * ```html
 * <!-- List display for directory -->
 * <umd-element-person data-display="list">
 *   <img slot="image" src="faculty.jpg" alt="Dr. Martinez" />
 *   <h3 slot="name">Dr. Maria Martinez</h3>
 *   <span slot="pronouns">(she/her)</span>
 *   <p slot="job-title">Associate Professor</p>
 *   <p slot="association">Department of Biology</p>
 *   <a slot="email" href="mailto:mmartinez@umd.edu">mmartinez@umd.edu</a>
 *   <p slot="sub-text">Office: Biology Building, Room 2134</p>
 *   <a slot="actions" href="/faculty/martinez">View Profile</a>
 * </umd-element-person>
 * ```
 *
 * @example
 * ```html
 * <!-- Tabular display for contact list -->
 * <umd-element-person data-display="tabular" data-theme="dark">
 *   <p slot="name">Sarah Thompson</p>
 *   <p slot="job-title">Admissions Counselor</p>
 *   <p slot="association">Office of Undergraduate Admissions</p>
 *   <a slot="email" href="mailto:sthompson@umd.edu">sthompson@umd.edu</a>
 *   <a slot="phone" href="tel:301-314-8385">301-314-8385</a>
 *   <div slot="additional-contact">
 *     <p>Regions: MD (Montgomery County), DC</p>
 *   </div>
 * </umd-element-person>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
const PersonDisplay: ComponentRegistration = createComponentRegistration({
  tagName,
  slots,
  createComponent,
});

export default PersonDisplay;

import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Register, Slots } from 'model';
import { Markup } from 'utilities';
import { CommonPersonData } from './common';
import {
  CreateComponentFunction,
  ComponentRegistration,
  SlotConfiguration,
} from '../../_types';

const tagName = 'umd-element-person-bio';

const { SlotWithDefaultStyling } = Markup.create;

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
  description: {},
  'sub-text': {},
  actions: { allowedElements: ['a', 'button'] },
};

const createComponent: CreateComponentFunction = (element) => {
  const isThemeDark = Attributes.isTheme.dark({ element });
  const isFullImage = Attributes.isLayout.fullImage({ element });

  if (isFullImage) {
    return Composite.person.bio.full({
      ...CommonPersonData({ element, isThemeDark }),
      description: SlotWithDefaultStyling({
        element,
        slotRef: Slots.name.DESCRIPTION,
      }),
    });
  }

  return Composite.person.bio.small({
    ...CommonPersonData({ element, isThemeDark }),
    description: SlotWithDefaultStyling({
      element,
      slotRef: Slots.name.DESCRIPTION,
    }),
  });
};

/**
 * Person Biography
 *
 * A comprehensive biography component for displaying detailed information about
 * faculty, staff, or notable individuals. Supports both small and full-size image
 * layouts with rich biographical content.
 *
 * ## Custom Element
 * `<umd-element-person-bio>`
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
 * - `description` - Full biography text (optional, accepts: any elements)
 * - `sub-text` - Additional information (optional, accepts: text elements)
 * - `actions` - Call-to-action links (optional, accepts: a, button)
 *
 * ## Attributes
 * - `data-theme` - Color theme of the component:
 *   - `dark` - Dark background with light text
 * - `data-image` - Image display size:
 *   - `full` - Large image layout
 *   - Default - Small image layout
 *
 * @example
 * ```html
 * <!-- Basic faculty bio -->
 * <umd-element-person-bio>
 *   <img slot="image" src="professor.jpg" alt="Dr. Smith" />
 *   <h2 slot="name">Dr. Jane Smith</h2>
 *   <span slot="pronouns">(she/her)</span>
 *   <p slot="job-title">Professor of Computer Science</p>
 *   <p slot="association">Department of Computer Science</p>
 *   <a slot="email" href="mailto:jsmith@umd.edu">jsmith@umd.edu</a>
 *   <div slot="description">
 *     <p>Dr. Smith is a leading researcher in artificial intelligence with over
 *     20 years of experience in machine learning and neural networks.</p>
 *     <p>Her work has been published in numerous journals and she has received
 *     multiple awards for her contributions to the field.</p>
 *   </div>
 * </umd-element-person-bio>
 * ```
 *
 * @example
 * ```html
 * <!-- Full image layout with complete details -->
 * <umd-element-person-bio data-image="full">
 *   <img slot="image" src="dean-portrait.jpg" alt="Dean Johnson" />
 *   <h1 slot="name">Dr. Michael Johnson</h1>
 *   <span slot="pronouns">(he/him)</span>
 *   <p slot="job-title">Dean, College of Engineering</p>
 *   <p slot="association">A. James Clark School of Engineering</p>
 *   <a slot="email" href="mailto:dean@eng.umd.edu">dean@eng.umd.edu</a>
 *   <a slot="phone" href="tel:301-405-1000">301-405-1000</a>
 *   <address slot="address">
 *     2101 Glenn L. Martin Hall<br>
 *     College Park, MD 20742
 *   </address>
 *   <a slot="linkedin" href="https://linkedin.com/in/deanjohnson">LinkedIn</a>
 *   <div slot="description">
 *     <h3>About Dean Johnson</h3>
 *     <p>Dean Johnson leads the A. James Clark School of Engineering...</p>
 *     <h3>Research Interests</h3>
 *     <ul>
 *       <li>Sustainable Energy Systems</li>
 *       <li>Smart Infrastructure</li>
 *       <li>Engineering Education Innovation</li>
 *     </ul>
 *   </div>
 *   <div slot="actions">
 *     <a href="/schedule-meeting">Schedule a Meeting</a>
 *     <a href="/publications">View Publications</a>
 *   </div>
 * </umd-element-person-bio>
 * ```
 *
 * @example
 * ```html
 * <!-- Dark theme bio -->
 * <umd-element-person-bio data-theme="dark">
 *   <img slot="image" src="researcher.jpg" alt="Dr. Chen" />
 *   <h2 slot="name">Dr. Lisa Chen</h2>
 *   <p slot="job-title">Research Scientist</p>
 *   <p slot="association">Institute for Advanced Computer Studies</p>
 *   <a slot="email" href="mailto:lchen@umd.edu">lchen@umd.edu</a>
 *   <div slot="additional-contact">
 *     <p>Lab: Room 3120, Iribe Center</p>
 *     <p>Office Hours: Tue/Thu 2-4pm</p>
 *   </div>
 *   <div slot="description">
 *     <p>Dr. Chen specializes in quantum computing and cryptography...</p>
 *   </div>
 * </umd-element-person-bio>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
const PersonBio: ComponentRegistration = Register.webComponent({
  tagName,
  slots,
  createComponent,
});

export default PersonBio;

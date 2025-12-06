import { person } from '@universityofmaryland/web-elements-library/composite';
import { createSlot } from '@universityofmaryland/web-utilities-library/elements';
import { Attributes, Register, Slots } from '@universityofmaryland/web-model-library';
import { CommonPersonData } from './common';
import {
  CreateComponentFunction,
  ComponentRegistration,
  SlotConfiguration,
} from '../../_types';

const tagName = 'umd-element-person-hero';

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
  actions: Slots.element.allowed.actions,
  breadcrumb: { allowedElements: ['umd-element-breadcrumb'] },
};

const createComponent: CreateComponentFunction = (element) => {
  const isThemeDark = Attributes.isTheme.dark({
    element,
  });
  const breadcrumbSlot = createSlot(Slots.name.BREADCRUMB);

  if (breadcrumbSlot) {
    const breadcrumb = element.querySelector(
      `[slot="${Slots.name.BREADCRUMB}"]`,
    );
    if (breadcrumb) {
      const copy = breadcrumb.cloneNode(true);

      element.appendChild(copy);
      breadcrumb.setAttribute('slot', Slots.name.BREADCRUMB_COPY);
    }
  }

  return person.hero({
    ...CommonPersonData({ element, isThemeDark }),
    breadcrumbDesktop: createSlot(Slots.name.BREADCRUMB),
    breadcrumbMobile: createSlot(Slots.name.BREADCRUMB_COPY),
  });
};

/**
 * Person Hero
 *
 * A hero-style component for prominently featuring an individual, typically used
 * for profile pages, featured faculty, or leadership spotlights. Includes support
 * for breadcrumb navigation and full-width layouts.
 *
 * ## Custom Element
 * `<umd-element-person-hero>`
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
 * - `breadcrumb` - Navigation breadcrumb (optional, accepts: nav, ol, ul)
 *
 * ## Attributes
 * - `data-theme` - Color theme of the component:
 *   - `dark` - Dark background with light text
 *
 * @example
 * ```html
 * <!-- Basic person hero -->
 * <umd-element-person-hero>
 *   <img slot="image" src="president.jpg" alt="President Williams" />
 *   <h1 slot="name">Dr. Darryll J. Pines</h1>
 *   <p slot="job-title">President</p>
 *   <p slot="association">University of Maryland</p>
 *   <a slot="email" href="mailto:president@umd.edu">president@umd.edu</a>
 *   <a slot="actions" href="/president/bio">Read Full Biography</a>
 * </umd-element-person-hero>
 * ```
 *
 * @example
 * ```html
 * <!-- Hero with breadcrumb navigation -->
 * <umd-element-person-hero>
 *   <nav slot="breadcrumb">
 *     <ol>
 *       <li><a href="/">Home</a></li>
 *       <li><a href="/leadership">Leadership</a></li>
 *       <li>Provost</li>
 *     </ol>
 *   </nav>
 *   <img slot="image" src="provost.jpg" alt="Provost Johnson" />
 *   <h1 slot="name">Dr. Jennifer King Rice</h1>
 *   <span slot="pronouns">(she/her)</span>
 *   <p slot="job-title">Senior Vice President and Provost</p>
 *   <p slot="association">Office of the Provost</p>
 *   <a slot="email" href="mailto:provost@umd.edu">provost@umd.edu</a>
 *   <address slot="address">
 *     1119 Main Administration Building<br>
 *     College Park, MD 20742
 *   </address>
 *   <div slot="actions">
 *     <a href="/provost/initiatives">Current Initiatives</a>
 *     <a href="/provost/contact">Contact Office</a>
 *   </div>
 * </umd-element-person-hero>
 * ```
 *
 * @example
 * ```html
 * <!-- Dark theme hero with full details -->
 * <umd-element-person-hero data-theme="dark">
 *   <img slot="image" src="dean.jpg" alt="Dean Chen" />
 *   <h1 slot="name">Dr. Ming Lin</h1>
 *   <p slot="job-title">Dean and Professor</p>
 *   <p slot="association">College of Computer, Mathematical, and Natural Sciences</p>
 *   <a slot="email" href="mailto:mlin@umd.edu">mlin@umd.edu</a>
 *   <a slot="phone" href="tel:301-405-2313">301-405-2313</a>
 *   <a slot="linkedin" href="https://linkedin.com/in/minglin">Connect on LinkedIn</a>
 *   <p slot="sub-text">Leading innovation in STEM education and research</p>
 *   <div slot="additional-contact">
 *     <p>Assistant: Jane Smith</p>
 *     <a href="mailto:jsmith@umd.edu">jsmith@umd.edu</a>
 *   </div>
 * </umd-element-person-hero>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
const PersonHero: ComponentRegistration = Register.webComponent({
  tagName,
  slots,
  createComponent,
});

export default PersonHero;

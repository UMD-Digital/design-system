import { layout } from '@universityofmaryland/web-elements-library/composite';
import { Attributes, Slots, Register, Lifecycle } from 'model';
import { CommonIntroData } from './common';
import {
  CreateComponentFunction,
  ComponentRegistration,
} from '../../../_types';

const tagName = 'umd-element-section-intro';

const createComponent: CreateComponentFunction = (element) =>
  layout.sectionIntro.small({
    ...CommonIntroData({
      element,
      isThemeDark: Attributes.isTheme.dark({ element }),
    }),
    text: Slots.text.default({ element }),
    hasSeparator: element.hasAttribute(
      Attributes.names.deprecated.option.OPTIONAL_HAS_SEPARATOR,
    ),
    includesAnimation: Attributes.includesFeature.animation({ element }),
  });

/**
 * Section Introduction (Small)
 *
 * A compact section introduction component that provides a headline, descriptive text,
 * and optional action buttons. Designed for introducing content sections with minimal
 * space usage. Supports animation on scroll and optional visual separator.
 *
 * ## Custom Element
 * `<umd-element-section-intro>`
 *
 * ## Slots
 * - `headline` - Section headline/title
 * - `actions` - Call-to-action buttons or links
 * - Default slot - Descriptive text content
 *
 * ## Attributes
 * - `data-theme` - Theme options:
 *   - `dark` - Dark background with light text
 * - `data-has-separator` - Adds visual separator line
 * - `data-animation` - Enable scroll-triggered animations:
 *   - `true` - Enables entrance animations
 *
 * @example
 * ```html
 * <!-- Basic section intro -->
 * <umd-element-section-intro>
 *   <h2 slot="headline">Our Mission</h2>
 *   <p>We are committed to excellence in education and research.</p>
 * </umd-element-section-intro>
 * ```
 *
 * @example
 * ```html
 * <!-- With actions and separator -->
 * <umd-element-section-intro data-has-separator>
 *   <h2 slot="headline">Get Started</h2>
 *   <p>Join our community of innovators and leaders.</p>
 *   <div slot="actions">
 *     <a href="/apply">Apply Now</a>
 *     <a href="/info">Learn More</a>
 *   </div>
 * </umd-element-section-intro>
 * ```
 *
 * @example
 * ```html
 * <!-- Dark theme with animation -->
 * <umd-element-section-intro data-theme="dark" data-animation="true">
 *   <h2 slot="headline">Research Excellence</h2>
 *   <p>Discover groundbreaking research across multiple disciplines.</p>
 *   <a slot="actions" href="/research">Explore Research</a>
 * </umd-element-section-intro>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
const registration: ComponentRegistration = Register.webComponent({
  tagName,
  createComponent,
  afterConnect: Lifecycle.hooks.loadAnimation,
});

export default registration;

import { layout } from '@universityofmaryland/web-elements-library/composite';
import {
  Attributes,
  Slots,
  Register,
  Lifecycle,
} from '@universityofmaryland/web-model-library';
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
  });

/**
 * Section Introduction (Small)
 *
 * A compact section introduction component that provides a headline, descriptive text,
 * and optional action buttons. Designed for introducing content sections with minimal
 * space usage.
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
 * @category Components
 * @since 1.0.0
 */
export const LayoutSectionIntroSmall: ComponentRegistration =
  Register.webComponent({
    tagName,
    createComponent,
  });

/** Backwards compatibility alias for grouped exports */
export { LayoutSectionIntroSmall as sectionIntroSmall };

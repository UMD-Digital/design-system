import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Model, Register, Slots } from 'model';
import { Markup } from 'utilities';
import {
  CreateComponentFunction,
  ComponentRegistration,
  SlotConfiguration,
} from '../_types';
import { CommonSlots } from '../../model/slots/common';
import { createComponentRegistration } from '../../model/utilities/register';

/**
 * Tag name for the statistic display web component
 */
const tagName = 'umd-element-stat';

const { SlotWithDefaultStyling } = Markup.create;

/**
 * Slot configuration for the statistic display component
 */
const slots: SlotConfiguration = {
  stat: {
    allowedElements: ['span', 'strong', 'em', 'b'],
  },
  'sub-text': CommonSlots.text,
};

/**
 * Creates a statistic display component with the provided configuration
 */
const createComponent: CreateComponentFunction = (element) => {
  const lineAttr = element.hasAttribute(Attributes.names.OPTIONAL_HAS_LINE);

  return Composite.stat.display({
    isThemeDark: Attributes.isTheme.dark({ element }),
    displayType: element.getAttribute(Attributes.names.DISPLAY_TYPE),
    size: element.getAttribute(Attributes.names.DISPLAY_SIZE),
    hasLine: lineAttr ? true : false,
    stat: SlotWithDefaultStyling({ element, slotRef: Slots.name.STAT }),
    text: Slots.text.default({ element }),
    subText: Slots.text.subText({ element }),
  });
};

/**
 * Statistic Display
 *
 * A component for displaying key statistics, metrics, and numerical data with
 * supporting context. Supports various display styles and sizes to emphasize
 * important numbers and achievements.
 *
 * ## Custom Element
 * `<umd-element-stat>`
 *
 * ## Slots
 * - `stat` - The statistic value or number (optional, accepts: span, strong, em, b)
 * - Default slot - Descriptive text for the statistic (optional, accepts: text elements)
 * - `sub-text` - Additional context or details (optional, accepts: text elements)
 *
 * ## Attributes
 * - `data-theme` - Color theme of the component:
 *   - `dark` - Dark background with light text
 * - `data-type` - Display style variant:
 *   - `inline` - Inline text style
 *   - `block` - Block-level display
 *   - `featured` - Emphasized presentation
 * - `data-size` - Size of the statistic display:
 *   - `small` - Compact size
 *   - `medium` - Default size
 *   - `large` - Prominent size
 * - `data-has-line` - Add decorative line element:
 *   - When present - Shows accent line
 *
 * @example
 * ```html
 * <!-- Basic statistic -->
 * <umd-element-stat>
 *   <span slot="stat">40,000+</span>
 *   <p>Students Enrolled</p>
 * </umd-element-stat>
 * ```
 *
 * @example
 * ```html
 * <!-- Featured statistic with sub-text -->
 * <umd-element-stat data-type="featured" data-size="large">
 *   <span slot="stat">$500M</span>
 *   <p>Annual Research Funding</p>
 *   <p slot="sub-text">Supporting groundbreaking discoveries across all disciplines</p>
 * </umd-element-stat>
 * ```
 *
 * @example
 * ```html
 * <!-- Dark theme with accent line -->
 * <umd-element-stat data-theme="dark" data-has-line>
 *   <span slot="stat">#1</span>
 *   <p>Public University in Maryland</p>
 *   <p slot="sub-text">According to U.S. News & World Report</p>
 * </umd-element-stat>
 * ```
 *
 * @example
 * ```html
 * <!-- Inline statistics group -->
 * <div class="stats-row">
 *   <umd-element-stat data-type="inline" data-size="small">
 *     <span slot="stat">12:1</span>
 *     <p>Student-Faculty Ratio</p>
 *   </umd-element-stat>
 *   <umd-element-stat data-type="inline" data-size="small">
 *     <span slot="stat">300+</span>
 *     <p>Academic Programs</p>
 *   </umd-element-stat>
 *   <umd-element-stat data-type="inline" data-size="small">
 *     <span slot="stat">90%</span>
 *     <p>Job Placement Rate</p>
 *   </umd-element-stat>
 * </div>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
const registration: ComponentRegistration = createComponentRegistration({
  tagName,
  slots,
  createComponent,
});

export default registration;

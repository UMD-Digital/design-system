import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Register, Slots } from 'model';
import { Markup } from 'utilities';
import {
  CreateComponentFunction,
  ComponentRegistration,
  SlotConfiguration,
} from '../_types';

/**
 * Tag name for the statistic display web component
 */
const tagName = 'umd-element-stat';

const { SlotWithDefaultStyling } = Markup.create;

/**
 * Slot configuration for the statistic display component
 */
const slots: SlotConfiguration = {
  stat: Slots.element.allowed.subHeadline,
  'sub-text': Slots.element.allowed.text,
};

/**
 * Creates a statistic display component with the provided configuration
 */
const createComponent: CreateComponentFunction = (element) =>
  Composite.stat.display({
    isThemeDark: Attributes.isTheme.dark({ element }),
    isDisplayBlock: Attributes.isDisplay.block({ element }),
    isSizeLarge: Attributes.isVisual.sizeLarge({ element }),
    hasLine: Attributes.hasDecoration.line({ element }) || false,
    stat: Slots.text.stat({ element }),
    text: Slots.text.default({ element }),
    subText: Slots.text.subText({ element }),
  });

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
 * - `data-display` - Display style variant:
 *   - `block` - Block-level display
 * - `data-visual-size` - Size of the statistic display:
 *   - `large` - Prominent size
 * - `data-decoration-line` - Add decorative line element:
 *   - When present - Shows accent line
 *
 * @example
 * ```html
 * <!-- Basic block statistic -->
 * <umd-element-stat data-display="block">
 *   <span slot="stat">40,000+</span>
 *   <p>Students Enrolled</p>
 * </umd-element-stat>
 * ```
 *
 * @example
 * ```html
 * <!-- Block statistic with sub-text and large size -->
 * <umd-element-stat data-display="block" data-visual-size="large">
 *   <span slot="stat">$500M</span>
 *   <p>Annual Research Funding</p>
 *   <p slot="sub-text">Supporting groundbreaking discoveries across all disciplines</p>
 * </umd-element-stat>
 * ```
 *
 * @example
 * ```html
 * <!-- Dark theme block with accent line -->
 * <umd-element-stat data-display="block" data-theme="dark" data-decoration-line>
 *   <span slot="stat">#1</span>
 *   <p>Public University in Maryland</p>
 *   <p slot="sub-text">According to U.S. News & World Report</p>
 * </umd-element-stat>
 * ```
 *
 * @example
 * ```html
 * <!-- Block statistics group -->
 * <div class="stats-row">
 *   <umd-element-stat data-display="block">
 *     <span slot="stat">12:1</span>
 *     <p>Student-Faculty Ratio</p>
 *   </umd-element-stat>
 *   <umd-element-stat data-display="block">
 *     <span slot="stat">300+</span>
 *     <p>Academic Programs</p>
 *   </umd-element-stat>
 *   <umd-element-stat data-display="block">
 *     <span slot="stat">90%</span>
 *     <p>Job Placement Rate</p>
 *   </umd-element-stat>
 * </div>
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

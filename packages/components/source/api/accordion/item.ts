import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Slots, Register } from 'model';
import { CreateComponentFunction, SlotConfiguration } from '../_types';

/**
 * Tag name for the accordion item web component
 */
const tagName = 'umd-element-accordion-item';

/**
 * Creates an accordion item component with the provided configuration
 */
const createComponent: CreateComponentFunction = (element) =>
  Composite.accordion.item({
    text:
      Slots.deprecated.body({ element, isDefaultStyling: false }) ||
      Slots.text.default({ element, isDefaultStyling: false }),
    headline: Slots.headline.default({ element }),
    isThemeLight: Attributes.isTheme.light({
      element,
    }),
    isThemeDark: Attributes.isTheme.dark({
      element,
    }),
    isStateOpen: Attributes.isVisual.open({
      element,
    }),
  });

/**
 * Slot configuration for the accordion item component
 */
const slots: SlotConfiguration = {
  headline: {
    ...Slots.element.allowed.headline,
    required: true,
    allowedElements: ['span', 'p', 'h2', 'h3', 'h4', 'h5', 'h6'],
  },
  body: Slots.element.allowed.body,
  text: {
    ...Slots.element.allowed.text,
    required: true,
  },
};

/**
 * Attribute handlers for the accordion item component
 * Manages state changes and animations
 */
const attributes = Attributes.handler.common.accordion();

/**
 * Accordion Item
 *
 * Creates an expandable/collapsible content container with smooth animations and theme variations.
 *
 * ## Custom Element
 * `<umd-element-accordion-item>`
 *
 * ## Slots
 * - `headline` - The clickable header (required, accepts: span, p)
 * - `text` - The expandable content (required, accepts: div, p)
 * - `body` - Deprecated: Use `text` slot instead
 *
 * ## Attributes
 * - `data-theme` - Color theme options:
 *   - `light` - Light theme styling
 *   - `dark` - Dark theme styling
 * - `data-visual-open` - Initial visual state:
 *   - `true` - Opens accordion on load
 *   - `false` - Closes accordion on load
 *
 * ## Observed Attributes
 * - `data-visual-open` - When changed to "true", opens accordion with animation; when changed to "false", closes with animation
 * - `resize` - When set to "true", re-evaluates accordion height without animation
 *
 * @example
 * ```html
 * <umd-element-accordion-item>
 *   <p slot="headline">Click to expand</p>
 *   <div slot="text">
 *     <p>Hidden content revealed when expanded</p>
 *   </div>
 * </umd-element-accordion-item>
 * ```
 *
 * @example
 * ```html
 * <!-- Dark theme with default open state -->
 * <umd-element-accordion-item data-theme="dark" data-visual-open="true">
 *   <span slot="headline">Click to collapse</span>
 *   <div slot="text">
 *     <p>Content revealed as expanded</p>
 *   </div>
 * </umd-element-accordion-item>
 * ```
 *
 * @example
 * ```javascript
 * // Programmatic control
 * const accordion = document.querySelector('umd-element-accordion-item');
 * accordion.setAttribute('data-visual-open', 'true'); // Opens with animation
 * accordion.setAttribute('data-visual-open', 'false'); // Closes with animation
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
export default Register.webComponent({
  tagName,
  slots,
  createComponent,
  attributes,
});

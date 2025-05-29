import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Model, Register, Slots } from 'model';

/**
 * Tag name for the accordion item web component
 * @internal
 */
const tagName = 'umd-element-accordion-item';

/**
 * Creates an accordion item component with the provided configuration
 * @param element - The host HTML element
 * @returns Configured accordion item component
 * @internal
 */
const createComponent = (element: HTMLElement) =>
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
 * @internal
 */
const slots = {
  headline: {
    required: true,
    allowedElements: ['span', 'p'],
  },
  body: {
    deprecated:
      'Use "text" instead. This attribute will be removed in version 2.0.',
    allowedElements: ['div', 'p'],
  },
  text: {
    required: true,
    allowedElements: ['div', 'p'],
  },
};

/**
 * Attribute handlers for the accordion item component
 * Manages state changes and animations
 * @internal
 */
const attributes = Attributes.handler.combine(
  Attributes.handler.observe.resize({
    callback: (element) => element.events?.SetOpen({ hasAnimation: false }),
  }),
  // Deprecated
  Attributes.handler.observe.stateClosed({
    callback: (element) => element.events?.SetClosed({ hasAnimation: true }),
  }),
  // Deprecated
  Attributes.handler.observe.stateOpen({
    callback: (element) => element.events?.SetOpen({ hasAnimation: true }),
  }),
  Attributes.handler.observe.visuallyOpen({
    callback: (element) => element.events?.SetOpen({ hasAnimation: true }),
  }),
  Attributes.handler.observe.visuallyClosed({
    callback: (element) => element.events?.SetClosed({ hasAnimation: true }),
  }),
);

/**
 * Accordion Item Component
 *
 * A web component that creates an expandable/collapsible content container.
 * Supports smooth animations, theme variations, and programmatic control.
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
 * - `data-theme` - Options for theming:
 *   - `light` - Applies light theme styling
 *   - `dark` - Applies dark theme styling
 * - `data-visual-open` - Options for visual state:
 *   - `true` - Opens accordion with animation
 *   - `false` - Closes accordion with animation
 *
 * ## Observed Attributes
 * - `data-visual-open` - Triggers opening of the accordion
 * - `resize` - Triggers re-evaluation of the accordion height
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
 *     <p>content revealed as expanded</p>
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
export default () => {
  Register.registerWebComponent({
    name: tagName,
    element: Model.createCustomElement({
      tagName,
      slots,
      createComponent,
      attributes,
    }),
  });
};

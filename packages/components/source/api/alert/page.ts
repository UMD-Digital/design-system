import { alert } from '@universityofmaryland/web-elements-library/composite';
import { Attributes, Slots, Register } from '@universityofmaryland/web-model-library';
import {
  CreateComponentFunction,
  ComponentRegistration,
  SlotConfiguration,
} from '../../_types';

const tagName = 'umd-element-alert-page';

const slots: SlotConfiguration = {
  headline: Slots.element.allowed.headline,
  body: Slots.element.allowed.body,
  text: Slots.element.allowed.text,
  actions: Slots.element.allowed.actions,
};

const createComponent: CreateComponentFunction = (element) =>
  alert.page({
    headline: Slots.headline.default({ element }),
    text: Slots.deprecated.body({ element }) || Slots.text.default({ element }),
    actions: Slots.actions.default({ element }),
    isThemeLight: Attributes.isTheme.light({ element }),
    isThemeDark: Attributes.isTheme.dark({ element }),
    isShowIcon: Attributes.isVisual.showIcon({ element }),
  });

/**
 * Page Alert
 *
 * A page-level alert component for displaying important messages with optional icons.
 *
 * ## Custom Element
 * `<umd-element-alert-page>`
 *
 * ## Slots
 * - `headline` - Alert title (required, accepts: h2-h6, p)
 * - `text` - Alert content (required, accepts: div, p)
 * - `actions` - Optional action buttons or links
 * - `body` - Deprecated: Use `text` slot instead
 *
 * ## Attributes
 * - `data-theme` - Theme options:
 *   - `light` - Light background theme
 *   - `dark` - Dark background theme
 * - `data-visual-icon` - Icon display options:
 *   - `show` - Display alert icon indicator
 *
 * @example
 * ```html
 * <!-- Basic page alert -->
 * <umd-element-alert-page>
 *   <h3 slot="headline">Important Notice</h3>
 *   <p slot="text">Classes will be held remotely today.</p>
 * </umd-element-alert-page>
 * ```
 *
 * @example
 * ```html
 * <!-- Dark theme with icon -->
 * <umd-element-alert-page data-theme="dark" data-visual-icon="show">
 *   <h2 slot="headline">Emergency Alert</h2>
 *   <div slot="text">
 *     <p>Campus is closed due to severe weather.</p>
 *   </div>
 *   <div slot="actions">
 *     <a href="/emergency">View Details</a>
 *   </div>
 * </umd-element-alert-page>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
const AlertPageRegistration: ComponentRegistration = Register.webComponent({
  tagName,
  slots,
  createComponent,
});

export default AlertPageRegistration;

import { alert } from '@universityofmaryland/web-elements-library/composite';
import { Attributes, Slots, Register } from '@universityofmaryland/web-model-library';
import {
  CreateComponentFunction,
  ComponentRegistration,
  SlotConfiguration,
} from '../../_types';

const tagName = 'umd-element-alert-site';

const slots: SlotConfiguration = {
  headline: Slots.element.allowed.headline,
  body: Slots.element.allowed.body,
  text: Slots.element.allowed.text,
  actions: Slots.element.allowed.actions,
};

const createComponent: CreateComponentFunction = (element) =>
  alert.site({
    headline: Slots.headline.default({ element }),
    text: Slots.deprecated.body({ element }) || Slots.text.default({ element }),
    actions: Slots.actions.default({ element }),
    daysToHide: Attributes.getValue.daysToHide({ element }) || '10',
  });

/**
 * Site Alert
 *
 * A site-wide alert component that remembers when users dismiss it.
 *
 * ## Custom Element
 * `<umd-element-alert-site>`
 *
 * ## Slots
 * - `headline` - Alert title (required, accepts: h2-h6, p)
 * - `text` - Alert content (required, accepts: div, p)
 * - `actions` - Optional action buttons or links
 * - `body` - Deprecated: Use `text` slot instead
 *
 * ## Attributes
 * - `days-to-hide` - Number of days to remember dismissal (default: 10)
 *
 * @example
 * ```html
 * <!-- Basic site alert -->
 * <umd-element-alert-site>
 *   <h2 slot="headline">System Maintenance Notice</h2>
 *   <p slot="text">Our systems will undergo maintenance on Sunday from 2-4 AM EST.</p>
 * </umd-element-alert-site>
 * ```
 *
 * @example
 * ```html
 * <!-- Alert hidden for 30 days after dismissal -->
 * <umd-element-alert-site days-to-hide="30">
 *   <h3 slot="headline">New Student Portal Available</h3>
 *   <div slot="text">
 *     <p>Experience our redesigned student portal with improved navigation.</p>
 *   </div>
 *   <div slot="actions">
 *     <a href="/portal">Try it Now</a>
 *   </div>
 * </umd-element-alert-site>
 * ```
 *
 * @example
 * ```html
 * <!-- Persistent alert (1 day dismissal) -->
 * <umd-element-alert-site days-to-hide="1">
 *   <p slot="headline">COVID-19 Testing Required</p>
 *   <p slot="text">All students must complete weekly testing.</p>
 *   <div slot="actions">
 *     <a href="/testing">Schedule Test</a>
 *   </div>
 * </umd-element-alert-site>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
export const AlertSite: ComponentRegistration = Register.webComponent({
  tagName,
  slots,
  createComponent,
});

/** Backwards compatibility alias for grouped exports */
export { AlertSite as site };

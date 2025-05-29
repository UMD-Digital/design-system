import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes } from 'model';
import { createAlertComponent, type AlertSiteProps } from './_model';

/**
 * Site Alert Component
 * 
 * A site-wide alert component that remembers when users dismiss it.
 * Uses localStorage to track dismissal and respects user preferences.
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
export default createAlertComponent<AlertSiteProps>({
  tagName: 'umd-element-alert-site',
  renderer: Composite.alert.site,
  getAdditionalProps: (element: HTMLElement) => ({
    daysToHide: Attributes.getValue.daysToHide({ element }) || '10',
  }),
});
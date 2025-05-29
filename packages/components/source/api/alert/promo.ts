import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes } from 'model';
import { createAlertComponent, type AlertBannerProps } from './_model';

/**
 * Promotional Banner Component
 * 
 * A banner component for highlighting promotional content or special announcements.
 * Can include the university seal for official communications.
 * 
 * ## Custom Element
 * `<umd-element-banner-promo>`
 * 
 * ## Slots
 * - `headline` - Banner title (required, accepts: h2-h6, p)
 * - `text` - Banner content (required, accepts: div, p)
 * - `actions` - Optional action buttons or links
 * - `body` - Deprecated: Use `text` slot instead
 * 
 * ## Attributes
 * - `data-theme` - Theme options:
 *   - `dark` - Dark background theme
 * - `data-visual-icon` - Icon options:
 *   - `seal` - Include university seal icon
 * 
 * @example
 * ```html
 * <!-- Basic promo banner -->
 * <umd-element-banner-promo>
 *   <h2 slot="headline">Spring 2024 Applications Now Open</h2>
 *   <p slot="text">Join Maryland's flagship university. Apply by March 1st.</p>
 *   <div slot="actions">
 *     <a href="/apply">Apply Now</a>
 *   </div>
 * </umd-element-banner-promo>
 * ```
 * 
 * @example
 * ```html
 * <!-- Dark theme with university seal -->
 * <umd-element-banner-promo data-theme="dark" data-visual-icon="seal">
 *   <h3 slot="headline">Presidential Scholarship Available</h3>
 *   <div slot="text">
 *     <p>Full tuition coverage for exceptional students.</p>
 *     <p>Limited spots available.</p>
 *   </div>
 *   <div slot="actions">
 *     <button>Learn More</button>
 *   </div>
 * </umd-element-banner-promo>
 * ```
 * 
 * @category Components
 * @since 1.0.0
 */
export default createAlertComponent<AlertBannerProps>({
  tagName: 'umd-element-banner-promo',
  renderer: Composite.banner.promo,
  getAdditionalProps: (element: HTMLElement) => ({
    isThemeDark: Attributes.isTheme.dark({ element }),
    includeSeal: Attributes.isVisual.icon_seal({ element }),
  }),
});
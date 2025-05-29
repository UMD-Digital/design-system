import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes } from 'model';
import { createAlertComponent, type AlertPageProps } from './_model';

/**
 * Page Alert Component
 *
 * A page-level alert component for displaying important messages with optional icons.
 * Supports light and dark themes for different visual emphasis.
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
export default createAlertComponent<AlertPageProps>({
  tagName: 'umd-element-alert-page',
  renderer: Composite.alert.page,
  getAdditionalProps: (element: HTMLElement) => ({
    isThemeLight: Attributes.isTheme.light({ element }),
    isThemeDark: Attributes.isTheme.dark({ element }),
    isShowIcon: Attributes.isVisual.showIcon({ element }),
  }),
});

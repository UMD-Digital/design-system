import { navigation } from '@universityofmaryland/web-elements-library/composite';
import { Attributes, Register } from '@universityofmaryland/web-model-library';
import { CreateComponentFunction } from '../../../_types';

const tagName = 'umd-element-navigation-utility';

const createComponent: CreateComponentFunction = (element) => {
  const hasLandmark = element.hasAttribute('role');
  const hasLabel = element.hasAttribute('aria-label');

  if (!hasLandmark) {
    element.setAttribute('role', 'navigation');
  }

  if (!hasLabel) {
    element.setAttribute('aria-label', 'Utility navigation');
  }

  return navigation.utility({
    alertUrl: Attributes.getValue.alertUrl({ element }),
    giftUrl:
      Attributes.getValue.giftUrl({
        element,
      }) || 'https://giving.umd.edu/giving',
    isAdmissionsFeed: Attributes.isInfo.admissions({ element }),
    isAlertOff: Attributes.isLayout.alertOff({ element }),
    isEventsFeed: Attributes.isInfo.events({ element }),
    isGiftsFeed: Attributes.hasInfo.gifts({ element }),
    isLockFull: Attributes.isLayout.lockFull({ element }),
    isNewsFeed: Attributes.isInfo.news({ element }),
    isSchoolsFeed: Attributes.isInfo.schools({ element }),
    isSearch: Attributes.hasInfo.search({ element }),
    isSearchDomain: Attributes.isInfo.searchDomain({ element }),
  });
};

/**
 * Attribute handlers for the utility navigation component
 */
const attributes = Attributes.handler.common.visualShowHide({
  onShow: (element) => element.events?.showAlert(),
  onHide: (element) => element.events?.hideAlert(),
});

/**
 * Utility Navigation
 *
 * A specialized navigation component for utility links and university-wide resources.
 * Includes support for alerts, search, feeds, and giving options. Automatically adds
 * accessibility attributes if not provided.
 *
 * ## Custom Element
 * `<umd-element-navigation-utility>`
 *
 * ## Attributes
 * - `data-gift-url` - Custom URL for giving link (default: https://giving.umd.edu/giving)
 * - `data-alert-url` - URL for alert/emergency information
 * - `data-info` - Enable specific information feeds:
 *   - `search` - Enable search functionality
 *   - `search-domain` - Enable domain-specific search
 *   - `news` - Show news feed
 *   - `events` - Show events feed
 *   - `schools` - Show schools listing
 *   - `admissions` - Show admissions information
 *   - `gifts` - Show giving information
 * - `data-layout` - Layout options:
 *   - `lock-full` - Full-width lock layout
 *   - `alert-off` - Hide alert section
 *
 * ## Observed Attributes
 * - `data-layout-alert-off` - Dynamically show/hide alert section
 *
 * @example
 * ```html
 * <!-- Basic utility navigation -->
 * <umd-element-navigation-utility
 *   data-info="search">
 * </umd-element-navigation-utility>
 * ```
 *
 * @example
 * ```html
 * <!-- Full utility navigation with feeds -->
 * <umd-element-navigation-utility
 *   data-info="search,news,events"
 *   data-gift-url="/support-umd"
 *   data-alert-url="/emergency">
 * </umd-element-navigation-utility>
 * ```
 *
 * @example
 * ```html
 * <!-- Utility navigation with custom layout -->
 * <umd-element-navigation-utility
 *   data-info="search,schools,admissions"
 *   data-layout="lock-full"
 *   role="navigation"
 *   aria-label="University resources">
 * </umd-element-navigation-utility>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
export default Register.webComponent({
  tagName,
  createComponent,
  attributes,
});

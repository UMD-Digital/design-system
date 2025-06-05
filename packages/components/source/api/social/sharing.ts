import { Composite } from '@universityofmaryland/web-elements-library';
import {
  CreateComponentFunction,
  ComponentRegistration,
} from '../../_types';
import { Attributes, Register, Lifecycle } from 'model';

const tagName = 'umd-element-social-sharing';

/**
 * Social Sharing
 *
 * A component that provides social media sharing functionality for web pages.
 * Includes share buttons for popular platforms and utility actions like print and email.
 * Can be positioned fixed or inline within content.
 *
 * ## Custom Element
 * `<umd-element-social-sharing>`
 *
 * ## Attributes
 * - `data-fixed` - Positioning mode:
 *   - `true` - Fixed position on the page
 *   - Default - Inline with content
 * - `data-title` - Custom title for sharing (defaults to page title)
 * - `data-url` - Custom URL to share (defaults to current page URL)
 * - `data-facebook` - Include Facebook share button:
 *   - `true` - Show Facebook button
 * - `data-twitter` - Include Twitter/X share button:
 *   - `true` - Show Twitter button
 * - `data-print` - Include print button:
 *   - `true` - Show print button
 * - `data-email` - Include email share button:
 *   - `true` - Show email button
 *
 * @example
 * ```html
 * <!-- Basic sharing with all platforms -->
 * <umd-element-social-sharing
 *   data-facebook="true"
 *   data-twitter="true"
 *   data-email="true"
 *   data-print="true">
 * </umd-element-social-sharing>
 * ```
 *
 * @example
 * ```html
 * <!-- Fixed position sharing bar -->
 * <umd-element-social-sharing
 *   data-fixed="true"
 *   data-facebook="true"
 *   data-twitter="true">
 * </umd-element-social-sharing>
 * ```
 *
 * @example
 * ```html
 * <!-- Custom share content -->
 * <umd-element-social-sharing
 *   data-title="Check out this amazing research from UMD!"
 *   data-url="https://umd.edu/research/quantum-breakthrough"
 *   data-facebook="true"
 *   data-twitter="true"
 *   data-email="true">
 * </umd-element-social-sharing>
 * ```
 *
 * @example
 * ```html
 * <!-- Minimal sharing (email and print only) -->
 * <umd-element-social-sharing
 *   data-email="true"
 *   data-print="true">
 * </umd-element-social-sharing>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
const createComponent: CreateComponentFunction = (element) =>
  Composite.social.sharing({
    isFixed: Attributes.isLayout.fixed({ element }),
    title: Attributes.getValue.title({ element }),
    url: Attributes.getValue.url({ element }),
    includeFacebook: Attributes.includesSharing.facebook({ element }),
    includeTwitter: Attributes.includesSharing.twitter({ element }),
    includePrint: Attributes.isSharing.print({ element }),
    includeEmail: Attributes.isSharing.email({ element }),
  });

/**
 * Social Sharing
 *
 * A component that provides social media sharing functionality for web pages.
 * Includes share buttons for popular platforms and utility actions like print and email.
 * Can be positioned fixed or inline within content.
 *
 * ## Custom Element
 * `<umd-element-social-sharing>`
 *
 * ## Attributes
 * - `data-fixed` - Positioning mode:
 *   - `true` - Fixed position on the page
 *   - Default - Inline with content
 * - `data-title` - Custom title for sharing (defaults to page title)
 * - `data-url` - Custom URL to share (defaults to current page URL)
 * - `data-facebook` - Include Facebook share button:
 *   - `true` - Show Facebook button
 * - `data-twitter` - Include Twitter/X share button:
 *   - `true` - Show Twitter button
 * - `data-print` - Include print button:
 *   - `true` - Show print button
 * - `data-email` - Include email share button:
 *   - `true` - Show email button
 *
 * @example
 * ```html
 * <!-- Basic sharing with all platforms -->
 * <umd-element-social-sharing
 *   data-facebook="true"
 *   data-twitter="true"
 *   data-email="true"
 *   data-print="true">
 * </umd-element-social-sharing>
 * ```
 *
 * @example
 * ```html
 * <!-- Fixed position sharing bar -->
 * <umd-element-social-sharing
 *   data-fixed="true"
 *   data-facebook="true"
 *   data-twitter="true">
 * </umd-element-social-sharing>
 * ```
 *
 * @example
 * ```html
 * <!-- Custom share content -->
 * <umd-element-social-sharing
 *   data-title="Check out this amazing research from UMD!"
 *   data-url="https://umd.edu/research/quantum-breakthrough"
 *   data-facebook="true"
 *   data-twitter="true"
 *   data-email="true">
 * </umd-element-social-sharing>
 * ```
 *
 * @example
 * ```html
 * <!-- Minimal sharing (email and print only) -->
 * <umd-element-social-sharing
 *   data-email="true"
 *   data-print="true">
 * </umd-element-social-sharing>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
const registration: ComponentRegistration = Register.webComponent({
  tagName,
  createComponent,
  afterConnect: Lifecycle.hooks.loadOnConnect,
});

export default registration;

import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Slots } from 'model';
import {
  CreateComponentFunction,
  ComponentRegistration,
  SlotConfiguration,
} from '../_types';
import { createComponentRegistration } from '../../model/utilities/register';
import { CommonSlots } from '../../model/slots/common';

/**
 * Tag name for the promotional banner web component
 */
const tagName = 'umd-element-banner-promo';

/**
 * Slot configuration for the promotional banner component
 */
const slots: SlotConfiguration = {
  headline: {
    allowedElements: ['h2', 'h3', 'h4', 'h5', 'h6', 'p'],
  },
  body: CommonSlots.body,
  text: CommonSlots.text,
  actions: CommonSlots.actions,
};

/**
 * Creates a promotional banner component
 */
const createComponent: CreateComponentFunction = (element) =>
  Composite.banner.promo({
    headline: Slots.headline.default({ element }),
    text: Slots.deprecated.body({ element }) || Slots.text.default({ element }),
    actions: Slots.actions.default({ element }),
    isThemeDark: Attributes.isTheme.dark({ element }),
    includeSeal: Attributes.isVisual.icon_seal({ element }),
  });

/**
 * Promotional Banner
 *
 * A banner component for highlighting promotional content or special announcements.
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
const PromoBannerRegistration: ComponentRegistration = createComponentRegistration({
  tagName,
  slots,
  createComponent,
});

export default PromoBannerRegistration;
import { brand } from '@universityofmaryland/web-elements-library/composite';
import {
  Attributes,
  Lifecycle,
  Model,
  Slots,
} from '@universityofmaryland/web-model-library';
import { CreateComponentFunction, ComponentRegistration } from '../../_types';

const tagName = 'umd-element-brand-chevron-promo';

const createComponent: CreateComponentFunction = (element) => {
  return brand.chevronPromo({
    eyebrow: Slots.eyebrow.default({ element }),
    headline: Slots.headline.default({ element }),
    text: Slots.text.default({ element }),
    actions: Slots.actions.default({ element }),
    isAnimationOnLoad: Attributes.includesFeature.animation({ element }),
  });
};

/**
 * Brand Chevron Promo
 *
 * A promotional call-to-action section on a black background with decorative
 * brand chevron line work. Outlined brand chevrons slide in from the left and
 * then drift continuously to the right at gently varying speeds (mirroring
 * the forward.umd.edu campaign hero), then the centered content fades in and
 * up. Content is centered horizontally and vertically, with dark gradients
 * placed under the text to cover the arrows for better reading experience.
 *
 * The section has a minimum height of 500px on desktop and 355px on mobile.
 * The headline uses the campaign typeface; supporting content follows the
 * medium text lockup.
 *
 * ## Custom Element
 * `<umd-element-brand-chevron-promo>`
 *
 * ## Slots
 * - `headline` - Main heading (required)
 * - `eyebrow` - Small ribbon text above the headline
 * - `text` - Supporting text content
 * - `actions` - Call-to-action buttons/links
 *
 * ## Attributes
 * - `data-animation` - Animation trigger options:
 *   - `false` - Wait until the section scrolls into view to start the arrow
 *     animation (default: starts on component load)
 *
 * @example
 * ```html
 * <!-- Basic promo (arrows animate on load) -->
 * <umd-element-brand-chevron-promo>
 *   <h2 slot="headline">Donec et urna vel risus feugiat</h2>
 *   <div slot="text">
 *     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
 *   </div>
 *   <div slot="actions">
 *     <a href="/learn-more">Learn more</a>
 *   </div>
 * </umd-element-brand-chevron-promo>
 * ```
 *
 * @example
 * ```html
 * <!-- Animate on scroll into view, with eyebrow -->
 * <umd-element-brand-chevron-promo data-animation="false">
 *   <p slot="eyebrow">Fearlessly Forward</p>
 *   <h2 slot="headline">Do Good</h2>
 *   <div slot="actions">
 *     <a href="/apply">Apply Now</a>
 *   </div>
 * </umd-element-brand-chevron-promo>
 * ```
 *
 * @category Components
 * @since 1.17.0
 */
export const BrandChevronPromo: ComponentRegistration = Model.defineComponent({
  tagName,
  createComponent,
  afterConnect: Lifecycle.hooks.loadOnConnect,
}, { eager: false });

/** Backwards compatibility alias for grouped exports */
export { BrandChevronPromo as chevronPromo };

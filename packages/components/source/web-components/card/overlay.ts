import { card } from '@universityofmaryland/web-elements-library/composite';
import { createStyledSlotOrClone } from '@universityofmaryland/web-utilities-library/elements';
import { Attributes, Slots, Register, Lifecycle } from '@universityofmaryland/web-model-library';
import type {
  CreateComponentFunction,
  ComponentRegistration,
  SlotConfiguration,
} from '../../_types';

const tagName = 'umd-element-card-overlay';

const slots: SlotConfiguration = {
  headline: {
    ...Slots.element.allowed.headline,
    required: true,
  },
  text: Slots.element.allowed.text,
  eyebrow: Slots.element.allowed.eyebrow,
  image: Slots.element.allowed.image,
  actions: Slots.element.allowed.actions,
  date: Slots.element.allowed.time,
  'cta-icon': {
    allowedElements: ['a'],
  },
};

/**
 * Extracts overlay content from element slots
 * @internal
 */
const MakeOverlayContent = ({ element }: { element: HTMLElement }) => {
  const loadingPriority = Attributes.getValue.loadingPriority({ element });
  const imageLoading =
    loadingPriority === 'eager' || loadingPriority === 'lazy'
      ? loadingPriority
      : 'lazy';

  return {
    eyebrow: Slots.eyebrow.default({ element }),
    headline: Slots.headline.default({ element }),
    text: Slots.text.default({ element }),
    date: Slots.date.default({ element }),
    actions: Slots.actions.default({ element }),
    ctaIcon: createStyledSlotOrClone({
      element,
      slotRef: Slots.name.CTA_ICON,
    }),
    isQuote: Attributes.isVisual.quote({ element }),
    isThemeDark: Attributes.isTheme.dark({ element }),
    isThemeLight: Attributes.isTheme.light({ element }),
    imageLoading,
  };
};

/**
 * Creates an overlay card component with image or color background
 * @param element - The host HTML element
 * @returns Configured overlay card component
 * @internal
 */
const createComponent: CreateComponentFunction = (element) => {
  if (Attributes.isLayout.image({ element })) {
    const ImageOverlay = card.overlay.image({
      ...MakeOverlayContent({ element }),
      backgroundImage: Slots.assets.image({ element }) as HTMLImageElement,
    });

    if (ImageOverlay) {
      return ImageOverlay;
    }
  }

  return card.overlay.color({ ...MakeOverlayContent({ element }) });
};

/**
 * Overlay Card
 *
 * A dramatic card component with overlay styling, supporting both image
 * and color backgrounds. Perfect for hero sections and featured content.
 *
 * ## Custom Element
 * `<umd-element-card-overlay>`
 *
 * ## Slots
 * - `headline` - Card title (required, accepts: h2-h6, p)
 * - `text` - Card content (optional, accepts: p)
 * - `eyebrow` - Small text above headline
 * - `image` - Background image (required for layout-image)
 * - `actions` - Action buttons or links
 * - `date` - Date information
 * - `cta-icon` - Call-to-action icon
 *
 * ## Attributes
 * - `data-layout` - Layout options:
 *   - `image` - Use image as background
 * - `data-visual` - Visual display options:
 *   - `quote` - Quote styling
 * - `data-theme` - Theme styling options:
 *   - `dark` - Dark overlay theme
 *   - `light` - Light overlay theme
 *
 * @example
 * ```html
 * <!-- Image overlay card -->
 * <umd-element-card-overlay data-layout="image">
 *   <img slot="image" src="campus-hero.jpg" alt="Campus view">
 *   <p slot="eyebrow">Welcome</p>
 *   <h2 slot="headline">Discover Maryland</h2>
 *   <p slot="text">Join a community of innovators and leaders</p>
 *   <div slot="actions">
 *     <a href="/apply">Apply Now</a>
 *   </div>
 * </umd-element-card-overlay>
 * ```
 *
 * @example
 * ```html
 * <!-- Color overlay with quote -->
 * <umd-element-card-overlay data-visual="quote" data-theme="dark">
 *   <h3 slot="headline">"The best investment in our future is education."</h3>
 *   <p slot="text">- President Darryll J. Pines</p>
 * </umd-element-card-overlay>
 * ```
 *
 * @example
 * ```html
 * <!-- Feature card with CTA icon -->
 * <umd-element-card-overlay data-layout="image" data-theme="light">
 *   <img slot="image" src="research-bg.jpg" alt="Research lab">
 *   <p slot="eyebrow">Innovation</p>
 *   <h2 slot="headline">Breakthrough Research</h2>
 *   <p slot="text">Solving tomorrow's challenges today</p>
 *   <span slot="cta-icon">→</span>
 *   <div slot="actions">
 *     <a href="/research">Explore Research</a>
 *   </div>
 * </umd-element-card-overlay>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
export const CardOverlay: ComponentRegistration = Register.webComponent({
  tagName,
  slots,
  createComponent,
  afterConnect: Lifecycle.hooks.loadOnConnect,
});

/** Backwards compatibility alias for grouped exports */
export { CardOverlay as overlay };

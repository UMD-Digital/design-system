import { Composite } from '@universityofmaryland/web-elements-library';
import { Slots, Register, Lifecycle } from 'model';
import type {
  CreateComponentFunction,
  ComponentRegistration,
  SlotConfiguration,
} from '../_types';

const tagName = 'umd-element-card-video';

const slots: SlotConfiguration = {
  video: {
    ...Slots.element.allowed.video,
    required: true,
  },
};

/**
 * Creates an overlay card component with image or color background
 * @param element - The host HTML element
 * @returns Configured overlay card component
 * @internal
 */
const createComponent: CreateComponentFunction = (element) => {
  const video = Slots.assets.video({ element }) as HTMLVideoElement;

  if (!video) {
    console.error('Video slot is required for umd-element-card-video');
    return { element: document.createElement('div'), styles: '' };
  }

  return Composite.card.video.short({
    video,
  });
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
 * - `Video` - Card title (required, accepts: h2-h6, p)
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
 * @since 1.12.0
 */
const registration: ComponentRegistration = Register.webComponent({
  tagName,
  slots,
  createComponent,
  afterConnect: Lifecycle.hooks.loadOnConnect,
});

export default registration;

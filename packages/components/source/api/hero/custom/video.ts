import { hero } from '@universityofmaryland/web-elements-library/composite';
import { Lifecycle, Slots, Register } from '@universityofmaryland/web-model-library';
import type {
  CreateComponentFunction,
  ComponentRegistration,
} from '../../../_types';

const tagName = 'umd-element-hero-brand-video';

const createComponent: CreateComponentFunction = (element) => {
  const animationTriggerAttribute = element.getAttribute('animation-trigger');
  const video = element.querySelector('video') as HTMLVideoElement;

  return hero.custom.videoArrow({
    video,
    headline: Slots.headline.default({ element }),
    text: Slots.text.default({ element }),
    isAnimationOnLoad: animationTriggerAttribute === 'load',
  });
};

/**
 * Brand Video Hero Component
 *
 * A hero component featuring brand-focused video content with animation support.
 * Designed for impactful homepage and campaign experiences.
 *
 * ## Custom Element
 * `<umd-element-hero-brand-video>`
 *
 * ## Slots
 * - `headline` - Main hero heading
 * - `text` - Supporting text content
 *
 * ## Direct Children
 * - `video` - Video element (not slotted, direct child)
 *
 * ## Attributes
 * - `animation-trigger` - Animation trigger options:
 *   - `load` - Start animation on component load
 *
 * @example
 * ```html
 * <!-- Basic brand video hero -->
 * <umd-element-hero-brand-video>
 *   <video autoplay muted loop>
 *     <source src="brand-video.mp4" type="video/mp4">
 *   </video>
 *   <h1 slot="headline">Fearlessly Forward</h1>
 *   <p slot="text">The University of Maryland's strategic vision</p>
 * </umd-element-hero-brand-video>
 * ```
 *
 * @example
 * ```html
 * <!-- Brand video with load animation -->
 * <umd-element-hero-brand-video animation-trigger="load">
 *   <video autoplay muted loop>
 *     <source src="campaign.mp4" type="video/mp4">
 *     <source src="campaign.webm" type="video/webm">
 *   </video>
 *   <h1 slot="headline">Do Good</h1>
 *   <p slot="text">
 *     Join us in making a positive impact on our world
 *   </p>
 * </umd-element-hero-brand-video>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
const BrandVideoHero: ComponentRegistration = Register.webComponent({
  tagName,
  createComponent,
  afterConnect: Lifecycle.hooks.loadOnConnect,
});

export default BrandVideoHero;

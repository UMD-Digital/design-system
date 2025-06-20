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
 * Video Card
 *
 * A card component for displaying short-form video content in a 9:16 aspect ratio.
 * Features auto-play on hover/focus and auto-pause on blur for an interactive
 * preview experience.
 *
 * ## Custom Element
 * `<umd-element-card-video>`
 *
 * ## Slots
 * - `video` - Video element (required, accepts: video element)
 *
 * ## Visual Behavior
 * - Maintains 9:16 aspect ratio (vertical video format)
 * - Auto-plays (muted) on hover or focus
 * - Auto-pauses when user moves away
 * - Shows video controls with restricted features (no download, fullscreen, etc.)
 * - Video covers entire card area with object-fit: cover
 *
 * @example
 * ```html
 * <!-- Basic video card -->
 * <umd-element-card-video>
 *   <video slot="video" src="campus-tour.mp4" poster="tour-thumb.jpg">
 *     <source src="campus-tour.mp4" type="video/mp4">
 *   </video>
 * </umd-element-card-video>
 * ```
 *
 * @example
 * ```html
 * <!-- Video card with multiple sources -->
 * <umd-element-card-video>
 *   <video slot="video" poster="preview.jpg">
 *     <source src="student-life.webm" type="video/webm">
 *     <source src="student-life.mp4" type="video/mp4">
 *     Your browser does not support the video tag.
 *   </video>
 * </umd-element-card-video>
 * ```
 *
 * @example
 * ```html
 * <!-- Video card with captions -->
 * <umd-element-card-video>
 *   <video slot="video" poster="athletics.jpg">
 *     <source src="athletics-highlight.mp4" type="video/mp4">
 *     <track kind="captions" src="captions.vtt" srclang="en" label="English">
 *   </video>
 * </umd-element-card-video>
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

import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Slots, Register, Lifecycle } from 'model';
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
  const isTypeShort = Attributes.isDisplay.short({ element });
  const isAutoplay = Attributes.isVisual.play({ element });

  if (!video) {
    console.error('Video slot is required for umd-element-card-video');
    return { element: document.createElement('div'), styles: '' };
  }

  if (isTypeShort) {
    return Composite.card.video.short({
      video,
    });
  }

  return Composite.card.video.block({
    video,
    isAutoplay,
  });
};

/**
 * Video Card
 *
 * A card component for displaying video content with configurable display formats
 * and autoplay behavior. Supports both short-form (9:16) and block (1:1) aspect ratios.
 *
 * ## Custom Element
 * `<umd-element-card-video>`
 *
 * ## Slots
 * - `video` - Video element (required, accepts: video element)
 *
 * ## Attributes
 * - `data-display` - Display format:
 *   - `short` - 9:16 aspect ratio (vertical video format) with hover/focus controls
 *   - Default - 1:1 aspect ratio (square format) with optional autoplay
 * - `data-visual-play` - Autoplay behavior (only for default display):
 *   - `true` - Video autoplays when 25% visible in viewport
 *   - Default - No autoplay behavior
 *
 * ## Visual Behavior
 * ### Short Display (data-display="short")
 * - Maintains 9:16 aspect ratio (vertical video format)
 * - Auto-plays (muted) on hover or focus
 * - Auto-pauses when user moves away
 * - Shows video controls with restricted features (no download, fullscreen, etc.)
 * - Video covers entire card area with object-fit: cover
 *
 * ### Default Display
 * - Maintains 1:1 aspect ratio (square format)
 * - Optional autoplay when visible in viewport (data-visual-play="true")
 * - No visible controls
 * - Video loops continuously when playing
 *
 * @example
 * ```html
 * <!-- Basic video card (square format) -->
 * <umd-element-card-video>
 *   <video slot="video" src="campus-tour.mp4" poster="tour-thumb.jpg">
 *     <source src="campus-tour.mp4" type="video/mp4">
 *   </video>
 * </umd-element-card-video>
 * ```
 *
 * @example
 * ```html
 * <!-- Short-form video card with hover controls -->
 * <umd-element-card-video data-display="short">
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
 * <!-- Video card with autoplay when visible -->
 * <umd-element-card-video data-visual-play="true">
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
});

export default registration;

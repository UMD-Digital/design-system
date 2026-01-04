import { carousel } from '@universityofmaryland/web-elements-library/composite';
import { imageHasAlt } from '@universityofmaryland/web-utilities-library/accessibility';
import { Attributes, Slots, Register } from '@universityofmaryland/web-model-library';
import type {
  CreateComponentFunction,
  ComponentRegistration,
  SlotConfiguration,
} from '../../../_types';

const tagName = 'umd-element-carousel-multiple-image';

const slots: SlotConfiguration = {
  images: {
    required: true,
    allowedElements: ['div', 'img'],
  },
};

const attributes = Attributes.handler.common.resize((element) =>
  element.events?.SetEventReize(),
);

/**
 * Creates a multiple image carousel component
 * @param element - The host HTML element
 * @returns Configured multiple image carousel component
 * @internal
 */
const createComponent: CreateComponentFunction = (element) => {
  const slottedImages = Array.from(
    element.querySelectorAll(`[slot="${Slots.name.IMAGES}"] > *`),
  ) as HTMLImageElement[];

  const images = slottedImages
    .map((image) => {
      if (image.nodeName === 'IMG') {
        if (imageHasAlt(image)) return image.cloneNode(true);
      }
      return null;
    })
    .filter((image) => image !== null) as HTMLImageElement[];

  return carousel.images({
    images,
    isThemeDark: Attributes.isTheme.dark({ element }),
    isFullScreenOption: Attributes.includesFeature.fullScreenOption({
      element,
    }),
  });
};

/**
 * Multiple Image Carousel
 *
 * A carousel component for displaying multiple images in a gallery format.
 *
 * ## Custom Element
 * `<umd-element-carousel-multiple-image>`
 *
 * ## Slots
 * - `images` - Container for images (required, accepts: img elements with alt text)
 *
 * ## Attributes
 * - `data-theme` - Visual theme:
 *   - `light` - Light theme (default)
 *   - `dark` - Dark theme
 * - `data-feature` - Additional features:
 *   - `fullscreen` - Enable fullscreen viewing option
 *
 * ## Observed Attributes
 * - `resize` - Triggers carousel size recalculation
 *
 * @example
 * ```html
 * <umd-element-carousel-multiple-image>
 *   <div slot="images">
 *     <img src="gallery1.jpg" alt="Gallery image 1">
 *     <img src="gallery2.jpg" alt="Gallery image 2">
 *     <img src="gallery3.jpg" alt="Gallery image 3">
 *     <img src="gallery4.jpg" alt="Gallery image 4">
 *   </div>
 * </umd-element-carousel-multiple-image>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
export const CarouselImageMultiple: ComponentRegistration = Register.webComponent({
  tagName,
  slots,
  createComponent,
  attributes: [attributes],
});

/** Backwards compatibility alias for grouped exports */
export { CarouselImageMultiple as imageMultiple };

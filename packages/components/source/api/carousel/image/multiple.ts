import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Slots, Register } from 'model';
import { Markup } from 'utilities';
import type {
  CreateComponentFunction,
  ComponentRegistration,
  SlotConfiguration,
} from '../../_types';

const { ImageHasAlt } = Markup.validate;

// Tag name for the multiple image carousel component
const tagName = 'umd-element-carousel-multiple-image';

// Slot configuration for the multiple image carousel component
const slots: SlotConfiguration = {
  images: {
    required: true,
    allowedElements: ['div', 'img'],
  },
};

// Attribute handlers for the multiple image carousel component
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
        if (ImageHasAlt({ image })) return image.cloneNode(true);
      }
      return null;
    })
    .filter((image) => image !== null) as HTMLImageElement[];

  return Composite.carousel.images({
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
const registration: ComponentRegistration = Register.webComponent({
  tagName,
  slots,
  createComponent,
  attributes: [attributes],
});

export default registration;

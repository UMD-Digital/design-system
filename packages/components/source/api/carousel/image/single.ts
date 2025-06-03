import { Composite } from '@universityofmaryland/web-elements-library';
import type { CreateComponentFunction, ComponentRegistration, SlotConfiguration } from '../../_types';
import { createComponentRegistration } from '../../../model/utilities/register';
import { CommonSlots } from '../../../model/slots/common';
import { CommonAttributeHandlers } from '../../../model/attributes/handler';
import { Attributes, Slots } from 'model';
import { Markup } from 'utilities';

const { ImageHasAlt } = Markup.validate;

// Tag name for the single image carousel component
const tagName = 'umd-element-carousel-image';

// Slot configuration for the single image carousel component
const slots: SlotConfiguration = {
  images: {
    ...CommonSlots.image,
    required: true,
    allowedElements: ['img'],
  },
  headlines: {
    ...CommonSlots.headline,
    required: false,
  },
  texts: {
    ...CommonSlots.text,
    required: false,
  },
};

// Attribute handlers for the single image carousel component
const attributes = CommonAttributeHandlers.resize(
  (element) => element.events?.SetEventReize()
);

/**
 * Creates a single image carousel component
 * @param element - The host HTML element
 * @returns Configured single image carousel component
 * @internal
 */
const createComponent: CreateComponentFunction = (element) => {
  const slottedImages = Array.from(
    element.querySelectorAll(`[slot="${Slots.name.IMAGES}"] > *`),
  ) as HTMLImageElement[];
  const slottedHeadlines = Array.from(
    element.querySelectorAll(`[slot="${Slots.name.HEADLINES}"] > *`),
  );
  const slottedTexts = Array.from(
    element.querySelectorAll(`[slot="${Slots.name.TEXTS}"] > *`),
  );

  const headlines = slottedHeadlines.map((headline) =>
    headline.cloneNode(true),
  ) as HTMLElement[];

  const texts = slottedTexts.map((text) =>
    text.cloneNode(true),
  ) as HTMLElement[];

  const images = slottedImages
    .map((image) => {
      if (image.nodeName === 'IMG') {
        if (ImageHasAlt({ image })) return image.cloneNode(true);
      }
      return null;
    })
    .filter((image) => image !== null) as HTMLImageElement[];

  return Composite.carousel.image({
    images,
    headlines,
    texts,
    isThemeDark: Attributes.isTheme.dark({ element }),
    isFullScreenOption: Attributes.includesFeature.fullScreenOption({
      element,
    }),
  });
};

/**
 * Single Image Carousel
 *
 * A carousel component for displaying images with optional captions and headlines.
 *
 * ## Custom Element
 * `<umd-element-carousel-image>`
 *
 * ## Slots
 * - `images` - Container for images (required, accepts: img elements with alt text)
 * - `headlines` - Container for image headlines (optional, accepts: heading elements)
 * - `texts` - Container for image descriptions (optional, accepts: text elements)
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
 * <umd-element-carousel-image>
 *   <div slot="images">
 *     <img src="photo1.jpg" alt="Campus view">
 *     <img src="photo2.jpg" alt="Student center">
 *     <img src="photo3.jpg" alt="Library entrance">
 *   </div>
 * </umd-element-carousel-image>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
const registration: ComponentRegistration = createComponentRegistration({
  tagName,
  slots,
  createComponent,
  attributes: [attributes],
});

export default registration;

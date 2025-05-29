import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Model, Register, Slots } from 'model';
import { Markup } from 'utilities';
const { ImageHasAlt } = Markup.validate;

/**
 * Tag name for the multiple image carousel component
 * @internal
 */
const tagName = 'umd-element-carousel-multiple-image';

const slots = {
  images: {
    required: true,
  },
};

const attributes = Attributes.handler.combine(
  Attributes.handler.observe.resize({
    callback: (element) => element.events?.SetEventReize(),
  }),
);

const createComponent = (element: HTMLElement) => {
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
 * Multiple Image Carousel Component
 * 
 * A carousel component for displaying multiple images in a gallery format.
 * Validates images have alt text for accessibility.
 * 
 * ## Custom Element
 * `<umd-element-carousel-multiple-image>`
 * 
 * ## Slots
 * - `images` - Container for images (required, img elements must have alt text)
 * 
 * ## Attributes
 * - `data-theme` - Theme options:
 *   - `dark` - Dark theme styling
 * - `data-feature` - Feature options:
 *   - `fullscreen` - Enable fullscreen viewing option
 * 
 * ## Observed Attributes
 * - `resize` - Triggers carousel recalculation
 * 
 * @example
 * ```html
 * <!-- Basic multiple image carousel -->
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
 * @example
 * ```html
 * <!-- Gallery with fullscreen option -->
 * <umd-element-carousel-multiple-image 
 *   data-theme="dark"
 *   data-feature="fullscreen">
 *   <div slot="images">
 *     <img src="artwork1.jpg" alt="Abstract painting">
 *     <img src="artwork2.jpg" alt="Sculpture installation">
 *     <img src="artwork3.jpg" alt="Photography exhibit">
 *     <img src="artwork4.jpg" alt="Digital art piece">
 *     <img src="artwork5.jpg" alt="Mixed media work">
 *   </div>
 * </umd-element-carousel-multiple-image>
 * ```
 * 
 * @category Components
 * @since 1.0.0
 */
export default () => {
  Register.registerWebComponent({
    name: tagName,
    element: Model.createCustomElement({
      tagName,
      slots,
      createComponent,
      attributes,
    }),
  });
};

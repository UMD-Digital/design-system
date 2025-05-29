import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Model, Register, Slots } from 'model';
import { Markup } from 'utilities';

const { ImageHasAlt } = Markup.validate;

/**
 * Tag name for the single image carousel component
 * @internal
 */
const tagName = 'umd-element-carousel-image';

const slots = {
  images: {
    required: true,
  },
  headlines: {
    required: false,
  },
  texts: {
    required: false,
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
 * Single Image Carousel Component
 * 
 * A carousel component for displaying images with optional captions and headlines.
 * Validates images have alt text for accessibility.
 * 
 * ## Custom Element
 * `<umd-element-carousel-image>`
 * 
 * ## Slots
 * - `images` - Container for images (required, img elements must have alt text)
 * - `headlines` - Container for image headlines (optional)
 * - `texts` - Container for image descriptions (optional)
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
 * <!-- Basic image carousel -->
 * <umd-element-carousel-image>
 *   <div slot="images">
 *     <img src="photo1.jpg" alt="Campus view">
 *     <img src="photo2.jpg" alt="Student center">
 *     <img src="photo3.jpg" alt="Library entrance">
 *   </div>
 * </umd-element-carousel-image>
 * ```
 * 
 * @example
 * ```html
 * <!-- Image carousel with captions and fullscreen -->
 * <umd-element-carousel-image 
 *   data-theme="dark"
 *   data-feature="fullscreen">
 *   <div slot="images">
 *     <img src="event1.jpg" alt="Graduation ceremony">
 *     <img src="event2.jpg" alt="Research presentation">
 *   </div>
 *   <div slot="headlines">
 *     <h3>2024 Graduation Ceremony</h3>
 *     <h3>Annual Research Symposium</h3>
 *   </div>
 *   <div slot="texts">
 *     <p>Celebrating our graduating class</p>
 *     <p>Showcasing innovative research</p>
 *   </div>
 * </umd-element-carousel-image>
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

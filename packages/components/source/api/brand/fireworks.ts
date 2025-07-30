import { Atomic } from '@universityofmaryland/web-elements-library';
import { Slots, Register, Attributes } from 'model';
import {
  CreateComponentFunction,
  ComponentRegistration,
  SlotConfiguration,
} from '../_types';

/**
 * Tag name for the card fireworks component
 * @internal
 */ const tagName = 'umd-element-brand-card-fireworks';

const slots: SlotConfiguration = {
  images: { ...Slots.element.allowed.images, required: true },
  featured: { allowedElements: ['img', 'video'], required: true },
};

/**
 * Extracts card fireworks content from element slots
 * @internal
 */
const MakeCardFireworksContent = ({ element }: { element: HTMLElement }) => {
  const featuredSlot = element.querySelector(
    `[slot=${Slots.name.assets.featured}`,
  ) as HTMLImageElement | HTMLVideoElement;

  const imagesSlot = Slots.assets.images({ element }) as HTMLImageElement;
  const images = imagesSlot.querySelectorAll(
    'img',
  ) as NodeListOf<HTMLImageElement>;
  const imagesList = Array.from(images);

  const expandFeatureAttribute = Attributes.includesFeature.expandFeature({
    element,
  });

  if (imagesList.length < 3 || imagesList.length > 5) {
    console.error(`${tagName}: Images not within the 3 to 5 range.`);
  }

  const elementData: {
    featured: HTMLImageElement | HTMLVideoElement;
    images: HTMLImageElement[];
    isExpandFeature: boolean;
  } = {
    featured: featuredSlot,
    images: imagesList,
    isExpandFeature: expandFeatureAttribute,
  };

  return elementData;
};

/**
 * Creates a card fireworks component with a featured element and accompanying images
 * @param element - The host HTML element
 * @returns Configured card fireworks component
 * @internal
 */
const createComponent: CreateComponentFunction = (element) => {
  const elementData = MakeCardFireworksContent({ element });
  return Atomic.animations.brand.cardFireworks(elementData);
};

/**
 * Card Fireworks
 *
 * A dynamic component featuring a central "featured" image or video
 * and a supporting set of 3–5 images that pops into a grid layout in a "fireworks" style.
 * By default, the featured element expands full screen.
 * Designed for brand storytelling and visual highlights.
 *
 * ## Custom Element
 * `<umd-element-brand-card-fireworks>`
 *
 * ## Slots
 * - `featured` - Main featured image or video (required, accepts: img, video)
 * - `images` - Container for 3–5 supporting images (required, accepts: div containing img)
 *
 * ## Attributes
 * - `data-expand-feature` - Expands the fireworks layout for interactive or animated display (optional, accepts: `"true"` or `"false"`)
 *
 * @example
 * ```html
 * <!--  3 images, featured video -->
 * <umd-element-brand-card-fireworks>
 *   <video slot="featured" aria-label="UMD Campus Tour">
 *     <source src="/campus-tour.mp4" />
 *   </video>
 *   <div slot="images">
 *     <img src="/library.jpg" alt="McKeldin Library Exterior" />
 *     <img src="/mall-spring.jpg" alt="McKeldin Mall in Spring" />
 *     <img src="/student-center.jpg" alt="Student Center Activities" />
 *   </div>
 * </umd-element-brand-card-fireworks>
 * ```
 *
 * @example
 * ```html
 * <!-- 5 images, featured image, expand feature off -->
 * <umd-element-brand-card-fireworks data-expand-feature="false">
 *   <img slot="featured" src="./media/testudo.jpg" alt="Testudo the Mascot" />
 *   <div slot="images">
 *     <img src="/engineering.jpg" alt="Engineering Building" />
 *     <img src="/arts.jpg" alt="Arts and Humanities Building" />
 *     <img src="/science-hall.jpg" alt="Science Lecture Hall" />
 *     <img src="/athletics.jpg" alt="Athletics Stadium" />
 *     <img src="/dorm.jpg" alt="Student Dormitory" />
 *   </div>
 * </umd-element-brand-card-fireworks>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */

const registration: ComponentRegistration = Register.webComponent({
  tagName,
  slots,
  createComponent,
});

export default registration;

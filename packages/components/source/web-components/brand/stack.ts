import { animations } from '@universityofmaryland/web-elements-library/atomic';
import { Attributes, Lifecycle, Register } from '@universityofmaryland/web-model-library';
import { CreateComponentFunction, ComponentRegistration } from '../../_types';

const tagName = 'umd-element-brand-card-stack';

/**
 * Creates a card fireworks component with a featured element and accompanying images
 * @param element - The host HTML element
 * @returns Configured card fireworks component
 * @internal
 */
const createComponent: CreateComponentFunction = (element) => {
  const cards = Array.from(
    element.querySelectorAll(`[slot="cards"] > *`),
  ) as Array<HTMLImageElement | HTMLVideoElement>;
  const featured = cards.find(
    (card) => card.getAttribute('data-featured') === 'true',
  );

  if (cards.length < 5) {
    console.log(`${tagName}: The minimum number of for the card stack is 5.`);
    return { element: document.createElement('div'), styles: '' };
  }

  if (cards.length > 9) {
    console.log(`${tagName}: The maximum number of for the card stack is 10.`);
    return { element: document.createElement('div'), styles: '' };
  }

  if (!featured) {
    console.log(
      `${tagName}: A featured element is required. Please add the attribute data-featured to one of the elements`,
    );
    return { element: document.createElement('div'), styles: '' };
  }

  const images = cards
    .filter((card) => card.getAttribute('data-featured') !== 'true')
    .map((card) => {
      if (card.tagName === 'IMG') {
        return card as HTMLImageElement;
      }
      const imgChild = card.querySelector('img');
      return imgChild as HTMLImageElement;
    })
    .filter((img) => img !== null) as HTMLImageElement[];

  return animations.brand.cardStack({
    featured,
    images,
    isExpandFeature: Attributes.includesFeature.imageExpand({
      element,
    }),
  });
};

/**
 * Card Stack
 *
 * A dynamic component featuring a central "featured" image or video
 * and a supporting set of 5-9 assets that pops into a grid layout in a "stack" style.
 * By default, the featured element expands full screen.
 * Designed for brand storytelling and visual highlights.
 *
 * ## Custom Element
 * `<umd-element-brand-card-stack>`
 *
 * ## Slots
 * - `cards` - Container for 5 - 8 supporting elements (required, accepts: img, video, and element containing img)
 *
 * ## Attributes
 * - `data-featured` - Indicates the featured element (required, accepts: `"true"` or `"false"`)
 * - `data-image-expand` - Expands the Stack layout for interactive or animated display (optional, accepts: `"true"` or `"false"`)
 *
 * @example
 * ```html
 * <!--  3 images, featured video -->
 * <umd-element-brand-card-stack>
 *   <div slot="cards">
 *     <img src="/library.jpg" alt="McKeldin Library Exterior" />
 *     <img src="/mall-spring.jpg" alt="McKeldin Mall in Spring" />
 *     <img src="/student-center.jpg" alt="Student Center Activities" />
 *   <video data-featured="true" aria-label="UMD Campus Tour">
 *     <source src="/campus-tour.mp4" />
 *   </video>
 *   </div>
 * </umd-element-brand-card-stack>
 * ```
 *
 * @example
 * ```html
 * <!-- 5 images, featured image, expand feature off -->
 * <umd-element-brand-card-stack data-image-expand="false">
 *   <div slot="cards">
 *     <img data-featured="true" src="./media/testudo.jpg" alt="Testudo the Mascot" />
 *     <img src="/engineering.jpg" alt="Engineering Building" />
 *     <img src="/arts.jpg" alt="Arts and Humanities Building" />
 *     <img src="/science-hall.jpg" alt="Science Lecture Hall" />
 *     <img src="/athletics.jpg" alt="Athletics Stadium" />
 *     <img src="/dorm.jpg" alt="Student Dormitory" />
 *   </div>
 * </umd-element-brand-card-stack>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */

export const BrandCardStack: ComponentRegistration = Register.webComponent({
  tagName,
  createComponent,
  afterConnect: Lifecycle.hooks.loadAnimation,
});

/** Backwards compatibility alias for grouped exports */
export { BrandCardStack as cardStack };

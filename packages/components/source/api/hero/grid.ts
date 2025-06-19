import { Composite } from '@universityofmaryland/web-elements-library';
import { Lifecycle, Slots, Register } from 'model';
import type { CreateComponentFunction, ComponentRegistration } from '../_types';

/**
 * Tag name for the grid hero component
 * @internal
 */
const tagName = 'umd-element-hero-grid';

const createComponent: CreateComponentFunction = (element) => {
  const leftColumn = element.querySelector(
    `[slot="column-left"]`,
  ) as HTMLElement;
  const rightColumn = element.querySelector(
    `[slot="column-right"]`,
  ) as HTMLElement;
  const centerColumn = element.querySelector(
    `[slot="column-center"]`,
  ) as HTMLElement;

  const leftImages = Array.from(
    leftColumn.querySelectorAll('img'),
  ) as HTMLImageElement[];
  const rightImages = Array.from(
    rightColumn.querySelectorAll('img'),
  ) as HTMLImageElement[];
  const centerImages = Array.from(
    centerColumn.querySelectorAll('img'),
  ) as HTMLImageElement[];
  const centerVideo = centerColumn.querySelector(
    'video',
  ) as HTMLVideoElement | null;

  const elementData = {
    corners: [
      {
        images: leftImages,
        isCornerLeft: true,
      },
      {
        images: rightImages,
        isCornerLeft: false,
      },
    ],
    center: {
      images: centerImages,
      video: centerVideo,
    },
  };

  return Composite.hero.grid(elementData);
};

/**
 * Grid Hero Component
 *
 * A hero component with expandable content area and sticky positioning support.
 * Ideal for immersive experiences with additional content reveal.
 *
 * ## Custom Element
 * `<umd-element-hero-expand>`
 *
 * ## Slots
 * - `eyebrow` - Small text above headline
 * - `headline` - Main hero heading
 * - `image` - Hero image
 * - `video` - Hero video (as video element or container)
 * - `actions` - Call-to-action buttons/links
 * - `additional` - Additional expandable content area
 *
 * ## Attributes
 * - `data-visual-position` - Top position for sticky behavior (in pixels)
 * - `data-top-position` - Override sticky position value
 *
 * ## Observed Attributes
 * - `data-visual-position` - Updates sticky position dynamically
 *
 * @example
 * ```html
 * <!-- Basic expandable hero -->
 * <umd-element-hero-expand>
 *   <h1 slot="headline">Explore Our Campus</h1>
 *   <img slot="image" src="aerial-view.jpg" alt="Campus aerial view">
 *   <div slot="additional">
 *     <p>Discover 1,250 acres of possibilities...</p>
 *   </div>
 * </umd-element-hero-expand>
 * ```
 *
 * @example
 * ```html
 * <!-- Expandable hero with video and sticky position -->
 * <umd-element-hero-expand data-visual-position="80">
 *   <p slot="eyebrow">Experience Maryland</p>
 *   <h1 slot="headline">Where Ideas Take Flight</h1>
 *   <video slot="video" autoplay muted loop>
 *     <source src="campus-tour.mp4" type="video/mp4">
 *   </video>
 *   <div slot="actions">
 *     <button>Take Virtual Tour</button>
 *   </div>
 *   <div slot="additional">
 *     <h2>Discover Your Path</h2>
 *     <p>With over 100 undergraduate majors...</p>
 *   </div>
 * </umd-element-hero-expand>
 * ```
 *
 * @example
 * ```html
 * <!-- Hero with wrapped video element -->
 * <umd-element-hero-expand>
 *   <h1 slot="headline">Innovation Hub</h1>
 *   <div slot="video">
 *     <video autoplay muted loop>
 *       <source src="innovation.mp4" type="video/mp4">
 *     </video>
 *   </div>
 * </umd-element-hero-expand>
 * ```
 *
 * @category Components
 * @since 1.12.0
 */
const GridHero: ComponentRegistration = Register.webComponent({
  tagName,
  createComponent,
});

export default GridHero;

import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Slots, Register } from 'model';
import type {
  CreateComponentFunction,
  ComponentRegistration,
} from '../../../_types';

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
    headline: Slots.headline.default({ element }),
    text: Slots.text.default({ element }),
    actions: Slots.actions.default({ element }),
    isThemeDark: Attributes.isTheme.dark({ element }) || false,
  };

  const gridElement = Composite.hero.custom.grid(elementData);

  if (gridElement) return gridElement;

  return { element: document.createElement('div'), styles: '' };
};

/**
 * Grid Hero Component
 *
 * A three-column grid hero with scroll-triggered animations that progressively
 * focus on center content. Creates an immersive visual experience with smooth
 * transitions between grid states.
 *
 * ## Custom Element
 * `<umd-element-hero-grid>`
 *
 * ## Slots
 * - `column-left` - Left column container for images
 * - `column-center` - Center column container for images and optional video
 * - `column-right` - Right column container for images
 *
 * ## Visual Behavior
 * - Initial layout: 20% - 60% - 20% column widths
 * - Scroll animation: Transitions to 0% - 100% - 0% (center-focused)
 * - Center rows animate from 25vh-1fr-25vh to 0-1fr-0
 * - Includes progressive tint overlay during scroll
 *
 * @example
 * ```html
 * <!-- Basic grid hero with images -->
 * <umd-element-hero-grid>
 *   <div slot="column-left">
 *     <img src="left1.jpg" alt="Campus view">
 *     <img src="left2.jpg" alt="Students">
 *   </div>
 *   <div slot="column-center">
 *     <img src="center1.jpg" alt="Main building">
 *     <img src="center2.jpg" alt="Research lab">
 *   </div>
 *   <div slot="column-right">
 *     <img src="right1.jpg" alt="Athletics">
 *     <img src="right2.jpg" alt="Library">
 *   </div>
 * </umd-element-hero-grid>
 * ```
 *
 * @example
 * ```html
 * <!-- Grid hero with center video -->
 * <umd-element-hero-grid>
 *   <div slot="column-left">
 *     <img src="left1.jpg" alt="Campus life">
 *     <img src="left2.jpg" alt="Student activities">
 *     <img src="left3.jpg" alt="Dining">
 *   </div>
 *   <div slot="column-center">
 *     <img src="center1.jpg" alt="Aerial view">
 *     <video autoplay muted loop>
 *       <source src="campus-tour.mp4" type="video/mp4">
 *     </video>
 *     <img src="center2.jpg" alt="Graduation">
 *   </div>
 *   <div slot="column-right">
 *     <img src="right1.jpg" alt="Research">
 *     <img src="right2.jpg" alt="Innovation">
 *     <img src="right3.jpg" alt="Community">
 *   </div>
 * </umd-element-hero-grid>
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

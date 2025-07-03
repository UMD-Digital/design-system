import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Slots, Register } from 'model';
import { Markup } from 'utilities';
import type {
  CreateComponentFunction,
  ComponentRegistration,
} from '../../_types';

/**
 * Tag name for the expandable hero component
 * @internal
 */
const tagName = 'umd-element-hero-expand';

const attributes = Attributes.handler.combine(
  Attributes.handler.observe.visuallyPosition({
    callback: (element, topPosition) =>
      element.events?.setTopPosition({ value: topPosition }),
  }),
  // Deprecated
  Attributes.handler.observe.visuallyPosition({
    name: Attributes.names.deprecated.layout.LAYOUT_STICKY_TOP,
    callback: (element, topPosition) =>
      element.events?.setTopPosition({ value: topPosition }),
  }),
);

const createComponent: CreateComponentFunction = (element) => {
  const image = Markup.validate.ImageSlot({
    element,
    ImageSlot: Slots.name.assets.image,
  });
  const videoSlot = element.querySelector(`[slot="video"]`) as HTMLElement;
  const actions = Markup.create.Node.slot({ type: Slots.name.actions.default });
  const additional = Markup.create.Node.slot({ type: Slots.name.ADDITIONAL });

  const elementData: {
    image?: HTMLImageElement;
    video?: HTMLVideoElement;
    eyebrow?: HTMLElement | null;
    headline?: HTMLElement | null;
    actions?: HTMLElement | null;
    additional?: HTMLSlotElement | null;
    topPosition?: string | null;
  } = {
    eyebrow: Slots.eyebrow.default({ element }),
    headline: Slots.headline.default({ element }),
    topPosition: Attributes.getValue.topPosition({ element }),
  };
  const isVideo = videoSlot instanceof HTMLVideoElement;

  if (image) {
    elementData.image = image;
  }

  if (isVideo) {
    elementData.video = videoSlot as HTMLVideoElement;
  }

  if (!isVideo && videoSlot && videoSlot.children.length > 0) {
    const video = videoSlot.querySelector('video') as HTMLVideoElement;
    if (video) elementData.video = video;
  }

  if (actions) {
    elementData.actions = actions;
  }

  if (additional) {
    elementData.additional = additional;
  }

  return Composite.hero.custom.expand(elementData);
};

/**
 * Expandable Hero Component
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
 * @since 1.0.0
 */
const ExpandHero: ComponentRegistration = Register.webComponent({
  tagName,
  createComponent,
  attributes,
  afterConnect: (ref) => {
    const topPosition = Attributes.getValue.topPosition({
      element: ref.element,
    });
    if (topPosition) {
      ref?.events?.setTopPosition({ value: topPosition });
    }
  },
});

export default ExpandHero;

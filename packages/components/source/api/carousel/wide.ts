import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Slots, Register, Lifecycle } from 'model';
import { Markup } from 'utilities';
import type {
  CreateComponentFunction,
  ComponentRegistration,
  SlotConfiguration,
} from '../../_types';

const { ImageHasAlt } = Markup.validate;

const tagName = 'umd-element-carousel-image-wide';

const slots: SlotConfiguration = {
  slides: {
    required: true,
    allowedElements: ['figure', 'div'],
  },
};

const attributes = Attributes.handler.common.resize((element) =>
  element.events?.resize(),
);

/**
 * Creates a wide carousel component
 * @param element - The host HTML element
 * @returns Configured wide carousel component
 * @internal
 */
const createComponent: CreateComponentFunction = (element) => {
  const title = element.getAttribute('title');
  const animationTime = element.getAttribute('animation-time');
  const mobileBreakpoint = element.getAttribute('mobile-breakpoint');

  const slottedSlides = Array.from(
    element.querySelectorAll(`[slot="slides"] > *`),
  ) as HTMLElement[];

  const slides = slottedSlides
    .map((slide) => {
      const image = slide.querySelector('img');
      const headline = slide.querySelector('[data-headline]');
      const text = slide.querySelector('[data-text]');

      if (image && !ImageHasAlt({ image })) {
        console.warn('Carousel slide image missing alt text:', image);
        return null;
      }

      return {
        image: image ? (image.cloneNode(true) as HTMLImageElement) : null,
        headline: headline
          ? (headline.cloneNode(true) as HTMLElement)
          : undefined,
        text: text ? (text.cloneNode(true) as HTMLElement) : undefined,
      };
    })
    .filter((slide) => slide && slide.image) as Array<{
    image: HTMLImageElement;
    headline?: HTMLElement;
    text?: HTMLElement;
  }>;

  return Composite.carousel.wide({
    slides,
    title: title || undefined,
    isThemeDark: Attributes.isTheme.dark({ element }),
    animationTime: animationTime ? parseInt(animationTime) : undefined,
    mobileBreakpoint: mobileBreakpoint ? parseInt(mobileBreakpoint) : undefined,
  });
};

/**
 * Wide Carousel
 *
 * A full-width carousel component with slide previews, optimized for showcasing
 * featured content with optional text overlays.
 *
 * ## Custom Element
 * `<umd-element-carousel-wide>`
 *
 * ## Slots
 * - `slides` - Container for carousel slides (required, accepts: figure or div elements)
 *   - Each slide should contain:
 *     - An `img` element with alt text (required)
 *     - An element with `data-headline` attribute for headlines (optional)
 *     - An element with `data-text` attribute for descriptions (optional)
 *
 * ## Attributes
 * - `title` - Accessible title for the carousel (default: "Animated Image Carousel")
 * - `data-theme` - Visual theme:
 *   - `light` - Light theme (default)
 *   - `dark` - Dark theme
 * - `animation-time` - Animation duration in milliseconds (default: 500)
 * - `mobile-breakpoint` - Breakpoint for mobile behavior in pixels (default: 650)
 *
 * ## Observed Attributes
 * - `resize` - Triggers carousel size recalculation
 *
 * @example
 * ```html
 * <umd-element-carousel-wide title="Featured Stories">
 *   <div slot="slides">
 *     <figure>
 *       <img src="hero1.jpg" alt="Research breakthrough">
 *       <div data-headline>
 *         <h2>Major Research Discovery</h2>
 *       </div>
 *       <div data-text>
 *         <p>Scientists make groundbreaking discovery in quantum computing.</p>
 *       </div>
 *     </figure>
 *     <figure>
 *       <img src="hero2.jpg" alt="Campus expansion">
 *       <div data-headline>
 *         <h2>New Science Center Opens</h2>
 *       </div>
 *       <div data-text>
 *         <p>State-of-the-art facility enhances research capabilities.</p>
 *       </div>
 *     </figure>
 *   </div>
 * </umd-element-carousel-wide>
 * ```
 *
 * @category Components
 * @since 1.13.0
 */
const registration: ComponentRegistration = Register.webComponent({
  tagName,
  slots,
  createComponent,
  attributes: [attributes],
  afterConnect: Lifecycle.hooks.loadOnConnect,
});

export default registration;

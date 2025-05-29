import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Model, Register, Slots } from 'model';
import { Markup } from 'utilities';

/**
 * Tag name for the cards carousel component
 * @internal
 */
const tagName = 'umd-element-carousel-cards';

const slots = {
  cards: {
    required: true,
  },
};

const attributes = Attributes.handler.combine(
  Attributes.handler.observe.resize({
    callback: (element) => element.events?.resize(),
  }),
);

const createComponent = (element: HTMLElement) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const slide = element.querySelector(
    `[slot="${Slots.name.CARDS}"]`,
  ) as HTMLElement;
  const cards = Array.from(
    slide.querySelectorAll(':scope > *'),
  ) as HTMLElement[];

  const createCardShadowRef = () => {
    const slot = Markup.create.Node.slot({ type: Slots.name.CARDS });
    shadow.appendChild(slot);
  };

  createCardShadowRef();

  const shadowRef = shadow.querySelector(
    `[name="${Slots.name.CARDS}"]`,
  ) as HTMLElement;

  return Composite.carousel.cards({
    slide,
    shadowRef,
    cards,
    headline: Slots.headline.default({ element }),
    text: Slots.text.default({ element }),
    actions: Slots.actions.default({ element }),
  });
};

/**
 * Cards Carousel Component
 * 
 * A carousel component specifically designed for displaying card components.
 * Automatically handles card layouts with optional header and actions.
 * 
 * ## Custom Element
 * `<umd-element-carousel-cards>`
 * 
 * ## Slots
 * - `cards` - Container for card components (required)
 * - `headline` - Optional carousel headline
 * - `text` - Optional carousel description
 * - `actions` - Optional carousel action buttons/links
 * 
 * ## Observed Attributes
 * - `resize` - Triggers carousel recalculation
 * 
 * @example
 * ```html
 * <!-- Basic cards carousel -->
 * <umd-element-carousel-cards>
 *   <div slot="cards">
 *     <umd-element-card>
 *       <h3 slot="headline">Card 1</h3>
 *       <p slot="text">Card content</p>
 *     </umd-element-card>
 *     <umd-element-card>
 *       <h3 slot="headline">Card 2</h3>
 *       <p slot="text">Card content</p>
 *     </umd-element-card>
 *   </div>
 * </umd-element-carousel-cards>
 * ```
 * 
 * @example
 * ```html
 * <!-- Cards carousel with header -->
 * <umd-element-carousel-cards>
 *   <h2 slot="headline">Featured Stories</h2>
 *   <p slot="text">Latest news from around campus</p>
 *   <div slot="cards">
 *     <umd-element-article data-theme="light">
 *       <img slot="image" src="story1.jpg" alt="Story 1">
 *       <h3 slot="headline">Research Breakthrough</h3>
 *       <p slot="text">Scientists discover new method...</p>
 *     </umd-element-article>
 *     <umd-element-article data-theme="light">
 *       <img slot="image" src="story2.jpg" alt="Story 2">
 *       <h3 slot="headline">Campus Update</h3>
 *       <p slot="text">New facilities opening this fall...</p>
 *     </umd-element-article>
 *   </div>
 *   <div slot="actions">
 *     <a href="/news">View All News</a>
 *   </div>
 * </umd-element-carousel-cards>
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
      afterConnect: (ref) => ref?.events?.load(),
    }),
  });
};

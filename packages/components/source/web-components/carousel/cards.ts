import { carousel } from '@universityofmaryland/web-elements-library/composite';
import { createSlot } from '@universityofmaryland/web-utilities-library/elements';
import { Attributes, Slots, Register, Lifecycle } from '@universityofmaryland/web-model-library';
import type {
  CreateComponentFunction,
  ComponentRegistration,
  SlotConfiguration,
} from '../../_types';

const tagName = 'umd-element-carousel-cards';

const slots: SlotConfiguration = {
  cards: {
    required: true,
  },
  headline: Slots.element.allowed.headline,
  text: Slots.element.allowed.text,
  actions: Slots.element.allowed.actions,
};

const attributes = Attributes.handler.common.resize((element) =>
  element.events?.resize(),
);

/**
 * Creates a cards carousel component
 * @param element - The host HTML element
 * @returns Configured cards carousel component
 * @internal
 */
const createComponent: CreateComponentFunction = (element) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const slide = element.querySelector(
    `[slot="${Slots.name.CARDS}"]`,
  ) as HTMLElement;
  const cards = Array.from(
    slide.querySelectorAll(':scope > *'),
  ) as HTMLElement[];

  const createCardShadowRef = () => {
    const slot = createSlot(Slots.name.CARDS);
    shadow.appendChild(slot);
  };

  createCardShadowRef();

  const shadowRef = shadow.querySelector(
    `[name="${Slots.name.CARDS}"]`,
  ) as HTMLElement;

  return carousel.cards({
    slide,
    shadowRef,
    cards,
    headline: Slots.headline.default({ element }),
    text: Slots.text.default({ element }),
    actions: Slots.actions.default({ element }),
  });
};

/**
 * Cards Carousel
 *
 * A carousel component specifically designed for displaying card components.
 *
 * ## Custom Element
 * `<umd-element-carousel-cards>`
 *
 * ## Slots
 * - `cards` - Container for card components (required, accepts: card elements)
 * - `headline` - Carousel headline (optional, accepts: heading elements)
 * - `text` - Carousel description (optional, accepts: text elements)
 * - `actions` - Carousel action buttons/links (optional, accepts: links or buttons)
 *
 * ## Observed Attributes
 * - `resize` - Triggers carousel size recalculation
 *
 * @example
 * ```html
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
 * @category Components
 * @since 1.0.0
 */
export const CarouselCards: ComponentRegistration = Register.webComponent({
  tagName,
  slots,
  createComponent,
  attributes: [attributes],
  afterConnect: Lifecycle.hooks.loadOnConnect,
});

/** Backwards compatibility alias for grouped exports */
export { CarouselCards as cards };

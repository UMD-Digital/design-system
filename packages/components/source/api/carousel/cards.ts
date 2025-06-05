import { Composite } from '@universityofmaryland/web-elements-library';
import type { CreateComponentFunction, ComponentRegistration, SlotConfiguration } from '../_types';
import { createComponentRegistration } from '../../model/utilities/register';
import { CommonAttributeHandlers } from '../../model/attributes/handler';
import { CommonLifecycleHooks } from '../../model/utilities/lifecycle';
import { Attributes, Slots } from 'model';
import { Markup } from 'utilities';

// Tag name for the cards carousel component
const tagName = 'umd-element-carousel-cards';

// Slot configuration for the cards carousel component
const slots: SlotConfiguration = {
  cards: {
    required: true,
  },
  headline: Slots.element.allowed.headline,
  text: Slots.element.allowed.text,
  actions: Slots.element.allowed.actions,
};

// Attribute handlers for the cards carousel component
const attributes = CommonAttributeHandlers.resize(
  (element) => element.events?.resize()
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
const registration: ComponentRegistration = createComponentRegistration({
  tagName,
  slots,
  createComponent,
  attributes: [attributes],
  afterConnect: CommonLifecycleHooks.loadOnConnect,
});

export default registration;

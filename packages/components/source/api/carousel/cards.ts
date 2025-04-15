import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Model, Register, Slots } from 'model';
import { Markup } from 'utilities';

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

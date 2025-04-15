import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Model, Register, Slots } from 'model';
import { Markup } from 'utilities';

const tagName = 'umd-element-card-icon';

const slots = {
  headline: {
    required: true,
  },
};

const createComponent = (element: HTMLElement) =>
  Composite.card.overlay.icon({
    image: Markup.validate.ImageSlot({
      element,
      ImageSlot: Slots.name.assets.image,
    }),
    headline: Slots.headline.default({ element }),
    text: Slots.text.default({ element }),
    isThemeDark: Attributes.isTheme.dark({ element }),
  });

export default () => {
  Register.registerWebComponent({
    name: tagName,
    element: Model.createCustomElement({
      tagName,
      slots,
      createComponent,
    }),
  });
};

import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Model, Register, Slots } from 'model';
import { Markup } from 'utilities';

const tagName = 'umd-element-logo';

const slots = {
  image: {
    required: true,
  },
};

const createComponent = (element: HTMLElement) =>
  Composite.layout.box.logo({
    image: Markup.validate.ImageSlot({
      element,
      ImageSlot: Slots.name.assets.image,
    }) as HTMLImageElement,
    text: Slots.text.default({ element }),
    isThemeDark: Attributes.isTheme.dark({ element }),
    isBordered: Attributes.isVisual.bordered({ element }),
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

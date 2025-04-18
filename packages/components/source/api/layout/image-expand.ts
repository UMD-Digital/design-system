import { Composite } from '@universityofmaryland/web-elements-library';
import { Model, Register, Slots } from 'model';
import { Markup } from 'utilities';

const tagName = 'umd-layout-image-expand';

const slots = {
  content: {
    required: true,
  },
  image: {
    required: true,
  },
};

const createComponent = (element: HTMLElement) =>
  Composite.layout.image.expand({
    content: Markup.create.Node.slot({ type: 'content' }),
    image: Markup.validate.ImageSlot({
      element,
      ImageSlot: Slots.name.assets.image,
    }) as HTMLImageElement,
  });

export default () => {
  Register.registerWebComponent({
    name: tagName,
    element: Model.createCustomElement({
      tagName,
      createComponent,
      slots,
    }),
  });
};

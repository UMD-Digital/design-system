import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Model, Register, Slots } from 'model';

const tagName = 'umd-element-carousel-thumbnail';

const slots = {
  blocks: {
    required: true,
  },
};

const attributes = Attributes.handler.combine(
  Attributes.handler.observe.resize({
    callback: (element) => element.events?.resize(),
  }),
);

const createComponent = (element: HTMLElement) => {
  const slottedBlocks = Array.from(
    element.querySelectorAll(`[slot="${Slots.name.BLOCKS}"] > *`),
  ) as HTMLElement[];

  const blocks = slottedBlocks.map((block) =>
    block.cloneNode(true),
  ) as HTMLElement[];

  return Composite.carousel.thumbnail({
    blocks,
    isThemeDark: Attributes.isTheme.dark({ element }),
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

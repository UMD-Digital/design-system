import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Model, Register, Slots } from 'model';
import { Markup } from 'utilities';
const { ImageHasAlt } = Markup.validate;

const tagName = 'umd-element-carousel-multiple-image';

const slots = {
  images: {
    required: true,
  },
};

const attributes = Attributes.handler.combine(
  Attributes.handler.observe.resize({
    callback: (element) => element.events?.SetEventReize(),
  }),
);

const createComponent = (element: HTMLElement) => {
  const slottedImages = Array.from(
    element.querySelectorAll(`[slot="${Slots.name.IMAGES}"] > *`),
  ) as HTMLImageElement[];

  const images = slottedImages
    .map((image) => {
      if (image.nodeName === 'IMG') {
        if (ImageHasAlt({ image })) return image.cloneNode(true);
      }
      return null;
    })
    .filter((image) => image !== null) as HTMLImageElement[];

  return Composite.carousel.images({
    images,
    isThemeDark: Attributes.isTheme.dark({ element }),
    isFullScreenOption: Attributes.includesFeature.fullScreenOption({
      element,
    }),
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
    }),
  });
};

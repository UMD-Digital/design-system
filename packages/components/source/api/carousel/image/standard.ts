import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Model, Register, Slots } from 'model';
import { Markup } from 'utilities';

const { CarouselImageStandard } = Composite;
const { ImageHasAlt } = Markup.validate;

const tagName = 'umd-element-carousel-image';

const slots = {
  images: {
    required: true,
    allowedElements: ['img'],
  },
  headlines: {
    required: false,
    allowedElements: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  },
  texts: {
    required: false,
    allowedElements: ['p', 'div'],
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
  const slottedHeadlines = Array.from(
    element.querySelectorAll(`[slot="${Slots.name.HEADLINES}"] > *`),
  );
  const slottedTexts = Array.from(
    element.querySelectorAll(`[slot="${Slots.name.TEXTS}"] > *`),
  );

  const headlines = slottedHeadlines.map((headline) =>
    headline.cloneNode(true),
  ) as HTMLElement[];

  const texts = slottedTexts.map((text) =>
    text.cloneNode(true),
  ) as HTMLElement[];

  const images = slottedImages
    .map((image) => {
      if (image.nodeName === 'IMG') {
        if (ImageHasAlt({ image })) return image.cloneNode(true);
      }
      return null;
    })
    .filter((image) => image !== null) as HTMLImageElement[];

  return CarouselImageStandard.CreateElement({
    images,
    headlines,
    texts,
    isThemeDark: Attributes.isTheme.dark({ element }),
    isFullScreenOption: Attributes.includesFeature.fullScreenOption({
      element,
    }),
  });
};

const Load = () => {
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

export default {
  Load,
};

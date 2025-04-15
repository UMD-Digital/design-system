import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Model, Register, Slots } from 'model';
import { Markup } from 'utilities';

const tagName = 'umd-element-hero-expand';

const attributes = Attributes.handler.combine(
  Attributes.handler.observe.visuallyPosition({
    callback: (element, topPosition) =>
      element.events?.setTopPosition({ value: topPosition }),
  }),
  // Deprecated
  Attributes.handler.observe.visuallyPosition({
    name: Attributes.names.LAYOUT_STICKY_TOP,
    callback: (element, topPosition) =>
      element.events?.setTopPosition({ value: topPosition }),
  }),
);

const createComponent = (element: HTMLElement) => {
  const image = Markup.validate.ImageSlot({
    element,
    ImageSlot: Slots.name.assets.image,
  });
  const videoSlot = element.querySelector(
    `[slot="${Slots.name.VIDEO}"]`,
  ) as HTMLElement;
  const actions = Markup.create.Node.slot({ type: Slots.name.actions.default });
  const additional = Markup.create.Node.slot({ type: Slots.name.ADDITIONAL });

  const elementData: {
    image?: HTMLImageElement;
    video?: HTMLVideoElement;
    eyebrow?: HTMLElement | null;
    headline?: HTMLElement | null;
    actions?: HTMLElement | null;
    additional?: HTMLSlotElement | null;
    topPosition?: string | null;
  } = {
    eyebrow: Slots.eyebrow.default({ element }),
    headline: Slots.headline.default({ element }),
    topPosition: Attributes.getValue.topPosition({ element }),
  };
  const isVideo = videoSlot instanceof HTMLVideoElement;

  if (image) {
    elementData.image = image;
  }

  if (isVideo) {
    elementData.video = videoSlot as HTMLVideoElement;
  }

  if (!isVideo && videoSlot && videoSlot.children.length > 0) {
    const video = videoSlot.querySelector('video') as HTMLVideoElement;
    if (video) elementData.video = video;
  }

  if (actions) {
    elementData.actions = actions;
  }

  if (additional) {
    elementData.additional = additional;
  }

  return Composite.hero.expand(elementData);
};

export default () => {
  Register.registerWebComponent({
    name: tagName,
    element: Model.createCustomElement({
      tagName,
      createComponent,
      attributes,
      afterConnect: (ref) => {
        const topPosition = Attributes.getValue.topPosition({
          element: ref.element,
        });
        if (topPosition) {
          ref?.events?.setTopPosition({ value: topPosition });
        }
      },
    }),
  });
};

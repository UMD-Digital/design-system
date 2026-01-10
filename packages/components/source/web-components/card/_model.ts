import { card } from '@universityofmaryland/web-elements-library/composite';
import * as validation from '@universityofmaryland/web-utilities-library/validation';
import { Attributes, Model, Register, Slots } from '@universityofmaryland/web-model-library';

interface CardData {
  image: HTMLImageElement | null;
  eyebrow: HTMLElement | null;
  headline: HTMLElement | null;
  text: HTMLElement | null;
  date: HTMLElement | null;
  actions: HTMLElement | null;
  isTransparent: boolean;
  isThemeDark: boolean;
  isAligned?: boolean;
  isBordered?: boolean;
  imageLoading?: 'eager' | 'lazy';
}

interface CardConfig {
  tagName: string;
}

const createCardComponent = ({ tagName }: CardConfig) => {
  const slots = {
    headline: {
      required: true,
      ...Slots.element.allowed.subHeadline,
    },
    body: Slots.element.allowed.text,
  };

  const createComponentData = (element: HTMLElement): CardData => {
    const loadingPriority = Attributes.getValue.loadingPriority({ element });
    const imageLoading =
      loadingPriority === 'eager' || loadingPriority === 'lazy'
        ? loadingPriority
        : 'lazy';

    return {
      image: validation.getValidatedSlotImage({
        element,
        slotName: Slots.name.assets.image,
      }),
      eyebrow: Slots.eyebrow.default({ element }),
      headline: Slots.headline.default({ element }),
      text: Slots.text.default({ element }),
      date: Slots.date.default({ element }),
      actions: Slots.actions.default({ element }),
      isTransparent: Attributes.isVisual.transparent({ element }),
      isThemeDark: Attributes.isTheme.dark({ element }),
      imageLoading,
    };
  };

  const createComponent = (element: HTMLElement) => {
    const isAligned = Attributes.isVisual.aligned({ element });
    const hasBorder = Attributes.isVisual.bordered({ element });
    const isDisplayList = Attributes.isDisplay.list({ element });
    const cardData = createComponentData(element);

    if (isDisplayList) {
      return card.list({
        ...cardData,
        isAligned,
      });
    }

    return card.block({
      ...cardData,
      isAligned,
      hasBorder,
    });
  };

  return () => {
    Register.registerWebComponent({
      name: tagName,
      element: Model.createCustomElement({
        tagName,
        slots,
        createComponent,
      }),
    });
  };
};

export { createCardComponent };

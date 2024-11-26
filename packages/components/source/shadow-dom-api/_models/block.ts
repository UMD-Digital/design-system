import { CardBlock, CardList } from 'elements';
import { Attributes, Model, Register, Slots } from 'shadow-dom-model';
import { MarkupValidate } from 'utilities';

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
}

interface CardConfig {
  tagName: string;
}

const createCardComponent = ({ tagName }: CardConfig) => {
  const slots = {
    headline: {
      required: true,
      allowedElements: ['h2', 'h3', 'h4', 'h5', 'h6', 'p'],
    },
    body: {
      allowedElements: ['div', 'p'],
    },
  };

  const createComponentData = (element: HTMLElement): CardData => ({
    image: MarkupValidate.ImageSlot({ element, ImageSlot: Slots.name.IMAGE }),
    eyebrow: Slots.defined.eyebrow({ element }),
    headline: Slots.defined.headline({ element }),
    text: Slots.defined.text({ element }),
    date: Slots.defined.date({ element }),
    actions: Slots.defined.actions({ element }),
    isTransparent: Attributes.isVisual.transparent({ element }),
    isThemeDark: Attributes.isTheme.dark({ element }),
  });

  const createComponent = (element: HTMLElement) => {
    const isAligned = Attributes.isVisual.aligned({ element });
    const isBordered = Attributes.isVisual.bordered({ element });
    const isDisplayList = Attributes.isVisual.list({ element });

    const cardData = createComponentData(element);

    if (isDisplayList) {
      return CardList({
        ...cardData,
        isAligned,
      });
    }

    return CardBlock({
      ...cardData,
      isAligned,
      isBordered,
    });
  };

  const Load = () => {
    Register.registerWebComponent({
      name: tagName,
      element: Model.createCustomElement({
        tagName,
        slots,
        createComponent,
      }),
    });
  };

  return {
    Load,
  };
};

export default createCardComponent;

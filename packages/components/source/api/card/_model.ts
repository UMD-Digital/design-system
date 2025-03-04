import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Model, Register, Slots } from 'model';
import { Markup } from 'utilities';

const { card } = Composite;

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
    image: Markup.validate.ImageSlot({
      element,
      ImageSlot: Slots.name.assets.image,
    }),
    eyebrow: Slots.eyebrow.default({ element }),
    headline: Slots.headline.default({ element }),
    text: Slots.text.default({ element }),
    date: Slots.date.default({ element }),
    actions: Slots.actions.default({ element }),
    isTransparent: Attributes.isVisual.transparent({ element }),
    isThemeDark: Attributes.isTheme.dark({ element }),
  });

  const createComponent = (element: HTMLElement) => {
    const isAligned = Attributes.isVisual.aligned({ element });
    const hasBorder = Attributes.isVisual.bordered({ element });
    const isDisplayList = Attributes.isVisual.list({ element });

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

export default createCardComponent;

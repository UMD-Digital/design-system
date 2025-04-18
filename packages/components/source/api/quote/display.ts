import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Model, Register, Slots } from 'model';
import { Markup } from 'utilities';

const tagName = 'umd-element-quote';

const slots = {
  quote: {
    required: true,
  },
};

const MakeData = ({ element }: { element: HTMLElement }) => {
  const isThemeDark = Attributes.isTheme.dark({ element });
  const isThemeMaryland = Attributes.isTheme.maryland({ element });
  const isTransparent = Attributes.isVisual.transparent({ element });

  return {
    quote: Markup.create.SlotWithDefaultStyling({
      element,
      slotRef: Slots.name.QUOTE,
    }),
    image: Markup.create.SlotWithDefaultStyling({
      element,
      slotRef: Slots.name.assets.image,
    }),
    attribution: Markup.create.SlotWithDefaultStyling({
      element,
      slotRef: Slots.name.ATTRIBUTION,
    }),
    attributionSubText: Markup.create.SlotWithDefaultStyling({
      element,
      slotRef: Slots.name.ATTRIBUTION_SUB_TEXT,
    }),
    action: Slots.actions.default({ element }),
    isTransparent,
    isThemeDark,
    isThemeMaryland,
  };
};

const createComponent = (element: HTMLElement) => {
  const isSizeLarge = Attributes.isVisual.sizeLarge({ element });
  const isTypeFeatured = Attributes.isDisplay.featured({ element });

  if (isTypeFeatured) {
    return Composite.quote.featured({
      ...MakeData({ element }),
      isSizeLarge,
    });
  }

  return Composite.quote.inline({
    ...MakeData({ element }),
    isSizeLarge,
  });
};

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

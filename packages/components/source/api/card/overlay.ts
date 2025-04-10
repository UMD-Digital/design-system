import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Model, Register, Slots } from 'model';
import { Markup } from 'utilities';

const { SlotWithDefaultStyling } = Markup.create;

const tagName = 'umd-element-card-overlay';

const slots = {
  headline: {
    required: true,
  },
};

const MakeOverlayContent = ({ element }: { element: HTMLElement }) => ({
  eyebrow: Slots.eyebrow.default({ element }),
  headline: Slots.headline.default({ element }),
  text: Slots.text.default({ element }),
  date: Slots.date.default({ element }),
  actions: Slots.actions.default({ element }),
  ctaIcon: SlotWithDefaultStyling({ element, slotRef: Slots.name.CTA_ICON }),
  isQuote: Attributes.isVisual.quote({ element }),
  isThemeDark: Attributes.isTheme.dark({ element }),
  isThemeLight: Attributes.isTheme.light({ element }),
});

const createComponent = (element: HTMLElement) => {
  if (Attributes.isLayout.image({ element })) {
    const ImageOverlay = Composite.card.overlay.image({
      ...MakeOverlayContent({ element }),
      backgroundImage: Slots.assets.image({ element }) as HTMLImageElement,
    });

    if (ImageOverlay) {
      return ImageOverlay;
    }
  }

  return Composite.card.overlay.color({ ...MakeOverlayContent({ element }) });
};

export default () => {
  Register.registerWebComponent({
    name: tagName,
    element: Model.createCustomElement({
      tagName,
      slots,
      createComponent,
      afterConnect: (element) => {
        element?.events?.load();
      },
    }),
  });
};

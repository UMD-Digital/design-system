import { BannerPromo } from 'elements';
import { Attributes, Model, Register, Slots } from 'shadow-dom-model';

const tagName = 'umd-element-banner-promo';

const createComponent = (element: HTMLElement) =>
  BannerPromo({
    headline: Slots.defined.headline({ element }),
    text: Slots.defined.text({ element }),
    actions: Slots.defined.actions({ element }),
    includeSeal: Attributes.checks.isVisuallyLogo({ element }),
    isThemeDark: Attributes.checks.isThemeDark({
      element,
    }),
  });

const slots = {
  headline: {
    allowedElements: ['h2', 'h3', 'h4', 'h5', 'h6', 'p'],
  },
  text: {
    allowedElements: ['div', 'p'],
  },
};

const Load = () => {
  const Element = Model.createCustomElement({
    tagName,
    slots,
    createComponent,
  });

  Register.registerWebComponent({
    name: tagName,
    element: Element,
  });
};

export default {
  Load,
};

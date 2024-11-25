import { AlertSite } from 'elements';
import { Attributes, Model, Register, Slots } from 'shadow-dom-model';

const tagName = 'umd-element-alert-site';

const createComponent = (element: HTMLElement) =>
  AlertSite({
    headline: Slots.defined.headline({ element }),
    body: Slots.defined.body({ element, isDefaultStyling: true }),
    actions: Slots.defined.actions({ element }),
    daysToHide: Attributes.getValue.daysToHide({ element }),
  });

const slots = {
  headline: {
    required: true,
    allowedElements: ['h2', 'h3', 'h4', 'h5', 'h6', 'p'],
  },
  body: {
    allowedElements: ['div', 'p'],
  },
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

export default {
  Load,
};

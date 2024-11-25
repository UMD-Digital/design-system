import { Accordion } from 'elements';
import { Attributes, Model, Register, Slots } from 'shadow-dom-model';

const tagName = 'umd-element-accordion-item';

const createComponent = (element: HTMLElement) =>
  Accordion({
    body: Slots.defined.body({ element, isDefaultStyling: false }),
    headline: Slots.defined.headline({ element }),
    isThemeLight: Attributes.isTheme.light({
      element,
    }),
    isThemeDark: Attributes.isTheme.dark({
      element,
    }),
    isStateOpen: Attributes.isVisual.open({
      element,
    }),
  });

const slots = {
  headline: {
    required: true,
    allowedElements: ['span', 'p'],
  },
  body: {
    required: true,
    allowedElements: ['div', 'p'],
  },
};

const attributes = Attributes.handler.combine(
  Attributes.handler.observe.resize({
    callback: (element) => element.events?.SetOpen({ hasAnimation: false }),
  }),
  Attributes.handler.observe.stateClosed({
    callback: (element) => element.events?.SetClosed({ hasAnimation: true }),
  }),
  Attributes.handler.observe.stateOpen({
    callback: (element) => element.events?.SetOpen({ hasAnimation: true }),
  }),
);

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

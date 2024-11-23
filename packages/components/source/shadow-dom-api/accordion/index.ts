import { Accordion } from 'elements';
import { Attributes, Model, Register, Slots } from 'shadow-dom-model';

const tagName = 'umd-element-accordion-item';

const createComponent = (element: HTMLElement) =>
  Accordion.CreateElement({
    body: Slots.defined.body({ element, isDefaultStyling: false }),
    headline: Slots.defined.headline({ element }),
    isThemeLight: Attributes.checks.isThemeLight({
      element,
    }),
    isThemeDark: Attributes.checks.isThemeDark({
      element,
    }),
    isStateOpen: Attributes.checks.isStateOpen({
      element,
    }),
  });

const slots = {
  headline: {
    required: true,
    allowedElements: ['h2', 'h3', 'h4', 'h5', 'h6', 'p'],
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
  const UMDAccordionElement = Model.createCustomElement({
    tagName,
    styles: `${Accordion.Styles}`,
    slots,
    createComponent,
    attributes,
  });

  Register.registerWebComponent({
    name: tagName,
    element: UMDAccordionElement,
  });
};

export default {
  Load,
};

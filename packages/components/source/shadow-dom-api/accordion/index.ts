import { Accordion } from 'elements';
import { Attributes, Model, Register, Slots } from 'shadow-dom-model';

const tagName = 'umd-element-accordion-item';

const createComponent = (element: HTMLElement) =>
  Accordion({
    text:
      Slots.deprecated.body({ element, isDefaultStyling: false }) ||
      Slots.text.default({ element, isDefaultStyling: false }),
    headline: Slots.headline.default({ element }),
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
    deprecated:
      'Use "text" instead. This attribute will be removed in version 2.0.',
    allowedElements: ['div', 'p'],
  },
  text: {
    required: true,
    allowedElements: ['div', 'p'],
  },
};

const attributes = Attributes.handler.combine(
  Attributes.handler.observe.resize({
    callback: (element) => element.events?.SetOpen({ hasAnimation: false }),
  }),
  // Deprecated
  Attributes.handler.observe.stateClosed({
    callback: (element) => element.events?.SetClosed({ hasAnimation: true }),
  }),
  // Deprecated
  Attributes.handler.observe.stateOpen({
    callback: (element) => element.events?.SetOpen({ hasAnimation: true }),
  }),
  Attributes.handler.observe.visuallyOpen({
    callback: (element) => element.events?.SetOpen({ hasAnimation: true }),
  }),
  Attributes.handler.observe.visuallyClosed({
    callback: (element) => element.events?.SetClosed({ hasAnimation: true }),
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

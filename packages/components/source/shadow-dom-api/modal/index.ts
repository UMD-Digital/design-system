import { Modal } from 'macros';
import { Attributes, Model, Slots, Register } from 'shadow-dom-model';

const tagName = 'umd-element-modal';

const createComponent = (element: HTMLElement) => {
  const callback = () => {
    element.setAttribute(
      Attributes.names.layout.HIDDEN,
      Attributes.values.state.TRUE,
    );
  };

  return Modal({
    content: Slots.content.default({ element, isDefaultStyling: false }),
    isHidden: Attributes.isLayout.hidden({ element }),
    context: element,
    callback,
  });
};

const attributes = Attributes.handler.combine(
  Attributes.handler.observe.visuallyShow({
    callback: (element) => element.events?.show(),
  }),
  Attributes.handler.observe.visuallyHide({
    callback: (element) => element.events?.hide(),
  }),
);

const Load = () => {
  Register.registerWebComponent({
    name: tagName,
    element: Model.createCustomElement({
      tagName,
      attributes,
      createComponent,
    }),
  });
};

export default {
  Load,
};
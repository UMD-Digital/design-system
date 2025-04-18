import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Model, Register, Slots } from 'model';
import { Markup } from 'utilities';

const tagName = 'umd-element-sticky-columns';

const slots = {
  [`sticky-column`]: {
    required: true,
  },
  [`static-column`]: {
    required: true,
  },
};

const attributes = Attributes.handler.combine(
  Attributes.handler.observe.visuallyPosition({
    callback: (element, topPosition) =>
      element.events?.setPosition({ value: topPosition }),
  }),
  // Deprecated
  Attributes.handler.observe.visuallyPosition({
    name: Attributes.names.LAYOUT_STICKY_TOP,
    callback: (element, topPosition) =>
      element.events?.setPosition({ value: topPosition }),
  }),
);

const createComponent = (element: HTMLElement) =>
  Composite.layout.stickyColumns({
    stickyColumn: Markup.create.Node.slot({
      type: Slots.name.STICKY_COLUMN,
    }),
    staticColumn: Markup.create.Node.slot({
      type: Slots.name.STATIC_COLUMN,
    }),
    isStickyLast: !Attributes.isVisual.stickyFirst({ element }),
    topPosition: Attributes.getValue.topPosition({ element }),
  });

export default () => {
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

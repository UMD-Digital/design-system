import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Model, Register, Slots } from 'model';
import { Markup } from 'utilities';

const { SlotWithDefaultStyling } = Markup.create;

const tagName = 'umd-element-breadcrumb';

const slots = {
  paths: {
    required: true,
  },
};

const createComponent = (element: HTMLElement) => {
  const linkListSlot = SlotWithDefaultStyling({
    element,
    slotRef: Slots.name.PATHS,
  });

  if (!linkListSlot)
    return { element: document.createElement('div'), styles: '' };

  return Composite.navigation.elements.breadcrumb({
    isThemeDark: Attributes.isTheme.dark({ element }),
    linkListSlot,
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

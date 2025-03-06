import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Model, Register, Slots } from 'model';
import { Markup } from 'utilities';

const tagName = 'umd-element-stat';

const { SlotWithDefaultStyling } = Markup.create;

const createComponent = (element: HTMLElement) => {
  const lineAttr = element.hasAttribute(Attributes.names.OPTIONAL_HAS_LINE);

  return Composite.stat.display({
    isThemeDark: Attributes.isTheme.dark({ element }),
    displayType: element.getAttribute(Attributes.names.DISPLAY_TYPE),
    size: element.getAttribute(Attributes.names.DISPLAY_SIZE),
    hasLine: lineAttr ? true : false,
    stat: SlotWithDefaultStyling({ element, slotRef: Slots.name.STAT }),
    text: Slots.text.default({ element }),
    subText: Slots.text.subText({ element }),
  });
};

export default () => {
  Register.registerWebComponent({
    name: tagName,
    element: Model.createCustomElement({
      tagName,
      createComponent,
    }),
  });
};

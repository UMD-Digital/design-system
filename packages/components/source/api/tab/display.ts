import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Model, Register, Slots } from 'model';
import { Markup } from 'utilities';

const tagName = 'umd-element-tabs';

const slots = {
  tabs: {
    required: true,
  },
};

const attributes = Attributes.handler.combine(
  Attributes.handler.observe.resize({
    callback: (element) => element.events?.resize(),
  }),
);

const createComponent = (element: HTMLElement) => {
  const isThemeDark = Attributes.isTheme.dark({ element });
  const slot = Markup.create.Node.slot({ type: Slots.name.TABS });
  const markup = element.querySelector(`[slot="${Slots.name.TABS}"]`);

  const modifyDom = () => {
    if (!markup) return;

    const updateDom = Composite.tabs.elements.DomStrcuture.ModifyElement({
      markup,
    });

    markup.innerHTML = '';
    markup.appendChild(updateDom);
  };

  modifyDom();

  return Composite.tabs.standard({
    isThemeDark,
    tabsContainer: markup?.children[0] as HTMLElement,
    shadowContent: slot,
    topPosition: Attributes.getValue.topPosition({
      element,
    }),
  });
};

export default () => {
  Register.registerWebComponent({
    name: tagName,
    element: Model.createCustomElement({
      tagName,
      slots,
      createComponent,
      attributes,
      afterConnect: (ref) => ref?.events?.load(),
    }),
  });
};

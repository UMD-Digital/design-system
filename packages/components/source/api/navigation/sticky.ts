import { Composite } from '@universityofmaryland/web-elements-library';
import { Model, Register } from 'model';
import { Markup } from 'utilities';

const tagName = 'umd-element-navigation-sticky';

const slots = {
  [`content`]: {
    required: true,
  },
};

const createComponent = (element: HTMLElement) =>
  Composite.navigation.elements.sticky({
    content: Markup.create.Node.slot({ type: 'content' }),
    component: element,
  });

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

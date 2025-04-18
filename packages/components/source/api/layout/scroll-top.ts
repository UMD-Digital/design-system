import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Model, Register } from 'model';

const tagName = 'umd-element-scroll-top';

const createComponent = (element: HTMLElement) =>
  Composite.layout.scrollTop({
    isFixed: element.hasAttribute(Attributes.names.LAYOUT_FIXED),
  });

export default () => {
  Register.registerWebComponent({
    name: tagName,
    element: Model.createCustomElement({
      tagName,
      createComponent,
      afterConnect: (ref) => ref?.events?.load(),
    }),
  });
};

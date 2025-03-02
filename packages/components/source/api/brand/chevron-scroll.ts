import { Macros } from '@universityofmaryland/web-elements-library';
import { Model, Register } from 'model';

const { FearlessScrollChevrons } = Macros;

const tagName = 'umd-element-brand-logo-animation';

export default () => {
  Register.registerWebComponent({
    name: tagName,
    element: Model.createCustomElement({
      tagName,
      createComponent: () => FearlessScrollChevrons(),
    }),
  });
};

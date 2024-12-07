import { Macros } from '@universityofmaryland/web-elements-library';
import { Model, Register } from 'model';

const { AnimationBrandLogo } = Macros;

const tagName = 'umd-element-brand-logo-animation';

const Load = () => {
  Register.registerWebComponent({
    name: tagName,
    element: Model.createCustomElement({
      tagName,
      createComponent: () => AnimationBrandLogo(),
    }),
  });
};

export default {
  Load,
};

import { AnimationBrandLogo } from 'macros';
import { Model, Register } from 'shadow-dom-model';

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

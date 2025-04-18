import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Model, Register } from 'model';
import { CommonIntroData } from './common';

const tagName = 'umd-element-section-intro-wide';

const createComponent = (element: HTMLElement) =>
  Composite.layout.sectionIntro.wide(
    CommonIntroData({
      element,
      isThemeDark: Attributes.isTheme.dark({ element }),
    }),
  );
export default () => {
  Register.registerWebComponent({
    name: tagName,
    element: Model.createCustomElement({
      tagName,
      createComponent,
    }),
  });
};

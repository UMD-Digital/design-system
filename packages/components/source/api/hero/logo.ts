import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Model, Register } from 'model';
import { CommonHeroData } from './common';

const tagName = 'umd-element-hero-logo';

const createComponent = (element: HTMLElement) =>
  Composite.hero.logo.CreateElement({
    isThemeDark: Attributes.isTheme.dark({
      element,
    }),
    ...CommonHeroData({
      element,
    }),
  });

export default () => {
  Register.registerWebComponent({
    name: tagName,
    element: Model.createCustomElement({
      tagName,
      createComponent,
      afterConnect: (element) => {
        element?.events?.load();
      },
    }),
  });
};

import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Model, Register } from 'model';
import { CommonHeroData } from './common';

const tagName = 'umd-element-hero-minimal';

const createComponent = (element: HTMLElement) =>
  Composite.hero.minimal.CreateElement({
    isThemeDark: Attributes.isTheme.dark({
      element,
    }),
    isThemeLight: Attributes.isTheme.light({
      element,
    }),
    isThemeMaryland: Attributes.isTheme.maryland({
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

import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Model, Register } from 'model';
import { CommonPersonData } from './common';

const tagName = 'umd-element-person';

const createComponent = (element: HTMLElement) => {
  const isDisplayList = Attributes.isDisplay.list({ element });
  const isDisplayTabular = Attributes.isDisplay.tabular({ element });
  const isThemeDark = Attributes.isTheme.dark({ element });

  if (isDisplayList) {
    return Composite.person.list(CommonPersonData({ element, isThemeDark }));
  }

  if (isDisplayTabular) {
    return Composite.person.tabular(CommonPersonData({ element, isThemeDark }));
  }

  return Composite.person.block(CommonPersonData({ element, isThemeDark }));
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

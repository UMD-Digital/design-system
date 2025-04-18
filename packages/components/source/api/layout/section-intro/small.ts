import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Model, Register, Slots } from 'model';
import { CommonIntroData } from './common';

const tagName = 'umd-element-section-intro';

const createComponent = (element: HTMLElement) =>
  Composite.layout.sectionIntro.small({
    ...CommonIntroData({
      element,
      isThemeDark: Attributes.isTheme.dark({ element }),
    }),
    text: Slots.text.default({ element }),
    hasSeparator: element.hasAttribute(Attributes.names.OPTIONAL_HAS_SEPARATOR),
    includesAnimation: Attributes.includesFeature.animation({ element }),
  });

export default () => {
  Register.registerWebComponent({
    name: tagName,
    element: Model.createCustomElement({
      tagName,
      createComponent,
      afterConnect: (ref) => {
        const element = ref.element;

        setTimeout(() => {
          if (element.getBoundingClientRect().top > 0) {
            ref?.events?.loadAnimation();
          }
        }, 10);
      },
    }),
  });
};
